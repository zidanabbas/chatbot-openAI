export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;

    const baseUrl = process.env.OPENAI_API_URL;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!baseUrl || !apiKey) {
      return new Response(
        JSON.stringify({ error: "API key or URL not set." }),
        { status: 500 }
      );
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${errorText}` }),
        { status: response.status }
      );
    }

    const data = await response.json();

    // Pastikan data.choices ada dan valid
    if (!data.choices || !data.choices[0]?.message?.content) {
      return new Response(
        JSON.stringify({ error: "Invalid response format from OpenAI" }),
        { status: 500 }
      );
    }

    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Request failed: " + err.message }),
      { status: 500 }
    );
  }
}

export function GET() {
  return new Response("GET Method now allowed", { status: 405 });
}
