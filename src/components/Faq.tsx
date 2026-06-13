"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/content/site";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" alt aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="mt-3 text-h2">
            {FAQ.heading}
          </h2>
        </div>

        <dl className="mt-10 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q}>
                <dt>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:px-6"
                  >
                    <span className="text-base font-semibold text-ink-strong">
                      {item.q}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm leading-relaxed text-body sm:px-6"
                >
                  {item.a}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </Section>
  );
}
