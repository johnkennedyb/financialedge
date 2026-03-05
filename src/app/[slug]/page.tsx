import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Prose from "@/components/prose";
import ShareButtons from "@/components/share-buttons";
import SafeImage from "@/components/safe-image";
import { decodeHtmlEntities } from "@/lib/html";
import { getPostBySlug, getAllPostSlugs } from "@/lib/db-content";

const RESERVED = new Set(["about", "category", "post", "api", "_next", "favicon.ico"]);

// Tell Next.js which pages to pre-render
export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    if (RESERVED.has(slug)) return {};

    const item = await getPostBySlug(slug);

    if (!item) {
        return {
            title: "Not found",
        };
    }

    return {
        title: decodeHtmlEntities(item.title ?? "Untitled"),
        description: item.description ?? undefined,
    };
}

export default async function SlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    if (RESERVED.has(slug)) notFound();

    const item = await getPostBySlug(slug);

    if (!item) {
        return (
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center py-20 text-center animate-fe-fade-in">
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <svg className="h-10 w-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Intelligence Lost</h1>
                <p className="mt-4 text-muted max-w-md">
                    We couldn't locate this specific signal in our live or offline archives.
                </p>
                <Link href="/" className="btn-modern mt-10">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const title = decodeHtmlEntities(item.title ?? "Untitled");
    const description = item.description;
    const featuredImage = item.featuredImage;
    const html = item.html;
    const section = item.section;
    const sectionSlug = item.sectionSlug;
    const publishedAt = item.publishedAt;

    const dateToDisplay = publishedAt && typeof publishedAt === 'string' ? publishedAt : null;

    return (
        <article className="mx-auto w-full max-w-4xl pb-20">
            {/* Minimal Focus Header */}
            <div className="flex items-center justify-between mb-12 animate-fe-fade-in">
                <Link href="/" className="group flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground transition-colors">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">←</span>
                    Back to Terminal
                </Link>
                {sectionSlug && (
                    <Link href={`/category/${sectionSlug}`} className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:bg-accent hover:text-white transition-all">
                        {section || 'Intelligence'}
                    </Link>
                )}
            </div>

            <div className="space-y-12">
                <header className="space-y-6 animate-fe-fade-up">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                        {title}
                    </h1>

                    <div className="flex items-center gap-4 pt-2">
                        {dateToDisplay && (
                            <time className="text-sm font-medium text-muted flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-accent" />
                                {new Date(dateToDisplay).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        )}
                        <span className="text-muted text-sm">•</span>
                        <span className="text-sm font-medium text-muted uppercase tracking-widest">Research Signal</span>
                    </div>
                </header>

                {featuredImage && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border shadow-elevated animate-fe-fade-up" style={{ animationDelay: '100ms' }}>
                        <SafeImage
                            src={featuredImage}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            priority
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 pt-4">
                    <div className="animate-fe-fade-up" style={{ animationDelay: '200ms' }}>
                        <Prose className="max-w-none prose-lg prose-zinc dark:prose-invert prose-headings:font-bold prose-a:text-accent prose-img:rounded-3xl">
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </Prose>
                    </div>

                    <aside className="hidden lg:block space-y-8 animate-fe-fade-in" style={{ animationDelay: '400ms' }}>
                        <div className="rounded-2xl border border-border bg-secondary/30 p-6 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Key Metrics</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Source</span>
                                    <span className="font-semibold">Database</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Stability</span>
                                    <span className="font-semibold text-green-500">Verified</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Share Intelligence</h4>
                            <ShareButtons title={title} path={`/${slug}`} />
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
