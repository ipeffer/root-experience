import { localeQuery, type PublicLocale } from "../i18n/publicLocale";

export type PublicNav = "home" | "gift" | "booking";

const shellCopy: Record<
  PublicLocale,
  {
    announcement: string;
    navExperience: string;
    navGift: string;
    navBooking: string;
    visitWinery: string;
    footerAddress: string;
  }
> = {
  en: {
    announcement: "ROOT Experience · Gifts & wine tour requests",
    navExperience: "Home",
    navGift: "Gift",
    navBooking: "Booking",
    visitWinery: "Visit rootwinery.it",
    footerAddress: "Maiolati Spontini, Marche · Italy",
  },
  it: {
    announcement: "ROOT Experience · Regali e richieste tour in cantina",
    navExperience: "Home",
    navGift: "Regalo",
    navBooking: "Prenotazione",
    visitWinery: "Visita rootwinery.it",
    footerAddress: "Maiolati Spontini, Marche · Italia",
  },
  ru: {
    announcement: "ROOT Experience · Podarki i zaprosy na tury",
    navExperience: "Glavnaya",
    navGift: "Podarok",
    navBooking: "Bron",
    visitWinery: "rootwinery.it",
    footerAddress: "Maiolati Spontini, Marche · Italiya",
  },
};

export function publicStyles(): string {
  return `
      :root {
        --root-ink: #0c0c0c;
        --root-wine: #6b1e2a;
        --root-wine-hover: #551823;
        --root-bg: #f6f6f4;
        --root-surface: #ffffff;
        --root-border: #e3e3df;
        --root-muted: #5f5f5b;
        --root-line: #d8d8d3;
        --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: var(--font-sans);
        color: var(--root-ink);
        background: var(--root-bg);
        -webkit-font-smoothing: antialiased;
      }
      a { color: inherit; }
      .site-announce {
        background: var(--root-ink);
        color: #f5f5f4;
        text-align: center;
        font-size: 0.72rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 8px 12px;
      }
      .site-header {
        background: var(--root-ink);
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .site-header-inner {
        max-width: 920px;
        margin: 0 auto;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .brand {
        text-decoration: none;
        color: #fff;
        font-size: 1.35rem;
        font-weight: 600;
        letter-spacing: 0.18em;
        line-height: 1;
      }
      .site-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 14px;
        justify-content: flex-end;
      }
      .site-nav a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.86rem;
        font-weight: 500;
        padding: 4px 0;
        border-bottom: 1px solid transparent;
      }
      .site-nav a:hover,
      .site-nav a.is-active {
        color: #fff;
        border-bottom-color: #fff;
      }
      .page-main {
        padding: 22px 14px 48px;
      }
      .page-main--centered {
        min-height: calc(100vh - 140px);
        display: grid;
        place-items: center;
      }
      .page-stack {
        max-width: 760px;
        margin: 0 auto;
        display: grid;
        gap: 14px;
      }
      .page-card {
        width: 100%;
        max-width: 760px;
        margin: 0 auto;
        background: var(--root-surface);
        border: 1px solid var(--root-border);
        border-radius: 16px;
        padding: 20px 16px;
        box-shadow: 0 10px 28px rgba(12, 12, 12, 0.05);
      }
      .hero {
        max-width: 920px;
        margin: 0 auto 18px;
        padding: 42px 20px 36px;
        text-align: center;
        color: #fff;
        border-radius: 0 0 20px 20px;
        background:
          linear-gradient(180deg, rgba(12, 12, 12, 0.55) 0%, rgba(12, 12, 12, 0.82) 100%),
          radial-gradient(120% 90% at 50% 0%, #3d5a3a 0%, #1a2418 42%, #0c0c0c 100%);
      }
      .hero-eyebrow {
        margin: 0 0 10px;
        font-size: 0.72rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        opacity: 0.88;
      }
      .hero h1 {
        margin: 0 0 10px;
        font-size: clamp(1.65rem, 5vw, 2.35rem);
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }
      .hero p {
        margin: 0 auto;
        max-width: 34rem;
        color: rgba(255, 255, 255, 0.86);
        line-height: 1.5;
        font-size: 0.98rem;
      }
      h1 { margin: 0 0 8px; font-size: 1.45rem; font-weight: 600; letter-spacing: -0.01em; }
      h2.gift-name { margin: 0; font-size: 1.12rem; font-weight: 700; }
      p, .subtitle {
        margin: 0 0 12px;
        color: var(--root-muted);
        line-height: 1.45;
      }
      .subtitle { margin-bottom: 14px; }
      .notice {
        margin: 0 0 16px;
        padding: 11px 12px;
        border-radius: 12px;
        border: 1px solid var(--root-border);
        background: #f1f1ef;
        color: var(--root-ink);
        font-weight: 500;
        font-size: 0.92rem;
        line-height: 1.4;
      }
      .lang {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
      }
      select,
      input,
      textarea {
        width: 100%;
        border: 1px solid var(--root-line);
        border-radius: 12px;
        padding: 12px;
        background: #fff;
        color: var(--root-ink);
        font: inherit;
        font-size: 0.95rem;
      }
      select {
        width: auto;
        border-radius: 999px;
        padding: 7px 12px;
      }
      textarea { min-height: 110px; resize: vertical; }
      .progress {
        height: 6px;
        width: 100%;
        border-radius: 999px;
        background: #ececea;
        margin: 8px 0 20px;
        overflow: hidden;
      }
      .progress > span {
        display: block;
        height: 100%;
        background: var(--root-ink);
        transition: width 0.2s ease;
      }
      .step-title { font-weight: 600; margin-bottom: 10px; color: var(--root-ink); }
      .grid { display: grid; gap: 10px; }
      .choice {
        width: 100%;
        text-align: left;
        border: 1px solid var(--root-line);
        background: #fff;
        color: var(--root-ink);
        border-radius: 12px;
        padding: 12px;
        font-size: 0.95rem;
        cursor: pointer;
      }
      .choice.selected {
        border-color: var(--root-ink);
        background: #f3f3f1;
      }
      .row-2 { display: grid; gap: 10px; }
      .consent {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        line-height: 1.35;
        color: var(--root-muted);
        font-size: 0.9rem;
      }
      .consent input {
        width: 18px;
        height: 18px;
        margin-top: 2px;
        padding: 0;
      }
      .review {
        margin-top: 10px;
        padding: 12px;
        background: #fafaf8;
        border: 1px dashed var(--root-line);
        border-radius: 12px;
      }
      .review p { margin: 0 0 8px; color: var(--root-ink); }
      .review p:last-child { margin: 0; }
      .nav {
        margin-top: 18px;
        display: flex;
        gap: 8px;
      }
      button {
        border: 0;
        border-radius: 999px;
        padding: 11px 16px;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
      }
      .ghost {
        background: #fff;
        color: var(--root-ink);
        border: 1px solid var(--root-line);
      }
      .primary,
      button.primary {
        background: var(--root-ink);
        color: #fff;
        margin-left: auto;
      }
      .primary:hover,
      button.primary:hover {
        background: #222;
      }
      .btn,
      a.btn {
        display: inline-block;
        text-decoration: none;
        border-radius: 999px;
        padding: 11px 16px;
        font-weight: 600;
        text-align: center;
        border: 0;
        cursor: pointer;
        font: inherit;
      }
      .btn-primary,
      a.btn-primary {
        background: var(--root-ink);
        color: #fff;
      }
      .btn-wine,
      a.btn-wine {
        background: var(--root-wine);
        color: #fff;
      }
      .btn-wine:hover,
      a.btn-wine:hover {
        background: var(--root-wine-hover);
      }
      .btn-ghost,
      a.btn-ghost {
        background: #fff;
        color: var(--root-ink);
        border: 1px solid var(--root-line);
      }
      .actions {
        display: grid;
        gap: 8px;
        margin-top: 10px;
      }
      .actions-row {
        display: grid;
        gap: 10px;
      }
      .label { color: var(--root-muted); font-size: 0.85rem; margin-bottom: 6px; }
      .gift-expl { margin: 8px 0 0; line-height: 1.45; color: var(--root-ink); }
      .fallback {
        border-top: 1px dashed var(--root-line);
        margin-top: 10px;
        padding-top: 10px;
      }
      .fallback-item { margin-top: 8px; }
      .message {
        border-left: 3px solid var(--root-wine);
        padding: 8px 10px;
        background: #f7f5f4;
        border-radius: 8px;
        color: var(--root-ink);
      }
      .status {
        margin-top: 10px;
        min-height: 20px;
        color: var(--root-muted);
      }
      .status.error { color: #8a2923; }
      .status.success { color: #245f30; }
      .meta { font-size: 0.9rem; color: var(--root-muted); }
      .back {
        display: inline-block;
        color: var(--root-muted);
        margin-top: 8px;
        text-decoration: none;
      }
      .back:hover { color: var(--root-ink); }
      form {
        display: grid;
        gap: 8px;
      }
      .inline-footer {
        margin-top: 18px;
        font-size: 0.85rem;
        color: var(--root-muted);
        text-align: center;
      }
      .site-footer {
        max-width: 920px;
        margin: 0 auto;
        padding: 0 16px 28px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 12px;
        justify-content: center;
        align-items: center;
        font-size: 0.84rem;
        color: var(--root-muted);
      }
      .site-footer a {
        color: var(--root-ink);
        font-weight: 600;
        text-decoration: none;
        border-bottom: 1px solid var(--root-ink);
      }
      @media (min-width: 768px) {
        .page-main { padding: 28px 20px 64px; }
        .page-card { padding: 28px; }
        .row-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .actions-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
  `;
}

function navHref(path: string, locale: PublicLocale): string {
  return `${path}?${localeQuery(locale)}`;
}

function renderHeader(locale: PublicLocale, activeNav: PublicNav): string {
  const t = shellCopy[locale];
  const items: { key: PublicNav; href: string; label: string }[] = [
    { key: "home", href: navHref("/", locale), label: t.navExperience },
    { key: "gift", href: navHref("/gift", locale), label: t.navGift },
    { key: "booking", href: navHref("/booking", locale), label: t.navBooking },
  ];

  const links = items
    .map(
      (item) =>
        `<a href="${item.href}"${item.key === activeNav ? ' class="is-active"' : ""}>${item.label}</a>`,
    )
    .join("");

  return `
    <div class="site-announce">${t.announcement}</div>
    <header class="site-header">
      <div class="site-header-inner">
        <a class="brand" href="https://rootwinery.it" rel="noopener noreferrer">ROOT</a>
        <nav class="site-nav" aria-label="ROOT Experience">${links}</nav>
      </div>
    </header>`;
}

function renderFooter(locale: PublicLocale): string {
  const t = shellCopy[locale];
  return `
    <footer class="site-footer">
      <a href="https://rootwinery.it" rel="noopener noreferrer">${t.visitWinery}</a>
      <span aria-hidden="true">·</span>
      <span>${t.footerAddress}</span>
    </footer>`;
}

export function renderPublicPage(options: {
  locale: PublicLocale;
  title: string;
  activeNav: PublicNav;
  body: string;
  scripts?: string;
  mainClass?: string;
}): string {
  const { locale, title, activeNav, body, scripts = "", mainClass = "" } = options;
  const mainClasses = ["page-main", mainClass].filter(Boolean).join(" ");

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>${publicStyles()}</style>
  </head>
  <body>
    ${renderHeader(locale, activeNav)}
    <main class="${mainClasses}">
      ${body}
    </main>
    ${renderFooter(locale)}
    ${scripts}
  </body>
</html>`;
}
