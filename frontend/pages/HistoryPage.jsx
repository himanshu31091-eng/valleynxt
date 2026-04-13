import React, { useState, useEffect } from "react";
import RiskBadge from "../components/RiskBadge";

export default function HistoryPage({ onViewResult }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("valleynxt_history") || "[]");
      setHistory(saved.reverse());
    } catch {
      setHistory([]);
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Clear all evaluation history?")) {
      localStorage.removeItem("valleynxt_history");
      setHistory([]);
    }
  };

  const deleteOne = (index) => {
    try {
      const saved = JSON.parse(localStorage.getItem("valleynxt_history") || "[]");
      saved.splice(saved.length - 1 - index, 1);
      localStorage.setItem("valleynxt_history", JSON.stringify(saved));
      setHistory(saved.reverse());
    } catch {}
  };

  if (history.length === 0) {
    return (
      <div className="p-8">
        <div className="mb-7">
          <h1 className="font-syne font-bold text-[24px] text-[#0a0a12] tracking-tight mb-1.5">
            Evaluation History
          </h1>
          <p className="text-[13px] text-[#7a7a96]">All past startup evaluations</p>
        </div>
        <div className="bg-white border border-black/5 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f5f4f0] flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#7a7a96" strokeWidth="1.5">
              <path d="M4 22l6-6 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="font-syne font-semibold text-[16px] text-[#0a0a12] mb-2">
            No evaluations yet
          </div>
          <div className="text-[13px] text-[#7a7a96]">
            Your past evaluations will appear here automatically
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="font-syne font-bold text-[24px] text-[#0a0a12] tracking-tight mb-1.5">
            Evaluation History
          </h1>
          <p className="text-[13px] text-[#7a7a96]">
            {history.length} evaluation{history.length !== 1 ? "s" : ""} completed
          </p>
        </div>
        <button
          onClick={clearHistory}
          className="text-[12px] text-red-400 hover:text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:border-red-400 transition-all"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((item, index) => {
          const avg = (
            (item.data.innovation_score + item.data.market_potential + item.data.scalability) / 3
          ).toFixed(1);

          const avgNum = parseFloat(avg);
          const sentiment =
            avgNum >= 7.5
              ? { label: "Strong Buy", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
              : avgNum >= 5.5
              ? { label: "Watchlist", color: "bg-amber-50 text-amber-700 border-amber-200" }
              : { label: "Pass", color: "bg-red-50 text-red-700 border-red-200" };

          return (
            <div
              key={index}
              className="bg-white border border-black/5 rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-all duration-200 fade-in-up"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Score circle */}
                  <div className="w-14 h-14 rounded-xl bg-[#1a1a2e] flex flex-col items-center justify-center flex-shrink-0">
                    <div className="font-syne font-bold text-[18px] text-white leading-none">
                      {avg}
                    </div>
                    <div className="text-[9px] text-white/40 mt-0.5">score</div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="font-syne font-bold text-[16px] text-[#0a0a12]">
                        {item.startup}
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border font-syne ${sentiment.color}`}>
                        {sentiment.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[12px] text-[#7a7a96]">
                        Founder: {item.founder}
                      </span>
                      <span className="text-[#7a7a96]">·</span>
                      <span className="text-[11px] px-2 py-0.5 bg-[#f5f4f0] rounded-full text-[#3a3a52] font-medium">
                        {item.stage}
                      </span>
                      <span className="text-[#7a7a96]">·</span>
                      <span className="text-[12px] text-[#7a7a96]">
                        {new Date(item.timestamp).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                    {[
                      { label: "Innovation", val: item.data.innovation_score },
                      { label: "Market", val: item.data.market_potential },
                      { label: "Scale", val: item.data.scalability },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="font-syne font-bold text-[16px] text-[#0a0a12]">
                          {s.val}
                        </div>
                        <div className="text-[10px] text-[#7a7a96]">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Risk */}
                  <div className="hidden md:block flex-shrink-0">
                    <RiskBadge level={item.data.risk_level} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => onViewResult(item)}
                    className="bg-[#1a1a2e] hover:bg-[#262640] text-white font-syne font-bold text-[11px] tracking-wide px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteOne(index)}
                    className="text-[#7a7a96] hover:text-red-500 p-2 rounded-lg border border-black/8 hover:border-red-200 transition-all"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 3.5h10M5 3.5V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1M5.5 6v4M8.5 6v4M3 3.5l.7 7.5a.5.5 0 00.5.5h5.6a.5.5 0 00.5-.5L11 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
