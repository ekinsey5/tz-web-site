import { ArrowRight } from "lucide-react";
import { FINAL_CTA } from "@/content/site";

export function FinalCta() {
  return (
    <section id="cta" className="section" aria-labelledby="cta-title">
      <div className="container-tz">
        <div className="overflow-hidden rounded-2xl bg-brand-hover px-6 py-14 text-center sm:px-12 lg:py-20">
          <h2 id="cta-title" className="text-h2 text-white">
            {FINAL_CTA.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-white/90">
            {FINAL_CTA.body}
          </p>
          <a
            href={FINAL_CTA.cta.href}
            className="btn mt-8 bg-white px-6 py-3 text-brand-hover hover:bg-page focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-hover"
          >
            {FINAL_CTA.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
