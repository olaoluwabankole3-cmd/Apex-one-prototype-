import { SubsidiaryOps, Incident, AutomationOpportunity, SlaPoint, SubsidiaryPerformance } from "@/lib/types";
import { demoBottlenecks, demoCapacityMetrics, demoIncidents, Bottleneck, CapacityMetric, IncidentDetail } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface OperationsRepository {
  getSubsidiaryOps(organizationId?: string): Promise<SubsidiaryOps[]>;
  getIncidents(organizationId?: string): Promise<Incident[]>;
  getIncidentDetails(organizationId?: string): Promise<IncidentDetail[]>;
  getBottlenecks(organizationId?: string): Promise<Bottleneck[]>;
  getCapacityMetrics(organizationId?: string): Promise<CapacityMetric[]>;
  getAutomationOpportunities(organizationId?: string): Promise<AutomationOpportunity[]>;
  getSlaTrend(organizationId?: string): Promise<SlaPoint[]>;
  getSubsidiaryPerformance(organizationId?: string): Promise<SubsidiaryPerformance[]>;
}

export class MockOperationsRepository implements OperationsRepository {
  async getSubsidiaryOps(organizationId?: string): Promise<SubsidiaryOps[]> {
    if (!isDemoMode()) return [];
    return [
      { subsidiary: "Enterprise Operations", slaCompliance: 99.1, reconciliationStatus: "complete", openIncidents: 1, avgResolutionHours: 2.1, automationCoverage: 91.2, trend: [97, 98, 98.5, 99.1] },
      { subsidiary: "Commercial Operations", slaCompliance: 97.4, reconciliationStatus: "complete", openIncidents: 1, avgResolutionHours: 3.4, automationCoverage: 84.6, trend: [95, 96, 96.8, 97.4] },
      { subsidiary: "Strategic Accounts", slaCompliance: 99.8, reconciliationStatus: "complete", openIncidents: 0, avgResolutionHours: 1.2, automationCoverage: 96.0, trend: [98, 98.9, 99.4, 99.8] },
      { subsidiary: "Customer Operations", slaCompliance: 96.2, reconciliationStatus: "pending", openIncidents: 2, avgResolutionHours: 4.8, automationCoverage: 76.5, trend: [94, 95, 95.5, 96.2] }
    ];
  }

  async getIncidents(organizationId?: string): Promise<Incident[]> {
    if (!isDemoMode()) return [];
    return demoIncidents.map(i => ({
      id: i.id,
      subsidiary: i.subsidiary,
      title: i.title,
      severity: i.severity,
      status: i.status,
      opened: "Aug 18, 2026",
      owner: "Operations Response Desk"
    }));
  }

  async getIncidentDetails(organizationId?: string): Promise<IncidentDetail[]> {
    if (!isDemoMode()) return [];
    return demoIncidents;
  }

  async getBottlenecks(organizationId?: string): Promise<Bottleneck[]> {
    if (!isDemoMode()) return [];
    return demoBottlenecks;
  }

  async getCapacityMetrics(organizationId?: string): Promise<CapacityMetric[]> {
    if (!isDemoMode()) return [];
    return demoCapacityMetrics;
  }

  async getAutomationOpportunities(organizationId?: string): Promise<AutomationOpportunity[]> {
    if (!isDemoMode()) return [];
    return [
      { id: "ao-1", subsidiary: "Customer Operations", process: "Claims Intake & Triage", description: "Automated classification of Tier 1 claims to reduce 2.8-day queue latency.", impact: "₦14.2M / yr", effort: "medium" },
      { id: "ao-2", subsidiary: "Enterprise Operations", process: "KYC Registry Sync", description: "Direct API integration with national identity database to eliminate manual verification.", impact: "₦8.4M / yr", effort: "low" },
      { id: "ao-3", subsidiary: "Commercial Operations", process: "Clearing Batch Scheduling", description: "Dynamic trigger sweeping scripts to prevent queue throttling during peak morning windows.", impact: "₦18.4M / yr", effort: "low" }
    ];
  }

  async getSlaTrend(organizationId?: string): Promise<SlaPoint[]> {
    if (!isDemoMode()) return [];
    return [
      { month: "Jan", compliance: 95.2, target: 98.0 },
      { month: "Feb", compliance: 95.8, target: 98.0 },
      { month: "Mar", compliance: 96.4, target: 98.0 },
      { month: "Apr", compliance: 96.9, target: 98.0 },
      { month: "May", compliance: 97.6, target: 98.0 },
      { month: "Jun", compliance: 98.4, target: 98.0 }
    ];
  }

  async getSubsidiaryPerformance(organizationId?: string): Promise<SubsidiaryPerformance[]> {
    if (!isDemoMode()) return [];
    return [
      { subsidiary: "Enterprise Operations", portfolioValue: 812, customers: 14200, growthPct: 16.4, slaCompliance: 99.1 },
      { subsidiary: "Commercial Operations", portfolioValue: 524, customers: 18400, growthPct: 14.8, slaCompliance: 97.4 },
      { subsidiary: "Strategic Accounts", portfolioValue: 398, customers: 2410, growthPct: 24.2, slaCompliance: 99.8 },
      { subsidiary: "Customer Operations", portfolioValue: 186, customers: 13200, growthPct: 12.1, slaCompliance: 96.2 }
    ];
  }
}

export const operationsRepository = new MockOperationsRepository();
