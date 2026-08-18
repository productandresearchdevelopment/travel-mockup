export type DestinationType =
  | "Nature"
  | "Culture"
  | "Historical"
  | "Adventure"
  | "Beach"
  | "Religious"
  | "Entertainment";

export type GuideRequirement = "Required" | "Recommended" | "Not Required";

export interface OperatingScheduleDay {
  dayName: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface TicketFeeItem {
  id: string;
  categoryName: string;
  amount: number;
  effectiveFrom: string;
  effectiveUntil: string;
  status: "Active" | "Expired";
}

export interface TemporaryClosureItem {
  date: string;
  reason: string;
  status: "Closed" | "Normal";
}

export interface DestinationDocument {
  id: string;
  name: string;
  documentNumber: string;
  expiryDate: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface DestinationActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface DestinationMaster {
  id: string;
  code: string;
  name: string;
  imageUrl?: string;
  type: DestinationType;
  description: string;
  city: string;
  region: string;
  address: string;
  lat: number;
  lng: number;
  operatingHoursText: string;
  weeklySchedule: OperatingScheduleDay[];
  startingTicketFee: number;
  ticketFees: TicketFeeItem[];
  guideRequirement: GuideRequirement;
  guideRequirementReason?: string;
  vehicleRestriction: string;
  bookingRequired: boolean;
  bookingLeadTimeDays?: number;
  recommendedArrivalTime: string;
  rules: string[];
  operationalNotes: string;
  temporaryClosure?: TemporaryClosureItem;
  masterStatus: "Active" | "Inactive";
  documents: DestinationDocument[];
  activityHistory: DestinationActivityLog[];
}
