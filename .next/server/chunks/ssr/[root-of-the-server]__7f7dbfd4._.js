module.exports=[193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},650645,a=>{a.n(a.i(827572))},43619,a=>{a.n(a.i(379962))},13718,a=>{a.n(a.i(685523))},118198,a=>{a.n(a.i(545518))},262212,a=>{a.n(a.i(866114))},892927,a=>{"use strict";var b=a.i(546767);let c=()=>{let a=process.env.DATABASE_URL;if(!a)throw Error("DATABASE_URL is not defined");return(0,b.neon)(a)};function d(){return!0}async function e(a=12){let b=c();return(await b`
    SELECT 
      slug,
      title,
      excerpt as description,
      featured_image as featuredImage,
      published_at as publishedAt,
      categories,
      status,
      author
    FROM posts 
    WHERE LOWER(TRIM(status)) = 'publish'
    ORDER BY published_at DESC NULLS LAST, created_at DESC
    LIMIT ${a}
  `).map(a=>({slug:a.slug,type:"post",title:a.title,description:a.description,publishedAt:a.publishedat,featuredImage:a.featuredimage||null,sourceUrl:`/${a.slug}`,section:a.categories?.[0]||null,sectionSlug:a.categories?.[0]||null,author:a.author||null}))}async function f(a=12){let b=c();return(await b`
    SELECT 
      c.name as section,
      c.slug,
      COUNT(p.id)::int as count
    FROM categories c
    LEFT JOIN posts p ON c.slug = ANY(p.categories) AND LOWER(TRIM(p.status)) = 'publish'
    GROUP BY c.id, c.name, c.slug
    ORDER BY count DESC
    LIMIT ${a}
  `).map(a=>({section:a.section,slug:a.slug,count:a.count}))}async function g(a){let b=c(),d=await b`
    SELECT 
      slug,
      title,
      excerpt as description,
      content as html,
      featured_image as featuredImage,
      published_at as publishedAt,
      categories,
      author,
      status
    FROM posts 
    WHERE slug = ${a}
      AND LOWER(TRIM(status)) = 'publish'
    LIMIT 1
  `;if(0===d.length)return null;let e=d[0];return{slug:e.slug,url:`/${e.slug}`,title:e.title,description:e.description,featuredImage:e.featuredimage||null,publishedAt:e.publishedat,html:e.html||"",section:e.categories?.[0]||null,sectionSlug:e.categories?.[0]||null,type:"post",author:e.author||null}}async function h(a,b=12){let d=c();return(await d`
    SELECT 
      slug,
      title,
      excerpt as description,
      featured_image as featuredImage,
      published_at as publishedAt,
      categories,
      status,
      author
    FROM posts 
    WHERE LOWER(TRIM(status)) = 'publish'
      AND ${a} = ANY(categories)
    ORDER BY published_at DESC NULLS LAST, created_at DESC
    LIMIT ${b}
  `).map(b=>({slug:b.slug,type:"post",title:b.title,description:b.description,publishedAt:b.publishedat,featuredImage:b.featuredimage||null,sourceUrl:`/${b.slug}`,section:a,sectionSlug:a,author:b.author||null}))}a.s(["getPostBySlug",()=>g,"getPostsBySection",()=>h,"hasImportedContent",()=>d,"listLatestPosts",()=>e,"listSections",()=>f])},813713,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/local-post-card.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/local-post-card.tsx <module evaluation>","default")},903420,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/local-post-card.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/local-post-card.tsx","default")},821864,a=>{"use strict";a.i(813713);var b=a.i(903420);a.n(b)},633260,a=>{"use strict";var b=a.i(907997),c=a.i(395936),d=a.i(821864),e=a.i(165373),f=a.i(892927);async function g({params:a}){let{slug:b}=await a;return(0,f.hasImportedContent)(),{title:`${b.charAt(0).toUpperCase()+b.slice(1)} Intelligence`,description:`Deep market analysis and intelligence for the ${b} sector.`}}async function h({params:a}){let{slug:g}=await a;if(!(0,f.hasImportedContent)())return(0,b.jsxs)("div",{className:"mx-auto flex w-full max-w-3xl flex-col items-center justify-center py-20 text-center animate-fe-fade-in",children:[(0,b.jsx)("div",{className:"h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6",children:(0,b.jsx)("svg",{className:"h-10 w-10 text-muted",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"})})}),(0,b.jsx)("h1",{className:"text-3xl font-bold tracking-tight",children:"Sector Offline"}),(0,b.jsx)("p",{className:"mt-4 text-muted max-w-md",children:"This intelligence sector hasn't been synchronized yet."}),(0,b.jsx)(c.default,{href:"/",className:"btn-modern mt-10",children:"Return to Terminal"})]});let h=await (0,f.getPostsBySection)(g,50),i=(await (0,f.listSections)(20)).find(a=>a.slug===g),j=i?.section||g;return(0,b.jsxs)("div",{className:"flex flex-col gap-16 pb-20",children:[(0,b.jsxs)("section",{className:"relative pt-10",children:[(0,b.jsx)("div",{className:"absolute inset-0 -z-10 bg-[radial-gradient(35%_35%_at_50%_0%,var(--gold-glow)_0%,transparent_100%)] opacity-40"}),(0,b.jsxs)("div",{className:"flex flex-col items-center text-center space-y-6",children:[(0,b.jsx)("div",{className:"inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent animate-fe-fade-in",children:"Sector Analysis"}),(0,b.jsx)("h1",{className:"text-5xl font-extrabold tracking-tight sm:text-7xl animate-fe-fade-up capitalize",children:j}),(0,b.jsxs)("p",{className:"max-w-2xl text-lg text-muted animate-fe-fade-up",style:{animationDelay:"100ms"},children:["Curated intelligence and deep-dive reports across the ",j," landscape."]}),(0,b.jsx)("div",{className:"pt-4 animate-fe-fade-in",style:{animationDelay:"200ms"},children:(0,b.jsxs)(c.default,{href:"/",className:"group flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground transition-colors",children:[(0,b.jsx)("span",{className:"flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all",children:"←"}),"Back to Terminal"]})})]})]}),(0,b.jsx)("section",{className:"mx-auto w-full max-w-7xl px-6",children:0===h.length?(0,b.jsx)("div",{className:"bento-item flex flex-col items-center justify-center py-20 text-center animate-fe-fade-in",children:(0,b.jsx)("p",{className:"text-lg font-semibold text-muted",children:"No signals detected in this sector."})}):(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-8",children:[(0,b.jsx)("div",{className:"lg:col-span-3",children:(0,b.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:h.map((a,c)=>(0,b.jsx)("div",{className:"animate-fe-fade-up",style:{animationDelay:`${50*c}ms`},children:(0,b.jsx)(d.default,{item:a})},a.slug))})}),(0,b.jsx)("div",{className:"lg:col-span-1",children:(0,b.jsx)("div",{className:"sticky top-24",children:(0,b.jsx)(e.default,{position:"sidebar"})})})]})})]})}a.s(["default",()=>h,"generateMetadata",()=>g])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7f7dbfd4._.js.map