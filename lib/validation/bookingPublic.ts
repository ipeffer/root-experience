import { z } from "zod";

const publicExperienceTypes = [
  "vineyard_tour",
  "buggy_wine_tour",
  "wine_tasting",
  "picnic_romantic_experience",
  "private_group_request",
  "corporate_special_event",
] as const;

const supportedLanguages = ["en", "it", "ru"] as const;

export const publicBookingRequestSchema = z.object({
  experienceType: z.enum(publicExperienceTypes),
  guests: z.coerce.number().int().min(1).max(200),
  preferredLanguage: z.enum(supportedLanguages),
  preferredDate: z.string().trim().min(1).max(40),
  preferredTime: z.string().trim().min(1).max(40),
  contactName: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  phoneOrWhatsApp: z.string().trim().min(3).max(50).optional().or(z.literal("")),
  notes: z.string().trim().max(2_000).optional().or(z.literal("")),
  consent: z.literal(true),
});

export type PublicBookingRequestInput = z.input<typeof publicBookingRequestSchema>;
