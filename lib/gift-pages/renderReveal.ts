import { revealCopy } from "./copy";
import type { GiftPageRecord } from "./types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderGiftRevealHtml(page: GiftPageRecord, certificateUrl: string): string {
  const locale = page.language;
  const t = revealCopy[locale];

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(t.title)} | ROOT</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px 16px;
        font-family: Inter, "Helvetica Neue", Arial, sans-serif;
        color: #f5f5f4;
        background:
          radial-gradient(120% 80% at 50% 0%, rgba(107, 30, 42, 0.35) 0%, transparent 55%),
          radial-gradient(90% 70% at 50% 100%, rgba(61, 90, 58, 0.18) 0%, transparent 60%),
          #0c0c0c;
      }
      .reveal-card {
        width: min(520px, 100%);
        text-align: center;
        padding: 42px 28px 34px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(8px);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        animation: reveal-rise 0.9s ease both;
      }
      .reveal-seal {
        width: 72px;
        height: 72px;
        margin: 0 auto 22px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 1.35rem;
        letter-spacing: 0.18em;
        color: #f5f5f4;
        border: 2px solid rgba(107, 30, 42, 0.8);
        background: radial-gradient(circle at 30% 30%, #6b1e2a, #3a1219 70%);
        box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.06);
        animation: reveal-pulse 2.4s ease-in-out infinite;
      }
      .reveal-eyebrow {
        margin: 0 0 12px;
        font-size: 0.72rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        opacity: 0.75;
      }
      h1 {
        margin: 0 0 10px;
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: clamp(1.8rem, 6vw, 2.4rem);
        font-weight: 600;
        line-height: 1.15;
      }
      .reveal-names {
        margin: 0 0 14px;
        font-size: 1.05rem;
        color: rgba(255, 255, 255, 0.88);
      }
      .reveal-hint {
        margin: 0 0 24px;
        color: rgba(255, 255, 255, 0.68);
        line-height: 1.5;
        font-size: 0.95rem;
      }
      .btn-open {
        display: inline-block;
        border: 0;
        border-radius: 999px;
        padding: 13px 22px;
        font: inherit;
        font-weight: 600;
        color: #fff;
        background: #6b1e2a;
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .btn-open:hover {
        background: #551823;
        transform: translateY(-1px);
      }
      .reveal-skip {
        display: inline-block;
        margin-top: 16px;
        color: rgba(255, 255, 255, 0.55);
        font-size: 0.86rem;
        text-decoration: underline;
      }
      @keyframes reveal-rise {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes reveal-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }
    </style>
  </head>
  <body>
    <section class="reveal-card">
      <div class="reveal-seal" aria-hidden="true">R</div>
      <p class="reveal-eyebrow">${escapeHtml(t.eyebrow)}</p>
      <h1>${escapeHtml(t.title)}</h1>
      <p class="reveal-names">${escapeHtml(t.forRecipient)} ${escapeHtml(page.recipient_name)}<br />${escapeHtml(t.fromGiver)} ${escapeHtml(page.giver_name)}</p>
      <p class="reveal-hint">${escapeHtml(t.hint)}</p>
      <a class="btn-open" id="open-gift" href="${escapeHtml(certificateUrl)}">${escapeHtml(t.openCta)}</a>
      <br />
      <a class="reveal-skip" href="${escapeHtml(certificateUrl)}">${escapeHtml(t.viewCertificate)}</a>
    </section>
    <script>
      const openBtn = document.getElementById("open-gift");
      if (openBtn) {
        openBtn.addEventListener("click", () => {
          openBtn.style.opacity = "0.85";
        });
      }
    </script>
  </body>
</html>`;
}
