export type PublicLocale = "en" | "it" | "ru";

export function resolvePublicLocale(url: URL): PublicLocale {
  const locale = (url.searchParams.get("lang") ?? "en").toLowerCase();
  if (locale === "it" || locale === "ru") {
    return locale;
  }
  return "en";
}

export function localeQuery(locale: PublicLocale): string {
  return `lang=${encodeURIComponent(locale)}`;
}
