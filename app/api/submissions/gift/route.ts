import { submitGiftLead, toHttpResponse } from "../../../../lib/submissions/service";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const result = await submitGiftLead(body);
    return toHttpResponse(result);
  } catch {
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
