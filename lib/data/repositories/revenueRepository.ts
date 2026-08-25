import { KpiDatum, RevenuePoint, PortfolioSlice, SubsidiaryRevenuePoint, RevenueBySubsidiaryPoint, CustomerGrowthPoint, SegmentBreakdown, SubsidiaryPerformance } from "@/lib/types";
import { demoKpis, demoRevenueSeries, demoPortfolioBreakdown, demoRevenueBySubsidiary, demoRevenueBySubsidiaryMonthly, demoCustomerGrowth, demoSegmentBreakdown, demoSubsidiaryPerformance } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface RevenueRepository {
  getKpis(organizationId?: string): Promise<KpiDatum[]>;
  getRevenueSeries(organizationId?: string): Promise<RevenuePoint[]>;
  getPortfolioBreakdown(organizationId?: string): Promise<PortfolioSlice[]>;
  getRevenueBySubsidiary(organizationId?: string): Promise<SubsidiaryRevenuePoint[]>;
  getRevenueBySubsidiaryMonthly(organizationId?: string): Promise<RevenueBySubsidiaryPoint[]>;
  getCustomerGrowth(organizationId?: string): Promise<CustomerGrowthPoint[]>;
  getSegmentBreakdown(organizationId?: string): Promise<SegmentBreakdown[]>;
  getSubsidiaryPerformance(organizationId?: string): Promise<SubsidiaryPerformance[]>;
}

export class MockRevenueRepository implements RevenueRepository {
  async getKpis(organizationId?: string): Promise<KpiDatum[]> {
    if (!isDemoMode()) return [];
    return demoKpis;
  }
  async getRevenueSeries(organizationId?: string): Promise<RevenuePoint[]> {
    if (!isDemoMode()) return [];
    return demoRevenueSeries;
  }
  async getPortfolioBreakdown(organizationId?: string): Promise<PortfolioSlice[]> {
    if (!isDemoMode()) return [];
    return demoPortfolioBreakdown;
  }
  async getRevenueBySubsidiary(organizationId?: string): Promise<SubsidiaryRevenuePoint[]> {
    if (!isDemoMode()) return [];
    return demoRevenueBySubsidiary;
  }
  async getRevenueBySubsidiaryMonthly(organizationId?: string): Promise<RevenueBySubsidiaryPoint[]> {
    if (!isDemoMode()) return [];
    return demoRevenueBySubsidiaryMonthly;
  }
  async getCustomerGrowth(organizationId?: string): Promise<CustomerGrowthPoint[]> {
    if (!isDemoMode()) return [];
    return demoCustomerGrowth;
  }
  async getSegmentBreakdown(organizationId?: string): Promise<SegmentBreakdown[]> {
    if (!isDemoMode()) return [];
    return demoSegmentBreakdown;
  }
  async getSubsidiaryPerformance(organizationId?: string): Promise<SubsidiaryPerformance[]> {
    if (!isDemoMode()) return [];
    return demoSubsidiaryPerformance;
  }
}


export const revenueRepository = new MockRevenueRepository();

