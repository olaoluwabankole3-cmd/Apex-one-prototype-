import { CalendarEvent } from "@/lib/types";
import { calendarEvents } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface CalendarRepository {
  getCalendarEvents(organizationId?: string): Promise<CalendarEvent[]>;
}

export class MockCalendarRepository implements CalendarRepository {
  async getCalendarEvents(organizationId?: string): Promise<CalendarEvent[]> {
    if (!isDemoMode()) return [];
    return calendarEvents;
  }
}

export const calendarRepository = new MockCalendarRepository();
