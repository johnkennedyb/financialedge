"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ImageLightbox from "@/components/image-lightbox";

interface Advert {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  position: string;
  status: string;
}

interface AdvertBannerProps {
  position: "homepage_hero" | "homepage_sidebar" | "footer" | "sidebar" | "inline";
  className?: string;
}

export default function AdvertBanner({ position, className = "" }: AdvertBannerProps) {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/adverts?position=${position}`)
      .then((res) => res.json())
      .then((data) => setAdverts(data.adverts || []))
      .catch((err) => console.error("Failed to load adverts:", err));
  }, [position]);

  if (adverts.length === 0) return null;

  const advert = adverts[0];

  const handleImageClick = (e: React.MouseEvent) => {
    if (advert.imageUrl) {
      e.preventDefault();
      e.stopPropagation();
      setLightboxOpen(true);
    }
  };

  const advertContent = (
    <div className="relative overflow-hidden border border-border hover:border-accent transition-all hover:shadow-md w-full">
      {advert.imageUrl ? (
        <div
          className="relative w-full max-h-[400px] md:min-h-[400px] md:max-h-[1000px] cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={advert.imageUrl}
            alt={advert.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="p-8 bg-gradient-to-br from-accent/10 to-gold/10 min-h-[200px] flex flex-col justify-center w-full">
          <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {advert.title}
          </h3>
          {advert.description && (
            <p className="mt-2 text-sm text-muted line-clamp-2">
              {advert.description}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={`advert-banner ${className}`}>
        <div className="text-xs text-muted mb-1 uppercase tracking-wider">Advertisement</div>
        {advert.linkUrl ? (
          <Link
            href={advert.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            {advertContent}
          </Link>
        ) : (
          <div className="block group">
            {advertContent}
          </div>
        )}
      </div>
      {advert.imageUrl && (
        <ImageLightbox
          src={advert.imageUrl}
          alt={advert.title}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
