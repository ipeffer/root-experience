export type GiftOccasion =
  | "birthday"
  | "anniversary"
  | "wedding"
  | "corporate"
  | "holiday"
  | "thank_you"
  | "just_because";

export type GiftType =
  | "experience"
  | "wine_set"
  | "non_alcoholic"
  | "food_pairing"
  | "wellness"
  | "mixed";

export type SupportedLanguage = "en" | "it" | "ru";

export interface RecipientProfile {
  relationship?: "partner" | "friend" | "family" | "colleague" | "client";
  interests?: string[];
  ageGroup?: "adult" | "senior";
}

export interface RecommendationInput {
  occasion: GiftOccasion;
  recipientProfile: RecipientProfile;
  budget: number;
  giftType: GiftType;
  alcoholFree: boolean;
  language: SupportedLanguage;
}

export interface GiftOption {
  id: string;
  name: string;
  occasions: GiftOccasion[];
  giftType: GiftType;
  priceRange: {
    min: number;
    max: number;
  };
  containsAlcohol: boolean;
  audienceTags: string[];
  explanationKey: string;
  explanations: Partial<Record<SupportedLanguage, string>>;
  ctaUrl: string;
}

export interface RankedRecommendation {
  gift: GiftOption;
  score: number;
  explanationKey: string;
  explanationText: string;
}

export interface RecommendationResult {
  bestRecommendation: RankedRecommendation;
  fallbackRecommendations: RankedRecommendation[];
}
