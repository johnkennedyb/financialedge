import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

type ItemType = "posts" | "pages" | "categories" | "seo" | "analytics" | "media";

type IndexItemType = "post" | "page";

type ContentIndexItem = {
  slug: string;
  type: IndexItemType;
  title: string | null;
  description: string | null;
  publishedAt: string | null;
  featuredImage: string | null;
  sourceUrl: string;
  section?: string | null;
  sectionSlug?: string | null;
};

type ContentIndex = {
  generatedAt: string;
  items: Record<string, ContentIndexItem>;
};

function projectRoot() {
  return process.cwd();
}

function contentDir() {
  return path.join(projectRoot(), "content");
}

function indexFilePath() {
  return path.join(contentDir(), "index.json");
}

function postsDir() {
  return path.join(contentDir(), "posts");
}

function pagesDir() {
  return path.join(contentDir(), "pages");
}

function categoriesDir() {
  return path.join(contentDir(), "categories");
}

function categoriesMetaPath() {
  return path.join(contentDir(), "categories-meta.json");
}

function seoSettingsPath() {
  return path.join(contentDir(), "seo.json");
}

function analyticsPath() {
  return path.join(contentDir(), "analytics.json");
}

function mediaMetaPath() {
  return path.join(contentDir(), "media.json");
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function safeSlug(slug: string) {
  return slug.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function sha1(input: string) {
  return crypto.createHash("sha1").update(input).digest("hex");
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

function readIndex(): ContentIndex {
  return readJson<ContentIndex>(indexFilePath(), { generatedAt: new Date().toISOString(), items: {} });
}

function writeIndex(index: ContentIndex) {
  index.generatedAt = new Date().toISOString();
  writeJson(indexFilePath(), index);
}

function itemPath(type: "posts" | "pages", slug: string) {
  const base = type === "posts" ? postsDir() : pagesDir();
  return path.join(base, `${slug}.json`);
}

function nowIso() {
  return new Date().toISOString();
}

function toIndexItem(type: IndexItemType, record: any): ContentIndexItem {
  return {
    slug: record.slug,
    type,
    title: record.title ?? null,
    description: record.description ?? null,
    publishedAt: record.publishedAt ?? null,
    featuredImage: record.featuredImage ?? null,
    sourceUrl: record.url ?? record.sourceUrl ?? "",
    section: record.section ?? null,
    sectionSlug: record.sectionSlug ?? null,
  };
}

function listPostsPages(type: "posts" | "pages", page = 1, limit = 50) {
  const idx = readIndex();
  const want: IndexItemType = type === "posts" ? "post" : "page";
  const allItems = Object.values(idx.items)
    .filter((i) => i.type === want)
    .sort((a, b) => {
      const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bd - ad;
    });

  const total = allItems.length;
  const start = (page - 1) * limit;
  const paginatedItems = allItems.slice(start, start + limit);

  const posts = paginatedItems.map((i) => {
    const record = readJson<any>(itemPath(type, i.slug), null);
    return {
      id: i.slug,
      slug: i.slug,
      title: i.title ?? i.slug,
      excerpt: i.description ?? "",
      content: record?.html ?? "",
      status: "publish",
      author: "admin",
      createdAt: i.publishedAt ?? idx.generatedAt,
      updatedAt: idx.generatedAt,
      categories: i.sectionSlug ? [i.sectionSlug] : [],
      tags: [],
      featuredImage: i.featuredImage ?? undefined,
      meta: {
        description: i.description ?? undefined,
        keywords: [],
      },
      section: i.section ?? null,
      sectionSlug: i.sectionSlug ?? null,
      sourceUrl: i.sourceUrl,
    };
  });

  return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
}

function listCategories() {
  const idx = readIndex();
  const meta = readJson<Record<string, { name?: string; description?: string }>>(categoriesMetaPath(), {});

  const counts = new Map<string, { slug: string; name: string; count: number }>();
  for (const item of Object.values(idx.items)) {
    if (item.type !== "post") continue;
    if (!item.sectionSlug) continue;
    const slug = item.sectionSlug;
    const current = counts.get(slug) ?? { slug, name: item.section ?? slug, count: 0 };
    current.count += 1;
    counts.set(slug, current);
  }

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .map((c) => ({
      id: c.slug,
      slug: c.slug,
      name: meta[c.slug]?.name ?? c.name,
      description: meta[c.slug]?.description ?? "",
      count: c.count,
      createdAt: idx.generatedAt,
      updatedAt: idx.generatedAt,
    }));
}

function listMedia() {
  const meta = readJson<Record<string, any>>(mediaMetaPath(), {});
  return Object.values(meta).sort((a: any, b: any) => (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));
}

function readSeo() {
  return readJson<any>(seoSettingsPath(), null);
}

function writeSeo(settings: any) {
  writeJson(seoSettingsPath(), settings);
}

function readAnalytics() {
  return readJson<any>(analyticsPath(), { pageViews: {} });
}

function writeAnalytics(data: any) {
  writeJson(analyticsPath(), data);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "") as ItemType;
  const id = searchParams.get("id");

  try {
    switch (type) {
      case "posts":
      case "pages": {
        const page = parseInt(searchParams.get("page") ?? "1", 10);
        const limit = parseInt(searchParams.get("limit") ?? "50", 10);

        if (id) {
          const slug = safeSlug(id);
          const fp = itemPath(type, slug);
          if (!fs.existsSync(fp)) return NextResponse.json(null);
          const record = readJson<any>(fp, null);
          return NextResponse.json({
            id: slug,
            slug,
            title: record?.title ?? slug,
            excerpt: record?.description ?? "",
            content: record?.html ?? "",
            status: "publish",
            author: "admin",
            createdAt: record?.publishedAt ?? null,
            updatedAt: record?.publishedAt ?? null,
            categories: record?.sectionSlug ? [record.sectionSlug] : [],
            tags: [],
            featuredImage: record?.featuredImage ?? undefined,
            meta: {
              description: record?.description ?? undefined,
              keywords: [],
            },
            section: record?.section ?? null,
            sectionSlug: record?.sectionSlug ?? null,
            sourceUrl: record?.url ?? "",
          });
        }

        return NextResponse.json(listPostsPages(type, page, limit));
      }

      case "categories":
        return NextResponse.json(listCategories());

      case "media":
        return NextResponse.json(listMedia());

      case "seo":
        return NextResponse.json(readSeo());

      case "analytics": {
        const idx = readIndex();
        const posts = Object.values(idx.items).filter((i) => i.type === "post");
        const pages = Object.values(idx.items).filter((i) => i.type === "page");
        const categories = listCategories();
        const media = listMedia();
        const analytics = readAnalytics();

        return NextResponse.json({
          totalPosts: posts.length,
          totalPages: pages.length,
          totalCategories: categories.length,
          totalMedia: media.length,
          posts,
          pages,
          analytics,
        });
      }

      default:
        return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body?.type as ItemType | undefined;
    const data = body?.data;

    if (!type || !data) {
      return NextResponse.json({ error: "Type and data are required" }, { status: 400 });
    }

    if (type === "seo") {
      writeSeo({ ...data, updatedAt: nowIso() });
      return NextResponse.json({ success: true });
    }

    if (type === "analytics") {
      writeAnalytics(data);
      return NextResponse.json({ success: true });
    }

    if (type === "categories") {
      const slug = safeSlug(String(data.slug ?? data.id ?? ""));
      if (!slug) return NextResponse.json({ error: "Category slug is required" }, { status: 400 });
      const meta = readJson<Record<string, any>>(categoriesMetaPath(), {});
      meta[slug] = {
        name: String(data.name ?? slug),
        description: String(data.description ?? ""),
        updatedAt: nowIso(),
      };
      writeJson(categoriesMetaPath(), meta);
      ensureDir(categoriesDir());
      return NextResponse.json({ id: slug, slug, ...meta[slug] }, { status: 201 });
    }

    if (type === "media") {
      const meta = readJson<Record<string, any>>(mediaMetaPath(), {});
      const id = String(data.id ?? sha1(String(data.url ?? nowIso())));
      meta[id] = {
        id,
        filename: data.filename,
        originalName: data.originalName ?? data.filename,
        mimeType: data.mimeType ?? "application/octet-stream",
        size: Number(data.size ?? 0),
        url: data.url,
        altText: data.altText ?? "",
        caption: data.caption ?? "",
        uploadedAt: data.uploadedAt ?? nowIso(),
      };
      writeJson(mediaMetaPath(), meta);
      return NextResponse.json(meta[id], { status: 201 });
    }

    if (type === "posts" || type === "pages") {
      const idx = readIndex();
      const slug = safeSlug(String(data.slug ?? "")) || safeSlug(String(data.title ?? "")) || sha1(nowIso());
      const outFile = itemPath(type, slug);

      const recordType: IndexItemType = type === "posts" ? "post" : "page";

      const record = {
        slug,
        url: String(data.sourceUrl ?? data.url ?? ""),
        title: String(data.title ?? slug),
        description: String(data.excerpt ?? data.description ?? ""),
        featuredImage: data.featuredImage ?? null,
        publishedAt: String(data.publishedAt ?? nowIso()),
        html: String(data.content ?? data.html ?? ""),
        section: data.section ?? null,
        sectionSlug: data.sectionSlug ?? (Array.isArray(data.categories) && data.categories[0] ? String(data.categories[0]) : null),
        type: recordType,
      };

      writeJson(outFile, record);
      idx.items[slug] = toIndexItem(record.type, record);
      writeIndex(idx);

      return NextResponse.json({ id: slug, ...record }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body?.type as ItemType | undefined;
    const id = body?.id as string | undefined;
    const data = body?.data;

    if (!type || !id || !data) {
      return NextResponse.json({ error: "Type, ID, and data are required" }, { status: 400 });
    }

    if (type === "seo") {
      writeSeo({ ...data, updatedAt: nowIso() });
      return NextResponse.json({ success: true });
    }

    if (type === "categories") {
      const slug = safeSlug(id);
      const meta = readJson<Record<string, any>>(categoriesMetaPath(), {});
      meta[slug] = {
        ...(meta[slug] ?? {}),
        name: data.name ?? meta[slug]?.name ?? slug,
        description: data.description ?? meta[slug]?.description ?? "",
        updatedAt: nowIso(),
      };
      writeJson(categoriesMetaPath(), meta);
      return NextResponse.json({ id: slug, slug, ...meta[slug] });
    }

    if (type === "media") {
      const meta = readJson<Record<string, any>>(mediaMetaPath(), {});
      if (!meta[id]) return NextResponse.json({ error: "Not found" }, { status: 404 });
      meta[id] = { ...meta[id], ...data };
      writeJson(mediaMetaPath(), meta);
      return NextResponse.json(meta[id]);
    }

    if (type === "posts" || type === "pages") {
      const slug = safeSlug(id);
      const fp = itemPath(type, slug);
      if (!fs.existsSync(fp)) return NextResponse.json({ error: "Not found" }, { status: 404 });

      const existing = readJson<any>(fp, {});
      const idx = readIndex();

      const record = {
        ...existing,
        title: data.title ?? existing.title,
        description: data.excerpt ?? data.description ?? existing.description,
        featuredImage: data.featuredImage ?? existing.featuredImage,
        html: data.content ?? data.html ?? existing.html,
        section: data.section ?? existing.section,
        sectionSlug:
          data.sectionSlug ??
          (Array.isArray(data.categories) && data.categories[0] ? String(data.categories[0]) : existing.sectionSlug),
        updatedAt: nowIso(),
      };

      writeJson(fp, record);
      idx.items[slug] = toIndexItem(type === "posts" ? "post" : "page", record);
      writeIndex(idx);

      return NextResponse.json({ id: slug, ...record });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "") as ItemType;
  const id = searchParams.get("id");

  try {
    if (!type || !id) {
      return NextResponse.json({ error: "Type and ID are required" }, { status: 400 });
    }

    if (type === "categories") {
      const slug = safeSlug(id);
      const meta = readJson<Record<string, any>>(categoriesMetaPath(), {});
      delete meta[slug];
      writeJson(categoriesMetaPath(), meta);
      return NextResponse.json({ success: true });
    }

    if (type === "media") {
      const meta = readJson<Record<string, any>>(mediaMetaPath(), {});
      if (!meta[id]) return NextResponse.json({ error: "Not found" }, { status: 404 });
      delete meta[id];
      writeJson(mediaMetaPath(), meta);
      return NextResponse.json({ success: true });
    }

    if (type === "posts" || type === "pages") {
      const slug = safeSlug(id);
      const fp = itemPath(type, slug);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
      const idx = readIndex();
      delete idx.items[slug];
      writeIndex(idx);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
