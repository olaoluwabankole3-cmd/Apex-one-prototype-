"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { segmentBreakdown } from "@/lib/mockData";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-charcoal-light/95 px-3 py-2 text-[12px] shadow-glass backdrop-blur-xl">
      <p className="font-medium text-ivory">{d.segment}</p>
      <p className="text-ivory/60">
        ARR: <span className="font-mono text-gold">${d.arr}M</span>
      </p>
      <p className="text-ivory/60">
        Customers: <span className="font-mono">{d.customers.toLocaleString()}</span>
      </p>
    </div>
  );
}

export default function SegmentBreakdownPanel() {
  const totalArr = segmentBreakdown.reduce((sum, s) => sum + s.arr, 0);

  return (
    <GlassCard delay={0.2} className="p-5 lg:p-6">
      <p className="font-display text-[15px] font-bold text-ivory">Revenue by Segment</p>
      <p className="mt-0.5 text-[12px] text-ivory/40">ARR distribution across customer tiers</p>

      <div className="mt-2 flex items-center gap-4">
        <div className="h-[140px] w-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segmentBreakdown}
                dataKey="arr"
                nameKey="segment"
                innerRadius={42}
                outerRadius={64}
                paddingAngle={3}
                isAnimationActive
                animationDuration={900}
              >
                {segmentBreakdown.map((s) => (
                  <Cell key={s.segment} fill={s.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          {segmentBreakdown.map((s) => (
            <div key={s.segment} className="flex items-center justify-between text-[12.5px]">
              <span className="flex items-center gap-2 text-ivory/70">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                {s.segment}
              </span>
              <span className="font-mono text-ivory/85">{((s.arr / totalArr) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
