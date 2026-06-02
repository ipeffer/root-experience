import { localeQuery, resolvePublicLocale, type PublicLocale } from "../lib/i18n/publicLocale";

const copy: Record<
  PublicLocale,
  {
    title: string;
    subtitle: string;
    actionsLabel: string;
    giftCta: string;
    bookingCta: string;
  }
> = {
  en: {
    title: "ROOT Experience",
    subtitle: "Plan boutique winery gifts and submit booking requests in a guided flow.",
    actionsLabel: "Primary flows",
    giftCta: "Open Gift Constructor",
    bookingCta: "Open Booking Assistant",
  },
  it: {
    title: "ROOT Experience",
    subtitle: "Pianifica regali boutique di cantina e invia richieste di prenotazione con un flusso guidato.",
    actionsLabel: "Flussi principali",
    giftCta: "Apri Costruttore Regalo",
    bookingCta: "Apri Assistente Prenotazioni",
  },
  ru: {
    title: "ROOT Experience",
    subtitle: "Podberite butikovyy podarok vinodelni i otpravte zapros na bronirovanie v poshagovom potoke.",
    actionsLabel: "Osnovnye potoki",
    giftCta: "Otkryt konstruktor podarka",
    bookingCta: "Otkryt pomoshchnik bronirovaniya",
  },
};

function renderHomePage(locale: PublicLocale): string {
  const t = copy[locale];
  const giftHref = `/gift?${localeQuery(locale)}`;
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
        color: var(--ink);
        background: radial-gradient(circle at top, #f9f4eb 0%, var(--bg) 42%, #efe4d2 100%);
      }
      .wrap {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 20px 14px 40px;
      }
      .card {
        width: 100%;
        max-width: 680px;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: color-mix(in oklab, var(--card), white 10%);
        box-shadow: 0 12px 30px rgba(64, 42, 24, 0.08);
        padding: 24px 18px;
      }
      h1 { margin: 0 0 8px; font-size: 1.7rem; }
      p { margin: 0 0 14px; color: var(--muted); line-height: 1.4; }
      .actions {
        display: grid;
        gap: 10px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        border-radius: 999px;
        padding: 11px 14px;
        font-weight: 600;
        text-align: center;
      }
      .primary {
        color: #fff;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
      }
      .secondary {
        color: var(--ink);
        background: #e8ddcd;
      }
      @media (min-width: 768px) {
        .card { padding: 30px; }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <h1>${t.title}</h1>
        <p>${t.subtitle}</p>
        <nav class="actions" aria-label="${t.actionsLabel}">
          <a class="primary" href="${giftHref}">${t.giftCta}</a>
          <a class="secondary" href="${bookingHref}">${t.bookingCta}</a>
        </nav>
      </section>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request): Promise<Response> {
  const locale = resolvePublicLocale(new URL(request.url));
  return new Response(renderHomePage(locale), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
