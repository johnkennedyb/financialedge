import fs from "node:fs";
import path from "node:path";

export type ImportedItemType = "post" | "page";

export type ImportedItem = {
  slug: string;
  url: string;
  title: string | null;
  description: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  html: string;
  section?: string | null;
  sectionSlug?: string | null;
  type?: ImportedItemType;
  author?: string | null;
};

export type ContentIndexItem = {
  slug: string;
  type: ImportedItemType;
  title: string | null;
  description: string | null;
  publishedAt: string | null;
  featuredImage: string | null;
  sourceUrl: string;
  section?: string | null;
  sectionSlug?: string | null;
  author?: string | null;
};

export type ContentIndex = {
  generatedAt: string;
  items: Record<string, ContentIndexItem>;
};

const projectRoot = process.cwd();
const contentDir = path.join(projectRoot, "content");

function readJson<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

export function hasImportedContent() {
  return fs.existsSync(path.join(contentDir, "index.json"));
}

export function readContentIndex(): ContentIndex | null {
  return readJson<ContentIndex>(path.join(contentDir, "index.json"));
}

export function readImportedPost(slug: string): ImportedItem | null {
  return readJson<ImportedItem>(path.join(contentDir, "posts", `${slug}.json`));
}

export function readImportedPage(slug: string): ImportedItem | null {
  return readJson<ImportedItem>(path.join(contentDir, "pages", `${slug}.json`));
}

export function readCategoryIndex(sectionSlug: string): { slug: string; posts: string[] } | null {
  return readJson<{ slug: string; posts: string[] }>(
    path.join(contentDir, "categories", `${sectionSlug}.json`)
  );
}

export function listLatestPosts(limit = 12): ContentIndexItem[] {
  const idx = readContentIndex();
  if (!idx) return [];

  const items = Object.values(idx.items).filter((i) => i.type === "post");
  items.sort((a, b) => {
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
  return items.slice(0, limit);
}

export function listSections(limit = 12): Array<{ section: string; slug: string; count: number }> {
  const idx = readContentIndex();
  if (!idx) return [];

  const map = new Map<string, { section: string; slug: string; count: number }>();
  for (const item of Object.values(idx.items)) {
    if (item.type !== "post") continue;
    if (!item.sectionSlug || !item.section) continue;
    const key = item.sectionSlug;
    const curr = map.get(key) ?? { section: item.section, slug: item.sectionSlug, count: 0 };
    curr.count += 1;
    map.set(key, curr);
  }

  return Array.from(map.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
