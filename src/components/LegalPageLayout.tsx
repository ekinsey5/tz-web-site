import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Markdown } from "@/components/Markdown";
import { Footer } from "@/components/Footer";
import { LEGAL_LAST_UPDATED } from "@/content/legal";

/** Shared chrome for the Privacy Policy and Terms of Service pages. */
export function LegalPageLayout({
  title,
  source,
}: {
  title: string;
  source: string;
}) {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-tz flex h-16 items-center justify-between">
          <Link href="/" aria-label="Tether-Zero home">
            <Logo />
          </Link>
          <Link href="/" className="text-sm font-medium text-brand hover:underline">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="bg-page">
        <article className="container-tz max-w-prose py-12 sm:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">Last Updated: {LEGAL_LAST_UPDATED}</p>
          <div className="mt-8">
            <Markdown source={source} />
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
