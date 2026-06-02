import { getSupabaseAdminClient } from "../integrations/supabaseAdmin";
import { buildGiftPageSlugBase, withCollisionSuffix } from "./slug";
import {
  giftPageCreateSchema,
  type GiftPageCreateInput,
  type GiftPageRecord,
  type GiftPageResult,
} from "./types";

const mockGiftPages = new Map<string, GiftPageRecord>();

function toGiftPageRecord(row: GiftPageRecord): GiftPageRecord {
  return row;
}

async function slugExists(slug: string): Promise<boolean> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return mockGiftPages.has(slug);
  }

  const { data, error } = await client
    .from("gift_pages")
    .select("id")
    .eq("slug", slug)
    .maybeSingle<{ id: string }>();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

async function resolveUniqueSlug(input: GiftPageCreateInput): Promise<string> {
  const base = buildGiftPageSlugBase({
    recipientName: input.recipientName,
    giverName: input.giverName,
    occasion: input.occasion,
    recommendationId: input.recommendedGiftId,
  });

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = withCollisionSuffix(base, attempt);
    const exists = await slugExists(candidate);
    if (!exists) {
      return candidate;
    }
  }

  return `${base}-${Date.now().toString(36)}`;
}

function createMockGiftPage(input: GiftPageCreateInput, slug: string): GiftPageRecord {
  const record: GiftPageRecord = {
    id: `mock-page-${Date.now()}`,
    created_at: new Date().toISOString(),
    slug,
    language: input.language,
    occasion: input.occasion,
    recipient_name: input.recipientName,
    giver_name: input.giverName,
    personal_message: input.personalMessage,
    recommended_gift_id: input.recommendedGiftId,
    recommended_gift_title: input.recommendedGiftTitle,
    cta_url: input.ctaUrl || null,
    lead_id: input.leadId ?? null,
    status: input.status,
  };
  mockGiftPages.set(slug, record);
  return record;
}

export async function createGiftPage(input: unknown): Promise<GiftPageResult> {
  const parsed = giftPageCreateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Gift page payload is invalid.",
      details: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
    };
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    const slug = await resolveUniqueSlug(parsed.data);
    const record = createMockGiftPage(parsed.data, slug);
    return {
      ok: true,
      id: record.id,
      slug: record.slug,
      createdAt: record.created_at,
      mock: true,
    };
  }

  try {
    const slug = await resolveUniqueSlug(parsed.data);
    const { data, error } = await client
      .from("gift_pages")
      .insert({
        slug,
        language: parsed.data.language,
        occasion: parsed.data.occasion,
        recipient_name: parsed.data.recipientName,
        giver_name: parsed.data.giverName,
        personal_message: parsed.data.personalMessage,
        recommended_gift_id: parsed.data.recommendedGiftId,
        recommended_gift_title: parsed.data.recommendedGiftTitle,
        cta_url: parsed.data.ctaUrl || null,
        lead_id: parsed.data.leadId ?? null,
        status: parsed.data.status,
      })
      .select("id, slug, created_at")
      .single<{ id: string; slug: string; created_at: string }>();

    if (error || !data) {
      return {
        ok: false,
        code: "DATABASE_ERROR",
        message: error?.message ?? "Unable to create gift page.",
      };
    }

    return {
      ok: true,
      id: data.id,
      slug: data.slug,
      createdAt: data.created_at,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return { ok: false, code: "DATABASE_ERROR", message };
  }
}

export async function getGiftPageBySlug(slug: string): Promise<GiftPageRecord | null> {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return mockGiftPages.get(normalized) ?? null;
  }

  const { data, error } = await client
    .from("gift_pages")
    .select(
      "id, created_at, slug, language, occasion, recipient_name, giver_name, personal_message, recommended_gift_id, recommended_gift_title, cta_url, lead_id, status",
    )
    .eq("slug", normalized)
    .eq("status", "active")
    .maybeSingle<GiftPageRecord>();

  if (error) {
    throw new Error(error.message);
  }

  return data ? toGiftPageRecord(data) : null;
}

export async function getGiftPageByLeadId(leadId: string): Promise<{ slug: string } | null> {
  const client = getSupabaseAdminClient();
  if (!client) {
    for (const page of mockGiftPages.values()) {
      if (page.lead_id === leadId) {
        return { slug: page.slug };
      }
    }
    return null;
  }

  const { data, error } = await client
    .from("gift_pages")
    .select("slug")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ slug: string }>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/** Test helper */
export function resetMockGiftPagesForTests(): void {
  mockGiftPages.clear();
}
