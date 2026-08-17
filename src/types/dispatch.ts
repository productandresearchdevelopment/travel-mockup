export type DeploymentStatus =
  | "Draft"
  | "Ready"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export interface ConflictItem {
  resourceType: "Vehicle" | "Driver" | "Guide" | "TourManager" | "Destination" | "Hotel";
  title: string;
  message: string;
  severity: "Blocking" | "Warning";
}

export interface DeploymentActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface ReadinessChecklist {
  destinationAssigned: boolean;
  vehicleAssigned: boolean;
  vehicleCompatible: boolean;
  driverAssigned: boolean;
  driverAvailable: boolean;
  guideSatisfied: boolean;
  tourManagerAssigned: boolean;
  hotelAllocated: boolean;
  scheduleValid: boolean;
  noConflicts: boolean;
}

export interface DeploymentRecord {
  id: string;
  code: string;
  name: string;
  date: string;
  departureTime: string;
  estimatedEndTime: string;
  destinationId: string;
  destinationName: string;
  region: "East Java" | "Bali";
  city: string;
  hotelId?: string;
  hotelName?: string;
  hotelRoomsAllocated?: number;
  vehicleId: string;
  vehiclePlate: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  guideId?: string;
  guideName?: string;
  guideRequired: boolean;
  tourManagerId: string;
  tourManagerName: string;
  paxCount: number;
  bookingReference?: string;
  notes?: string;
  status: DeploymentStatus;
  estimatedVehicleCost: number;
  conflicts: ConflictItem[];
  activityHistory: DeploymentActivityLog[];
  confirmedAt?: string;
  confirmedBy?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  readinessChecklist: ReadinessChecklist;
}
