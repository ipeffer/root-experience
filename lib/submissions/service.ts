import { ZodError } from "zod";

import { getSupabaseAdminClient } from "../integrations/supabaseAdmin";
import {
  bookingRequestSubmissionSchema,
  giftLeadSubmissionSchema,
  type BookingRequestSubmissionInput,
  type GiftLeadSubmissionInput,
} from "../validation/submissions";

type SubmissionTable = "gift_leads" | "booking_requests";
type SubmissionErrorCode = Extract<SubmissionResult, { ok: false }>["code"];

interface SubmissionRow {
  id: string;
  created_at: string;
}

export type SubmissionResult =
  | { ok: true; id: string; createdAt: string }
  | { ok: false; code: "VALIDATION_ERROR"; message: string; details: string[] }
  | { ok: false; code: "CONFIG_ERROR"; message: string }
  | { ok: false; code: "DATABASE_ERROR"; message: string };

async function insertSubmission(table: SubmissionTable, payload: unknown): Promise<SubmissionResult> {
  const parsed =
    table === "gift_leads"
      ? giftLeadSubmissionSchema.safeParse(payload)
      : bookingRequestSubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Submission payload is invalid.",
      details: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
    };
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return {
      ok: false,
      code: "CONFIG_ERROR",
      message: "Supabase environment variables are missing.",
    };
  }

  const { data, error } = await client
    .from(table)
    .insert({
      language: parsed.data.language,
      source: parsed.data.source,
      contact_name: parsed.data.contactName,
      email: parsed.data.email,
      phone_or_whatsapp: parsed.data.phoneOrWhatsApp || null,
      answers: parsed.data.answers,
      consent: parsed.data.consent,
      status: parsed.data.status,
      internal_notes: parsed.data.internalNotes ?? null,
    })
    .select("id, created_at")
    .single<SubmissionRow>();

  if (error || !data) {
    return {
      ok: false,
      code: "DATABASE_ERROR",
      message: error?.message ?? "Unable to persist submission.",
    };
  }

  return {
    ok: true,
    id: data.id,
    createdAt: data.created_at,
  };
}

function mapStatusCode(code: SubmissionErrorCode): number {
  switch (code) {
    case "VALIDATION_ERROR":
      return 400;
    case "CONFIG_ERROR":
      return 503;
    case "DATABASE_ERROR":
      return 500;
    default:
      return 500;
  }
}

export function toHttpResponse(result: SubmissionResult): Response {
  if (result.ok) {
    return Response.json(
      {
        ok: true,
        id: result.id,
        createdAt: result.createdAt,
      },
      { status: 201 },
    );
  }

  const body =
    result.code === "VALIDATION_ERROR"
      ? { ok: false, code: result.code, message: result.message, details: result.details }
      : { ok: false, code: result.code, message: result.message };

  return Response.json(body, { status: mapStatusCode(result.code) });
}

export async function submitGiftLead(input: GiftLeadSubmissionInput): Promise<SubmissionResult> {
  try {
    return await insertSubmission("gift_leads", input);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Submission payload is invalid.",
        details: error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
      };
    }

    return { ok: false, code: "DATABASE_ERROR", message: "Unexpected server error." };
  }
}

export async function submitBookingRequest(
  input: BookingRequestSubmissionInput,
): Promise<SubmissionResult> {
  try {
    return await insertSubmission("booking_requests", input);
  } catch {
    return { ok: false, code: "DATABASE_ERROR", message: "Unexpected server error." };
  }
}
