"use client";

import { useEffect, useRef, useState } from "react";

// Sample stock market data - in production this would come from an API
const defaultStocks = [
  { symbol: "NGXASI", name: "NGX All-Share Index", price: 98575.68, change: 1.25, currency: "PTS" },
  { symbol: "USD/NGN", name: "USD/Naira", price: 1550.0, change: -0.45, currency: "₦" },
  { symbol: "BRENT", name: "Brent Crude", price: 72.45, change: 2.1, currency: "$" },
  { symbol: "GOLD", name: "Gold", price: 2890.5, change: 0.85, currency: "$" },
  { symbol: "BTC", name: "Bitcoin", price: 87250.0, change: 3.2, currency: "$" },
  { symbol: "DOW", name: "Dow Jones", price: 42850.22, change: -0.32, currency: "PTS" },
  { symbol: "S&P", name: "S&P 500", price: 5776.65, change: 0.15, currency: "PTS" },
  { symbol: "NAS", name: "NASDAQ", price: 18290.25, change: 1.05, currency: "PTS" },
  { symbol: "WTI", name: "WTI Crude", price: 68.92, change: 1.8, currency: "$" },
  { symbol: "EUR/USD", name: "EUR/USD", price: 1.0845, change: -0.12, currency: "" },
];

interface StockTickerProps {
  stocks?: typeof defaultStocks;
  speed?: number; // pixels per second
}

function StockItem({ stock }: { stock: typeof defaultStocks[0] }) {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? "text-green-400" : "text-red-400";
  const arrow = isPositive ? "▲" : "▼";

  const formatPrice = (price: number, currency: string) => {
    if (currency === "PTS") return price.toLocaleString();
    if (currency === "" && price < 10) return price.toFixed(4);
    if (currency === "₦") return `₦${price.toLocaleString()}`;
    return `${currency}${price.toLocaleString()}`;
  };

  return (
    <div className="flex items-center gap-2 px-4 whitespace-nowrap">
      <span className="text-xs font-bold text-white">{stock.symbol}</span>
      <span className="text-xs text-white/60">{formatPrice(stock.price, stock.currency)}</span>
      <span className={`text-xs font-medium ${changeColor}`}>
        {arrow} {Math.abs(stock.change).toFixed(2)}%
      </span>
    </div>
  );
}

export default function StockTickerBar({ stocks = defaultStocks, speed = 40 }: StockTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate stocks for seamless infinite scroll
  const displayStocks = [...stocks, ...stocks, ...stocks];

  return (
    <div className="bg-slate-900 border-b border-border overflow-hidden">
      <div className="flex items-center">
        {/* Market Status Label */}
        <div className="flex-shrink-0 bg-accent px-3 py-1.5 text-xs font-bold text-white z-10">
          MARKET LIVE
        </div>

        {/* Scrolling Ticker */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center py-1.5 ${isPaused ? "" : "animate-marquee"}`}
            style={{
              animationDuration: `${(containerRef.current?.offsetWidth || 1000) / speed}s`,
            }}
          >
            {displayStocks.map((stock, index) => (
              <StockItem key={`${stock.symbol}-${index}`} stock={stock} />
            ))}
          </div>
        </div>

        {/* Right corner info */}
        <div className="hidden sm:flex flex-shrink-0 items-center gap-3 px-3 py-1.5 text-xs text-white/70 border-l border-white/10">
          <span>Lagos: {new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" })}</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
