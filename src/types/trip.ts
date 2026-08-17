export type TripStatus =
  | "Scheduled"
  | "Ready"
  | "In Progress"
  | "Delayed"
  | "Completed"
  | "Cancelled";

export type CheckpointStatus = "Upcoming" | "In Progress" | "Completed" | "Skipped";

export interface TripCheckpoint {
  id: string;
  name: string;
  scheduledTime: string;
  actualTime?: string;
  status: CheckpointStatus;
  notes?: string;
}

export interface TripIssue {
  id: string;
  type: "Vehicle" | "Driver" | "Guide" | "Hotel" | "Destination" | "Passenger" | "Schedule" | "Other";
  severity: "Low" | "Medium" | "High";
  description: string;
  reportedTime: string;
  reportedBy: string;
  status: "Open" | "Resolved";
  resolutionNote?: string;
}

export interface TripNote {
  id: string;
  timestamp: string;
  user: string;
  note: string;
}

export interface TripActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
  category?: "Trip Events" | "Checkpoints" | "Issues" | "Status Changes";
}

export interface AuditTrailItem {
  id: string;
  timestamp: string;
  activity: string;
  category: "Trip Events" | "Checkpoints" | "Issues" | "Status Changes";
  user: string;
  notes: string;
  status: "Success" | "Warning" | "Resolved";
}

export interface TripRecord {
  id: string;
  code: string;
  deploymentId: string;
  deploymentCode: string;
  name: string;
  date: string;
  departureTime: string;
  estimatedEndTime: string;
  completedAt?: string;
  plannedDuration?: string;
  actualDuration?: string;
  scheduleVariance?: string;
  performanceStatus?: "On Schedule" | "Completed with Delay";
  destinationId: string;
  destinationName: string;
  region: "East Java" | "Banyuwangi" | "Bali";
  city: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  guideId?: string;
  guideName?: string;
  tourManagerId: string;
  tourManagerName: string;
  hotelId?: string;
  hotelName?: string;
  hotelRoomsAllocated?: number;
  paxCount: number;
  status: TripStatus;
  progressPercent: number;
  elapsedTime: string;
  remainingTime: string;
  currentCheckpoint: string;
  checkpoints: TripCheckpoint[];
  issues: TripIssue[];
  notes: TripNote[];
  history: TripActivityLog[];
  auditTrail?: AuditTrailItem[];
  resourceReleaseStatus?: "Released / Available" | "On Trip";
}
