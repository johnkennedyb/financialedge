/**
 * Fix posts with wrong category names to use proper slugs
 * Converts category names like "Capital Market" to slugs like "capital-market"
 * 
 * Usage: npx tsx scripts/fix-category-slugs.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

// Convert name to slug
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fixCategorySlugs() {
  console.log("🔧 Checking for posts with wrong category slugs...\n");
  
  try {
    // Get all categories to map names to slugs
    const categories = await db`SELECT slug, name FROM categories`;
    const categoryMap = new Map<string, string>();
    categories.forEach((c: any) => categoryMap.set(c.name.toLowerCase(), c.slug));
    
    console.log(`Found ${categories.length} categories:`);
    categories.forEach((c: any) => {
      console.log(`  - ${c.name} → ${c.slug}`);
    });
    console.log("");
    
    // Find all posts with categories
    const posts = await db`
      SELECT id, slug, title, categories
      FROM posts 
      WHERE categories IS NOT NULL AND array_length(categories, 1) > 0
    `;
    
    console.log(`Found ${posts.length} posts with categories\n`);
    
    let fixed = 0;
    let ok = 0;
    
    for (const post of posts) {
      const cats = post.categories || [];
      const newCats = cats.map((cat: string) => {
        const catLower = cat.toLowerCase();
        // If it's already a valid slug (lowercase with hyphens), keep it
        if (cat === catLower && cat.includes("-") && !cat.includes(" ")) {
          return cat;
        }
        // If we have a mapping, use the proper slug
        if (categoryMap.has(catLower)) {
          return categoryMap.get(catLower);
        }
        // Otherwise, convert to slug
        return nameToSlug(cat);
      });
      
      // Check if any category changed
      const hasChanged = cats.some((cat: string, i: number) => cat !== newCats[i]);
      
      if (hasChanged) {
        console.log(`📝 ${post.title}`);
        console.log(`   Old: [${cats.join(", ")}]`);
        console.log(`   New: [${newCats.join(", ")}]`);
        
        // Update the post
        await db`UPDATE posts SET categories = ${newCats} WHERE id = ${post.id}`;
        console.log(`   ✓ Fixed\n`);
        fixed++;
      } else {
        ok++;
      }
    }
    
    console.log(`\n✅ Done! Fixed ${fixed} posts, ${ok} were already correct.`);
    
  } catch (err) {
    console.error("\n❌ Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

async function main() {
  console.log("🚀 Starting category slug fix...\n");
  
  try {
    const testResult = await db`SELECT NOW()`;
    console.log("✅ Database connection successful\n");
    
    await fixCategorySlugs();
    
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
