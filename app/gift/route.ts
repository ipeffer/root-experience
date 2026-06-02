import { renderPublicPage } from "../../lib/ui/publicPage";

type Locale = "en" | "it" | "ru";

const copy: Record<
  Locale,
  {
    langName: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    next: string;
    back: string;
    seeResult: string;
    labels: Record<string, string>;
    placeholders: { personalMessage: string };
    footer: string;
  }
> = {
  en: {
    langName: "English",
    title: "Gift Constructor",
    subtitle: "A warm vineyard-inspired journey to find the perfect ROOT Experience gift.",
    step1: "Select occasion",
    step2: "Select recipient profile",
    step3: "Select budget",
    step4: "Select gift type",
    step5: "Optional personal message",
    next: "Next",
    back: "Back",
    seeResult: "See recommendation",
    labels: {
      birthday: "Birthday",
      anniversary: "Anniversary",
      wedding: "Wedding",
      corporate: "Corporate",
      holiday: "Holiday",
      thank_you: "Thank you",
      just_because: "Just because",
      partner: "Partner",
      friend: "Friend",
      family: "Family",
      colleague: "Colleague",
      client: "Client",
      under_75: "Under EUR 75",
      "75_150": "EUR 75-150",
      "150_300": "EUR 150-300",
      over_300: "Over EUR 300",
      experience: "Experience",
      wine_set: "Wine set",
      non_alcoholic: "Non-alcoholic",
      food_pairing: "Food pairing",
      wellness: "Wellness",
      mixed: "Mixed surprise",
    },
    placeholders: {
      personalMessage: "Write a personal note (optional)",
    },
    footer: "ROOT Experience - Boutique winery gifts in Italy",
  },
  it: {
    langName: "Italiano",
    title: "Costruttore Regalo",
    subtitle: "Un percorso caldo e naturale tra i vigneti per trovare il regalo ROOT Experience.",
    step1: "Seleziona occasione",
    step2: "Seleziona profilo destinatario",
    step3: "Seleziona budget",
    step4: "Seleziona tipo regalo",
    step5: "Messaggio personale opzionale",
    next: "Avanti",
    back: "Indietro",
    seeResult: "Vedi raccomandazione",
    labels: {
      birthday: "Compleanno",
      anniversary: "Anniversario",
      wedding: "Matrimonio",
      corporate: "Aziendale",
      holiday: "Festivita",
      thank_you: "Ringraziamento",
      just_because: "Senza motivo",
      partner: "Partner",
      friend: "Amico/a",
      family: "Famiglia",
      colleague: "Collega",
      client: "Cliente",
      under_75: "Sotto 75 EUR",
      "75_150": "75-150 EUR",
      "150_300": "150-300 EUR",
      over_300: "Oltre 300 EUR",
      experience: "Esperienza",
      wine_set: "Set vino",
      non_alcoholic: "Analcolico",
      food_pairing: "Abbinamento cibo",
      wellness: "Benessere",
      mixed: "Sorpresa mista",
    },
    placeholders: {
      personalMessage: "Scrivi un messaggio personale (opzionale)",
    },
    footer: "ROOT Experience - Regali boutique di cantina in Italia",
  },
  ru: {
    langName: "Russkiy",
    title: "Podbor podarka",
    subtitle: "Tepliy put po ital'yanskim vinogradnikam dlya ideal'nogo podarka ROOT Experience.",
    step1: "Vyberite povod",
    step2: "Profil poluchatelya",
    step3: "Byudzhet",
    step4: "Tip podarka",
    step5: "Lichnoe soobshchenie (neobyazatel'no)",
    next: "Dalee",
    back: "Nazad",
    seeResult: "Poluchit rekomendatsiyu",
    labels: {
      birthday: "Den' rozhdeniya",
      anniversary: "Godovshchina",
      wedding: "Svad'ba",
      corporate: "Korporativnyy",
      holiday: "Prazdnik",
      thank_you: "Blagodarnost'",
      just_because: "Prosto tak",
      partner: "Partner",
      friend: "Drug",
      family: "Sem'ya",
      colleague: "Kollega",
      client: "Klient",
      under_75: "Do 75 EUR",
      "75_150": "75-150 EUR",
      "150_300": "150-300 EUR",
      over_300: "Bolee 300 EUR",
      experience: "Vpechatlenie",
      wine_set: "Vinnyy nabor",
      non_alcoholic: "Bez alkogolya",
      food_pairing: "Gastronomicheskiy nabor",
      wellness: "Wellness",
      mixed: "Smeshannyy syurpriz",
    },
    placeholders: {
      personalMessage: "Napishite lichnoe soobshchenie (neobyazatel'no)",
    },
    footer: "ROOT Experience - Butikovye vinodelcheskie podarki iz Italii",
  },
};

const wizardModel = {
  stepKeys: ["occasion", "recipientProfile", "budgetBucket", "giftType", "personalMessage"] as const,
  options: {
    occasion: [
      "birthday",
      "anniversary",
      "wedding",
      "corporate",
      "holiday",
      "thank_you",
      "just_because",
    ],
    recipientProfile: ["partner", "friend", "family", "colleague", "client"],
    budgetBucket: ["under_75", "75_150", "150_300", "over_300"],
    giftType: ["experience", "wine_set", "non_alcoholic", "food_pairing", "wellness", "mixed"],
  },
};

function getLocale(url: URL): Locale {
  const locale = (url.searchParams.get("lang") ?? "en").toLowerCase();
  if (locale === "it" || locale === "ru") {
    return locale;
  }
  return "en";
}

function renderGiftPage(locale: Locale): string {
  const t = copy[locale];

  const body = `
      <section class="page-card">
        <div class="lang">
          <select id="lang">
            <option value="en"${locale === "en" ? " selected" : ""}>English</option>
            <option value="it"${locale === "it" ? " selected" : ""}>Italiano</option>
            <option value="ru"${locale === "ru" ? " selected" : ""}>Russkiy</option>
          </select>
        </div>
        <h1>${t.title}</h1>
        <p class="subtitle">${t.subtitle}</p>
        <div class="progress"><span id="progress-bar" style="width: 20%"></span></div>
        <div id="step-title" class="step-title"></div>
        <div id="step-body"></div>
        <div class="nav">
          <button id="back-btn" class="ghost">${t.back}</button>
          <button id="next-btn" class="primary">${t.next}</button>
        </div>
        <p class="inline-footer">${t.footer}</p>
      </section>`;

  const scripts = `
    <script type="application/json" id="copy-data">${JSON.stringify(t)}</script>
    <script type="application/json" id="wizard-model">${JSON.stringify(wizardModel)}</script>
    <script>
      const t = JSON.parse(document.getElementById("copy-data").textContent);
      const model = JSON.parse(document.getElementById("wizard-model").textContent);
      let step = 0;
      const answers = {
        occasion: "birthday",
        recipientProfile: "partner",
        budgetBucket: "75_150",
        giftType: "experience",
        personalMessage: "",
      };
      const stepTitles = [t.step1, t.step2, t.step3, t.step4, t.step5];

      const titleEl = document.getElementById("step-title");
      const bodyEl = document.getElementById("step-body");
      const progressEl = document.getElementById("progress-bar");
      const backBtn = document.getElementById("back-btn");
      const nextBtn = document.getElementById("next-btn");
      const langEl = document.getElementById("lang");

      langEl.addEventListener("change", () => {
        const lang = langEl.value;
        window.location.href = "/gift?lang=" + encodeURIComponent(lang);
      });

      function renderChoices(key) {
        const choices = model.options[key];
        return '<div class="grid">' + choices.map((value) => {
          const selected = answers[key] === value ? " selected" : "";
          return '<button class="choice' + selected + '" data-key="' + key + '" data-value="' + value + '">' + (t.labels[value] || value) + '</button>';
        }).join("") + "</div>";
      }

      function renderStep() {
        titleEl.textContent = stepTitles[step];
        progressEl.style.width = ((step + 1) / stepTitles.length) * 100 + "%";
        backBtn.style.visibility = step === 0 ? "hidden" : "visible";
        nextBtn.textContent = step === stepTitles.length - 1 ? t.seeResult : t.next;

        const key = model.stepKeys[step];
        if (key === "personalMessage") {
          bodyEl.innerHTML = '<textarea id="personal-message" placeholder="' + t.placeholders.personalMessage + '"></textarea>';
          document.getElementById("personal-message").value = answers.personalMessage || "";
          return;
        }

        bodyEl.innerHTML = renderChoices(key);
        bodyEl.querySelectorAll(".choice").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const el = event.currentTarget;
            answers[el.dataset.key] = el.dataset.value;
            renderStep();
          });
        });
      }

      backBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (step > 0) {
          if (model.stepKeys[step] === "personalMessage") {
            const area = document.getElementById("personal-message");
            answers.personalMessage = area ? area.value : "";
          }
          step -= 1;
          renderStep();
        }
      });

      nextBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (model.stepKeys[step] === "personalMessage") {
          const area = document.getElementById("personal-message");
          answers.personalMessage = area ? area.value.trim() : "";
        }

        if (step < stepTitles.length - 1) {
          step += 1;
          renderStep();
          return;
        }

        const query = new URLSearchParams({
          lang: langEl.value,
          occasion: answers.occasion,
          recipientProfile: answers.recipientProfile,
          budgetBucket: answers.budgetBucket,
          giftType: answers.giftType,
          personalMessage: answers.personalMessage,
        });
        window.location.href = "/gift/result?" + query.toString();
      });

      renderStep();
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
  const locale = getLocale(new URL(request.url));
  return new Response(renderGiftPage(locale), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
