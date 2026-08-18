export type FinancialStatus = "Healthy" | "Warning" | "Over Budget" | "Loss";

export type PaymentStatus =
  | "Unpaid"
  | "Partially Paid"
  | "Paid"
  | "Overpaid"
  | "Refunded"
  | "Cancelled";

export type RevenueSourceCategory =
  | "Tour Package"
  | "Transport"
  | "Hotel"
  | "Ticket"
  | "Additional Service"
  | "Custom Charge"
  | "Other";

export interface PaymentTransaction {
  id: string; // e.g. pay-001
  tripId: string;
  guestName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: "Bank Transfer" | "Credit Card" | "Cash" | "QRIS";
  reference: string;
  status: "Confirmed" | "Pending" | "Refunded";
  notes?: string;
}

export interface PaymentLink {
  id: string;
  linkUrl: string;
  amount: number;
  createdDate: string;
  expiryDate: string;
  status: "Pending Payment" | "Paid" | "Expired";
}

export interface TripRevenueBreakdown {
  tourPackageRevenue: number;
  transportRevenue: number;
  hotelRevenue: number;
  ticketRevenue: number;
  additionalGuestRevenue: number;
  totalRevenue: number;
}

export interface TripCostBreakdownDetails {
  vehicleCost: number;
  driverCost: number;
  hotelCost: number;
  ticketCost: number;
  tourCost: number;
  otherCost: number;
  additionalVehicleReplacementCost: number;
  additionalGuestCost: number;
  totalActualCost: number;
}

export interface DailyCostMatrixRow {
  date: string;
  hotelCost: number;
  trainCost: number;
  ferryCost: number;
  tourCost: number;
  vehicleCost: number;
  driverCost: number;
  dailyTotal: number;
}

export interface TripProfitabilityRecord {
  id: string;
  tripId: string;
  tripCode: string;
  tripName: string;
  paxCount: number;
  revenue: TripRevenueBreakdown;
  estimatedCost: number;
  actualCost: TripCostBreakdownDetails;
  grossProfit: number;
  grossMarginPercent: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentStatus: PaymentStatus;
  financialStatus: FinancialStatus;
  transactions: PaymentTransaction[];
  paymentLink?: PaymentLink;
  dailyMatrix: DailyCostMatrixRow[];
}

export interface ExecutiveOwnerFinancialSummary {
  activeTripsCount: number;
  totalRevenue: number;
  totalEstimatedCost: number;
  totalActualCost: number;
  totalGrossProfit: number;
  totalOutstanding: number;
  totalCostOverrun: number;
}
