import { KpiDatum, RevenuePoint, PortfolioSlice, SubsidiaryRevenuePoint, SegmentBreakdown } from "@/lib/types";


export const demoKpis: KpiDatum[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 284.6,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    delta: 12.4,
    deltaLabel: "vs last quarter",
    trend: "up",
    sparkline: [210, 218, 225, 231, 240, 252, 261, 270, 284.6],
    roles: ["CEO", "Operations"],
  },
  {
    id: "growth",
    label: "YoY Growth",
    value: 18.2,
    suffix: "%",
    decimals: 1,
    delta: 3.1,
    deltaLabel: "vs last year",
    trend: "up",
    sparkline: [9, 10.5, 11, 13, 14.5, 15.8, 16.9, 17.4, 18.2],
    roles: ["CEO", "Operations"],
  },
  {
    id: "customers",
    label: "Active Customers",
    value: 48210,
    decimals: 0,
    delta: 6.7,
    deltaLabel: "new this quarter",
    trend: "up",
    sparkline: [39000, 41200, 42800, 44000, 45100, 46200, 47100, 47800, 48210],
    roles: ["CEO", "Relationship Manager", "Customer Service"],
  },
  {
    id: "portfolio",
    label: "Portfolio Value",
    value: 1.92,
    prefix: "$",
    suffix: "B",
    decimals: 2,
    delta: 4.2,
    deltaLabel: "AUM growth",
    trend: "up",
    sparkline: [1.6, 1.65, 1.7, 1.74, 1.79, 1.83, 1.87, 1.9, 1.92],
    roles: ["CEO", "Relationship Manager"],
  },
  {
    id: "risk-exposure",
    label: "Risk Exposure Index",
    value: 3.1,
    suffix: "/10",
    decimals: 1,
    delta: -0.4,
    deltaLabel: "improved this month",
    trend: "down",
    sparkline: [4.2, 4.0, 3.9, 3.7, 3.6, 3.4, 3.3, 3.2, 3.1],
    roles: ["Compliance", "Operations"],
  },
  {
    id: "sla",
    label: "Service SLA Compliance",
    value: 98.4,
    suffix: "%",
    decimals: 1,
    delta: 0.6,
    deltaLabel: "vs last month",
    trend: "up",
    sparkline: [95.2, 95.8, 96.4, 96.9, 97.2, 97.6, 97.9, 98.1, 98.4],
    roles: ["Customer Service", "Operations"],
  },
];

export const demoRevenueSeries: RevenuePoint[] = [
  { month: "Nov", revenue: 231, target: 225 },
  { month: "Dec", revenue: 240, target: 232 },
  { month: "Jan", revenue: 252, target: 240 },
  { month: "Feb", revenue: 261, target: 248 },
  { month: "Mar", revenue: 270, target: 256 },
  { month: "Apr", revenue: 266, target: 264 },
  { month: "May", revenue: 278, target: 270 },
  { month: "Jun", revenue: 284.6, target: 278 },
];

export const demoPortfolioBreakdown: PortfolioSlice[] = [
  { name: "Enterprise Operations", value: 812, color: "#C9A961" },
  { name: "Commercial Operations", value: 524, color: "#3FBF8F" },
  { name: "Strategic Accounts", value: 398, color: "#E0A845" },
  { name: "Customer Operations", value: 186, color: "#8A7EE8" },
];

export const demoRevenueBySubsidiary: SubsidiaryRevenuePoint[] = [
  { name: "Enterprise Operations", revenue: 114.2, target: 110.0, margin: 74.2 },
  { name: "Commercial Operations", revenue: 78.4, target: 76.0, margin: 68.5 },
  { name: "Strategic Accounts", revenue: 58.6, target: 56.0, margin: 82.1 },
  { name: "Customer Operations", revenue: 33.4, target: 36.0, margin: 59.4 },
];

export const demoRevenueBySubsidiaryMonthly: { month: string; enterpriseOps: number; commercialOps: number; strategicAccounts: number; customerOps: number }[] = [
  { month: "Nov", enterpriseOps: 78.5, commercialOps: 43.9, strategicAccounts: 69.3, customerOps: 39.3 },
  { month: "Dec", enterpriseOps: 81.6, commercialOps: 45.6, strategicAccounts: 74.4, customerOps: 38.4 },
  { month: "Jan", enterpriseOps: 88.2, commercialOps: 50.4, strategicAccounts: 78.1, customerOps: 35.3 },
  { month: "Feb", enterpriseOps: 91.4, commercialOps: 52.2, strategicAccounts: 83.5, customerOps: 33.9 },
  { month: "Mar", enterpriseOps: 97.2, commercialOps: 54.0, strategicAccounts: 86.4, customerOps: 32.4 },
  { month: "Apr", enterpriseOps: 95.8, commercialOps: 55.9, strategicAccounts: 85.1, customerOps: 29.3 },
  { month: "May", enterpriseOps: 102.9, commercialOps: 58.4, strategicAccounts: 89.0, customerOps: 27.8 },
  { month: "Jun", enterpriseOps: 105.3, commercialOps: 59.8, strategicAccounts: 93.9, customerOps: 25.6 },
];

export const demoCustomerGrowth = [
  { month: "Aug", customers: 35400 },
  { month: "Sep", customers: 36900 },
  { month: "Oct", customers: 38200 },
  { month: "Nov", customers: 39000 },
  { month: "Dec", customers: 41200 },
  { month: "Jan", customers: 42800 },
  { month: "Feb", customers: 44000 },
  { month: "Mar", customers: 45100 },
  { month: "Apr", customers: 46200 },
  { month: "May", customers: 47100 },
  { month: "Jun", customers: 47800 },
  { month: "Jul", customers: 48210 },
];

export const demoSegmentBreakdown: SegmentBreakdown[] = [
  { segment: "Enterprise", arr: 612, customers: 1240, color: "#C9A961" },
  { segment: "Mid-Market", arr: 890, customers: 18900, color: "#3FBF8F" },
  { segment: "SMB", arr: 418, customers: 28070, color: "#8A7EE8" },
];




export function sliceByRange<T>(data: T[], range: "30D" | "90D" | "YTD" | "12M"): T[] {
  const counts: Record<string, number> = { "30D": 1, "90D": 3, YTD: 7, "12M": data.length };
  const count = Math.min(counts[range] ?? data.length, data.length);
  return data.slice(data.length - count);
}

