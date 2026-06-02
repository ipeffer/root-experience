function renderConfirmationPage(id: string, mock: boolean): string {
  const escapedId = id
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Booking request received | ROOT Experience</title>
    <style>
      :root {
        --bg: #f4efe6;
        --card: #fff9f0;
        --line: #d6c3a4;
        --ink: #2f261d;
        --muted: #6e5b48;
        --accent: #7a4b2b;
        --accent-2: #a86f3e;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Avenir Next", "Segoe UI", sans-serif;
        background: radial-gradient(circle at top, #f9f4eb 0%, var(--bg) 42%, #efe4d2 100%);
        color: var(--ink);
      }
      .wrap {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px 16px;
      }
      .card {
        width: 100%;
        max-width: 620px;
        background: color-mix(in oklab, var(--card), white 10%);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 12px 30px rgba(64, 42, 24, 0.08);
      }
      h1 { margin: 0 0 10px; }
      p { margin: 0 0 10px; line-height: 1.45; }
      .notice {
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid #d8b995;
        background: #f9edde;
        color: #5d3a1f;
        font-weight: 600;
      }
      .meta {
        font-size: 0.9rem;
        color: var(--muted);
      }
      .btn {
        display: inline-block;
        margin-top: 14px;
        border: 0;
        border-radius: 999px;
        padding: 11px 14px;
        font-weight: 600;
        text-decoration: none;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        color: #fff;
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <h1>Thank you for your request</h1>
        <p>Your booking request has been received.</p>
        <p class="notice">This is a request only, not a confirmed booking. ROOT will confirm availability personally.</p>
        <p class="meta">Request reference: ${escapedId || "pending"}</p>
        ${
          mock
            ? '<p class="meta">Temporary mode: request saved with a mock adapter.</p>'
            : ""
        }
        <a class="btn" href="/booking">Submit another request</a>
      </section>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const mock = url.searchParams.get("mock") === "1";

  return new Response(renderConfirmationPage(id, mock), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
