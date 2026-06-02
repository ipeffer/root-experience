import { ZodError } from "zod";

import { submitPublicGiftLead } from "../../../../lib/gift/publicFlow";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const result = await submitPublicGiftLead(body);
    if (result.ok) {
      return Response.json(
        {
          ok: true,
          id: result.id,
          createdAt: result.createdAt,
          slug: result.slug,
          giftPageUrl: result.giftPageUrl,
          mock: "mock" in result ? result.mock : false,
        },
        { status: 201 },
      );
    }

    const status = result.code === "VALIDATION_ERROR" ? 400 : 500;
    return Response.json(result, { status });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          ok: false,
          code: "VALIDATION_ERROR",
          message: "Lead payload is invalid.",
          details: error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Request body must be valid JSON.",
      },
      { status: 400 },
    );
  }
}
