type Locale = "en" | "it" | "ru";

const copy: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    loading: string;
    recommendation: string;
    fallback: string;
    personalMessage: string;
    ctaShopify: string;
    ctaSubmit: string;
    leadTitle: string;
    fullName: string;
    email: string;
    phone: string;
    consent: string;
    submit: string;
    success: string;
    mockWarning: string;
    error: string;
    back: string;
  }
> = {
  en: {
    title: "Your Gift Recommendation",
    subtitle: "Tailored by ROOT Experience for a premium vineyard gifting moment.",
    loading: "Preparing your recommendation...",
    recommendation: "Best match",
    fallback: "Alternative ideas",
    personalMessage: "Your message",
    ctaShopify: "Open Shopify offer",
    ctaSubmit: "Send request to concierge",
    leadTitle: "Leave your details",
    fullName: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp (optional)",
    consent: "I agree to the processing of my data to receive the gift proposal.",
    submit: "Submit request",
    success: "Thank you! Your request has been received.",
    mockWarning: "Temporary mode: request saved with a mock adapter.",
    error: "Unable to submit now. Please try again.",
    back: "Back to Gift Constructor",
  },
  it: {
    title: "La tua raccomandazione regalo",
    subtitle: "Personalizzata da ROOT Experience per un dono premium tra i vigneti.",
    loading: "Prepariamo la tua raccomandazione...",
    recommendation: "Migliore proposta",
    fallback: "Idee alternative",
    personalMessage: "Il tuo messaggio",
    ctaShopify: "Apri offerta Shopify",
    ctaSubmit: "Invia richiesta al concierge",
    leadTitle: "Lascia i tuoi contatti",
    fullName: "Nome completo",
    email: "Email",
    phone: "Telefono / WhatsApp (opzionale)",
    consent: "Acconsento al trattamento dei miei dati per ricevere la proposta regalo.",
    submit: "Invia richiesta",
    success: "Grazie! La tua richiesta e stata ricevuta.",
    mockWarning: "Modalita temporanea: richiesta salvata con adapter mock.",
    error: "Impossibile inviare ora. Riprova.",
    back: "Torna al Costruttore Regalo",
  },
  ru: {
    title: "Vasha rekomendatsiya podarka",
    subtitle: "Podobrano ROOT Experience dlya premium podarka iz vinodelni.",
    loading: "Gotovim rekomendatsiyu...",
    recommendation: "Luchshiy variant",
    fallback: "Alternativnye idei",
    personalMessage: "Vashe soobshchenie",
    ctaShopify: "Otkryt' predlozhenie Shopify",
    ctaSubmit: "Otpravit' zapros kons'erzhu",
    leadTitle: "Ostav'te kontakty",
    fullName: "Polnoe imya",
    email: "Email",
    phone: "Telefon / WhatsApp (neobyazatel'no)",
    consent: "Ya soglasen na obrabotku dannykh dlya polucheniya predlozheniya.",
    submit: "Otpravit' zapros",
    success: "Spasibo! Vash zapros poluchen.",
    mockWarning: "Vremennyy rezhim: zapros sokhranen cherez mock adapter.",
    error: "Ne udalos' otpravit'. Poprobuyte snova.",
    back: "Nazad k podboru podarka",
  },
};

function getLocale(url: URL): Locale {
  const locale = (url.searchParams.get("lang") ?? "en").toLowerCase();
  if (locale === "it" || locale === "ru") {
    return locale;
  }
  return "en";
}

function renderResultPage(locale: Locale, searchParams: URLSearchParams): string {
  const t = copy[locale];

  const payload = {
    language: locale,
    occasion: searchParams.get("occasion") ?? "birthday",
    recipientProfile: searchParams.get("recipientProfile") ?? "partner",
    budgetBucket: searchParams.get("budgetBucket") ?? "75_150",
    giftType: searchParams.get("giftType") ?? "experience",
    personalMessage: searchParams.get("personalMessage") ?? "",
    alcoholFree: searchParams.get("giftType") === "non_alcoholic",
  };

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${t.title} | ROOT Experience</title>
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
        padding: 20px 14px 50px;
        max-width: 760px;
        margin: 0 auto;
      }
      .card {
        background: color-mix(in oklab, var(--card), white 10%);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 18px;
        margin-bottom: 14px;
        box-shadow: 0 12px 30px rgba(64, 42, 24, 0.08);
      }
      h1 { margin: 0 0 8px; font-size: 1.45rem; }
      .subtitle { margin: 0 0 8px; color: var(--muted); line-height: 1.4; }
      .label { color: var(--muted); font-size: 0.85rem; margin-bottom: 6px; }
      .gift-name { margin: 0; font-size: 1.12rem; font-weight: 700; }
      .gift-expl { margin: 8px 0 0; line-height: 1.45; }
      .fallback {
        border-top: 1px dashed var(--line);
        margin-top: 10px;
        padding-top: 10px;
      }
      .fallback-item { margin-top: 8px; }
      .message {
        border-left: 3px solid #b88454;
        padding: 8px 10px;
        background: #f8efe3;
        border-radius: 8px;
      }
      .actions {
        display: grid;
        gap: 8px;
        margin-top: 10px;
      }
      .btn {
        border: 0;
        border-radius: 999px;
        padding: 11px 14px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
      }
      .btn-primary {
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        color: #fff;
      }
      .btn-ghost {
        background: #e8ddcd;
        color: var(--ink);
      }
      form {
        display: grid;
        gap: 8px;
      }
      input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 10px;
      }
      .consent {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 0.9rem;
      }
      .status {
        margin-top: 8px;
        min-height: 20px;
        color: #245f30;
      }
      .status.error { color: #8a2923; }
      .back {
        display: inline-block;
        color: var(--muted);
        margin-top: 6px;
      }
      @media (min-width: 768px) {
        .wrap { padding-top: 34px; }
        .card { padding: 24px; }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <h1>${t.title}</h1>
        <p class="subtitle">${t.subtitle}</p>
        <div id="recommendation">${t.loading}</div>
      </section>

      <section class="card">
        <p class="label">${t.leadTitle}</p>
        <form id="lead-form">
          <input type="text" name="contactName" placeholder="${t.fullName}" required />
          <input type="email" name="email" placeholder="${t.email}" required />
          <input type="text" name="phoneOrWhatsApp" placeholder="${t.phone}" />
          <label class="consent">
            <input type="checkbox" name="consent" required />
            <span>${t.consent}</span>
          </label>
          <button class="btn btn-primary" type="submit">${t.submit}</button>
        </form>
        <p id="status" class="status"></p>
        <a class="back" href="/gift?lang=${locale}">${t.back}</a>
      </section>
    </main>
    <script type="application/json" id="copy-data">${JSON.stringify(t)}</script>
    <script type="application/json" id="payload">${JSON.stringify(payload)}</script>
    <script>
      const t = JSON.parse(document.getElementById("copy-data").textContent);
      const payload = JSON.parse(document.getElementById("payload").textContent);
      const recommendationEl = document.getElementById("recommendation");
      const formEl = document.getElementById("lead-form");
      const statusEl = document.getElementById("status");
      let recommendationId = "";
      let ctaUrl = "https://shopify.example.com/root-experience/gifts";

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
      }

      async function loadRecommendation() {
        const response = await fetch("/api/gift/recommendation", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!data.ok) {
          recommendationEl.innerHTML = '<p class="status error">' + t.error + "</p>";
          return;
        }

        recommendationId = data.recommendation.id;
        ctaUrl = data.recommendation.ctaUrl || ctaUrl;
        const fallbackHtml = (data.fallbacks || [])
          .map((item) =>
            '<div class="fallback-item"><strong>' + escapeHtml(item.name) + '</strong><br />' + escapeHtml(item.explanation) + "</div>",
          )
          .join("");

        const messageBlock = payload.personalMessage
          ? '<p class="label">' + t.personalMessage + '</p><div class="message">' + escapeHtml(payload.personalMessage) + "</div>"
          : "";

        recommendationEl.innerHTML =
          '<p class="label">' + t.recommendation + '</p>' +
          '<h2 class="gift-name">' + escapeHtml(data.recommendation.name) + "</h2>" +
          '<p class="gift-expl">' + escapeHtml(data.recommendation.explanation) + "</p>" +
          messageBlock +
          '<div class="actions">' +
          '<a class="btn btn-primary" href="' + escapeHtml(ctaUrl) + '" target="_blank" rel="noopener noreferrer">' + t.ctaShopify + "</a>" +
          '<a class="btn btn-ghost" href="#lead-form">' + t.ctaSubmit + "</a>" +
          "</div>" +
          '<div class="fallback"><p class="label">' + t.fallback + "</p>" + fallbackHtml + "</div>";
      }

      formEl.addEventListener("submit", async (event) => {
        event.preventDefault();
        statusEl.classList.remove("error");
        statusEl.textContent = "";

        if (!recommendationId) {
          statusEl.classList.add("error");
          statusEl.textContent = t.error;
          return;
        }

        const formData = new FormData(formEl);
        const body = {
          language: payload.language,
          contactName: String(formData.get("contactName") || ""),
          email: String(formData.get("email") || ""),
          phoneOrWhatsApp: String(formData.get("phoneOrWhatsApp") || ""),
          consent: formData.get("consent") === "on",
          recommendationId,
          answers: {
            occasion: payload.occasion,
            recipientProfile: payload.recipientProfile,
            budgetBucket: payload.budgetBucket,
            giftType: payload.giftType,
            personalMessage: payload.personalMessage,
            ctaUrl,
          },
        };

        const response = await fetch("/api/gift/lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();

        if (!data.ok) {
          statusEl.classList.add("error");
          statusEl.textContent = t.error;
          return;
        }

        statusEl.textContent = data.mock ? t.success + " " + t.mockWarning : t.success;
        formEl.reset();
      });

      loadRecommendation().catch(() => {
        recommendationEl.innerHTML = '<p class="status error">' + t.error + "</p>";
      });
    </script>
  </body>
</html>`;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const locale = getLocale(url);

  return new Response(renderResultPage(locale, url.searchParams), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
