import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { getDb } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const runtime = "nodejs";

function contentDir() {
  return path.join(process.cwd(), "content");
}

function mediaMetaPath() {
  return path.join(contentDir(), "media.json");
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function sha1(input: string) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

function nowIso() {
  return new Date().toISOString();
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(filePath: string, value: unknown) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || "";
    const filename = `${sha1(`${file.name}:${nowIso()}:${bytes.length}`)}${ext}`;

    const mediaDir = path.join(process.cwd(), "public", "media");
    ensureDir(mediaDir);

    const diskPath = path.join(mediaDir, filename);
    fs.writeFileSync(diskPath, bytes);

    const url = `/media/${filename}`;
    const id = sha1(url);

    // Save to filesystem metadata
    const meta = readJson<Record<string, any>>(mediaMetaPath(), {});
    meta[id] = {
      id,
      filename,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
      size: bytes.length,
      url,
      altText: "",
      caption: "",
      uploadedAt: nowIso(),
    };
    writeJson(mediaMetaPath(), meta);

    // Also save to database so it appears in media library
    let dbSaved = false;
    try {
      const db = getDb();
      const result = await db`INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, caption)
        VALUES (${filename}, ${file.name}, ${file.type || "application/octet-stream"}, ${bytes.length}, ${url}, ${""}, ${""})
        ON CONFLICT (url) DO NOTHING
        RETURNING id`;
      dbSaved = result.length > 0;
      if (dbSaved) {
        console.log('[Upload] Saved to media database, id:', result[0].id);
      } else {
        console.log('[Upload] Media already exists in database (URL conflict):', url);
      }
    } catch (dbError) {
      console.error('[Upload] Failed to save to database:', dbError);
      // Continue even if DB fails - file is still saved
    }

    // Upload to Cloudinary
    let cloudinaryUrl = null;
    try {
      const publicId = `adverts/${filename.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50)}`;
      const uploadResult = await cloudinary.uploader.upload(diskPath, {
        public_id: publicId,
        folder: 'financialedge/adverts',
        resource_type: 'auto',
      });
      cloudinaryUrl = uploadResult.secure_url;
      
      // Update cloudinary-mapping.json
      const mappingPath = path.join(contentDir(), 'cloudinary-mapping.json');
      const mapping = readJson<Record<string, string>>(mappingPath, {});
      mapping[url] = cloudinaryUrl;
      writeJson(mappingPath, mapping);
      
      console.log('Uploaded to Cloudinary:', cloudinaryUrl);
    } catch (cloudinaryError) {
      console.error('Failed to upload to Cloudinary:', cloudinaryError);
      // Continue even if Cloudinary fails - local file is still saved
    }

    return NextResponse.json({
      ...meta[id],
      cloudinaryUrl,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
