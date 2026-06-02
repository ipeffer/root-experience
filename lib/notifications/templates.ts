import type { BookingRequestSubmission, GiftLeadSubmission } from "../validation/submissions";

type NotificationKind = "gift_lead" | "booking_request";

interface SubmissionMeta {
  id: string;
  createdAt: string;
}

interface NotificationMessageTemplate {
  subject: string;
  text: string;
}

function formatAnswers(answers: Record<string, unknown>): string {
  const entries = Object.entries(answers);
  if (entries.length === 0) {
    return "none";
  }

  const condensed = entries.slice(0, 4).map(([key, value]) => `${key}=${String(value)}`);
  if (entries.length > 4) {
    condensed.push(`+${entries.length - 4} more`);
  }
  return condensed.join("; ");
}

function buildBaseMessage(
  kind: NotificationKind,
  submission: GiftLeadSubmission | BookingRequestSubmission,
  meta: SubmissionMeta,
): NotificationMessageTemplate {
  const label = kind === "gift_lead" ? "New gift lead" : "New booking request";
  const phone = submission.phoneOrWhatsApp || "not provided";

  return {
    subject: `${label}: ${submission.contactName}`,
    text: [
      label,
      `ID: ${meta.id}`,
      `Date: ${meta.createdAt}`,
      `From: ${submission.source} (${submission.language})`,
      `Contact: ${submission.contactName} | ${submission.email} | ${phone}`,
      `Answers: ${formatAnswers(submission.answers)}`,
    ].join("\n"),
  };
}

export function buildGiftLeadNotificationTemplate(
  submission: GiftLeadSubmission,
  meta: SubmissionMeta,
): NotificationMessageTemplate {
  return buildBaseMessage("gift_lead", submission, meta);
}

export function buildBookingRequestNotificationTemplate(
  submission: BookingRequestSubmission,
  meta: SubmissionMeta,
): NotificationMessageTemplate {
  return buildBaseMessage("booking_request", submission, meta);
}
