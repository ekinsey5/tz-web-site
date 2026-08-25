import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { TERMS_OF_SERVICE } from "@/content/legal";
import { BRAND } from "@/content/site";
import { alt as ogAlt, size as ogSize } from "@/app/opengraph-image";

const title = "Terms of Service";
const description =
  "The terms governing your access to and use of Tether-Zero, operated by SpringThought, LLC.";
// Next only auto-attaches opengraph-image.tsx's file-convention image to the
// exact segment it lives in (the app root); pages that declare their own
// openGraph/twitter object must reference the shared image explicitly.
const ogImages = [{ url: "/opengraph-image", ...ogSize, alt: ogAlt }];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms-of-service",
    // English-only at every locale (see docs/i18n/gaps-and-recommendations.md) —
    // fr/es point at the same unprefixed page, not a nonexistent /fr/terms-of-service.
    languages: {
      "en-US": "/terms-of-service",
      fr: "/terms-of-service",
      es: "/terms-of-service",
      "x-default": "/terms-of-service",
    },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title,
    description,
    url: "/terms-of-service",
    locale: "en_US",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ogImages,
  },
};

export default function TermsOfServicePage() {
  setRequestLocale("en");
  return <LegalPageLayout title="Terms of Service" source={TERMS_OF_SERVICE} />;
}
