import { describe, expect, it } from "vitest";

import { buildGiftStory, formatCertificateDate } from "../../lib/gift-pages/story";
import type { GiftPageRecord } from "../../lib/gift-pages/types";

const samplePage: GiftPageRecord = {
  id: "test-id",
  created_at: "2026-06-02T12:00:00.000Z",
  slug: "elena-rossi-birthday-abc12345",
  language: "en",
  occasion: "birthday",
  recipient_name: "Elena Rossi",
  giver_name: "Marco Bianchi",
  personal_message: "Happy birthday!",
  recommended_gift_id: "vineyard-day-pass",
  recommended_gift_title: "Vineyard Day Pass",
  cta_url: "https://example.com/gift",
  lead_id: null,
  status: "active",
};

describe("gift story", () => {
  it("builds an English story from gift page fields", () => {
    const story = buildGiftStory(samplePage);
    expect(story).toContain("Elena Rossi");
    expect(story).toContain("Vineyard Day Pass");
    expect(story).toContain("Marco Bianchi");
  });

  it("formats certificate dates per locale", () => {
    expect(formatCertificateDate("2026-06-02T12:00:00.000Z", "en")).toContain("2026");
    expect(formatCertificateDate("2026-06-02T12:00:00.000Z", "it")).toContain("2026");
  });
});
