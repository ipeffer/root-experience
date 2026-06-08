import { describe, expect, it } from "vitest";

import { getGiftRecommendation, submitPublicGiftLead } from "../../lib/gift/publicFlow";
import { resetMockGiftPagesForTests } from "../../lib/gift-pages/service";

describe("public gift flow", () => {
  it("returns recommendation and fallbacks for valid payload", () => {
    const result = getGiftRecommendation({
      language: "it",
      occasion: "birthday",
      recipientProfile: "friend",
      budgetBucket: "75_150",
      giftType: "experience",
      personalMessage: "Buon compleanno!",
      alcoholFree: false,
    });

    expect(result.recommendation.id).toBeTruthy();
    expect(result.recommendation.name.length).toBeGreaterThan(1);
    expect(result.fallbacks.length).toBeGreaterThan(0);
  });

  it("creates a gift page and returns redirect url in mock mode", async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    resetMockGiftPagesForTests();

    try {
      const result = await submitPublicGiftLead({
        language: "en",
        recipientName: "Elena Rossi",
        giverName: "Test User",
        personalMessage: "Happy birthday among the vines.",
        email: "test@example.com",
        phoneOrWhatsApp: "",
        consent: true,
        recommendationId: "vineyard-day-pass",
        recommendationTitle: "Vineyard Day Pass",
        ctaUrl: "https://rootwinery.it/gifts/vineyard-day-pass",
        occasion: "birthday",
        answers: {
          giftType: "experience",
        },
      });

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.slug.length).toBeGreaterThan(3);
        expect(result.giftPageUrl).toBe(`/gift/g/${result.slug}/open?lang=en`);
        expect(result.certificateUrl).toBe(`/gift/g/${result.slug}?lang=en`);
        expect(result.mock).toBe(true);
      }
    } finally {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRole;
      resetMockGiftPagesForTests();
    }
  });
});
