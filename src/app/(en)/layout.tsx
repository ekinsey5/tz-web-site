import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { RootDocument } from "@/components/RootDocument";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", "/");
}

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

export default async function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale("en");
  return <RootDocument locale="en">{children}</RootDocument>;
}
