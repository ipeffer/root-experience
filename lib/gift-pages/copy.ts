import type { SupportedLanguage } from "../recommendations/types";

export const occasionLabels: Record<SupportedLanguage, Record<string, string>> = {
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

export const giftPageCopy: Record<
  SupportedLanguage,
  {
    pageTitle: string;
    forRecipient: string;
    fromGiver: string;
    occasionLabel: string;
    giftLabel: string;
    storyLabel: string;
    messageLabel: string;
    buyCta: string;
    prepareCta: string;
    prepareNote: string;
    printCta: string;
    shareLabel: string;
    shareHint: string;
    copyLink: string;
    copied: string;
    qrAlt: string;
    qrCaption: string;
    footerNote: string;
    certificateLabel: string;
    momentsTitle: string;
    moment1: string;
    moment2: string;
    moment3: string;
  }
> = {
  en: {
    pageTitle: "Your ROOT Gift",
    forRecipient: "A gift for",
    fromGiver: "From",
    occasionLabel: "Occasion",
    giftLabel: "Recommended gift",
    storyLabel: "Your gift story",
    messageLabel: "Personal message",
    buyCta: "Buy this gift on ROOT Winery",
    prepareCta: "Request ROOT to prepare this gift",
    prepareNote:
      "Our concierge team can prepare this gift with a handwritten note and local pairing suggestions.",
    printCta: "Print / save as PDF",
    shareLabel: "Share this gift page",
    shareHint: "Send the reveal link for a surprise opening experience.",
    copyLink: "Copy reveal link",
    copied: "Link copied",
    qrAlt: "QR code for gift reveal",
    qrCaption: "Scan to open the gift",
    footerNote: "Crafted among the vineyards of Maiolati Spontini, Marche · Italy",
    certificateLabel: "ROOT Experience Certificate",
    momentsTitle: "Gift moments from ROOT",
    moment1: "Birthday among the vines",
    moment2: "Anniversary tasting for two",
    moment3: "A corporate gift from Marche",
  },
  it: {
    pageTitle: "Il tuo regalo ROOT",
    forRecipient: "Un regalo per",
    fromGiver: "Da",
    occasionLabel: "Occasione",
    giftLabel: "Regalo consigliato",
    storyLabel: "La storia del tuo regalo",
    messageLabel: "Messaggio personale",
    buyCta: "Acquista questo regalo su ROOT Winery",
    prepareCta: "Chiedi a ROOT di preparare questo regalo",
    prepareNote:
      "Il nostro team concierge puo preparare questo regalo con un biglietto scritto a mano e abbinamenti locali.",
    printCta: "Stampa / salva come PDF",
    shareLabel: "Condividi questa pagina regalo",
    shareHint: "Invia il link reveal per un'apertura a sorpresa.",
    copyLink: "Copia link reveal",
    copied: "Link copiato",
    qrAlt: "Codice QR del reveal regalo",
    qrCaption: "Scansiona per aprire il regalo",
    footerNote: "Creato tra i vigneti di Maiolati Spontini, Marche · Italia",
    certificateLabel: "Certificato ROOT Experience",
    momentsTitle: "Momenti regalo da ROOT",
    moment1: "Compleanno tra le vigne",
    moment2: "Degustazione di anniversario",
    moment3: "Un regalo aziendale dalle Marche",
  },
  ru: {
    pageTitle: "Vash podarok ROOT",
    forRecipient: "Podarok dlya",
    fromGiver: "Ot",
    occasionLabel: "Povod",
    giftLabel: "Rekomendovannyy podarok",
    storyLabel: "Istoriya podarka",
    messageLabel: "Lichnoe poslanie",
    buyCta: "Kupit' etot podarok v ROOT Winery",
    prepareCta: "Poprosit' ROOT podgotovit' podarok",
    prepareNote:
      "Nasha komanda mozhet podgotovit' podarok s rukopisnoy otkrytkoy i mestnymi sochetaniyami.",
    printCta: "Pechat' / sokhranit' kak PDF",
    shareLabel: "Podelit'sya etoy stranitsey",
    shareHint: "Otprav'te reveal-ssylku dlya effekta neozhidannosti.",
    copyLink: "Kopirovat' reveal-ssylku",
    copied: "Ssylka skopirovana",
    qrAlt: "QR-kod otkrytiya podarka",
    qrCaption: "Skanirovat', chtoby otkryt' podarok",
    footerNote: "Sozdano sredi vinogradnikov Maiolati Spontini, Marche · Italiya",
    certificateLabel: "Sertifikat ROOT Experience",
    momentsTitle: "Podarochnye momenty ROOT",
    moment1: "Den' rozhdeniya sredi vinogradnikov",
    moment2: "Yubileynaya degustatsiya",
    moment3: "Korporativnyy podarok iz Marke",
  },
};

export const revealCopy: Record<
  SupportedLanguage,
  {
    title: string;
    eyebrow: string;
    forRecipient: string;
    fromGiver: string;
    hint: string;
    openCta: string;
    viewCertificate: string;
  }
> = {
  en: {
    title: "Someone prepared a gift for you",
    eyebrow: "ROOT Winery · Marche",
    forRecipient: "A gift for",
    fromGiver: "From",
    hint: "Take a breath. When you are ready, open your vineyard gift.",
    openCta: "Open your gift",
    viewCertificate: "View certificate directly",
  },
  it: {
    title: "Qualcuno ha preparato un regalo per te",
    eyebrow: "ROOT Winery · Marche",
    forRecipient: "Un regalo per",
    fromGiver: "Da",
    hint: "Prenditi un momento. Quando sei pronto, apri il tuo regalo.",
    openCta: "Apri il tuo regalo",
    viewCertificate: "Vedi certificato direttamente",
  },
  ru: {
    title: "Kto-to prigotovil dlya vas podarok",
    eyebrow: "ROOT Winery · Marche",
    forRecipient: "Podarok dlya",
    fromGiver: "Ot",
    hint: "Sdelayte vdykh. Kogda budete gotovy, otkroyte podarok.",
    openCta: "Otkryt' podarok",
    viewCertificate: "Otkryt' sertifikat srazu",
  },
};
