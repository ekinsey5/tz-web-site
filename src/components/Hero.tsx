import { ArrowRight, ShieldCheck } from "lucide-react";
import { HERO } from "@/content/site";
import { SCREENSHOTS } from "@/content/assets";
import { Reveal } from "./Reveal";
import { Screenshot } from "./Screenshot";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-tint/50 to-page"
    >
      <div className="container-tz grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div>
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="mt-4 text-display text-ink-strong">{HERO.heading}</h1>
          <p className="mt-5 max-w-prose text-lead text-body">
            {HERO.subheading}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={HERO.primaryCta.href} className="btn-primary">
              {HERO.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={HERO.secondaryCta.href} className="btn-secondary">
              {HERO.secondaryCta.label}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {HERO.trust.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 text-sm text-muted"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <Screenshot asset={SCREENSHOTS.hero} priority />
        </Reveal>
      </div>
    </section>
  );
}
