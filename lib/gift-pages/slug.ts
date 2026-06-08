import { createHash } from "node:crypto";

export function slugify(value: string): string {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return normalized || "gift";
}

export interface GiftPageSlugInput {
  recipientName: string;
  giverName: string;
  occasion: string;
  recommendationId: string;
}

export function buildGiftPageSlugBase(input: GiftPageSlugInput): string {
  const fingerprint = createHash("sha256")
    .update(
      `${input.recipientName.trim().toLowerCase()}|${input.giverName.trim().toLowerCase()}|${input.occasion}|${input.recommendationId}`,
    )
    .digest("hex")
    .slice(0, 8);

  return [slugify(input.recipientName), slugify(input.occasion), fingerprint].join("-");
}

export function withCollisionSuffix(baseSlug: string, attempt: number): string {
  if (attempt <= 0) {
    return baseSlug;
  }
  return `${baseSlug}-${attempt}`;
}
