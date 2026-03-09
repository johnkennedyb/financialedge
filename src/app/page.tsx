import Link from "next/link";
import Image from "next/image";

import LocalPostCard from "@/components/local-post-card";
import SafeImage from "@/components/safe-image";
import AdvertBanner from "@/components/advert-banner";
import StorySlider from "@/components/story-slider";
import { hasImportedContent, listLatestPosts, listSections, getPostsBySection } from "@/lib/db-content";

// Force dynamic rendering to always show fresh posts
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const imported = hasImportedContent();
  const posts = imported ? await listLatestPosts(12) : [];
  const sections = imported ? await listSections(12) : [];

  // Group posts by their primary category/section
  const postsByCategory: Record<string, typeof posts> = {};
  const uncategorizedPosts: typeof posts = [];

  posts.forEach((post) => {
    const category = post.section || post.sectionSlug;
    if (category) {
      if (!postsByCategory[category]) {
        postsByCategory[category] = [];
      }
      postsByCategory[category].push(post);
    } else {
      uncategorizedPosts.push(post);
    }
  });

  // Get category display names
  const categoryDisplayNames: Record<string, string> = {};
  sections.forEach((s) => {
    categoryDisplayNames[s.slug] = s.section;
  });

  // Debug: log posts to console (visible in Vercel logs)
  console.log(`[HomePage] Fetched ${posts.length} posts across ${Object.keys(postsByCategory).length} categories`);

  return (
    <div className="flex flex-col pb-12">
      {/* Hero Section - No gap with menu */}
      <section className="relative -mt-1">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--gold-glow)_0%,transparent_100%)] opacity-50" />

        <div className="flex flex-col items-center text-center pt-1">
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mt-4">
            <span className="text-blue-600">Financial edge,</span> <br className="leading-none" />
            <span className="text-red-600 font-bold text-lg sm:text-xl lg:text-2xl italic leading-tight">sustaining stakeholders relations</span>
          </h1>

          {/* Story Slider */}
          <div className="w-full mt-4">
            <StorySlider stories={posts.slice(0, 5).map(p => ({ ...p, title: p.title || '', description: p.description || '', featuredImage: p.featuredImage || undefined, section: p.section || undefined }))} />
          </div>
        </div>
      </section>

      {/* Homepage Hero Advert - Full Width */}
      <section className="w-full mt-6 px-6">
        <AdvertBanner position="homepage_hero" />
      </section>

      {/* Featured Bento Section */}
      <section className="mx-auto w-full max-w-7xl px-6 mt-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Market Pulse</h2>
              <p className="mt-1 text-muted">Real-time intelligence across sectors</p>
            </div>
            <Link href="/category/news" className="text-sm font-semibold text-accent hover:underline decoration-2 underline-offset-4 transition-all">
              View all stories →
            </Link>
          </div>

          {!imported ? (
            <div className="bento-item flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold">Intelligence engine offline</p>
              <p className="mt-2 text-muted">Run the importer to populate the dashboard.</p>
              <code className="mt-6 rounded-lg bg-secondary px-4 py-2 text-sm">node scripts/import-financialedge.mjs</code>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Featured Post - Large Bento */}
              <div className="md:col-span-8 bento-item group overflow-hidden p-0 relative h-[300px]">
                {posts[0] && (
                  <>
                    <FeaturedBentoItem item={posts[0]} />
                  </>
                )}
              </div>

              {/* Secondary Posts - Vertical Bento Stack */}
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="bento-item bg-accent/5 border-accent/10 p-8 flex flex-col justify-between flex-1">
                  <h3 className="text-xl font-bold leading-tight">Sector Access</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {sections.slice(0, 6).map((s) => (
                      <Link
                        key={s.slug}
                        href={`/category/${s.slug}`}
                        className="rounded-full bg-background/50 border border-border px-3 py-1 text-xs font-semibold hover:bg-accent hover:text-white hover:border-accent transition-all"
                      >
                        {s.section}
                      </Link>
                    ))}
                  </div>
                  <Link href="/category" className="mt-6 text-sm font-bold text-accent">Explore sectors →</Link>
                </div>

                <div className="bento-item bg-secondary/50 p-8 flex-1">
                  <h3 className="text-lg font-bold">Summit Ready</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Designed for high-impact presentations. Fast, reliable, and visually stunning.
                  </p>
                </div>

                {/* Homepage Sidebar Advert */}
                <AdvertBanner position="homepage_sidebar" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Sections - Posts grouped by category */}
      {imported && Object.keys(postsByCategory).length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="flex flex-col gap-16">
            {Object.entries(postsByCategory).map(([categorySlug, categoryPosts]) => {
              const displayName = categoryDisplayNames[categorySlug] || categorySlug;
              const visiblePosts = categoryPosts.slice(0, 6);
              const hasMore = categoryPosts.length > 6;

              return (
                <div key={categorySlug} className="flex flex-col gap-6">
                  <div className="flex items-end justify-between border-b border-border pb-4">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight capitalize">{displayName}</h2>
                      <p className="mt-1 text-muted text-sm">{categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} in this category</p>
                    </div>
                    <Link
                      href={`/category/${categorySlug}`}
                      className="text-sm font-semibold text-accent hover:underline decoration-2 underline-offset-4 transition-all"
                    >
                      View all {displayName} →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visiblePosts.map((post) => (
                      <LocalPostCard key={post.slug} item={post} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="text-center">
                      <Link
                        href={`/category/${categorySlug}`}
                        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                      >
                        <span>+ {categoryPosts.length - 6} more articles</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            {uncategorizedPosts.length > 0 && (
              <div className="flex flex-col gap-6">
                <div className="flex items-end justify-between border-b border-border pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
                    <p className="mt-1 text-muted text-sm">Recent articles across all topics</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uncategorizedPosts.slice(0, 6).map((post) => (
                    <LocalPostCard key={post.slug} item={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function FeaturedBentoItem({ item }: { item: any }) {
  const title = item.title;
  const description = item.description;
  const image = item.featuredImage;
  const slug = String(item.slug || '');
  const section = item.section || item.sectionSlug;

  const fallbackImages = [
    "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/730647/pexels-photo-730647.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/162534/pexels-photo-162534.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];
  const imgIndex = Array.from(slug ?? "").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % fallbackImages.length;

  return (
    <Link href={`/${slug}`} className="relative h-full w-full flex flex-col justify-end p-8 group">
      <SafeImage
        src={image}
        fallbackSrc={fallbackImages[imgIndex]}
        alt={title || "Featured"}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="relative z-10">
        {section && (
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-[10px] font-bold text-white uppercase tracking-widest mb-4">
            {section}
          </span>
        )}
        <h3 className="text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="mt-4 text-zinc-300 line-clamp-2 max-w-xl text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Link>
  );
}
