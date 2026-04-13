import React, { useState } from "react";

const DEMO_STEPS = [
  { time: "0:00", label: "Platform Overview", desc: "Tour of the ValleyNXT dashboard" },
  { time: "0:45", label: "Submitting a Startup", desc: "Filling in the evaluation form" },
  { time: "1:30", label: "AI Processing", desc: "Watching the real-time evaluation" },
  { time: "2:15", label: "Reading the Report", desc: "Understanding scores and insights" },
  { time: "3:00", label: "Exporting PDF", desc: "Downloading the deal report" },
];

export default function DemoVideoPage({ onNavigate }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-7">
        <h1 className="font-syne font-bold text-[24px] text-[#0a0a12] tracking-tight mb-1.5">
          Demo Video
        </h1>
        <p className="text-[13px] text-[#7a7a96]">
          See ValleyNXT in action — full walkthrough
        </p>
      </div>

      {/* Main Video Player */}
      <div className="bg-[#1a1a2e] rounded-2xl overflow-hidden mb-6 fade-in-up">
        {/* Video embed area */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {!playing ? (
            /* Thumbnail / Play button */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a2e]">
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/20" />
                <div className="absolute top-16 left-16 w-16 h-16 rounded-full border border-white/20" />
                <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full border border-white/20" />
              </div>

              <div className="relative z-10 text-center">
                <div className="text-[10px] tracking-[3px] uppercase text-[#c9a84c] font-semibold mb-4">
                  Full Platform Walkthrough
                </div>
                <div className="font-syne font-extrabold text-[28px] text-white mb-2 tracking-tight">
                  ValleyNXT Demo
                </div>
                <div className="text-[13px] text-white/40 mb-8">3 minutes · Complete walkthrough</div>

                {/* Play button */}
                <button
                  onClick={() => setPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#c9a84c] hover:bg-[#f0d080] flex items-center justify-center transition-all duration-200 hover:scale-110 mx-auto mb-6"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="#1a1a2e">
                    <path d="M6 4l12 6-12 6V4z" />
                  </svg>
                </button>

                <div className="text-[12px] text-white/30">
                  Click to play the demo video
                </div>
              </div>
            </div>
          ) : (
            /* Replace this src with your actual YouTube/Loom video ID */
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="ValleyNXT Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Video footer */}
        <div className="px-8 py-5 border-t border-white/8 flex items-center justify-between">
          <div>
            <div className="font-syne font-semibold text-[14px] text-white">
              ValleyNXT — Complete Platform Demo
            </div>
            <div className="text-[12px] text-white/40 mt-0.5">
              AI Deal Intelligence Platform · Full walkthrough
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/30 px-3 py-1 border border-white/10 rounded-full">
              3 min
            </span>
          </div>
        </div>
      </div>

      {/* Video chapters */}
      <div className="mb-6">
        <div className="text-[11px] tracking-[2px] uppercase text-[#7a7a96] font-semibold mb-4">
          Video Chapters
        </div>
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
          {DEMO_STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-[#f5f4f0] transition-all cursor-pointer ${
                i < DEMO_STEPS.length - 1 ? "border-b border-black/5" : ""
              }`}
              onClick={() => setPlaying(true)}
            >
              <span className="font-syne font-bold text-[12px] text-[#c9a84c] w-10 flex-shrink-0">
                {step.time}
              </span>
              <div className="flex-1">
                <div className="font-syne font-semibold text-[13px] text-[#0a0a12]">
                  {step.label}
                </div>
                <div className="text-[12px] text-[#7a7a96]">{step.desc}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#7a7a96" strokeWidth="1.5">
                <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* How to record your own demo note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#92400e" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5v3M8 11v.5" strokeLinecap="round" />
          </svg>
          <div>
            <div className="font-syne font-semibold text-[13px] text-amber-800 mb-1">
              Add Your Own Demo Video
            </div>
            <div className="text-[12px] text-amber-700 leading-relaxed">
              To replace this with your actual demo video, open{" "}
              <code className="bg-amber-100 px-1 rounded text-[11px]">
                src/pages/DemoVideoPage.jsx
              </code>{" "}
              and replace the YouTube URL in the iframe src with your own YouTube or Loom video link.
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("form")}
          className="bg-[#1a1a2e] hover:bg-[#262640] text-white font-syne font-bold text-[13px] tracking-wide py-4 rounded-xl transition-all duration-200 hover:-translate-y-px"
        >
          Try It Yourself →
        </button>
        <button
          onClick={() => onNavigate("howitworks")}
          className="bg-white border border-black/10 hover:border-[#c9a84c] text-[#0a0a12] font-syne font-semibold text-[13px] py-4 rounded-xl transition-all duration-200"
        >
          How It Works
        </button>
      </div>
    </div>
  );
}
