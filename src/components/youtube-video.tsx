"use client";

import { useState } from "react";

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubeVideo({ videoId, title, className = "" }: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative aspect-video bg-secondary rounded-lg overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video"}
        className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

interface VideoCardProps {
  videoId: string;
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  className?: string;
}

export function VideoCard({ videoId, title, description, thumbnailUrl, className = "" }: VideoCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all group ${className}`}>
      <div className="relative aspect-video">
        {showPlayer ? (
          <YouTubeVideo videoId={videoId} title={title} className="rounded-none" />
        ) : (
          <>
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <span className="text-4xl">🎬</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setShowPlayer(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Video
              </button>
            </div>
          </>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold line-clamp-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}

interface VideoGridProps {
  videos: Array<{
    id: string;
    title: string;
    description: string | null;
    youtubeId: string;
    thumbnailUrl: string | null;
  }>;
  className?: string;
}

export function VideoGrid({ videos, className = "" }: VideoGridProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          videoId={video.youtubeId}
          title={video.title}
          description={video.description}
          thumbnailUrl={video.thumbnailUrl}
        />
      ))}
    </div>
  );
}
