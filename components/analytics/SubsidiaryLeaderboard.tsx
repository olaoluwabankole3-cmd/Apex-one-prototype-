"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";
import GlassCard from "@/components/ui/GlassCard";
import { subsidiaryPerformance } from "@/lib/mockData";

export default function SubsidiaryLeaderboard() {
  const sorted = [...subsidiaryPerformance].sort((a, b) => b.portfolioValue - a.portfolioValue);

  return (
    <GlassCard delay={0.1} className="p-5 lg:p-6">
      <p className="font-display text-[15px] font-bold text-ivory">Business Unit Performance</p>
      <p className="mt-0.5 text-[12px] text-ivory/40">Ranked by portfolio value</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-[10.5px] uppercase tracking-[0.06em] text-ivory/35">
              <th className="pb-2.5 font-medium">Business Unit</th>
              <th className="pb-2.5 font-medium text-right">Portfolio Value</th>
              <th className="pb-2.5 font-medium text-right">Customers</th>
              <th className="pb-2.5 font-medium text-right">Growth</th>
              <th className="pb-2.5 font-medium text-right">SLA</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => {
              const isPositive = s.growthPct >= 0;
              return (
                <tr key={s.subsidiary} className="border-b border-white/[0.04] last:border-0">
                  <td className="py-2.5 pr-3">
                    <span className="flex items-center gap-2 text-[12.5px] text-ivory/90">
                      <span className="font-mono text-[10.5px] text-ivory/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.subsidiary}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono text-[12.5px] text-ivory/85">
                    ${s.portfolioValue}M
                  </td>
                  <td className="py-2.5 pr-3 text-right text-[12px] text-ivory/50">
                    {s.customers.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-3 text-right">
                    <span
                      className={clsx(
                        "inline-flex items-center gap-0.5 font-mono text-[12px] font-medium",
                        isPositive ? "text-emerald" : "text-crimson"
                      )}
                    >
                      {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {Math.abs(s.growthPct).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-mono text-[12px] text-ivory/50">
                    {s.slaCompliance.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
