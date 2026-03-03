require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
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

// Fetch all existing assets from Cloudinary folder
async function fetchExistingUploads() {
  console.log('=== Fetching Existing Cloudinary Uploads ===\n');
  
  const allResources = [];
  let nextCursor = null;
  
  do {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'financialedge/',
        max_results: 500,
        next_cursor: nextCursor
      });
      
      allResources.push(...result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`Fetched ${allResources.length} resources so far...`);
      
      // Small delay to avoid rate limits
      if (nextCursor) {
        await new Promise(r => setTimeout(r, 500));
      }
    } catch (error) {
      console.error('Error fetching resources:', error.message);
      break;
    }
  } while (nextCursor);
  
  console.log(`\nTotal resources in Cloudinary: ${allResources.length}`);
  return allResources;
}

// Build mapping from WordPress URLs to Cloudinary URLs
async function buildMapping() {
  const resources = await fetchExistingUploads();
  
  // Create mapping based on filename matching
  const mapping = {};
  
  for (const resource of resources) {
    // Extract the public_id (e.g., "financialedge/img_20250109_wa0015_mm90i8wv")
    const publicId = resource.public_id;
    const filename = publicId.replace('financialedge/', '');
    
    // The original URL would be reconstructed from the filename
    // We'll need to scan content to find matching URLs
    mapping[filename] = resource.secure_url;
  }
  
  console.log(`\nBuilt mapping with ${Object.keys(mapping).length} entries`);
  return mapping;
}

// Scan content and match images
async function matchContentImages() {
  const cloudinaryMap = await buildMapping();
  
  console.log('\n=== Scanning Content for Image Matches ===\n');
  
  // Load content index
  const indexData = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
  const items = indexData.items || {};
  const slugs = Object.keys(items);
  
  const finalMapping = {};
  let matched = 0;
  let unmatched = 0;
  
  for (const slug of slugs) {
    const postFile = path.join(POSTS_DIR, `${slug}.json`);
    if (!fs.existsSync(postFile)) continue;
    
    try {
      const postData = JSON.parse(fs.readFileSync(postFile, 'utf8'));
      
      // Check featured image
      if (postData.featuredImage && postData.featuredImage.includes('financialedge.com.ng')) {
        const wpUrl = postData.featuredImage;
        const basename = path.basename(wpUrl, path.extname(wpUrl)).toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        // Find matching Cloudinary URL
        for (const [filename, cloudUrl] of Object.entries(cloudinaryMap)) {
          if (filename.includes(basename) || basename.includes(filename.substring(0, 20))) {
            finalMapping[wpUrl] = cloudUrl;
            matched++;
            break;
          }
        }
      }
      
      // Check HTML for inline images
      if (postData.html) {
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(postData.html)) !== null) {
          const wpUrl = match[1];
          if (wpUrl && wpUrl.includes('financialedge.com.ng') && !finalMapping[wpUrl]) {
            const basename = path.basename(wpUrl, path.extname(wpUrl)).toLowerCase().replace(/[^a-z0-9]/g, '_');
            
            for (const [filename, cloudUrl] of Object.entries(cloudinaryMap)) {
              if (filename.includes(basename) || basename.includes(filename.substring(0, 20))) {
                finalMapping[wpUrl] = cloudUrl;
                matched++;
                break;
              }
            }
          }
        }
      }
    } catch (e) {
      console.error(`Error reading ${slug}:`, e.message);
    }
  }
  
  console.log(`\nMatched: ${matched} images`);
  console.log(`Unmatched: ${unmatched} images`);
  
  // Save mapping
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(finalMapping, null, 2));
  console.log(`\n✓ Mapping saved to ${MAPPING_FILE}`);
  console.log(`\nNext: Run node scripts/update-content-cloudinary.js to update content files`);
}

// Run the recovery
matchContentImages().catch(console.error);
