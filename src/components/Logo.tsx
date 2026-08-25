import { cn } from "@/lib/utils";
import { BRAND } from "@/content/site";

/** Tether-Zero horizontal logo lockup (ring + green dot + wordmark). */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-full.svg"
      alt={BRAND.name}
      width={1862}
      height={468}
      className={cn("h-[38px] w-auto", className)}
    />
  );
}
