export type GuestAssignmentStatus = 
  | "Scheduled"
  | "Active"
  | "Added During Trip"
  | "Completed"
  | "Cancelled"
  | "No-show";

export interface GuestGroup {
  id: string;
  name: string;
  joinLocation: string;
  leaveLocation: string;
  packageId: string;
  packageName: string;
  notes?: string;
  badgeVariant?: "violet" | "blue" | "emerald" | "amber" | "cyan" | "orange";
}

export interface GuestTransportSegmentAssignment {
  segmentId: string;
  segmentName: string;
  fromLocation: string;
  toLocation: string;
  transportType: "Vehicle" | "Train" | "Ferry" | "Flight";
  vehicleOrTicket: string;
  vehiclePlate?: string;
  driverName?: string;
  assignedPax: number;
  vehicleCapacity: number;
}

export interface GuestTripAssignment {
  id: string;
  tripId: string;
  guestId: string; // Refers to GuestMaster.id
  guestCode?: string;
  guestName: string;
  nationality: string;
  passportNumber: string;
  phone: string;
  pax: number; // Pax count represented by this assignment entry
  groupId: string;
  groupName: string;
  joinLocation: string;
  joinDate: string;
  joinTime: string;
  leaveLocation: string;
  leaveDate: string;
  leaveTime: string;
  packageId: string;
  packageName: string;
  status: GuestAssignmentStatus;
  addedMidTrip: boolean;
  addedLocation?: string;
  addedDate?: string;
  addedBy?: string;
  transportAssignments: GuestTransportSegmentAssignment[];
  notes?: string;
}

export interface GuestActivityLog {
  id: string;
  timestamp: string;
  action: 
    | "Guest Added"
    | "Guest Removed"
    | "Package Changed"
    | "Join Location Changed"
    | "Leave Location Changed"
    | "Transport Changed"
    | "Status Changed";
  details: string;
  operator: string;
}
