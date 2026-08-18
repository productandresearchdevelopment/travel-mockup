export type GuestStatus = "Active" | "Completed" | "Inactive";
export type GenderType = "Male" | "Female" | "Other";
export type PaymentStatusType = "Unpaid" | "Partially Paid" | "Paid in Full";

export interface GuestManifestItem {
  guestId: string;
  fullName: string;
  nationality: string;
  gender: GenderType;
  passportNumber: string;
}

export interface HotelAllocationItem {
  id: string;
  hotelId: string;
  hotelName: string;
  date: string;
  roomNumber: string;
  roomType: string;
  guestsAssigned: string[];
  status: "Confirmed" | "Pending";
}

export interface TransportBookingItem {
  id: string;
  type: "KAI" | "Flight" | "Bus" | "Ferizy";
  bookingDate: string;
  segment: string;
  referenceNumber: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
}

export interface JourneyRecord {
  origin: string;
  pickup: string;
  destinations: string[];
  dropOff: string;
  travelType: "Overland" | "Flight" | "Island Hopping";
  duration: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  product: string;
  tourType: string;
  platform: string;
  travelDate: string;
  paxCount: number;
  guestManifest: GuestManifestItem[];
  journey: JourneyRecord;
  hotels: HotelAllocationItem[];
  transports: TransportBookingItem[];
  totalBillingRupiah: number;
  paymentStatus: PaymentStatusType;
  paymentLink?: string;
  operationalNotes: string;
  assignedDeploymentId?: string;
  tripStatus: "Confirmed" | "In Progress" | "Completed" | "Pending Dispatch";
}

export interface TravelHistoryItem {
  id: string;
  bookingCode: string;
  travelDate: string;
  product: string;
  route: string;
  paxCount: number;
  status: "Completed" | "In Progress" | "Confirmed";
}

export interface GuestDocumentItem {
  id: string;
  name: string;
  documentNumber: string;
  issuingCountry: string;
  validUntil: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface GuestMaster {
  id: string;
  code: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  avatarUrl?: string;
  gender: GenderType;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  phone: string;
  email: string;
  whatsapp?: string;
  passportNumber: string;
  passportIssuingCountry: string;
  passportExpiryDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  travelProfile: {
    preferredLanguage: string;
    dietaryRequirement: string;
    specialRequirement: string;
    notes?: string;
  };
  totalTripsCount: number;
  totalDestinationsVisited: number;
  lastTripDate: string;
  status: GuestStatus;
  currentBooking?: BookingRecord;
  travelHistory: TravelHistoryItem[];
  documents: GuestDocumentItem[];
}
