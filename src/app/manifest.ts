import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { BRAND } from "@/content/site";

// English-only for now (see docs/i18n/gaps-and-recommendations.md) — a
// per-locale manifest is possible later via [locale]/manifest.ts if needed.
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: "en", namespace: "Meta" });
  return {
    name: `${BRAND.name} — ${t("tagline")}`,
    short_name: BRAND.name,
    description: t("description"),
    start_url: "/",
    display: "standalone",
    background_color: "#F9FAFB",
    theme_color: "#1D4ED8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
