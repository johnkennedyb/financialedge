"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  title: string;
  path: string;
};

type NavigatorWithShare = Navigator & {
  share: (data?: { title?: string; text?: string; url?: string }) => Promise<void>;
};

function cleanBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export default function ShareButtons({ title, path }: Props) {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    const siteUrl = cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL || "");
    const pathname = path.startsWith("/") ? path : `/${path}`;

    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      return;
    }

    // Fallback (mainly for non-browser environments)
    setCurrentUrl(siteUrl ? `${siteUrl}${pathname}` : pathname);
  }, [path]);

  const encodedUrl = useMemo(() => encodeURIComponent(currentUrl), [currentUrl]);
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);

  const shareTargets = useMemo(
    () => [
      {
        id: "facebook",
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        id: "x",
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      },
    ],
    [encodedTitle, encodedUrl]
  );

  async function copyLink() {
    if (!currentUrl) return;
    await navigator.clipboard.writeText(currentUrl);
  }

  async function webShare() {
    if (!currentUrl) return;
    if (typeof navigator === "undefined") return;

    if ("share" in navigator) {
      // Some devices will offer Instagram in the system share sheet.
      // Instagram does not provide a simple web share URL like Facebook.
      await (navigator as NavigatorWithShare).share({ title, url: currentUrl });
    } else {
      await copyLink();
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {shareTargets.map((t) => (
          <a
            key={t.id}
            href={t.href}
            target="_blank"
            rel="noreferrer"
            className="h-10 rounded-full border border-border px-4 text-sm font-semibold flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label={`Share on ${t.label}`}
          >
            {t.label}
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={webShare}
          className="h-10 rounded-full border border-border px-4 text-sm font-semibold flex items-center justify-center hover:bg-secondary transition-colors"
          disabled={!currentUrl}
        >
          Share
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="h-10 rounded-full border border-border px-4 text-sm font-semibold flex items-center justify-center hover:bg-secondary transition-colors"
          disabled={!currentUrl}
        >
          Copy Link
        </button>
      </div>

      <p className="text-xs text-muted">
        Instagram doesn’t support direct web share links. Use Copy Link / Share.
      </p>
    </div>
  );
}
