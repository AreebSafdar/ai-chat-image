export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");
  const prompt = formData.get("prompt");

  // Forward the incoming multipart form data to OpenAI Images Edits endpoint
  const forward = new FormData();
  forward.append("prompt", prompt || "");
  forward.append("size", "1024x1024");
  // `file` is a File object; append directly. If running in some environments
  // you may need to include a filename: forward.append('image', file, file.name)
  forward.append("image", file);

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      // DO NOT set Content-Type; the runtime will set the multipart boundary
    },
    body: forward,
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(errText, { status: res.status });
  }

  const data = await res.json();
  const url = data?.data?.[0]?.url ?? null;
  return new Response(JSON.stringify({ url }), { headers: { "Content-Type": "application/json" } });
}
