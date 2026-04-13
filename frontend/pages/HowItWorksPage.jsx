import React, { useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Submit Startup Details",
    desc: "Fill in your startup's core information — problem, solution, target market, business model, and current stage. The more detail you provide, the more accurate the evaluation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Processes Your Data",
    desc: "Our AI, powered by Claude, acts as a senior VC partner at a top-tier global fund. It analyzes your startup across 8 dimensions using institutional-grade evaluation frameworks.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scores Are Generated",
    desc: "The AI scores your startup on Innovation (novelty & defensibility), Market Potential (TAM & timing), and Scalability (growth mechanics). Each score is rated 0–10.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 17l4-4 4 4 4-5 4 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 3v18h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Risk & Stage Assessment",
    desc: "The AI evaluates your risk profile (Low / Medium / High) and recommends the appropriate funding stage — Pre-seed, Seed, Series A, or Series B — based on your traction.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Strategic Insights Delivered",
    desc: "You receive a full deal intelligence report — funding recommendation, key risks, growth opportunities, and a VC-style investment thesis — all in under 30 seconds.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Export & Share",
    desc: "Download your evaluation as a professional PDF report to share with co-founders, investors, or mentors. All past evaluations are saved in your history for easy reference.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const METRICS = [
  { label: "Innovation Score", desc: "Evaluates novelty, IP defensibility, and technology differentiation" },
  { label: "Market Potential", desc: "Assesses TAM, market timing, and competitive landscape" },
  { label: "Scalability", desc: "Measures unit economics, growth mechanics, and expansion potential" },
  { label: "Risk Level", desc: "Identifies execution, market, and regulatory risk factors" },
  { label: "Funding Stage", desc: "Recommends optimal stage based on traction and milestones" },
  { label: "Key Risks", desc: "Top 3 risks that could impede growth or investment" },
  { label: "Growth Opportunities", desc: "Strategic expansion paths and untapped market segments" },
  { label: "Investment Thesis", desc: "VC-style 2-3 sentence buy / pass rationale" },
];

const FAQS = [
  {
    q: "How accurate is the AI evaluation?",
    a: "Our AI is powered by Claude, trained on vast amounts of VC data, startup case studies, and investment frameworks. It achieves ~9.2/10 accuracy in alignment with human VC assessments in internal testing. It is best used as a first-pass filter and strategic tool, not a replacement for human due diligence.",
  },
  {
    q: "How long does an evaluation take?",
    a: "Typically 5–15 seconds depending on the complexity of the submission and server load. The AI processes all 8 dimensions simultaneously and returns a structured JSON report.",
  },
  {
    q: "Is my startup data private?",
    a: "Your data is sent securely to the AI for processing and is not stored on our servers. Evaluations are saved locally in your browser only.",
  },
  {
    q: "What stage of startup is this best for?",
    a: "ValleyNXT works best for Idea, MVP, and Early Revenue stage startups. It can also be used for Scale-stage companies seeking a quick strategic health check.",
  },
  {
    q: "Can I evaluate the same startup multiple times?",
    a: "Yes. Each evaluation is saved in your history. You can refine your submission and compare results across different versions of your pitch.",
  },
];

export default function HowItWorksPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="font-syne font-bold text-[24px] text-[#0a0a12] tracking-tight mb-1.5">
          How It Works
        </h1>
        <p className="text-[13px] text-[#7a7a96]">
          Understanding the AI-powered evaluation process
        </p>
      </div>

      {/* Hero Banner */}
      <div className="bg-[#1a1a2e] rounded-2xl p-10 mb-8 fade-in-up">
        <div className="text-[10px] tracking-[3px] uppercase text-[#c9a84c] font-semibold mb-3">
          The Process
        </div>
        <h2 className="font-syne font-extrabold text-[28px] text-white leading-tight mb-4 tracking-tight">
          Institutional VC Analysis<br />in Under 30 Seconds
        </h2>
        <p className="text-[14px] text-white/50 max-w-lg leading-relaxed font-light">
          ValleyNXT uses Claude AI — the same technology trusted by enterprises worldwide — to deliver structured, data-driven startup evaluations that mirror how top-tier VC partners think.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-10">
        <div className="text-[11px] tracking-[2px] uppercase text-[#7a7a96] font-semibold mb-5">
          Step by Step
        </div>
        <div className="grid grid-cols-1 gap-3 stagger">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-black/5 rounded-xl p-6 flex items-start gap-5 hover:border-[#c9a84c]/30 transition-all duration-200"
            >
              <div className="flex-shrink-0 flex items-center gap-4">
                <div className="font-syne font-extrabold text-[28px] text-[#eeecea] leading-none w-10">
                  {step.number}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#1a1a2e] flex items-center justify-center text-[#c9a84c]">
                  {step.icon}
                </div>
              </div>
              <div>
                <div className="font-syne font-semibold text-[15px] text-[#0a0a12] mb-1.5">
                  {step.title}
                </div>
                <div className="text-[13px] text-[#7a7a96] leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8 Metrics */}
      <div className="mb-10">
        <div className="text-[11px] tracking-[2px] uppercase text-[#7a7a96] font-semibold mb-5">
          8 Evaluation Dimensions
        </div>
        <div className="grid grid-cols-2 gap-3">
          {METRICS.map((m, i) => (
            <div key={m.label} className="bg-white border border-black/5 rounded-xl p-5 fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-[#c9a84c] font-syne">{i + 1}</span>
                </div>
                <div className="font-syne font-semibold text-[13px] text-[#0a0a12]">{m.label}</div>
              </div>
              <div className="text-[12px] text-[#7a7a96] leading-relaxed pl-7">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <div className="text-[11px] tracking-[2px] uppercase text-[#7a7a96] font-semibold mb-5">
          Frequently Asked Questions
        </div>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#f5f4f0] transition-all"
              >
                <span className="font-syne font-semibold text-[13px] text-[#0a0a12]">{faq.q}</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#7a7a96" strokeWidth="1.5"
                  className={`flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                >
                  <path d="M2 4.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-[13px] text-[#7a7a96] leading-relaxed border-t border-black/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1a1a2e] rounded-2xl p-8 text-center">
        <div className="font-syne font-bold text-[20px] text-white mb-2">
          Ready to evaluate your startup?
        </div>
        <div className="text-[13px] text-white/50 mb-6">
          Get your AI-powered deal intelligence report in under 30 seconds
        </div>
        <button
          onClick={() => onNavigate("form")}
          className="bg-[#c9a84c] hover:bg-[#f0d080] text-[#1a1a2e] font-syne font-bold text-[13px] tracking-wide px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-px"
        >
          Evaluate a Startup →
        </button>
      </div>
    </div>
  );
}
