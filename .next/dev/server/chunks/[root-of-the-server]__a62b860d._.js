module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/app/api/admin/local/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
;
;
;
const runtime = "nodejs";
function projectRoot() {
    return process.cwd();
}
function contentDir() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(projectRoot(), "content");
}
function indexFilePath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "index.json");
}
function postsDir() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "posts");
}
function pagesDir() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "pages");
}
function categoriesDir() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "categories");
}
function categoriesMetaPath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "categories-meta.json");
}
function seoSettingsPath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "seo.json");
}
function analyticsPath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "analytics.json");
}
function mediaMetaPath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir(), "media.json");
}
function ensureDir(p) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(p, {
        recursive: true
    });
}
function safeSlug(slug) {
    return slug.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
function sha1(input) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash("sha1").update(input).digest("hex");
}
function readJson(filePath, fallback) {
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) return fallback;
        return JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf8"));
    } catch  {
        return fallback;
    }
}
function writeJson(filePath, value) {
    ensureDir(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(filePath));
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, JSON.stringify(value, null, 2));
}
function readIndex() {
    return readJson(indexFilePath(), {
        generatedAt: new Date().toISOString(),
        items: {}
    });
}
function writeIndex(index) {
    index.generatedAt = new Date().toISOString();
    writeJson(indexFilePath(), index);
}
function itemPath(type, slug) {
    const base = type === "posts" ? postsDir() : pagesDir();
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(base, `${slug}.json`);
}
function nowIso() {
    return new Date().toISOString();
}
function toIndexItem(type, record) {
    return {
        slug: record.slug,
        type,
        title: record.title ?? null,
        description: record.description ?? null,
        publishedAt: record.publishedAt ?? null,
        featuredImage: record.featuredImage ?? null,
        sourceUrl: record.url ?? record.sourceUrl ?? "",
        section: record.section ?? null,
        sectionSlug: record.sectionSlug ?? null
    };
}
function listPostsPages(type) {
    const idx = readIndex();
    const want = type === "posts" ? "post" : "page";
    const items = Object.values(idx.items).filter((i)=>i.type === want).sort((a, b)=>{
        const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return bd - ad;
    });
    return items.map((i)=>{
        const record = readJson(itemPath(type, i.slug), null);
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
            categories: i.sectionSlug ? [
                i.sectionSlug
            ] : [],
            tags: [],
            featuredImage: i.featuredImage ?? undefined,
            meta: {
                description: i.description ?? undefined,
                keywords: []
            },
            section: i.section ?? null,
            sectionSlug: i.sectionSlug ?? null,
            sourceUrl: i.sourceUrl
        };
    });
}
function listCategories() {
    const idx = readIndex();
    const meta = readJson(categoriesMetaPath(), {});
    const counts = new Map();
    for (const item of Object.values(idx.items)){
        if (item.type !== "post") continue;
        if (!item.sectionSlug) continue;
        const slug = item.sectionSlug;
        const current = counts.get(slug) ?? {
            slug,
            name: item.section ?? slug,
            count: 0
        };
        current.count += 1;
        counts.set(slug, current);
    }
    return Array.from(counts.values()).sort((a, b)=>b.count - a.count).map((c)=>({
            id: c.slug,
            slug: c.slug,
            name: meta[c.slug]?.name ?? c.name,
            description: meta[c.slug]?.description ?? "",
            count: c.count,
            createdAt: idx.generatedAt,
            updatedAt: idx.generatedAt
        }));
}
function listMedia() {
    const meta = readJson(mediaMetaPath(), {});
    return Object.values(meta).sort((a, b)=>(b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));
}
function readSeo() {
    return readJson(seoSettingsPath(), null);
}
function writeSeo(settings) {
    writeJson(seoSettingsPath(), settings);
}
function readAnalytics() {
    return readJson(analyticsPath(), {
        pageViews: {}
    });
}
function writeAnalytics(data) {
    writeJson(analyticsPath(), data);
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? "";
    const id = searchParams.get("id");
    try {
        switch(type){
            case "posts":
            case "pages":
                {
                    if (id) {
                        const slug = safeSlug(id);
                        const fp = itemPath(type, slug);
                        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(fp)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(null);
                        const record = readJson(fp, null);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            id: slug,
                            slug,
                            title: record?.title ?? slug,
                            excerpt: record?.description ?? "",
                            content: record?.html ?? "",
                            status: "publish",
                            author: "admin",
                            createdAt: record?.publishedAt ?? null,
                            updatedAt: record?.publishedAt ?? null,
                            categories: record?.sectionSlug ? [
                                record.sectionSlug
                            ] : [],
                            tags: [],
                            featuredImage: record?.featuredImage ?? undefined,
                            meta: {
                                description: record?.description ?? undefined,
                                keywords: []
                            },
                            section: record?.section ?? null,
                            sectionSlug: record?.sectionSlug ?? null,
                            sourceUrl: record?.url ?? ""
                        });
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(listPostsPages(type));
                }
            case "categories":
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(listCategories());
            case "media":
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(listMedia());
            case "seo":
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(readSeo());
            case "analytics":
                {
                    const idx = readIndex();
                    const posts = Object.values(idx.items).filter((i)=>i.type === "post");
                    const pages = Object.values(idx.items).filter((i)=>i.type === "page");
                    const categories = listCategories();
                    const media = listMedia();
                    const analytics = readAnalytics();
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        totalPosts: posts.length,
                        totalPages: pages.length,
                        totalCategories: categories.length,
                        totalMedia: media.length,
                        posts,
                        pages,
                        analytics
                    });
                }
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Invalid type parameter"
                }, {
                    status: 400
                });
        }
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Internal server error"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const type = body?.type;
        const data = body?.data;
        if (!type || !data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Type and data are required"
            }, {
                status: 400
            });
        }
        if (type === "seo") {
            writeSeo({
                ...data,
                updatedAt: nowIso()
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true
            });
        }
        if (type === "analytics") {
            writeAnalytics(data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true
            });
        }
        if (type === "categories") {
            const slug = safeSlug(String(data.slug ?? data.id ?? ""));
            if (!slug) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Category slug is required"
            }, {
                status: 400
            });
            const meta = readJson(categoriesMetaPath(), {});
            meta[slug] = {
                name: String(data.name ?? slug),
                description: String(data.description ?? ""),
                updatedAt: nowIso()
            };
            writeJson(categoriesMetaPath(), meta);
            ensureDir(categoriesDir());
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: slug,
                slug,
                ...meta[slug]
            }, {
                status: 201
            });
        }
        if (type === "media") {
            const meta = readJson(mediaMetaPath(), {});
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
                uploadedAt: data.uploadedAt ?? nowIso()
            };
            writeJson(mediaMetaPath(), meta);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(meta[id], {
                status: 201
            });
        }
        if (type === "posts" || type === "pages") {
            const idx = readIndex();
            const slug = safeSlug(String(data.slug ?? "")) || safeSlug(String(data.title ?? "")) || sha1(nowIso());
            const outFile = itemPath(type, slug);
            const recordType = type === "posts" ? "post" : "page";
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
                type: recordType
            };
            writeJson(outFile, record);
            idx.items[slug] = toIndexItem(record.type, record);
            writeIndex(idx);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: slug,
                ...record
            }, {
                status: 201
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid type"
        }, {
            status: 400
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Internal server error"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const body = await request.json();
        const type = body?.type;
        const id = body?.id;
        const data = body?.data;
        if (!type || !id || !data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Type, ID, and data are required"
            }, {
                status: 400
            });
        }
        if (type === "seo") {
            writeSeo({
                ...data,
                updatedAt: nowIso()
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true
            });
        }
        if (type === "categories") {
            const slug = safeSlug(id);
            const meta = readJson(categoriesMetaPath(), {});
            meta[slug] = {
                ...meta[slug] ?? {},
                name: data.name ?? meta[slug]?.name ?? slug,
                description: data.description ?? meta[slug]?.description ?? "",
                updatedAt: nowIso()
            };
            writeJson(categoriesMetaPath(), meta);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: slug,
                slug,
                ...meta[slug]
            });
        }
        if (type === "media") {
            const meta = readJson(mediaMetaPath(), {});
            if (!meta[id]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Not found"
            }, {
                status: 404
            });
            meta[id] = {
                ...meta[id],
                ...data
            };
            writeJson(mediaMetaPath(), meta);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(meta[id]);
        }
        if (type === "posts" || type === "pages") {
            const slug = safeSlug(id);
            const fp = itemPath(type, slug);
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(fp)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Not found"
            }, {
                status: 404
            });
            const existing = readJson(fp, {});
            const idx = readIndex();
            const record = {
                ...existing,
                title: data.title ?? existing.title,
                description: data.excerpt ?? data.description ?? existing.description,
                featuredImage: data.featuredImage ?? existing.featuredImage,
                html: data.content ?? data.html ?? existing.html,
                section: data.section ?? existing.section,
                sectionSlug: data.sectionSlug ?? (Array.isArray(data.categories) && data.categories[0] ? String(data.categories[0]) : existing.sectionSlug),
                updatedAt: nowIso()
            };
            writeJson(fp, record);
            idx.items[slug] = toIndexItem(type === "posts" ? "post" : "page", record);
            writeIndex(idx);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: slug,
                ...record
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid type"
        }, {
            status: 400
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Internal server error"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? "";
    const id = searchParams.get("id");
    try {
        if (!type || !id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Type and ID are required"
            }, {
                status: 400
            });
        }
        if (type === "categories") {
            const slug = safeSlug(id);
            const meta = readJson(categoriesMetaPath(), {});
            delete meta[slug];
            writeJson(categoriesMetaPath(), meta);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true
            });
        }
        if (type === "media") {
            const meta = readJson(mediaMetaPath(), {});
            if (!meta[id]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Not found"
            }, {
                status: 404
            });
            delete meta[id];
            writeJson(mediaMetaPath(), meta);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true
            });
        }
        if (type === "posts" || type === "pages") {
            const slug = safeSlug(id);
            const fp = itemPath(type, slug);
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(fp)) __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].unlinkSync(fp);
            const idx = readIndex();
            delete idx.items[slug];
            writeIndex(idx);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid type"
        }, {
            status: 400
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a62b860d._.js.map