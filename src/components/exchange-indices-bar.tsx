"use client";

import { useRef, useState } from "react";

// NGX Exchange Limited - Nigeria's Primary Stock Exchange (March 2025 Data)
const ngxIndices = [
  { symbol: "NGXASI", name: "NGX All-Share Index", price: 98575.68, change: 1.25 },
  { symbol: "NGX30", name: "NGX 30 Index", price: 4523.15, change: 0.85 },
  { symbol: "NGXBANK", name: "NGX Banking Index", price: 678.42, change: -0.32 },
  { symbol: "NGXINS", name: "NGX Insurance Index", price: 245.18, change: 0.45 },
  { symbol: "NGXCG", name: "NGX Consumer Goods", price: 892.34, change: -0.18 },
  { symbol: "NGXOIL", name: "NGX Oil & Gas", price: 567.89, change: 1.12 },
  { symbol: "NGXIND", name: "NGX Industrial", price: 345.67, change: 0.23 },
  { symbol: "PREMIUM", name: "NGX Premium Index", price: 7891.23, change: 0.67 },
];

// FMDQ Exchange - Fixed Income, Currency & Derivatives (March 2025 Data)
const fmdqIndices = [
  { symbol: "FMDQASI", name: "FMDQ All-Securities Index", price: 14250.35, change: 0.42 },
  { symbol: "FGNBOND", name: "FGN Bond Index", price: 285.64, change: -0.15 },
  { symbol: "USDNGN", name: "USD/NGN Spot", price: 1550.25, change: -0.28 },
  { symbol: "EURNGN", name: "EUR/NGN Spot", price: 1685.50, change: -0.35 },
  { symbol: "GBPNGN", name: "GBP/NGN Spot", price: 1980.75, change: -0.22 },
  { symbol: "NIBOR", name: "NIBOR 3M", price: 22.75, change: 0.50 },
];

// NASD - National Association of Securities Dealers (OTC Exchange) - March 2025 Data
const nasdIndices = [
  { symbol: "NASDASI", name: "NASD OTC Index", price: 1850.42, change: 0.95 },
  { symbol: "NASDSMB", name: "NASD SMB Index", price: 425.18, change: 1.25 },
  { symbol: "NASDUNL", name: "NASD Unlisted Securities", price: 892.35, change: -0.45 },
  { symbol: "NASDPLC", name: "NASD Plc", price: 12.85, change: 2.10 },
  { symbol: "CSCS", name: "CSCS Plc", price: 18.50, change: -1.20 },
];

// AFEX Commodities Exchange - Agricultural Commodities (March 2025 Market Prices)
const afexIndices = [
  { symbol: "AFEXASI", name: "AFEX Commodity Index", price: 1250.85, change: 2.15 },
  { symbol: "AFEXMAIZE", name: "AFEX Maize", price: 520000.0, change: 3.20, unit: "MT" },
  { symbol: "AFEXSG", name: "AFEX Sorghum", price: 475000.0, change: 2.45, unit: "MT" },
  { symbol: "AFEXSOY", name: "AFEX Soybean", price: 720000.0, change: 1.75, unit: "MT" },
  { symbol: "AFEXRICE", name: "AFEX Paddy Rice", price: 530000.0, change: -0.85, unit: "MT" },
  { symbol: "AFEXCOCOA", name: "AFEX Cocoa", price: 2850000.0, change: 5.25, unit: "MT" },
];

// Lagos Commodities & Futures Exchange (LCFE) - March 2025 Data
const lcfeIndices = [
  { symbol: "LCFEASI", name: "LCFE All-Share Index", price: 2250.65, change: 1.45 },
  { symbol: "LCFEGOLD", name: "LCFE Eko Gold", price: 140000.0, change: 0.65 },
  { symbol: "LCFECRUDE", name: "LCFE Bonny Light", price: 68500.0, change: 1.85 },
  { symbol: "LCFECOCOA", name: "LCFE Cocoa", price: 1250000.0, change: -0.35, unit: "MT" },
  { symbol: "LCFECASHEW", name: "LCFE Cashew", price: 950000.0, change: 2.25, unit: "MT" },
  { symbol: "LCFEMAIZE", name: "LCFE White Maize", price: 500000.0, change: 1.50, unit: "MT" },
  { symbol: "LCFEPALM", name: "LCFE Palm Oil", price: 2400.0, change: -0.25 },
];

interface IndexItemData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  unit?: string;
}

function IndexItem({ index }: { index: IndexItemData }) {
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

interface TickerBarProps {
  label: string;
  bgColor: string;
  labelColor: string;
  indices: IndexItemData[];
  speed?: number;
  topPosition: string;
  zIndex: number;
}

function ExchangeTickerBar({ label, bgColor, labelColor, indices, speed = 70, topPosition, zIndex }: TickerBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const displayContent = [...indices, ...indices, ...indices];

  return (
    <div className={`${bgColor} border-b border-border/50 overflow-hidden fixed left-0 right-0 ${topPosition}`} style={{ zIndex }}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${labelColor} px-3 py-1.5 text-xs font-bold text-white z-10`}>
          {label}
        </div>

        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center py-1.5 ${isPaused ? "" : "animate-marquee-multi"}`}
            style={{
              animationDuration: `${(containerRef.current?.offsetWidth || 1000) / speed}s`,
            }}
          >
            {displayContent.map((index, idx) => (
              <IndexItem key={`${label}-${idx}`} index={index} />
            ))}
          </div>
        </div>

        <div className="hidden sm:flex flex-shrink-0 items-center gap-2 px-3 py-1.5 text-xs text-white/70 border-l border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}

export default function ExchangeIndicesBar() {
  return (
    <>
      <style jsx global>{`
        @keyframes marquee-multi {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-multi {
          animation: marquee-multi linear infinite;
        }
      `}</style>

      {/* 1. Nigeria Exchange Limited (NGX) */}
      <ExchangeTickerBar
        label="NGX EXCHANGE"
        bgColor="bg-blue-900"
        labelColor="bg-blue-600"
        indices={ngxIndices}
        speed={60}
        topPosition="top-0"
        zIndex={9998}
      />

      {/* 2. FMDQ Exchange */}
      <ExchangeTickerBar
        label="FMDQ EXCHANGE"
        bgColor="bg-purple-900"
        labelColor="bg-purple-600"
        indices={fmdqIndices}
        speed={70}
        topPosition="top-[30px]"
        zIndex={9997}
      />

      {/* 3. NASD - National Association of Securities Dealers */}
      <ExchangeTickerBar
        label="NASD OTC"
        bgColor="bg-green-900"
        labelColor="bg-green-600"
        indices={nasdIndices}
        speed={65}
        topPosition="top-[60px]"
        zIndex={9996}
      />

      {/* 4. AFEX Commodities Exchange */}
      <ExchangeTickerBar
        label="AFEX COMMODITIES"
        bgColor="bg-orange-900"
        labelColor="bg-orange-600"
        indices={afexIndices}
        speed={75}
        topPosition="top-[90px]"
        zIndex={9995}
      />

      {/* 5. Lagos Commodities & Futures Exchange (LCFE) */}
      <ExchangeTickerBar
        label="LAGOS COMMODITIES"
        bgColor="bg-teal-900"
        labelColor="bg-teal-600"
        indices={lcfeIndices}
        speed={70}
        topPosition="top-[120px]"
        zIndex={9994}
      />
    </>
  );
}
