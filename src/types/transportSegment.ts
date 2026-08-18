export type TransportSegmentStatus = 
  | "Scheduled"
  | "Driver Assigned"
  | "Vehicle Assigned"
  | "Ready"
  | "Departed"
  | "In Transit"
  | "Arrived"
  | "Completed"
  | "Delayed"
  | "Cancelled";

export type SegmentTransportType = "Vehicle" | "Ticket";

export interface TransportSegment {
  id: string;
  code: string; // e.g. SEG-01
  tripId: string;
  tripCode: string;
  origin: string;
  destination: string;
  date: string;
  plannedDeparture: string; // e.g. "08:00"
  actualDeparture?: string; // e.g. "08:17"
  plannedArrival: string; // e.g. "15:00"
  actualArrival?: string; // e.g. "15:12"
  departureDelayMinutes?: number;
  arrivalDelayMinutes?: number;
  transportType: SegmentTransportType;
  
  // Vehicle fields
  vehicleId?: string;
  vehiclePlate?: string;
  vehicleName?: string;
  vehicleCapacity?: number;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  vendorName?: string;

  // Guest assignments
  assignedGuestGroups: string[]; // e.g. ["GROUP A — Main Group (8 Guests)"]
  assignedPax: number;

  // Pickup & Dropoff integration
  pickupRecordId?: string;
  dropoffRecordId?: string;
  ticketReference?: string;

  status: TransportSegmentStatus;
  notes?: string;
}

export interface VehicleChangeEvent {
  id: string;
  tripId: string;
  timestamp: string; // e.g. "2026-08-27 — 15:30 WIB"
  location: string; // e.g. "Probolinggo"
  previousVehicleId: string;
  previousVehiclePlate: string;
  newVehicleId: string;
  newVehiclePlate: string;
  previousDriverName: string;
  newDriverName: string;
  reason: string;
  operator: string;
  notes?: string;
}

export interface DriverChangeEvent {
  id: string;
  tripId: string;
  timestamp: string;
  location: string;
  previousDriverId: string;
  previousDriverName: string;
  newDriverId: string;
  newDriverName: string;
  reason: string;
  operator: string;
  notes?: string;
}

export interface TransportSummaryMetrics {
  totalSegments: number;
  activeSegments: number;
  vehiclesCount: number;
  driversCount: number;
  completedSegments: number;
}
