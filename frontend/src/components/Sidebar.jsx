import React from "react";

const NAV = [
  {
    id: "landing",
    label: "Overview",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    id: "form",
    label: "Evaluate Startup",
    badge: "AI",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 5v3l2 2" />
      </svg>
    ),
  },
  {
    id: "results",
    label: "Deal Reports",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12l4-4 3 3 5-7" />
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-[220px] min-w-[220px] bg-navy dark:bg-[#0a0a14] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/8">
        <div className="font-syne font-extrabold text-[17px] text-white tracking-tight">
          ValleyNXT
        </div>
        <div className="text-[10px] text-white/30 tracking-[2px] uppercase mt-0.5">
          Deal Intelligence
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5">
        <div className="text-[9px] tracking-[2px] uppercase text-white/30 px-3 mb-2">
          Platform
        </div>
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] mb-0.5 transition-all duration-150 text-left ${
              activePage === item.id
                ? "bg-gold/15 text-gold-light font-medium"
                : "text-white/50 hover:bg-white/7 hover:text-white/80"
            }`}
          >
            <span className="opacity-75 flex-shrink-0">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className="ml-auto bg-gold text-navy text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-white/6">
        <p className="text-[11px] text-white/25 leading-relaxed">
          ValleyNXT v1.0
          <br />
          AI-powered VC intelligence
          <br />© 2025 ValleyNXT
        </p>
      </div>
    </aside>
  );
}
