import { matchGift } from "../recommendations/matchGift";
import type { GiftType, RecommendationInput } from "../recommendations/types";
import { submitGiftLead } from "../submissions/service";
import {
  publicGiftFlowRequestSchema,
  publicGiftLeadSchema,
  type PublicGiftFlowRequest,
  type PublicGiftLeadInput,
} from "../validation/giftConstructor";

type BudgetBucket = PublicGiftFlowRequest["budgetBucket"];

export interface RecommendationResponse {
  recommendation: {
    id: string;
    name: string;
    explanation: string;
    ctaUrl: string;
  };
  fallbacks: Array<{
    id: string;
    name: string;
    explanation: string;
    ctaUrl: string;
  }>;
}

const BUDGET_BUCKET_TO_EUR: Record<BudgetBucket, number> = {
  under_75: 60,
  "75_150": 110,
  "150_300": 200,
  over_300: 320,
};

function mapGiftType(value: GiftType): GiftType {
  if (value === "non_alcoholic") {
    return "wellness";
  }
  return value;
}

export function getGiftRecommendation(input: unknown): RecommendationResponse {
  const parsed = publicGiftFlowRequestSchema.parse(input);
  const recommendationInput: RecommendationInput = {
    occasion: parsed.occasion,
    recipientProfile: {
      relationship: parsed.recipientProfile,
      interests: [parsed.recipientProfile],
    },
    budget: BUDGET_BUCKET_TO_EUR[parsed.budgetBucket],
    giftType: mapGiftType(parsed.giftType),
    alcoholFree: parsed.alcoholFree || parsed.giftType === "non_alcoholic",
    language: parsed.language,
  };

  const result = matchGift(recommendationInput);
  return {
    recommendation: {
      id: result.bestRecommendation.gift.id,
      name: result.bestRecommendation.gift.name,
      explanation: result.bestRecommendation.explanationText,
      ctaUrl: result.bestRecommendation.gift.ctaUrl,
    },
    fallbacks: result.fallbackRecommendations.map((item) => ({
      id: item.gift.id,
      name: item.gift.name,
      explanation: item.explanationText,
      ctaUrl: item.gift.ctaUrl,
    })),
  };
}

export async function submitPublicGiftLead(input: unknown) {
  const parsed: PublicGiftLeadInput = publicGiftLeadSchema.parse(input);

  const result = await submitGiftLead({
    language: parsed.language,
    source: "gift-constructor-public",
    contactName: parsed.contactName,
    email: parsed.email,
    phoneOrWhatsApp: parsed.phoneOrWhatsApp,
    answers: {
      recommendationId: parsed.recommendationId,
      ...parsed.answers,
    },
    consent: parsed.consent,
  });

  if (result.ok) {
    return result;
  }

  if (result.code === "CONFIG_ERROR") {
    // TODO: Remove this temporary mock fallback once Supabase env is configured in all environments.
    return {
      ok: true as const,
      id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString(),
      mock: true as const,
    };
  }

  return result;
}
