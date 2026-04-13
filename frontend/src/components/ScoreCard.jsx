import React from "react";

export default function ScoreCard({ label, score }) {
  const pct = Math.round((score / 10) * 100);

  const barColor =
    score >= 7
      ? "bg-emerald-500"
      : score >= 5
      ? "bg-gold"
      : "bg-red-400";

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-black/5 dark:border-white/8 p-5 fade-in-up">
      <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] dark:text-[#8888aa] mb-2.5">
        {label}
      </div>
      <div className="font-syne font-bold text-[30px] text-[#0a0a12] dark:text-white leading-none mb-3">
        {score}
        <span className="text-[15px] text-[#7a7a96] dark:text-[#8888aa] font-light">/10</span>
      </div>
      <div className="h-1 bg-[#eeecea] dark:bg-[#262640] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full score-bar-fill ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
