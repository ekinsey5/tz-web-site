import { getTranslations } from "next-intl/server";
import { HOW_IT_WORKS_STEP_NUMBERS } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { Locale } from "@/i18n/config";

export async function HowItWorks({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "HowItWorks" });
  const steps = t.raw("steps") as { title: string; body: string }[];

  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 id="how-it-works-title" className="mt-3 text-h2">
          {t("heading")}
        </h2>
        <p className="mt-4 text-lead text-muted">{t("subheading")}</p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS_STEP_NUMBERS.map((number, i) => (
          <Reveal as="li" key={number} delay={i * 0.07} className="card p-6">
            <span
              aria-hidden
              className="tz-number grid h-10 w-10 place-items-center rounded-lg bg-brand-tint text-base font-bold text-brand"
            >
              {number}
            </span>
            <h3 className="mt-4 text-h3">
              <span className="sr-only">{t("stepAriaPrefix", { number })}</span>
              {steps[i].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{steps[i].body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
