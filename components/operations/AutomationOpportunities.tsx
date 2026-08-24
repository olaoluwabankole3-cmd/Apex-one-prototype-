"use client";

import { Zap } from "lucide-react";
import clsx from "clsx";
import GlassCard from "@/components/ui/GlassCard";
import { automationOpportunities } from "@/lib/mockData";
import { AutomationOpportunity } from "@/lib/types";

const effortStyle: Record<AutomationOpportunity["effort"], string> = {
  low: "text-emerald bg-emerald/10 border-emerald/25",
  medium: "text-amber bg-amber/10 border-amber/25",
  high: "text-crimson bg-crimson/10 border-crimson/25",
};

export default function AutomationOpportunities() {
  return (
    <GlassCard delay={0.2} className="p-5 lg:p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-[15px] font-bold text-ivory">Automation Opportunities</p>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <Zap size={13} strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-0.5 text-[12px] text-ivory/40">Workflow bottlenecks flagged for automation</p>

      <div className="mt-4 space-y-3">
        {automationOpportunities.map((op) => (
          <div key={op.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12.5px] font-medium text-ivory/90">{op.process}</p>
                <p className="mt-0.5 text-[11px] text-ivory/40">{op.subsidiary}</p>
              </div>
              <span
                className={clsx(
                  "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize",
                  effortStyle[op.effort]
                )}
              >
                {op.effort} effort
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-ivory/55">{op.description}</p>
            <p className="mt-1.5 text-[11.5px] font-medium text-gold/80">{op.impact}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
