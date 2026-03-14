import Link from "next/link";
import Image from "next/image";
import { getActiveAdvertsByPosition } from "@/lib/adverts";

interface AdvertBannerProps {
  position: "homepage_hero" | "homepage_sidebar" | "footer" | "sidebar" | "inline";
  className?: string;
}

export default async function AdvertBanner({ position, className = "" }: AdvertBannerProps) {
  const adverts = await getActiveAdvertsByPosition(position);

  console.log('DEBUG AdvertBanner position:', position, 'adverts count:', adverts.length);
  if (adverts.length > 0) {
    console.log('DEBUG first advert:', adverts[0]);
  }

  if (adverts.length === 0) return null;

  // Get the highest priority advert
  const advert = adverts[0];

  // DEBUG: Show what's in the advert
  console.log('Advert data:', {
    title: advert.title,
    imageUrl: advert.imageUrl,
    hasImage: !!advert.imageUrl
  });

  const advertContent = (
    <div className="relative overflow-hidden border border-border hover:border-accent transition-all hover:shadow-md w-full">
      {advert.imageUrl ? (
        <div className="relative aspect-[16/5] w-full max-h-[400px] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={advert.imageUrl}
            alt={advert.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
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
  );
}
