import { cn } from "@/lib/utils";

/** Tether-Zero horizontal logo lockup (ring + green dot + wordmark). */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-full.svg"
      alt="Tether Zero"
      width={1862}
      height={468}
      className={cn("h-[38px] w-auto", className)}
    />
  );
}
