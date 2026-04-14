import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, founder, problem, solution, market, model, stage } = req.body || {};

  if (!name || !problem || !solution || !market || !model || !stage) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const prompt = `You are a senior partner at a top-tier global venture capital fund. Evaluate this startup with rigorous, honest VC-grade analysis.

Startup Name: ${name}
Founder: ${founder}
Problem: ${problem}
Solution: ${solution}
Target Market: ${market}
Business Model: ${model}
Stage: ${stage}

Respond ONLY with a valid JSON object — no markdown, no explanation, no backticks:
{
  "innovation_score": <number 0-10>,
  "market_potential": <number 0-10>,
  "scalability": <number 0-10>,
  "risk_level": "<Low|Medium|High>",
  "suggested_stage": "<Pre-seed|Seed|Series A|Series B>",
  "funding_recommendation": "<2-3 sentence specific funding advice>",
  "key_risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "growth_opportunities": ["<opportunity 1>", "<opportunity 2>", "<opportunity 3>"],
  "final_summary": "<2-3 sentence VC-style investment thesis or pass rationale>"
}`;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.json({ success: true, data: parsed });
  } catch (err) {
    console.error("Evaluation error:", err.message);
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }
    return res.status(500).json({ error: err.message || "AI evaluation failed." });
  }
}
