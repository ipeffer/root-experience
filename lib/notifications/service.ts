import {
  getNotificationEmailEnv,
  getNotificationTelegramEnv,
  type NotificationEmailEnv,
  type NotificationTelegramEnv,
} from "../env";
import type { BookingRequestSubmission, GiftLeadSubmission } from "../validation/submissions";
import {
  buildBookingRequestNotificationTemplate,
  buildGiftLeadNotificationTemplate,
} from "./templates";

type NotificationChannel = "email" | "telegram";
type NotificationState = "sent" | "skipped" | "failed";

interface SubmissionMeta {
  id: string;
  createdAt: string;
}

interface NotificationMessage {
  subject: string;
  text: string;
}

interface SendNotificationOptions {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export interface NotificationChannelResult {
  channel: NotificationChannel;
  state: NotificationState;
  reason?: string;
}

const DEFAULT_NOTIFICATION_TIMEOUT_MS = 1200;

async function sendResendEmail(
  config: NotificationEmailEnv,
  message: NotificationMessage,
  fetchImpl: typeof fetch,
): Promise<void> {
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed (${response.status}).`);
  }
}

async function sendTelegramMessage(
  config: NotificationTelegramEnv,
  message: NotificationMessage,
  fetchImpl: typeof fetch,
): Promise<void> {
  const response = await fetchImpl(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: config.chatId,
      text: `${message.subject}\n${message.text}`,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram request failed (${response.status}).`);
  }
}

function reportNotificationFailure(channel: NotificationChannel, error: unknown): void {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`[notifications] ${channel} failed: ${message}`);
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, channel: NotificationChannel): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`${channel} notification timed out after ${timeoutMs}ms.`));
      }, timeoutMs);
    }),
  ]);
}

export async function sendAdminNotification(
  message: NotificationMessage,
  options: SendNotificationOptions = {},
): Promise<NotificationChannelResult[]> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_NOTIFICATION_TIMEOUT_MS;
  const results: NotificationChannelResult[] = [];
  const emailConfig = getNotificationEmailEnv();
  const telegramConfig = getNotificationTelegramEnv();
  const channelTasks: Array<{ channel: NotificationChannel; task: Promise<void> }> = [];

  if (!emailConfig) {
    results.push({
      channel: "email",
      state: "skipped",
      reason: "Missing RESEND_API_KEY, RESEND_FROM_EMAIL or NOTIFY_EMAIL_TO.",
    });
  } else {
    channelTasks.push({
      channel: "email",
      task: withTimeout(sendResendEmail(emailConfig, message, fetchImpl), timeoutMs, "email"),
    });
  }

  if (!telegramConfig) {
    results.push({
      channel: "telegram",
      state: "skipped",
      reason: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.",
    });
  } else {
    channelTasks.push({
      channel: "telegram",
      task: withTimeout(sendTelegramMessage(telegramConfig, message, fetchImpl), timeoutMs, "telegram"),
    });
  }

  if (channelTasks.length > 0) {
    const settled = await Promise.allSettled(channelTasks.map((entry) => entry.task));
    for (const [index, item] of settled.entries()) {
      const channel = channelTasks[index]?.channel;
      if (!channel) {
        continue;
      }
      if (item.status === "fulfilled") {
        results.push({ channel, state: "sent" });
      } else {
        reportNotificationFailure(channel, item.reason);
        results.push({
          channel,
          state: "failed",
          reason: "Provider request failed.",
        });
      }
    }
  }

  return results;
}

export function notifyGiftLead(
  submission: GiftLeadSubmission,
  meta: SubmissionMeta,
  options?: SendNotificationOptions,
): Promise<NotificationChannelResult[]> {
  const message = buildGiftLeadNotificationTemplate(submission, meta);
  return sendAdminNotification(message, options);
}

export function notifyBookingRequest(
  submission: BookingRequestSubmission,
  meta: SubmissionMeta,
  options?: SendNotificationOptions,
): Promise<NotificationChannelResult[]> {
  const message = buildBookingRequestNotificationTemplate(submission, meta);
  return sendAdminNotification(message, options);
}
