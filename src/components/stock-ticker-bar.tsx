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

// Market news headlines
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
  "Euro depreciates against dollar ahead of ECB meeting",
  "Gold hits record high as investors seek safe haven",
  "Bitcoin surges past $87,000 on ETF inflows",
  "Nigeria exits technical recession with 3.46% GDP growth",
  "FAAC disburses N1.1 trillion to federal, states, LGs",
];

// Market alerts and updates
const marketAlerts = [
  { type: "BREAKING", text: "SEC announces new rules for digital assets" },
  { type: "UPDATE", text: "NDDC launches ₦2.5bn infrastructure bond" },
  { type: "ALERT", text: "Aviation fuel prices drop by 8%" },
  { type: "NEWS", text: "NNPC reports 47% profit increase" },
  { type: "UPDATE", text: "Tinubu approves ₦3 trillion for power sector" },
  { type: "BREAKING", text: "Nigeria secures $2.25 billion World Bank loan" },
];

interface StockTickerProps {
  stocks?: typeof defaultStocks;
  speed?: number; // pixels per second
}

function NewsItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-6 whitespace-nowrap border-l border-white/10">
      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">News</span>
      <span className="text-xs text-white/80">{text}</span>
    </div>
  );
}

function AlertItem({ alert }: { alert: typeof marketAlerts[0] }) {
  const typeColors: Record<string, string> = {
    BREAKING: "bg-red-500",
    UPDATE: "bg-blue-500",
    ALERT: "bg-yellow-500",
    NEWS: "bg-accent",
  };

  return (
    <div className="flex items-center gap-2 px-6 whitespace-nowrap border-l border-white/10">
      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${typeColors[alert.type] || "bg-accent"}`}>
        {alert.type}
      </span>
      <span className="text-xs text-white/80">{alert.text}</span>
    </div>
  );
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
    <div className="flex items-center gap-2 px-4 whitespace-nowrap border-l border-white/10 first:border-l-0">
      <span className="text-xs font-bold text-white">{stock.symbol}</span>
      <span className="text-xs text-white/60">{formatPrice(stock.price, stock.currency)}</span>
      <span className={`text-xs font-medium ${changeColor}`}>
        {arrow} {Math.abs(stock.change).toFixed(2)}%
      </span>
    </div>
  );
}

export default function StockTickerBar({ stocks = defaultStocks, speed = 160 }: StockTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Combine all content for the ticker
  const allContent = [
    ...stocks.map(stock => ({ type: "stock" as const, data: stock })),
    ...marketNews.map(news => ({ type: "news" as const, data: news })),
    ...marketAlerts.map(alert => ({ type: "alert" as const, data: alert })),
  ];

  // Shuffle and duplicate for variety
  const shuffled = [...allContent].sort(() => Math.random() - 0.5);
  const displayContent = [...shuffled, ...shuffled, ...shuffled];

  return (
    <div className="bg-slate-900 border-b border-border overflow-hidden fixed top-0 left-0 right-0 z-[9999]">
      <div className="flex items-center">
        {/* Market Status Label */}
        <div className="flex-shrink-0 bg-accent px-3 py-2 text-xs font-bold text-white z-10">
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
            className={`flex items-center py-2 ${isPaused ? "" : "animate-marquee"}`}
            style={{
              animationDuration: `${(containerRef.current?.offsetWidth || 1000) / speed}s`,
            }}
          >
            {displayContent.map((item, index) => (
              <div key={index}>
                {item.type === "stock" && <StockItem stock={item.data} />}
                {item.type === "news" && <NewsItem text={item.data} />}
                {item.type === "alert" && <AlertItem alert={item.data} />}
              </div>
            ))}
          </div>
        </div>

        {/* Right corner info */}
        <div className="hidden sm:flex flex-shrink-0 items-center gap-3 px-3 py-2 text-xs text-white/70 border-l border-white/10">
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
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 15s !important;
          }
        }
      `}</style>
    </div>
  );
}
