import React from "react";
const PAGE_TITLES = { landing:"Overview", form:"Evaluate Startup", results:"Deal Reports", history:"Evaluation History", social:"Social Intelligence", howitworks:"How It Works", demo:"Demo Video" };
export default function Topbar({ activePage }) {
  return (
    <div className="bg-white border-b border-black/5 h-[60px] px-8 flex items-center justify-between sticky top-0 z-10">
      <span className="font-syne font-semibold text-[15px] text-[#0a0a12]">{PAGE_TITLES[activePage] || "Overview"}</span>
      <div className="flex items-center gap-3">
        <span className="bg-[#1a1a2e] text-[#f0d080] text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">v2.0</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#1a1a2e] flex items-center justify-center text-[11px] font-bold text-white font-syne">VN</div>
      </div>
    </div>
  );
}
