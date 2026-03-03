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
    // Create new professional About content
    const aboutContent = `
        <div class="about-content">
            <h2>About FinancialEDGE</h2>
            <p>
                FinancialEDGE is Nigeria's most trusted financial newsletter and media platform, 
                providing comprehensive coverage of capital markets, real estate, finance, energy, 
                and agricultural business sectors. As a wholly owned subsidiary of Financial Edge 
                Integrated Media Enterprise Limited, we are committed to delivering accurate, 
                timely, and insightful financial intelligence to our readers across Nigeria and beyond.
            </p>
            
            <h2>Our Mission</h2>
            <p>
                To bridge the information gap in financial and economic reporting by presenting 
                timely analyses, objective news commentary, and actionable insights that empower 
                investors, business leaders, and policymakers to make informed decisions in 
                Nigeria's dynamic economic landscape.
            </p>
            
            <h2>Our Vision</h2>
            <p>
                To be the definitive reference point for financial and economic sector reporting 
                in Africa, setting the standard for excellence in financial journalism and 
                becoming the most trusted source for market intelligence across the continent.
            </p>
            
            <h2>What We Cover</h2>
            <ul>
                <li><strong>Capital Market:</strong> In-depth analysis of Nigerian Stock Exchange activities, 
                equity movements, and market trends affecting investors.</li>
                <li><strong>Real Estate:</strong> Comprehensive coverage of property market developments, 
                investment opportunities, and regulatory changes in Nigeria's real estate sector.</li>
                <li><strong>Finance:</strong> Banking sector updates, monetary policy analysis, 
                and fintech innovations shaping Nigeria's financial landscape.</li>
                <li><strong>Energy:</strong> Oil & gas sector developments, renewable energy initiatives, 
                and power sector reforms impacting Nigeria's energy future.</li>
                <li><strong>Agro Business:</strong> Agricultural sector insights, farming investments, 
                and food security developments in Nigeria's agricultural economy.</li>
                <li><strong>Money Market:</strong> Treasury bills, bonds, and fixed income market analysis 
                for institutional and individual investors.</li>
            </ul>
            
            <h2>Our Expertise</h2>
            <p>
                FinancialEDGE brings together a team of seasoned financial journalists, market analysts, 
                and industry experts with decades of combined experience in financial markets and 
                economic analysis. Our team provides credible background, deep sector knowledge, 
                and the analytical rigor necessary to deliver high-quality financial intelligence 
                that our readers can trust.
            </p>
            
            <h2>Why Choose FinancialEDGE?</h2>
            <ul>
                <li><strong>Reliability:</strong> We are Nigeria's most reliable financial newsletter, 
                trusted by thousands of readers for accurate and unbiased reporting.</li>
                <li><strong>Timeliness:</strong> Breaking news and real-time market updates delivered 
                when you need them most.</li>
                <li><strong>Depth:</strong> Beyond headlines, we provide the context and analysis 
                that helps you understand the implications of market movements.</li>
                <li><strong>Expertise:</strong> Our team of financial professionals brings unparalleled 
                insight and understanding of Nigerian markets.</li>
                <li><strong>Comprehensive Coverage:</strong> From capital markets to agriculture, 
                we cover all sectors that matter to Nigeria's economy.</li>
            </ul>
            
            <h2>Contact Us</h2>
            <p>
                Stay connected with FinancialEDGE for the latest financial news and market insights. 
                Whether you're an investor, business leader, or financial professional, we're here 
                to provide the intelligence you need to succeed in Nigeria's dynamic economy.
            </p>
            
            <div class="contact-details">
                <h3>Get in Touch</h3>
                <p><strong>Address:</strong> 4/6, Mobolaji Bank Anthony Street, Beside Lion Building Police Station, 
                Off Broad Street, Lagos Island, Lagos, Nigeria.</p>
                <p><strong>Phone:</strong> 08058554915, 08028894929</p>
                <p><strong>Email:</strong> financialedgenews@gmail.com</p>
            </div>
            
            <div class="newsletter-signup">
                <h3>Subscribe to Our Newsletter</h3>
                <p>
                Join thousands of readers who rely on FinancialEDGE for their daily financial 
                intelligence. Get our newsletter delivered directly to your inbox.
                </p>
                <p><strong>Send us a message!</strong></p>
                <p>
                We welcome your feedback, story ideas, and partnership inquiries. 
                Your input helps us serve you better and continue improving our coverage 
                of Nigeria's financial landscape.
                </p>
            </div>
        </div>
    `;
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
                    lineNumber: 139,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 138,
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
                        lineNumber: 145,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
                        children: "About FinancialEDGE"
                    }, void 0, false, {
                        fileName: "[project]/src/app/about/page.tsx",
                        lineNumber: 146,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 144,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card animate-fe-fade-up overflow-hidden rounded-[28px] p-6 md:p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "prose prose-lg max-w-none",
                    dangerouslySetInnerHTML: {
                        __html: aboutContent
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/about/page.tsx",
                    lineNumber: 152,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 151,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/about/page.tsx",
        lineNumber: 137,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/about/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/about/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b773499._.js.map