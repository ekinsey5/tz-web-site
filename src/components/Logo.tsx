import { cn } from "@/lib/utils";

/** Tether-Zero wordmark: teal "TZ" mark + name. Decorative mark is aria-hidden. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-[15px] font-bold leading-none tracking-tight text-white"
      >
        TZ
      </span>
      <span className="text-lg font-bold tracking-tight text-ink-strong">
        Tether-Zero
      </span>
    </span>
  );
}
