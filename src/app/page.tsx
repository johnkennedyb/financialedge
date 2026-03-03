import Link from "next/link";
import Image from "next/image";

import LocalPostCard from "@/components/local-post-card";
import SafeImage from "@/components/safe-image";
import { hasImportedContent, listLatestPosts, listSections } from "@/lib/local-content";

export default async function HomePage() {
  const imported = hasImportedContent();
  const offlinePosts = imported ? listLatestPosts(12) : [];
  const offlineSections = imported ? listSections(12) : [];

  const useLive = false;
  const posts = offlinePosts;
  const sections = offlineSections;

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--gold-glow)_0%,transparent_100%)] opacity-50" />

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-semibold text-accent animate-fe-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Live Intelligence
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl animate-fe-fade-up">
            Financial insights, <br />
            <span className="bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent italic">redefined.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted animate-fe-fade-up" style={{ animationDelay: '100ms' }}>
            Nigeria's most reliable market analysis for the savvy investor. Fast, modern, and built for global intelligence summits.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fe-fade-up" style={{ animationDelay: '200ms' }}>
            <Link href="/category/finance" className="btn-modern bg-accent shadow-xl shadow-accent/20">
              Browse the Archive
            </Link>
            <Link href="/about" className="btn-modern bg-secondary border border-border !text-foreground hover:bg-border/50">
              Our Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bento Section */}
      <section className="mx-auto w-full max-w-7xl px-6">
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
              <div className="md:col-span-8 bento-item group overflow-hidden p-0 relative min-h-[400px]">
                {posts[0] && (
                  <>
                    <FeaturedBentoItem item={posts[0]} isLive={useLive} />
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
                  <Link href="/category/finance" className="mt-6 text-sm font-bold text-accent">Explore sectors →</Link>
                </div>

                <div className="bento-item bg-secondary/50 p-8 flex-1">
                  <h3 className="text-lg font-bold">Summit Ready</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Designed for high-impact presentations. Fast, reliable, and visually stunning.
                  </p>
                </div>
              </div>

              {/* Remaining Posts */}
              <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {(posts as any[]).slice(1, 10).map((p) => <LocalPostCard key={p.slug} item={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FeaturedBentoItem({ item, isLive }: { item: any, isLive: boolean }) {
  const title = isLive ? item.title?.rendered : item.title;
  const description = isLive ? item.excerpt?.rendered : item.description;
  const image = isLive
    ? item._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    : item.featuredImage;
  const slug = String(item.slug || '');

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
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-accent text-[10px] font-bold text-white uppercase tracking-widest mb-4">
          Featured Intelligence
        </span>
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
