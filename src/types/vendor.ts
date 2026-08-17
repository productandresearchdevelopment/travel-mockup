export type VendorStatus = "Active" | "Inactive";
export type ContractStatus = "Active" | "Draft" | "Expiring" | "Expired" | "Cancelled";
export type RentalRateType = "Daily" | "Weekly" | "Monthly" | "Per Trip";
export type CostReviewStatus = "Pending Review" | "Approved" | "Rejected";
export type CostVarianceStatus = "Within Estimate" | "Above Estimate" | "Below Estimate";

export interface RentalRate {
  id: string;
  contractId: string;
  contractNumber: string;
  vendorId: string;
  vehicleType: string;
  vehicleId?: string;
  vehiclePlate?: string;
  rateType: RentalRateType;
  rateRupiah: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: "Active" | "Expired" | "Draft";
  locked: boolean;
}

export interface RentalContract {
  id: string;
  contractNumber: string;
  vendorId: string;
  vendorName: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  rentalType: RentalRateType;
  paymentTerms: "Monthly" | "Bi-Weekly" | "Per Trip" | "Net 30";
  assignedVehiclesCount: number;
  vehicles: Array<{
    vehicleId: string;
    vehiclePlate: string;
    vehicleName: string;
    rateRupiah: number;
  }>;
  rates: RentalRate[];
  notes?: string;
}

export interface VendorTripCostRecord {
  id: string;
  tripId: string;
  tripCode: string;
  tripName: string;
  date: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleName: string;
  vendorId: string;
  vendorName: string;
  contractNumber: string;
  rateRupiah: number;
  durationDays: number;
  estimatedRentalCost: number;
  actualRentalCost: number;
  varianceRupiah: number;
  variancePercent: number;
  status: CostVarianceStatus;
  reviewStatus: CostReviewStatus;
  reviewNotes?: string;
}

export interface VendorCostHistoryItem {
  id: string;
  monthYear: string;
  tripsCount: number;
  vehiclesCount: number;
  estimatedRupiah: number;
  actualRupiah: number;
  varianceRupiah: number;
  variancePercent: number;
  status: CostVarianceStatus;
}

export interface VendorDocumentItem {
  id: string;
  name: string;
  documentNumber: string;
  validUntil: string;
  status: "Valid" | "Expiring Soon" | "Expired";
  category: "Contract" | "License" | "Insurance" | "Permit";
}

export interface VendorAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface VendorMaster {
  id: string;
  code: string;
  name: string;
  legalName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  region: "East Java" | "Banyuwangi" | "Bali";
  city: string;
  suppliedVehiclesCount: number;
  activeContractsCount: number;
  currentTripsCount: number;
  estimatedMonthlyCostRupiah: number;
  actualMonthlyCostRupiah: number;
  varianceRupiah: number;
  variancePercent: number;
  status: VendorStatus;
  contracts: RentalContract[];
  rates: RentalRate[];
  vehicles: Array<{
    vehicleId: string;
    vehiclePlate: string;
    name: string;
    vehicleType: string;
    status: string;
    currentTripName?: string;
    rateRupiah: number;
    locked: boolean;
  }>;
  trips: VendorTripCostRecord[];
  costHistory: VendorCostHistoryItem[];
  documents: VendorDocumentItem[];
  activityHistory: VendorAuditLog[];
}
