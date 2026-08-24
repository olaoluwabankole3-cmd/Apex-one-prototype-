"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { customerGrowth } from "@/lib/mockData";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-charcoal-light/95 px-3 py-2 text-[12px] shadow-glass backdrop-blur-xl">
      <p className="mb-1 font-medium text-ivory/50">{label}</p>
      <p className="text-ivory">
        Customers: <span className="font-mono text-gold">{payload[0].value.toLocaleString()}</span>
      </p>
    </div>
  );
}

export default function CustomerGrowthChart() {
  const first = customerGrowth[0].customers;
  const last = customerGrowth[customerGrowth.length - 1].customers;
  const growthPct = (((last - first) / first) * 100).toFixed(1);

  return (
    <GlassCard delay={0.15} className="p-5 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-[15px] font-bold text-ivory">Customer Growth</p>
          <p className="mt-0.5 text-[12px] text-ivory/40">Trailing 12 months, group-wide</p>
        </div>
        <span className="rounded-full border border-emerald/25 bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald">
          +{growthPct}%
        </span>
      </div>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={customerGrowth} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="customerFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3FBF8F" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3FBF8F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "rgba(247,245,240,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "rgba(247,245,240,0.4)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="customers"
              stroke="#3FBF8F"
              strokeWidth={2.25}
              fill="url(#customerFill)"
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
