import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BRAND, SITE_URL } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { alt as ogAlt, size as ogSize } from "@/app/opengraph-image";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

/** Path this locale's homepage/legal pages resolve to, root-relative. */
function localePath(locale: Locale, path: string): string {
  return locale === "en" ? path : `/${locale}${path === "/" ? "/" : path}`;
}

/**
 * Centralized metadata builder for the root layouts ((en) and [locale]) and
 * for fully-localized subpages (/learn/…).
 * `path` is the canonical English-locale path (e.g. "/" or "/learn/") —
 * legal pages are English-only at every locale, so their canonical/hreflang
 * always point at the unprefixed (en) path regardless of which locale's
 * layout is rendering them. Pass `path` with its trailing slash to match
 * `trailingSlash: true` served URLs.
 * `page` is set by subpages that carry their own title/description; the title
 * resolves against the layout's "%s · Tether-Zero" template.
 */
export async function buildMetadata(
  locale: Locale,
  path: string,
  page?: { title: string; description: string },
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const alternateLocales = (Object.keys(OG_LOCALE) as Locale[]).filter((l) => l !== locale);
  // The homepage and everything under /learn/ have real /fr/ and /es/
  // variants — legal pages are English-only at every locale (see
  // docs/i18n/gaps-and-recommendations.md), so their hreflang map must not
  // point at nonexistent /fr/privacy-policy style URLs; all their language
  // keys resolve to the same canonical English path.
  const hasLocaleVariants = path === "/" || path.startsWith("/learn");
  // Next only auto-attaches app/opengraph-image.tsx to its own (root)
  // segment; nested pages that declare their own openGraph must re-reference
  // it explicitly or they ship with no social image (same pattern as
  // (en)/privacy-policy/page.tsx).
  const ogImages = page ? [{ url: "/opengraph-image", ...ogSize, alt: ogAlt }] : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title:
      path === "/"
        ? { default: t("titleDefault"), template: t("titleTemplate") }
        : page?.title,
    description: page?.description ?? t("description"),
    applicationName: BRAND.name,
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    authors: [{ name: BRAND.company }],
    alternates: {
      canonical: localePath(locale, path),
      languages: {
        "en-US": path,
        fr: hasLocaleVariants ? localePath("fr", path) : path,
        es: hasLocaleVariants ? localePath("es", path) : path,
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      url: localePath(locale, path),
      siteName: BRAND.name,
      title: page?.title ?? t("titleDefault"),
      description: page?.description ?? t("description"),
      locale: OG_LOCALE[locale],
      alternateLocale: alternateLocales.map((l) => OG_LOCALE[l]),
      // Even an `images: undefined` key suppresses the file-convention
      // opengraph-image on the root segment — only add it when set.
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page?.title ?? t("titleDefault"),
      description: page?.description ?? t("description"),
      ...(ogImages ? { images: ogImages } : {}),
    },
    robots: { index: true, follow: true },
    category: "finance",
  };
}

export async function organizationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mark.svg`,
    description: t("description"),
  };
}
