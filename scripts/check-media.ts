import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

async function checkMedia() {
  console.log("🔍 Checking media in database...\n");
  
  try {
    const media = await db`SELECT * FROM media ORDER BY uploaded_at DESC LIMIT 10`;
    
    console.log(`Found ${media.length} media files:\n`);
    
    media.forEach((m: any, i: number) => {
      console.log(`${i + 1}. ${m.original_name || m.filename}`);
      console.log(`   ID: ${m.id}`);
      console.log(`   URL: ${m.url?.substring(0, 60)}...`);
      console.log(`   Size: ${m.size} bytes`);
      console.log(`   Type: ${m.mime_type}`);
      console.log(`   Uploaded: ${m.uploaded_at}`);
      console.log("");
    });
    
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkMedia();
