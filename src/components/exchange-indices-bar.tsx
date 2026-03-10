"use client";

import { useRef, useState } from "react";

// NGX Exchange Limited - Nigeria's Primary Stock Exchange (2026-03-10 Auto-Updated)
const ngxIndices = [
  { symbol: "NGXASI", name: "NGX All-Share Index", price: 99087.04, change: 0.52 },
  { symbol: "NGX30", name: "NGX 30 Index", price: 4550.65, change: 0.61 },
  { symbol: "NGXBANK", name: "NGX Banking Index", price: 684.26, change: 0.86 },
  { symbol: "NGXINS", name: "NGX Insurance Index", price: 248.8, change: 1.48 },
  { symbol: "NGXCG", name: "NGX Consumer Goods", price: 892.97, change: 0.07 },
  { symbol: "NGXOIL", name: "NGX Oil & Gas", price: 571.03, change: 0.55 },
  { symbol: "NGXIND", name: "NGX Industrial", price: 347.33, change: 0.48 },
  { symbol: "PREMIUM", name: "NGX Premium Index", price: 7861.68, change: -0.37 }
];

// FMDQ Exchange - Fixed Income, Currency & Derivatives (2026-03-10 Auto-Updated)
const fmdqIndices = [
  { symbol: "FMDQASI", name: "FMDQ All-Securities Index", price: 14206.47, change: -0.31 },
  { symbol: "FGNBOND", name: "FGN Bond Index", price: 286.32, change: 0.24 },
  { symbol: "USDNGN", name: "USD/NGN Spot", price: 1541.95, change: -0.54 },
  { symbol: "EURNGN", name: "EUR/NGN Spot", price: 1693.06, change: 0.45 },
  { symbol: "GBPNGN", name: "GBP/NGN Spot", price: 1992.39, change: 0.59 },
  { symbol: "NIBOR", name: "NIBOR 3M", price: 22.73, change: -0.09 }
];

// NASD - National Association of Securities Dealers (OTC Exchange) - 2026-03-10 Auto-Updated
const nasdIndices = [
  { symbol: "NASDASI", name: "NASD OTC Index", price: 1841.61, change: -0.48 },
  { symbol: "NASDSMB", name: "NASD SMB Index", price: 428.58, change: 0.8 },
  { symbol: "NASDUNL", name: "NASD Unlisted Securities", price: 887.6, change: -0.53 },
  { symbol: "NASDPLC", name: "NASD Plc", price: 12.56, change: -2.28 },
  { symbol: "CSCS", name: "CSCS Plc", price: 18.9, change: 2.14 }
];

// AFEX Commodities Exchange - Agricultural Commodities (2026-03-10 Auto-Updated)
const afexIndices = [
  { symbol: "AFEXASI", name: "AFEX Commodity Index", price: 1235.39, change: -1.24 },
  { symbol: "AFEXMAIZE", name: "AFEX Maize", price: 508851.92, change: -2.14, unit: "MT" },
  { symbol: "AFEXSG", name: "AFEX Sorghum", price: 468876, change: -1.29, unit: "MT" },
  { symbol: "AFEXSOY", name: "AFEX Soybean", price: 737582.69, change: 2.44, unit: "MT" },
  { symbol: "AFEXRICE", name: "AFEX Paddy Rice", price: 535268.62, change: 0.99, unit: "MT" },
  { symbol: "AFEXCOCOA", name: "AFEX Cocoa", price: 2889814.1, change: 1.4, unit: "MT" }
];

// Lagos Commodities & Futures Exchange (LCFE) - 2026-03-10 Auto-Updated
const lcfeIndices = [
  { symbol: "LCFEASI", name: "LCFE All-Share Index", price: 2277.55, change: 1.2 },
  { symbol: "LCFEGOLD", name: "LCFE Eko Gold", price: 140487.12, change: 0.35 },
  { symbol: "LCFECRUDE", name: "LCFE Bonny Light", price: 70160.74, change: 2.42 },
  { symbol: "LCFECOCOA", name: "LCFE Cocoa", price: 1220379.21, change: -2.37, unit: "MT" },
  { symbol: "LCFECASHEW", name: "LCFE Cashew", price: 942557.04, change: -0.78, unit: "MT" },
  { symbol: "LCFEMAIZE", name: "LCFE White Maize", price: 498225.5, change: -0.35, unit: "MT" },
  { symbol: "LCFEPALM", name: "LCFE Palm Oil", price: 2414.74, change: 0.61 }
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
