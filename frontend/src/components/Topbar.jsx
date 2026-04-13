import React from "react";

const PAGE_TITLES = {
  landing: "Overview",
  form: "Evaluate Startup",
  results: "Deal Reports",
};

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 4.11l1.06-1.06M3.05 12.95l1.06-1.06" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 100 10A5.5 5.5 0 0013 9.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Topbar({ activePage, dark, onToggleDark }) {
  return (
    <div className="bg-white dark:bg-[#1a1a2e] border-b border-black/5 dark:border-white/8 h-[60px] px-8 flex items-center justify-between sticky top-0 z-10">
      <span className="font-syne font-semibold text-[15px] text-[#0a0a12] dark:text-white">
        {PAGE_TITLES[activePage]}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleDark}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#7a7a96] dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <span className="bg-navy dark:bg-[#0d0d1a] text-gold-light text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
          BETA
        </span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-navy flex items-center justify-center text-[11px] font-bold text-white font-syne">
          VN
        </div>
      </div>
    </div>
  );
}
