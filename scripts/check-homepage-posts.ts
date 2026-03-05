import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

async function checkHomepagePosts() {
  console.log("🔍 Posts that SHOULD appear on homepage (first 12):\n");
  
  try {
    // This is the exact same query the homepage uses
    const posts = await db`
      SELECT 
        slug,
        title,
        status,
        published_at,
        categories
      FROM posts 
      WHERE status = 'publish'
      ORDER BY published_at DESC NULLS LAST, created_at DESC
      LIMIT 12
    `;
    
    console.log(`Total posts fetched: ${posts.length}\n`);
    
    posts.forEach((post: any, i: number) => {
      const pubDate = post.published_at 
        ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : "NULL";
      
      const position = i === 0 ? "FEATURED" : `Grid #${i}`;
      console.log(`${i}. [${position}] ${post.title}`);
      console.log(`   Published: ${pubDate}`);
      console.log("");
    });
    
    // Show posts that get sliced out
    if (posts.length > 10) {
      console.log("\n⚠️ Posts NOT shown on homepage (only first 10 are displayed):");
      posts.slice(10).forEach((post: any, i: number) => {
        console.log(`   ${i + 11}. ${post.title}`);
      });
    }
    
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkHomepagePosts();
