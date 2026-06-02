import { z } from "zod";

import type { GiftOccasion, SupportedLanguage } from "../recommendations/types";

const giftPageStatuses = ["active", "archived"] as const;

export const giftPageCreateSchema = z.object({
  language: z.enum(["en", "it", "ru"] as const satisfies ReadonlyArray<SupportedLanguage>),
  occasion: z.string().trim().min(1).max(80),
  recipientName: z.string().trim().min(1).max(200),
  giverName: z.string().trim().min(1).max(200),
  personalMessage: z.string().trim().max(500).optional().default(""),
  recommendedGiftId: z.string().trim().min(1).max(120),
  recommendedGiftTitle: z.string().trim().min(1).max(200),
  ctaUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  leadId: z.string().uuid().optional(),
  status: z.enum(giftPageStatuses).default("active"),
});

export type GiftPageCreateInput = z.output<typeof giftPageCreateSchema>;
export type GiftPageStatus = (typeof giftPageStatuses)[number];

export interface GiftPageRecord {
  id: string;
  created_at: string;
  slug: string;
  language: SupportedLanguage;
  occasion: GiftOccasion | string;
  recipient_name: string;
  giver_name: string;
  personal_message: string;
  recommended_gift_id: string;
  recommended_gift_title: string;
  cta_url: string | null;
  lead_id: string | null;
  status: GiftPageStatus;
}

export type GiftPageResult =
  | { ok: true; id: string; slug: string; createdAt: string; mock?: true }
  | { ok: false; code: "VALIDATION_ERROR"; message: string; details: string[] }
  | { ok: false; code: "CONFIG_ERROR"; message: string }
  | { ok: false; code: "DATABASE_ERROR"; message: string };
