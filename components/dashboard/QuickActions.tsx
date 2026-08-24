"use client";

import { FileText, ShieldAlert, ScanSearch, TrendingUp, Headset, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useRole } from "@/components/layout/RoleContext";
import { quickActions } from "@/lib/mockData";

const iconMap: Record<string, typeof FileText> = {
  FileText,
  ShieldAlert,
  ScanSearch,
  TrendingUp,
  Headset,
};

export default function QuickActions() {
  const { role } = useRole();
  const filtered = quickActions.filter((a) => a.roles.includes(role));
  const items = filtered.length ? filtered : quickActions.slice(0, 3);

  return (
    <GlassCard delay={0.25} className="p-5 lg:p-6">
      <p className="font-display text-[15px] font-bold text-ivory">Quick Actions</p>
      <p className="mt-0.5 text-[12px] text-ivory/40">Tailored to your role</p>

      <div className="mt-4 space-y-2">
        {items.map((action) => {
          const Icon = iconMap[action.icon] ?? FileText;
          return (
            <button
              key={action.id}
              className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.04]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-gold">
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-ivory/90">{action.label}</span>
                <span className="block truncate text-[11.5px] text-ivory/40">{action.description}</span>
              </span>
              <ArrowRight
                size={15}
                className="shrink-0 text-ivory/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold"
              />
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
