import { describe, expect, it } from "vitest";

import { GIFT_OPTIONS } from "../../config/gift-options";
import { matchGift } from "../../lib/recommendations/matchGift";
import type { GiftOption } from "../../lib/recommendations/types";

describe("matchGift", () => {
  it("returns a deterministic best match and two fallbacks", () => {
    const result = matchGift({
      occasion: "birthday",
      recipientProfile: {
        interests: ["relaxation", "experience"],
      },
      budget: 100,
      giftType: "experience",
      alcoholFree: false,
      language: "en",
    });

    expect(result.bestRecommendation.gift.id).toBe("vineyard-day-pass");
    expect(result.fallbackRecommendations).toHaveLength(2);
    expect(result.fallbackRecommendations[0].gift.id).toBe("artisan-pairing-crate");
    expect(result.fallbackRecommendations[1].gift.id).toBe("cellar-tasting-box");
    expect(result.bestRecommendation.explanationKey).toBe("gift.vineyard_day_pass");
    expect(result.bestRecommendation.gift.ctaUrl).toContain("https://example.com/");
  });

  it("enforces alcohol-free preference and returns localized explanation", () => {
    const result = matchGift({
      occasion: "holiday",
      recipientProfile: {
        interests: ["food", "sharing"],
      },
      budget: 85,
      giftType: "wine_set",
      alcoholFree: true,
      language: "it",
    });

    expect(result.bestRecommendation.gift.containsAlcohol).toBe(false);
    expect(result.bestRecommendation.explanationText).toBe(
      "Una cassetta gourmet da condividere con carattere locale.",
    );
    expect(result.fallbackRecommendations.every((r) => !r.gift.containsAlcohol)).toBe(true);
  });

  it("uses stable id tie-break ordering for equal scores", () => {
    const tiedOptions: GiftOption[] = [
      {
        ...GIFT_OPTIONS[0],
        id: "z-option",
        occasions: ["birthday"],
        giftType: "experience",
        audienceTags: [],
        priceRange: { min: 90, max: 110 },
      },
      {
        ...GIFT_OPTIONS[0],
        id: "a-option",
        occasions: ["birthday"],
        giftType: "experience",
        audienceTags: [],
        priceRange: { min: 90, max: 110 },
      },
      {
        ...GIFT_OPTIONS[0],
        id: "m-option",
        occasions: ["birthday"],
        giftType: "experience",
        audienceTags: [],
        priceRange: { min: 90, max: 110 },
      },
    ];

    const result = matchGift(
      {
        occasion: "birthday",
        recipientProfile: {},
        budget: 100,
        giftType: "experience",
        alcoholFree: false,
        language: "en",
      },
      tiedOptions,
    );

    expect(result.bestRecommendation.gift.id).toBe("a-option");
    expect(result.fallbackRecommendations.map((r) => r.gift.id)).toEqual(["m-option", "z-option"]);
  });
});
