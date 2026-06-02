function renderBookingPage(): string {
  const copy = {
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
    mockWarning: "Temporary mode: request saved with a mock adapter.",
  } as const;

  const experienceOptions = [
    { value: "vineyard_tour", label: "Vineyard tour" },
    { value: "buggy_wine_tour", label: "Buggy wine tour" },
    { value: "wine_tasting", label: "Wine tasting" },
    { value: "picnic_romantic_experience", label: "Picnic / romantic experience" },
    { value: "private_group_request", label: "Private group request" },
    { value: "corporate_special_event", label: "Corporate / special event" },
  ] as const;

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "it", label: "Italian" },
    { value: "ru", label: "Russian" },
  ] as const;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${copy.title}</title>
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
        <h1>${copy.title}</h1>
        <p class="subtitle">${copy.subtitle}</p>
        <p class="notice">${copy.requestNotice}</p>
        <div class="progress"><span id="progress-bar" style="width: 16.66%"></span></div>
        <div id="step-title" class="step-title"></div>
        <div id="step-body"></div>
        <p id="status" class="status"></p>
        <div class="nav">
          <button id="back-btn" class="ghost">${copy.back}</button>
          <button id="next-btn" class="primary">${copy.next}</button>
        </div>
      </section>
    </main>
    <script type="application/json" id="copy-data">${JSON.stringify(copy)}</script>
    <script type="application/json" id="experience-options">${JSON.stringify(experienceOptions)}</script>
    <script type="application/json" id="language-options">${JSON.stringify(languageOptions)}</script>
    <script>
      const t = JSON.parse(document.getElementById("copy-data").textContent);
      const experienceOptions = JSON.parse(document.getElementById("experience-options").textContent);
      const languageOptions = JSON.parse(document.getElementById("language-options").textContent);

      const stepTitles = [t.step1, t.step2, t.step3, t.step4, t.step5, t.step6];
      let step = 0;
      const values = {
        experienceType: "vineyard_tour",
        guests: "2",
        preferredLanguage: "en",
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
          '<input id="contact-name" type="text" placeholder="Full name" value="' + escapeHtml(values.contactName) + '" required />' +
          '<input id="contact-email" type="email" placeholder="Email" value="' + escapeHtml(values.email) + '" required />' +
          '<input id="contact-phone" type="text" placeholder="Phone / WhatsApp (optional)" value="' + escapeHtml(values.phoneOrWhatsApp) + '" />' +
          '<textarea id="contact-notes" placeholder="Additional details (optional)">' + escapeHtml(values.notes) + "</textarea>" +
          "</div>";
      }

      function renderConsentStep() {
        const languageLabel = languageOptions.find((option) => option.value === values.preferredLanguage)?.label || "English";
        const experienceLabel =
          experienceOptions.find((option) => option.value === values.experienceType)?.label || values.experienceType;
        const checked = values.consent ? " checked" : "";

        bodyEl.innerHTML =
          '<p><strong>' + t.confirmHeader + "</strong></p>" +
          '<div class="review">' +
          "<p><strong>Experience:</strong> " + escapeHtml(experienceLabel) + "</p>" +
          "<p><strong>Guests:</strong> " + escapeHtml(values.guests) + "</p>" +
          "<p><strong>Language:</strong> " + escapeHtml(languageLabel) + "</p>" +
          "<p><strong>Preferred date:</strong> " + escapeHtml(values.preferredDate) + "</p>" +
          "<p><strong>Preferred time:</strong> " + escapeHtml(values.preferredTime) + "</p>" +
          "<p><strong>Contact:</strong> " + escapeHtml(values.contactName) + " / " + escapeHtml(values.email) + "</p>" +
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
          return "Please provide a valid number of guests (1-200).";
        }
        if (step === 3) {
          return "Please select preferred date and time.";
        }
        if (step === 4) {
          return "Please provide your name and email.";
        }
        if (step === 5) {
          return "Please accept consent to continue.";
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
        window.location.href = "/booking/confirmation?" + params.toString();
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

export async function GET(): Promise<Response> {
  return new Response(renderBookingPage(), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
