import React from "react";
import ScoreCard from "../components/ScoreCard";
import InsightCard from "../components/InsightCard";
import RiskBadge from "../components/RiskBadge";

export default function ResultsPage({ result, onNewEval }) {
  if (!result) {
    return (
      <div className="p-8">
        <div className="bg-white dark:bg-[#1a1a2e] border border-black/5 dark:border-white/8 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f5f4f0] dark:bg-[#0d0d1a] flex items-center justify-center mx-auto mb-5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              stroke="#7a7a96"
              strokeWidth="1.5"
            >
              <path d="M4 22l6-6 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="font-syne font-semibold text-[16px] text-[#0a0a12] dark:text-white mb-2">
            No evaluation yet
          </div>
          <div className="text-[13px] text-[#7a7a96] dark:text-[#8888aa] mb-6">
            Submit a startup to view deal intelligence and investment insights
          </div>
          <button
            onClick={onNewEval}
            className="bg-[#1a1a2e] dark:bg-gold dark:text-navy text-white font-syne font-bold text-[13px] tracking-wide px-6 py-3 rounded-lg hover:-translate-y-px transition-all duration-200"
          >
            Evaluate a Startup
          </button>
        </div>
      </div>
    );
  }

  const { startup, founder, stage, data: d } = result;
  const avg = ((d.innovation_score + d.market_potential + d.scalability) / 3).toFixed(1);
  const avgNum = parseFloat(avg);
  const sentiment =
    avgNum >= 7.5
      ? { label: "Strong Buy", color: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800/50" }
      : avgNum >= 5.5
      ? { label: "Watchlist", color: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-800/50" }
      : { label: "Pass", color: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800/50" };

  return (
    <div className="p-8">
      {/* Back */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onNewEval}
          className="text-[#7a7a96] dark:text-[#8888aa] hover:text-[#3a3a52] dark:hover:text-white text-[12px] px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:border-[#c9a84c] transition-all inline-flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2L4 6l4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          New Evaluation
        </button>
        <span
          className={`text-[11px] font-semibold font-syne px-3 py-1 rounded-full border tracking-wide ${sentiment.color}`}
        >
          {sentiment.label}
        </span>
      </div>

      {/* Hero header */}
      <div className="bg-[#1a1a2e] rounded-2xl px-8 py-7 mb-5 flex items-center justify-between fade-in-up">
        <div>
          <div className="text-[10px] tracking-[2px] uppercase text-[#c9a84c] mb-2">
            Deal Intelligence Report
          </div>
          <div className="font-syne font-extrabold text-[24px] text-white tracking-tight leading-tight">
            {startup}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[12px] text-white/40">Founder: {founder}</span>
            <span className="text-white/20">·</span>
            <span className="inline-flex px-2.5 py-0.5 bg-white/10 rounded-full text-[11px] text-white/60 font-medium">
              {stage}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[12px] text-white/40">Evaluated just now</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-8">
          <div className="text-[10px] tracking-[2px] uppercase text-[#c9a84c] mb-1">
            Overall Score
          </div>
          <div className="font-syne font-extrabold text-[52px] text-white leading-none">
            {avg}
            <span className="text-[18px] text-white/30 font-light">/10</span>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5 stagger">
        <ScoreCard label="Innovation" score={d.innovation_score} />
        <ScoreCard label="Market Potential" score={d.market_potential} />
        <ScoreCard label="Scalability" score={d.scalability} />
      </div>

      {/* Insights 2-col grid */}
      <div className="grid grid-cols-2 gap-3 mb-5 stagger">
        {/* Risk + Stage */}
        <InsightCard label="Risk Assessment">
          <RiskBadge level={d.risk_level} />
          <div className="mt-5 pt-5 border-t border-black/5 dark:border-white/8">
            <div className="text-[11px] text-[#7a7a96] dark:text-[#8888aa] uppercase tracking-wide mb-2">
              Suggested Funding Stage
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f5f4f0] dark:bg-[#0d0d1a] rounded-full text-[12px] font-semibold text-[#1a1a2e] dark:text-white font-syne">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#c9a84c" strokeWidth="1.2" />
                <path d="M5 3v2l1.5 1.5" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" />
              </svg>
              {d.suggested_stage}
            </span>
          </div>
        </InsightCard>

        {/* Funding Recommendation */}
        <InsightCard label="Funding Recommendation">
          <p className="text-[13px] text-[#3a3a52] dark:text-[#c0c0d8] leading-[1.75]">
            {d.funding_recommendation}
          </p>
        </InsightCard>

        {/* Key Risks */}
        <InsightCard label="Key Risks">
          <ul className="flex flex-col gap-3">
            {d.key_risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] text-[#3a3a52] dark:text-[#c0c0d8] leading-snug">
                <span className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[9px] font-bold text-red-500 dark:text-red-400 font-syne">{i + 1}</span>
                </span>
                {risk}
              </li>
            ))}
          </ul>
        </InsightCard>

        {/* Growth Opportunities */}
        <InsightCard label="Growth Opportunities">
          <ul className="flex flex-col gap-3">
            {d.growth_opportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] text-[#3a3a52] dark:text-[#c0c0d8] leading-snug">
                <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4.5l2 2 3-4" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {opp}
              </li>
            ))}
          </ul>
        </InsightCard>
      </div>

      {/* VC Summary */}
      <div className="bg-[#1a1a2e] rounded-2xl px-8 py-7 fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
          <div className="text-[10px] tracking-[1.5px] uppercase text-[#c9a84c] font-semibold">
            VC Investment Thesis
          </div>
        </div>
        <p className="text-[15px] text-white/65 leading-[1.85] font-light italic">
          "{d.final_summary}"
        </p>
      </div>
    </div>
  );
}
