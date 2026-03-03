(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/analytics/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnalyticsPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(68);
    if ($[0] !== "012a9eddce97f8f4096adea4d76c88fdfd420376ee5c4169738ab94b90b641cb") {
        for(let $i = 0; $i < 68; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "012a9eddce97f8f4096adea4d76c88fdfd420376ee5c4169738ab94b90b641cb";
    }
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("30d");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "AnalyticsPage[useEffect()]": ()=>{
                const loadAnalytics = {
                    "AnalyticsPage[useEffect() > loadAnalytics]": async ()=>{
                        setLoading(true);
                        setTimeout({
                            "AnalyticsPage[useEffect() > loadAnalytics > setTimeout()]": ()=>{
                                setData({
                                    pageViews: {
                                        total: 45832,
                                        today: 1247,
                                        thisWeek: 8234,
                                        thisMonth: 32156,
                                        trend: "up"
                                    },
                                    topPosts: [
                                        {
                                            id: "1",
                                            title: "Market Analysis: Q1 2025 Outlook",
                                            views: 3421,
                                            category: "Market Analysis"
                                        },
                                        {
                                            id: "2",
                                            title: "Investment Strategies for Beginners",
                                            views: 2897,
                                            category: "Investment"
                                        },
                                        {
                                            id: "3",
                                            title: "Tech Stocks: What to Watch",
                                            views: 2156,
                                            category: "Stocks"
                                        },
                                        {
                                            id: "4",
                                            title: "Cryptocurrency Trends 2025",
                                            views: 1876,
                                            category: "Cryptocurrency"
                                        },
                                        {
                                            id: "5",
                                            title: "Real Estate Investment Guide",
                                            views: 1654,
                                            category: "Real Estate"
                                        }
                                    ],
                                    trafficSources: [
                                        {
                                            source: "Direct",
                                            percentage: 42,
                                            count: 19249
                                        },
                                        {
                                            source: "Search",
                                            percentage: 31,
                                            count: 14208
                                        },
                                        {
                                            source: "Social",
                                            percentage: 18,
                                            count: 8250
                                        },
                                        {
                                            source: "Referral",
                                            percentage: 6,
                                            count: 2750
                                        },
                                        {
                                            source: "Other",
                                            percentage: 3,
                                            count: 1375
                                        }
                                    ],
                                    popularCategories: [
                                        {
                                            category: "Market Analysis",
                                            views: 12456,
                                            posts: 12
                                        },
                                        {
                                            category: "Investment",
                                            views: 9876,
                                            posts: 18
                                        },
                                        {
                                            category: "Stocks",
                                            views: 8234,
                                            posts: 15
                                        },
                                        {
                                            category: "Cryptocurrency",
                                            views: 6543,
                                            posts: 8
                                        },
                                        {
                                            category: "Real Estate",
                                            views: 4321,
                                            posts: 6
                                        }
                                    ],
                                    dailyViews: [
                                        {
                                            date: "2025-02-01",
                                            views: 987
                                        },
                                        {
                                            date: "2025-02-02",
                                            views: 1234
                                        },
                                        {
                                            date: "2025-02-03",
                                            views: 1156
                                        },
                                        {
                                            date: "2025-02-04",
                                            views: 1342
                                        },
                                        {
                                            date: "2025-02-05",
                                            views: 1456
                                        },
                                        {
                                            date: "2025-02-06",
                                            views: 1234
                                        },
                                        {
                                            date: "2025-02-07",
                                            views: 1567
                                        }
                                    ]
                                });
                                setLoading(false);
                            }
                        }["AnalyticsPage[useEffect() > loadAnalytics > setTimeout()]"], 1500);
                    }
                }["AnalyticsPage[useEffect() > loadAnalytics]"];
                loadAnalytics();
            }
        })["AnalyticsPage[useEffect()]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] !== timeRange) {
        t1 = [
            timeRange
        ];
        $[2] = timeRange;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    if (loading) {
        let t2;
        if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/analytics/page.tsx",
                            lineNumber: 177,
                            columnNumber: 96
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted",
                            children: "Loading analytics..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/analytics/page.tsx",
                            lineNumber: 177,
                            columnNumber: 187
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 177,
                    columnNumber: 67
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 177,
                columnNumber: 12
            }, this);
            $[4] = t2;
        } else {
            t2 = $[4];
        }
        return t2;
    }
    if (!data) {
        return null;
    }
    let t2;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold",
                    children: "Analytics"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 189,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted",
                    children: "Track your website performance"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 189,
                    columnNumber: 64
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 189,
            columnNumber: 10
        }, this);
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "AnalyticsPage[<select>.onChange]": (e)=>setTimeRange(e.target.value)
        })["AnalyticsPage[<select>.onChange]"];
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    let t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "7d",
            children: "Last 7 days"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 207,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "30d",
            children: "Last 30 days"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 208,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "90d",
            children: "Last 90 days"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 209,
            columnNumber: 10
        }, this);
        $[7] = t4;
        $[8] = t5;
        $[9] = t6;
    } else {
        t4 = $[7];
        t5 = $[8];
        t6 = $[9];
    }
    let t7;
    if ($[10] !== timeRange) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: timeRange,
                    onChange: t3,
                    className: "rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent",
                    children: [
                        t4,
                        t5,
                        t6
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 220,
                    columnNumber: 65
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 220,
            columnNumber: 10
        }, this);
        $[10] = timeRange;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-medium text-muted",
            children: "Total Views"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 228,
            columnNumber: 10
        }, this);
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    const t9 = `text-lg ${data.pageViews.trend === "up" ? "text-green-500" : data.pageViews.trend === "down" ? "text-red-500" : "text-yellow-500"}`;
    const t10 = data.pageViews.trend === "up" ? "\uD83D\uDCC8" : data.pageViews.trend === "down" ? "\uD83D\uDCC9" : "\u27A1\uFE0F";
    let t11;
    if ($[13] !== t10 || $[14] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-2",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: t9,
                    children: t10
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 237,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 237,
            columnNumber: 11
        }, this);
        $[13] = t10;
        $[14] = t9;
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] !== data.pageViews.total) {
        t12 = data.pageViews.total.toLocaleString();
        $[16] = data.pageViews.total;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-2xl font-bold",
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 254,
            columnNumber: 11
        }, this);
        $[18] = t12;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== t11 || $[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 262,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-medium text-muted mb-2",
            children: "Today"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== data.pageViews.today) {
        t16 = data.pageViews.today.toLocaleString();
        $[24] = data.pageViews.today;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: t16
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 286,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 286,
            columnNumber: 11
        }, this);
        $[26] = t16;
        $[27] = t17;
    } else {
        t17 = $[27];
    }
    let t18;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-medium text-muted mb-2",
            children: "This Week"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 294,
            columnNumber: 11
        }, this);
        $[28] = t18;
    } else {
        t18 = $[28];
    }
    let t19;
    if ($[29] !== data.pageViews.thisWeek) {
        t19 = data.pageViews.thisWeek.toLocaleString();
        $[29] = data.pageViews.thisWeek;
        $[30] = t19;
    } else {
        t19 = $[30];
    }
    let t20;
    if ($[31] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: t19
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 309,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 309,
            columnNumber: 11
        }, this);
        $[31] = t19;
        $[32] = t20;
    } else {
        t20 = $[32];
    }
    let t21;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-medium text-muted mb-2",
            children: "This Month"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 317,
            columnNumber: 11
        }, this);
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] !== data.pageViews.thisMonth) {
        t22 = data.pageViews.thisMonth.toLocaleString();
        $[34] = data.pageViews.thisMonth;
        $[35] = t22;
    } else {
        t22 = $[35];
    }
    let t23;
    if ($[36] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t21,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold",
                    children: t22
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 332,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 332,
            columnNumber: 11
        }, this);
        $[36] = t22;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    let t24;
    if ($[38] !== t14 || $[39] !== t17 || $[40] !== t20 || $[41] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: [
                t14,
                t17,
                t20,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 340,
            columnNumber: 11
        }, this);
        $[38] = t14;
        $[39] = t17;
        $[40] = t20;
        $[41] = t23;
        $[42] = t24;
    } else {
        t24 = $[42];
    }
    let t25;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Top Performing Posts"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 351,
            columnNumber: 11
        }, this);
        $[43] = t25;
    } else {
        t25 = $[43];
    }
    let t26;
    if ($[44] !== data.topPosts) {
        t26 = data.topPosts.map(_AnalyticsPageDataTopPostsMap);
        $[44] = data.topPosts;
        $[45] = t26;
    } else {
        t26 = $[45];
    }
    let t27;
    if ($[46] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: t26
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 366,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 366,
            columnNumber: 11
        }, this);
        $[46] = t26;
        $[47] = t27;
    } else {
        t27 = $[47];
    }
    let t28;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Traffic Sources"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 374,
            columnNumber: 11
        }, this);
        $[48] = t28;
    } else {
        t28 = $[48];
    }
    let t29;
    if ($[49] !== data.trafficSources) {
        t29 = data.trafficSources.map(_AnalyticsPageDataTrafficSourcesMap);
        $[49] = data.trafficSources;
        $[50] = t29;
    } else {
        t29 = $[50];
    }
    let t30;
    if ($[51] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t28,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: t29
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 389,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 389,
            columnNumber: 11
        }, this);
        $[51] = t29;
        $[52] = t30;
    } else {
        t30 = $[52];
    }
    let t31;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Popular Categories"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 397,
            columnNumber: 11
        }, this);
        $[53] = t31;
    } else {
        t31 = $[53];
    }
    let t32;
    if ($[54] !== data.popularCategories) {
        t32 = data.popularCategories.map(_AnalyticsPageDataPopularCategoriesMap);
        $[54] = data.popularCategories;
        $[55] = t32;
    } else {
        t32 = $[55];
    }
    let t33;
    if ($[56] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t31,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: t32
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 412,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 412,
            columnNumber: 11
        }, this);
        $[56] = t32;
        $[57] = t33;
    } else {
        t33 = $[57];
    }
    let t34;
    if ($[58] !== t30 || $[59] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
            children: [
                t30,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 420,
            columnNumber: 11
        }, this);
        $[58] = t30;
        $[59] = t33;
        $[60] = t34;
    } else {
        t34 = $[60];
    }
    let t35;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Daily Views Trend"
        }, void 0, false, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 429,
            columnNumber: 11
        }, this);
        $[61] = t35;
    } else {
        t35 = $[61];
    }
    let t36;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-border bg-card p-6",
            children: [
                t35,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-64 flex items-center justify-center bg-secondary/20 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: "Chart visualization would go here"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 436,
                        columnNumber: 159
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                    lineNumber: 436,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 436,
            columnNumber: 11
        }, this);
        $[62] = t36;
    } else {
        t36 = $[62];
    }
    let t37;
    if ($[63] !== t24 || $[64] !== t27 || $[65] !== t34 || $[66] !== t7) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t7,
                t24,
                t27,
                t34,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/analytics/page.tsx",
            lineNumber: 443,
            columnNumber: 11
        }, this);
        $[63] = t24;
        $[64] = t27;
        $[65] = t34;
        $[66] = t7;
        $[67] = t37;
    } else {
        t37 = $[67];
    }
    return t37;
}
_s(AnalyticsPage, "S8rWsNYqlKsmcy40AulbLAmYfbg=");
_c = AnalyticsPage;
function _AnalyticsPageDataPopularCategoriesMap(category) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium",
                        children: category.category
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 455,
                        columnNumber: 90
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: [
                            category.posts,
                            " posts"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 455,
                        columnNumber: 140
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 455,
                columnNumber: 85
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold",
                        children: category.views.toLocaleString()
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 455,
                        columnNumber: 234
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: "views"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 455,
                        columnNumber: 300
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 455,
                columnNumber: 206
            }, this)
        ]
    }, category.category, true, {
        fileName: "[project]/src/app/admin/analytics/page.tsx",
        lineNumber: 455,
        columnNumber: 10
    }, this);
}
function _AnalyticsPageDataTrafficSourcesMap(source) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg",
                        children: source.source === "Direct" ? "\uD83D\uDD17" : source.source === "Search" ? "\uD83D\uDD0D" : source.source === "Social" ? "\uD83D\uDCF1" : source.source === "Referral" ? "\uD83D\uDD17" : "\uD83D\uDCCA"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 458,
                        columnNumber: 122
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: source.source
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 458,
                        columnNumber: 357
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 458,
                columnNumber: 81
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 bg-secondary rounded-full h-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-accent h-2 rounded-full",
                            style: {
                                width: `${source.percentage}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/analytics/page.tsx",
                            lineNumber: 458,
                            columnNumber: 508
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 458,
                        columnNumber: 456
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-muted w-12 text-right",
                        children: [
                            source.percentage,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 460,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 458,
                columnNumber: 415
            }, this)
        ]
    }, source.source, true, {
        fileName: "[project]/src/app/admin/analytics/page.tsx",
        lineNumber: 458,
        columnNumber: 10
    }, this);
}
function _AnalyticsPageDataTopPostsMap(post, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between py-2 border-b border-border last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg font-bold text-muted",
                        children: [
                            "#",
                            index + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 463,
                        columnNumber: 158
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 463,
                                columnNumber: 229
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: post.category
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 463,
                                columnNumber: 272
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 463,
                        columnNumber: 224
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 463,
                columnNumber: 117
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold",
                        children: post.views.toLocaleString()
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 463,
                        columnNumber: 365
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: "views"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 463,
                        columnNumber: 427
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 463,
                columnNumber: 337
            }, this)
        ]
    }, post.id, true, {
        fileName: "[project]/src/app/admin/analytics/page.tsx",
        lineNumber: 463,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "AnalyticsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_analytics_page_tsx_d86be7eb._.js.map