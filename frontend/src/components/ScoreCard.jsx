import React, { useState } from "react";

const SCORE_INFO = {
  Innovation: {
    icon: "⚡",
    description: "Measures how novel, defensible, and technologically differentiated the startup is.",
    factors: [
      { label: "Novelty", desc: "How unique is the product concept compared to existing solutions?" },
      { label: "Defensibility", desc: "Does the startup have IP, data moats, or network effects that protect it?" },
      { label: "Tech Differentiation", desc: "Is the technology meaningfully better or different from competitors?" },
      { label: "Founder Edge", desc: "Does the team have unique insight or expertise in this domain?" },
    ],
    low: "The idea lacks clear differentiation or can be easily replicated by competitors.",
    medium: "Some unique elements exist but defensibility or novelty needs strengthening.",
    high: "Strong novel approach with clear defensible advantages over existing solutions.",
  },
  "Market Potential": {
    icon: "📈",
    description: "Evaluates the size, timing, and attractiveness of the target market opportunity.",
    factors: [
      { label: "TAM Size", desc: "How large is the total addressable market in dollar terms?" },
      { label: "Market Timing", desc: "Is now the right time for this solution? Is the market ready?" },
      { label: "Growth Rate", desc: "Is the market growing fast enough to support a venture-scale outcome?" },
      { label: "Competitive Landscape", desc: "How crowded is the space and what is the competitive intensity?" },
    ],
    low: "Market is too small, saturated, or poorly timed for venture-scale returns.",
    medium: "Decent market opportunity but size or timing concerns exist.",
    high: "Large, growing market with strong tailwinds and favorable competitive dynamics.",
  },
  Scalability: {
    icon: "🚀",
    description: "Assesses how efficiently the business can grow revenue without proportional cost increases.",
    factors: [
      { label: "Unit Economics", desc: "Are the LTV/CAC ratios healthy and improving with scale?" },
      { label: "Growth Mechanics", desc: "Does the business have viral, network, or compounding growth loops?" },
      { label: "Margin Profile", desc: "Are gross margins high enough to support a scalable business?" },
      { label: "Expansion Potential", desc: "Can the product expand into adjacent markets or geographies easily?" },
    ],
    low: "Business model has structural limitations that make scaling expensive or slow.",
    medium: "Scalable in some dimensions but key bottlenecks or margin issues exist.",
    high: "Highly scalable model with strong unit economics and compounding growth potential.",
  },
};

function ScoreModal({ label, score, onClose }) {
  const info = SCORE_INFO[label];
  if (!info) return null;

  const pct = Math.round((score / 10) * 100);
  const level = score >= 7 ? "high" : score >= 5 ? "medium" : "low";
  const levelColor = score >= 7 ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : score >= 5 ? "text-amber-700 bg-amber-50 border-amber-200"
    : "text-red-700 bg-red-50 border-red-200";
  const levelLabel = score >= 7 ? "Strong" : score >= 5 ? "Moderate" : "Weak";
  const barColor = score >= 7 ? "bg-emerald-500" : score >= 5 ? "bg-[#c9a84c]" : "bg-red-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,18,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1a2e] rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{info.icon}</span>
            <div>
              <div className="text-[10px] tracking-[2px] uppercase text-[#c9a84c] mb-0.5">Score Breakdown</div>
              <div className="font-syne font-bold text-[18px] text-white">{label}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-syne font-extrabold text-[36px] text-white leading-none">
                {score}<span className="text-[14px] text-white/30 font-light">/10</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all ml-2"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Score bar */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#7a7a96] uppercase tracking-wide">Score Level</span>
              <span className={`text-[11px] font-semibold font-syne px-2.5 py-0.5 rounded-full border ${levelColor}`}>
                {levelLabel}
              </span>
            </div>
            <div className="h-2 bg-[#eeecea] rounded-full overflow-hidden">
              <div className={`h-full rounded-full score-bar-fill ${barColor}`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[#3a3a52] leading-relaxed mb-5 pb-5 border-b border-black/5">
            {info.description}
          </p>

          {/* Factors */}
          <div className="mb-5">
            <div className="text-[11px] tracking-[1.5px] uppercase text-[#7a7a96] mb-3">
              What Was Evaluated
            </div>
            <div className="flex flex-col gap-2">
              {info.factors.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#f5f4f0] rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-[#c9a84c] font-syne">{i + 1}</span>
                  </div>
                  <div>
                    <div className="font-syne font-semibold text-[12px] text-[#0a0a12] mb-0.5">{f.label}</div>
                    <div className="text-[11px] text-[#7a7a96] leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What this score means */}
          <div className={`p-4 rounded-xl border ${levelColor}`}>
            <div className="text-[10px] tracking-[1.5px] uppercase font-semibold mb-1.5">
              What This Score Means
            </div>
            <p className="text-[12px] leading-relaxed">{info[level]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScoreCard({ label, score }) {
  const [showModal, setShowModal] = useState(false);
  const pct = Math.round((score / 10) * 100);
  const barColor = score >= 7 ? "bg-emerald-500" : score >= 5 ? "bg-[#c9a84c]" : "bg-red-400";

  return (
    <>
      <div
        className="bg-white rounded-xl border border-black/5 p-5 fade-in-up cursor-pointer hover:border-[#c9a84c]/50 hover:shadow-sm transition-all duration-200 group"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96]">{label}</div>
          <div className="flex items-center gap-1 text-[10px] text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="5" cy="5" r="4"/><path d="M5 3v2.5M5 7v.5" strokeLinecap="round"/>
            </svg>
            <span className="font-syne font-semibold">Why?</span>
          </div>
        </div>
        <div className="font-syne font-bold text-[30px] text-[#0a0a12] leading-none mb-3">
          {score}
          <span className="text-[15px] text-[#7a7a96] font-light">/10</span>
        </div>
        <div className="h-1 bg-[#eeecea] rounded-full overflow-hidden">
          <div className={`h-full rounded-full score-bar-fill ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-[10px] text-[#c9a84c] font-syne font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Click to see breakdown →
        </div>
      </div>

      {showModal && (
        <ScoreModal
          label={label}
          score={score}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
