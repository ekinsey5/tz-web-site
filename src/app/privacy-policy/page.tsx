import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tether-Zero collects, uses, and protects your information, including our mobile messaging (SMS) program and third-party integrations.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPageLayout title="Privacy Policy" source={PRIVACY_POLICY} />;
}
