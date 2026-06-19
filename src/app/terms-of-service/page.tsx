import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { TERMS_OF_SERVICE } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your access to and use of Tether-Zero, operated by SpringThought, LLC.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return <LegalPageLayout title="Terms of Service" source={TERMS_OF_SERVICE} />;
}
