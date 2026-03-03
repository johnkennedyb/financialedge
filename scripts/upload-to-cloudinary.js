require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary - requires environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const INDEX_FILE = path.join(CONTENT_DIR, 'index.json');
const MAPPING_FILE = path.join(CONTENT_DIR, 'cloudinary-mapping.json');

// Check Cloudinary config
function checkConfig() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Missing Cloudinary credentials in .env.local');
    console.log('Please add these to your .env.local file:');
    console.log('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('  CLOUDINARY_API_KEY=your_api_key');
    console.log('  CLOUDINARY_API_SECRET=your_api_secret');
    process.exit(1);
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

// Load or create mapping
function loadMapping() {
  try {
    if (fs.existsSync(MAPPING_FILE)) {
      return JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading mapping:', e.message);
  }
  return {};
}

function saveMapping(mapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
}

// Upload image URL directly to Cloudinary
async function uploadImageToCloudinary(imageUrl, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUrl,
      {
        public_id: publicId,
        folder: 'financialedge',
        resource_type: 'auto',
        overwrite: false, // Don't re-upload if exists
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
  });
}

// Generate a clean public ID from URL
function generatePublicId(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const basename = path.basename(pathname, path.extname(pathname));
    
    // Clean and shorten
    let clean = basename
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()
      .substring(0, 50);
    
    // Add hash if too short
    if (clean.length < 10) {
      const hash = Buffer.from(url).toString('base64').substring(0, 8);
      clean = `${clean}_${hash}`;
    }
    
    return clean;
  } catch {
    return `img_${Date.now()}`;
  }
}

// Extract all image URLs from content
function extractAllImageUrls() {
  const contentIndex = loadContentIndex();
  const slugs = Object.keys(contentIndex);
  const imageUrls = new Set();
  
  console.log(`Scanning ${slugs.length} posts for images...`);
  
  for (const slug of slugs) {
    const postFile = path.join(POSTS_DIR, `${slug}.json`);
    if (!fs.existsSync(postFile)) continue;
    
    try {
      const postData = JSON.parse(fs.readFileSync(postFile, 'utf8'));
      
      // Featured image
      if (postData.featuredImage && postData.featuredImage.includes('financialedge.com.ng')) {
        imageUrls.add(postData.featuredImage);
      }
      
      // Inline images
      if (postData.html) {
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(postData.html)) !== null) {
          const url = match[1];
          if (url && url.includes('financialedge.com.ng')) {
            imageUrls.add(url);
          }
        }
      }
    } catch (e) {
      console.error(`Error reading ${slug}:`, e.message);
    }
  }
  
  return Array.from(imageUrls);
}

// Main upload function
async function uploadAllImages() {
  checkConfig();
  
  console.log('=== Cloudinary Image Upload ===\n');
  console.log(`Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}\n`);
  
  const mapping = loadMapping();
  const imageUrls = extractAllImageUrls();
  
  console.log(`Found ${imageUrls.length} unique images to upload\n`);
  
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  
  // Process in batches to avoid rate limits
  const BATCH_SIZE = 10;
  
  for (let i = 0; i < imageUrls.length; i += BATCH_SIZE) {
    const batch = imageUrls.slice(i, i + BATCH_SIZE);
    console.log(`--- Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(imageUrls.length / BATCH_SIZE)} ---`);
    
    const batchPromises = batch.map(async (url) => {
      // Skip if already uploaded
      if (mapping[url]) {
        skipped++;
        return { success: true, url, cloudinaryUrl: mapping[url], skipped: true };
      }
      
      const publicId = generatePublicId(url);
      
      try {
        const cloudinaryUrl = await uploadImageToCloudinary(url, publicId);
        mapping[url] = cloudinaryUrl;
        uploaded++;
        console.log(`  ✓ Uploaded: ${publicId}`);
        return { success: true, url, cloudinaryUrl };
      } catch (error) {
        failed++;
        console.error(`  ✗ Failed: ${publicId} - ${error.message}`);
        return { success: false, url, error: error.message };
      }
    });
    
    await Promise.all(batchPromises);
    
    // Save mapping after each batch
    saveMapping(mapping);
    
    // Small delay between batches
    if (i + BATCH_SIZE < imageUrls.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log('\n=== Upload Complete ===');
  console.log(`Total images: ${imageUrls.length}`);
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped (already in Cloudinary): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`\nMapping saved to: ${MAPPING_FILE}`);
  console.log('\nNext: Run update-content-cloudinary.js to replace URLs in content files');
}

// Run the upload
uploadAllImages().catch(console.error);
