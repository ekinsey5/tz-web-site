import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const LEGAL_PATHS = ["/privacy-policy", "/terms-of-service"];

/** Path prefixes that exist in every locale and deep-link across them. */
const LOCALIZED_PREFIXES = ["/learn"];

/** Prefix a root-relative, trailing-slashed path for a locale ("/learn/" → "/fr/learn/"). */
export function localizePath(locale: Locale, path: string): string {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

/** Strip a known locale prefix (e.g. "/fr") off a pathname, if present. */
function stripLocalePrefix(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length) || "/";
    }
  }
  return pathname;
}

/** The locale the given pathname is currently rendered under. */
export function currentLocaleFromPathname(pathname: string): Locale {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Where switching to `targetLocale` from the current `pathname` should go.
 * Legal pages are English-only at every locale (see
 * docs/i18n/gaps-and-recommendations.md) — they always resolve to their
 * existing unprefixed path, never a nonexistent `/fr/privacy-policy`.
 */
export function localizedHref(targetLocale: Locale, pathname: string): string {
  const unprefixed = stripLocalePrefix(pathname);
  if (LEGAL_PATHS.some((p) => unprefixed === p || unprefixed === `${p}/`)) {
    return unprefixed;
  }
  if (
    LOCALIZED_PREFIXES.some(
      (p) => unprefixed === p || unprefixed === `${p}/` || unprefixed.startsWith(`${p}/`),
    )
  ) {
    const normalized = unprefixed.endsWith("/") ? unprefixed : `${unprefixed}/`;
    return localizePath(targetLocale, normalized);
  }
  return targetLocale === DEFAULT_LOCALE ? "/" : `/${targetLocale}/`;
}
