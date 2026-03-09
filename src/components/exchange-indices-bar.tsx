"use client";

import { useRef, useState } from "react";

// NGX Exchange Indices from ngxgroup.com
const exchangeIndices = [
  { symbol: "NGXASI", name: "NGX All-Share Index", price: 98575.68, change: 1.25 },
  { symbol: "NGX30", name: "NGX 30 Index", price: 4523.15, change: 0.85 },
  { symbol: "NGXBANK", name: "NGX Banking Index", price: 678.42, change: -0.32 },
  { symbol: "NGXINS", name: "NGX Insurance Index", price: 245.18, change: 0.45 },
  { symbol: "NGXCG", name: "NGX Consumer Goods", price: 892.34, change: -0.18 },
  { symbol: "NGXOIL", name: "NGX Oil & Gas", price: 567.89, change: 1.12 },
  { symbol: "NGXIND", name: "NGX Industrial", price: 345.67, change: 0.23 },
  { symbol: "PREMIUM", name: "NGX Premium Index", price: 7891.23, change: 0.67 },
];

function IndexItem({ index }: { index: typeof exchangeIndices[0] }) {
  const isPositive = index.change >= 0;
  const changeColor = isPositive ? "text-green-400" : "text-red-400";
  const arrow = isPositive ? "▲" : "▼";

  return (
    <div className="flex items-center gap-2 px-4 whitespace-nowrap border-l border-white/10 first:border-l-0">
      <span className="text-xs font-bold text-white">{index.symbol}</span>
      <span className="text-xs text-white/60">{index.price.toLocaleString()}</span>
      <span className={`text-xs font-medium ${changeColor}`}>
        {arrow} {Math.abs(index.change).toFixed(2)}%
      </span>
    </div>
  );
}

interface ExchangeIndicesBarProps {
  speed?: number;
}

export default function ExchangeIndicesBar({ speed = 70 }: ExchangeIndicesBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless scrolling
  const displayContent = [...exchangeIndices, ...exchangeIndices, ...exchangeIndices];

  return (
    <div className="bg-blue-900 border-b border-border/50 overflow-hidden fixed top-[36px] left-0 right-0 z-[9998]">
      <div className="flex items-center">
        {/* Exchange Label */}
        <div className="flex-shrink-0 bg-blue-600 px-3 py-2 text-xs font-bold text-white z-10">
          NGX INDICES
        </div>

        {/* Scrolling Ticker */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center py-2 ${isPaused ? "" : "animate-marquee-ngx"}`}
            style={{
              animationDuration: `${(containerRef.current?.offsetWidth || 1000) / speed}s`,
            }}
          >
            {displayContent.map((index, idx) => (
              <IndexItem key={idx} index={index} />
            ))}
          </div>
        </div>

        {/* Right corner info */}
        <div className="hidden sm:flex flex-shrink-0 items-center gap-2 px-3 py-2 text-xs text-white/70 border-l border-white/10">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>LIVE</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-ngx {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee-ngx {
          animation: marquee-ngx linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee-ngx {
            animation-duration: 10s !important;
          }
        }
      `}</style>
    </div>
  );
}
