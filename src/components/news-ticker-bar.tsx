"use client";

import { useRef, useState } from "react";

// Market news headlines - no external links
const marketNews = [
  "NGX All-Share Index hits new 2024 high as banking stocks surge",
  "Naira stabilizes at N1,550/$1 in official market",
  "Oil prices rally on OPEC+ production cuts extension",
  "Nigeria's inflation rate drops to 24.48% in January",
  "CBN raises interest rate by 400 basis points to 22.75%",
  "Foreign reserves hit $34.2 billion, highest in 2 years",
  "Dangote Refinery begins petrol production",
  "Brent crude approaches $75 amid Middle East tensions",
  "Nigerian banking sector assets grow by 45% year-on-year",
  "Stock market capitalization crosses N55 trillion mark",
  "Gold hits record high as investors seek safe haven",
  "Bitcoin surges past $87,000 on ETF inflows",
  "Nigeria exits technical recession with 3.46% GDP growth",
  "FAAC disburses N1.1 trillion to federal, states, LGs",
];

function NewsItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-6 whitespace-nowrap border-l border-white/10">
      <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">News</span>
      <span className="text-xs text-white/80">{text}</span>
    </div>
  );
}

interface NewsTickerBarProps {
  speed?: number;
}

export default function NewsTickerBar({ speed = 30 }: NewsTickerBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless scrolling
  const displayContent = [...marketNews, ...marketNews, ...marketNews];

  return (
    <div className="bg-slate-800 border-b border-border/50 overflow-hidden">
      <div className="flex items-center">
        {/* News Label */}
        <div className="flex-shrink-0 bg-green-600 px-3 py-2 text-xs font-bold text-white z-10">
          MARKET NEWS
        </div>

        {/* Scrolling Ticker */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center py-2 ${isPaused ? "" : "animate-marquee-news"}`}
            style={{
              animationDuration: `${(containerRef.current?.offsetWidth || 1000) / speed}s`,
            }}
          >
            {displayContent.map((news, idx) => (
              <NewsItem key={idx} text={news} />
            ))}
          </div>
        </div>

        {/* Right corner info */}
        <div className="hidden sm:flex flex-shrink-0 items-center gap-2 px-3 py-2 text-xs text-white/70 border-l border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>UPDATES</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-news {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee-news {
          animation: marquee-news linear infinite;
        }
      `}</style>
    </div>
  );
}
