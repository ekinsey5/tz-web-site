import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Minimal, dependency-free Markdown renderer for the legal documents.
 * Supports exactly the syntax used in src/content/legal.ts:
 *   - `# ` and `## ` headings
 *   - `- ` unordered list items
 *   - paragraphs
 *   - inline `**bold**` and `[text](href)` links (internal links use next/link)
 * It is intentionally not a general-purpose Markdown parser.
 */

function slug(text: string): string {
  return text
    .replace(/^\d+(\.\d+)*\.?\s+/, "") // strip leading "1." / "2.1 " numbering
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Split a line of text into bold / link / plain inline nodes. */
function renderInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern).filter(Boolean);

  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-ink-strong">
          {bold[1]}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href} className="text-brand underline hover:no-underline">
            {label}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline hover:no-underline"
        >
          {label}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (list.length === 0) return;
    const items = list;
    list = [];
    blocks.push(
      <ul key={key} className="my-4 list-disc space-y-2 pl-6 text-body">
        {items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </ul>,
    );
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();

    if (line.startsWith("## ")) {
      flushList(`ul-${idx}`);
      const text = line.slice(3);
      blocks.push(
        <h3
          key={idx}
          id={slug(text)}
          className="mt-8 scroll-mt-24 text-lg font-semibold text-ink-strong"
        >
          {renderInline(text)}
        </h3>,
      );
    } else if (line.startsWith("# ")) {
      flushList(`ul-${idx}`);
      const text = line.slice(2);
      blocks.push(
        <h2
          key={idx}
          id={slug(text)}
          className="mt-12 scroll-mt-24 border-t border-ink/10 pt-8 text-2xl font-bold text-ink-strong first:mt-0 first:border-0 first:pt-0"
        >
          {renderInline(text)}
        </h2>,
      );
    } else if (line.startsWith("- ")) {
      list.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList(`ul-${idx}`);
    } else {
      flushList(`ul-${idx}`);
      blocks.push(
        <p key={idx} className="my-4 leading-relaxed text-body">
          {renderInline(line)}
        </p>,
      );
    }
  });

  flushList("ul-end");

  return <>{blocks}</>;
}
