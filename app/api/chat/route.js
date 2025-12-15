export async function POST(req) {
  const { messages } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "gpt-4o-mini", messages }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(errText, { status: res.status });
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content ?? "";
  return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
}
