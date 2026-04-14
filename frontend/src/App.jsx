import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import LandingPage from "./pages/LandingPage";
import EvaluatePage from "./pages/EvaluatePage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import DemoVideoPage from "./pages/DemoVideoPage";
import SocialIntelligencePage from "./pages/SocialIntelligencePage";

export default function App() {
  const [page, setPage] = useState("landing");
  const [result, setResult] = useState(null);
  const [loadDemo, setLoadDemo] = useState(false);

  const handleNavigate = (target) => setPage(target);

  const handleLoadDemo = () => { setLoadDemo(true); setPage("form"); };

  const handleResult = (data) => { setResult(data); setPage("results"); };

  const handleNewEval = () => { setLoadDemo(false); setPage("form"); };

  const handleViewHistoryResult = (item) => { setResult(item); setPage("results"); };

  return (
    <div className="flex min-h-screen bg-[#f5f4f0]">
      <Sidebar activePage={page} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-y-auto">
        <Topbar activePage={page} />
        <div key={page} className="fade-in-up">
          {page === "landing" && <LandingPage onNavigate={handleNavigate} onLoadDemo={handleLoadDemo} />}
          {page === "form" && <EvaluatePage onResult={handleResult} initialDemo={loadDemo} />}
          {page === "results" && <ResultsPage result={result} onNewEval={handleNewEval} onNavigate={handleNavigate} />}
          {page === "history" && <HistoryPage onViewResult={handleViewHistoryResult} />}
          {page === "social" && <SocialIntelligencePage />}
          {page === "howitworks" && <HowItWorksPage onNavigate={handleNavigate} />}
          {page === "demo" && <DemoVideoPage onNavigate={handleNavigate} />}
        </div>
      </main>
    </div>
  );
}
