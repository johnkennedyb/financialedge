import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

async function checkRecentPosts() {
  console.log("🔍 Checking recent posts...\n");
  
  try {
    // Get most recent posts by published_at
    const recentPosts = await db`
      SELECT 
        slug,
        title,
        status,
        published_at,
        created_at,
        categories
      FROM posts 
      WHERE status = 'publish'
      ORDER BY published_at DESC NULLS LAST
      LIMIT 20
    `;
    
    console.log(`Found ${recentPosts.length} published posts:\n`);
    
    recentPosts.forEach((post: any, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Status: ${post.status}`);
      console.log(`   Published: ${post.published_at || "NULL"}`);
      console.log(`   Created: ${post.created_at}`);
      console.log(`   Categories: ${JSON.stringify(post.categories)}\n`);
    });
    
    // Also check posts with status 'published' (wrong status)
    const wrongStatus = await db`
      SELECT 
        slug,
        title,
        status,
        published_at
      FROM posts 
      WHERE status = 'published'
      LIMIT 10
    `;
    
    if (wrongStatus.length > 0) {
      console.log(`\n⚠️  Found ${wrongStatus.length} posts with wrong status 'published':`);
      wrongStatus.forEach((post: any) => {
        console.log(`   - ${post.title}`);
      });
    }
    
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkRecentPosts();
