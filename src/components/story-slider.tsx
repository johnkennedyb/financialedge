"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Story {
  slug: string;
  title: string;
  featuredImage?: string;
  section?: string;
  description?: string;
}

interface StorySliderProps {
  stories: Story[];
}

export default function StorySlider({ stories }: StorySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || stories.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, stories.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  if (stories.length === 0) return null;

  const currentStory = stories[currentIndex];

  const fallbackImages = [
    "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/730647/pexels-photo-730647.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/162534/pexels-photo-162534.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const imgIndex = currentIndex % fallbackImages.length;

  return (
    <div className="w-full max-w-6xl mx-auto mt-4">
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group bg-black">
        {/* Background Image */}
        <Image
          src={currentStory.featuredImage || fallbackImages[imgIndex]}
          alt={currentStory.title}
          fill
          className="object-contain transition-transform duration-700"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          {currentStory.section && (
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-bold text-white uppercase tracking-wider mb-3 w-fit">
              {currentStory.section}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
            {currentStory.title}
          </h2>
          {currentStory.description && (
            <p className="mt-4 text-lg text-zinc-300 line-clamp-2 max-w-2xl">
              {currentStory.description}
            </p>
          )}
          <Link
            href={`/${currentStory.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            Read Full Story
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous story"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next story"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"
                }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause/Play */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
          aria-label={isAutoPlaying ? "Pause" : "Play"}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
