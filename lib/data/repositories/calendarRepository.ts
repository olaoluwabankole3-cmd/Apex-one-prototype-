import { CalendarEvent } from "@/lib/types";
import { demoCalendarEvents, DecisionIntellEvent } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface CalendarRepository {
  getCalendarEvents(organizationId?: string): Promise<CalendarEvent[]>;
  getDecisionEvents(organizationId?: string): Promise<DecisionIntellEvent[]>;
  getDecisionEvent(id: string): Promise<DecisionIntellEvent | undefined>;
}

export class MockCalendarRepository implements CalendarRepository {
  async getCalendarEvents(organizationId?: string): Promise<CalendarEvent[]> {
    if (!isDemoMode()) return [];
    return demoCalendarEvents.map(e => ({
      id: e.id,
      title: e.title,
      date: e.date,
      time: e.time,
      type: e.category.toLowerCase().includes("decision") ? "board" : e.category.toLowerCase().includes("renewal") ? "client" : "operational",
      subsidiary: e.relatedDepartment,
      attendees: e.participants,
      participants: e.participants,
      aiSummary: e.decisionRequired
    }));
  }

  async getDecisionEvents(organizationId?: string): Promise<DecisionIntellEvent[]> {
    if (!isDemoMode()) return [];
    return demoCalendarEvents;
  }

  async getDecisionEvent(id: string): Promise<DecisionIntellEvent | undefined> {
    if (!isDemoMode()) return undefined;
    return demoCalendarEvents.find(e => e.id === id);
  }
}

export const calendarRepository = new MockCalendarRepository();
