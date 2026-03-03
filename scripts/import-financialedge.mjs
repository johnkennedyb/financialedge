import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = "https://financialedge.com.ng";
const SITEMAP_INDEX = `${SITE_ORIGIN}/sitemap.xml`;

const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const CATEGORIES_DIR = path.join(CONTENT_DIR, "categories");
const MEDIA_DIR = path.join(PROJECT_ROOT, "public", "media");

const STATE_FILE = path.join(CONTENT_DIR, "import-state.json");
const INDEX_FILE = path.join(CONTENT_DIR, "index.json");

const CONCURRENCY = Number(process.env.IMPORT_CONCURRENCY ?? 4);
const MAX_URLS = process.env.IMPORT_MAX_URLS ? Number(process.env.IMPORT_MAX_URLS) : null;
const FORCE = process.env.IMPORT_FORCE === "1";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "financialedge-nextjs-importer/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    if (res.ok) return await res.text();
    if (attempt === tries) {
      throw new Error(`Fetch failed ${res.status} for ${url}`);
    }
    await sleep(500 * attempt);
  }
  throw new Error(`Fetch failed for ${url}`);
}

function parseSitemapLocs(xml) {
  const locs = [];
  const re = /<loc><!\[CDATA\[(.*?)\]\]><\/loc>|<loc>(.*?)<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) {
    const u = (m[1] || m[2] || "").trim();
    if (u) locs.push(u);
  }
  return locs;
}

function sha1(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

function sanitizeHtmlKeepBasic(html) {
  // Minimal sanitation: remove scripts/styles and WordPress shortcodes remnants.
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\[\/?vc_[^\]]+\]/g, "");
}

function extractMeta(html) {
  const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']\s*\/>/i);
  const descMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']\s*\/>/i);
  const imgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']\s*\/>/i);
  const sectionMatch = html.match(
    /<meta\s+property=["']article:section["']\s+content=["']([^"']+)["']\s*\/>/i
  );
  return {
    ogTitle: titleMatch?.[1] ?? null,
    ogDescription: descMatch?.[1] ?? null,
    ogImage: imgMatch?.[1] ?? null,
    articleSection: sectionMatch?.[1] ?? null,
  };
}

function extractPrimaryCategory(html) {
  // Option A: derive category from on-page links like /category/<slug>/... .
  // Prefer finance subcategories: /category/finance/<slug>/
  const links = [];
  const re = /<a[^>]+href=["']([^"']*\/category\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1] || "";
    const text = (m[2] || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    try {
      const u = new URL(href, SITE_ORIGIN);
      const parts = u.pathname.split("/").filter(Boolean);
      const catIdx = parts.indexOf("category");
      if (catIdx === -1) continue;
      const after = parts.slice(catIdx + 1);
      if (after.length === 0) continue;
      // /category/finance/capital-market/ -> want capital-market
      const slug = after.length >= 2 && after[0] === "finance" ? after[1] : after[0];
      if (!slug) continue;
      links.push({ slug, name: text || slug });
    } catch {
      // ignore
    }
  }

  if (links.length === 0) return null;

  const preferred = links.find((l) => l.slug !== "finance" && l.slug !== "news") ?? links[0];
  return preferred;
}

function slugifyCategoryName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractArticleHtml(html) {
  // Try common WP theme structures.
  const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
  if (articleMatch) return articleMatch[0];

  // If we can't find <article>, attempt to grab from the content container to the end of </article> or </main>.
  const startMatch = html.match(
    /<div[^>]+class=["'][^"']*(entry-content|td-post-content|post-content)[^"']*["'][^>]*>/i
  );
  if (startMatch?.index !== undefined) {
    const start = startMatch.index;
    const tail = html.slice(start);
    const endArticle = tail.search(/<\/article>/i);
    if (endArticle !== -1) return tail.slice(0, endArticle + "</article>".length);
    const endMain = tail.search(/<\/main>/i);
    if (endMain !== -1) return tail.slice(0, endMain + "</main>".length);
    // Fallback to a reasonably-sized chunk if no clear end.
    return tail.slice(0, Math.min(tail.length, 200_000));
  }

  return null;
}

function extractPublishedDate(html) {
  // Prefer explicit article meta.
  const metaMatch = html.match(
    /<meta\s+property=["']article:published_time["']\s+content=["']([^"']+)["']\s*\/?\s*>/i
  );
  if (metaMatch) return metaMatch[1];

  // Only trust <time datetime> if the page looks like an article.
  const ogType = html.match(
    /<meta\s+property=["']og:type["']\s+content=["']([^"']+)["']\s*\/?\s*>/i
  )?.[1];
  const looksLikeArticle =
    /<article[\s>]/i.test(html) ||
    /article:section/i.test(html) ||
    (typeof ogType === "string" && ogType.toLowerCase() === "article");

  if (looksLikeArticle) {
    const timeMatch = html.match(/<time[^>]*datetime=["']([^"']+)["'][^>]*>/i);
    if (timeMatch) return timeMatch[1];
  }

  return null;
}

function extractAllImageUrls(html) {
  const urls = new Set();
  const re = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const u = m[1];
    if (!u) continue;
    // ignore data urls
    if (u.startsWith("data:")) continue;
    urls.add(u);
  }
  return Array.from(urls);
}

function toLocalMediaPath(remoteUrl) {
  const u = new URL(remoteUrl, SITE_ORIGIN);
  const ext = path.extname(u.pathname) || ".jpg";
  const name = `${sha1(u.toString())}${ext}`;
  return {
    filename: name,
    publicPath: `/media/${name}`,
    diskPath: path.join(MEDIA_DIR, name),
  };
}

async function downloadFile(remoteUrl) {
  const { diskPath, publicPath } = toLocalMediaPath(remoteUrl);
  if (fs.existsSync(diskPath)) return publicPath;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(remoteUrl, {
      headers: {
        "User-Agent": "financialedge-nextjs-importer/1.0",
        Accept: "image/*,*/*;q=0.8",
        Referer: SITE_ORIGIN,
      },
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(diskPath, buf);
      return publicPath;
    }

    if (attempt === 3) {
      throw new Error(`Image fetch failed ${res.status} ${res.statusText} ${remoteUrl}`);
    }

    await sleep(400 * attempt);
  }

  throw new Error(`Image fetch failed ${remoteUrl}`);
}

function replaceRemoteImagesWithLocal(html, map) {
  let out = html;
  for (const [remote, local] of map.entries()) {
    // escape for regex
    const escaped = remote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(escaped, "g"), local);
  }
  return out;
}

function urlToSlug(url) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function classifyUrl(url) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { type: "home" };

  const first = parts[0];

  // Skip non-content endpoints.
  if (
    first === "category" ||
    first === "tag" ||
    first === "author" ||
    first === "feed" ||
    first === "comments" ||
    first === "wp-admin" ||
    first === "wp-content" ||
    first === "wp-includes" ||
    first === "wp-json" ||
    first === "xmlrpc.php"
  ) {
    return { type: "skip" };
  }

  // Treat single-segment URLs as importable content (post or page).
  if (parts.length === 1) return { type: "content", slug: first };

  // Multi-segment paths are usually archives/pagination or non-canonical; skip for now.
  return { type: "skip" };
}

function detectContentType(html, meta, publishedAt) {
  // Heuristic: posts tend to have publish dates and/or article meta.
  const ogType = html.match(/<meta\s+property=["']og:type["']\s+content=["']([^"']+)["']\s*\/?\s*>/i)?.[1];
  const isArticleMeta =
    Boolean(publishedAt) ||
    Boolean(meta?.articleSection) ||
    (typeof ogType === "string" && ogType.toLowerCase() === "article") ||
    /article:published_time/i.test(html);

  return isArticleMeta ? "post" : "page";
}

function readState() {
  if (!fs.existsSync(STATE_FILE)) return { done: {} };
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return { done: {} };
  }
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function upsertIndexItem(index, item) {
  index.items[item.slug] = item;
}

function readIndex() {
  if (!fs.existsSync(INDEX_FILE)) {
    return { generatedAt: new Date().toISOString(), items: {} };
  }
  return JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));
}

function writeIndex(index) {
  index.generatedAt = new Date().toISOString();
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

async function importUrl(url) {
  const classification = classifyUrl(url);
  if (classification.type !== "content") return null;

  const slug = classification.slug ?? urlToSlug(url);
  const html = await fetchText(url);

  const meta = extractMeta(html);
  const publishedAt = extractPublishedDate(html);

  const detectedType = detectContentType(html, meta, publishedAt);

  const category =
    detectedType === "post"
      ? (extractPrimaryCategory(html) ??
          (meta.articleSection
            ? {
                slug: slugifyCategoryName(meta.articleSection),
                name: meta.articleSection,
              }
            : null))
      : null;

  const article = extractArticleHtml(html);
  const rawBody = article ?? html;
  const cleanBody = sanitizeHtmlKeepBasic(rawBody);

  const imageUrls = extractAllImageUrls(cleanBody);
  const map = new Map();

  // Ensure featured image (og:image) is downloaded too.
  if (meta.ogImage) {
    imageUrls.push(meta.ogImage);
  }

  for (const imgUrl of imageUrls) {
    const abs = new URL(imgUrl, url).toString();
    try {
      const local = await downloadFile(abs);
      map.set(imgUrl, local);
      map.set(abs, local);
    } catch {
      if (meta.ogImage && abs === meta.ogImage) {
        console.warn(`Featured image download failed: ${abs}`);
      }
    }
  }

  const bodyWithLocalImages = replaceRemoteImagesWithLocal(cleanBody, map);

  const record = {
    slug,
    url,
    title: meta.ogTitle,
    description: meta.ogDescription,
    featuredImage: meta.ogImage ? (map.get(meta.ogImage) ?? null) : null,
    publishedAt,
    html: bodyWithLocalImages,
    section: category?.name ?? null,
    sectionSlug: category?.slug ?? null,
    type: detectedType,
  };

  return { classification: { type: detectedType, slug }, record };
}

async function runPool(urls, handler) {
  const queue = [...urls];
  const workers = Array.from({ length: CONCURRENCY }).map(async () => {
    while (queue.length) {
      const url = queue.shift();
      if (!url) return;
      await handler(url);
    }
  });
  await Promise.all(workers);
}

async function main() {
  ensureDir(CONTENT_DIR);
  ensureDir(POSTS_DIR);
  ensureDir(PAGES_DIR);
  ensureDir(CATEGORIES_DIR);
  ensureDir(MEDIA_DIR);

  const state = readState();
  const index = readIndex();

  console.log(`Fetching sitemap index: ${SITEMAP_INDEX}`);
  const sitemapIndexXml = await fetchText(SITEMAP_INDEX);
  const sitemapUrls = parseSitemapLocs(sitemapIndexXml).filter((u) => u.endsWith(".xml"));

  console.log(`Found ${sitemapUrls.length} sitemap files.`);

  const allUrls = [];
  for (const smUrl of sitemapUrls) {
    const xml = await fetchText(smUrl);
    const locs = parseSitemapLocs(xml);
    for (const u of locs) allUrls.push(u);
  }

  const uniqueUrls = Array.from(new Set(allUrls)).filter((u) => u.startsWith(SITE_ORIGIN));
  const targetUrls = MAX_URLS ? uniqueUrls.slice(0, MAX_URLS) : uniqueUrls;

  console.log(`Discovered ${uniqueUrls.length} unique URLs. Importing ${targetUrls.length}.`);
  console.log(`Concurrency: ${CONCURRENCY}.`);
  if (FORCE) console.log("Force mode enabled: re-importing URLs even if previously marked done.");

  let processed = 0;

  await runPool(targetUrls, async (url) => {
    if (state.done[url] && !FORCE) return;

    try {
      const result = await importUrl(url);
      state.done[url] = true;
      processed++;

      if (!result) {
        if (processed % 50 === 0) writeState(state);
        return;
      }

      const { classification, record } = result;
      const outDir = classification.type === "page" ? PAGES_DIR : POSTS_DIR;
      const outFile = path.join(outDir, `${record.slug}.json`);
      fs.writeFileSync(outFile, JSON.stringify(record, null, 2));

      upsertIndexItem(index, {
        slug: record.slug,
        type: classification.type,
        title: record.title,
        description: record.description,
        publishedAt: record.publishedAt,
        featuredImage: record.featuredImage,
        sourceUrl: record.url,
        section: record.section ?? null,
        sectionSlug: record.sectionSlug ?? null,
      });

      if (processed % 25 === 0) {
        writeState(state);
        writeIndex(index);
        console.log(`Progress: +${processed} (latest: ${record.slug})`);
      }
    } catch (err) {
      console.error(`Failed: ${url}`);
      console.error(err);
      const msg = String(err?.cause?.code || err?.code || err?.message || "");
      const isTransient =
        msg.includes("ENOTFOUND") ||
        msg.includes("ETIMEDOUT") ||
        msg.includes("ECONNRESET") ||
        msg.includes("EAI_AGAIN") ||
        msg.includes("fetch failed");

      // Only mark as done for non-transient errors; transient network failures should be retried on the next run.
      if (!isTransient) {
        state.done[url] = true;
      }
    }
  });

  writeState(state);

  // Build offline category indexes based on imported post metadata.
  const categoryMap = new Map();
  for (const item of Object.values(index.items)) {
    if (item.type !== "post") continue;
    if (!item.sectionSlug) continue;
    const curr = categoryMap.get(item.sectionSlug) ?? [];
    curr.push(item.slug);
    categoryMap.set(item.sectionSlug, curr);
  }

  for (const [slug, posts] of categoryMap.entries()) {
    const out = {
      slug,
      posts,
    };
    fs.writeFileSync(path.join(CATEGORIES_DIR, `${slug}.json`), JSON.stringify(out, null, 2));
  }

  writeIndex(index);

  console.log("Import complete.");
  console.log(`Index written: ${INDEX_FILE}`);
  console.log(`Posts dir: ${POSTS_DIR}`);
  console.log(`Pages dir: ${PAGES_DIR}`);
  console.log(`Categories dir: ${CATEGORIES_DIR}`);
  console.log(`Media dir: ${MEDIA_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
