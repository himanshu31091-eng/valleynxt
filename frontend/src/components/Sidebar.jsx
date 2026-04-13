import React from "react";

const NAV_MAIN = [
  { id: "landing", label: "Overview", icon: "grid" },
  { id: "form", label: "Evaluate Startup", badge: "AI", icon: "clock" },
  { id: "results", label: "Deal Reports", icon: "chart" },
];

const NAV_RESOURCES = [
  { id: "history", label: "History", icon: "history" },
  { id: "howitworks", label: "How It Works", icon: "info" },
  { id: "demo", label: "Demo Video", icon: "video" },
];

function Icon({ type }) {
  const props = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5" };
  if (type === "grid") return <svg {...props}><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>;
  if (type === "clock") return <svg {...props}><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>;
  if (type === "chart") return <svg {...props}><path d="M2 12l4-4 3 3 5-7"/></svg>;
  if (type === "history") return <svg {...props}><circle cx="8" cy="8" r="6"/><path d="M8 5v3l-2 2" strokeLinecap="round"/></svg>;
  if (type === "info") return <svg {...props}><circle cx="8" cy="8" r="6"/><path d="M8 7v4M8 5v.5" strokeLinecap="round"/></svg>;
  if (type === "video") return <svg {...props}><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M6.5 6l4 2-4 2V6z" fill="currentColor" stroke="none"/></svg>;
  return null;
}

function NavItem({ item, active, onClick }) {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] mb-0.5 transition-all duration-150 text-left ${
        active ? "bg-[#c9a84c]/15 text-[#f0d080] font-medium" : "text-white/50 hover:bg-white/7 hover:text-white/80"
      }`}
    >
      <span className="opacity-75 flex-shrink-0"><Icon type={item.icon} /></span>
      {item.label}
      {item.badge && (
        <span className="ml-auto bg-[#c9a84c] text-[#1a1a2e] text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">
          {item.badge}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-[220px] min-w-[220px] bg-[#1a1a2e] flex flex-col">
      <div className="px-6 py-7 border-b border-white/8">
        <div className="font-syne font-extrabold text-[17px] text-white tracking-tight">ValleyNXT</div>
        <div className="text-[10px] text-white/30 tracking-[2px] uppercase mt-0.5">Deal Intelligence</div>
      </div>
      <nav className="flex-1 px-3 py-5">
        <div className="text-[9px] tracking-[2px] uppercase text-white/30 px-3 mb-2">Platform</div>
        {NAV_MAIN.map(item => <NavItem key={item.id} item={item} active={activePage === item.id} onClick={onNavigate} />)}
        <div className="text-[9px] tracking-[2px] uppercase text-white/30 px-3 mb-2 mt-5">Resources</div>
        {NAV_RESOURCES.map(item => <NavItem key={item.id} item={item} active={activePage === item.id} onClick={onNavigate} />)}
      </nav>
      <div className="px-6 py-5 border-t border-white/6">
        <p className="text-[11px] text-white/25 leading-relaxed">ValleyNXT v2.0<br />AI-powered VC intelligence<br />© 2025 ValleyNXT</p>
      </div>
    </aside>
  );
}
