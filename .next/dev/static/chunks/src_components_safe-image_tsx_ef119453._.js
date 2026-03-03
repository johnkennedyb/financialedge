(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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

//# sourceMappingURL=src_components_safe-image_tsx_ef119453._.js.map