"use client";

import { useState } from "react";
import { isDemoMode } from "@/lib/demo";
import ValueIntelligenceEmptyState from "@/components/value-engine/ValueIntelligenceEmptyState";
import ValueHeader from "@/components/value-engine/ValueHeader";
import GlassCard from "@/components/ui/GlassCard";
import {
  FileText,
  Download,
  Check,
  Sparkles,
  RefreshCw,
  Printer,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  ArrowRight,
  Users,
  ShieldCheck,
  Percent,
  Share2,
  Presentation,
  BookOpen
} from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface Opportunity {
  title: string;
  value: string;
  probability: string;
  playbook: string;
}

interface RiskItem {
  risk: string;
  financialImpact: string;
  probability: string;
  action: string;
}

interface BoardDecision {
  title: string;
  impact: string;
  deadline: string;
  options: string;
}

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Report" | "Opportunities" | "Risks">("Report");

  // Success message alert states
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAction = (actionType: string) => {
    setDownloading(actionType);
    setTimeout(() => {
      setDownloading(null);
      triggerToast(`Successfully completed: ${actionType}`);
    }, 1200);
  };

  // Top Opportunities List (McKinsey styled metrics)
  const topOpportunities: Opportunity[] = [
    {
      title: "SaaS Contract Price Adjustments",
      value: "₦18.4M",
      probability: "High (85%)",
      playbook: "Implement 12.5% pricing indexation triggers across next-term SLA renewals."
    },
    {
      title: "Unbilled Deliverables Reclamation",
      value: "₦14.2M",
      probability: "Medium (70%)",
      playbook: "Re-establish ERP-to-Salesforce webhooks to automate unbilled milestone billing."
    },
    {
      title: "Cloud Edge Decommissioning",
      value: "₦5.6M",
      probability: "High (95%)",
      playbook: "Decommission redundant, non-routed dev clusters immediately."
    },
    {
      title: "Dormant Client Reactivation",
      value: "₦4.6M",
      probability: "Low (40%)",
      playbook: "Activate dedicated customer relationship touchpoints for Meridian Logistics."
    }
  ];

  // Top Risks List (Auditor-grade)
  const topRisks: RiskItem[] = [
    {
      risk: "Expired SLA Ticket Overruns",
      financialImpact: "₦8.4M",
      probability: "45%",
      action: "Deploy automated ticket queue locks immediately following agreement expiration."
    },
    {
      risk: "High-Value Account Churn",
      financialImpact: "₦12.5M",
      probability: "20%",
      action: "Direct senior executive assignment with automated SLA resolution monitoring."
    }
  ];

  // Board decisions required (Decision Gating)
  const boardDecisions: BoardDecision[] = [
    {
      title: "Enterprise Pricing Strategy Adjustments",
      impact: "₦18.4M",
      deadline: "September 12, 2026",
      options: "Approve 12.5% general indexation rate changes during Q3 renewals cycle."
    },
    {
      title: "Capital Workload Reallocation",
      impact: "₦8.4M",
      deadline: "September 20, 2026",
      options: "Reallocate back-office clearing capacities from West Africa to Lagos nodes."
    }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-12 select-none relative" id="executive-reports-workspace">
      
      {/* Background glow shadow */}
      <div className="absolute top-[-40px] left-[20%] w-[450px] h-[450px] bg-gold/[0.012] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* HEADER SECTION */}
      <ValueHeader
        category="BOARD-LEVEL INTELLIGENCE"
        title="EXECUTIVE VALUE REPORTS"
        subtitle="The ultimate boardroom communication layer of the APEX ONE system. Translates raw telemetry into strategic insights, risks, and critical board decisions."
      />

      {!isDemoMode() ? (
        <ValueIntelligenceEmptyState
          title="No executive reports generated yet"
          description="Executive briefings, board memorandums, and value capture digests will be compiled automatically once organizational data streams are connected."
          badge="Report Engine Offline"
        />
      ) : (
        <>
          {/* TOAST SYSTEM NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-emerald/95 text-matte border border-emerald px-5 py-3.5 rounded-xl font-mono text-[12px] font-extrabold shadow-2xl flex items-center gap-2"
          >
            <Check size={14} className="shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REPORT CONSOLE CONTROLS BAR (Actions Area) */}
      <div className="rounded-2xl border border-white/[0.07] bg-charcoal/40 p-4 shadow-glass flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Period Details */}
        <div className="text-left font-mono">
          <p className="text-[10px] text-gold font-bold uppercase tracking-widest">REPORT SPECIFICATION</p>
          <div className="flex flex-wrap items-center gap-3.5 mt-1 text-[12px] text-ivory/60">
            <span className="font-bold text-ivory">APEX ONE — EXECUTIVE VALUE REPORT</span>
            <span className="text-ivory/30">•</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> Period: Q3 2026</span>
            <span className="text-ivory/30">•</span>
            <span className="flex items-center gap-1"><Users size={12} /> Audience: Executive Leadership</span>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => handleAction("Generate Report")}
            disabled={downloading !== null}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-lg bg-gold text-matte font-mono font-bold text-[10.5px] px-4 py-2 hover:bg-opacity-90 transition-all cursor-pointer"
          >
            {downloading === "Generate Report" ? <RefreshCw size={12} className="animate-spin" /> : <BookOpen size={12} />}
            Generate Report
          </button>
          
          <button
            onClick={() => handleAction("Export PDF")}
            disabled={downloading !== null}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-gold/30 text-ivory/80 hover:text-gold font-mono font-bold text-[10.5px] px-3.5 py-2 transition-all cursor-pointer"
          >
            {downloading === "Export PDF" ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />}
            Export PDF
          </button>

          <button
            onClick={() => handleAction("Share with Executive Team")}
            disabled={downloading !== null}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-gold/30 text-ivory/80 hover:text-gold font-mono font-bold text-[10.5px] px-3.5 py-2 transition-all cursor-pointer"
          >
            {downloading === "Share with Executive Team" ? <RefreshCw size={12} className="animate-spin" /> : <Share2 size={12} />}
            Share
          </button>

          <button
            onClick={() => handleAction("Present to Board")}
            disabled={downloading !== null}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-gold/30 text-ivory/80 hover:text-gold font-mono font-bold text-[10.5px] px-3.5 py-2 transition-all cursor-pointer"
          >
            {downloading === "Present to Board" ? <RefreshCw size={12} className="animate-spin" /> : <Presentation size={12} />}
            Present
          </button>
        </div>

      </div>

      {/* MCKINSEY-STYLE EXECUTIVE SUMMARY BANNER */}
      <div className="rounded-2xl border border-gold/15 bg-gold/[0.015] p-6 text-left relative overflow-hidden">
        <div className="absolute top-[-5px] right-[-5px] p-2 bg-gold/10 text-gold text-[9px] font-mono font-bold rounded-bl uppercase">
          Autonomous AI Summary
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 mt-0.5">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">BOARD BRIEFING EXECUTIVE SUMMARY</span>
            <p className="text-[15px] font-serif text-ivory/95 leading-relaxed mt-1.5 font-medium italic">
              &ldquo;Enterprise performance remains stable, but APEX ONE identified ₦42.8M in potential value across customer expansion, revenue recovery and unused capacity. Quick action on pricing strategy triggers and automated ticket dunning queues can secure ₦18.4M in Q3.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* THREE-COLUMN COMPACT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* LEFT COLUMN: KEY METRICS PANEL */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <div className="rounded-2xl border border-white/[0.07] bg-charcoal/40 p-5 shadow-glass space-y-4.5">
            <div className="border-b border-white/[0.04] pb-2.5 flex items-center justify-between">
              <span className="text-[11.5px] font-mono font-bold text-gold uppercase tracking-wider">KEY METRICS SUMMARY</span>
              <span className="text-[9px] font-mono text-ivory/30">Bloomberg Terminal</span>
            </div>

            <div className="space-y-3 font-mono">
              {[
                { label: "Consolidated Revenue", value: "₦184.0M", sub: "Annualized baseline" },
                { label: "Group-Wide Growth Rate", value: "+12.4%", sub: "Trailing 12-month average" },
                { label: "Total Value Identified", value: "₦184.7M", sub: "Cumulative pipeline", highlight: true },
                { label: "Verified Value Captured", value: "₦18.4M", sub: "EBITDA margin expansion" },
                { label: "Unbilled Revenue Leakage", value: "₦31.8M", sub: "Missed renewal points" },
                { label: "Customer Contract Risk", value: "₦8.4M", sub: "Meridian Logistics segment" },
                { label: "Idle Capacity Waste", value: "₦34.2M", sub: "Redundant dev overhead" }
              ].map((metric, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-white/[0.015] border border-white/[0.03] rounded-xl">
                  <div>
                    <span className="text-[11.5px] font-semibold text-ivory/70 block">{metric.label}</span>
                    <span className="text-[9px] text-ivory/30 block mt-0.5">{metric.sub}</span>
                  </div>
                  <span className={clsx(
                    "text-[14px] font-bold tabular-nums",
                    metric.highlight ? "text-gold" : "text-ivory"
                  )}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE/RIGHT COLUMN: DETAILED REPORT SECTIONS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TOP OPPORTUNITIES & RISKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* Opportunities */}
            <div className="rounded-2xl border border-white/[0.07] bg-charcoal/40 p-5 shadow-glass space-y-4">
              <div className="border-b border-white/[0.04] pb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-gold uppercase tracking-wider">TOP STRATEGIC OPPORTUNITIES</span>
                <span className="text-[9.5px] font-mono text-emerald font-bold">Value Potential</span>
              </div>

              <div className="space-y-3.5">
                {topOpportunities.map((opp, idx) => (
                  <div key={idx} className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[13px] font-bold text-ivory tracking-tight">{opp.title}</h4>
                      <span className="text-[12.5px] font-mono font-black text-emerald shrink-0">{opp.value}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-ivory/30">
                      <span>Probability: {opp.probability}</span>
                    </div>
                    <p className="text-[11.5px] text-ivory/50 mt-1 leading-relaxed italic">&ldquo;{opp.playbook}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div className="rounded-2xl border border-white/[0.07] bg-charcoal/40 p-5 shadow-glass space-y-4">
              <div className="border-b border-white/[0.04] pb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-gold uppercase tracking-wider">CRITICAL REVENUE RISKS</span>
                <span className="text-[9.5px] font-mono text-red-400 font-bold">At Risk</span>
              </div>

              <div className="space-y-3.5">
                {topRisks.map((risk, idx) => (
                  <div key={idx} className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[13px] font-bold text-ivory tracking-tight">{risk.risk}</h4>
                      <span className="text-[12.5px] font-mono font-black text-red-400 shrink-0">{risk.financialImpact}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-ivory/30">
                      <span>Probability: {risk.probability}</span>
                    </div>
                    <p className="text-[11.5px] text-ivory/50 mt-1 leading-relaxed"><strong className="text-ivory/70">Remediation:</strong> {risk.action}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* BOARD / EXECUTIVE DECISIONS REQUIRED */}
          <div className="rounded-2xl border border-gold/15 bg-gold/[0.01] p-5.5 text-left space-y-4">
            <div className="border-b border-white/[0.04] pb-2 flex items-center justify-between">
              <span className="text-[11.5px] font-mono font-bold text-gold uppercase tracking-wider">BOARD / EXECUTIVE DECISIONS REQUIRED</span>
              <span className="text-[9.5px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20 font-bold">Action Gated</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boardDecisions.map((dec, idx) => (
                <div key={idx} className="bg-white/[0.015] border border-white/[0.04] p-4 rounded-xl space-y-2">
                  <span className="text-[9px] font-mono text-gold uppercase font-bold tracking-wider">Critical Decision Node {idx + 1}</span>
                  <h4 className="text-[13.5px] font-bold text-ivory leading-snug tracking-tight">{dec.title}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono text-ivory/40 pt-1.5 border-t border-white/[0.03]">
                    <div>
                      <span>Expected Impact</span>
                      <strong className="block text-emerald font-bold text-[11.5px] mt-0.5">{dec.impact}</strong>
                    </div>
                    <div>
                      <span>Decision Due By</span>
                      <strong className="block text-ivory mt-0.5">{dec.deadline}</strong>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-ivory/60 leading-snug">
                    <strong className="text-ivory/70">Action Required:</strong> {dec.options}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VALUE JOURNEY PIPELINE (Identified -> Validated -> Executed -> Captured) */}
          <div className="rounded-2xl border border-white/[0.07] bg-charcoal/40 p-5 shadow-glass text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5">
              <span className="text-[11px] font-mono font-bold text-gold uppercase tracking-wider">APEX ONE VALUE JOURNEY PIPELINE</span>
              <span className="text-[10px] font-mono text-ivory/30">Conversion Funnel</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative font-mono">
              {[
                { stage: "IDENTIFIED", value: "₦184.7M", desc: "Raw potential leakage", color: "text-gold/60" },
                { stage: "VALIDATED", value: "₦126.3M", desc: "Audited margin captures", color: "text-gold/80" },
                { stage: "EXECUTED", value: "₦73.8M", desc: "Active playbook tasks", color: "text-gold/90" },
                { stage: "CAPTURED", value: "₦18.4M", desc: "EBITDA margin expansion", color: "text-gold font-bold" }
              ].map((step, idx) => (
                <div key={idx} className="bg-white/[0.01] border border-white/[0.03] p-3.5 rounded-xl space-y-1.5 relative">
                  {idx < 3 && (
                    <div className="hidden sm:block absolute right-[-10px] top-[40%] translate-y-[-50%] z-20 text-white/10">
                      <ChevronRight size={18} />
                    </div>
                  )}
                  <span className="text-[9px] text-ivory/30 block tracking-widest uppercase">{step.stage}</span>
                  <span className={clsx("text-[17px] font-black block mt-1", step.color)}>{step.value}</span>
                  <span className="text-[9.5px] text-ivory/40 block leading-snug">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI OUTLOOK - WHAT APEX ONE EXPECTS NEXT */}
          <div className="rounded-2xl border border-white/[0.07] bg-charcoal/40 p-5 shadow-glass text-left space-y-3">
            <div className="border-b border-white/[0.04] pb-2 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-gold uppercase tracking-wider">WHAT APEX ONE EXPECTS NEXT</span>
              <span className="text-[9.5px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20 font-bold">Predictive Signals</span>
            </div>

            <p className="text-[13.5px] text-ivory/80 leading-relaxed italic font-serif">
              &ldquo;If current customer activity continues, enterprise renewal risk is expected to increase over the next 60 days.&rdquo;
            </p>

            <div className="pt-2 border-t border-white/[0.03] space-y-2">
              <span className="text-[9.5px] font-mono text-ivory/30 uppercase block font-bold">Key Predictive Signals Detected</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Back-Office Latency", value: "+14% delay in handoff milestones", desc: "Bypasses previous webhook synchronizations" },
                  { title: "Ticket volume increase", value: "+41% volume across three accounts", desc: "Drives customer SLA friction bounds" },
                  { title: "Capacity mismatches", value: "Usage growth outstripping limits", desc: "Leads to manual billing reconciliations" }
                ].map((sig, idx) => (
                  <div key={idx} className="bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg">
                    <span className="text-[11.5px] font-bold text-ivory block leading-tight">{sig.title}</span>
                    <span className="text-[11px] font-mono text-gold block mt-1">{sig.value}</span>
                    <p className="text-[10px] text-ivory/45 mt-0.5 leading-tight">{sig.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      </>
    )}

    </div>
  );
}
