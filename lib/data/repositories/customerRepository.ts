import { Customer, TimelineEvent, CustomerNote, CustomerTask, CustomerMeeting, CustomerFile, AtRiskCustomer } from "@/lib/types";
import { demoCustomers, UnifiedCustomer } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface CustomerRepository {
  getCustomers(organizationId?: string): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  getUnifiedCustomer(id: string): Promise<UnifiedCustomer | undefined>;
  getTimeline(customerId: string): Promise<TimelineEvent[]>;
  getNotes(customerId: string): Promise<CustomerNote[]>;
  getTasks(customerId: string): Promise<CustomerTask[]>;
  getMeetings(customerId: string): Promise<CustomerMeeting[]>;
  getFiles(customerId: string): Promise<CustomerFile[]>;
  getAtRiskCustomers(organizationId?: string): Promise<AtRiskCustomer[]>;
}

export class MockCustomerRepository implements CustomerRepository {
  async getCustomers(organizationId?: string): Promise<Customer[]> {
    if (!isDemoMode()) return [];
    return demoCustomers.map(c => ({
      id: c.id,
      name: c.name,
      subsidiary: c.businessUnit,
      tier: c.tier,
      status: c.status,
      healthScore: c.healthScore,
      arr: c.arrUSD,
      owner: c.owner,
      contactName: c.contactName,
      contactRole: c.contactRole,
      contactEmail: c.contactEmail,
      since: c.since,
      tags: c.tags || []
    }));
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    if (!isDemoMode()) return undefined;
    const list = await this.getCustomers();
    return list.find(c => c.id === id);
  }

  async getUnifiedCustomer(id: string): Promise<UnifiedCustomer | undefined> {
    if (!isDemoMode()) return undefined;
    return demoCustomers.find(c => c.id === id);
  }

  async getTimeline(customerId: string): Promise<TimelineEvent[]> {
    if (!isDemoMode()) return [];
    const cust = demoCustomers.find(c => c.id === customerId);
    if (!cust) return [];
    return [
      {
        id: `t-${customerId}-1`,
        customerId,
        type: "system",
        title: "Telemetry Sync",
        description: `Active contract health score evaluated at ${cust.healthScore}. ${cust.aiInsight}`,
        date: "Aug 18, 2026",
        actor: "Apex Intelligence Engine"
      },
      {
        id: `t-${customerId}-2`,
        customerId,
        type: "meeting",
        title: "Executive Alignment Review",
        description: `Strategic sync held with ${cust.contactName} (${cust.contactRole}).`,
        date: "Aug 11, 2026",
        actor: cust.owner
      },
      {
        id: `t-${customerId}-3`,
        customerId,
        type: "note",
        title: "Contract Status Logged",
        description: `Contract status updated to: ${cust.contractStatus}. Support activity: ${cust.supportActivity}.`,
        date: "Jul 28, 2026",
        actor: cust.owner
      }
    ];
  }

  async getNotes(customerId: string): Promise<CustomerNote[]> {
    if (!isDemoMode()) return [];
    const cust = demoCustomers.find(c => c.id === customerId);
    if (!cust) return [];
    return [
      {
        id: `n-${customerId}-1`,
        customerId,
        author: cust.owner,
        content: cust.recommendedAction,
        date: "Aug 18, 2026",
        pinned: true
      },
      {
        id: `n-${customerId}-2`,
        customerId,
        author: "Apex AI Analyst",
        content: cust.opportunityReason,
        date: "Aug 14, 2026"
      }
    ];
  }

  async getTasks(customerId: string): Promise<CustomerTask[]> {
    if (!isDemoMode()) return [];
    const cust = demoCustomers.find(c => c.id === customerId);
    if (!cust) return [];
    return [
      {
        id: `task-${customerId}-1`,
        customerId,
        title: `Schedule Executive Alignment with ${cust.contactName}`,
        dueDate: "2026-08-25",
        done: false,
        assignee: cust.owner,
        priority: cust.status === "at-risk" ? "high" : "medium"
      },
      {
        id: `task-${customerId}-2`,
        customerId,
        title: `Prepare custom contract addendum (${cust.businessUnit})`,
        dueDate: "2026-08-30",
        done: false,
        assignee: cust.owner,
        priority: "medium"
      }
    ];
  }

  async getMeetings(customerId: string): Promise<CustomerMeeting[]> {
    if (!isDemoMode()) return [];
    const cust = demoCustomers.find(c => c.id === customerId);
    if (!cust) return [];
    return [
      {
        id: `m-${customerId}-1`,
        customerId,
        title: `Executive Renewal & Pricing Strategy Sync`,
        date: "2026-08-22",
        time: "10:00 AM",
        attendees: [cust.owner, cust.contactName, "Sarah Below"],
        status: "upcoming",
        notes: cust.aiInsight
      }
    ];
  }

  async getFiles(customerId: string): Promise<CustomerFile[]> {
    if (!isDemoMode()) return [];
    const cust = demoCustomers.find(c => c.id === customerId);
    if (!cust) return [];
    return [
      {
        id: `f-${customerId}-1`,
        customerId,
        name: `${cust.name} — Master Service Agreement.pdf`,
        type: "pdf",
        size: "2.8 MB",
        uploadedBy: cust.owner,
        date: "Jul 15, 2026"
      }
    ];
  }

  async getAtRiskCustomers(organizationId?: string): Promise<AtRiskCustomer[]> {
    if (!isDemoMode()) return [];
    return demoCustomers
      .filter(c => c.status === "at-risk")
      .map(c => ({
        id: c.id,
        name: c.name,
        subsidiary: c.businessUnit,
        arr: c.arrUSD,
        riskScore: c.riskScore,
        reason: c.riskReasons[0] || c.aiInsight
      }));
  }
}

export const customerRepository = new MockCustomerRepository();
