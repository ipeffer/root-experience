import { localeQuery, resolvePublicLocale, type PublicLocale } from "../../lib/i18n/publicLocale";

const languageOptions = [
  { value: "en", labelKey: "langEnglish" },
  { value: "it", labelKey: "langItalian" },
  { value: "ru", labelKey: "langRussian" },
] as const;

const experienceOptionKeys = [
  "vineyard_tour",
  "buggy_wine_tour",
  "wine_tasting",
  "picnic_romantic_experience",
  "private_group_request",
  "corporate_special_event",
] as const;

const copy: Record<PublicLocale, Record<string, string>> = {
  en: {
    title: "ROOT Experience Booking Assistant",
    subtitle:
      "Send your request in a few steps. This is not an instant booking. ROOT will confirm availability personally.",
    requestNotice: "ROOT will confirm availability personally.",
    step1: "Choose experience type",
    step2: "Number of guests",
    step3: "Preferred language",
    step4: "Preferred dates and time",
    step5: "Contact details",
    step6: "Consent",
    next: "Next",
    back: "Back",
    submit: "Send booking request",
    sending: "Sending your request...",
    error: "Unable to send request right now. Please try again.",
    consentLabel:
      "I agree to the processing of my personal data for ROOT Experience to contact me about this booking request.",
    confirmHeader: "Review before submit",
    confirmRequestOnly:
      "This is a request only, not a confirmed booking. ROOT will confirm availability personally.",
    fullNamePlaceholder: "Full name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone / WhatsApp (optional)",
    notesPlaceholder: "Additional details (optional)",
    reviewExperience: "Experience",
    reviewGuests: "Guests",
    reviewLanguage: "Language",
    reviewPreferredDate: "Preferred date",
    reviewPreferredTime: "Preferred time",
    reviewContact: "Contact",
    validateGuests: "Please provide a valid number of guests (1-200).",
    validateDateTime: "Please select preferred date and time.",
    validateContact: "Please provide your name and email.",
    validateConsent: "Please accept consent to continue.",
    langEnglish: "English",
    langItalian: "Italian",
    langRussian: "Russian",
    opt_vineyard_tour: "Vineyard tour",
    opt_buggy_wine_tour: "Buggy wine tour",
    opt_wine_tasting: "Wine tasting",
    opt_picnic_romantic_experience: "Picnic / romantic experience",
    opt_private_group_request: "Private group request",
    opt_corporate_special_event: "Corporate / special event",
  },
  it: {
    title: "Assistente Prenotazioni ROOT Experience",
    subtitle:
      "Invia la tua richiesta in pochi passaggi. Non e una prenotazione istantanea. ROOT confermera personalmente la disponibilita.",
    requestNotice: "ROOT confermera personalmente la disponibilita.",
    step1: "Scegli il tipo di esperienza",
    step2: "Numero di ospiti",
    step3: "Lingua preferita",
    step4: "Date e orario preferiti",
    step5: "Dettagli di contatto",
    step6: "Consenso",
    next: "Avanti",
    back: "Indietro",
    submit: "Invia richiesta di prenotazione",
    sending: "Invio della richiesta...",
    error: "Impossibile inviare la richiesta ora. Riprova.",
    consentLabel:
      "Acconsento al trattamento dei miei dati personali per essere ricontattato da ROOT Experience su questa richiesta di prenotazione.",
    confirmHeader: "Rivedi prima di inviare",
    confirmRequestOnly:
      "Questa e solo una richiesta, non una prenotazione confermata. ROOT confermera personalmente la disponibilita.",
    fullNamePlaceholder: "Nome completo",
    emailPlaceholder: "Email",
    phonePlaceholder: "Telefono / WhatsApp (opzionale)",
    notesPlaceholder: "Dettagli aggiuntivi (opzionale)",
    reviewExperience: "Esperienza",
    reviewGuests: "Ospiti",
    reviewLanguage: "Lingua",
    reviewPreferredDate: "Data preferita",
    reviewPreferredTime: "Orario preferito",
    reviewContact: "Contatto",
    validateGuests: "Inserisci un numero valido di ospiti (1-200).",
    validateDateTime: "Seleziona data e orario preferiti.",
    validateContact: "Inserisci nome ed email.",
    validateConsent: "Accetta il consenso per continuare.",
    langEnglish: "Inglese",
    langItalian: "Italiano",
    langRussian: "Russo",
    opt_vineyard_tour: "Tour in vigna",
    opt_buggy_wine_tour: "Tour in buggy tra i vigneti",
    opt_wine_tasting: "Degustazione vino",
    opt_picnic_romantic_experience: "Picnic / esperienza romantica",
    opt_private_group_request: "Richiesta gruppo privato",
    opt_corporate_special_event: "Evento aziendale / speciale",
  },
  ru: {
    title: "Pomoshchnik bronirovaniya ROOT Experience",
    subtitle:
      "Otpravte zapros v neskolko shagov. Eto ne mgnovennoe bronirovanie. ROOT lichno podtverdit dostupnost.",
    requestNotice: "ROOT lichno podtverdit dostupnost.",
    step1: "Vyberite tip opyta",
    step2: "Kolichestvo gostey",
    step3: "Predpochtitelnyy yazyk",
    step4: "Predpochtitelnye data i vremya",
    step5: "Kontaktnye dannye",
    step6: "Soglasie",
    next: "Dalee",
    back: "Nazad",
    submit: "Otpravit zapros na bron",
    sending: "Otpravlyaem vash zapros...",
    error: "Ne udalos otpravit zapros. Pozhaluysta, poprobuyte snova.",
    consentLabel:
      "Ya soglasen na obrabotku moikh personalnykh dannykh, chtoby ROOT Experience mog svyazatsya so mnoy po etomu zaprosu.",
    confirmHeader: "Proverte pered otpravkoy",
    confirmRequestOnly:
      "Eto tolko zapros, a ne podtverzhdennoe bronirovanie. ROOT lichno podtverdit dostupnost.",
    fullNamePlaceholder: "Polnoe imya",
    emailPlaceholder: "Email",
    phonePlaceholder: "Telefon / WhatsApp (neobyazatelno)",
    notesPlaceholder: "Dopolnitelnye detali (neobyazatelno)",
    reviewExperience: "Opyt",
    reviewGuests: "Gosti",
    reviewLanguage: "Yazyk",
    reviewPreferredDate: "Predpochtitelnaya data",
    reviewPreferredTime: "Predpochtitelnoe vremya",
    reviewContact: "Kontakt",
    validateGuests: "Ukazhite korrektnoe chislo gostey (1-200).",
    validateDateTime: "Vyberite predpochtitelnye datu i vremya.",
    validateContact: "Ukazhite imya i email.",
    validateConsent: "Primite soglasie, chtoby prodolzhit.",
    langEnglish: "Angliyskiy",
    langItalian: "Italyanskiy",
    langRussian: "Russkiy",
    opt_vineyard_tour: "Ekskursiya po vinogradniku",
    opt_buggy_wine_tour: "Vintur na buggy",
    opt_wine_tasting: "Degustatsiya vina",
    opt_picnic_romantic_experience: "Piknik / romanticheskiy opyt",
    opt_private_group_request: "Zapros dlya chastnoy gruppy",
    opt_corporate_special_event: "Korporativnoe / spetsialnoe meropriyatie",
  },
};

function renderBookingPage(locale: PublicLocale): string {
  const t = copy[locale];
  const experienceOptions = experienceOptionKeys.map((value) => ({
    value,
    label: t[`opt_${value}`],
  }));
  const localizedLanguageOptions = languageOptions.map((option) => ({
    value: option.value,
    label: t[option.labelKey],
  }));

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
      .wrap { min-height: 100vh; padding: 20px 14px 40px; }
      .card {
        max-width: 740px;
        margin: 0 auto;
        background: color-mix(in oklab, var(--card), white 10%);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 20px 16px;
        box-shadow: 0 12px 30px rgba(64, 42, 24, 0.08);
      }
      h1 { margin: 0 0 8px; font-size: 1.5rem; }
      .subtitle { margin: 0 0 12px; color: var(--muted); line-height: 1.35; }
      .notice {
        margin: 0 0 16px;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid #d8b995;
        background: #f9edde;
        color: #5d3a1f;
        font-weight: 600;
      }
      .progress {
        height: 8px;
        width: 100%;
        border-radius: 999px;
        background: #eadfcd;
        margin: 8px 0 20px;
        overflow: hidden;
      }
      .progress > span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        transition: width 0.2s ease;
      }
      .step-title { font-weight: 600; margin-bottom: 10px; }
      .grid { display: grid; gap: 10px; }
      .choice, input, select, textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 12px;
        background: #fff;
        color: var(--ink);
        font-size: 0.95rem;
      }
      .choice {
        text-align: left;
        cursor: pointer;
      }
      .choice.selected {
        border-color: var(--accent);
        background: #f5eadf;
      }
      textarea { min-height: 100px; resize: vertical; }
      .row-2 {
        display: grid;
        gap: 10px;
      }
      .consent {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        line-height: 1.35;
      }
      .consent input {
        width: 18px;
        height: 18px;
        margin-top: 2px;
      }
      .review {
        margin-top: 10px;
        padding: 12px;
        background: #fff;
        border: 1px dashed var(--line);
        border-radius: 12px;
      }
      .review p { margin: 0 0 8px; }
      .review p:last-child { margin: 0; }
      .nav {
        margin-top: 18px;
        display: flex;
        gap: 8px;
      }
      button {
        border: 0;
        border-radius: 999px;
        padding: 11px 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .ghost { background: #e8ddcd; color: var(--ink); }
      .primary {
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        color: #fff;
        margin-left: auto;
      }
      .status {
        margin-top: 10px;
        min-height: 20px;
        color: #8a2923;
      }
      @media (min-width: 768px) {
        .wrap { padding: 34px 20px 70px; }
        .card { padding: 30px; }
        .row-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <h1>${t.title}</h1>
        <p class="subtitle">${t.subtitle}</p>
        <p class="notice">${t.requestNotice}</p>
        <div class="progress"><span id="progress-bar" style="width: 16.66%"></span></div>
        <div id="step-title" class="step-title"></div>
        <div id="step-body"></div>
        <p id="status" class="status"></p>
        <div class="nav">
          <button id="back-btn" class="ghost">${t.back}</button>
          <button id="next-btn" class="primary">${t.next}</button>
        </div>
      </section>
    </main>
    <script type="application/json" id="copy-data">${JSON.stringify(t)}</script>
    <script type="application/json" id="experience-options">${JSON.stringify(experienceOptions)}</script>
    <script type="application/json" id="language-options">${JSON.stringify(localizedLanguageOptions)}</script>
    <script type="application/json" id="locale-data">${JSON.stringify({ locale, confirmationPath: "/booking/confirmation" })}</script>
    <script>
      const t = JSON.parse(document.getElementById("copy-data").textContent);
      const experienceOptions = JSON.parse(document.getElementById("experience-options").textContent);
      const languageOptions = JSON.parse(document.getElementById("language-options").textContent);
      const localeData = JSON.parse(document.getElementById("locale-data").textContent);

      const stepTitles = [t.step1, t.step2, t.step3, t.step4, t.step5, t.step6];
      let step = 0;
      const values = {
        experienceType: "vineyard_tour",
        guests: "2",
        preferredLanguage: localeData.locale,
        preferredDate: "",
        preferredTime: "",
        contactName: "",
        email: "",
        phoneOrWhatsApp: "",
        notes: "",
        consent: false,
      };

      const titleEl = document.getElementById("step-title");
      const bodyEl = document.getElementById("step-body");
      const progressEl = document.getElementById("progress-bar");
      const backBtn = document.getElementById("back-btn");
      const nextBtn = document.getElementById("next-btn");
      const statusEl = document.getElementById("status");

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
      }

      function renderExperienceStep() {
        bodyEl.innerHTML =
          '<div class="grid">' +
          experienceOptions
            .map((option) => {
              const selected = values.experienceType === option.value ? " selected" : "";
              return (
                '<button class="choice' +
                selected +
                '" data-value="' +
                escapeHtml(option.value) +
                '">' +
                escapeHtml(option.label) +
                "</button>"
              );
            })
            .join("") +
          "</div>";

        bodyEl.querySelectorAll(".choice").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const target = event.currentTarget;
            values.experienceType = target.getAttribute("data-value") || values.experienceType;
            renderStep();
          });
        });
      }

      function renderGuestsStep() {
        bodyEl.innerHTML =
          '<input id="guests" type="number" min="1" max="200" step="1" value="' + escapeHtml(values.guests) + '" required />';
      }

      function renderLanguageStep() {
        bodyEl.innerHTML =
          '<select id="preferred-language">' +
          languageOptions
            .map((option) => {
              const selected = values.preferredLanguage === option.value ? " selected" : "";
              return (
                '<option value="' + escapeHtml(option.value) + '"' + selected + ">" + escapeHtml(option.label) + "</option>"
              );
            })
            .join("") +
          "</select>";
      }

      function renderDateTimeStep() {
        bodyEl.innerHTML =
          '<div class="row-2">' +
          '<input id="preferred-date" type="date" value="' + escapeHtml(values.preferredDate) + '" required />' +
          '<input id="preferred-time" type="time" value="' + escapeHtml(values.preferredTime) + '" required />' +
          "</div>";
      }

      function renderContactStep() {
        bodyEl.innerHTML =
          '<div class="grid">' +
          '<input id="contact-name" type="text" placeholder="' + escapeHtml(t.fullNamePlaceholder) + '" value="' + escapeHtml(values.contactName) + '" required />' +
          '<input id="contact-email" type="email" placeholder="' + escapeHtml(t.emailPlaceholder) + '" value="' + escapeHtml(values.email) + '" required />' +
          '<input id="contact-phone" type="text" placeholder="' + escapeHtml(t.phonePlaceholder) + '" value="' + escapeHtml(values.phoneOrWhatsApp) + '" />' +
          '<textarea id="contact-notes" placeholder="' + escapeHtml(t.notesPlaceholder) + '">' + escapeHtml(values.notes) + "</textarea>" +
          "</div>";
      }

      function renderConsentStep() {
        const languageLabel = languageOptions.find((option) => option.value === values.preferredLanguage)?.label || t.langEnglish;
        const experienceLabel =
          experienceOptions.find((option) => option.value === values.experienceType)?.label || values.experienceType;
        const checked = values.consent ? " checked" : "";

        bodyEl.innerHTML =
          '<p><strong>' + t.confirmHeader + "</strong></p>" +
          '<div class="review">' +
          "<p><strong>" + t.reviewExperience + ":</strong> " + escapeHtml(experienceLabel) + "</p>" +
          "<p><strong>" + t.reviewGuests + ":</strong> " + escapeHtml(values.guests) + "</p>" +
          "<p><strong>" + t.reviewLanguage + ":</strong> " + escapeHtml(languageLabel) + "</p>" +
          "<p><strong>" + t.reviewPreferredDate + ":</strong> " + escapeHtml(values.preferredDate) + "</p>" +
          "<p><strong>" + t.reviewPreferredTime + ":</strong> " + escapeHtml(values.preferredTime) + "</p>" +
          "<p><strong>" + t.reviewContact + ":</strong> " + escapeHtml(values.contactName) + " / " + escapeHtml(values.email) + "</p>" +
          "</div>" +
          '<p class="notice" style="margin-top:10px;">' + t.confirmRequestOnly + "</p>" +
          '<label class="consent">' +
          '<input id="consent" type="checkbox"' + checked + " />" +
          "<span>" + t.consentLabel + "</span>" +
          "</label>";
      }

      function syncCurrentStepValues() {
        if (step === 1) {
          const guestsEl = document.getElementById("guests");
          values.guests = guestsEl ? guestsEl.value : values.guests;
        }
        if (step === 2) {
          const languageEl = document.getElementById("preferred-language");
          values.preferredLanguage = languageEl ? languageEl.value : values.preferredLanguage;
        }
        if (step === 3) {
          const dateEl = document.getElementById("preferred-date");
          const timeEl = document.getElementById("preferred-time");
          values.preferredDate = dateEl ? dateEl.value : values.preferredDate;
          values.preferredTime = timeEl ? timeEl.value : values.preferredTime;
        }
        if (step === 4) {
          const nameEl = document.getElementById("contact-name");
          const emailEl = document.getElementById("contact-email");
          const phoneEl = document.getElementById("contact-phone");
          const notesEl = document.getElementById("contact-notes");
          values.contactName = nameEl ? nameEl.value.trim() : values.contactName;
          values.email = emailEl ? emailEl.value.trim() : values.email;
          values.phoneOrWhatsApp = phoneEl ? phoneEl.value.trim() : values.phoneOrWhatsApp;
          values.notes = notesEl ? notesEl.value.trim() : values.notes;
        }
        if (step === 5) {
          const consentEl = document.getElementById("consent");
          values.consent = Boolean(consentEl && consentEl.checked);
        }
      }

      function validateCurrentStep() {
        if (step === 1) {
          const guests = Number(values.guests);
          return Number.isInteger(guests) && guests >= 1 && guests <= 200;
        }
        if (step === 3) {
          return Boolean(values.preferredDate) && Boolean(values.preferredTime);
        }
        if (step === 4) {
          return Boolean(values.contactName) && Boolean(values.email);
        }
        if (step === 5) {
          return values.consent === true;
        }
        return true;
      }

      function getValidationMessage() {
        if (step === 1) {
          return t.validateGuests;
        }
        if (step === 3) {
          return t.validateDateTime;
        }
        if (step === 4) {
          return t.validateContact;
        }
        if (step === 5) {
          return t.validateConsent;
        }
        return t.error;
      }

      function renderStep() {
        titleEl.textContent = stepTitles[step];
        progressEl.style.width = ((step + 1) / stepTitles.length) * 100 + "%";
        backBtn.style.visibility = step === 0 ? "hidden" : "visible";
        nextBtn.textContent = step === stepTitles.length - 1 ? t.submit : t.next;
        statusEl.textContent = "";

        if (step === 0) {
          renderExperienceStep();
          return;
        }
        if (step === 1) {
          renderGuestsStep();
          return;
        }
        if (step === 2) {
          renderLanguageStep();
          return;
        }
        if (step === 3) {
          renderDateTimeStep();
          return;
        }
        if (step === 4) {
          renderContactStep();
          return;
        }
        renderConsentStep();
      }

      async function submitBookingRequest() {
        const body = {
          experienceType: values.experienceType,
          guests: Number(values.guests),
          preferredLanguage: values.preferredLanguage,
          preferredDate: values.preferredDate,
          preferredTime: values.preferredTime,
          contactName: values.contactName,
          email: values.email,
          phoneOrWhatsApp: values.phoneOrWhatsApp,
          notes: values.notes,
          consent: values.consent,
        };

        statusEl.textContent = t.sending;
        const response = await fetch("/api/booking/request", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!data.ok) {
          throw new Error(t.error);
        }

        const params = new URLSearchParams({
          id: String(data.id || ""),
          mock: data.mock ? "1" : "0",
        });
        params.set("lang", localeData.locale);
        window.location.href = localeData.confirmationPath + "?" + params.toString();
      }

      backBtn.addEventListener("click", (event) => {
        event.preventDefault();
        syncCurrentStepValues();
        if (step > 0) {
          step -= 1;
          renderStep();
        }
      });

      nextBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        syncCurrentStepValues();

        if (!validateCurrentStep()) {
          statusEl.textContent = getValidationMessage();
          return;
        }

        if (step < stepTitles.length - 1) {
          step += 1;
          renderStep();
          return;
        }

        try {
          await submitBookingRequest();
        } catch {
          statusEl.textContent = t.error;
        }
      });

      renderStep();
    </script>
  </body>
</html>`;
}

export async function GET(request: Request): Promise<Response> {
  const locale = resolvePublicLocale(new URL(request.url));
  return new Response(renderBookingPage(locale), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
