import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/i18n/config";

/**
 * Shared chrome for the /learn pages: the full site nav and footer. Unlike
 * the legal pages, these routes exist in every locale, so internal links are
 * locale-prefixed (Nav handles this itself).
 */
export async function LearnPageChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />

      <main id="main" className="bg-page">
        {children}
      </main>

      <Footer locale={locale} />
    </>
  );
}
