/**
 * End-of-article sign-up call to action. Presentational: the caller passes
 * already-translated copy, keeping this reusable for future /learn articles.
 * Deliberately lighter than the homepage's full-bleed FinalCta band — it sits
 * inside a 65ch prose column.
 */
export function ArticleCta({
  heading,
  body,
  buttonLabel,
  href,
}: {
  heading: string;
  body: string;
  buttonLabel: string;
  href: string;
}) {
  return (
    <aside className="mt-12 rounded-2xl bg-brand-tint/60 p-8 text-center">
      <h2 className="text-h3 text-ink-strong">{heading}</h2>
      <p className="mt-3 text-body">{body}</p>
      <a href={href} className="btn-primary mt-6">
        {buttonLabel}
      </a>
    </aside>
  );
}
