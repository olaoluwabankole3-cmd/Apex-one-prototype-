"use client";

import { motion } from "framer-motion";
import { kpis } from "@/lib/mockData";

export default function InlinePerformanceStats() {
  const featured = kpis.filter((k) => ["revenue", "growth", "customers", "portfolio"].includes(k.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
    >
      {featured.map((kpi) => (
        <div
          key={kpi.id}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
        >
          <p className="text-[10.5px] uppercase tracking-[0.08em] text-ivory/40">{kpi.label}</p>
          <p className="mt-1 font-display text-[17px] font-bold text-ivory">
            {kpi.prefix ?? ""}
            {kpi.value.toLocaleString("en-US", {
              minimumFractionDigits: kpi.decimals,
              maximumFractionDigits: kpi.decimals,
            })}
            {kpi.suffix ?? ""}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
