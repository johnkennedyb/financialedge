import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

async function checkTopPosts() {
  console.log("🔍 Checking TOP 5 posts by published_at...\n");
  
  try {
    // Get most recent posts by published_at
    const recentPosts = await db`
      SELECT 
        slug,
        title,
        status,
        published_at,
        created_at
      FROM posts 
      WHERE status = 'publish'
      ORDER BY published_at DESC NULLS LAST
      LIMIT 5
    `;
    
    console.log("Top 5 posts that should appear on homepage:\n");
    
    recentPosts.forEach((post: any, i: number) => {
      const pubDate = post.published_at ? new Date(post.published_at).toLocaleDateString() : "NULL";
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   Published: ${pubDate}`);
      console.log(`   Status: ${post.status}`);
      console.log("");
    });
    
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkTopPosts();
