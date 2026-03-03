(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/html.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeHtmlEntities",
    ()=>decodeHtmlEntities,
    "stripHtml",
    ()=>stripHtml
]);
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function decodeHtmlEntities(input) {
    return input.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/local-post-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocalPostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$html$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/html.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function LocalPostCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(35);
    if ($[0] !== "daa5e34893a7ddf1b2c32fc310e063dccc6b26ab4212bd4f910ccccde8b5ead6") {
        for(let $i = 0; $i < 35; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "daa5e34893a7ddf1b2c32fc310e063dccc6b26ab4212bd4f910ccccde8b5ead6";
    }
    const { item } = t0;
    const t1 = item.title ?? "";
    let t2;
    if ($[1] !== t1) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$html$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(t1);
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const title = t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = [
            "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/7681098/pexels-photo-7681098.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/730647/pexels-photo-730647.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/37347/pexels-photo-37347.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/162534/sunset-sky-sunrise-sun-162534.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/7567413/pexels-photo-7567413.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/7567445/pexels-photo-7567445.jpeg?auto=compress&cs=tinysrgb&w=1600"
        ];
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const fallbackImages = t3;
    let t4;
    if ($[4] !== item.slug) {
        t4 = Array.from(item.slug ?? "").reduce(_LocalPostCardAnonymous, 0);
        $[4] = item.slug;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const imgIndex = t4 % fallbackImages.length;
    const heroImage = item.featuredImage ?? fallbackImages[imgIndex];
    const t5 = `/${item.slug}`;
    const t6 = heroImage || fallbackImages[imgIndex];
    let t7;
    if ($[6] !== imgIndex) {
        t7 = ({
            "LocalPostCard[<img>.onError]": (e)=>{
                const target = e.target;
                target.src = fallbackImages[imgIndex];
            }
        })["LocalPostCard[<img>.onError]"];
        $[6] = imgIndex;
        $[7] = t7;
    } else {
        t7 = $[7];
    }
    let t8;
    if ($[8] !== t6 || $[9] !== t7 || $[10] !== title) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: t6,
            alt: title,
            className: "absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]",
            loading: "lazy",
            onError: t7
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[8] = t6;
        $[9] = t7;
        $[10] = title;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.15))]"
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== t8) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative aspect-[16/10] w-full bg-zinc-100",
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 80,
            columnNumber: 11
        }, this);
        $[13] = t8;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== item.section) {
        t11 = item.section ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "rounded-full bg-[rgba(11,87,208,0.08)] px-3 py-1 text-xs font-semibold text-[color:var(--brand)]",
            children: item.section
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 88,
            columnNumber: 26
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 88,
            columnNumber: 165
        }, this);
        $[15] = item.section;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== item.publishedAt) {
        t12 = item.publishedAt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-medium text-[color:var(--muted)]",
            children: new Date(item.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric"
            })
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 96,
            columnNumber: 30
        }, this) : null;
        $[17] = item.publishedAt;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== t11 || $[20] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center justify-between gap-2",
            children: [
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 108,
            columnNumber: 11
        }, this);
        $[19] = t11;
        $[20] = t12;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    const t14 = title || "Untitled";
    let t15;
    if ($[22] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "mt-3 line-clamp-2 text-base font-semibold leading-6 tracking-tight text-[color:var(--foreground)]",
            children: t14
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 118,
            columnNumber: 11
        }, this);
        $[22] = t14;
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== item.description) {
        t16 = item.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 line-clamp-3 text-sm leading-6 text-[color:var(--muted)]",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$html$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(item.description)
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 126,
            columnNumber: 30
        }, this) : null;
        $[24] = item.description;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 inline-flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "btn-brand h-10 px-4 text-sm",
                    children: "Read story"
                }, void 0, false, {
                    fileName: "[project]/src/components/local-post-card.tsx",
                    lineNumber: 134,
                    columnNumber: 64
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-semibold text-[color:var(--brand)]",
                    children: "→"
                }, void 0, false, {
                    fileName: "[project]/src/components/local-post-card.tsx",
                    lineNumber: 134,
                    columnNumber: 127
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[26] = t17;
    } else {
        t17 = $[26];
    }
    let t18;
    if ($[27] !== t13 || $[28] !== t15 || $[29] !== t16) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-5",
            children: [
                t13,
                t15,
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 141,
            columnNumber: 11
        }, this);
        $[27] = t13;
        $[28] = t15;
        $[29] = t16;
        $[30] = t18;
    } else {
        t18 = $[30];
    }
    let t19;
    if ($[31] !== t10 || $[32] !== t18 || $[33] !== t5) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "group animate-fe-fade-up card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(11,15,26,0.12)] active:translate-y-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: t5,
                className: "block",
                children: [
                    t10,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/local-post-card.tsx",
                lineNumber: 151,
                columnNumber: 180
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/local-post-card.tsx",
            lineNumber: 151,
            columnNumber: 11
        }, this);
        $[31] = t10;
        $[32] = t18;
        $[33] = t5;
        $[34] = t19;
    } else {
        t19 = $[34];
    }
    return t19;
}
_c = LocalPostCard;
function _LocalPostCardAnonymous(acc, ch) {
    return acc + ch.charCodeAt(0);
}
var _c;
__turbopack_context__.k.register(_c, "LocalPostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/safe-image.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SafeImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const defaultFallback = "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600";
function SafeImage(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(19);
    if ($[0] !== "b6a7df223e98bc5be583cc292ada3090d3604da1b5448fa61a1f955b5b58eabf") {
        for(let $i = 0; $i < 19; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b6a7df223e98bc5be583cc292ada3090d3604da1b5448fa61a1f955b5b58eabf";
    }
    const { src, fallbackSrc, alt: t1, fill, className: t2, sizes, priority } = t0;
    const alt = t1 === undefined ? "" : t1;
    const className = t2 === undefined ? "" : t2;
    const [currentSrc, setCurrentSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(src && src.trim() !== "" ? src : fallbackSrc || defaultFallback);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const resolvedFallback = fallbackSrc || defaultFallback;
    let t3;
    let t4;
    if ($[1] !== resolvedFallback || $[2] !== src) {
        t3 = ({
            "SafeImage[useEffect()]": ()=>{
                if (src && src.trim() !== "") {
                    setCurrentSrc(src);
                    setHasError(false);
                } else {
                    setCurrentSrc(resolvedFallback);
                }
            }
        })["SafeImage[useEffect()]"];
        t4 = [
            src,
            resolvedFallback
        ];
        $[1] = resolvedFallback;
        $[2] = src;
        $[3] = t3;
        $[4] = t4;
    } else {
        t3 = $[3];
        t4 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[5] !== currentSrc || $[6] !== hasError || $[7] !== resolvedFallback) {
        t5 = ({
            "SafeImage[handleError]": ()=>{
                if (!hasError && currentSrc !== resolvedFallback) {
                    setCurrentSrc(resolvedFallback);
                    setHasError(true);
                }
            }
        })["SafeImage[handleError]"];
        $[5] = currentSrc;
        $[6] = hasError;
        $[7] = resolvedFallback;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const handleError = t5;
    let t6;
    if ($[9] !== fill) {
        t6 = fill ? {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
        } : {};
        $[9] = fill;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const style = t6;
    const t7 = priority ? "eager" : "lazy";
    let t8;
    if ($[11] !== alt || $[12] !== className || $[13] !== currentSrc || $[14] !== handleError || $[15] !== sizes || $[16] !== style || $[17] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: currentSrc,
            alt: alt,
            className: className,
            style: style,
            sizes: sizes,
            onError: handleError,
            loading: t7
        }, void 0, false, {
            fileName: "[project]/src/components/safe-image.tsx",
            lineNumber: 96,
            columnNumber: 10
        }, this);
        $[11] = alt;
        $[12] = className;
        $[13] = currentSrc;
        $[14] = handleError;
        $[15] = sizes;
        $[16] = style;
        $[17] = t7;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    return t8;
}
_s(SafeImage, "+xWbgau8n2WhWxR72VopXvQ8MEk=");
_c = SafeImage;
var _c;
__turbopack_context__.k.register(_c, "SafeImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f9c2f710._.js.map