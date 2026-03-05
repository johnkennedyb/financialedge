/**
 * Fix posts with incorrect "published" status to "publish"
 * This ensures all posts appear on the website frontend
 * 
 * Usage: npx tsx scripts/fix-post-status.ts
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

async function fixPostStatus() {
  console.log("🔧 Checking for posts with 'published' status...\n");
  
  try {
    // Find posts with "published" status
    const postsWithWrongStatus = await db`
      SELECT id, slug, title, status, published_at
      FROM posts 
      WHERE status = 'published'
    `;
    
    if (postsWithWrongStatus.length === 0) {
      console.log("✅ No posts found with 'published' status");
      
      // Check for posts with null published_at
      const postsWithNullDate = await db`
        SELECT id, slug, title, status, published_at
        FROM posts 
        WHERE status = 'publish' AND published_at IS NULL
      `;
      
      if (postsWithNullDate.length > 0) {
        console.log(`\n⚠️ Found ${postsWithNullDate.length} published posts with missing dates:`);
        postsWithNullDate.forEach((post: any) => {
          console.log(`  - ${post.title} (${post.slug})`);
        });
        
        // Fix by setting published_at to created_at or current time
        console.log("\n📅 Fixing missing dates...");
        for (const post of postsWithNullDate) {
          await db`
            UPDATE posts 
            SET published_at = COALESCE(created_at, CURRENT_TIMESTAMP)
            WHERE id = ${post.id}
          `;
          console.log(`  ✓ Fixed date for: ${post.title}`);
        }
      }
      
      console.log("\n🎉 All done!");
      return;
    }
    
    console.log(`⚠️ Found ${postsWithWrongStatus.length} posts with 'published' status:\n`);
    postsWithWrongStatus.forEach((post: any) => {
      console.log(`  - ${post.title} (${post.slug})`);
      console.log(`    Current status: ${post.status}`);
      console.log(`    Published at: ${post.published_at || "NULL"}\n`);
    });
    
    // Fix the status and set published_at if needed
    console.log("🔧 Fixing status values...\n");
    
    for (const post of postsWithWrongStatus) {
      // Update status to 'publish' and set published_at if it's null
      await db`
        UPDATE posts 
        SET 
          status = 'publish',
          published_at = COALESCE(published_at, created_at, CURRENT_TIMESTAMP)
        WHERE id = ${post.id}
      `;
      console.log(`  ✓ Fixed: ${post.title} → status='publish'`);
    }
    
    console.log(`\n✅ Fixed ${postsWithWrongStatus.length} posts`);
    
    // Also check for posts with status='publish' but null published_at
    const postsWithNullDate = await db`
      SELECT id, slug, title, published_at
      FROM posts 
      WHERE status = 'publish' AND published_at IS NULL
    `;
    
    if (postsWithNullDate.length > 0) {
      console.log(`\n⚠️ Found ${postsWithNullDate.length} additional posts with missing dates`);
      
      for (const post of postsWithNullDate) {
        await db`
          UPDATE posts 
          SET published_at = COALESCE(created_at, CURRENT_TIMESTAMP)
          WHERE id = ${post.id}
        `;
        console.log(`  ✓ Fixed date for: ${post.title}`);
      }
    }
    
    console.log("\n🎉 All posts are now correctly configured!");
    
  } catch (err) {
    console.error("\n❌ Error fixing posts:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

async function main() {
  console.log("🚀 Starting post status fix...\n");
  
  try {
    // Test connection
    const testResult = await db`SELECT NOW()`;
    console.log("✅ Database connection successful\n");
    
    await fixPostStatus();
    
    console.log("\n📊 Summary:");
    const totalPublished = await db`SELECT COUNT(*) as count FROM posts WHERE status = 'publish'`;
    console.log(`   Total published posts: ${totalPublished[0].count}`);
    
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
