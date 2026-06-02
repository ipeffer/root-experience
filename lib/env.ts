export interface SupabaseServerEnv {
  supabaseUrl: string;
  serviceRoleKey: string;
}

export interface NotificationEmailEnv {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
}

export interface NotificationTelegramEnv {
  botToken: string;
  chatId: string;
}

export function getSupabaseServerEnv(): SupabaseServerEnv | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return {
    supabaseUrl,
    serviceRoleKey,
  };
}

export function getNotificationEmailEnv(): NotificationEmailEnv | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const toEmail = process.env.NOTIFY_EMAIL_TO?.trim();

  if (!apiKey || !fromEmail || !toEmail) {
    return null;
  }

  return { apiKey, fromEmail, toEmail };
}

export function getNotificationTelegramEnv(): NotificationTelegramEnv | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return null;
  }

  return { botToken, chatId };
}
