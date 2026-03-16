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
  `).map(b=>({slug:b.slug,type:"post",title:b.title,description:b.description,publishedAt:b.publishedat,featuredImage:b.featuredimage||null,sourceUrl:`/${b.slug}`,section:a,sectionSlug:a,author:b.author||null}))}a.s(["getPostBySlug",()=>g,"getPostsBySection",()=>h,"hasImportedContent",()=>d,"listLatestPosts",()=>e,"listSections",()=>f])},813713,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/local-post-card.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/local-post-card.tsx <module evaluation>","default")},903420,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/local-post-card.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/local-post-card.tsx","default")},821864,a=>{"use strict";a.i(813713);var b=a.i(903420);a.n(b)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7469af69._.js.map