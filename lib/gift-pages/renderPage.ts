import type { SupportedLanguage } from "../recommendations/types";
import type { GiftPageRecord } from "./types";

const occasionLabels: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    birthday: "Birthday",
    anniversary: "Anniversary",
    wedding: "Wedding",
    corporate: "Corporate gift",
    holiday: "Holiday",
    thank_you: "Thank you",
    just_because: "Just because",
  },
  it: {
    birthday: "Compleanno",
    anniversary: "Anniversario",
    wedding: "Matrimonio",
    corporate: "Regalo aziendale",
    holiday: "Festività",
    thank_you: "Grazie",
    just_because: "Senza motivo",
  },
  ru: {
    birthday: "Den' rozhdeniya",
    anniversary: "Yubiley",
    wedding: "Svad'ba",
    corporate: "Korporativnyy podarok",
    holiday: "Prazdnik",
    thank_you: "Blagodarnost'",
    just_because: "Prosto tak",
  },
};

export function formatOccasionLabel(language: SupportedLanguage, occasion: string): string {
  return occasionLabels[language][occasion] ?? occasion.replaceAll("_", " ");
}

const copy: Record<
  SupportedLanguage,
  {
    pageTitle: string;
    forRecipient: string;
    fromGiver: string;
    occasionLabel: string;
    giftLabel: string;
    messageLabel: string;
    buyCta: string;
    prepareCta: string;
    prepareNote: string;
    printCta: string;
    shareLabel: string;
    copyLink: string;
    copied: string;
    qrAlt: string;
    footerNote: string;
  }
> = {
  en: {
    pageTitle: "Your ROOT Gift",
    forRecipient: "A gift for",
    fromGiver: "From",
    occasionLabel: "Occasion",
    giftLabel: "Recommended gift",
    messageLabel: "Personal message",
    buyCta: "Buy this gift on ROOT Winery",
    prepareCta: "Request ROOT to prepare this gift",
    prepareNote:
      "Our concierge team can help prepare this gift with a personal touch. Contact ROOT Winery to arrange details.",
    printCta: "Print / save as PDF",
    shareLabel: "Share this gift page",
    copyLink: "Copy link",
    copied: "Link copied",
    qrAlt: "QR code for gift page",
    footerNote: "Crafted among the vineyards of Maiolati Spontini, Marche · Italy",
  },
  it: {
    pageTitle: "Il tuo regalo ROOT",
    forRecipient: "Un regalo per",
    fromGiver: "Da",
    occasionLabel: "Occasione",
    giftLabel: "Regalo consigliato",
    messageLabel: "Messaggio personale",
    buyCta: "Acquista questo regalo su ROOT Winery",
    prepareCta: "Chiedi a ROOT di preparare questo regalo",
    prepareNote:
      "Il nostro team concierge puo aiutarti a preparare questo regalo con un tocco personale. Contatta ROOT Winery per i dettagli.",
    printCta: "Stampa / salva come PDF",
    shareLabel: "Condividi questa pagina regalo",
    copyLink: "Copia link",
    copied: "Link copiato",
    qrAlt: "Codice QR della pagina regalo",
    footerNote: "Creato tra i vigneti di Maiolati Spontini, Marche · Italia",
  },
  ru: {
    pageTitle: "Vash podarok ROOT",
    forRecipient: "Podarok dlya",
    fromGiver: "Ot",
    occasionLabel: "Povod",
    giftLabel: "Rekomendovannyy podarok",
    messageLabel: "Lichnoe poslanie",
    buyCta: "Kupit' etot podarok v ROOT Winery",
    prepareCta: "Poprosit' ROOT podgotovit' podarok",
    prepareNote:
      "Nasha komanda mozhet pomoch' podgotovit' podarok s lichnym aktsentom. Svyazhites' s ROOT Winery dlya detaley.",
    printCta: "Pechat' / sokhranit' kak PDF",
    shareLabel: "Podelit'sya etoy stranitsey",
    copyLink: "Kopirovat' ssylku",
    copied: "Ssylka skopirovana",
    qrAlt: "QR-kod stranitsy podarka",
    footerNote: "Sozdano sredi vinogradnikov Maiolati Spontini, Marche · Italiya",
  },
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function giftPageStyles(): string {
  return `
    .gift-voucher {
      max-width: 680px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #e3e3df;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 18px 40px rgba(12, 12, 12, 0.08);
    }
    .gift-voucher-hero {
      padding: 34px 24px 28px;
      text-align: center;
      color: #fff;
      background:
        linear-gradient(180deg, rgba(12, 12, 12, 0.35) 0%, rgba(12, 12, 12, 0.78) 100%),
        radial-gradient(120% 90% at 50% 0%, #4a2f35 0%, #2a1519 45%, #0c0c0c 100%);
    }
    .gift-voucher-brand {
      margin: 0 0 18px;
      font-size: 0.78rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      opacity: 0.88;
    }
    .gift-voucher-hero h1 {
      margin: 0 0 8px;
      font-size: clamp(1.55rem, 5vw, 2.2rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }
    .gift-voucher-meta {
      margin: 0;
      color: rgba(255, 255, 255, 0.86);
      font-size: 1rem;
    }
    .gift-voucher-body {
      padding: 24px;
      display: grid;
      gap: 18px;
    }
    .gift-voucher-section {
      border-top: 1px dashed #d8d8d3;
      padding-top: 16px;
    }
    .gift-voucher-section:first-child {
      border-top: 0;
      padding-top: 0;
    }
    .gift-voucher-label {
      margin: 0 0 6px;
      color: #5f5f5b;
      font-size: 0.82rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .gift-voucher-gift {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0c0c0c;
    }
    .gift-voucher-message {
      margin: 0;
      padding: 14px 16px;
      border-left: 3px solid #6b1e2a;
      background: #f7f5f4;
      border-radius: 10px;
      font-size: 1.02rem;
      line-height: 1.55;
      color: #0c0c0c;
      font-style: italic;
    }
    .gift-voucher-actions {
      display: grid;
      gap: 10px;
    }
    .gift-voucher-note {
      margin: 0;
      color: #5f5f5b;
      font-size: 0.92rem;
      line-height: 1.45;
    }
    .gift-share {
      display: grid;
      gap: 12px;
      align-items: center;
    }
    .gift-share-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .gift-share-input {
      flex: 1 1 220px;
      min-width: 0;
      font-size: 0.88rem;
    }
    .gift-qr {
      width: 120px;
      height: 120px;
      border-radius: 12px;
      border: 1px solid #e3e3df;
      background: #fff;
    }
    .gift-voucher-footer {
      padding: 0 24px 24px;
      text-align: center;
      color: #5f5f5b;
      font-size: 0.86rem;
    }
    .no-print { }
    @media print {
      .site-announce, .site-header, .site-footer, .site-nav, .no-print { display: none !important; }
      body { background: #fff; }
      .page-main { padding: 0; }
      .gift-voucher {
        box-shadow: none;
        border: 1px solid #ccc;
        max-width: none;
      }
    }
    @media (min-width: 768px) {
      .gift-voucher-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .gift-share { grid-template-columns: 1fr auto; }
    }
  `;
}

export function renderGiftPageHtml(page: GiftPageRecord, shareUrl: string): string {
  const locale = page.language;
  const t = copy[locale];
  const occasion = formatOccasionLabel(locale, page.occasion);
  const ctaUrl = page.cta_url || "https://rootwinery.it";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shareUrl)}`;

  const messageBlock = page.personal_message
    ? `<section class="gift-voucher-section">
        <p class="gift-voucher-label">${t.messageLabel}</p>
        <p class="gift-voucher-message">“${escapeHtml(page.personal_message)}”</p>
      </section>`
    : "";

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(t.pageTitle)} · ${escapeHtml(page.recipient_name)} | ROOT</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      :root {
        --root-ink: #0c0c0c;
        --root-wine: #6b1e2a;
        --root-wine-hover: #551823;
        --root-bg: #f6f6f4;
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
      a { color: inherit; text-decoration: none; }
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
      }
      .brand {
        color: #fff;
        font-size: 1.35rem;
        font-weight: 600;
        letter-spacing: 0.18em;
      }
      .page-main { padding: 22px 14px 48px; }
      .btn, a.btn, button.btn {
        display: inline-block;
        border-radius: 999px;
        padding: 11px 16px;
        font: inherit;
        font-weight: 600;
        text-align: center;
        border: 0;
        cursor: pointer;
      }
      .btn-wine, a.btn-wine {
        background: var(--root-wine);
        color: #fff;
      }
      .btn-wine:hover { background: var(--root-wine-hover); }
      .btn-primary, a.btn-primary, button.btn-primary {
        background: var(--root-ink);
        color: #fff;
      }
      .btn-ghost, a.btn-ghost, button.btn-ghost {
        background: #fff;
        color: var(--root-ink);
        border: 1px solid #d8d8d3;
      }
      ${giftPageStyles()}
    </style>
  </head>
  <body>
    <div class="site-announce">ROOT Experience · Personal gift page</div>
    <header class="site-header no-print">
      <div class="site-header-inner">
        <a class="brand" href="https://rootwinery.it" rel="noopener noreferrer">ROOT</a>
      </div>
    </header>
    <main class="page-main">
      <article class="gift-voucher">
        <header class="gift-voucher-hero">
          <p class="gift-voucher-brand">ROOT Winery</p>
          <h1>${escapeHtml(t.forRecipient)} ${escapeHtml(page.recipient_name)}</h1>
          <p class="gift-voucher-meta">${escapeHtml(t.fromGiver)} ${escapeHtml(page.giver_name)}</p>
        </header>
        <div class="gift-voucher-body">
          <section class="gift-voucher-section">
            <p class="gift-voucher-label">${t.occasionLabel}</p>
            <p class="gift-voucher-gift">${escapeHtml(occasion)}</p>
          </section>
          <section class="gift-voucher-section">
            <p class="gift-voucher-label">${t.giftLabel}</p>
            <p class="gift-voucher-gift">${escapeHtml(page.recommended_gift_title)}</p>
          </section>
          ${messageBlock}
          <section class="gift-voucher-section gift-voucher-actions no-print">
            <a class="btn btn-wine" href="${escapeHtml(ctaUrl)}" target="_blank" rel="noopener noreferrer">${t.buyCta}</a>
            <a class="btn btn-primary" href="https://rootwinery.it" target="_blank" rel="noopener noreferrer">${t.prepareCta}</a>
          </section>
          <section class="gift-voucher-section no-print">
            <p class="gift-voucher-note">${escapeHtml(t.prepareNote)}</p>
          </section>
          <section class="gift-voucher-section no-print">
            <button class="btn btn-ghost" type="button" onclick="window.print()">${t.printCta}</button>
          </section>
          <section class="gift-voucher-section no-print">
            <p class="gift-voucher-label">${t.shareLabel}</p>
            <div class="gift-share">
              <div class="gift-share-row">
                <input class="gift-share-input" id="share-url" type="text" readonly value="${escapeHtml(shareUrl)}" />
                <button class="btn btn-primary" type="button" id="copy-link">${t.copyLink}</button>
              </div>
              <img class="gift-qr" src="${escapeHtml(qrUrl)}" alt="${escapeHtml(t.qrAlt)}" width="120" height="120" />
            </div>
          </section>
        </div>
        <footer class="gift-voucher-footer">${escapeHtml(t.footerNote)}</footer>
      </article>
    </main>
    <script>
      const copyBtn = document.getElementById("copy-link");
      const shareInput = document.getElementById("share-url");
      if (copyBtn && shareInput) {
        copyBtn.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(shareInput.value);
            copyBtn.textContent = ${JSON.stringify(t.copied)};
          } catch {
            shareInput.select();
            document.execCommand("copy");
            copyBtn.textContent = ${JSON.stringify(t.copied)};
          }
        });
      }
    </script>
  </body>
</html>`;
}

export function renderGiftPageNotFound(language: SupportedLanguage = "en"): string {
  const messages = {
    en: "This gift page is unavailable.",
    it: "Questa pagina regalo non e disponibile.",
    ru: "Etot podarochnyy sayt nedostupen.",
  };

  return `<!doctype html>
<html lang="${language}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gift page | ROOT</title>
  </head>
  <body style="font-family: Inter, Arial, sans-serif; padding: 40px; text-align: center;">
    <h1>${messages[language]}</h1>
    <p><a href="/gift?lang=${language}">ROOT Gift Constructor</a></p>
  </body>
</html>`;
}
