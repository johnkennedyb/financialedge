import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // Create upload signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = await generateSignature(timestamp);

    // Upload to Cloudinary
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("api_key", CLOUDINARY_API_KEY);
    uploadForm.append("timestamp", timestamp.toString());
    uploadForm.append("signature", signature);
    uploadForm.append("folder", "financialedge");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: uploadForm,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Cloudinary upload failed: ${error}` },
        { status: 500 }
      );
    }

    const result = await response.json();

    // Save to local database so it appears in media library
    let mediaId = null;
    try {
      const db = getDb();
      const insertResult = await db`INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, caption)
        VALUES (${result.public_id}, ${file.name}, ${file.type || "image/jpeg"}, ${result.bytes || 0}, ${result.secure_url}, ${""}, ${""})
        ON CONFLICT (url) DO UPDATE SET
          filename = EXCLUDED.filename,
          original_name = EXCLUDED.original_name,
          mime_type = EXCLUDED.mime_type,
          size = EXCLUDED.size
        RETURNING id`;
      mediaId = insertResult[0]?.id;
    } catch (dbError) {
      console.error("Failed to save Cloudinary upload to database:", dbError);
      return NextResponse.json(
        { error: "Image uploaded to Cloudinary but failed to save to media library: " + (dbError instanceof Error ? dbError.message : String(dbError)) },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      mediaId: mediaId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}

async function generateSignature(timestamp: number): Promise<string> {
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
  if (!CLOUDINARY_API_SECRET) throw new Error("API secret not configured");

  const crypto = await import("crypto");
  const str = `folder=financialedge&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  return crypto.createHash("sha256").update(str).digest("hex");
}
