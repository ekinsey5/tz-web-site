import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LearnIndexPage } from "@/components/pages/LearnIndexPage";
import { buildMetadata } from "@/lib/seo";
import { LEARN_PATH } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Learn" });
  return buildMetadata("en", LEARN_PATH, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <LearnIndexPage locale="en" />;
}
