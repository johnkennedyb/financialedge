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
"[project]/src/app/admin/posts/new/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewPostPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function NewPostPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingCategories, setLoadingCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        status: "draft",
        publishedAt: "",
        featuredImage: "",
        tags: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewPostPage.useEffect": ()=>{
            const loadCategories = {
                "NewPostPage.useEffect.loadCategories": async ()=>{
                    try {
                        const cats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])();
                        setCategories(cats.map({
                            "NewPostPage.useEffect.loadCategories": (cat)=>cat.name
                        }["NewPostPage.useEffect.loadCategories"]));
                    } catch (err) {
                        console.error("Failed to load categories:", err);
                    } finally{
                        setLoadingCategories(false);
                    }
                }
            }["NewPostPage.useEffect.loadCategories"];
            loadCategories();
        }
    }["NewPostPage.useEffect"], []);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const generateSlug = (title)=>{
        return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    };
    const handleTitleChange = (e_0)=>{
        const title_0 = e_0.target.value;
        setFormData((prev_0)=>({
                ...prev_0,
                title: title_0,
                slug: prev_0.slug || generateSlug(title_0)
            }));
    };
    const handleFileUpload = async (e_1)=>{
        const file = e_1.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
            const form = new FormData();
            form.append("file", file);
            const response = await fetch("/api/admin/upload/cloudinary", {
                method: "POST",
                body: form
            });
            if (!response.ok) {
                const err_1 = await response.json();
                throw new Error(err_1.error || "Upload failed");
            }
            const result = await response.json();
            setFormData((prev_1)=>({
                    ...prev_1,
                    featuredImage: result.url
                }));
        } catch (err_0) {
            setError(err_0 instanceof Error ? err_0.message : "Failed to upload image");
            console.error("Upload error:", err_0);
        } finally{
            setUploading(false);
        }
    };
    const clearImage = ()=>{
        setFormData((prev_2)=>({
                ...prev_2,
                featuredImage: ""
            }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleSave = async (status)=>{
        setSaving(true);
        setError(null);
        try {
            // Find category ID from name
            const categoryId = formData.category; // In real implementation, map name to ID
            const postData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                status: status,
                categories: formData.category ? [
                    formData.category
                ] : [],
                tags: formData.tags ? formData.tags.split(',').map((t)=>t.trim()) : [],
                author: 'admin',
                // Default author
                featuredImage: formData.featuredImage
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPost"])(postData);
            router.push("/admin/posts");
        } catch (err_2) {
            setError(err_2 instanceof Error ? err_2.message : "Failed to save post");
            console.error("Save error:", err_2);
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold",
                                children: "New Post"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted",
                                children: "Create a new blog post"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSave("draft"),
                                disabled: saving,
                                className: "btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                children: saving ? "Saving..." : "Save Draft"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSave("published"),
                                disabled: saving,
                                className: "btn-modern",
                                children: saving ? "Publishing..." : "Publish"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-destructive/10 border border-destructive/20 rounded-lg p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-destructive",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/posts/new/page.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                lineNumber: 142,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "Title"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "title",
                                value: formData.title,
                                onChange: handleTitleChange,
                                placeholder: "Enter post title...",
                                className: "w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "URL Slug"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "slug",
                                value: formData.slug,
                                onChange: handleChange,
                                placeholder: "post-url-slug",
                                className: "w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "Excerpt"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                name: "excerpt",
                                value: formData.excerpt,
                                onChange: handleChange,
                                placeholder: "Brief description of the post...",
                                rows: 3,
                                className: "w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "Content"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                name: "content",
                                value: formData.content,
                                onChange: handleChange,
                                placeholder: "Write your post content here...",
                                rows: 12,
                                className: "w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-2",
                                        children: "Category"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "category",
                                        value: formData.category,
                                        onChange: handleChange,
                                        disabled: loadingCategories,
                                        className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select a category"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this),
                                            categories.map((cat_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cat_0,
                                                    children: cat_0
                                                }, cat_0, false, {
                                                    fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 40
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-2",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "status",
                                        value: formData.status,
                                        onChange: handleChange,
                                        className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "draft",
                                                children: "Draft"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "published",
                                                children: "Published"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "scheduled",
                                                children: "Scheduled"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "Featured Image"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    formData.featuredImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full max-w-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: formData.featuredImage,
                                                alt: "Featured",
                                                className: "w-full h-48 object-cover rounded-lg border border-border"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: clearImage,
                                                className: "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600",
                                                title: "Remove image",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 196,
                                        columnNumber: 39
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-2 border-dashed border-border rounded-lg p-8 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: fileInputRef,
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleFileUpload,
                                                disabled: uploading,
                                                className: "hidden",
                                                id: "featured-image-upload"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "featured-image-upload",
                                                className: "cursor-pointer flex flex-col items-center gap-2",
                                                children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "animate-spin rounded-full h-8 w-8 border-b-2 border-accent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted",
                                                            children: "Uploading to Cloudinary..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-4xl",
                                                            children: "📷"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium",
                                                            children: "Click to upload image"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted",
                                                            children: "or drag and drop"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted",
                                                            children: "JPG, PNG, GIF up to 10MB"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 24
                                    }, this),
                                    formData.featuredImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted break-all",
                                        children: formData.featuredImage
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "Tags"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "tags",
                                value: formData.tags,
                                onChange: handleChange,
                                placeholder: "tag1, tag2, tag3",
                                className: "w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted mt-1",
                                children: "Separate tags with commas"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    formData.status === "scheduled" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-2",
                                children: "Publish Date"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "datetime-local",
                                name: "publishedAt",
                                value: formData.publishedAt,
                                onChange: handleChange,
                                className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/posts/new/page.tsx",
                        lineNumber: 227,
                        columnNumber: 45
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/posts/new/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/posts/new/page.tsx",
        lineNumber: 124,
        columnNumber: 10
    }, this);
}
_s(NewPostPage, "G8J5V6iyZ6UoO6hJQh3YxACf9uQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = NewPostPage;
var _c;
__turbopack_context__.k.register(_c, "NewPostPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_788182a3._.js.map