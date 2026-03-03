import type { Metadata } from "next";
import Link from "next/link";

import LocalPostCard from "@/components/local-post-card";
import {
    hasImportedContent,
    readCategoryIndex,
    readContentIndex,
} from "@/lib/local-content";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const imported = hasImportedContent();

    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Intelligence`,
        description: `Deep market analysis and intelligence for the ${slug} sector.`,
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const imported = hasImportedContent();

    if (!imported) {
        return (
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center py-20 text-center animate-fe-fade-in">
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <svg className="h-10 w-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Sector Offline</h1>
                <p className="mt-4 text-muted max-w-md">
                    This intelligence sector hasn't been synchronized yet.
                </p>
                <Link href="/" className="btn-modern mt-10">
                    Return to Terminal
                </Link>
            </div>
        );
    }

    const offlineCat = readCategoryIndex(slug);
    const offlineIdx = readContentIndex();
    const offlineItems = (() => {
        if (!offlineIdx) return [];
        if (offlineCat?.posts?.length) {
            return offlineCat.posts.map((s: string) => offlineIdx.items[s]).filter(Boolean);
        }

        return Object.values(offlineIdx.items).filter(
            (i) => i.type === "post" && i.sectionSlug === slug
        );
    })();

    const useLive = false;
    const categoryName = (offlineItems as any[])[0]?.section ?? slug;
    const items = offlineItems;

    return (
        <div className="flex flex-col gap-16 pb-20">
            {/* Cinematic Category Header */}
            <section className="relative pt-10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(35%_35%_at_50%_0%,var(--gold-glow)_0%,transparent_100%)] opacity-40" />

                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent animate-fe-fade-in">
                        Sector Analysis
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl animate-fe-fade-up capitalize">
                        {categoryName}
                    </h1>

                    <p className="max-w-2xl text-lg text-muted animate-fe-fade-up" style={{ animationDelay: '100ms' }}>
                        Curated intelligence and deep-dive reports across the {categoryName} landscape.
                    </p>

                    <div className="pt-4 animate-fe-fade-in" style={{ animationDelay: '200ms' }}>
                        <Link href="/" className="group flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground transition-colors">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">←</span>
                            Back to Terminal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="mx-auto w-full max-w-7xl px-6">
                {items.length === 0 ? (
                    <div className="bento-item flex flex-col items-center justify-center py-20 text-center animate-fe-fade-in">
                        <p className="text-lg font-semibold text-muted">No signals detected in this sector.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(items as any[]).map((i, idx) => (
                            <div key={i.slug} className="animate-fe-fade-up" style={{ animationDelay: `${idx * 50}ms` }}>
                                <LocalPostCard item={i} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
