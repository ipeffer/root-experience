import type { GiftOption } from "../lib/recommendations/types";

/**
 * Editable placeholder catalog for deterministic recommendation rules.
 * Product names, prices, messages, and URLs are intended to be maintained
 * manually by the team and do not represent real availability claims.
 */
export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: "vineyard-day-pass",
    name: "Vineyard Day Pass",
    occasions: ["birthday", "anniversary", "holiday", "just_because"],
    giftType: "experience",
    priceRange: { min: 80, max: 150 },
    containsAlcohol: false,
    audienceTags: ["outdoors", "experience", "relaxation", "family"],
    explanationKey: "gift.vineyard_day_pass",
    explanations: {
      en: "A calm vineyard experience with scenic time outdoors.",
      it: "Un'esperienza rilassante in vigna con tempo all'aperto.",
      ru: "Спокойный день на винограднике с отдыхом на природе.",
    },
    ctaUrl: "https://example.com/root-experience/gifts/vineyard-day-pass",
  },
  {
    id: "cellar-tasting-box",
    name: "Cellar Tasting Box",
    occasions: ["birthday", "corporate", "thank_you", "holiday"],
    giftType: "wine_set",
    priceRange: { min: 60, max: 120 },
    containsAlcohol: true,
    audienceTags: ["wine", "tasting", "friends", "clients"],
    explanationKey: "gift.cellar_tasting_box",
    explanations: {
      en: "A curated tasting set for a guided at-home wine moment.",
      it: "Un set degustazione curato per un momento vino a casa.",
      ru: "Подборка для домашней дегустации вина.",
    },
    ctaUrl: "https://example.com/root-experience/gifts/cellar-tasting-box",
  },
  {
    id: "sparkling-heritage-set",
    name: "Sparkling Heritage Set",
    occasions: ["wedding", "anniversary", "holiday"],
    giftType: "wine_set",
    priceRange: { min: 110, max: 220 },
    containsAlcohol: true,
    audienceTags: ["celebration", "premium", "partner", "family"],
    explanationKey: "gift.sparkling_heritage_set",
    explanations: {
      en: "A celebratory premium set designed for milestone moments.",
      it: "Un set premium celebrativo per occasioni speciali.",
      ru: "Премиальный праздничный набор для важных событий.",
    },
    ctaUrl: "https://example.com/root-experience/gifts/sparkling-heritage-set",
  },
  {
    id: "artisan-pairing-crate",
    name: "Artisan Pairing Crate",
    occasions: ["birthday", "thank_you", "corporate", "holiday"],
    giftType: "food_pairing",
    priceRange: { min: 50, max: 130 },
    containsAlcohol: false,
    audienceTags: ["food", "sharing", "clients", "family"],
    explanationKey: "gift.artisan_pairing_crate",
    explanations: {
      en: "A sharing-friendly gourmet pairing crate with local character.",
      it: "Una cassetta gourmet da condividere con carattere locale.",
      ru: "Гастрономический набор для совместного ужина.",
    },
    ctaUrl: "https://example.com/root-experience/gifts/artisan-pairing-crate",
  },
  {
    id: "wellness-voucher",
    name: "Wellness Voucher",
    occasions: ["birthday", "just_because", "thank_you"],
    giftType: "wellness",
    priceRange: { min: 40, max: 90 },
    containsAlcohol: false,
    audienceTags: ["relaxation", "self_care", "partner", "friend"],
    explanationKey: "gift.wellness_voucher",
    explanations: {
      en: "A flexible wellness gift focused on rest and self-care.",
      it: "Un regalo wellness flessibile dedicato al benessere.",
      ru: "Гибкий wellness-подарок для отдыха и восстановления.",
    },
    ctaUrl: "https://example.com/root-experience/gifts/wellness-voucher",
  },
];
