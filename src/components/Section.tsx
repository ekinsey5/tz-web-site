import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  /** Use the subtle alt background. */
  alt?: boolean;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

/** A page section with an anchor id and consistent vertical rhythm. */
export function Section({ id, className, alt, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section scroll-mt-20", alt && "bg-subtle", className)}
      {...rest}
    >
      <div className="container-tz">{children}</div>
    </section>
  );
}
