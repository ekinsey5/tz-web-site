import type { Metadata, Viewport } from "next";
import { inter } from "@/lib/fonts";
import { BRAND, SITE_URL } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — Become debt-free with a plan you can actually follow`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  keywords: [
    "debt payoff",
    "debt snowball",
    "debt avalanche",
    "budgeting app",
    "zero-based budgeting",
    "personal finance",
    "AI money coach",
  ],
  authors: [{ name: BRAND.company }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name} — Become debt-free with a plan you can actually follow`,
    description: BRAND.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Become debt-free with a plan you can actually follow`,
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
  category: "finance",
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-mark.svg`,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
