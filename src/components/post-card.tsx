import Link from "next/link";

import type { WPPost } from "@/lib/wp-types";
import { decodeHtmlEntities, stripHtml } from "@/lib/html";
import SafeImage from "@/components/safe-image";

function getFeaturedImage(post: WPPost) {
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    return media?.source_url ?? null;
}

export default function PostCard({ post }: { post: WPPost }) {
    const img = getFeaturedImage(post);
    const title = decodeHtmlEntities(post.title?.rendered || "");
    const excerpt = stripHtml(post.excerpt?.rendered || "");

    return (
        <article className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-950">
            <Link href={`/${post.slug}`} className="block">
                <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900">
                    {img ? (
                        <SafeImage
                            src={img}
                            alt={title}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={false}
                        />
                    ) : null}
                </div>
                <div className="p-5">
                    <h3 className="line-clamp-2 text-base font-semibold leading-6 text-zinc-950 dark:text-zinc-100">
                        {title || "Untitled"}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {excerpt}
                    </p>
                    <p className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
                        Read story
                    </p>
                </div>
            </Link>
        </article>
    );
}
