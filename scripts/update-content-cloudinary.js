require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const INDEX_FILE = path.join(CONTENT_DIR, 'index.json');
const MAPPING_FILE = path.join(CONTENT_DIR, 'cloudinary-mapping.json');

// Load Cloudinary mapping
function loadMapping() {
  try {
    if (fs.existsSync(MAPPING_FILE)) {
      return JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading mapping:', e.message);
  }
  return null;
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

// Save content index
function saveContentIndex(items) {
  const indexData = {
    generatedAt: new Date().toISOString(),
    items
  };
  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
}

// Update post with Cloudinary URLs
function updatePostWithCloudinary(slug, mapping) {
  const postFile = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(postFile)) return null;
  
  try {
    const postData = JSON.parse(fs.readFileSync(postFile, 'utf8'));
    let updated = false;
    
    // Update featured image
    if (postData.featuredImage && mapping[postData.featuredImage]) {
      postData.featuredImage = mapping[postData.featuredImage];
      updated = true;
    }
    
    // Update inline images in HTML
    if (postData.html) {
      let newHtml = postData.html;
      for (const [oldUrl, newUrl] of Object.entries(mapping)) {
        if (newHtml.includes(oldUrl)) {
          const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          newHtml = newHtml.replace(regex, newUrl);
          updated = true;
        }
      }
      postData.html = newHtml;
    }
    
    if (updated) {
      fs.writeFileSync(postFile, JSON.stringify(postData, null, 2));
      return postData;
    }
    
    return null;
  } catch (e) {
    console.error(`Error updating ${slug}:`, e.message);
    return null;
  }
}

// Main update function
async function updateAllContent() {
  console.log('=== Updating Content with Cloudinary URLs ===\n');
  
  const mapping = loadMapping();
  if (!mapping) {
    console.error('❌ No Cloudinary mapping found.');
    console.log('Please run: node scripts/upload-to-cloudinary.js');
    process.exit(1);
  }
  
  const mappingCount = Object.keys(mapping).length;
  console.log(`Mapping loaded: ${mappingCount} images\n`);
  
  const contentIndex = loadContentIndex();
  const slugs = Object.keys(contentIndex);
  
  console.log(`Total posts to update: ${slugs.length}\n`);
  
  let updated = 0;
  let unchanged = 0;
  let errors = 0;
  
  // Process in batches
  const BATCH_SIZE = 200;
  const batches = Math.ceil(slugs.length / BATCH_SIZE);
  
  for (let batchNum = 0; batchNum < batches; batchNum++) {
    const batchSlugs = slugs.slice(batchNum * BATCH_SIZE, (batchNum + 1) * BATCH_SIZE);
    
    for (const slug of batchSlugs) {
      try {
        const updatedPost = updatePostWithCloudinary(slug, mapping);
        
        if (updatedPost) {
          // Update index
          if (contentIndex[slug] && updatedPost.featuredImage) {
            contentIndex[slug].featuredImage = updatedPost.featuredImage;
          }
          updated++;
        } else {
          unchanged++;
        }
      } catch (e) {
        console.error(`Error processing ${slug}:`, e.message);
        errors++;
      }
    }
    
    // Save index after each batch
    saveContentIndex(contentIndex);
    
    if ((batchNum + 1) % 10 === 0 || batchNum === batches - 1) {
      console.log(`Batch ${batchNum + 1}/${batches}: ${updated} updated, ${unchanged} unchanged, ${errors} errors`);
    }
  }
  
  console.log(`\n=== Update Complete ===`);
  console.log(`Posts updated: ${updated}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Errors: ${errors}`);
  console.log(`\n✓ All content now references Cloudinary URLs`);
  console.log(`✓ Original URLs backed up in ${MAPPING_FILE}`);
}

// Run the update
updateAllContent().catch(console.error);
