export type HotelCategory = "3 Star" | "4 Star" | "5 Star" | "Boutique Resort";
export type ContractStatus = "Active" | "Expiring Soon" | "Expired";
export type RoomAvailabilityStatus = "Available" | "Limited" | "Full";

export interface RoomTypeItem {
  id: string;
  name: string;
  occupancyPax: number;
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  ratePerNight: number;
  status: RoomAvailabilityStatus;
}

export interface RateContract {
  id: string;
  contractName: string;
  roomTypeName: string;
  ratePerNight: number;
  rateUnit: "Per Room / Night" | "Per Person / Night";
  effectiveFrom: string;
  effectiveUntil: string;
  status: "Active" | "Expired";
}

export interface ReservationContact {
  name: string;
  phone: string;
  email: string;
  operatingHours: string;
}

export interface ManifestRoomItem {
  roomNumber: string;
  roomType: string;
  guestName: string;
  paxCount: number;
}

export interface GroupAllocation {
  id: string;
  groupName: string;
  stayPeriod: string;
  guestsCount: number;
  roomsAllocatedCount: number;
  roomsBreakdown: string;
  manifest: ManifestRoomItem[];
  status: "Confirmed" | "Tentative" | "Checked In";
}

export interface HotelDocument {
  id: string;
  name: string;
  documentNumber: string;
  expiryDate: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface HotelActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface HotelMaster {
  id: string;
  code: string;
  name: string;
  category: HotelCategory;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  reservationContact: ReservationContact;
  roomTypes: RoomTypeItem[];
  contracts: RateContract[];
  documents: HotelDocument[];
  masterStatus: "Active" | "Inactive";
  contractStatus: ContractStatus;
  totalAvailableRooms: number;
  totalRoomsCount: number;
  startingRate: number;
  allocations: GroupAllocation[];
  activityHistory: HotelActivityLog[];
}
