import { ZodError } from "zod";

import { getGiftRecommendation } from "../../../../lib/gift/publicFlow";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const recommendation = getGiftRecommendation(body);
    return Response.json({ ok: true, ...recommendation }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          ok: false,
          code: "VALIDATION_ERROR",
          message: "Recommendation payload is invalid.",
          details: error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        ok: false,
        code: "UNEXPECTED_ERROR",
        message: "Unable to compute recommendation.",
      },
      { status: 500 },
    );
  }
}
