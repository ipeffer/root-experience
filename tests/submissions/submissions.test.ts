import { describe, expect, it } from "vitest";

import {
  bookingRequestSubmissionSchema,
  giftLeadSubmissionSchema,
  type BookingRequestSubmissionInput,
  type GiftLeadSubmissionInput,
} from "../../lib/validation/submissions";
import { submitBookingRequest, submitGiftLead } from "../../lib/submissions/service";

const validPayload: GiftLeadSubmissionInput & BookingRequestSubmissionInput = {
  language: "en",
  source: "landing-page",
  contactName: "Jane Doe",
  email: "jane@example.com",
  phoneOrWhatsApp: "+393331234567",
  answers: {
    giftType: "experience",
    groupSize: 2,
  },
  consent: true as const,
};

describe("submission validation", () => {
  it("accepts valid gift lead payload", () => {
    const parsed = giftLeadSubmissionSchema.parse(validPayload);
    expect(parsed.status).toBe("new");
    expect(parsed.contactName).toBe("Jane Doe");
  });

  it("rejects booking request payload without consent", () => {
    const parsed = bookingRequestSubmissionSchema.safeParse({
      ...validPayload,
      consent: false,
    });

    expect(parsed.success).toBe(false);
  });
});

describe("submission service", () => {
  it("returns config error when Supabase env is missing", async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    try {
      const giftResult = await submitGiftLead(validPayload);
      const bookingResult = await submitBookingRequest(validPayload);

      expect(giftResult.ok).toBe(false);
      expect(bookingResult.ok).toBe(false);

      if (!giftResult.ok) {
        expect(giftResult.code).toBe("CONFIG_ERROR");
      }

      if (!bookingResult.ok) {
        expect(bookingResult.code).toBe("CONFIG_ERROR");
      }
    } finally {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRole;
    }
  });
});
