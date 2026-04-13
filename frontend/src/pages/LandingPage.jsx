import React from "react";

const FEATURES = [
  {
    title: "Innovation Scoring",
    desc: "Evaluates novelty, defensibility, and technology differentiation across 10 dimensions.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#c9a84c" strokeWidth="1.5">
        <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z" />
      </svg>
    ),
  },
  {
    title: "Market Intelligence",
    desc: "Assesses total addressable market, competitive dynamics, and growth trajectory.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#c9a84c" strokeWidth="1.5">
        <path d="M2 12l4-4 3 3 5-7" />
      </svg>
    ),
  },
  {
    title: "Funding Recommendations",
    desc: "Stage-specific funding advice aligned with current traction and milestones.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#c9a84c" strokeWidth="1.5">
        <circle cx="8" cy="8" r="5" />
        <path d="M8 5v3l2 2" />
      </svg>
    ),
  },
];

export default function LandingPage({ onNavigate, onLoadDemo }) {
  return (
    <div className="p-8 stagger">
      {/* Hero */}
      <div className="bg-navy rounded-2xl p-12 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[10px] tracking-[3px] uppercase text-gold font-semibold mb-4">
            AI-powered venture intelligence
          </div>
          <h1 className="font-syne font-extrabold text-[38px] text-white leading-[1.1] tracking-tight mb-4">
            Evaluate Startups
            <br />
            in <span className="text-gold-light">Seconds</span>
          </h1>
          <p className="text-[15px] text-white/50 max-w-[480px] leading-relaxed mb-8 font-light">
            Submit a startup idea and receive institutional-grade VC analysis —
            scoring, risks, funding stage recommendations, and strategic
            insights.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("form")}
              className="bg-gold hover:bg-gold-light text-navy font-syne font-bold text-[13px] tracking-wide px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-px inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" />
              </svg>
              Evaluate a Startup
            </button>
            <button
              onClick={onLoadDemo}
              className="text-white/60 hover:text-white text-[13px] px-6 py-3.5 rounded-lg border border-white/15 hover:border-white/35 transition-all duration-150"
            >
              Load Demo →
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { num: "9.2", unit: "/10", label: "Average accuracy score" },
          { num: "<30", unit: "s", label: "Evaluation time" },
          { num: "8", unit: "", label: "Investment signals analyzed" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-black/5 dark:border-white/8 p-5">
            <div className="font-syne font-bold text-[28px] text-[#0a0a12] dark:text-white mb-1">
              {s.num}
              <span className="text-[18px] text-gold font-normal">{s.unit}</span>
            </div>
            <div className="text-[12px] text-[#7a7a96] dark:text-[#8888aa]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-black/5 dark:border-white/8 p-6">
            <div className="w-9 h-9 rounded-lg bg-navy dark:bg-[#0d0d1a] flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <div className="font-syne font-semibold text-[14px] text-[#0a0a12] dark:text-white mb-2">
              {f.title}
            </div>
            <div className="text-[12px] text-[#7a7a96] dark:text-[#8888aa] leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
