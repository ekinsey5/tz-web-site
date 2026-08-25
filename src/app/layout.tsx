/**
 * Minimal pass-through layout. Not a real root layout (no <html>/<body>) —
 * (en)/layout.tsx and [locale]/layout.tsx each render their own full root
 * layout for actual routes. This file exists only so the top-level
 * not-found.tsx (which handles genuinely unmatched paths outside both route
 * groups) has a layout ancestor to attach to, per Next.js's requirement that
 * every page have a root layout somewhere in its chain.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
