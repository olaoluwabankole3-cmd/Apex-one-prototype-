"use client";

import clsx from "clsx";
import GlassCard from "@/components/ui/GlassCard";
import { customers } from "@/lib/mockData";

const statusDot: Record<string, string> = {
  active: "bg-emerald",
  "at-risk": "bg-crimson",
  onboarding: "bg-amber",
};

export default function TopAccountsPanel() {
  const top = [...customers].sort((a, b) => b.arr - a.arr).slice(0, 5);

  return (
    <GlassCard delay={0.15} className="p-5 lg:p-6">
      <p className="font-display text-[15px] font-bold text-ivory">Top Accounts by ARR</p>
      <p className="mt-0.5 text-[12px] text-ivory/40">Across all subsidiaries</p>

      <div className="mt-4 space-y-1">
        {top.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3 rounded-lg px-1 py-2">
            <span className="font-mono text-[11px] text-ivory/30">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 font-display text-[12px] font-bold text-gold">
              {c.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-medium text-ivory/90">{c.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ivory/40">
                <span className={clsx("h-1.5 w-1.5 rounded-full", statusDot[c.status])} />
                {c.subsidiary}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[12.5px] font-medium text-ivory/85">
              ${c.arr.toFixed(2)}M
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
