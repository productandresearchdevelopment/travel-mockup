export type DriverStatus = "Available" | "Assigned" | "On Trip" | "Unavailable" | "Inactive";

export interface DriverLicense {
  licenseNumber: string;
  licenseType: "SIM A" | "SIM B1" | "SIM B1 Umum" | "SIM B2" | "SIM B2 Umum";
  issuedDate: string;
  expiryDate: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface DriverScheduleItem {
  id: string;
  date: string;
  title: string;
  timeWindow: string;
  status: "Available" | "Assigned" | "On Trip" | "Off";
}

export interface DriverAssignmentHistory {
  id: string;
  date: string;
  tourName: string;
  vehicleAssigned: string;
  destination: string;
  status: "Completed" | "Assigned" | "In Progress";
}

export interface DriverActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface DriverMaster {
  id: string;
  code: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
  city: string;
  region: string;
  license: DriverLicense;
  experienceYears: number;
  specialization: string;
  preferredRegion: string;
  notes?: string;
  masterStatus: "Active" | "Inactive";
  operationalStatus: DriverStatus;
  currentAssignment?: string;
  currentVehicle?: string;
  nextScheduleDate?: string;
  schedules: DriverScheduleItem[];
  assignments: DriverAssignmentHistory[];
  activityHistory: DriverActivityLog[];
}
