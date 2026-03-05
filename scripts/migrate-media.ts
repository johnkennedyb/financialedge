/**
 * Migrate Cloudinary media to database
 * Reads cloudinary-mapping.json and inserts into media table
 * 
 * Usage: npx tsx scripts/migrate-media.ts
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

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
  };
  return mimeTypes[ext] || 'image/jpeg';
}

async function migrateMedia() {
  console.log("🚀 Starting media migration...\n");
  
  try {
    // Load cloudinary mapping
    const mappingPath = path.join(process.cwd(), "content", "cloudinary-mapping.json");
    const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
    
    const entries = Object.entries(mapping);
    console.log(`📸 Found ${entries.length} media files to migrate\n`);
    
    let success = 0;
    let skipped = 0;
    let failed = 0;
    
    for (const [originalUrl, cloudinaryUrl] of entries.slice(0, 100) as [string, string][]) { // Limit to 100 for testing
      try {
        // Extract filename from original URL
        const originalFilename = originalUrl.split('/').pop() || 'unknown';
        const cloudinaryFilename = cloudinaryUrl.split('/').pop() || originalFilename;
        
        // Check if already exists
        const existing = await db`SELECT id FROM media WHERE url = ${cloudinaryUrl} LIMIT 1`;
        if (existing.length > 0) {
          skipped++;
          continue;
        }
        
        // Insert into media table
        await db`INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, caption)
          VALUES (
            ${cloudinaryFilename},
            ${originalFilename},
            ${getMimeType(originalFilename)},
            ${0}, -- Size unknown from mapping
            ${cloudinaryUrl},
            ${''},
            ${''}
          )`;
        
        success++;
        if (success % 10 === 0) {
          console.log(`  ✓ Migrated ${success} files...`);
        }
      } catch (err) {
        failed++;
        console.error(`  ✗ Failed: ${originalUrl.split('/').pop()}`);
      }
    }
    
    console.log(`\n✅ Migration complete!`);
    console.log(`   Success: ${success}`);
    console.log(`   Skipped (already exists): ${skipped}`);
    console.log(`   Failed: ${failed}`);
    
    // Show total count
    const total = await db`SELECT COUNT(*) as count FROM media`;
    console.log(`\n📊 Total media in database: ${total[0].count}`);
    
  } catch (err) {
    console.error("\n❌ Migration failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

async function main() {
  console.log("🧪 Testing database connection...\n");
  
  try {
    const testResult = await db`SELECT NOW()`;
    console.log("✅ Database connection successful\n");
    
    await migrateMedia();
    
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
