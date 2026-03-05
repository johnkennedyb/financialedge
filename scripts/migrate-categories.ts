/**
 * Migration Script: Extract Categories from Posts
 * Run this to populate the categories table from existing post data
 * 
 * Usage: npx tsx scripts/migrate-categories.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

interface ImportedItem {
  section?: string;
  sectionSlug?: string;
}

async function extractAndMigrateCategories() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".json"));
  
  console.log(`🔍 Scanning ${files.length} posts for categories...`);
  
  // Extract unique categories
  const categoriesMap = new Map<string, { name: string; slug: string; count: number }>();
  
  for (const file of files) {
    try {
      const filePath = path.join(postsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const item: ImportedItem = JSON.parse(raw);
      
      if (item.sectionSlug && item.section) {
        const existing = categoriesMap.get(item.sectionSlug);
        if (existing) {
          existing.count++;
        } else {
          categoriesMap.set(item.sectionSlug, {
            slug: item.sectionSlug,
            name: item.section,
            count: 1
          });
        }
      }
    } catch (err) {
      // Skip corrupted files
    }
  }
  
  const categories = Array.from(categoriesMap.values());
  console.log(`🏷️ Found ${categories.length} unique categories:`);
  categories.forEach(cat => {
    console.log(`  - ${cat.name} (${cat.slug}): ${cat.count} posts`);
  });
  
  // Insert into database
  console.log("\n💾 Inserting categories into database...");
  
  let success = 0;
  let skipped = 0;
  
  for (const cat of categories) {
    try {
      // Check if already exists
      const existing = await db`SELECT id FROM categories WHERE slug = ${cat.slug}`;
      
      if (existing.length > 0) {
        // Update existing
        await db`UPDATE categories SET
          name = ${cat.name},
          description = ${`Category with ${cat.count} posts`},
          updated_at = CURRENT_TIMESTAMP
        WHERE slug = ${cat.slug}`;
        skipped++;
      } else {
        // Insert new
        await db`INSERT INTO categories (slug, name, description)
          VALUES (${cat.slug}, ${cat.name}, ${`Category with ${cat.count} posts`})`;
        success++;
      }
    } catch (err) {
      console.error(`  ✗ Failed to migrate ${cat.name}:`, err instanceof Error ? err.message : "Unknown error");
    }
  }
  
  console.log(`\n✅ Categories migration complete: ${success} new, ${skipped} updated`);
}

async function main() {
  console.log("🚀 Starting category extraction...\n");
  
  try {
    // Test connection
    const testResult = await db`SELECT NOW()`;
    console.log("✅ Database connection successful\n");
    
    await extractAndMigrateCategories();
    
    console.log("\n🎉 Done! Categories are now available in the admin dashboard.");
  } catch (err) {
    console.error("\n❌ Migration failed:", err instanceof Error ? err.message : "Unknown error");
    process.exit(1);
  }
}

main();
