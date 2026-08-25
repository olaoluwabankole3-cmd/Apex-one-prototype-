import { NotificationItem, ActivityItem } from "@/lib/types";
import { demoSignals, IntelligenceSignal, demoActivity, demoNotifications } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface NotificationRepository {
  getNotifications(organizationId?: string): Promise<NotificationItem[]>;
  getActivities(organizationId?: string): Promise<ActivityItem[]>;
  getIntelligenceSignals(organizationId?: string): Promise<IntelligenceSignal[]>;
  getSignal(id: string): Promise<IntelligenceSignal | undefined>;
}

export class MockNotificationRepository implements NotificationRepository {
  async getNotifications(organizationId?: string): Promise<NotificationItem[]> {
    if (!isDemoMode()) return [];
    return demoNotifications;
  }

  async getActivities(organizationId?: string): Promise<ActivityItem[]> {
    if (!isDemoMode()) return [];
    return demoActivity;
  }

  async getIntelligenceSignals(organizationId?: string): Promise<IntelligenceSignal[]> {
    if (!isDemoMode()) return [];
    return demoSignals;
  }

  async getSignal(id: string): Promise<IntelligenceSignal | undefined> {
    if (!isDemoMode()) return undefined;
    return demoSignals.find(s => s.id === id);
  }
}

export const notificationRepository = new MockNotificationRepository();

