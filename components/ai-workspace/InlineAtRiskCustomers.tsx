"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { atRiskCustomers } from "@/lib/mockData";

function riskColor(score: number) {
  if (score >= 75) return "text-crimson bg-crimson/10 border-crimson/25";
  if (score >= 60) return "text-amber bg-amber/10 border-amber/25";
  return "text-emerald bg-emerald/10 border-emerald/25";
}

export default function InlineAtRiskCustomers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mt-3 overflow-hidden rounded-xl border border-white/[0.07] bg-charcoal-light/60"
    >
      {atRiskCustomers.map((c, i) => (
        <div
          key={c.id}
          className={clsx(
            "flex items-center justify-between gap-3 px-4 py-3",
            i !== atRiskCustomers.length - 1 && "border-b border-white/[0.05]"
          )}
        >
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ivory/90">{c.name}</p>
            <p className="mt-0.5 text-[11.5px] text-ivory/40">
              {c.subsidiary} · ${c.arr.toFixed(2)}M ARR
            </p>
            <p className="mt-1 text-[11.5px] text-ivory/50">{c.reason}</p>
          </div>
          <span
            className={clsx(
              "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold",
              riskColor(c.riskScore)
            )}
          >
            {c.riskScore}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
