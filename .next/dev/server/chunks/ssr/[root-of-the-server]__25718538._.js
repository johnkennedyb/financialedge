module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/local-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasImportedContent",
    ()=>hasImportedContent,
    "listLatestPosts",
    ()=>listLatestPosts,
    "listSections",
    ()=>listSections,
    "readCategoryIndex",
    ()=>readCategoryIndex,
    "readContentIndex",
    ()=>readContentIndex,
    "readImportedPage",
    ()=>readImportedPage,
    "readImportedPost",
    ()=>readImportedPost
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const projectRoot = process.cwd();
const contentDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(projectRoot, "content");
function readJson(filePath) {
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) return null;
        return JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf8"));
    } catch  {
        return null;
    }
}
function hasImportedContent() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir, "index.json"));
}
function readContentIndex() {
    return readJson(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir, "index.json"));
}
function readImportedPost(slug) {
    return readJson(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir, "posts", `${slug}.json`));
}
function readImportedPage(slug) {
    return readJson(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir, "pages", `${slug}.json`));
}
function readCategoryIndex(sectionSlug) {
    return readJson(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(contentDir, "categories", `${sectionSlug}.json`));
}
function listLatestPosts(limit = 12) {
    const idx = readContentIndex();
    if (!idx) return [];
    const items = Object.values(idx.items).filter((i)=>i.type === "post");
    items.sort((a, b)=>{
        const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return bd - ad;
    });
    return items.slice(0, limit);
}
function listSections(limit = 12) {
    const idx = readContentIndex();
    if (!idx) return [];
    const map = new Map();
    for (const item of Object.values(idx.items)){
        if (item.type !== "post") continue;
        if (!item.sectionSlug || !item.section) continue;
        const key = item.sectionSlug;
        const curr = map.get(key) ?? {
            section: item.section,
            slug: item.sectionSlug,
            count: 0
        };
        curr.count += 1;
        map.set(key, curr);
    }
    return Array.from(map.values()).sort((a, b)=>b.count - a.count).slice(0, limit);
}
}),
"[project]/src/lib/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SITE_URL",
    ()=>SITE_URL,
    "WP_API_BASE",
    ()=>WP_API_BASE
]);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const WP_API_BASE = process.env.WP_API_BASE ?? "https://financialedge.com.ng/wp-json/wp/v2";
}),
"[project]/src/lib/wp.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategories",
    ()=>getCategories,
    "getLatestPosts",
    ()=>getLatestPosts,
    "getPageBySlug",
    ()=>getPageBySlug,
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostsByCategorySlug",
    ()=>getPostsByCategorySlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-rsc] (ecmascript)");
;
function buildUrl(path, query) {
    const url = new URL(path.replace(/^\//, ""), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WP_API_BASE"].endsWith("/") ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WP_API_BASE"] : `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WP_API_BASE"]}/`);
    if (query) {
        for (const [k, v] of Object.entries(query)){
            if (v === undefined) continue;
            url.searchParams.set(k, String(v));
        }
    }
    return url.toString();
}
async function fetchJson(path, query, init) {
    const url = buildUrl(path, query);
    const res = await fetch(url, {
        ...init,
        headers: {
            Accept: "application/json",
            ...init?.headers ?? {}
        },
        next: {
            revalidate: 60
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(()=>"");
        throw new Error(`WP request failed (${res.status}) ${url}${text ? `\n${text}` : ""}`);
    }
    return await res.json();
}
async function getCategories(perPage = 50) {
    return fetchJson("/categories", {
        per_page: perPage,
        hide_empty: true,
        orderby: "count",
        order: "desc"
    });
}
async function getLatestPosts(perPage = 12) {
    return fetchJson("/posts", {
        per_page: perPage,
        _embed: true
    });
}
async function getPostsByCategorySlug(slug, perPage = 12) {
    const cats = await fetchJson("/categories", {
        slug,
        per_page: 1
    });
    const cat = cats[0];
    if (!cat) return {
        category: null,
        posts: []
    };
    const posts = await fetchJson("/posts", {
        categories: cat.id,
        per_page: perPage,
        _embed: true
    });
    return {
        category: cat,
        posts
    };
}
async function getPostBySlug(slug) {
    const posts = await fetchJson("/posts", {
        slug,
        per_page: 1,
        _embed: true
    });
    return posts[0] ?? null;
}
async function getPageBySlug(slug) {
    const pages = await fetchJson("/pages", {
        slug,
        per_page: 1,
        _embed: true
    });
    return pages[0] ?? null;
}
}),
"[project]/src/app/about/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/local-content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wp$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wp.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const metadata = {
    title: "About"
};
function cleanWordPressContent(html) {
    // Remove WordPress shortcodes
    let cleaned = html.replace(/\[vc_row[^\]]*\]/g, '').replace(/\[\/vc_row\]/g, '').replace(/\[vc_column[^\]]*\]/g, '').replace(/\[\/vc_column\]/g, '').replace(/\[vc_column_text[^\]]*\]/g, '').replace(/\[\/vc_column_text\]/g, '').replace(/\[vc_row_inner[^\]]*\]/g, '').replace(/\[\/vc_row_inner\]/g, '').replace(/\[vc_column_inner[^\]]*\]/g, '').replace(/\[\/vc_column_inner\]/g, '').replace(/\[td_block_text_with_title[^\]]*\]/g, '<h3>').replace(/\[\/td_block_text_with_title\]/g, '</h3>').replace(/\[td_block_2[^\]]*\]/g, '').replace(/\[td_block_ad_box[^\]]*\]/g, '').replace(/\[vc_raw_html[^\]]*\]JTNDaDQlMjBjbGFzcyUzRCUyMmJsb2NrLXRpdGxlJTIyJTNFJTNDc3BhbiUzRVNlbmQlMjB1cyUyMGElMjBtZXNzYWdlJTIxJTNDJTJGc3BhbiUzRSUzQyUyRmg0JTNF\[\/vc_raw_html\]/g, '<h4>Send us a message!</h4>').replace(/custom_title="([^"]+)"/g, '$1').replace(/limit="[^"]+"/g, '').replace(/spot_id="[^"]+"/g, '').replace(/spot_title="[^"]+"/g, '');
    return cleaned;
}
async function AboutPage() {
    // Try to get from WordPress first, then fallback to local
    let wpPage = null;
    let page = null;
    try {
        wpPage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wp$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageBySlug"])("about-us");
    } catch  {
    // Fallback to local content
    }
    if (!wpPage) {
        page = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readImportedPage"])("about-us");
    }
    const content = wpPage || page;
    if (!content) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const rawContent = wpPage ? wpPage.content.rendered : page?.html || "";
    const cleanedContent = cleanWordPressContent(rawContent);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex w-full max-w-4xl flex-col gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "text-sm font-semibold text-accent hover:opacity-90",
                    children: "← Back home"
                }, void 0, false, {
                    fileName: "[project]/src/app/about/page.tsx",
                    lineNumber: 63,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card animate-fe-fade-up overflow-hidden rounded-[28px] p-6 md:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-accent",
                        children: "About"
                    }, void 0, false, {
                        fileName: "[project]/src/app/about/page.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
                        children: wpPage ? wpPage.title.rendered.replace(/<[^>]*>/g, "") : page?.title || "About Us"
                    }, void 0, false, {
                        fileName: "[project]/src/app/about/page.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card animate-fe-fade-up overflow-hidden rounded-[28px] p-6 md:p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "prose prose-lg max-w-none",
                    dangerouslySetInnerHTML: {
                        __html: cleanedContent
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/about/page.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/about/page.tsx",
        lineNumber: 61,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/about/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/about/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__25718538._.js.map