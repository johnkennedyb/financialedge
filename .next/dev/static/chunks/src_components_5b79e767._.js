(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/prose.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Prose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function Prose(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "d1edd1b99b5fe4f0d97abf146ea509cea46ad4d25b717f8384418df7631419fa") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d1edd1b99b5fe4f0d97abf146ea509cea46ad4d25b717f8384418df7631419fa";
    }
    const { children, className } = t0;
    const t1 = `prose prose-lg max-w-none${className ? ` ${className}` : ""}`;
    let t2;
    if ($[1] !== children || $[2] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/prose.tsx",
            lineNumber: 20,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_c = Prose;
var _c;
__turbopack_context__.k.register(_c, "Prose");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/share-buttons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function cleanBaseUrl(url) {
    return url.replace(/\/+$/, "");
}
function ShareButtons(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "605b758450a492831aa0df20be7f0c217c011efd67023d3eed549dbfcfe6ff04") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "605b758450a492831aa0df20be7f0c217c011efd67023d3eed549dbfcfe6ff04";
    }
    const { title, path } = t0;
    const [currentUrl, setCurrentUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    let t2;
    if ($[1] !== path) {
        t1 = ({
            "ShareButtons[useEffect()]": ()=>{
                const siteUrl = cleanBaseUrl(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_URL || "");
                const pathname = path.startsWith("/") ? path : `/${path}`;
                if ("TURBOPACK compile-time truthy", 1) {
                    setCurrentUrl(window.location.href);
                    return;
                }
                //TURBOPACK unreachable
                ;
            }
        })["ShareButtons[useEffect()]"];
        t2 = [
            path
        ];
        $[1] = path;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    const t3 = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    let t4;
    if ($[4] !== t3) {
        t4 = {
            id: "facebook",
            label: "Facebook",
            href: t3
        };
        $[4] = t3;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const t5 = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    let t6;
    if ($[6] !== t5) {
        t6 = {
            id: "x",
            label: "X",
            href: t5
        };
        $[6] = t5;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const t7 = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    let t8;
    if ($[8] !== t7) {
        t8 = {
            id: "linkedin",
            label: "LinkedIn",
            href: t7
        };
        $[8] = t7;
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    const t9 = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    let t10;
    if ($[10] !== t9) {
        t10 = {
            id: "whatsapp",
            label: "WhatsApp",
            href: t9
        };
        $[10] = t9;
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] !== t10 || $[13] !== t4 || $[14] !== t6 || $[15] !== t8) {
        t11 = [
            t4,
            t6,
            t8,
            t10
        ];
        $[12] = t10;
        $[13] = t4;
        $[14] = t6;
        $[15] = t8;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    const shareTargets = t11;
    let t12;
    if ($[17] !== currentUrl) {
        t12 = async function copyLink() {
            if (!currentUrl) {
                return;
            }
            await navigator.clipboard.writeText(currentUrl);
        };
        $[17] = currentUrl;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    const copyLink = t12;
    let t13;
    if ($[19] !== copyLink || $[20] !== currentUrl || $[21] !== title) {
        t13 = async function webShare() {
            if (!currentUrl) {
                return;
            }
            if (typeof navigator === "undefined") {
                return;
            }
            if ("share" in navigator) {
                await navigator.share({
                    title,
                    url: currentUrl
                });
            } else {
                await copyLink();
            }
        };
        $[19] = copyLink;
        $[20] = currentUrl;
        $[21] = title;
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    const webShare = t13;
    let t14;
    if ($[23] !== shareTargets) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: shareTargets.map(_ShareButtonsShareTargetsMap)
        }, void 0, false, {
            fileName: "[project]/src/components/share-buttons.tsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[23] = shareTargets;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    const t15 = !currentUrl;
    let t16;
    if ($[25] !== t15 || $[26] !== webShare) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: webShare,
            className: "h-10 rounded-full border border-border px-4 text-sm font-semibold flex items-center justify-center hover:bg-secondary transition-colors",
            disabled: t15,
            children: "Share"
        }, void 0, false, {
            fileName: "[project]/src/components/share-buttons.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[25] = t15;
        $[26] = webShare;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    const t17 = !currentUrl;
    let t18;
    if ($[28] !== copyLink || $[29] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: copyLink,
            className: "h-10 rounded-full border border-border px-4 text-sm font-semibold flex items-center justify-center hover:bg-secondary transition-colors",
            disabled: t17,
            children: "Copy Link"
        }, void 0, false, {
            fileName: "[project]/src/components/share-buttons.tsx",
            lineNumber: 182,
            columnNumber: 11
        }, this);
        $[28] = copyLink;
        $[29] = t17;
        $[30] = t18;
    } else {
        t18 = $[30];
    }
    let t19;
    if ($[31] !== t16 || $[32] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: [
                t16,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/share-buttons.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[31] = t16;
        $[32] = t18;
        $[33] = t19;
    } else {
        t19 = $[33];
    }
    let t20;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-muted",
            children: "Instagram doesn’t support direct web share links. Use Copy Link / Share."
        }, void 0, false, {
            fileName: "[project]/src/components/share-buttons.tsx",
            lineNumber: 200,
            columnNumber: 11
        }, this);
        $[34] = t20;
    } else {
        t20 = $[34];
    }
    let t21;
    if ($[35] !== t14 || $[36] !== t19) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                t14,
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/share-buttons.tsx",
            lineNumber: 207,
            columnNumber: 11
        }, this);
        $[35] = t14;
        $[36] = t19;
        $[37] = t21;
    } else {
        t21 = $[37];
    }
    return t21;
}
_s(ShareButtons, "zxrxRwMxzPU4v0zHbNsTRXzgcPU=");
_c = ShareButtons;
function _ShareButtonsShareTargetsMap(t) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: t.href,
        target: "_blank",
        rel: "noreferrer",
        className: "h-10 rounded-full border border-border px-4 text-sm font-semibold flex items-center justify-center hover:bg-secondary transition-colors",
        "aria-label": `Share on ${t.label}`,
        children: t.label
    }, t.id, false, {
        fileName: "[project]/src/components/share-buttons.tsx",
        lineNumber: 217,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ShareButtons");
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

//# sourceMappingURL=src_components_5b79e767._.js.map