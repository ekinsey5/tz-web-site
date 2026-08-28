import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ConnectYourBankArticlePage } from "@/components/pages/ConnectYourBankArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.connectYourBank" });
  return buildMetadata("en", ARTICLES.connectYourBank.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <ConnectYourBankArticlePage locale="en" />;
}
