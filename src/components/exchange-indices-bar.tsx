"use client";

// Nigerian Exchange Indices Bar - Shows major NGX indices below the main ticker
const exchangeIndices = [
  {
    name: "NGX All-Share Index",
    symbol: "NGXASI",
    price: 98575.68,
    change: 1.25,
    market: "NGX",
    description: "Main equities market",
  },
  {
    name: "NGX 30 Index",
    symbol: "NGX30",
    price: 4523.15,
    change: 0.85,
    market: "NGX",
    description: "Top 30 companies",
  },
  {
    name: "NGX Banking Index",
    symbol: "NGXBANK",
    price: 678.42,
    change: -0.32,
    market: "NGX",
    description: "Banking sector",
  },
];

interface ExchangeBarProps {
  indices?: typeof exchangeIndices;
}

function IndexItem({ index }: { index: typeof exchangeIndices[0] }) {
  const isPositive = index.change >= 0;
  const changeColor = isPositive ? "text-green-400" : "text-red-400";
  const arrow = isPositive ? "▲" : "▼";

  return (
    <div className="flex items-center gap-3 px-6 py-2 border-r border-white/10 last:border-r-0">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-white">{index.name}</span>
        <span className="text-[10px] text-white/50">{index.market} • {index.description}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">{index.price.toLocaleString()}</span>
        <span className={`text-xs font-medium ${changeColor}`}>
          {arrow} {Math.abs(index.change).toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

export default function ExchangeIndicesBar({ indices = exchangeIndices }: ExchangeBarProps) {
  return (
    <div className="bg-slate-800 border-b border-border/50">
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        {/* Exchange Label */}
        <div className="flex-shrink-0 bg-blue-600 px-3 py-2 text-xs font-bold text-white">
          NGX INDICES
        </div>

        {/* Index Items */}
        <div className="flex items-center">
          {indices.map((index) => (
            <IndexItem key={index.symbol} index={index} />
          ))}
        </div>

        {/* More Info Link */}
        <div className="flex-shrink-0 ml-auto px-3 py-2 border-l border-white/10">
          <a
            href="https://ngxgroup.com/exchange/data/indices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/60 hover:text-accent transition-colors"
          >
            View all indices →
          </a>
        </div>
      </div>
    </div>
  );
}
