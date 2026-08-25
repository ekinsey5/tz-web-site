import { setRequestLocale } from "next-intl/server";
import { RootDocument } from "@/components/RootDocument";

/**
 * Top-level 404. Needed because there's no single top-level layout anymore
 * (English lives under the (en) route group, fr/es under [locale]) — a URL
 * matching neither tree has no root layout to render under otherwise.
 * Defaults to English since we can't know the visitor's intended locale for
 * a genuinely unmatched path.
 */
export default async function NotFound() {
  setRequestLocale("en");
  return (
    <RootDocument locale="en">
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-h2 text-ink-strong">Page not found</h1>
        <p className="text-body">
          The page you&rsquo;re looking for doesn&rsquo;t exist.{" "}
          <a href="/" className="text-brand underline hover:no-underline">
            Go back home
          </a>
          .
        </p>
      </main>
    </RootDocument>
  );
}
