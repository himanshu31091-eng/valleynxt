import React, { useState } from "react";
import { socialScan } from "../services/api";

const SCAN_STEPS = [
  "Connecting to LinkedIn profile...",
  "Analyzing founder credibility...",
  "Scanning Twitter & X mentions...",
  "Reading news sentiment...",
  "Mapping social proof signals...",
  "Calculating market sentiment...",
  "Generating intelligence report...",
];

const SENTIMENT_STYLES = {
  Positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Neutral: "bg-amber-50 text-amber-700 border-amber-200",
  Negative: "bg-red-50 text-red-700 border-red-200",
};

const STRENGTH_STYLES = {
  Strong: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  Weak: "bg-red-50 text-red-700 border-red-200",
};

function ScoreRing({ score, label }) {
  const pct = score * 10;
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  const strokeColor = score >= 7 ? "#059669" : score >= 5 ? "#c9a84c" : "#ef4444";
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#eeecea" strokeWidth="5" />
          <circle cx="40" cy="40" r={radius} fill="none" stroke={strokeColor} strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            transform="rotate(-90 40 40)" style={{ transition: "stroke-dasharray 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-syne font-bold text-[18px] text-[#0a0a12] leading-none">{score}</span>
          <span className="text-[9px] text-[#7a7a96]">/10</span>
        </div>
      </div>
      <div className="text-[11px] text-[#7a7a96] text-center font-medium">{label}</div>
    </div>
  );
}

export default function SocialIntelligencePage() {
  const [startupName, setStartupName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!startupName.trim()) { setError("Please enter a startup name."); return; }
    setError(null);
    setResult(null);
    setScanning(true);
    setCurrentStep(0);

    for (let i = 0; i < SCAN_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setCurrentStep(i + 1);
    }

    try {
      const prompt = `You are a social media intelligence analyst. Generate a realistic social intelligence report for a startup called "${startupName}"${linkedinUrl ? ` with LinkedIn URL: ${linkedinUrl}` : ""}.

Respond ONLY with a valid JSON object, no markdown, no backticks:
{
  "founder_credibility_score": <number 5-9>,
  "market_sentiment": "<Positive|Neutral|Negative>",
  "social_proof_score": <number 5-9>,
  "linkedin_strength": "<Strong|Moderate|Weak>",
  "linkedin_connections": "<number like 2,400+>",
  "twitter_mentions_monthly": <number 50-5000>,
  "news_mentions_monthly": <number 2-50>,
  "sentiment_summary": "<2 sentence realistic summary of online presence and market perception>",
  "top_signals": ["<positive signal 1>", "<positive signal 2>", "<positive signal 3>"],
  "risk_signals": ["<risk signal 1>", "<risk signal 2>"],
  "recent_news": [
    {"title": "<realistic news headline>", "source": "<TechCrunch|YourStory|Inc42|Economic Times|Mint>", "sentiment": "<Positive|Neutral|Negative>", "days_ago": <number 1-30>},
    {"title": "<realistic news headline>", "source": "<TechCrunch|YourStory|Inc42|Economic Times|Mint>", "sentiment": "<Positive|Neutral|Negative>", "days_ago": <number 1-30>},
    {"title": "<realistic news headline>", "source": "<TechCrunch|YourStory|Inc42|Economic Times|Mint>", "sentiment": "<Positive|Neutral|Negative>", "days_ago": <number 1-30>}
  ],
  "overall_social_score": <number 5-9>
}`;

      const data = await socialScan(prompt);
      setResult({ ...data, startupName });

    } catch (err) {
      setError(err.message || "Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-7">
        <h1 className="font-syne font-bold text-[24px] text-[#0a0a12] tracking-tight mb-1.5">Social Intelligence</h1>
        <p className="text-[13px] text-[#7a7a96]">Scan LinkedIn, Twitter, and news sources for founder credibility and market sentiment</p>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl p-8 max-w-2xl mb-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] tracking-wide uppercase">Startup Name</label>
            <input value={startupName} onChange={(e) => setStartupName(e.target.value)} placeholder="e.g. MediSync AI"
              className="bg-[#f5f4f0] border border-black/10 rounded-lg px-3.5 py-2.5 text-[13px] text-[#0a0a12] placeholder-[#7a7a96] outline-none focus:border-[#c9a84c] focus:bg-white transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-[#3a3a52] tracking-wide uppercase">
              LinkedIn URL <span className="ml-2 text-[#7a7a96] normal-case font-normal">(optional)</span>
            </label>
            <input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="e.g. linkedin.com/company/medisync-ai"
              className="bg-[#f5f4f0] border border-black/10 rounded-lg px-3.5 py-2.5 text-[13px] text-[#0a0a12] placeholder-[#7a7a96] outline-none focus:border-[#c9a84c] focus:bg-white transition-all" />
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-[12px]">{error}</div>}
          <button onClick={handleScan} disabled={scanning}
            className="bg-[#1a1a2e] hover:bg-[#262640] disabled:opacity-50 disabled:cursor-not-allowed text-white font-syne font-bold text-[13px] tracking-wide px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-px inline-flex items-center gap-2 w-fit">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5L5 11M11 5l1.5-1.5" strokeLinecap="round" />
            </svg>
            {scanning ? "Scanning..." : "Scan Social Profile"}
          </button>
        </div>
      </div>

      {scanning && (
        <div className="bg-white border border-black/5 rounded-2xl p-8 max-w-2xl mb-6 fade-in-up">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 border-2 border-black/8 border-t-[#c9a84c] rounded-full spinner mb-4" />
            <div className="font-syne font-bold text-[16px] text-[#0a0a12] mb-1">Scanning Social Profiles...</div>
            <div className="text-[12px] text-[#7a7a96]">Analyzing online presence for {startupName}</div>
          </div>
          <div className="flex flex-col gap-2">
            {SCAN_STEPS.map((step, i) => (
              <div key={i} className={`flex items-center gap-3 text-[12px] transition-all duration-300 ${i < currentStep ? "text-[#0a0a12]" : "text-[#7a7a96]/40"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${i < currentStep - 1 ? "bg-emerald-500" : i === currentStep - 1 ? "bg-[#c9a84c]" : "bg-[#eeecea]"}`}>
                  {i < currentStep - 1 ? (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : i === currentStep - 1 ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  ) : null}
                </div>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && !scanning && (
        <div className="max-w-4xl fade-in-up">
          <div className="bg-[#1a1a2e] rounded-2xl px-8 py-6 mb-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[2px] uppercase text-[#c9a84c] mb-1">Social Intelligence Report</div>
              <div className="font-syne font-extrabold text-[22px] text-white tracking-tight">{result.startupName}</div>
              <div className="text-[12px] text-white/40 mt-1">Scanned across LinkedIn · Twitter · News · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[2px] uppercase text-[#c9a84c] mb-1">Overall Score</div>
              <div className="font-syne font-extrabold text-[48px] text-white leading-none">
                {result.overall_social_score}<span className="text-[16px] text-white/30 font-light">/10</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/5 rounded-2xl p-6 mb-5">
            <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] mb-5">Score Breakdown</div>
            <div className="flex items-center justify-around flex-wrap gap-6">
              <ScoreRing score={result.founder_credibility_score} label="Founder Credibility" />
              <ScoreRing score={result.social_proof_score} label="Social Proof" />
              <ScoreRing score={result.overall_social_score} label="Overall Score" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Market Sentiment", value: result.market_sentiment, badge: true, style: SENTIMENT_STYLES[result.market_sentiment] },
              { label: "LinkedIn Strength", value: result.linkedin_strength, badge: true, style: STRENGTH_STYLES[result.linkedin_strength] },
              { label: "LinkedIn Connections", value: result.linkedin_connections, badge: false },
              { label: "Monthly News Mentions", value: result.news_mentions_monthly, badge: false },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-black/5 rounded-xl p-4">
                <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] mb-2">{stat.label}</div>
                {stat.badge ? (
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[12px] font-semibold border font-syne ${stat.style}`}>{stat.value}</span>
                ) : (
                  <div className="font-syne font-bold text-[22px] text-[#0a0a12]">{stat.value}</div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white border border-black/5 rounded-xl p-5">
              <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />Sentiment Summary
              </div>
              <p className="text-[13px] text-[#3a3a52] leading-relaxed">{result.sentiment_summary}</p>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-5">
              <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Positive Signals
              </div>
              <ul className="flex flex-col gap-2">
                {result.top_signals.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-[#3a3a52]">
                    <svg className="flex-shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" fill="#e8f5ee" />
                      <path d="M3.5 6l2 2 3-3" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-5 col-span-2">
              <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />Risk Signals
              </div>
              <div className="grid grid-cols-2 gap-2">
                {result.risk_signals.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-[#3a3a52] bg-red-50 border border-red-100 rounded-lg p-3">
                    <svg className="flex-shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" fill="#fdeaea" />
                      <path d="M6 4v2.5M6 8v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/5 rounded-xl p-5 mb-5">
            <div className="text-[10px] tracking-[1.5px] uppercase text-[#7a7a96] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />Recent News Mentions
            </div>
            <div className="flex flex-col gap-3">
              {result.recent_news.map((news, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="font-syne font-semibold text-[13px] text-[#0a0a12] mb-1">{news.title}</div>
                    <div className="text-[11px] text-[#7a7a96]">{news.source} · {news.days_ago} days ago</div>
                  </div>
                  <span className={`flex-shrink-0 text-[10px] font-semibold font-syne px-2.5 py-1 rounded-full border ${SENTIMENT_STYLES[news.sentiment]}`}>{news.sentiment}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#92400e" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5.5" /><path d="M7 4.5v3M7 9v.5" strokeLinecap="round" />
              </svg>
              <div className="text-[11px] text-amber-800 leading-relaxed">
                <strong>Demo Mode:</strong> This social intelligence scan is AI-generated for demonstration purposes. Live LinkedIn and Twitter integration will be enabled in the production version after API access is confirmed.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
