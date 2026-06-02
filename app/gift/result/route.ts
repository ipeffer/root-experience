import { renderPublicPage } from "../../../lib/ui/publicPage";

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
    recipientName: string;
    giverName: string;
    personalMessageField: string;
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
    ctaSubmit: "Create your gift page",
    leadTitle: "Personalize and share your gift",
    recipientName: "Recipient name",
    giverName: "Your name (giver)",
    personalMessageField: "Personal message for the recipient",
    email: "Your email",
    phone: "Phone / WhatsApp (optional)",
    consent: "I agree to the processing of my data to receive the gift proposal.",
    submit: "Create gift page",
    success: "Your personalized gift page is ready.",
    mockWarning: "Temporary mode: saved with a mock adapter.",
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
    ctaSubmit: "Crea la tua pagina regalo",
    leadTitle: "Personalizza e condividi il tuo regalo",
    recipientName: "Nome del destinatario",
    giverName: "Il tuo nome (mittente)",
    personalMessageField: "Messaggio personale per il destinatario",
    email: "La tua email",
    phone: "Telefono / WhatsApp (opzionale)",
    consent: "Acconsento al trattamento dei miei dati per ricevere la proposta regalo.",
    submit: "Crea pagina regalo",
    success: "La tua pagina regalo personalizzata e pronta.",
    mockWarning: "Modalita temporanea: salvato con adapter mock.",
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
    ctaSubmit: "Sozdat' podarochnuyu stranitsu",
    leadTitle: "Personaliziruyte i podelites' podarkom",
    recipientName: "Imya poluchatelya",
    giverName: "Vashe imya (daritel')",
    personalMessageField: "Lichnoe poslanie dlya poluchatelya",
    email: "Vash email",
    phone: "Telefon / WhatsApp (neobyazatel'no)",
    consent: "Ya soglasen na obrabotku dannykh dlya polucheniya predlozheniya.",
    submit: "Sozdat' podarochnuyu stranitsu",
    success: "Vasha personalizirovannaya stranitsa gotova.",
    mockWarning: "Vremennyy rezhim: sokhraneno cherez mock adapter.",
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

  const body = `
      <div class="page-stack">
        <section class="page-card">
          <h1>${t.title}</h1>
          <p class="subtitle">${t.subtitle}</p>
          <div id="recommendation">${t.loading}</div>
        </section>
        <section class="page-card">
          <p class="label">${t.leadTitle}</p>
          <form id="lead-form">
            <input type="text" name="recipientName" placeholder="${t.recipientName}" required />
            <input type="text" name="giverName" placeholder="${t.giverName}" required />
            <textarea name="personalMessage" placeholder="${t.personalMessageField}">${payload.personalMessage}</textarea>
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
      </div>`;

  const scripts = `
    <script type="application/json" id="copy-data">${JSON.stringify(t)}</script>
    <script type="application/json" id="payload">${JSON.stringify(payload)}</script>
    <script>
      const t = JSON.parse(document.getElementById("copy-data").textContent);
      const payload = JSON.parse(document.getElementById("payload").textContent);
      const recommendationEl = document.getElementById("recommendation");
      const formEl = document.getElementById("lead-form");
      const statusEl = document.getElementById("status");
      let recommendationId = "";
      let recommendationTitle = "";
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
        recommendationTitle = data.recommendation.name;
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
          '<a class="btn btn-wine" href="' + escapeHtml(ctaUrl) + '" target="_blank" rel="noopener noreferrer">' + t.ctaShopify + "</a>" +
          '<a class="btn btn-primary" href="#lead-form">' + t.ctaSubmit + "</a>" +
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
          recipientName: String(formData.get("recipientName") || ""),
          giverName: String(formData.get("giverName") || ""),
          personalMessage: String(formData.get("personalMessage") || ""),
          email: String(formData.get("email") || ""),
          phoneOrWhatsApp: String(formData.get("phoneOrWhatsApp") || ""),
          consent: formData.get("consent") === "on",
          recommendationId,
          recommendationTitle,
          ctaUrl,
          occasion: payload.occasion,
          answers: {
            recipientProfile: payload.recipientProfile,
            budgetBucket: payload.budgetBucket,
            giftType: payload.giftType,
          },
        };

        const response = await fetch("/api/gift/lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();

        if (!data.ok || !data.giftPageUrl) {
          statusEl.classList.add("error");
          const detail = Array.isArray(data.details) && data.details.length > 0
            ? data.details.join(", ")
            : (data.message || "");
          statusEl.textContent = detail ? t.error + " " + detail : t.error;
          return;
        }

        if (data.mock) {
          statusEl.textContent = t.success + " " + t.mockWarning;
        }

        window.location.href = data.giftPageUrl;
      });

      loadRecommendation().catch(() => {
        recommendationEl.innerHTML = '<p class="status error">' + t.error + "</p>";
      });
    </script>`;

  return renderPublicPage({
    locale,
    title: `${t.title} | ROOT Experience`,
    activeNav: "gift",
    body,
    scripts,
  });
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
