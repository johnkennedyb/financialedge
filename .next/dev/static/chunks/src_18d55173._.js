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
"[project]/src/app/admin/posts/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PostsPage() {
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostsPage.useEffect": ()=>{
            const loadPosts = {
                "PostsPage.useEffect.loadPosts": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        const wpPosts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllPosts"])();
                        const formattedPosts = wpPosts.map({
                            "PostsPage.useEffect.loadPosts.formattedPosts": (post)=>({
                                    id: post.id?.toString?.() ?? String(post.slug ?? post.id ?? ""),
                                    title: String(post.title ?? post.slug ?? "Untitled"),
                                    slug: post.slug,
                                    status: post.status === "publish" ? "published" : post.status,
                                    category: post.categories?.[0] || post.sectionSlug || "Uncategorized",
                                    author: post.author || "Unknown",
                                    publishedAt: post.createdAt ? String(post.createdAt).split("T")[0] : "",
                                    updatedAt: post.updatedAt ? String(post.updatedAt).split("T")[0] : "",
                                    excerpt: String(post.excerpt ?? "")
                                })
                        }["PostsPage.useEffect.loadPosts.formattedPosts"]);
                        setPosts(formattedPosts);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : "Failed to load posts");
                        console.error("Posts error:", err);
                    } finally{
                        setLoading(false);
                    }
                }
            }["PostsPage.useEffect.loadPosts"];
            loadPosts();
        }
    }["PostsPage.useEffect"], []);
    const filteredPosts = posts.filter((post_0)=>{
        const matchesSearch = post_0.title.toLowerCase().includes(searchTerm.toLowerCase()) || post_0.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || post_0.status === filterStatus;
        return matchesSearch && matchesFilter;
    });
    const handleDelete = async (id)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePost"])(id);
            setPosts((prev)=>prev.filter((post_1)=>post_1.id !== id));
        } catch (err_0) {
            console.error("Delete error:", err_0);
        }
    };
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-destructive mb-4",
                        children: "Error loading posts"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "mt-4 btn-modern",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/posts/page.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/posts/page.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: "Loading posts..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/posts/page.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/posts/page.tsx",
            lineNumber: 75,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold",
                                children: "Posts"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted",
                                children: "Manage your blog posts"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/admin/posts/new",
                        className: "btn-modern",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-2",
                                children: "➕"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            " New Post"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/posts/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search posts...",
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            className: "w-full rounded-lg border border-border bg-background px-4 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/posts/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filterStatus,
                        onChange: (e_0)=>setFilterStatus(e_0.target.value),
                        className: "rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: "All Status"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "published",
                                children: "Published"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "draft",
                                children: "Draft"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "scheduled",
                                children: "Scheduled"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/posts/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-card overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-secondary/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider",
                                            children: "Title"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider",
                                            children: "Author"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider",
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/posts/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-border",
                                children: filteredPosts.map((post_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-secondary/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: post_2.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted line-clamp-1",
                                                            children: post_2.excerpt
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/posts/page.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 rounded-full text-xs bg-accent/10 text-accent",
                                                    children: post_2.category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/posts/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-2 py-1 rounded-full text-xs font-medium ${post_2.status === "published" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : post_2.status === "draft" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`,
                                                    children: post_2.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/posts/page.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-sm",
                                                children: post_2.author
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-sm text-muted",
                                                children: post_2.publishedAt || post_2.updatedAt
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/admin/posts/${post_2.id}/edit`,
                                                            className: "text-accent hover:text-accent/80 text-sm font-medium",
                                                            children: "Edit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                if (confirm(`Are you sure you want to delete "${post_2.title}"?`)) {
                                                                    handleDelete(post_2.id);
                                                                }
                                                            },
                                                            className: "text-destructive hover:text-destructive/80 text-sm font-medium",
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/page.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/posts/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, post_2.id, true, {
                                        fileName: "[project]/src/app/admin/posts/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 44
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/page.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/page.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/posts/page.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/posts/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            filteredPosts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted",
                    children: "No posts found matching your criteria."
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/posts/page.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/posts/page.tsx",
                lineNumber: 163,
                columnNumber: 38
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/posts/page.tsx",
        lineNumber: 82,
        columnNumber: 10
    }, this);
}
_s(PostsPage, "lseJ7vgwUBnpPPo3zUGOGcdDz+c=");
_c = PostsPage;
var _c;
__turbopack_context__.k.register(_c, "PostsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_18d55173._.js.map