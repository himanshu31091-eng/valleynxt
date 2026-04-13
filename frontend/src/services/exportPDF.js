export function exportToPDF(result) {
  const { startup, founder, stage, data: d } = result;
  const avg = (
    (d.innovation_score + d.market_potential + d.scalability) / 3
  ).toFixed(1);

  const avgNum = parseFloat(avg);
  const sentiment =
    avgNum >= 7.5 ? "Strong Buy" : avgNum >= 5.5 ? "Watchlist" : "Pass";

  const riskColor =
    d.risk_level === "Low"
      ? "#1a6b47"
      : d.risk_level === "High"
      ? "#8b1a1a"
      : "#9c5a00";

  const sentimentColor =
    sentiment === "Strong Buy"
      ? "#1a6b47"
      : sentiment === "Watchlist"
      ? "#9c5a00"
      : "#8b1a1a";

  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>ValleyNXT – ${startup} Evaluation</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #fff; color: #0a0a12; font-size: 13px; }
    .page { max-width: 780px; margin: 0 auto; padding: 48px 48px; }

    /* Header */
    .header { background: #1a1a2e; border-radius: 12px; padding: 32px 36px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .header-left {}
    .header-eyebrow { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #c9a84c; font-weight: 600; margin-bottom: 6px; }
    .header-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; color: #fff; letter-spacing: -0.5px; margin-bottom: 6px; }
    .header-meta { font-size: 11px; color: rgba(255,255,255,0.4); }
    .header-score { text-align: right; }
    .score-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; margin-bottom: 4px; }
    .score-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 48px; color: #fff; line-height: 1; }
    .score-denom { font-size: 16px; color: rgba(255,255,255,0.3); }

    /* Score cards */
    .score-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
    .score-card { border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 16px 20px; }
    .score-card-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a7a96; margin-bottom: 8px; }
    .score-card-num { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 28px; color: #0a0a12; margin-bottom: 8px; }
    .score-bar { height: 3px; background: #eeecea; border-radius: 3px; overflow: hidden; }
    .score-bar-fill { height: 100%; background: #c9a84c; border-radius: 3px; }

    /* Insight grid */
    .insights { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
    .insight-card { border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 18px 20px; }
    .insight-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a7a96; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
    .insight-dot { width: 5px; height: 5px; border-radius: 50%; background: #c9a84c; }
    .insight-text { font-size: 12px; color: #3a3a52; line-height: 1.7; }
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; font-family: 'Syne', sans-serif; }
    .stage-chip { display: inline-flex; padding: 4px 12px; background: #f5f4f0; border-radius: 20px; font-size: 11px; font-weight: 500; color: #1a1a2e; margin-top: 10px; }
    ul.bullet-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
    ul.bullet-list li { font-size: 12px; color: #3a3a52; padding-left: 14px; position: relative; line-height: 1.5; }
    ul.bullet-list li::before { content: ''; position: absolute; left: 0; top: 6px; width: 5px; height: 5px; border-radius: 50%; background: #c9a84c; }

    /* Summary */
    .summary { background: #1a1a2e; border-radius: 10px; padding: 20px 24px; margin-bottom: 20px; }
    .summary-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #c9a84c; margin-bottom: 8px; }
    .summary-text { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.8; font-style: italic; font-weight: 300; }

    /* Footer */
    .footer { border-top: 1px solid rgba(0,0,0,0.08); padding-top: 16px; display: flex; justify-content: space-between; align-items: center; }
    .footer-left { font-size: 11px; color: #7a7a96; }
    .footer-right { font-size: 11px; color: #7a7a96; font-style: italic; }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { padding: 32px; }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <div class="header-eyebrow">ValleyNXT · Deal Intelligence Report</div>
      <div class="header-name">${startup}</div>
      <div class="header-meta">Founder: ${founder} &nbsp;·&nbsp; Stage: ${stage} &nbsp;·&nbsp; ${date} &nbsp;·&nbsp; <span style="color:#c9a84c;font-weight:600">${sentiment}</span></div>
    </div>
    <div class="header-score">
      <div class="score-label">Overall Score</div>
      <div class="score-num">${avg}<span class="score-denom">/10</span></div>
    </div>
  </div>

  <!-- Score Cards -->
  <div class="score-grid">
    ${[
      { label: "Innovation", score: d.innovation_score },
      { label: "Market Potential", score: d.market_potential },
      { label: "Scalability", score: d.scalability },
    ].map(s => `
      <div class="score-card">
        <div class="score-card-label">${s.label}</div>
        <div class="score-card-num">${s.score}<span style="font-size:14px;color:#7a7a96;font-weight:300">/10</span></div>
        <div class="score-bar"><div class="score-bar-fill" style="width:${s.score * 10}%"></div></div>
      </div>
    `).join("")}
  </div>

  <!-- Insights -->
  <div class="insights">
    <div class="insight-card">
      <div class="insight-label"><div class="insight-dot"></div>Risk Assessment</div>
      <span class="badge" style="background:${d.risk_level === "Low" ? "#e8f5ee" : d.risk_level === "High" ? "#fdeaea" : "#fef3e2"};color:${riskColor};border:1px solid ${riskColor}40">${d.risk_level} Risk</span>
      <div class="stage-chip">${d.suggested_stage}</div>
    </div>
    <div class="insight-card">
      <div class="insight-label"><div class="insight-dot"></div>Funding Recommendation</div>
      <div class="insight-text">${d.funding_recommendation}</div>
    </div>
    <div class="insight-card">
      <div class="insight-label"><div class="insight-dot"></div>Key Risks</div>
      <ul class="bullet-list">${d.key_risks.map(r => `<li>${r}</li>`).join("")}</ul>
    </div>
    <div class="insight-card">
      <div class="insight-label"><div class="insight-dot"></div>Growth Opportunities</div>
      <ul class="bullet-list">${d.growth_opportunities.map(o => `<li>${o}</li>`).join("")}</ul>
    </div>
  </div>

  <!-- Summary -->
  <div class="summary">
    <div class="summary-label">VC Investment Thesis</div>
    <div class="summary-text">"${d.final_summary}"</div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">ValleyNXT AI Deal Intelligence Platform · Confidential</div>
    <div class="footer-right">Generated on ${date}</div>
  </div>

</div>
</body>
</html>
  `;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 800);
}
