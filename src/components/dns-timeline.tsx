"use client";

import { useState, useEffect } from "react";

const typeColors: Record<string, string> = {
  A: "bg-emerald-500/30 text-emerald-300",
  AAAA: "bg-blue-500/30 text-blue-300",
  CNAME: "bg-violet-500/30 text-violet-300",
  MX: "bg-amber-500/30 text-amber-300",
  TXT: "bg-rose-500/30 text-rose-300",
};

type DnsRecord = {
  type: string;
  domain: string;
  value: string;
};

type YearData = {
  year: number;
  records: DnsRecord[];
  change?: string;
};

const timelineData: YearData[] = [
  {
    year: 2020,
    change: "Primary infrastructure",
    records: [
      { type: "A", domain: "apple.com", value: "17.172.224.47" },
      { type: "CNAME", domain: "www.apple.com", value: "www.apple.com.edgekey.net" },
      { type: "MX", domain: "apple.com", value: "mail-in.apple.com" },
    ],
  },
  {
    year: 2021,
    change: "IPv6 deployment",
    records: [
      { type: "A", domain: "apple.com", value: "17.172.224.47" },
      { type: "AAAA", domain: "apple.com", value: "2620:149:a44::10" },
      { type: "CNAME", domain: "www.apple.com", value: "www.apple.com.edgekey.net" },
      { type: "MX", domain: "apple.com", value: "mail-in.apple.com" },
    ],
  },
  {
    year: 2022,
    change: "CDN migration to Akamai",
    records: [
      { type: "A", domain: "apple.com", value: "17.253.144.10" },
      { type: "AAAA", domain: "apple.com", value: "2620:149:af0::10" },
      { type: "CNAME", domain: "www.apple.com", value: "www-apple-com.v.aaplimg.com" },
      { type: "MX", domain: "apple.com", value: "mail-in.apple.com" },
    ],
  },
  {
    year: 2023,
    change: "Added SPF record",
    records: [
      { type: "A", domain: "apple.com", value: "17.253.144.10" },
      { type: "AAAA", domain: "apple.com", value: "2620:149:af0::10" },
      { type: "CNAME", domain: "www.apple.com", value: "www-apple-com.v.aaplimg.com" },
      { type: "TXT", domain: "apple.com", value: "v=spf1 include:_spf.apple.com ~all" },
    ],
  },
  {
    year: 2024,
    change: "Google Workspace migration",
    records: [
      { type: "A", domain: "apple.com", value: "17.253.144.10" },
      { type: "AAAA", domain: "apple.com", value: "2620:149:af0::10" },
      { type: "MX", domain: "apple.com", value: "mx-in.g.apple.com" },
      { type: "TXT", domain: "apple.com", value: "v=spf1 include:_spf.apple.com ~all" },
    ],
  },
  {
    year: 2025,
    change: "Current configuration",
    records: [
      { type: "A", domain: "apple.com", value: "17.253.144.10" },
      { type: "CNAME", domain: "www.apple.com", value: "www-apple-com.v.aaplimg.com" },
      { type: "MX", domain: "apple.com", value: "mx-in.g.apple.com" },
      { type: "TXT", domain: "apple.com", value: "miro-verification=2494d255..." },
      { type: "AAAA", domain: "apple.com", value: "2620:149:af0::10" },
    ],
  },
];

export function DnsTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentData = timelineData[activeIndex];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Timeline Bar - TOP */}
      <div className="relative px-4 mb-4">
        {/* Background line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20 -translate-y-1/2" />
        
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-4 h-0.5 bg-[var(--accent)] -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(activeIndex / (timelineData.length - 1)) * (100 - 2)}%` }}
        />

        {/* Year markers */}
        <div className="relative flex justify-between">
          {timelineData.map((data, idx) => (
            <button
              key={data.year}
              onClick={() => setActiveIndex(idx)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  idx <= activeIndex
                    ? "bg-[var(--accent)] border-[var(--accent)] scale-100"
                    : "bg-white/10 border-white/30 group-hover:border-[var(--accent)]"
                } ${idx === activeIndex ? "scale-125 shadow-lg shadow-[var(--accent)]/30" : ""}`}
              />
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  idx === activeIndex ? "text-[var(--accent)]" : "text-white/50 group-hover:text-white/80"
                }`}
              >
                {data.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Animated content wrapper */}
      <div key={activeIndex} className="animate-fadeIn">
        {/* Change Description - MIDDLE */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm text-xs font-medium">
            <svg className="text-[var(--accent)]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {currentData.change}
          </span>
        </div>

        {/* DNS Records Display - BOTTOM */}
        <div className="flex justify-center gap-2 overflow-x-auto">
          {currentData.records.map((record, idx) => (
            <div
              key={`${currentData.year}-${record.type}-${idx}`}
              className="relative px-3 py-4 rounded-xl backdrop-blur-md bg-white/8 hover:bg-white/12 border border-white/15 shadow-md shadow-black/10 transition-colors duration-300 flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-md text-[0.65rem] font-bold tracking-wide ${typeColors[record.type] || "bg-gray-500/30 text-gray-300"}`}>
                  {record.type}
                </span>
                <span className="text-sm font-medium text-white truncate max-w-[120px]">
                  {record.domain}
                </span>
              </div>
              <div className="mt-2 text-xs text-white/60 font-mono truncate max-w-[180px]">
                {record.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
