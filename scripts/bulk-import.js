const fs = require('fs');
const path = require('path');
const https = require('https');

const WP_API_URL = 'https://financialedge.com.ng/wp-json/wp/v2';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const INDEX_FILE = path.join(CONTENT_DIR, 'index.json');
const IMPORT_STATE_FILE = path.join(CONTENT_DIR, 'import-state.json');

// Category mapping from WordPress to local section names
const CATEGORY_MAP = {
  17: { name: 'Agro Business', slug: 'agriculture' },
  18: { name: 'Arts', slug: 'arts' },
  36: { name: 'Capital Market', slug: 'capital-market' },
  19: { name: 'Editorial', slug: 'editorial' },
  20: { name: 'Education', slug: 'education' },
  21: { name: 'Energy', slug: 'energy' },
  29757: { name: 'Environment & Sustainability', slug: 'environment-sustainability' },
  41: { name: 'Featured', slug: 'featured' },
  2: { name: 'Features', slug: 'features' },
  22: { name: 'Finance', slug: 'finance' },
  29756: { name: 'Gallery', slug: 'gallery' },
  23: { name: 'Health Matters', slug: 'health-matters' },
  24: { name: 'Industry', slug: 'industry' },
  25: { name: 'Info Tech', slug: 'info-tech' },
  26: { name: 'Insurance & Pension', slug: 'insurance-pension' },
  27: { name: 'Interviews', slug: 'interviews' },
  28: { name: 'Learning Centre', slug: 'learning' },
  29: { name: 'Money Market', slug: 'money-market' },
  30: { name: 'News', slug: 'news' },
  31: { name: 'Opinion', slug: 'opinion' },
  33: { name: 'Real Estate', slug: 'real-estate' },
  34: { name: 'Speeches', slug: 'speech' },
  35: { name: 'Transport Business', slug: 'transport-business' },
  1: { name: 'Uncategorized', slug: 'uncategorized' }
};

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

// Get primary category from post
function getPrimaryCategory(post) {
  const categories = post.categories || [];
  const embeddedCats = post._embedded?.['wp:term']?.[0] || [];
  
  // Find the first non-News category, or fall back to News
  for (const catId of categories) {
    const cat = CATEGORY_MAP[catId];
    if (cat && cat.slug !== 'news') {
      return cat;
    }
  }
  
  // If only News or no category found, return News
  if (categories.includes(30)) {
    return CATEGORY_MAP[30];
  }
  
  // Fallback to first available category
  if (categories.length > 0 && embeddedCats.length > 0) {
    const firstCat = embeddedCats[0];
    return { name: firstCat.name, slug: firstCat.slug };
  }
  
  return { name: 'News', slug: 'news' };
}

// Get featured image URL
function getFeaturedImage(post) {
  if (post.featured_media && post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    if (media.source_url) {
      return media.source_url;
    }
    // Try to get from media details
    if (media.media_details?.sizes?.full?.source_url) {
      return media.media_details.sizes.full.source_url;
    }
  }
  return null;
}

// Clean HTML content
function cleanHtml(html) {
  if (!html) return '';
  // Remove script and style tags
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '');
}

// Fetch posts with pagination
async function fetchAllPosts() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;
  
  console.log('Fetching all posts from WordPress...');
  
  while (hasMore && page <= 100) { // Limit to 100 pages (10,000 posts)
    try {
      const url = `${WP_API_URL}/posts?per_page=100&page=${page}&_embed`;
      console.log(`Fetching page ${page}...`);
      
      const posts = await fetchJson(url);
      
      if (!Array.isArray(posts) || posts.length === 0) {
        hasMore = false;
        break;
      }
      
      allPosts.push(...posts);
      console.log(`✓ Page ${page}: ${posts.length} posts (Total: ${allPosts.length})`);
      
      if (posts.length < 100) {
        hasMore = false;
      }
      
      page++;
      
      // Small delay to be nice to the server
      await new Promise(r => setTimeout(r, 500));
      
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error.message);
      hasMore = false;
    }
  }
  
  console.log(`\nTotal posts fetched: ${allPosts.length}`);
  return allPosts;
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

// Save import state
function saveImportState(state) {
  fs.writeFileSync(IMPORT_STATE_FILE, JSON.stringify(state, null, 2));
}

// Main import function
async function importPosts() {
  // Ensure directories exist
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  
  // Load existing data
  const existingIndex = loadExistingIndex();
  const importState = loadImportState();
  const doneUrls = new Set(importState.done || []);
  
  console.log(`Existing posts in index: ${Object.keys(existingIndex).length}`);
  console.log(`Already imported URLs: ${doneUrls.size}`);
  
  // Fetch all posts from WordPress
  const wpPosts = await fetchAllPosts();
  
  // Process posts
  let imported = 0;
  let skipped = 0;
  let errors = 0;
  
  const newItems = { ...existingIndex };
  const newDoneUrls = [...importState.done];
  
  for (const post of wpPosts) {
    const sourceUrl = post.link;
    const slug = post.slug;
    
    // Skip if already imported
    if (doneUrls.has(sourceUrl) || existingIndex[slug]) {
      skipped++;
      continue;
    }
    
    try {
      const category = getPrimaryCategory(post);
      const featuredImage = getFeaturedImage(post);
      
      // Create post data
      const postData = {
        slug: slug,
        type: 'post',
        title: post.title?.rendered || 'Untitled',
        description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 200) || null,
        publishedAt: post.date_gmt + '+01:00',
        featuredImage: featuredImage,
        sourceUrl: sourceUrl,
        section: category.name,
        sectionSlug: category.slug,
        html: cleanHtml(post.content?.rendered || '')
      };
      
      // Save individual post file
      const postFile = path.join(POSTS_DIR, `${slug}.json`);
      fs.writeFileSync(postFile, JSON.stringify(postData, null, 2));
      
      // Add to index (without full HTML to keep index smaller)
      const indexItem = {
        slug: slug,
        type: 'post',
        title: postData.title,
        description: postData.description,
        publishedAt: postData.publishedAt,
        featuredImage: postData.featuredImage,
        sourceUrl: postData.sourceUrl,
        section: postData.section,
        sectionSlug: postData.sectionSlug
      };
      
      newItems[slug] = indexItem;
      newDoneUrls.push(sourceUrl);
      imported++;
      
      if (imported % 100 === 0) {
        console.log(`  Imported ${imported} posts...`);
      }
      
    } catch (error) {
      console.error(`Error importing post ${slug}:`, error.message);
      errors++;
    }
  }
  
  // Save updated index
  const indexData = {
    generatedAt: new Date().toISOString(),
    items: newItems
  };
  
  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
  
  // Save import state
  saveImportState({ done: newDoneUrls });
  
  console.log('\n=== Import Complete ===');
  console.log(`Total posts in index: ${Object.keys(newItems).length}`);
  console.log(`Newly imported: ${imported}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

// Run the import
importPosts().catch(console.error);
