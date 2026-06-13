import { Check } from "lucide-react";
import { COMPARE } from "@/content/site";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

export function ComparisonTable() {
  return (
    <Section id="compare" alt aria-labelledby="compare-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Why Tether Zero</p>
        <h2 id="compare-title" className="mt-3 text-h2">
          {COMPARE.heading}
        </h2>
        <p className="mt-4 text-lead text-muted">{COMPARE.subheading}</p>
      </div>

      <div
        role="region"
        aria-labelledby="compare-title"
        tabIndex={0}
        className="mt-10 overflow-x-auto rounded-xl border border-line bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">
            Feature comparison of Tether Zero, YNAB and EveryDollar
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-muted">
                Capability
              </th>
              <th
                scope="col"
                className="bg-brand-tint/60 px-5 py-4 text-sm font-bold text-brand"
              >
                {COMPARE.columns[0]}
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-ink-strong">
                {COMPARE.columns[1]}
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-ink-strong">
                {COMPARE.columns[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.rows.map((row, i) => (
              <tr
                key={row.capability}
                className={cn(i !== COMPARE.rows.length - 1 && "border-b border-line")}
              >
                <th
                  scope="row"
                  className="px-5 py-4 text-sm font-semibold text-ink-strong"
                >
                  {row.capability}
                </th>
                <td className="bg-brand-tint/40 px-5 py-4 text-sm font-medium text-ink-strong">
                  <span className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      strokeWidth={3}
                      aria-hidden
                    />
                    {row.tetherZero}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-muted">{row.ynab}</td>
                <td className="px-5 py-4 text-sm text-muted">{row.everyDollar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">{COMPARE.footnote}</p>
    </Section>
  );
}
