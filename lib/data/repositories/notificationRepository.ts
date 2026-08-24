import { NotificationItem } from "@/lib/types";
import { notifications } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface NotificationRepository {
  getNotifications(organizationId?: string): Promise<NotificationItem[]>;
}

export class MockNotificationRepository implements NotificationRepository {
  async getNotifications(organizationId?: string): Promise<NotificationItem[]> {
    if (!isDemoMode()) return [];
    return notifications;
  }
}

export const notificationRepository = new MockNotificationRepository();
