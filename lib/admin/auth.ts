import { timingSafeEqual } from "node:crypto";

import { getSupabaseAdminClient } from "../integrations/supabaseAdmin";

const ADMIN_SESSION_COOKIE = "root_admin_session";

function parseCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies: Record<string, string> = {};

  for (const chunk of cookieHeader.split(";")) {
    const [rawKey, ...rest] = chunk.trim().split("=");
    if (!rawKey) {
      continue;
    }
    cookies[rawKey] = decodeURIComponent(rest.join("="));
  }

  return cookies;
}

function constantTimeMatch(value: string, expected: string): boolean {
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export async function isAuthorizedAdminRequest(request: Request): Promise<boolean> {
  const cookies = parseCookies(request);
  const fallbackPassword = process.env.ADMIN_DASHBOARD_PASSWORD?.trim();

  if (fallbackPassword && cookies[ADMIN_SESSION_COOKIE]) {
    if (constantTimeMatch(cookies[ADMIN_SESSION_COOKIE], fallbackPassword)) {
      return true;
    }
  }

  const accessToken = cookies["sb-access-token"] ?? cookies["access_token"] ?? "";
  if (!accessToken) {
    return false;
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return false;
  }

  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user?.email) {
    return false;
  }

  const allowList = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowList.length === 0) {
    return true;
  }

  return allowList.includes(data.user.email.toLowerCase());
}

export function buildAdminSessionCookie(value: string): string {
  return `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Secure`;
}

export function clearAdminSessionCookie(): string {
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;
}

export function getFallbackPassword(): string {
  return process.env.ADMIN_DASHBOARD_PASSWORD?.trim() ?? "";
}
