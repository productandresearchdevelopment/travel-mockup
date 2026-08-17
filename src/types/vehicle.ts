export type VehicleStatus = "Available" | "Assigned" | "On Trip" | "Maintenance" | "Inactive";

export interface VehicleDocument {
  id: string;
  name: string;
  documentNumber: string;
  expiryDate: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface VehicleRate {
  rentalType: "Daily" | "Per Trip" | "Hourly";
  rateAmount: number;
  rateUnit: "Per Day" | "Per Trip" | "Per Hour";
  effectiveFrom: string;
  effectiveUntil: string;
}

export interface OperationalSummary {
  status: VehicleStatus;
  currentDriver?: string;
  currentGuide?: string;
  currentTM?: string;
  currentAssignment?: string;
  currentLocation?: string;
}

export interface VehicleChecklistItem {
  item: string;
  status: "Passed" | "Pending" | "Failed";
  lastChecked: string;
}

export interface VehicleFuelRecord {
  id: string;
  date: string;
  fuelLiters: number;
  odometerKm: number;
  driverName: string;
  notes: string;
}

export interface VehicleMaintenanceRecord {
  id: string;
  date: string;
  serviceType: string;
  workshop: string;
  costAmount: number;
  nextServiceDate: string;
  status: "Completed" | "Scheduled" | "In Progress";
}

export interface VehicleActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface VehicleMaster {
  id: string;
  code: string;
  name: string;
  licensePlate: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  passengerCapacity: number;
  luggageCapacity: number;
  vendorName: string;
  vendorContact: string;
  vendorPhone: string;
  rate: VehicleRate;
  documents: VehicleDocument[];
  status: VehicleStatus;
  currentAssignment?: string;
  operationalSummary: OperationalSummary;
  checklists: VehicleChecklistItem[];
  fuelRecords: VehicleFuelRecord[];
  maintenanceRecords: VehicleMaintenanceRecord[];
  activityHistory: VehicleActivityLog[];
}
