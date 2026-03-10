"use client";

import Link from "next/link";

import type { ContentIndexItem } from "@/lib/local-content";
import { decodeHtmlEntities } from "@/lib/html";

export default function LocalPostCard({ item }: { item: ContentIndexItem }) {
    const title = decodeHtmlEntities(item.title ?? "");

    const fallbackImages = [
        // Business/Corporate
        "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7681098/pexels-photo-7681098.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // Finance/Money
        "https://images.pexels.com/photos/730647/pexels-photo-730647.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // Office/Work
        "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/37347/pexels-photo-37347.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // Technology
        "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // Energy/Oil
        "https://images.pexels.com/photos/162534/sunset-sky-sunrise-sun-162534.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // Agriculture
        "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // Charts/Graphs
        "https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7567413/pexels-photo-7567413.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7567445/pexels-photo-7567445.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ];

    const imgIndex =
        Array.from(item.slug ?? "")
            .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % fallbackImages.length;
    const heroImage = item.featuredImage ?? fallbackImages[imgIndex];

    return (
        <article className="group animate-fe-fade-up card overflow-hidden h-full transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(11,15,26,0.12)] active:translate-y-0">
            <Link href={`/${item.slug}`} className="block h-full">
                <div className="relative h-[300px] w-full bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={heroImage || fallbackImages[imgIndex]}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackImages[imgIndex];
                        }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.15))]" />
                </div>
                <div className="flex flex-col h-full p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        {item.section ? (
                            <span className="rounded-full bg-[rgba(11,87,208,0.08)] px-3 py-1 text-xs font-semibold text-[color:var(--brand)]">
                                {item.section}
                            </span>
                        ) : (
                            <span />
                        )}
                        <div className="flex items-center gap-2">
                            {item.author && (
                                <span className="text-xs font-medium text-[color:var(--muted)]">
                                    By {item.author}
                                </span>
                            )}
                            {item.author && item.publishedAt && (
                                <span className="text-xs text-[color:var(--muted)]">•</span>
                            )}
                            {item.publishedAt ? (
                                <span className="text-xs font-medium text-[color:var(--muted)]">
                                    {new Date(item.publishedAt).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6 tracking-tight text-[color:var(--foreground)]">
                        {title || "Untitled"}
                    </h3>
                    {item.description ? (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[color:var(--muted)]">
                            {decodeHtmlEntities(item.description)}
                        </p>
                    ) : null}

                    <div className="mt-5 inline-flex items-center gap-2">
                        <span className="btn-brand h-10 px-4 text-sm">Read story</span>
                        <span className="text-sm font-semibold text-[color:var(--brand)]">→</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
