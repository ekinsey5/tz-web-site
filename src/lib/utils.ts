/** Minimal className joiner (clsx-lite). */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a number as USD currency for a given locale. Prefer next-intl's
 * `useFormatter().number(value, {style:"currency",currency:"USD"})` inside
 * components with hook access — this is for non-hook call sites (e.g. JSON-LD
 * builders) that already have an explicit locale in scope.
 */
export function usd(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(value);
}
