import type { Metadata, Viewport } from "next";
import { inter } from "@/lib/fonts";
import { BRAND } from "@/content/site";
import "./globals.css";

const SITE_URL = "https://www.tether-zero.com"; // [PLACEHOLDER] marketing domain

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
  themeColor: "#0D9488",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
