import { localeQuery, resolvePublicLocale, type PublicLocale } from "../../../lib/i18n/publicLocale";

const copy: Record<
  PublicLocale,
  {
    title: string;
    heading: string;
    received: string;
    requestOnly: string;
    requestRef: string;
    pending: string;
    mockNotice: string;
    submitAnother: string;
  }
> = {
  en: {
    title: "Booking request received | ROOT Experience",
    heading: "Thank you for your request",
    received: "Your booking request has been received.",
    requestOnly: "This is a request only, not a confirmed booking. ROOT will confirm availability personally.",
    requestRef: "Request reference",
    pending: "pending",
    mockNotice: "Temporary mode: request saved with a mock adapter.",
    submitAnother: "Submit another request",
  },
  it: {
    title: "Richiesta prenotazione ricevuta | ROOT Experience",
    heading: "Grazie per la tua richiesta",
    received: "La tua richiesta di prenotazione e stata ricevuta.",
    requestOnly:
      "Questa e solo una richiesta, non una prenotazione confermata. ROOT confermera personalmente la disponibilita.",
    requestRef: "Riferimento richiesta",
    pending: "in attesa",
    mockNotice: "Modalita temporanea: richiesta salvata con adapter mock.",
    submitAnother: "Invia un'altra richiesta",
  },
  ru: {
    title: "Zapros na bronirovanie poluchen | ROOT Experience",
    heading: "Spasibo za vash zapros",
    received: "Vash zapros na bronirovanie poluchen.",
    requestOnly: "Eto tolko zapros, a ne podtverzhdennoe bronirovanie. ROOT lichno podtverdit dostupnost.",
    requestRef: "Nomer zaprosa",
    pending: "v ozhidanii",
    mockNotice: "Vremennyy rezhim: zapros sokhranen cherez mock adapter.",
    submitAnother: "Otpravit eshche odin zapros",
  },
};

function renderConfirmationPage(id: string, mock: boolean, locale: PublicLocale): string {
  const t = copy[locale];
  const escapedId = id
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  const bookingHref = `/booking?${localeQuery(locale)}`;

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${t.title}</title>
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
        <h1>${t.heading}</h1>
        <p>${t.received}</p>
        <p class="notice">${t.requestOnly}</p>
        <p class="meta">${t.requestRef}: ${escapedId || t.pending}</p>
        ${
          mock
            ? `<p class="meta">${t.mockNotice}</p>`
            : ""
        }
        <a class="btn" href="${bookingHref}">${t.submitAnother}</a>
      </section>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const mock = url.searchParams.get("mock") === "1";
  const locale = resolvePublicLocale(url);

  return new Response(renderConfirmationPage(id, mock, locale), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
