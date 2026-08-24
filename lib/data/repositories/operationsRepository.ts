import { SubsidiaryOps, Incident, AutomationOpportunity, SlaPoint, SubsidiaryPerformance } from "@/lib/types";
import { subsidiaryOps, incidents, automationOpportunities, slaTrend, subsidiaryPerformance } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface OperationsRepository {
  getSubsidiaryOps(organizationId?: string): Promise<SubsidiaryOps[]>;
  getIncidents(organizationId?: string): Promise<Incident[]>;
  getAutomationOpportunities(organizationId?: string): Promise<AutomationOpportunity[]>;
  getSlaTrend(organizationId?: string): Promise<SlaPoint[]>;
  getSubsidiaryPerformance(organizationId?: string): Promise<SubsidiaryPerformance[]>;
}

export class MockOperationsRepository implements OperationsRepository {
  async getSubsidiaryOps(organizationId?: string): Promise<SubsidiaryOps[]> {
    if (!isDemoMode()) return [];
    return subsidiaryOps;
  }
  async getIncidents(organizationId?: string): Promise<Incident[]> {
    if (!isDemoMode()) return [];
    return incidents;
  }
  async getAutomationOpportunities(organizationId?: string): Promise<AutomationOpportunity[]> {
    if (!isDemoMode()) return [];
    return automationOpportunities;
  }
  async getSlaTrend(organizationId?: string): Promise<SlaPoint[]> {
    if (!isDemoMode()) return [];
    return slaTrend;
  }
  async getSubsidiaryPerformance(organizationId?: string): Promise<SubsidiaryPerformance[]> {
    if (!isDemoMode()) return [];
    return subsidiaryPerformance;
  }
}

export const operationsRepository = new MockOperationsRepository();
