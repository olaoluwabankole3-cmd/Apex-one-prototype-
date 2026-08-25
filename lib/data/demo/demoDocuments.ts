export interface ExtractedEntities {
  customers: string[];
  contracts: string[];
  financialValues: string[];
  risks: string[];
  importantDates: string[];
  actions: string[];
  relatedDocs: string[];
}

export interface UsefulSummary {
  keyFinding: string;
  obligations: string[];
  risksDetail: string[];
  datesDetail: { event: string; date: string }[];
  financialExposure: string;
  recommendedAction: string;
}

export interface DocRelationships {
  relatedCustomer: { name: string; id: string };
  relatedContract: string;
  relatedWorkflow: string;
  relatedEmployee: string;
  relatedTransaction: string;
  relatedDecision: string;
}

export interface IntelDocument {
  id: string;
  name: string;
  fileType: "pdf" | "doc" | "xlsx";
  category: "Contract" | "Policy" | "Financial Document" | "Report" | "Compliance Document";
  businessUnit: "Enterprise Operations" | "Commercial Operations" | "Strategic Accounts" | "Customer Operations";
  uploadedBy: string;
  date: string;
  size: string;
  pages: number;
  status: "processed" | "processing";
  usefulSummary: UsefulSummary;
  entities: ExtractedEntities;
  relationships: DocRelationships;
}

export const demoDocuments: IntelDocument[] = [
  {
    id: "doc-1",
    name: "Strategic Accounts — Q2 Investment Management Agreement.pdf",
    fileType: "pdf",
    category: "Contract",
    businessUnit: "Strategic Accounts",
    uploadedBy: "Priya Nair",
    date: "Jul 15, 2026",
    size: "2.4 MB",
    pages: 18,
    status: "processed",
    usefulSummary: {
      keyFinding: "Apex Sync assumes discretionary asset placement rights for Halden & Cross Partners. Tiered fee scales are structured dynamically with a baseline commitment of ₦2.03B ($3.12M USD) AUM.",
      obligations: [
        "Quarterly reporting delivered within 15 business days of close.",
        "Discretionary rebalancing restricted to high-liquidity indexes."
      ],
      risksDetail: [
        "90-day static notice period is required for standard termination.",
        "Performance penalty clauses trigger if standard index benchmarks lag by >4%."
      ],
      datesDetail: [
        { event: "Agreement Effective", date: "Feb 1, 2026" },
        { event: "Quarterly Audit Lock", date: "Aug 15, 2026" },
        { event: "Auto-Renewal Review", date: "Jan 15, 2029" }
      ],
      financialExposure: "₦2.03B committed capital at 0.85% base (₦17.2M base ARR yield potential).",
      recommendedAction: "Confirm with Priya Nair that Q2 rebalancing complies strictly with client's new carbon-neutral guidelines."
    },
    entities: {
      customers: ["Halden & Cross Partners", "Apex Demo Group"],
      contracts: ["HCP-SLA-2026-INV", "HCP-CUST-881"],
      financialValues: ["₦2.03B AUM Commitment", "0.85% Management Fee", "₦17.2M Base ARR"],
      risks: ["90-Day Termination Notice Window", "Performance Benchmark Drag Penalty (>4%)"],
      importantDates: ["Feb 1, 2026", "Aug 15, 2026", "Jan 15, 2029"],
      actions: ["Execute Quarterly Portfolio Audit", "Send Carbon-Neutral Alignment Memo"],
      relatedDocs: ["HCP_Risk_Mitigation_Treaty.pdf", "Apex_Discretionary_Mandate_v3.docx"]
    },
    relationships: {
      relatedCustomer: { name: "Halden & Cross Partners", id: "cust-2" },
      relatedContract: "HCP-SLA-2026-INV",
      relatedWorkflow: "Context-Aware Churn Prevention",
      relatedEmployee: "Priya Nair",
      relatedTransaction: "TXN-2026-0881A",
      relatedDecision: "Approval of Discretionary AUM Allocation Thresholds"
    }
  },
  {
    id: "doc-2",
    name: "Commercial Operations — Master Logistics Clearing SLA.pdf",
    fileType: "pdf",
    category: "Contract",
    businessUnit: "Commercial Operations",
    uploadedBy: "Elena Cho",
    date: "Aug 02, 2026",
    size: "3.8 MB",
    pages: 32,
    status: "processed",
    usefulSummary: {
      keyFinding: "Meridian Logistics Group contract stipulates 99.9% uptime for transaction clearing gateway. Clause 8.3 requires proactive review if clearing latency exceeds 120 minutes.",
      obligations: [
        "Maintain sub-60 minute batch clearing during peak port hours.",
        "Provide dedicated technical account manager."
      ],
      risksDetail: [
        "Contract expires in 45 days (Oct 2026).",
        "Recent 38% drop in clearing volume activates renegotiation clause."
      ],
      datesDetail: [
        { event: "Contract Expiration", date: "Oct 1, 2026" },
        { event: "Renewal Proposal Window", date: "Aug 25, 2026" }
      ],
      financialExposure: "₦1.20B annual contract value subject to renewal risk.",
      recommendedAction: "Deliver automated clearing upgrade proposal to Marcus Fenwick before Aug 25."
    },
    entities: {
      customers: ["Meridian Logistics Group"],
      contracts: ["ML-SLA-2024-RENEW"],
      financialValues: ["₦1.20B ARR", "₦610M Upsell Target"],
      risks: ["45-Day Expiration", "Clearing SLA Latency"],
      importantDates: ["Oct 1, 2026", "Aug 25, 2026"],
      actions: ["Schedule Sponsor Alignment", "Propose Automated Clearing Node"],
      relatedDocs: ["Meridian_Logistics_SLA_Variance_Report.pdf"]
    },
    relationships: {
      relatedCustomer: { name: "Meridian Logistics Group", id: "cust-1" },
      relatedContract: "ML-SLA-2024-RENEW",
      relatedWorkflow: "Context-Aware Churn Prevention",
      relatedEmployee: "Elena Cho",
      relatedTransaction: "TXN-2026-0412M",
      relatedDecision: "Approve custom Naira-indexed pricing matrix"
    }
  },
  {
    id: "doc-3",
    name: "Enterprise Operations — Dangote Industrial Multi-Year Master Service Agreement.pdf",
    fileType: "pdf",
    category: "Contract",
    businessUnit: "Enterprise Operations",
    uploadedBy: "Priya Nair",
    date: "Jun 10, 2026",
    size: "4.1 MB",
    pages: 44,
    status: "processed",
    usefulSummary: {
      keyFinding: "Dangote Industrial Consortium contract includes automatic Volatility Multiplier indexation (Clause 4.2) and capacity overflow burst rights.",
      obligations: [
        "Provide 24/7 dedicated enterprise infrastructure support.",
        "Conduct quarterly capacity planning reviews."
      ],
      risksDetail: [
        "Capacity utilization is running 41% above base contracted bounds.",
        "Requires contract amendment to monetize burst usage."
      ],
      datesDetail: [
        { event: "Mid-Term Capacity Review", date: "Sep 15, 2026" },
        { event: "Annual True-Up Billing", date: "Dec 31, 2026" }
      ],
      financialExposure: "₦2.80B base ARR with ₦1.30B capacity expansion opportunity.",
      recommendedAction: "Submit formal capacity realignment addendum for Q4 billing lock."
    },
    entities: {
      customers: ["Dangote Industrial Consortium"],
      contracts: ["DIC-MSA-2024-V4"],
      financialValues: ["₦2.80B Current ARR", "₦1.30B Expansion Opportunity", "₦19.4B LTV"],
      risks: ["Capacity Overflow without Lock"],
      importantDates: ["Sep 15, 2026", "Dec 31, 2026"],
      actions: ["Deliver Capacity Expansion Addendum"],
      relatedDocs: ["Dangote_Capacity_Audit_Q2.xlsx"]
    },
    relationships: {
      relatedCustomer: { name: "Dangote Industrial Consortium", id: "cust-8" },
      relatedContract: "DIC-MSA-2024-V4",
      relatedWorkflow: "Contract Capacity Realignment",
      relatedEmployee: "Priya Nair",
      relatedTransaction: "TXN-2026-0912D",
      relatedDecision: "Approve Enterprise Capacity Addendum"
    }
  },
  {
    id: "doc-4",
    name: "Customer Operations — Solace Insurance Claims Processing SLA.pdf",
    fileType: "pdf",
    category: "Contract",
    businessUnit: "Customer Operations",
    uploadedBy: "Jordan Lee",
    date: "Jul 22, 2026",
    size: "1.9 MB",
    pages: 14,
    status: "processed",
    usefulSummary: {
      keyFinding: "Solace Home Insurance SLA mandates 24-hour claims processing turnaround. Current queue backlog creates risk of service credits under Section 6.",
      obligations: [
        "Process Tier 1 claims within 24 hours.",
        "Maintain monthly claims resolution rate >95%."
      ],
      risksDetail: [
        "Average claims processing latency is 2.8 days, breaching Section 6 bounds.",
        "Potential service credit exposure of ₦3.8M monthly."
      ],
      datesDetail: [
        { event: "SLA Audit Review", date: "Aug 30, 2026" }
      ],
      financialExposure: "₦625M annual contract value; ₦3.8M monthly SLA risk.",
      recommendedAction: "Deploy Claims Automation Phase 2 triage module immediately."
    },
    entities: {
      customers: ["Solace Home Insurance Co."],
      contracts: ["SHI-SLA-2025-C1"],
      financialValues: ["₦625M ARR", "₦3.8M Monthly Risk"],
      risks: ["SLA Latency Penalty", "Customer Churn Risk"],
      importantDates: ["Aug 30, 2026"],
      actions: ["Deploy Claims Triage Automation"],
      relatedDocs: ["Solace_Claims_Performance_Q2.pdf"]
    },
    relationships: {
      relatedCustomer: { name: "Solace Home Insurance Co.", id: "cust-3" },
      relatedContract: "SHI-SLA-2025-C1",
      relatedWorkflow: "Claims Intake Triage Automation",
      relatedEmployee: "Jordan Lee",
      relatedTransaction: "TXN-2026-0318S",
      relatedDecision: "Deploy Phase 2 Claims Automation"
    }
  }
];
