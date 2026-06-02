import { getSupabaseAdminClient } from "../integrations/supabaseAdmin";

export const ADMIN_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "declined",
  "completed",
] as const;

export type AdminStatus = (typeof ADMIN_STATUSES)[number];
export type AdminTable = "gift_leads" | "booking_requests";

export interface SubmissionListItem {
  id: string;
  created_at: string;
  contact_name: string;
  email: string;
  status: string;
}

export interface SubmissionDetail extends SubmissionListItem {
  language: string;
  source: string;
  phone_or_whatsapp: string | null;
  consent: boolean;
  internal_notes: string | null;
  answers: Record<string, unknown>;
}

export interface SubmissionFilters {
  status?: string;
  from?: string;
  to?: string;
}

function withFilters<T extends { eq: Function; gte: Function; lte: Function }>(
  query: T,
  filters: SubmissionFilters,
): T {
  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.from) {
    query = query.gte("created_at", `${filters.from}T00:00:00.000Z`);
  }

  if (filters.to) {
    query = query.lte("created_at", `${filters.to}T23:59:59.999Z`);
  }

  return query;
}

export async function listSubmissions(
  table: AdminTable,
  filters: SubmissionFilters,
  limit = 100,
): Promise<SubmissionListItem[]> {
  const client = getSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase admin client is not configured.");
  }

  const query = withFilters(
    client
      .from(table)
      .select("id, created_at, contact_name, email, status")
      .order("created_at", { ascending: false })
      .limit(limit),
    filters,
  );

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SubmissionListItem[];
}

export async function getSubmissionDetail(
  table: AdminTable,
  id: string,
): Promise<SubmissionDetail | null> {
  const client = getSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase admin client is not configured.");
  }

  const { data, error } = await client
    .from(table)
    .select(
      "id, created_at, language, source, contact_name, email, phone_or_whatsapp, answers, consent, status, internal_notes",
    )
    .eq("id", id)
    .maybeSingle<SubmissionDetail>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateSubmission(
  table: AdminTable,
  id: string,
  payload: { status?: string; internalNotes?: string },
): Promise<void> {
  const client = getSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase admin client is not configured.");
  }

  const updatePayload: Record<string, string | null> = {};
  if (payload.status && ADMIN_STATUSES.includes(payload.status as AdminStatus)) {
    updatePayload.status = payload.status;
  }
  if (payload.internalNotes !== undefined) {
    updatePayload.internal_notes = payload.internalNotes.trim() || null;
  }

  if (Object.keys(updatePayload).length === 0) {
    return;
  }

  const { error } = await client.from(table).update(updatePayload).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}
