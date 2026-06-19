import Link from "next/link";
import { SMS_DISCLOSURE, LEGAL_ROUTES } from "@/content/legal";

/**
 * A2P / Toll-Free SMS opt-in disclosure.
 * Renders the carrier-required disclosure text with linked Terms of Service and
 * Privacy Policy. Shown as informational copy here (this marketing site does not
 * collect phone numbers); the functional default-off consent checkbox lives at
 * the point of collection in the product app's SMS two-factor enrollment flow.
 */
export function SmsDisclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-white/60 ${className}`}>
      {SMS_DISCLOSURE.before}
      <Link href={LEGAL_ROUTES.terms} className="underline hover:text-white">
        {SMS_DISCLOSURE.termsLabel}
      </Link>
      {SMS_DISCLOSURE.between}
      <Link href={LEGAL_ROUTES.privacy} className="underline hover:text-white">
        {SMS_DISCLOSURE.privacyLabel}
      </Link>
      {SMS_DISCLOSURE.after}
    </p>
  );
}
