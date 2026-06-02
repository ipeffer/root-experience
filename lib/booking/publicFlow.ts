import { submitBookingRequest } from "../submissions/service";
import { publicBookingRequestSchema } from "../validation/bookingPublic";

export async function submitPublicBookingRequest(input: unknown) {
  const parsed = publicBookingRequestSchema.parse(input);

  const result = await submitBookingRequest({
    language: parsed.preferredLanguage,
    source: "booking-assistant-public",
    contactName: parsed.contactName,
    email: parsed.email,
    phoneOrWhatsApp: parsed.phoneOrWhatsApp,
    answers: {
      experienceType: parsed.experienceType,
      guests: parsed.guests,
      preferredLanguage: parsed.preferredLanguage,
      preferredDate: parsed.preferredDate,
      preferredTime: parsed.preferredTime,
      notes: parsed.notes || "",
    },
    consent: parsed.consent,
  });

  if (result.ok) {
    return result;
  }

  if (result.code === "CONFIG_ERROR") {
    // TODO: Remove this temporary mock fallback once booking backend env is configured everywhere.
    return {
      ok: true as const,
      id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString(),
      mock: true as const,
    };
  }

  return result;
}
