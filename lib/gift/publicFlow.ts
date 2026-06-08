import { createGiftPage } from "../gift-pages/service";
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

export interface PublicGiftLeadResponse {
  ok: true;
  id: string;
  createdAt: string;
  slug: string;
  giftPageUrl: string;
  certificateUrl: string;
  mock?: true;
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

export async function submitPublicGiftLead(input: unknown): Promise<
  | PublicGiftLeadResponse
  | { ok: false; code: "VALIDATION_ERROR"; message: string; details: string[] }
  | { ok: false; code: "CONFIG_ERROR"; message: string }
  | { ok: false; code: "DATABASE_ERROR"; message: string }
> {
  const parsed: PublicGiftLeadInput = publicGiftLeadSchema.parse(input);

  const leadResult = await submitGiftLead({
    language: parsed.language,
    source: "gift-constructor-public",
    contactName: parsed.giverName,
    email: parsed.email,
    phoneOrWhatsApp: parsed.phoneOrWhatsApp,
    answers: {
      recipientName: parsed.recipientName,
      giverName: parsed.giverName,
      personalMessage: parsed.personalMessage,
      recommendationId: parsed.recommendationId,
      recommendationTitle: parsed.recommendationTitle,
      occasion: parsed.occasion,
      ctaUrl: parsed.ctaUrl,
      ...parsed.answers,
    },
    consent: parsed.consent,
  });

  const isMockLead = !leadResult.ok && leadResult.code === "CONFIG_ERROR";
  if (!leadResult.ok && !isMockLead) {
    return leadResult;
  }

  const leadId = leadResult.ok ? leadResult.id : undefined;
  const createdAt = leadResult.ok ? leadResult.createdAt : new Date().toISOString();

  const pageResult = await createGiftPage({
    language: parsed.language,
    occasion: parsed.occasion,
    recipientName: parsed.recipientName,
    giverName: parsed.giverName,
    personalMessage: parsed.personalMessage,
    recommendedGiftId: parsed.recommendationId,
    recommendedGiftTitle: parsed.recommendationTitle,
    ctaUrl: parsed.ctaUrl,
    leadId,
    status: "active",
  });

  if (!pageResult.ok) {
    if (isMockLead) {
      return {
        ok: false,
        code: "DATABASE_ERROR",
        message: pageResult.message,
      };
    }
    return pageResult;
  }

  const giftPageUrl = `/gift/g/${pageResult.slug}/open?lang=${parsed.language}`;

  return {
    ok: true,
    id: leadId ?? pageResult.id,
    createdAt,
    slug: pageResult.slug,
    giftPageUrl,
    certificateUrl: `/gift/g/${pageResult.slug}?lang=${parsed.language}`,
    mock: isMockLead || pageResult.mock ? true : undefined,
  };
}
