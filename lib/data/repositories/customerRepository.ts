import { Customer, TimelineEvent, CustomerNote, CustomerTask, CustomerMeeting, CustomerFile, AtRiskCustomer } from "@/lib/types";
import { customers, customerTimeline, customerNotes, customerTasks, customerMeetings, customerFiles, atRiskCustomers } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface CustomerRepository {
  getCustomers(organizationId?: string): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
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
    return customers.map(c => ({ ...c, organizationId: organizationId || "apex-demo" }));
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    if (!isDemoMode()) return undefined;
    const list = await this.getCustomers();
    return list.find(c => c.id === id);
  }

  async getTimeline(customerId: string): Promise<TimelineEvent[]> {
    if (!isDemoMode()) return [];
    return customerTimeline.filter(t => t.customerId === customerId);
  }

  async getNotes(customerId: string): Promise<CustomerNote[]> {
    if (!isDemoMode()) return [];
    return customerNotes.filter(n => n.customerId === customerId);
  }

  async getTasks(customerId: string): Promise<CustomerTask[]> {
    if (!isDemoMode()) return [];
    return customerTasks.filter(t => t.customerId === customerId);
  }

  async getMeetings(customerId: string): Promise<CustomerMeeting[]> {
    if (!isDemoMode()) return [];
    return customerMeetings.filter(m => m.customerId === customerId);
  }

  async getFiles(customerId: string): Promise<CustomerFile[]> {
    if (!isDemoMode()) return [];
    return customerFiles.filter(f => f.customerId === customerId);
  }

  async getAtRiskCustomers(organizationId?: string): Promise<AtRiskCustomer[]> {
    if (!isDemoMode()) return [];
    return atRiskCustomers.map(c => ({ ...c, organizationId: organizationId || "apex-demo" }));
  }
}

export const customerRepository = new MockCustomerRepository();
