"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn, usd } from "@/lib/utils";

/**
 * Illustrative client-side debt-payoff simulator powering the Debt Crusher
 * micro-interaction. Uses a fixed sample of debts so the marketing page can
 * demonstrate snowball vs. avalanche instantly. Clearly labeled as an example;
 * it is NOT the product and uses no real user data.
 */

interface Debt {
  name: string;
  balance: number;
  apr: number;
  min: number;
}

// Sample debts chosen so snowball (smallest balance first) and avalanche
// (highest APR first) attack debts in a DIFFERENT order — the store card is
// the smallest balance but the credit card has the highest APR — so the two
// strategies produce visibly different results.
const DEBTS: Debt[] = [
  { name: "Store card", balance: 1600, apr: 0.1599, min: 55 },
  { name: "Credit card", balance: 8200, apr: 0.2299, min: 230 },
  { name: "Car loan", balance: 11800, apr: 0.069, min: 300 },
  { name: "Student loan", balance: 9200, apr: 0.045, min: 160 },
];

const BASE_MIN_TOTAL = DEBTS.reduce((s, d) => s + d.min, 0);

type Strategy = "snowball" | "avalanche";

function ordered(debts: Debt[], strategy: Strategy): Debt[] {
  const active = debts.filter((d) => d.balance > 0.01);
  return strategy === "snowball"
    ? active.sort((a, b) => a.balance - b.balance)
    : active.sort((a, b) => b.apr - a.apr);
}

/** Simulate rollover payoff with a constant total budget (minimums + extra). */
function simulate(strategy: Strategy, extra: number) {
  const debts = DEBTS.map((d) => ({ ...d }));
  let month = 0;
  let totalInterest = 0;

  while (debts.some((d) => d.balance > 0.01) && month < 600) {
    month++;
    for (const d of debts) {
      if (d.balance > 0) {
        const interest = d.balance * (d.apr / 12);
        d.balance += interest;
        totalInterest += interest;
      }
    }
    // Budget stays constant; freed minimums roll into the focus debt.
    let pool = BASE_MIN_TOTAL + extra;
    for (const d of ordered(debts, strategy)) {
      const pay = Math.min(d.min, d.balance);
      d.balance -= pay;
      pool -= pay;
    }
    for (const d of ordered(debts, strategy)) {
      if (pool <= 0) break;
      const pay = Math.min(pool, d.balance);
      d.balance -= pay;
      pool -= pay;
    }
  }
  return { months: month, totalInterest: Math.round(totalInterest) };
}

/** Minimum-only baseline: no rollover, no extra. */
function baseline() {
  let totalInterest = 0;
  let maxMonth = 0;
  for (const d0 of DEBTS) {
    const d = { ...d0 };
    let m = 0;
    while (d.balance > 0.01 && m < 600) {
      m++;
      const interest = d.balance * (d.apr / 12);
      d.balance += interest;
      totalInterest += interest;
      d.balance -= Math.min(d.min, d.balance);
    }
    maxMonth = Math.max(maxMonth, m);
  }
  return { months: maxMonth, totalInterest: Math.round(totalInterest) };
}

function Stat({
  value,
  label,
  tone = "default",
}: {
  value: string;
  label: string;
  tone?: "default" | "success";
}) {
  return (
    <div className="rounded-lg border border-line bg-page p-3">
      <div
        className={cn(
          "tz-number text-lg font-bold",
          tone === "success" ? "text-success-strong" : "text-ink-strong",
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted">{label}</div>
    </div>
  );
}

export function StrategySimulator() {
  const reduce = useReducedMotion();
  const [strategy, setStrategy] = useState<Strategy>("avalanche");
  const [extra, setExtra] = useState(200);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const base = useMemo(() => baseline(), []);
  const result = useMemo(() => simulate(strategy, extra), [strategy, extra]);

  const monthsSaved = Math.max(0, base.months - result.months);
  const interestSaved = Math.max(0, base.totalInterest - result.totalInterest);

  const dateLabel = useMemo(() => {
    if (!mounted) return "—";
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + result.months);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [mounted, result.months]);

  return (
    <div className="card overflow-hidden shadow-tz-lg">
      <div className="flex items-center justify-between border-b border-line bg-subtle px-5 py-3">
        <span className="text-sm font-semibold text-ink-strong">
          Strategy simulator
        </span>
        <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-xs font-medium text-brand">
          Live preview
        </span>
      </div>

      <div className="space-y-5 p-5">
        {/* Strategy toggle */}
        <div
          role="group"
          aria-label="Payoff strategy"
          className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-page p-1"
        >
          {(["snowball", "avalanche"] as Strategy[]).map((s) => {
            const isActive = strategy === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={isActive}
                onClick={() => setStrategy(s)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium capitalize transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  isActive
                    ? "bg-brand text-white"
                    : "text-body hover:text-ink-strong",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Extra payment stepper */}
        <div className="flex items-center justify-between">
          <label htmlFor="extra-payment" className="text-sm font-medium text-body">
            Extra per month
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease extra payment by 50 dollars"
              onClick={() => setExtra((v) => Math.max(0, v - 50))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-40"
              disabled={extra <= 0}
            >
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <output
              id="extra-payment"
              className="tz-number w-16 text-center text-sm font-semibold text-ink-strong"
            >
              ${extra}
            </output>
            <button
              type="button"
              aria-label="Increase extra payment by 50 dollars"
              onClick={() => setExtra((v) => Math.min(600, v + 50))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-40"
              disabled={extra >= 600}
            >
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Result */}
        <div aria-live="polite" className="space-y-4">
          <div className="rounded-xl border border-line bg-gradient-to-br from-brand-tint/60 to-page p-4 text-center">
            <div className="text-xs font-medium uppercase tracking-wide text-muted">
              Projected debt-free
            </div>
            <motion.div
              key={`${strategy}-${extra}`}
              initial={reduce ? false : { opacity: 0.3, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="tz-number mt-1 text-3xl font-bold text-ink-strong"
            >
              {result.months} months
            </motion.div>
            <div
              className="tz-number mt-0.5 text-sm text-body"
              suppressHydrationWarning
            >
              ≈ {dateLabel}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Stat value={usd(result.totalInterest)} label="Interest paid" />
            <Stat
              value={usd(interestSaved)}
              label="Interest saved"
              tone="success"
            />
            <Stat
              value={`${monthsSaved} mo`}
              label="Sooner than minimums"
              tone="success"
            />
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted">
          Illustrative example using sample debts — not financial advice. Your
          results depend on your actual balances, APRs and budget.
        </p>
      </div>
    </div>
  );
}
