export type PackageType =
  | "Day Tour"
  | "Multi Destination"
  | "Overland"
  | "Private Tour"
  | "Shared Tour";

export type PackageStatus = "Active" | "Inactive" | "Draft";

export type RequirementCategory =
  | "Ticket"
  | "Equipment"
  | "Health Certificate"
  | "Permit"
  | "Guide"
  | "Special Transport";

export interface PackageDestinationRequirement {
  id: string;
  destinationId: string;
  destinationName: string;
  region: string;
  order: number;
  requirementType: RequirementCategory;
  requirementName: string;
  costRupiah: number;
  isMandatory: boolean;
  notes?: string;
}

export interface PackageCostBreakdown {
  ticketsRupiah: number;
  equipmentRupiah: number;
  healthCertificateRupiah: number;
  otherRupiah: number;
}

export interface PackageLinkedBooking {
  id: string;
  bookingCode: string;
  guestName: string;
  guestNationality: string;
  travelDate: string;
  paxCount: number;
  origin: string;
  dropOff: string;
  status: "Confirmed" | "In Progress" | "Completed";
}

export interface PackageHistoryLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface TourPackageMaster {
  id: string;
  code: string;
  name: string;
  type: PackageType;
  duration: string; // e.g. "1 Day", "2D1N", "3D2N", "4D3N", "5D4N"
  description: string;
  status: PackageStatus;
  destinations: PackageDestinationRequirement[];
  totalOperationalCostRupiah: number;
  costBreakdown: PackageCostBreakdown;
  usedInBookingsCount: number;
  linkedBookings: PackageLinkedBooking[];
  history: PackageHistoryLog[];
  createdAt: string;
  updatedAt: string;
}
