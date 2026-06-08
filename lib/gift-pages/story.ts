import type { SupportedLanguage } from "../recommendations/types";
import { formatOccasionLabel } from "./copy";
import type { GiftPageRecord } from "./types";

type StoryBuilder = (input: {
  recipientName: string;
  occasionLabel: string;
  giftTitle: string;
  giverName: string;
}) => string;

const storyBuilders: Record<SupportedLanguage, StoryBuilder> = {
  en: ({ recipientName, occasionLabel, giftTitle, giverName }) =>
    `For ${recipientName}'s ${occasionLabel.toLowerCase()}, ROOT selected ${giftTitle} — a calm, personal moment among the Marche vineyards, composed by ${giverName}.`,
  it: ({ recipientName, occasionLabel, giftTitle, giverName }) =>
    `Per ${occasionLabel.toLowerCase()} di ${recipientName}, ROOT ha scelto ${giftTitle} — un momento intimo tra i vigneti delle Marche, pensato da ${giverName}.`,
  ru: ({ recipientName, occasionLabel, giftTitle, giverName }) =>
    `Dlya ${occasionLabel.toLowerCase()} ${recipientName} ROOT podobral ${giftTitle} — tikhiy, lichnyy moment sredi vinogradnikov Marke, ot ${giverName}.`,
};

export function buildGiftStory(page: GiftPageRecord): string {
  const language = page.language;
  const builder = storyBuilders[language];
  return builder({
    recipientName: page.recipient_name,
    occasionLabel: formatOccasionLabel(language, page.occasion),
    giftTitle: page.recommended_gift_title,
    giverName: page.giver_name,
  });
}

export function formatCertificateDate(isoDate: string, language: SupportedLanguage): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate.slice(0, 10);
  }

  const locale = language === "it" ? "it-IT" : language === "ru" ? "ru-RU" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
