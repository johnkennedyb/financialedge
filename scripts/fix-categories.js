const fs = require('fs');
const path = require('path');
const https = require('https');

const WP_API_URL = 'https://financialedge.com.ng/wp-json/wp/v2';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const INDEX_FILE = path.join(CONTENT_DIR, 'index.json');
const IMPORT_STATE_FILE = path.join(CONTENT_DIR, 'import-state.json');

// Category mapping from WordPress to local section names
// Ordered by priority (more specific categories first)
const CATEGORY_PRIORITY = [
  { id: 35, name: 'Transport Business', slug: 'transport-business' },
  { id: 17, name: 'Agro Business', slug: 'agriculture' },
  { id: 18, name: 'Arts', slug: 'arts' },
  { id: 36, name: 'Capital Market', slug: 'capital-market' },
  { id: 29, name: 'Money Market', slug: 'money-market' },
  { id: 21, name: 'Energy', slug: 'energy' },
  { id: 29757, name: 'Environment & Sustainability', slug: 'environment-sustainability' },
  { id: 24, name: 'Industry', slug: 'industry' },
  { id: 25, name: 'Info Tech', slug: 'info-tech' },
  { id: 26, name: 'Insurance & Pension', slug: 'insurance-pension' },
  { id: 33, name: 'Real Estate', slug: 'real-estate' },
  { id: 23, name: 'Health Matters', slug: 'health-matters' },
  { id: 20, name: 'Education', slug: 'education' },
  { id: 27, name: 'Interviews', slug: 'interviews' },
  { id: 28, name: 'Learning Centre', slug: 'learning' },
  { id: 31, name: 'Opinion', slug: 'opinion' },
  { id: 34, name: 'Speeches', slug: 'speech' },
  { id: 19, name: 'Editorial', slug: 'editorial' },
  { id: 41, name: 'Featured', slug: 'featured' },
  { id: 2, name: 'Features', slug: 'features' },
  { id: 29756, name: 'Gallery', slug: 'gallery' },
  { id: 30, name: 'News', slug: 'news' },
  { id: 1, name: 'Uncategorized', slug: 'uncategorized' }
];

const CATEGORY_MAP = Object.fromEntries(CATEGORY_PRIORITY.map(c => [c.id, c]));

// Helper to make HTTPS requests
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// Get primary category from post using priority order
function getPrimaryCategory(post) {
  const categories = post.categories || [];
  const embeddedCats = post._embedded?.['wp:term']?.[0] || [];
  
  // Find the highest priority category (first match in priority list)
  for (const priorityCat of CATEGORY_PRIORITY) {
    if (categories.includes(priorityCat.id)) {
      return priorityCat;
    }
  }
  
  // Fallback to first available category from embedded data
  if (categories.length > 0 && embeddedCats.length > 0) {
    const firstCat = embeddedCats[0];
    return { name: firstCat.name, slug: firstCat.slug };
  }
  
  return { name: 'News', slug: 'news' };
}

// Load existing index
function loadExistingIndex() {
  try {
    if (fs.existsSync(INDEX_FILE)) {
      const data = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
      return data.items || {};
    }
  } catch (e) {
    console.error('Error loading index:', e.message);
  }
  return {};
}

// Load import state
function loadImportState() {
  try {
    if (fs.existsSync(IMPORT_STATE_FILE)) {
      const state = JSON.parse(fs.readFileSync(IMPORT_STATE_FILE, 'utf8'));
      return {
        done: Array.isArray(state.done) ? state.done : []
      };
    }
  } catch (e) {
    console.error('Error loading import state:', e.message);
  }
  return { done: [] };
}

// Fetch all posts from WordPress with pagination
async function fetchAllWpPosts() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;

  console.log('Fetching all posts from WordPress for category fix...');

  while (hasMore && page <= 150) {
    try {
      const url = `${WP_API_URL}/posts?per_page=100&page=${page}&_embed`;
      console.log(`Fetching WP posts page ${page}...`);

      const posts = await fetchJson(url);
      if (!Array.isArray(posts) || posts.length === 0) {
        hasMore = false;
        break;
      }

      allPosts.push(...posts);

      if (posts.length < 100) {
        hasMore = false;
      }

      page++;
      await new Promise(r => setTimeout(r, 400));
    } catch (error) {
      console.error(`Error fetching WP posts page ${page}:`, error.message);
      throw error;
    }
  }

  console.log(`Total WP posts fetched for fix: ${allPosts.length}`);
  return allPosts;
}

// Main function to fix categories
async function fixCategories() {
  console.log('=== Starting Category Fix ===\n');
  
  // Load existing data
  const existingIndex = loadExistingIndex();
  const slugs = Object.keys(existingIndex);

  console.log(`Total local index items to consider: ${slugs.length}`);

  // Fetch WP posts once and build slug->category map
  const wpPosts = await fetchAllWpPosts();
  const wpCategoryBySlug = new Map();
  for (const wpPost of wpPosts) {
    const slug = wpPost.slug;
    if (!slug) continue;
    const cat = getPrimaryCategory(wpPost);
    wpCategoryBySlug.set(slug, cat);
  }

  console.log(`WP slugs available for fix: ${wpCategoryBySlug.size}`);

  let fixed = 0;
  let unchanged = 0;
  let skipped = 0;
  let errors = 0;
  let categoryCounts = {};

  const BATCH_SIZE = 200;
  const batches = Math.ceil(slugs.length / BATCH_SIZE);

  for (let batchNum = 0; batchNum < batches; batchNum++) {
    const batchSlugs = slugs.slice(batchNum * BATCH_SIZE, (batchNum + 1) * BATCH_SIZE);
    console.log(`\n--- Updating batch ${batchNum + 1}/${batches} (${batchSlugs.length} items) ---`);

    for (const slug of batchSlugs) {
      try {
        const correctCategory = wpCategoryBySlug.get(slug);
        if (!correctCategory) {
          skipped++;
          continue;
        }

        categoryCounts[correctCategory.slug] = (categoryCounts[correctCategory.slug] || 0) + 1;

        const postFile = path.join(POSTS_DIR, `${slug}.json`);
        if (fs.existsSync(postFile)) {
          const postData = JSON.parse(fs.readFileSync(postFile, 'utf8'));
          const currentCategory = postData.sectionSlug;

          if (correctCategory.slug !== currentCategory) {
            postData.section = correctCategory.name;
            postData.sectionSlug = correctCategory.slug;
            fs.writeFileSync(postFile, JSON.stringify(postData, null, 2));

            if (existingIndex[slug]) {
              existingIndex[slug].section = correctCategory.name;
              existingIndex[slug].sectionSlug = correctCategory.slug;
            }

            fixed++;
          } else {
            unchanged++;
          }
        } else {
          // No post file; just update index if present
          if (existingIndex[slug]) {
            const currentCategory = existingIndex[slug].sectionSlug;
            if (correctCategory.slug !== currentCategory) {
              existingIndex[slug].section = correctCategory.name;
              existingIndex[slug].sectionSlug = correctCategory.slug;
              fixed++;
            } else {
              unchanged++;
            }
          } else {
            skipped++;
          }
        }
      } catch (error) {
        console.error(`  ✗ Error processing ${slug}:`, error.message);
        errors++;
      }
    }

    const indexData = {
      generatedAt: new Date().toISOString(),
      items: existingIndex
    };
    fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));

    console.log(`Batch ${batchNum + 1} saved. Progress: ${fixed} fixed, ${unchanged} unchanged, ${skipped} skipped, ${errors} errors`);
  }
  
  console.log('\n=== Category Fix Complete ===');
  console.log(`Total fixed: ${fixed}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Skipped (no WP match): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log('\nCategory distribution:');
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });
}

// Run the fix
fixCategories().catch(console.error);
