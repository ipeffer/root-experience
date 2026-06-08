import { getGiftPageBySlug } from "../../../../../lib/gift-pages/service";
import { buildGiftPageUrls, renderGiftPageNotFound } from "../../../../../lib/gift-pages/renderPage";
import { renderGiftRevealHtml } from "../../../../../lib/gift-pages/renderReveal";
import type { SupportedLanguage } from "../../../../../lib/recommendations/types";

function resolveLocale(request: Request): SupportedLanguage {
  const url = new URL(request.url);
  const locale = (url.searchParams.get("lang") ?? "en").toLowerCase();
  if (locale === "it" || locale === "ru") {
    return locale;
  }
  return "en";
}

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await context.params;
  const locale = resolveLocale(request);
  const page = await getGiftPageBySlug(slug);

  if (!page) {
    return new Response(renderGiftPageNotFound(locale), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const origin = new URL(request.url).origin;
  const { certificateUrl } = buildGiftPageUrls(page.slug, page.language, origin);

  return new Response(renderGiftRevealHtml(page, certificateUrl), {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
