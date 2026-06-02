import { getGiftPageBySlug } from "../../../../lib/gift-pages/service";
import { renderGiftPageHtml, renderGiftPageNotFound } from "../../../../lib/gift-pages/renderPage";
import type { SupportedLanguage } from "../../../../lib/recommendations/types";

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

  const shareUrl = new URL(request.url);
  shareUrl.search = `lang=${page.language}`;

  return new Response(renderGiftPageHtml(page, shareUrl.toString()), {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
