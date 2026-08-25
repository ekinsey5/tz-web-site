import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { PRIVACY_POLICY } from "@/content/legal";
import { BRAND } from "@/content/site";
import { alt as ogAlt, size as ogSize } from "@/app/opengraph-image";

const title = "Privacy Policy";
const description =
  "How Tether-Zero collects, uses, and protects your information, including our mobile messaging (SMS) program and third-party integrations.";
// Next only auto-attaches opengraph-image.tsx's file-convention image to the
// exact segment it lives in (the app root); pages that declare their own
// openGraph/twitter object must reference the shared image explicitly.
const ogImages = [{ url: "/opengraph-image", ...ogSize, alt: ogAlt }];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy-policy",
    // English-only at every locale (see docs/i18n/gaps-and-recommendations.md) —
    // fr/es point at the same unprefixed page, not a nonexistent /fr/privacy-policy.
    languages: {
      "en-US": "/privacy-policy",
      fr: "/privacy-policy",
      es: "/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title,
    description,
    url: "/privacy-policy",
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

export default function PrivacyPolicyPage() {
  setRequestLocale("en");
  return <LegalPageLayout title="Privacy Policy" source={PRIVACY_POLICY} />;
}
