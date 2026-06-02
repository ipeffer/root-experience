import { GIFT_OPTIONS } from "../../config/gift-options";
import type {
  GiftOption,
  RankedRecommendation,
  RecommendationInput,
  RecommendationResult,
  SupportedLanguage,
} from "./types";

const BLOCKED_SCORE = -1_000_000;

function calculateBudgetScore(budget: number, min: number, max: number): number {
  if (budget >= min && budget <= max) {
    return 25;
  }

  const lowerBound = min * 0.8;
  const upperBound = max * 1.2;
  if (budget >= lowerBound && budget <= upperBound) {
    return 10;
  }

  return -20;
}

function getExplanationText(option: GiftOption, language: SupportedLanguage): string {
  return option.explanations[language] ?? option.explanations.en ?? option.explanationKey;
}

function scoreOption(input: RecommendationInput, option: GiftOption): number {
  if (input.alcoholFree && option.containsAlcohol) {
    return BLOCKED_SCORE;
  }

  let score = 0;

  if (option.occasions.includes(input.occasion)) {
    score += 30;
  }

  if (option.giftType === input.giftType) {
    score += 20;
  }

  score += calculateBudgetScore(input.budget, option.priceRange.min, option.priceRange.max);

  const interests = input.recipientProfile.interests ?? [];
  const interestMatches = interests.filter((interest) => option.audienceTags.includes(interest)).length;
  score += Math.min(interestMatches * 15, 30);

  if (input.alcoholFree && !option.containsAlcohol) {
    score += 15;
  }

  return score;
}

function rankOption(input: RecommendationInput, option: GiftOption): RankedRecommendation {
  return {
    gift: option,
    score: scoreOption(input, option),
    explanationKey: option.explanationKey,
    explanationText: getExplanationText(option, input.language),
  };
}

export function matchGift(
  input: RecommendationInput,
  options: GiftOption[] = GIFT_OPTIONS,
): RecommendationResult {
  const ranked = options
    .map((option) => rankOption(input, option))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // Deterministic tie-break for reproducible ranking.
      return a.gift.id.localeCompare(b.gift.id);
    });

  const available = ranked.filter((entry) => entry.score > BLOCKED_SCORE);

  if (available.length === 0) {
    throw new Error("No eligible gift options available for current constraints.");
  }

  return {
    bestRecommendation: available[0],
    fallbackRecommendations: available.slice(1, 3),
  };
}
