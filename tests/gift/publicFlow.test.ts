import { describe, expect, it } from "vitest";

import { getGiftRecommendation, submitPublicGiftLead } from "../../lib/gift/publicFlow";

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

  it("uses mock lead adapter when backend config is missing", async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    try {
      const result = await submitPublicGiftLead({
        language: "en",
        contactName: "Test User",
        email: "test@example.com",
        phoneOrWhatsApp: "",
        consent: true,
        recommendationId: "vineyard-day-pass",
        answers: {
          occasion: "birthday",
          giftType: "experience",
        },
      });

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.id.startsWith("mock-")).toBe(true);
      }
    } finally {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRole;
    }
  });
});
