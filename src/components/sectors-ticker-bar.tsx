"use client";

import { useRef, useState } from "react";

// Featured sectors/categories - no external links
const featuredSectors = [
  { name: "Capital Market", articles: 45, trend: "up" },
  { name: "Money Market", articles: 32, trend: "up" },
  { name: "Energy", articles: 28, trend: "up" },
  { name: "Industry", articles: 24, trend: "stable" },
  { name: "News", articles: 67, trend: "up" },
  { name: "Banking", articles: 19, trend: "up" },
  { name: "Oil & Gas", articles: 15, trend: "stable" },
  { name: "Technology", articles: 12, trend: "up" },
  { name: "Agriculture", articles: 8, trend: "stable" },
  { name: "Real Estate", articles: 11, trend: "down" },
];

function SectorItem({ sector }: { sector: typeof featuredSectors[0] }) {
  const trendColors: Record<string, string> = {
    up: "text-green-400",
    down: "text-red-400",
    stable: "text-yellow-400",
  };

  const trendArrows: Record<string, string> = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  return (
    <div className="flex items-center gap-2 px-4 whitespace-nowrap border-l border-white/10 first:border-l-0">
      <span className="text-xs font-bold text-white">{sector.name}</span>
      <span className="text-xs text-white/60">{sector.articles} articles</span>
      <span className={`text-xs ${trendColors[sector.trend]}`}>
        {trendArrows[sector.trend]}
      </span>
    </div>
  );
}

interface SectorsTickerBarProps {
  speed?: number;
}

export default function SectorsTickerBar({ speed = 75 }: SectorsTickerBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless scrolling
  const displayContent = [...featuredSectors, ...featuredSectors, ...featuredSectors];

  return (
    <div className="bg-slate-700 border-b border-border/50 overflow-hidden fixed top-[108px] left-0 right-0 z-[9996]">
      <div className="flex items-center">
        {/* Sectors Label */}
        <div className="flex-shrink-0 bg-amber-600 px-3 py-2 text-xs font-bold text-white z-10">
          SECTORS
        </div>

        {/* Scrolling Ticker */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center py-2 ${isPaused ? "" : "animate-marquee-sectors"}`}
            style={{
              animationDuration: `${(containerRef.current?.offsetWidth || 1000) / speed}s`,
            }}
          >
            {displayContent.map((sector, idx) => (
              <SectorItem key={idx} sector={sector} />
            ))}
          </div>
        </div>

        {/* Right corner info */}
        <div className="hidden sm:flex flex-shrink-0 items-center gap-2 px-3 py-2 text-xs text-white/70 border-l border-white/10">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>TRENDING</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-sectors {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee-sectors {
          animation: marquee-sectors linear infinite;
        }
      `}</style>
    </div>
  );
}
