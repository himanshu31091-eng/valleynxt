import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import LandingPage from "./pages/LandingPage";
import EvaluatePage from "./pages/EvaluatePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  const [page, setPage] = useState("landing");
  const [result, setResult] = useState(null);
  const [loadDemo, setLoadDemo] = useState(false);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleNavigate = (target) => {
    setPage(target);
  };

  const handleLoadDemo = () => {
    setLoadDemo(true);
    setPage("form");
  };

  const handleResult = (data) => {
    setResult(data);
    setPage("results");
  };

  const handleNewEval = () => {
    setLoadDemo(false);
    setPage("form");
  };

  return (
    <div className="flex min-h-screen bg-[#f5f4f0] dark:bg-[#0d0d1a]">
      <Sidebar activePage={page} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-y-auto">
        <Topbar
          activePage={page}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />
        <div key={page} className="fade-in-up">
          {page === "landing" && (
            <LandingPage
              onNavigate={handleNavigate}
              onLoadDemo={handleLoadDemo}
            />
          )}
          {page === "form" && (
            <EvaluatePage
              onResult={handleResult}
              initialDemo={loadDemo}
            />
          )}
          {page === "results" && (
            <ResultsPage result={result} onNewEval={handleNewEval} />
          )}
        </div>
      </main>
    </div>
  );
}
