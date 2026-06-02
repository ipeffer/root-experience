import { z } from "zod";

const supportedLanguages = ["en", "it", "ru"] as const;
const submissionStatuses = ["new", "reviewed", "contacted", "closed"] as const;

const answersSchema = z.record(z.string(), z.unknown()).default({});

const baseSubmissionSchema = z.object({
  language: z.enum(supportedLanguages),
  source: z.string().trim().min(1).max(100),
  contactName: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  phoneOrWhatsApp: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .optional()
    .or(z.literal("")),
  answers: answersSchema,
  consent: z.literal(true),
  status: z.enum(submissionStatuses).default("new"),
  internalNotes: z.string().trim().max(2_000).optional().nullable(),
});

export const giftLeadSubmissionSchema = baseSubmissionSchema;
export const bookingRequestSubmissionSchema = baseSubmissionSchema;

export type GiftLeadSubmissionInput = z.input<typeof giftLeadSubmissionSchema>;
export type GiftLeadSubmission = z.output<typeof giftLeadSubmissionSchema>;
export type BookingRequestSubmissionInput = z.input<typeof bookingRequestSubmissionSchema>;
export type BookingRequestSubmission = z.output<typeof bookingRequestSubmissionSchema>;
