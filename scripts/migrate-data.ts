/**
 * Migration Script: JSON Files to PostgreSQL Database
 * Run this locally to migrate your WordPress content to the Neon database
 * 
 * Usage:
 * 1. Set DATABASE_URL in your .env.local
 * 2. Run: npx tsx scripts/migrate-data.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

interface CategoryData {
  name?: string;
  description?: string;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

const contentDir = path.join(process.cwd(), "content");

interface ImportedItem {
  slug: string;
  type: string;
  title: string;
  description?: string;
  publishedAt?: string;
  featuredImage?: string;
  sourceUrl?: string;
  section?: string;
  sectionSlug?: string;
  html?: string;
}

async function migratePosts() {
  const postsDir = path.join(contentDir, "posts");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".json"));
  
  console.log(`📝 Found ${files.length} posts to migrate...`);
  
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(postsDir, file);
    
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const item: ImportedItem = JSON.parse(raw);
      
      // Generate slug from filename if not present
      const slug = item.slug || file.replace(".json", "");
      
      // Map sectionSlug to category
      const categories = item.sectionSlug ? [item.sectionSlug] : [];
      
      // Determine status based on publishedAt
      const status = item.publishedAt ? "publish" : "draft";
      
      // Check if post already exists
      const existing = await db`SELECT id FROM posts WHERE slug = ${slug}`;
      
      if (existing.length > 0) {
        // Update existing
        await db`UPDATE posts SET
          title = ${item.title},
          content = ${item.html || ""},
          excerpt = ${item.description || ""},
          status = ${status},
          author = ${'admin'},
          featured_image = ${item.featuredImage || null},
          categories = ${categories},
          tags = ${[]},
          meta_description = ${item.description || null},
          meta_keywords = ${[]},
          published_at = ${item.publishedAt || null},
          updated_at = CURRENT_TIMESTAMP
        WHERE slug = ${slug}`;
      } else {
        // Insert new
        await db`INSERT INTO posts (
          slug, title, content, excerpt, status, author,
          featured_image, categories, tags, meta_description, meta_keywords, published_at
        ) VALUES (
          ${slug}, ${item.title}, ${item.html || ""}, ${item.description || ""},
          ${status}, ${'admin'}, ${item.featuredImage || null},
          ${categories}, ${[]}, ${item.description || null}, ${[]}, ${item.publishedAt || null}
        )`;
      }
      
      success++;
      
      // Progress every 100 items
      if ((i + 1) % 100 === 0) {
        console.log(`  ✓ Migrated ${i + 1}/${files.length} posts...`);
      }
    } catch (err) {
      failed++;
      console.error(`  ✗ Failed to migrate ${file}:`, err instanceof Error ? err.message : "Unknown error");
    }
  }
  
  console.log(`✅ Posts migration complete: ${success} success, ${failed} failed`);
}

async function migratePages() {
  const pagesDir = path.join(contentDir, "pages");
  
  if (!fs.existsSync(pagesDir)) {
    console.log("⚠️ No pages directory found");
    return;
  }
  
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith(".json"));
  
  console.log(`📄 Found ${files.length} pages to migrate...`);
  
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    const filePath = path.join(pagesDir, file);
    
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const item: ImportedItem = JSON.parse(raw);
      
      const slug = item.slug || file.replace(".json", "");
      const status = item.publishedAt ? "publish" : "draft";
      
      const existing = await db`SELECT id FROM pages WHERE slug = ${slug}`;
      
      if (existing.length > 0) {
        await db`UPDATE pages SET
          title = ${item.title},
          content = ${item.html || ""},
          excerpt = ${item.description || ""},
          status = ${status},
          author = ${'admin'},
          featured_image = ${item.featuredImage || null},
          meta_description = ${item.description || null},
          meta_keywords = ${[]},
          published_at = ${item.publishedAt || null},
          updated_at = CURRENT_TIMESTAMP
        WHERE slug = ${slug}`;
      } else {
        await db`INSERT INTO pages (
          slug, title, content, excerpt, status, author,
          featured_image, meta_description, meta_keywords, published_at
        ) VALUES (
          ${slug}, ${item.title}, ${item.html || ""}, ${item.description || ""},
          ${status}, ${'admin'}, ${item.featuredImage || null},
          ${item.description || null}, ${[]}, ${item.publishedAt || null}
        )`;
      }
      
      success++;
    } catch (err) {
      failed++;
      console.error(`  ✗ Failed to migrate ${file}:`, err instanceof Error ? err.message : "Unknown error");
    }
  }
  
  console.log(`✅ Pages migration complete: ${success} success, ${failed} failed`);
}

async function migrateCategories() {
  const categoriesDir = path.join(contentDir, "categories");
  
  if (!fs.existsSync(categoriesDir)) {
    console.log("⚠️ No categories directory found");
    return;
  }
  
  // Try to read categories from meta file
  const metaPath = path.join(categoriesDir, "meta.json");
  if (!fs.existsSync(metaPath)) {
    console.log("⚠️ No categories meta file found");
    return;
  }
  
  try {
    const raw = fs.readFileSync(metaPath, "utf-8");
    const categories = JSON.parse(raw);
    
    console.log(`🏷️ Found ${Object.keys(categories).length} categories to migrate...`);
    
    let success = 0;
    
    for (const [slug, data] of Object.entries(categories) as [string, CategoryData][]) {
      try {
        const existing = await db`SELECT id FROM categories WHERE slug = ${slug}`;
        
        if (existing.length > 0) {
          await db`UPDATE categories SET
            name = ${data.name || slug},
            description = ${data.description || ""},
            updated_at = CURRENT_TIMESTAMP
          WHERE slug = ${slug}`;
        } else {
          await db`INSERT INTO categories (slug, name, description)
            VALUES (${slug}, ${data.name || slug}, ${data.description || ""})`;
        }
        
        success++;
      } catch (err) {
        console.error(`  ✗ Failed to migrate category ${slug}:`, err instanceof Error ? err.message : "Unknown error");
      }
    }
    
    console.log(`✅ Categories migration complete: ${success} migrated`);
  } catch (err) {
    console.error("❌ Failed to read categories:", err instanceof Error ? err.message : "Unknown error");
  }
}

async function main() {
  console.log("🚀 Starting data migration...\n");
  
  try {
    // Test connection
    const testResult = await db`SELECT NOW()`;
    console.log("✅ Database connection successful\n");
    
    // Run migrations in order
    await migrateCategories();
    await migratePosts();
    await migratePages();
    
    console.log("\n🎉 Migration complete!");
  } catch (err) {
    console.error("\n❌ Migration failed:", err instanceof Error ? err.message : "Unknown error");
    process.exit(1);
  }
}

main();
