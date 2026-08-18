export type ExceptionSeverity = "Low" | "Medium" | "High" | "Critical";

export type ExceptionStatus = 
  | "Open"
  | "Acknowledged"
  | "In Progress"
  | "Resolved"
  | "Closed"
  | "Cancelled";

export type OperationalStatus = 
  | "On Time"
  | "Delayed"
  | "At Risk"
  | "Missed"
  | "Completed"
  | "Cancelled"
  | "Failed";

export type ExceptionType =
  | "Pickup Delayed"
  | "Pickup Missed"
  | "Wrong Pickup Location"
  | "Drop-off Delayed"
  | "Wrong Drop-off Location"
  | "Vehicle Issue"
  | "Vehicle Breakdown"
  | "Driver Issue"
  | "Driver Late"
  | "Guest No-show"
  | "Guest Schedule Change"
  | "Guest Added During Trip"
  | "Vehicle Change"
  | "Driver Change"
  | "Ticket Issue"
  | "Ticket Pending"
  | "Ticket Cancelled"
  | "Route Change"
  | "Schedule Change"
  | "Other";

export interface OperationalException {
  id: string; // e.g. EXC-001
  tripId: string;
  tripCode: string;
  guestGroupName: string;
  guestPax: number;
  date: string;
  time: string;
  type: ExceptionType;
  location: string;
  
  // Entity linkage
  relatedEntityType: "Pickup" | "Dropoff" | "Vehicle" | "Driver" | "Ticket" | "Guest" | "Segment";
  relatedEntityId: string;

  // Schedules
  plannedTime?: string;
  actualTime?: string;
  delayMinutes?: number;

  description: string;
  severity: ExceptionSeverity;
  reportedBy: string;
  assignedTo: string;
  status: ExceptionStatus;

  // Resolution & Recovery
  actionTaken?: string;
  resolution?: string;
  recoveryType?: "Replacement Vehicle" | "Alternative Driver" | "Train Ticket" | "Bus Ticket" | "Refund" | "Voucher" | "Additional Cost" | "Other";
  recoveryCost?: number;

  // Owner Notification
  ownerNotified: boolean;
  ownerNotifiedAt?: string;

  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperationalHealthSummary {
  onTimePercentage: number;
  delayedPercentage: number;
  atRiskPercentage: number;
  missedPercentage: number;
  totalActiveIssues: number;
  criticalIssues: number;
  highIssues: number;
  pickupsCount: {
    total: number;
    onTime: number;
    delayed: number;
    missed: number;
    atRisk: number;
  };
  dropoffsCount: {
    total: number;
    completed: number;
    delayed: number;
    pending: number;
  };
}

export interface DailyOperationalEvent {
  id: string;
  time: string;
  type: "Pickup" | "Dropoff" | "Vehicle Change" | "Train Ticket" | "Milestone";
  title: string;
  location: string;
  pax: number;
  status: OperationalStatus;
  notes?: string;
}
