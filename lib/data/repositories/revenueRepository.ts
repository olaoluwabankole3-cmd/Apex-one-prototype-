import { KpiDatum, RevenuePoint, PortfolioSlice, RevenueBySubsidiaryPoint } from "@/lib/types";
import { kpis, revenueSeries, portfolioBreakdown, revenueBySubsidiary } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface RevenueRepository {
  getKpis(organizationId?: string): Promise<KpiDatum[]>;
  getRevenueSeries(organizationId?: string): Promise<RevenuePoint[]>;
  getPortfolioBreakdown(organizationId?: string): Promise<PortfolioSlice[]>;
  getRevenueBySubsidiary(organizationId?: string): Promise<RevenueBySubsidiaryPoint[]>;
}

export class MockRevenueRepository implements RevenueRepository {
  async getKpis(organizationId?: string): Promise<KpiDatum[]> {
    if (!isDemoMode()) return [];
    return kpis;
  }
  async getRevenueSeries(organizationId?: string): Promise<RevenuePoint[]> {
    if (!isDemoMode()) return [];
    return revenueSeries;
  }
  async getPortfolioBreakdown(organizationId?: string): Promise<PortfolioSlice[]> {
    if (!isDemoMode()) return [];
    return portfolioBreakdown;
  }
  async getRevenueBySubsidiary(organizationId?: string): Promise<RevenueBySubsidiaryPoint[]> {
    if (!isDemoMode()) return [];
    return revenueBySubsidiary;
  }
}

export const revenueRepository = new MockRevenueRepository();
