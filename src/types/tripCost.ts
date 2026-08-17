export type CostCategory =
  | "Accommodation"
  | "Transportation"
  | "Tour / Activity"
  | "Ticket / Entrance"
  | "Vehicle Rental"
  | "Guide"
  | "TM"
  | "Fuel"
  | "Other Operational";

export type CostSource =
  | "Hotel Master"
  | "Vehicle Rental Contract"
  | "Tour Package"
  | "Destination"
  | "Transportation Booking"
  | "Guide Assignment"
  | "TM Assignment"
  | "Manual";

export type CostStatus = "Estimated" | "Confirmed" | "Actual" | "Cancelled";

export interface TripOperationalCostItem {
  id: string;
  tripId: string;
  date: string; // e.g. "25 Aug 2026" or "3 Dec 2025"
  category: CostCategory;
  description: string;
  quantity: number;
  unit: "Day" | "Pax" | "Room" | "Trip" | "Ticket" | "Item";
  unitCostRupiah: number;
  totalEstimatedCostRupiah: number;
  actualCostRupiah?: number;
  varianceRupiah?: number;
  status: CostStatus;
  source: CostSource;
  sourceReferenceId?: string;
  isVendorRateLocked?: boolean;
  notes?: string;
  createdAt: string;
}

export interface DailyCostGroup {
  date: string;
  accommodationRupiah: number;
  vehicleRentalRupiah: number;
  trainRupiah: number;
  ferryRupiah: number;
  tourActivityRupiah: number;
  ticketEntranceRupiah: number;
  otherOperationalRupiah: number;
  dailyTotalRupiah: number;
  items: TripOperationalCostItem[];
}

export interface TripCostSummary {
  totalEstimatedRupiah: number;
  costPerGuestRupiah: number;
  paxCount: number;
  accommodationRupiah: number;
  transportationRupiah: number;
  tourActivityRupiah: number;
  ticketEntranceRupiah: number;
  vehicleRentalRupiah: number;
  otherOperationalRupiah: number;
}
