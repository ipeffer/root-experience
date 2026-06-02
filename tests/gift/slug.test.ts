import { describe, expect, it } from "vitest";

import { buildGiftPageSlugBase, slugify, withCollisionSuffix } from "../../lib/gift-pages/slug";

describe("gift page slug generation", () => {
  it("slugifies names and occasions", () => {
    expect(slugify("María García")).toBe("maria-garcia");
    expect(slugify("")).toBe("gift");
  });

  it("builds deterministic base slug for the same inputs", () => {
    const input = {
      recipientName: "Elena Rossi",
      giverName: "Marco Bianchi",
      occasion: "birthday",
      recommendationId: "vineyard-day-pass",
    };

    const first = buildGiftPageSlugBase(input);
    const second = buildGiftPageSlugBase(input);

    expect(first).toBe(second);
    expect(first.startsWith("elena-rossi-birthday-")).toBe(true);
  });

  it("changes slug when recommendation changes", () => {
    const base = {
      recipientName: "Elena Rossi",
      giverName: "Marco Bianchi",
      occasion: "birthday",
    };

    const first = buildGiftPageSlugBase({ ...base, recommendationId: "vineyard-day-pass" });
    const second = buildGiftPageSlugBase({ ...base, recommendationId: "wine-tasting-set" });

    expect(first).not.toBe(second);
  });

  it("appends collision suffixes safely", () => {
    const base = "elena-rossi-birthday-a1b2c3d4";
    expect(withCollisionSuffix(base, 0)).toBe(base);
    expect(withCollisionSuffix(base, 2)).toBe(`${base}-2`);
  });
});
