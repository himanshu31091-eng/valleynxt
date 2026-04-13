import React, { useState, useEffect } from "react";
import { evaluateStartup } from "../services/api";

const DEMO = {
  name: "MediSync AI",
  founder: "Arjun Mehta",
  problem:
    "Rural healthcare in India is fragmented — patients wait weeks for specialist diagnoses due to shortage of doctors in tier-2 and tier-3 cities. Misdiagnoses cost the system $3B annually.",
  solution:
    "MediSync AI provides an AI diagnostic assistant giving rural clinics specialist-level support via WhatsApp and a lightweight web app. Our LLM trained on 50M+ Indian patient records achieves 91% diagnostic accuracy.",
  market:
    "620M underserved patients across rural India and Southeast Asia; $18B digital health TAM",
  model:
    "B2B SaaS — ₹2,500/month per clinic + ₹15 per AI diagnostic query. Government partnership pipeline for AYUSHMAN BHARAT integration.",
  stage: "Early Revenue",
};

const EMPTY = {
  name: "",
  founder: "",
  problem: "",
  solution: "",
  market: "",
  model: "",
  stage: "",
};

const INPUT_CLS =
  "bg-[#f5f4f0] dark:bg-[#0d0d1a] border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-[13px] text-[#0a0a12] dark:text-white placeholder-[#7a7a96] dark:placeholder-[#5a5a7a] outline-none focus:border-[#c9a84c] focus:bg-white dark:focus:bg-[#1e1e32] focus:ring-2 focus:ring-[#c9a84c]/10 transition-all duration-150 w-full";

const LOADING_STEPS = [
  "Parsing startup fundamentals...",
  "Evaluating market opportunity...",
  "Scoring innovation & scalability...",
  "Assessing risk factors...",
  "Generating investment thesis...",
];

export default function EvaluatePage({ onResult, initialDemo }) {
  const [form, setForm] = useState(initialDemo ? DEMO : EMPTY);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialDemo) setForm(DEMO);
  }, [initialDemo]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 2200);
    return () => clearInterval(interval);
  }, [loading]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    const required = ["name", "problem", "solution", "market", "model", "stage"];
    const missing = required.filter((k) => !form[k]?.trim());
    if (missing.length) {
      setError("Please fill in all fields before evaluating.");
      return;
    }
    setError(null);
    setLoading(true);
    setLoadingStep(0);
    try {
      const data = await evaluateStartup(form);
      onResult({
        startup: form.name,
        founder: form.founder,
        stage: form.stage,
        data,
      });
    } catch (err) {
      setError(err.message || "Evaluation failed. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[480px]">
        <div className="w-12 h-12 border-2 border-black/8 dark:border-white/10 border-t-[#c9a84c] rounded-full spinner mb-6" />
        <div className="font-syne font-bold text-[18px] text-[#0a0a12] dark:text-white mb-2">
          Analyzing with AI...
        </div>
        <div className="text-[13px] text-[#7a7a96] dark:text-[#8888aa] mb-8">
          Our VC model is running a full evaluation
        </div>
        <div className="w-full max-w-sm space-y-2">
          {LOADING_STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 text-[12px] transition-all duration-300 ${
                i <= loadingStep
                  ? "text-[#0a0a12] dark:text-white"
                  : "text-[#7a7a96]/40 dark:text-white/20"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  i < loadingStep
                    ? "bg-emerald-500"
                    : i === loadingStep
                    ? "bg-[#c9a84c]"
                    : "bg-[#eeecea] dark:bg-[#262640]"
                }`}
              >
                {i < loadingStep ? (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d="M1.5 4l2 2 3-3"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : i === loadingStep ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                ) : null}
              </div>
              {step}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-7">
        <h1 className="font-syne font-bold text-[24px] text-[#0a0a12] dark:text-white tracking-tight mb-1.5">
          Evaluate a Startup
        </h1>
        <p className="text-[13px] text-[#7a7a96] dark:text-[#8888aa]">
          Submit details for AI-powered VC-grade analysis
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-black/5 dark:border-white/8 p-8 max-w-2xl">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-400 rounded-xl p-4 text-[13px] mb-6 flex items-start gap-3">
            <svg
              className="flex-shrink-0 mt-0.5"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M8 5v3M8 11v.5" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-5">
          {/* Row 1 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Startup Name
            </label>
            <input
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. NexaHealth AI"
              className={INPUT_CLS}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Founder Name
            </label>
            <input
              value={form.founder}
              onChange={set("founder")}
              placeholder="e.g. Priya Sharma"
              className={INPUT_CLS}
            />
          </div>

          {/* Problem */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Problem Statement
            </label>
            <textarea
              value={form.problem}
              onChange={set("problem")}
              placeholder="What problem are you solving? Who suffers from it and how acutely?"
              rows={3}
              className={INPUT_CLS + " resize-none"}
            />
          </div>

          {/* Solution */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Solution
            </label>
            <textarea
              value={form.solution}
              onChange={set("solution")}
              placeholder="How does your product solve this problem? What makes it unique or defensible?"
              rows={3}
              className={INPUT_CLS + " resize-none"}
            />
          </div>

          {/* Market */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Target Market
            </label>
            <input
              value={form.market}
              onChange={set("market")}
              placeholder="e.g. SMBs in Southeast Asia"
              className={INPUT_CLS}
            />
          </div>

          {/* Model */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Business Model
            </label>
            <input
              value={form.model}
              onChange={set("model")}
              placeholder="e.g. SaaS subscription, $99/mo"
              className={INPUT_CLS}
            />
          </div>

          {/* Stage */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] dark:text-[#a0a0c0] tracking-wide uppercase">
              Stage
            </label>
            <div className="relative">
              <select
                value={form.stage}
                onChange={set("stage")}
                className={INPUT_CLS + " cursor-pointer pr-8"}
                style={{ appearance: "none" }}
              >
                <option value="">Select stage...</option>
                {["Idea", "MVP", "Early Revenue", "Scale"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M2 3.5l3 3 3-3"
                    stroke="#7a7a96"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-3 pt-6 border-t border-black/5 dark:border-white/8">
          <button
            onClick={handleSubmit}
            className="bg-[#1a1a2e] hover:bg-[#262640] dark:bg-gold dark:hover:bg-gold-light dark:text-navy text-white font-syne font-bold text-[13px] tracking-wide px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-px inline-flex items-center gap-2 shadow-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M8 5v3l2 2" strokeLinecap="round" />
            </svg>
            Evaluate with AI
          </button>
          <button
            onClick={() => { setForm(DEMO); setError(null); }}
            className="text-[#7a7a96] dark:text-[#8888aa] hover:text-[#3a3a52] dark:hover:text-white text-[12px] px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-[#c9a84c] dark:hover:border-[#c9a84c] transition-all duration-150"
          >
            Load Sample Startup
          </button>
          <button
            onClick={() => { setForm(EMPTY); setError(null); }}
            className="text-[#7a7a96] dark:text-[#8888aa] hover:text-[#3a3a52] dark:hover:text-white text-[12px] px-4 py-3 rounded-lg transition-all duration-150 ml-auto"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
