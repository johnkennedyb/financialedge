"use client";

import { useState } from "react";
import ImageLightbox from "./image-lightbox";

interface FeaturedImageProps {
  src: string;
  alt: string;
}

export default function FeaturedImage({ src, alt }: FeaturedImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="image-container relative w-full overflow-hidden rounded-3xl border border-border shadow-elevated animate-fe-fade-up cursor-pointer hover:shadow-lg transition-shadow bg-secondary/50"
        style={{ animationDelay: '100ms' }}
        onClick={() => setIsLightboxOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-[300px] object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 hover:opacity-100 text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full transition-opacity">
            Click to expand
          </span>
        </div>
      </div>

      <ImageLightbox
        src={src}
        alt={alt}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
