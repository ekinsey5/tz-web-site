import {
  Target,
  Wallet,
  RefreshCw,
  Sparkles,
  LineChart,
  Flag,
  Users,
  Languages,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { Feature } from "@/content/site";

const ICONS: Record<string, LucideIcon> = {
  Target,
  Wallet,
  RefreshCw,
  Sparkles,
  LineChart,
  Flag,
  Users,
  Languages,
  ShieldCheck,
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon] ?? Sparkles;
  return (
    <div className="card h-full p-6 transition-colors duration-150 hover:border-line-strong">
      <span
        aria-hidden
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand"
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-h3">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{feature.body}</p>
    </div>
  );
}
