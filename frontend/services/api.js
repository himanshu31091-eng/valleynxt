const API_BASE = import.meta.env.VITE_API_URL || "";

export async function evaluateStartup(formData) {
  const response = await fetch(`${API_BASE}/api/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Evaluation failed. Please try again.");
  }

  return json.data;
}
