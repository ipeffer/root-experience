import { giftPageCopy, formatOccasionLabel } from "./copy";
import { buildGiftStory, formatCertificateDate } from "./story";
import type { GiftPageRecord } from "./types";

export { formatOccasionLabel } from "./copy";

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
      position: relative;
      max-width: 680px;
      margin: 0 auto;
      background:
        linear-gradient(180deg, #fffef9 0%, #fff 28%, #fff 100%);
      border: 2px double #c9bfb0;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 18px 40px rgba(12, 12, 12, 0.08);
    }
    .gift-voucher::before,
    .gift-voucher::after {
      content: "";
      position: absolute;
      left: 18px;
      right: 18px;
      height: 1px;
      border-top: 1px dashed #d8d0c4;
      pointer-events: none;
    }
    .gift-voucher::before { top: 12px; }
    .gift-voucher::after { bottom: 12px; }
    .gift-certificate-badge {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px 24px 0;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #5f5f5b;
    }
    .gift-certificate-seal {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1rem;
      letter-spacing: 0.12em;
      color: #fff;
      background: radial-gradient(circle at 30% 30%, #6b1e2a, #3a1219 70%);
      border: 2px solid #6b1e2a;
      flex-shrink: 0;
    }
    .gift-voucher-hero {
      padding: 20px 24px 28px;
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
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(1.65rem, 5vw, 2.35rem);
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.12;
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
    .gift-voucher-story {
      margin: 0;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.2rem;
      line-height: 1.55;
      color: #2f261d;
    }
    .gift-voucher-message {
      margin: 0;
      padding: 14px 16px;
      border-left: 3px solid #6b1e2a;
      background: #f7f5f4;
      border-radius: 10px;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.15rem;
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
    .gift-moments {
      display: grid;
      gap: 8px;
    }
    .gift-moment {
      margin: 0;
      padding: 10px 12px;
      border-radius: 10px;
      background: #faf8f5;
      border: 1px solid #ece7df;
      color: #3f3a34;
      font-size: 0.92rem;
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
      border: 1px solid #d8d8d3;
      border-radius: 12px;
      padding: 10px 12px;
      font: inherit;
    }
    .gift-qr-wrap {
      text-align: center;
    }
    .gift-qr {
      width: 132px;
      height: 132px;
      border-radius: 12px;
      border: 2px solid #e3e3df;
      background: #fff;
      padding: 6px;
    }
    .gift-qr-caption {
      margin: 8px 0 0;
      font-size: 0.82rem;
      color: #5f5f5b;
    }
    .gift-voucher-footer {
      padding: 0 24px 24px;
      text-align: center;
      color: #5f5f5b;
      font-size: 0.86rem;
    }
    @media print {
      .site-announce, .site-header, .site-footer, .site-nav, .no-print { display: none !important; }
      body { background: #fff; }
      .page-main { padding: 0; }
      .gift-voucher {
        box-shadow: none;
        border: 2px double #6b1e2a;
        max-width: none;
      }
      .gift-certificate-seal { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
    @media (min-width: 768px) {
      .gift-voucher-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .gift-share { grid-template-columns: 1fr auto; }
      .gift-moments { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
  `;
}

export function renderGiftPageHtml(page: GiftPageRecord, revealUrl: string): string {
  const locale = page.language;
  const t = giftPageCopy[locale];
  const occasion = formatOccasionLabel(locale, page.occasion);
  const story = buildGiftStory(page);
  const certificateDate = formatCertificateDate(page.created_at, locale);
  const ctaUrl = page.cta_url || "https://rootwinery.it";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=132x132&data=${encodeURIComponent(revealUrl)}`;

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
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
      .btn-wine, a.btn-wine { background: var(--root-wine); color: #fff; }
      .btn-wine:hover { background: var(--root-wine-hover); }
      .btn-primary, a.btn-primary, button.btn-primary { background: var(--root-ink); color: #fff; }
      .btn-ghost, a.btn-ghost, button.btn-ghost {
        background: #fff;
        color: var(--root-ink);
        border: 1px solid #d8d8d3;
      }
      ${giftPageStyles()}
    </style>
  </head>
  <body>
    <div class="site-announce">ROOT Experience · Personal gift certificate</div>
    <header class="site-header no-print">
      <div class="site-header-inner">
        <a class="brand" href="https://rootwinery.it" rel="noopener noreferrer">ROOT</a>
      </div>
    </header>
    <main class="page-main">
      <article class="gift-voucher">
        <div class="gift-certificate-badge">
          <span>${escapeHtml(t.certificateLabel)} · ${escapeHtml(certificateDate)}</span>
          <div class="gift-certificate-seal" aria-hidden="true">R</div>
        </div>
        <header class="gift-voucher-hero">
          <p class="gift-voucher-brand">ROOT Winery</p>
          <h1>${escapeHtml(t.forRecipient)} ${escapeHtml(page.recipient_name)}</h1>
          <p class="gift-voucher-meta">${escapeHtml(t.fromGiver)} ${escapeHtml(page.giver_name)}</p>
        </header>
        <div class="gift-voucher-body">
          <section class="gift-voucher-section">
            <p class="gift-voucher-label">${t.storyLabel}</p>
            <p class="gift-voucher-story">${escapeHtml(story)}</p>
          </section>
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
            <p class="gift-voucher-label">${t.momentsTitle}</p>
            <div class="gift-moments">
              <p class="gift-moment">${escapeHtml(t.moment1)}</p>
              <p class="gift-moment">${escapeHtml(t.moment2)}</p>
              <p class="gift-moment">${escapeHtml(t.moment3)}</p>
            </div>
          </section>
          <section class="gift-voucher-section no-print">
            <button class="btn btn-ghost" type="button" onclick="window.print()">${t.printCta}</button>
          </section>
          <section class="gift-voucher-section no-print">
            <p class="gift-voucher-label">${t.shareLabel}</p>
            <p class="gift-voucher-note">${escapeHtml(t.shareHint)}</p>
            <div class="gift-share">
              <div class="gift-share-row">
                <input class="gift-share-input" id="share-url" type="text" readonly value="${escapeHtml(revealUrl)}" />
                <button class="btn btn-primary" type="button" id="copy-link">${t.copyLink}</button>
              </div>
              <div class="gift-qr-wrap">
                <img class="gift-qr" src="${escapeHtml(qrUrl)}" alt="${escapeHtml(t.qrAlt)}" width="132" height="132" />
                <p class="gift-qr-caption">${escapeHtml(t.qrCaption)}</p>
              </div>
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

export function renderGiftPageNotFound(language: "en" | "it" | "ru" = "en"): string {
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

export function buildGiftPageUrls(slug: string, language: string, origin: string): {
  certificateUrl: string;
  revealUrl: string;
} {
  const certificateUrl = new URL(`/gift/g/${slug}`, origin);
  certificateUrl.searchParams.set("lang", language);

  const revealUrl = new URL(`/gift/g/${slug}/open`, origin);
  revealUrl.searchParams.set("lang", language);

  return {
    certificateUrl: certificateUrl.toString(),
    revealUrl: revealUrl.toString(),
  };
}
