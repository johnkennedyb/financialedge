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
"[project]/src/app/api/admin/data/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const WP_API_URL = process.env.WORDPRESS_API_URL;
const WP_USERNAME = process.env.WP_ADMIN_USERNAME;
const WP_PASSWORD = process.env.WP_ADMIN_PASSWORD;
if (!WP_API_URL) {
    console.error("WORDPRESS_API_URL not configured");
}
// Helper function for WordPress API authentication
function getAuthHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (WP_USERNAME && WP_PASSWORD) {
        const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');
        headers['Authorization'] = `Basic ${auth}`;
    }
    return headers;
}
// Helper function to make authenticated WordPress API calls
async function fetchFromWordPress(endpoint, options = {}) {
    if (!WP_API_URL) {
        throw new Error("WordPress API URL not configured");
    }
    const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers || {}
    };
    const response = await fetch(`${WP_API_URL}${endpoint}`, {
        ...options,
        headers
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`WordPress API error: ${response.status} - ${errorText}`);
    }
    return response.json();
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    try {
        switch(type){
            case 'analytics':
                // Fetch real data from WordPress
                const [posts, pages, categories, media] = await Promise.all([
                    fetchFromWordPress('/wp/v2/posts?per_page=100'),
                    fetchFromWordPress('/wp/v2/pages?per_page=100'),
                    fetchFromWordPress('/wp/v2/categories?per_page=100'),
                    fetchFromWordPress('/wp/v2/media?per_page=100')
                ]);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    totalPosts: posts.length,
                    totalPages: pages.length,
                    totalCategories: categories.length,
                    totalMedia: media.length,
                    posts,
                    pages
                });
            case 'posts':
                if (id) {
                    const post = await fetchFromWordPress(`/wp/v2/posts/${id}?_embed`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(post);
                }
                const allPosts = await fetchFromWordPress('/wp/v2/posts?per_page=100&_embed');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(allPosts);
            case 'pages':
                if (id) {
                    const page = await fetchFromWordPress(`/wp/v2/pages/${id}?_embed`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(page);
                }
                const allPages = await fetchFromWordPress('/wp/v2/pages?per_page=100&_embed');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(allPages);
            case 'categories':
                if (id) {
                    const category = await fetchFromWordPress(`/wp/v2/categories/${id}`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(category);
                }
                const allCategories = await fetchFromWordPress('/wp/v2/categories?per_page=100');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(allCategories);
            case 'media':
                if (id) {
                    const mediaItem = await fetchFromWordPress(`/wp/v2/media/${id}`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mediaItem);
                }
                const allMedia = await fetchFromWordPress('/wp/v2/media?per_page=100');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(allMedia);
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid type parameter'
                }, {
                    status: 400
                });
        }
    } catch (error) {
        console.error('API Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { type, data } = body;
        if (!type || !data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Type and data are required'
            }, {
                status: 400
            });
        }
        let endpoint = '';
        switch(type){
            case 'posts':
                endpoint = '/wp/v2/posts';
                break;
            case 'pages':
                endpoint = '/wp/v2/pages';
                break;
            case 'categories':
                endpoint = '/wp/v2/categories';
                break;
            case 'media':
                endpoint = '/wp/v2/media';
                break;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid type'
                }, {
                    status: 400
                });
        }
        const newItem = await fetchFromWordPress(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newItem, {
            status: 201
        });
    } catch (error) {
        console.error('POST Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const body = await request.json();
        const { type, id, data } = body;
        if (!type || !id || !data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Type, ID, and data are required'
            }, {
                status: 400
            });
        }
        let endpoint = '';
        switch(type){
            case 'posts':
                endpoint = `/wp/v2/posts/${id}`;
                break;
            case 'pages':
                endpoint = `/wp/v2/pages/${id}`;
                break;
            case 'categories':
                endpoint = `/wp/v2/categories/${id}`;
                break;
            case 'media':
                endpoint = `/wp/v2/media/${id}`;
                break;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid type'
                }, {
                    status: 400
                });
        }
        const updatedItem = await fetchFromWordPress(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedItem);
    } catch (error) {
        console.error('PUT Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const id = searchParams.get('id');
        if (!type || !id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Type and ID are required'
            }, {
                status: 400
            });
        }
        let endpoint = '';
        switch(type){
            case 'posts':
                endpoint = `/wp/v2/posts/${id}`;
                break;
            case 'pages':
                endpoint = `/wp/v2/pages/${id}`;
                break;
            case 'categories':
                endpoint = `/wp/v2/categories/${id}`;
                break;
            case 'media':
                endpoint = `/wp/v2/media/${id}`;
                break;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid type'
                }, {
                    status: 400
                });
        }
        await fetchFromWordPress(endpoint, {
            method: 'DELETE'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('DELETE Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a602902c._.js.map