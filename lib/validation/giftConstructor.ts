import { z } from "zod";

import type { GiftOccasion, GiftType, SupportedLanguage } from "../recommendations/types";

const supportedLanguages = ["en", "it", "ru"] as const satisfies ReadonlyArray<SupportedLanguage>;
const occasions = [
  "birthday",
  "anniversary",
  "wedding",
  "corporate",
  "holiday",
  "thank_you",
  "just_because",
] as const satisfies ReadonlyArray<GiftOccasion>;
const giftTypes = [
  "experience",
  "wine_set",
  "non_alcoholic",
  "food_pairing",
  "wellness",
  "mixed",
] as const satisfies ReadonlyArray<GiftType>;

const recipientProfiles = [
  "partner",
  "friend",
  "family",
  "colleague",
  "client",
] as const;

const budgetBuckets = ["under_75", "75_150", "150_300", "over_300"] as const;

export const publicGiftFlowRequestSchema = z.object({
  language: z.enum(supportedLanguages),
  occasion: z.enum(occasions),
  recipientProfile: z.enum(recipientProfiles),
  budgetBucket: z.enum(budgetBuckets),
  giftType: z.enum(giftTypes),
  personalMessage: z.string().trim().max(500).optional().default(""),
  alcoholFree: z.boolean().default(false),
});

export const publicGiftLeadSchema = z.object({
  language: z.enum(supportedLanguages),
  recipientName: z.string().trim().min(1).max(200),
  giverName: z.string().trim().min(1).max(200),
  personalMessage: z.string().trim().max(500).optional().default(""),
  email: z.email().max(320),
  phoneOrWhatsApp: z.string().trim().min(3).max(50).optional().or(z.literal("")),
  consent: z.literal(true),
  recommendationId: z.string().trim().min(1).max(120),
  recommendationTitle: z.string().trim().min(1).max(200),
  ctaUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  occasion: z.enum(occasions),
  answers: z.record(z.string(), z.unknown()).default({}),
});

export type PublicGiftFlowRequest = z.output<typeof publicGiftFlowRequestSchema>;
export type PublicGiftLeadInput = z.output<typeof publicGiftLeadSchema>;
