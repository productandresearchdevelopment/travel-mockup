export type ActivityCategory =
  | "Trip"
  | "Guest"
  | "Pickup"
  | "Drop-off"
  | "Transport"
  | "Vehicle"
  | "Driver"
  | "Ticket"
  | "Schedule"
  | "Exception"
  | "Payment"
  | "System";

export type ActivityType =
  | "Trip Created"
  | "Trip Status Changed"
  | "Trip Completed"
  | "Guest Added"
  | "Guest Removed"
  | "Guest Added During Trip"
  | "Guest Package Assigned"
  | "Pickup Created"
  | "Pickup Location Changed"
  | "Pickup Time Changed"
  | "Pickup Started"
  | "Pickup Completed"
  | "Drop-off Created"
  | "Drop-off Method Changed"
  | "Drop-off Completed"
  | "Segment Created"
  | "Segment Departed"
  | "Segment Arrived"
  | "Segment Completed"
  | "Vehicle Assigned"
  | "Vehicle Changed"
  | "Vehicle Breakdown"
  | "Driver Assigned"
  | "Driver Changed"
  | "Ticket Created"
  | "Ticket Booked"
  | "Ticket Issued"
  | "Schedule Changed"
  | "Departure Delayed"
  | "Arrival Delayed"
  | "Exception Created"
  | "Exception Action Taken"
  | "Exception Resolved"
  | "Owner Notified";

export type ActorType = "USER" | "SYSTEM";

export interface TripActivityRecord {
  id: string; // e.g. act-001
  tripId: string;
  tripCode: string;
  activityType: ActivityType;
  category: ActivityCategory;
  date: string; // e.g. "2026-08-25"
  time: string; // e.g. "15:30 WIB"
  actorName: string; // e.g. "Deni — Dispatcher"
  actorRole: string; // e.g. "Dispatcher HQ"
  actorType: ActorType;
  title: string;
  description: string;
  
  // Entity Linkage
  relatedEntityType?: string;
  relatedEntityId?: string;

  // Before vs After comparisons
  previousValue?: string;
  newValue?: string;
  reason?: string;

  // Planned vs Actual
  plannedValue?: string;
  actualValue?: string;
  delayMinutes?: number;

  location?: string;
  liveTrackingUrl?: string;
  notes?: string;
}

export interface ActivitySummaryCounts {
  totalActivities: number;
  operationalCount: number;
  guestCount: number;
  transportCount: number;
  vehicleCount: number;
  driverCount: number;
  scheduleCount: number;
  exceptionCount: number;
  ticketCount: number;
}
