export type VehicleSource = "Company Owned" | "Vendor Rental";

export type RentalRateType = "Per Day" | "Per Trip" | "Per Segment" | "Per Hour" | "Custom";

export type RentalStatus = 
  | "Requested"
  | "Quoted"
  | "Selected"
  | "Confirmed"
  | "Assigned"
  | "Completed"
  | "Closed"
  | "Cancelled";

export type MarkupType = "Fixed Amount" | "Percentage";

export interface VendorQuotation {
  id: string; // e.g. qt-001
  quotationNumber: string; // e.g. QT-2026-001
  vendorId: string;
  vendorName: string;
  quotationDate: string;
  validUntil: string;
  vehicleType: string;
  rateType: RentalRateType;
  baseRentalRate: number;
  driverIncluded: boolean;
  driverCost: number;
  additionalCost: number;
  totalVendorCost: number;
  status: "Selected" | "Available" | "Expired" | "Rejected";
  selectionReason?: string; // e.g. "Lowest Cost", "Availability", "Preferred Vendor"
  notes?: string;
}

export interface AdditionalCostItem {
  id: string;
  category: "Overtime" | "Extra Driver" | "Fuel" | "Parking" | "Toll" | "Cleaning" | "Towing" | "Other";
  amount: number;
  reason: string;
  recordedBy: string;
  recordedAt: string;
}

export interface PriceChangeAuditItem {
  id: string;
  timestamp: string;
  previousCost: number;
  newCost: number;
  varianceRupiah: number;
  user: string;
  role: string;
  reason: string;
}

export interface VehicleRentalCostRecord {
  id: string;
  tripId: string;
  tripCode: string;
  segmentId: string;
  segmentCode: string;
  vehicleSource: VehicleSource;

  // Vendor Information
  vendorId: string;
  vendorName: string;
  vendorCode: string;
  vendorContactPhone: string;

  // Vehicle Information
  vehicleId: string;
  vehiclePlate: string;
  vehicleName: string;
  vehicleCapacity: number;

  rentalPeriod: string; // e.g. "25 Aug – 29 Aug 2026"
  rateType: RentalRateType;
  durationDays: number;

  // Financial Breakdown (Vendor Cost vs Customer Selling Price)
  baseRentalRate: number;
  driverIncluded: boolean;
  driverCost: number;
  additionalCosts: AdditionalCostItem[];
  totalAdditionalCost: number;

  estimatedVendorCost: number;
  actualVendorCost: number;
  costVarianceRupiah: number;
  costVariancePercent: number;

  // Customer Selling Price & Markup
  sellingPrice: number;
  markupType: MarkupType;
  markupValue: number; // e.g. 500000 or 20 (%)
  markupRupiah: number;
  marginPercent: number;

  approvalRequired: boolean;
  status: RentalStatus;

  // Quotations & Audit
  quotations: VendorQuotation[];
  selectedQuotationId?: string;
  priceHistory: PriceChangeAuditItem[];

  notes?: string;
}

export interface OwnerCostSummary {
  totalVendorCost: number;
  totalSellingPrice: number;
  totalMarkup: number;
  totalActualCost: number;
  totalMarginRupiah: number;
  totalMarginPercent: number;
}
