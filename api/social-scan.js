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

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new SyntaxError("No JSON object found in AI response");
    const parsed = JSON.parse(jsonMatch[0]);

    return res.json({ success: true, data: parsed });
  } catch (err) {
    console.error("Social scan error:", err.message);
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }
    return res.status(500).json({ error: err.message || "Social scan failed." });
  }
}
