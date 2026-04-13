import React, { useState } from "react";

const THRESHOLDS = {
  innovation: 6,
  market_potential: 6,
  scalability: 6,
};

const IMPROVEMENT_PROMPTS = {
  innovation: {
    title: "How to Improve Innovation Score",
    icon: "⚡",
    color: "border-purple-200 bg-purple-50",
    titleColor: "text-purple-800",
    suggestions: [
      { issue: "Lack of defensibility", fix: "File patents, build proprietary datasets, or create network effects that make it hard for competitors to copy your solution." },
      { issue: "Not differentiated enough", fix: "Identify your 'secret sauce' — what can you do that no one else can? Double down on that unique capability." },
      { issue: "Technology not unique", fix: "Invest in R&D or partner with research institutions to develop proprietary technology that competitors cannot easily replicate." },
      { issue: "No founder edge", fix: "Highlight domain expertise, unique relationships, or insider knowledge that gives your team an unfair advantage in this market." },
    ],
  },
  market_potential: {
    title: "How to Improve Market Potential Score",
    icon: "📈",
    color: "border-blue-200 bg-blue-50",
    titleColor: "text-blue-800",
    suggestions: [
      { issue: "Market too small", fix: "Expand your TAM by identifying adjacent markets or broader use cases. Show how your solution can serve multiple verticals." },
      { issue: "Poor market timing", fix: "Identify specific trends, regulations, or technology shifts that make NOW the right time. Reference recent market catalysts." },
      { issue: "Too much competition", fix: "Niche down to an underserved segment where you can dominate before expanding. Avoid competing head-on with well-funded incumbents." },
      { issue: "Slow growth market", fix: "Pivot to a faster-growing adjacent market or show how your solution creates a new market category rather than competing in an existing one." },
    ],
  },
  scalability: {
    title: "How to Improve Scalability Score",
    icon: "🚀",
    color: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-800",
    suggestions: [
      { issue: "Poor unit economics", fix: "Reduce CAC through product-led growth, referrals, or content marketing. Increase LTV by adding premium features or expanding usage." },
      { issue: "No growth loops", fix: "Build virality into the product — referral programs, shareable outputs, or network effects where each new user makes the product better." },
      { issue: "Low gross margins", fix: "Move up the value chain, reduce COGS through automation, or shift from services to software to improve margin profile." },
      { issue: "Hard to expand geographically", fix: "Design the product to be language-agnostic and culturally neutral. Start with English-first markets before localizing." },
    ],
  },
  risk: {
    title: "How to Reduce Risk Level",
    icon: "🛡️",
    color: "border-red-200 bg-red-50",
    titleColor: "text-red-800",
    suggestions: [
      { issue: "Regulatory risk", fix: "Engage a regulatory consultant early. Build relationships with regulators and design compliance into your product from day one." },
      { issue: "Market adoption risk", fix: "Get 10 paying customers before raising. Nothing de-risks a startup more than proof that real people pay real money for your solution." },
      { issue: "Team execution risk", fix: "Identify skill gaps on your founding team and fill them with advisors, early hires, or co-founders with complementary expertise." },
      { issue: "Technology risk", fix: "Build a working prototype or MVP that proves your core technical assumption before scaling. De-risk the hardest technical challenge first." },
      { issue: "Competition risk", fix: "Create a competitive moat through speed of execution, exclusive partnerships, proprietary data, or deep customer relationships." },
    ],
  },
};

function SuggestionSection({ type, data }) {
  const [open, setOpen] = useState(false);
  const info = IMPROVEMENT_PROMPTS[type];
  if (!info) return null;

  return (
    <div className={`border rounded-xl overflow-hidden mb-3 ${info.color}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:opacity-90 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{info.icon}</span>
          <div>
            <div className={`font-syne font-bold text-[13px] ${info.titleColor}`}>
              {info.title}
            </div>
            <div className={`text-[11px] mt-0.5 ${info.titleColor} opacity-70`}>
              {info.suggestions.length} specific improvements identified
            </div>
          </div>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          className={`flex-shrink-0 transition-transform duration-200 ${info.titleColor} ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-black/8">
          <div className="flex flex-col gap-3 mt-4">
            {info.suggestions.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-[#c9a84c] font-syne">{i + 1}</span>
                  </div>
                  <div>
                    <div className="font-syne font-semibold text-[12px] text-[#0a0a12] mb-1">
                      ⚠️ Issue: {s.issue}
                    </div>
                    <div className="text-[12px] text-[#3a3a52] leading-relaxed">
                      <span className="font-semibold text-emerald-700">✅ Fix: </span>
                      {s.fix}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImprovementSuggestions({ data }) {
  const issues = [];

  if (data.innovation_score < THRESHOLDS.innovation) issues.push("innovation");
  if (data.market_potential < THRESHOLDS.market_potential) issues.push("market_potential");
  if (data.scalability < THRESHOLDS.scalability) issues.push("scalability");
  if (data.risk_level === "High") issues.push("risk");

  if (issues.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#059669" strokeWidth="1.5">
              <path d="M3 9l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-syne font-bold text-[14px] text-emerald-800 mb-0.5">
              Strong Startup Profile
            </div>
            <div className="text-[12px] text-emerald-700">
              All scores are above threshold and risk is manageable. Focus on execution and traction.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 fade-in-up">
      {/* Header */}
      <div className="bg-[#1a1a2e] rounded-2xl px-6 py-5 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ff6b6b" strokeWidth="1.5">
              <path d="M8 2l6 11H2L8 2z" strokeLinejoin="round" />
              <path d="M8 6v3M8 11v.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] tracking-[2px] uppercase text-[#c9a84c] font-semibold">
              AI Improvement Coach
            </div>
            <div className="font-syne font-bold text-[16px] text-white">
              {issues.length} Area{issues.length > 1 ? "s" : ""} Need Attention
            </div>
          </div>
        </div>
        <p className="text-[12px] text-white/50 leading-relaxed">
          Based on the evaluation, we identified specific weaknesses in your startup. 
          Click each section below to see the exact issues and how to fix them.
        </p>
      </div>

      {/* Suggestion sections */}
      {issues.includes("innovation") && (
        <SuggestionSection type="innovation" data={data} />
      )}
      {issues.includes("market_potential") && (
        <SuggestionSection type="market_potential" data={data} />
      )}
      {issues.includes("scalability") && (
        <SuggestionSection type="scalability" data={data} />
      )}
      {issues.includes("risk") && (
        <SuggestionSection type="risk" data={data} />
      )}
    </div>
  );
}
