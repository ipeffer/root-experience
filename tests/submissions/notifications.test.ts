import { afterEach, describe, expect, it, vi } from "vitest";

import { sendAdminNotification } from "../../lib/notifications/service";
import {
  buildBookingRequestNotificationTemplate,
  buildGiftLeadNotificationTemplate,
} from "../../lib/notifications/templates";
import type { BookingRequestSubmission, GiftLeadSubmission } from "../../lib/validation/submissions";

const baseSubmission: GiftLeadSubmission & BookingRequestSubmission = {
  language: "en",
  source: "website",
  contactName: "Test User",
  email: "test@example.com",
  phoneOrWhatsApp: "+39123456789",
  answers: { groupSize: 2, eventType: "birthday" },
  consent: true,
  status: "new",
  internalNotes: null,
};

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
});

describe("notification templates", () => {
  it("builds short useful gift lead message", () => {
    const result = buildGiftLeadNotificationTemplate(baseSubmission, {
      id: "gift-1",
      createdAt: "2026-06-02T12:00:00.000Z",
    });

    expect(result.subject).toContain("New gift lead");
    expect(result.text).toContain("ID: gift-1");
    expect(result.text).toContain("Contact:");
  });

  it("builds booking request message", () => {
    const result = buildBookingRequestNotificationTemplate(baseSubmission, {
      id: "book-1",
      createdAt: "2026-06-02T13:00:00.000Z",
    });

    expect(result.subject).toContain("New booking request");
    expect(result.text).toContain("Answers:");
  });
});

describe("notification service", () => {
  it("skips channels gracefully when env vars are missing", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.NOTIFY_EMAIL_TO;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const fetchMock = vi.fn<typeof fetch>();
    const result = await sendAdminNotification(
      {
        subject: "Test",
        text: "Message",
      },
      { fetchImpl: fetchMock },
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ channel: "email", state: "skipped" }),
        expect.objectContaining({ channel: "telegram", state: "skipped" }),
      ]),
    );
  });

  it("handles provider failures without throwing", async () => {
    process.env.RESEND_API_KEY = "resend";
    process.env.RESEND_FROM_EMAIL = "noreply@example.com";
    process.env.NOTIFY_EMAIL_TO = "ops@example.com";
    process.env.TELEGRAM_BOT_TOKEN = "token";
    process.env.TELEGRAM_CHAT_ID = "chat";

    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));

    const result = await sendAdminNotification(
      {
        subject: "Test",
        text: "Message",
      },
      { fetchImpl: fetchMock },
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ channel: "email", state: "failed" }),
        expect.objectContaining({ channel: "telegram", state: "sent" }),
      ]),
    );
  });

  it("times out slow providers without hanging response path", async () => {
    process.env.RESEND_API_KEY = "resend";
    process.env.RESEND_FROM_EMAIL = "noreply@example.com";
    process.env.NOTIFY_EMAIL_TO = "ops@example.com";
    process.env.TELEGRAM_BOT_TOKEN = "token";
    process.env.TELEGRAM_CHAT_ID = "chat";

    const fetchMock = vi.fn<typeof fetch>().mockImplementation(
      () =>
        new Promise<Response>(() => {
          // Intentionally never resolves.
        }),
    );

    const start = Date.now();
    const result = await sendAdminNotification(
      {
        subject: "Test",
        text: "Message",
      },
      { fetchImpl: fetchMock, timeoutMs: 20 },
    );
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(200);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ channel: "email", state: "failed" }),
        expect.objectContaining({ channel: "telegram", state: "failed" }),
      ]),
    );
  });
});
