export type VehicleStatus = "Available" | "Reserved" | "On Trip" | "Maintenance" | "Inactive";
export type OwnershipType = "Rented" | "Owned";

export interface VehicleDocumentItem {
  id: string;
  name: string;
  documentNumber: string;
  type: "Registration (STNK)" | "Insurance" | "Rental Contract" | "KIR Inspection";
  validFrom: string;
  validUntil: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface VehicleAvailabilityDay {
  date: string;
  label: string; // e.g. "Today", "Tomorrow", "23 Aug"
  status: "Available" | "Reserved" | "On Trip" | "Maintenance";
  tripName?: string;
}

export interface VehicleCurrentAssignment {
  tripId: string;
  tripCode: string;
  tripName: string;
  date: string;
  driverId: string;
  driverName: string;
  guideName?: string;
  tmName: string;
  destinationName: string;
  paxCount: number;
  paxCapacity: number;
  status: "On Trip" | "Reserved";
}

export interface ChecklistRecord {
  id: string;
  date: string;
  type: "Pre-Trip Inspection" | "Post-Trip Inspection" | "Routine Safety";
  inspector: string;
  result: "Passed" | "Failed";
  passedItemsCount: number;
  totalItemsCount: number;
  items: {
    engine: boolean;
    brakes: boolean;
    tires: boolean;
    lights: boolean;
    ac: boolean;
    safetyEquipment: boolean;
    documents: boolean;
  };
  notes?: string;
}

export interface FuelLogItem {
  id: string;
  date: string;
  odometerKm: number;
  liters: number;
  costRupiah: number;
  driverName: string;
  notes?: string;
  referenceCode?: string;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  serviceType: string;
  vendorName: string;
  costRupiah: number;
  status: "Completed" | "Scheduled" | "In Progress";
  nextServiceDate?: string;
  nextServiceKm?: number;
  referenceCode?: string;
}

export interface VehicleCostItem {
  id: string;
  date: string;
  category: "Rental" | "Fuel" | "Maintenance" | "Other";
  description: string;
  amountRupiah: number;
  referenceCode: string;
}

export interface VehicleHistoryLog {
  id: string;
  date: string;
  time: string;
  event: string;
  category: "Trips" | "Checklist" | "Fuel" | "Maintenance" | "Documents" | "Status";
  user: string;
  notes?: string;
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
  fuelType: "Diesel" | "Gasoline" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  passengerCapacity: number;
  luggageCapacity: number;
  ownershipType: OwnershipType;
  vendorId?: string;
  vendorName: string;
  vendorContact: string;
  vendorPhone: string;
  vendorContractStatus: "Active" | "Pending" | "Expired";
  dailyRentalRate: number;
  rate?: {
    rateAmount: number;
    rentalType?: string;
    rateUnit?: string;
    effectiveFrom?: string;
    effectiveUntil?: string;
  };
  status: VehicleStatus;
  currentOdometerKm: number;
  lastOdometerUpdate: string;
  currentAssignment?: VehicleCurrentAssignment;
  availabilitySchedule: VehicleAvailabilityDay[];
  checklists: ChecklistRecord[];
  fuelRecords: FuelLogItem[];
  maintenanceRecords: MaintenanceRecord[];
  costRecords: VehicleCostItem[];
  documents: VehicleDocumentItem[];
  activityHistory: VehicleHistoryLog[];
  nextServiceDueDate: string;
  nextServiceDueKm: number;
  region: "East Java" | "Banyuwangi" | "Bali";
}
