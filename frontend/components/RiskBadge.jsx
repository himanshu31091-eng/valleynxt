import React from "react";

const RISK_STYLES = {
  Low: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Medium: "bg-amber-50 text-amber-800 border-amber-200",
  High: "bg-red-50 text-red-800 border-red-200",
};

const RISK_DOT = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-red-500",
};

export default function RiskBadge({ level }) {
  const style = RISK_STYLES[level] || RISK_STYLES.Medium;
  const dot = RISK_DOT[level] || RISK_DOT.Medium;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border font-syne tracking-wide ${style}`}
    >
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      {level} Risk
    </span>
  );
}
