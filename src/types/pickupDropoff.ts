export type PickupStatus = 
  | "Scheduled"
  | "Driver Assigned"
  | "On The Way"
  | "Arrived"
  | "Guest Ready"
  | "Picked Up"
  | "Completed"
  | "Delayed"
  | "Missed"
  | "Cancelled"
  | "Failed";

export type DropoffMethod = "Vehicle" | "Ticket";

export type TicketTransportType = "Train" | "Bus" | "Flight" | "Ferry";

export type TicketStatus = "Pending" | "Booked" | "Issued" | "Cancelled" | "Completed";

export type DropoffStatus = 
  | "Scheduled"
  | "In Transit"
  | "Arrived"
  | "Ticket Issued"
  | "Completed"
  | "Delayed"
  | "Cancelled";

export interface PickupLocation {
  name: string;
  address?: string;
  city?: string;
  lat?: number;
  lng?: number;
  instructions?: string;
}

export interface PickupRecord {
  id: string;
  code: string; // e.g. PK-001
  tripId: string;
  tripCode: string;
  guestAssignmentId: string;
  guestName: string;
  groupName: string;
  pax: number;
  date: string;
  plannedTime: string; // e.g. "08:00"
  actualTime?: string; // e.g. "08:17"
  delayMinutes: number; // positive for delay, negative for early
  delayStatus: "On Time" | "Early" | "Delayed" | "Missed" | "Pending";
  plannedLocation: PickupLocation;
  actualLocation?: PickupLocation;
  hasLocationMismatch: boolean;
  vehicleId: string;
  vehiclePlate: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  segmentId?: string;
  segmentName?: string;
  status: PickupStatus;
  missedReason?: string;
  actionTaken?: string;
  notes?: string;
}

export interface DropoffRecord {
  id: string;
  code: string; // e.g. DO-001
  tripId: string;
  tripCode: string;
  guestAssignmentId: string;
  guestName: string;
  groupName: string;
  pax: number;
  date: string;
  destination: string;
  method: DropoffMethod;
  
  // Vehicle fields
  vehicleId?: string;
  vehiclePlate?: string;
  vehicleName?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  plannedDropoffTime?: string; // e.g. "18:30"
  actualDropoffTime?: string; // e.g. "18:42"
  delayMinutes?: number;
  delayStatus?: "On Time" | "Early" | "Delayed" | "Pending";

  // Ticket fields
  transportType?: TicketTransportType;
  provider?: string; // e.g. "KAI", "Perum DAMRI"
  origin?: string;
  route?: string; // e.g. "Probolinggo → Banyuwangi"
  departureDate?: string;
  departureTime?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  bookingReference?: string;
  bookingStatus?: "Pending" | "Booked" | "Confirmed";
  ticketStatus?: TicketStatus;
  ticketAttachmentUrl?: string;

  status: DropoffStatus;
  segmentId?: string;
  segmentName?: string;
  notes?: string;
}

export interface PickupDropoffSummary {
  todayPickupsCount: number;
  pickupsOnTime: number;
  pickupsDelayed: number;
  pickupsMissed: number;
  todayDropoffsCount: number;
  dropoffsVehicle: number;
  dropoffsTicket: number;
  pendingTicketsCount: number;
  locationMismatchesCount: number;
}
