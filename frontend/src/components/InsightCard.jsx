import React from "react";

export default function InsightCard({ label, children, full = false }) {
  return (
    <div
      className={`bg-white dark:bg-[#1a1a2e] rounded-xl border border-black/5 dark:border-white/8 p-6 fade-in-up ${
        full ? "col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] dark:text-[#8888aa] mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />
        {label}
      </div>
      {children}
    </div>
  );
}
