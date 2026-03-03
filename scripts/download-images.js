const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const INDEX_FILE = path.join(CONTENT_DIR, 'index.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Helper to download image
function downloadImage(url, localPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const timeout = setTimeout(() => {
      reject(new Error('Download timeout'));
    }, 30000);

    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        clearTimeout(timeout);
        downloadImage(res.headers.location, localPath).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        clearTimeout(timeout);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(localPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        clearTimeout(timeout);
        resolve(localPath);
      });

      fileStream.on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    }).on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// Generate local filename from URL
function getLocalFilename(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const basename = path.basename(pathname);
    
    // Clean filename
    let cleanName = basename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .toLowerCase();
    
    // Add timestamp if needed to avoid collisions
    const timestamp = Date.now().toString(36);
    const ext = path.extname(cleanName) || '.jpg';
    const name = path.basename(cleanName, ext);
    
    return `${name}_${timestamp}${ext}`;
  } catch {
    return `image_${Date.now()}.jpg`;
  }
}

// Load content index
function loadContentIndex() {
  try {
    const data = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
    return data.items || {};
  } catch (e) {
    console.error('Error loading index:', e.message);
    return {};
  }
}

// Extract all image URLs from HTML content
function extractImagesFromHtml(html) {
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && (url.includes('financialedge.com.ng') || url.startsWith('http'))) {
      images.push(url);
    }
  }
  return images;
}

// Main download function
async function downloadAllImages() {
  console.log('=== Starting Image Download ===\n');
  
  const contentIndex = loadContentIndex();
  const slugs = Object.keys(contentIndex);
  
  console.log(`Total posts to process: ${slugs.length}\n`);
  
  const downloadQueue = [];
  const imageMap = new Map(); // URL -> local path
  
  // Collect all unique image URLs
  console.log('Scanning for images...');
  
  for (const slug of slugs) {
    const postFile = path.join(POSTS_DIR, `${slug}.json`);
    if (!fs.existsSync(postFile)) continue;
    
    try {
      const postData = JSON.parse(fs.readFileSync(postFile, 'utf8'));
      
      // Featured image
      if (postData.featuredImage && postData.featuredImage.includes('financialedge.com.ng')) {
        if (!imageMap.has(postData.featuredImage)) {
          const localName = getLocalFilename(postData.featuredImage);
          imageMap.set(postData.featuredImage, {
            localPath: `/images/${localName}`,
            fullPath: path.join(IMAGES_DIR, localName),
            type: 'featured',
            slug
          });
        }
      }
      
      // Inline images in HTML
      if (postData.html) {
        const inlineImages = extractImagesFromHtml(postData.html);
        for (const url of inlineImages) {
          if (!imageMap.has(url)) {
            const localName = getLocalFilename(url);
            imageMap.set(url, {
              localPath: `/images/${localName}`,
              fullPath: path.join(IMAGES_DIR, localName),
              type: 'inline',
              slug
            });
          }
        }
      }
    } catch (e) {
      console.error(`Error reading ${slug}:`, e.message);
    }
  }
  
  console.log(`Found ${imageMap.size} unique images to download\n`);
  
  // Download images
  let downloaded = 0;
  let failed = 0;
  let skipped = 0;
  
  const entries = Array.from(imageMap.entries());
  const BATCH_SIZE = 10;
  
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    console.log(`--- Downloading batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(entries.length / BATCH_SIZE)} (${batch.length} images) ---`);
    
    const batchPromises = batch.map(async ([url, info]) => {
      // Skip if already downloaded
      if (fs.existsSync(info.fullPath)) {
        skipped++;
        return { success: true, url, info };
      }
      
      try {
        await downloadImage(url, info.fullPath);
        downloaded++;
        console.log(`  ✓ Downloaded: ${path.basename(info.localPath)}`);
        return { success: true, url, info };
      } catch (error) {
        failed++;
        console.error(`  ✗ Failed: ${url} - ${error.message}`);
        return { success: false, url, info };
      }
    });
    
    await Promise.all(batchPromises);
    
    // Small delay between batches
    if (i + BATCH_SIZE < entries.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  console.log(`\n=== Download Summary ===`);
  console.log(`Total images: ${imageMap.size}`);
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Failed: ${failed}`);
  
  // Save image mapping for next step
  const mappingFile = path.join(CONTENT_DIR, 'image-mapping.json');
  const mapping = {};
  for (const [url, info] of imageMap) {
    mapping[url] = info.localPath;
  }
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  console.log(`\nImage mapping saved to: ${mappingFile}`);
  
  return { imageMap, downloaded, failed, skipped };
}

// Run the download
downloadAllImages().then(({ imageMap, downloaded, failed }) => {
  if (failed > 0) {
    console.log(`\n⚠ ${failed} images failed to download. You may want to retry later.`);
  }
  if (downloaded > 0) {
    console.log(`\n✓ Next step: Run update-content.js to replace remote URLs with local paths`);
  }
}).catch(console.error);
