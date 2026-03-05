import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { getDb } from "@/lib/db";

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
    try {
      const db = getDb();
      await db`INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, caption)
        VALUES (${filename}, ${file.name}, ${file.type || "application/octet-stream"}, ${bytes.length}, ${url}, ${""}, ${""})
        ON CONFLICT (url) DO NOTHING`;
    } catch (dbError) {
      console.error("Failed to save to database:", dbError);
      // Continue even if DB fails - file is still saved
    }

    return NextResponse.json(meta[id], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
