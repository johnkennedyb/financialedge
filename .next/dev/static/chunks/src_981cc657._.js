(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/admin-api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Client-side API functions that call the server-side API routes
__turbopack_context__.s([
    "createCategory",
    ()=>createCategory,
    "createMedia",
    ()=>createMedia,
    "createPage",
    ()=>createPage,
    "createPost",
    ()=>createPost,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteMedia",
    ()=>deleteMedia,
    "deletePage",
    ()=>deletePage,
    "deletePost",
    ()=>deletePost,
    "duplicatePage",
    ()=>duplicatePage,
    "duplicatePost",
    ()=>duplicatePost,
    "getAllCategories",
    ()=>getAllCategories,
    "getAllMedia",
    ()=>getAllMedia,
    "getAllPages",
    ()=>getAllPages,
    "getAllPosts",
    ()=>getAllPosts,
    "getAnalytics",
    ()=>getAnalytics,
    "getCategoryById",
    ()=>getCategoryById,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getMediaById",
    ()=>getMediaById,
    "getPageById",
    ()=>getPageById,
    "getPageBySlug",
    ()=>getPageBySlug,
    "getPagesByStatus",
    ()=>getPagesByStatus,
    "getPostById",
    ()=>getPostById,
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostsByCategory",
    ()=>getPostsByCategory,
    "getPostsByStatus",
    ()=>getPostsByStatus,
    "getRecentPages",
    ()=>getRecentPages,
    "getRecentPosts",
    ()=>getRecentPosts,
    "getSeoSettings",
    ()=>getSeoSettings,
    "saveSeoSettings",
    ()=>saveSeoSettings,
    "searchPages",
    ()=>searchPages,
    "searchPosts",
    ()=>searchPosts,
    "updateCategory",
    ()=>updateCategory,
    "updatePage",
    ()=>updatePage,
    "updatePost",
    ()=>updatePost,
    "uploadMedia",
    ()=>uploadMedia
]);
// API helper function
async function apiCall(endpoint, options = {}) {
    const response = await fetch(`/api/admin/local${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${response.status} - ${error}`);
    }
    return response.json();
}
async function getAllPosts() {
    return apiCall('?type=posts');
}
async function getPostById(id) {
    return apiCall(`?type=posts&id=${id}`);
}
async function getPostBySlug(slug) {
    return apiCall(`?type=posts&slug=${slug}`);
}
async function createPost(postData) {
    return apiCall('', {
        method: 'POST',
        body: JSON.stringify({
            type: 'posts',
            data: postData
        })
    });
}
async function updatePost(id, updates) {
    return apiCall('', {
        method: 'PUT',
        body: JSON.stringify({
            type: 'posts',
            id,
            data: updates
        })
    });
}
async function deletePost(id) {
    await apiCall(`?type=posts&id=${id}`, {
        method: 'DELETE'
    });
    return true;
}
async function getAllPages() {
    return apiCall('?type=pages');
}
async function getPageById(id) {
    return apiCall(`?type=pages&id=${id}`);
}
async function getPageBySlug(slug) {
    return apiCall(`?type=pages&slug=${slug}`);
}
async function createPage(pageData) {
    return apiCall('', {
        method: 'POST',
        body: JSON.stringify({
            type: 'pages',
            data: pageData
        })
    });
}
async function updatePage(id, updates) {
    return apiCall('', {
        method: 'PUT',
        body: JSON.stringify({
            type: 'pages',
            id,
            data: updates
        })
    });
}
async function deletePage(id) {
    await apiCall(`?type=pages&id=${id}`, {
        method: 'DELETE'
    });
    return true;
}
async function getAllCategories() {
    return apiCall('?type=categories');
}
async function getCategoryById(id) {
    return apiCall(`?type=categories&id=${id}`);
}
async function getCategoryBySlug(slug) {
    return apiCall(`?type=categories&slug=${slug}`);
}
async function createCategory(categoryData) {
    return apiCall('', {
        method: 'POST',
        body: JSON.stringify({
            type: 'categories',
            data: categoryData
        })
    });
}
async function updateCategory(id, updates) {
    return apiCall('', {
        method: 'PUT',
        body: JSON.stringify({
            type: 'categories',
            id,
            data: updates
        })
    });
}
async function deleteCategory(id) {
    await apiCall(`?type=categories&id=${id}`, {
        method: 'DELETE'
    });
    return true;
}
async function getAllMedia() {
    return apiCall('?type=media');
}
async function getMediaById(id) {
    return apiCall(`?type=media&id=${id}`);
}
async function createMedia(mediaData) {
    return apiCall('', {
        method: 'POST',
        body: JSON.stringify({
            type: 'media',
            data: mediaData
        })
    });
}
async function deleteMedia(id) {
    await apiCall(`?type=media&id=${id}`, {
        method: 'DELETE'
    });
    return true;
}
async function uploadMedia(file) {
    const form = new FormData();
    form.append('file', file);
    const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Upload error: ${response.status} - ${error}`);
    }
    return response.json();
}
async function getAnalytics() {
    return apiCall('?type=analytics');
}
async function getSeoSettings() {
    return apiCall('?type=seo');
}
async function saveSeoSettings(settings) {
    return apiCall('', {
        method: 'POST',
        body: JSON.stringify({
            type: 'seo',
            data: settings
        })
    });
}
async function getPostsByStatus(status) {
    const posts = await getAllPosts();
    return posts.filter((post)=>post.status === status);
}
async function getPagesByStatus(status) {
    const pages = await getAllPages();
    return pages.filter((page)=>page.status === status);
}
async function searchPosts(query) {
    const posts = await getAllPosts();
    return posts.filter((post)=>post.title.toLowerCase().includes(query.toLowerCase()) || post.content.toLowerCase().includes(query.toLowerCase()) || post.excerpt.toLowerCase().includes(query.toLowerCase()));
}
async function searchPages(query) {
    const pages = await getAllPages();
    return pages.filter((page)=>page.title.toLowerCase().includes(query.toLowerCase()) || page.content.toLowerCase().includes(query.toLowerCase()) || page.excerpt.toLowerCase().includes(query.toLowerCase()));
}
async function getRecentPosts(limit = 10) {
    const posts = await getAllPosts();
    return posts.sort((a, b)=>new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, limit);
}
async function getRecentPages(limit = 10) {
    const pages = await getAllPages();
    return pages.sort((a, b)=>new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, limit);
}
async function getPostsByCategory(categorySlug) {
    const posts = await getAllPosts();
    return posts.filter((post)=>post.categories.includes(categorySlug));
}
async function duplicatePost(id) {
    const originalPost = await getPostById(id);
    if (!originalPost) return undefined;
    const duplicatedPost = await createPost({
        ...originalPost,
        title: `${originalPost.title} (Copy)`,
        slug: `${originalPost.slug}-copy`,
        status: 'draft'
    });
    return duplicatedPost;
}
async function duplicatePage(id) {
    const originalPage = await getPageById(id);
    if (!originalPage) return undefined;
    const duplicatedPage = await createPage({
        ...originalPage,
        title: `${originalPage.title} (Copy)`,
        slug: `${originalPage.slug}-copy`,
        status: 'draft'
    });
    return duplicatedPage;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/settings/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminSettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const defaultSettings = {
    siteName: "Financial EDGE",
    siteDescription: "Nigeria's most reliable financial newsletter",
    contactEmail: "fosety@yahoo.com",
    contactPhone: "+234 803 440 2525",
    facebookUrl: "https://facebook.com/financialedge",
    xUrl: "https://x.com/financialedge",
    youtubeUrl: "https://youtube.com/financialedge",
    tiktokUrl: "https://tiktok.com/@financialedge",
    enableComments: false,
    maintenanceMode: false
};
function AdminSettingsPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(59);
    if ($[0] !== "a3ca1d60f1ff9c97685f4995e5e0d20ab21160da030e613fd7b035ce327e9903") {
        for(let $i = 0; $i < 59; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a3ca1d60f1ff9c97685f4995e5e0d20ab21160da030e613fd7b035ce327e9903";
    }
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSettings);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            totalPosts: 0,
            totalPages: 0,
            totalCategories: 0,
            totalMedia: 0
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("general");
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "AdminSettingsPage[useEffect()]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnalytics"])().then({
                    "AdminSettingsPage[useEffect() > (anonymous)()]": (data)=>{
                        setStats({
                            totalPosts: data.totalPosts || 0,
                            totalPages: data.totalPages || 0,
                            totalCategories: data.totalCategories || 0,
                            totalMedia: data.totalMedia || 0
                        });
                    }
                }["AdminSettingsPage[useEffect() > (anonymous)()]"]).catch(console.error);
                const saved_0 = localStorage.getItem("siteSettings");
                if (saved_0) {
                    try {
                        setSettings({
                            ...defaultSettings,
                            ...JSON.parse(saved_0)
                        });
                    } catch  {}
                }
            }
        })["AdminSettingsPage[useEffect()]"];
        t2 = [];
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[4] !== settings) {
        t3 = ({
            "AdminSettingsPage[handleSave]": ()=>{
                localStorage.setItem("siteSettings", JSON.stringify(settings));
                setSaved(true);
                setTimeout({
                    "AdminSettingsPage[handleSave > setTimeout()]": ()=>setSaved(false)
                }["AdminSettingsPage[handleSave > setTimeout()]"], 2000);
            }
        })["AdminSettingsPage[handleSave]"];
        $[4] = settings;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const handleSave = t3;
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "AdminSettingsPage[updateSetting]": (key, value)=>{
                setSettings({
                    "AdminSettingsPage[updateSetting > setSettings()]": (prev)=>({
                            ...prev,
                            [key]: value
                        })
                }["AdminSettingsPage[updateSetting > setSettings()]"]);
            }
        })["AdminSettingsPage[updateSetting]"];
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const updateSetting = t4;
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold",
                    children: "Settings"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 124,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted",
                    children: "Configure your site settings and preferences"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 124,
                    columnNumber: 63
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted",
            children: "Total Posts"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 131,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== stats.totalPosts) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-4",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: stats.totalPosts
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 138,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 138,
            columnNumber: 10
        }, this);
        $[9] = stats.totalPosts;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted",
            children: "Total Pages"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 146,
            columnNumber: 10
        }, this);
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== stats.totalPages) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-4",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: stats.totalPages
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 153,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 153,
            columnNumber: 10
        }, this);
        $[12] = stats.totalPages;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted",
            children: "Categories"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== stats.totalCategories) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-4",
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: stats.totalCategories
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 168,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[15] = stats.totalCategories;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted",
            children: "Media Files"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 176,
            columnNumber: 11
        }, this);
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== stats.totalMedia) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-4",
            children: [
                t12,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: stats.totalMedia
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 183,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 183,
            columnNumber: 11
        }, this);
        $[18] = stats.totalMedia;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== t11 || $[21] !== t13 || $[22] !== t7 || $[23] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-4",
            children: [
                t7,
                t9,
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t13;
        $[22] = t7;
        $[23] = t9;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    let t15;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = [
            {
                id: "general",
                label: "General",
                icon: "\u2699\uFE0F"
            },
            {
                id: "social",
                label: "Social Media",
                icon: "\uD83D\uDD17"
            },
            {
                id: "advanced",
                label: "Advanced",
                icon: "\uD83D\uDD27"
            }
        ];
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    let t16;
    if ($[26] !== activeTab) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-b border-border",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex gap-6",
                children: t15.map({
                    "AdminSettingsPage[(anonymous)()]": (tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "AdminSettingsPage[(anonymous)() > <button>.onClick]": ()=>setActiveTab(tab.id)
                            }["AdminSettingsPage[(anonymous)() > <button>.onClick]"],
                            className: `py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${activeTab === tab.id ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: tab.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 276
                                }, this),
                                tab.label
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 222,
                            columnNumber: 54
                        }, this)
                }["AdminSettingsPage[(anonymous)()]"])
            }, void 0, false, {
                fileName: "[project]/src/app/admin/settings/page.tsx",
                lineNumber: 221,
                columnNumber: 51
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 221,
            columnNumber: 11
        }, this);
        $[26] = activeTab;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    if ($[28] !== activeTab || $[29] !== settings) {
        t17 = activeTab === "general" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold",
                    children: "General Settings"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 233,
                    columnNumber: 65
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Site Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 206
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: settings.siteName,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e)=>updateSetting("siteName", e.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 262
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 233,
                            columnNumber: 179
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Contact Email"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 213
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: settings.contactEmail,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e_0)=>updateSetting("contactEmail", e_0.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 273
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 235,
                            columnNumber: 186
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 md:col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Site Description"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 227
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: settings.siteDescription,
                                    onChange: {
                                        "AdminSettingsPage[<textarea>.onChange]": (e_1)=>updateSetting("siteDescription", e_1.target.value)
                                    }["AdminSettingsPage[<textarea>.onChange]"],
                                    rows: 3,
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 290
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 237,
                            columnNumber: 186
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Contact Phone"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 225
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "tel",
                                    value: settings.contactPhone,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e_2)=>updateSetting("contactPhone", e_2.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 285
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 239,
                            columnNumber: 198
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 233,
                    columnNumber: 124
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 233,
            columnNumber: 38
        }, this);
        $[28] = activeTab;
        $[29] = settings;
        $[30] = t17;
    } else {
        t17 = $[30];
    }
    let t18;
    if ($[31] !== activeTab || $[32] !== settings) {
        t18 = activeTab === "social" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold",
                    children: "Social Media Links"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 250,
                    columnNumber: 64
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Facebook URL"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 207
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    value: settings.facebookUrl,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e_3)=>updateSetting("facebookUrl", e_3.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 266
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 250,
                            columnNumber: 180
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "X (Twitter) URL"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 252,
                                    columnNumber: 213
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    value: settings.xUrl,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e_4)=>updateSetting("xUrl", e_4.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 252,
                                    columnNumber: 275
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 252,
                            columnNumber: 186
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "YouTube URL"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 213
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    value: settings.youtubeUrl,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e_5)=>updateSetting("youtubeUrl", e_5.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 271
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 254,
                            columnNumber: 186
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "TikTok URL"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 213
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    value: settings.tiktokUrl,
                                    onChange: {
                                        "AdminSettingsPage[<input>.onChange]": (e_6)=>updateSetting("tiktokUrl", e_6.target.value)
                                    }["AdminSettingsPage[<input>.onChange]"],
                                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 270
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 256,
                            columnNumber: 186
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 250,
                    columnNumber: 125
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 250,
            columnNumber: 37
        }, this);
        $[31] = activeTab;
        $[32] = settings;
        $[33] = t18;
    } else {
        t18 = $[33];
    }
    let t19;
    if ($[34] !== activeTab || $[35] !== settings) {
        t19 = activeTab === "advanced" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold",
                    children: "Advanced Settings"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 267,
                    columnNumber: 66
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-4 rounded-lg border border-border",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: "Enable Comments"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/settings/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 245
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted",
                                            children: "Allow users to comment on posts"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/settings/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 291
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 240
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "AdminSettingsPage[<button>.onClick]": ()=>updateSetting("enableComments", !settings.enableComments)
                                    }["AdminSettingsPage[<button>.onClick]"],
                                    className: `relative w-12 h-6 rounded-full transition-colors ${settings.enableComments ? "bg-accent" : "bg-muted"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.enableComments ? "translate-x-6" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/settings/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 170
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 366
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 267,
                            columnNumber: 153
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-4 rounded-lg border border-border",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: "Maintenance Mode"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/settings/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 422
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted",
                                            children: "Show maintenance page to visitors"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/settings/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 469
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 417
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "AdminSettingsPage[<button>.onClick]": ()=>updateSetting("maintenanceMode", !settings.maintenanceMode)
                                    }["AdminSettingsPage[<button>.onClick]"],
                                    className: `relative w-12 h-6 rounded-full transition-colors ${settings.maintenanceMode ? "bg-red-500" : "bg-muted"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.maintenanceMode ? "translate-x-6" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/settings/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 172
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 546
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 269,
                            columnNumber: 330
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-lg border border-border bg-secondary/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium mb-2",
                                    children: "Cloudinary Configuration"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 402
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted mb-2",
                                    children: "Cloud name: dw7w2at8k"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 462
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted",
                                    children: "Configured in .env.local"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 526
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 271,
                            columnNumber: 333
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 267,
                    columnNumber: 126
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 267,
            columnNumber: 39
        }, this);
        $[34] = activeTab;
        $[35] = settings;
        $[36] = t19;
    } else {
        t19 = $[36];
    }
    const t20 = saved ? "\u2713 Saved!" : "Save Settings";
    let t21;
    if ($[37] !== handleSave || $[38] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleSave,
            className: "btn-modern bg-accent",
            children: t20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 281,
            columnNumber: 11
        }, this);
        $[37] = handleSave;
        $[38] = t20;
        $[39] = t21;
    } else {
        t21 = $[39];
    }
    let t22;
    if ($[40] !== saved) {
        t22 = saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm text-green-600",
            children: "Settings saved successfully"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 290,
            columnNumber: 20
        }, this);
        $[40] = saved;
        $[41] = t22;
    } else {
        t22 = $[41];
    }
    let t23;
    if ($[42] !== t21 || $[43] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 pt-6 border-t border-border flex items-center gap-4",
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[42] = t21;
        $[43] = t22;
        $[44] = t23;
    } else {
        t23 = $[44];
    }
    let t24;
    if ($[45] !== t17 || $[46] !== t18 || $[47] !== t19 || $[48] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t17,
                t18,
                t19,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 307,
            columnNumber: 11
        }, this);
        $[45] = t17;
        $[46] = t18;
        $[47] = t19;
        $[48] = t23;
        $[49] = t24;
    } else {
        t24 = $[49];
    }
    let t25;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-lg font-semibold mb-4",
            children: "Quick Links"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 318,
            columnNumber: 11
        }, this);
        $[50] = t25;
    } else {
        t25 = $[50];
    }
    let t26;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "/admin/posts",
            className: "p-4 rounded-lg border border-border hover:border-accent transition-colors text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl mb-2 block",
                    children: "📝"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 325,
                    columnNumber: 132
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-medium",
                    children: "Manage Posts"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 325,
                    columnNumber: 179
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 325,
            columnNumber: 11
        }, this);
        $[51] = t26;
    } else {
        t26 = $[51];
    }
    let t27;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "/admin/pages",
            className: "p-4 rounded-lg border border-border hover:border-accent transition-colors text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl mb-2 block",
                    children: "📄"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 332,
                    columnNumber: 132
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-medium",
                    children: "Manage Pages"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 332,
                    columnNumber: 179
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 332,
            columnNumber: 11
        }, this);
        $[52] = t27;
    } else {
        t27 = $[52];
    }
    let t28;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "/admin/media",
            className: "p-4 rounded-lg border border-border hover:border-accent transition-colors text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl mb-2 block",
                    children: "🖼️"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 339,
                    columnNumber: 132
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-medium",
                    children: "Media Library"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 339,
                    columnNumber: 180
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[53] = t28;
    } else {
        t28 = $[53];
    }
    let t29;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                    children: [
                        t26,
                        t27,
                        t28,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            target: "_blank",
                            className: "p-4 rounded-lg border border-border hover:border-accent transition-colors text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl mb-2 block",
                                    children: "🌐"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 346,
                                    columnNumber: 273
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium",
                                    children: "View Site"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/settings/page.tsx",
                                    lineNumber: 346,
                                    columnNumber: 320
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/settings/page.tsx",
                            lineNumber: 346,
                            columnNumber: 147
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/settings/page.tsx",
                    lineNumber: 346,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 346,
            columnNumber: 11
        }, this);
        $[54] = t29;
    } else {
        t29 = $[54];
    }
    let t30;
    if ($[55] !== t14 || $[56] !== t16 || $[57] !== t24) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t5,
                t14,
                t16,
                t24,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/settings/page.tsx",
            lineNumber: 353,
            columnNumber: 11
        }, this);
        $[55] = t14;
        $[56] = t16;
        $[57] = t24;
        $[58] = t30;
    } else {
        t30 = $[58];
    }
    return t30;
}
_s(AdminSettingsPage, "vyJMhveGWni/eUkmBcns33/7hnQ=");
_c = AdminSettingsPage;
var _c;
__turbopack_context__.k.register(_c, "AdminSettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_981cc657._.js.map