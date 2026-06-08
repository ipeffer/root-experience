import { afterEach, describe, expect, it } from "vitest";

import { createGiftPage, getGiftPageBySlug, resetMockGiftPagesForTests } from "../../lib/gift-pages/service";

describe("gift page creation", () => {
  afterEach(() => {
    resetMockGiftPagesForTests();
  });

  it("creates and retrieves a gift page in mock mode", async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    try {
      const created = await createGiftPage({
        language: "en",
        occasion: "birthday",
        recipientName: "Elena Rossi",
        giverName: "Marco Bianchi",
        personalMessage: "Enjoy a day among the vines.",
        recommendedGiftId: "vineyard-day-pass",
        recommendedGiftTitle: "Vineyard Day Pass",
        ctaUrl: "https://rootwinery.it/gifts/vineyard-day-pass",
        status: "active",
      });

      expect(created.ok).toBe(true);
      if (!created.ok) {
        return;
      }

      const page = await getGiftPageBySlug(created.slug);
      expect(page).not.toBeNull();
      expect(page?.recipient_name).toBe("Elena Rossi");
      expect(page?.giver_name).toBe("Marco Bianchi");
      expect(page?.recommended_gift_title).toBe("Vineyard Day Pass");
      expect(page?.personal_message).toBe("Enjoy a day among the vines.");
    } finally {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRole;
    }
  });

  it("rejects invalid gift page payloads", async () => {
    const result = await createGiftPage({
      language: "en",
      occasion: "",
      recipientName: "",
      giverName: "",
      recommendedGiftId: "",
      recommendedGiftTitle: "",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("VALIDATION_ERROR");
    }
  });
});
