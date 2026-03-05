import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined");
  process.exit(1);
}

const db = neon(connectionString);

async function checkMediaDates() {
  console.log("🔍 Checking media dates in database...\n");
  
  try {
    const media = await db`SELECT * FROM media ORDER BY uploaded_at DESC LIMIT 10`;
    
    console.log(`Found ${media.length} media files:\n`);
    
    media.forEach((m: any, i: number) => {
      console.log(`${i + 1}. ${m.original_name || m.filename}`);
      console.log(`   URL: ${m.url?.substring(0, 50)}...`);
      console.log(`   uploaded_at (raw): ${m.uploaded_at}`);
      console.log(`   uploaded_at (ISO): ${m.uploaded_at ? new Date(m.uploaded_at).toISOString() : "NULL"}`);
      console.log(`   uploaded_at (date only): ${m.uploaded_at ? new Date(m.uploaded_at).toISOString().split("T")[0] : "NULL"}`);
      console.log("");
    });
    
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkMediaDates();
