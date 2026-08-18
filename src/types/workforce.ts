export type WorkerRole = "Driver" | "Guide" | "Tour Manager" | "Other Operational";

export type EmploymentType = "Daily Worker" | "Contract" | "Permanent" | "Freelance";

export type VehicleOwnership = "No Vehicle" | "Personal Vehicle" | "Company Vehicle";

export type AvailabilityState =
  | "Available"
  | "Assigned"
  | "On Trip"
  | "Unavailable"
  | "Leave"
  | "Inactive";

export interface WorkerAssignment {
  id: string;
  tripId: string;
  tripCode: string;
  tripName: string;
  date: string;
  role: WorkerRole;
  status: "Assigned" | "In Progress" | "Completed";
}

export interface WorkerAttendanceLog {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: "Present" | "On Duty" | "Absent" | "On Leave";
  tripReference?: string;
  notes?: string;
}

export interface WorkerCompensationRecord {
  id: string;
  period: string;
  daysWorked: number;
  dailyRateRupiah: number;
  totalCalculatedRupiah: number;
  status: "Pending" | "Approved" | "Paid";
  paymentDate?: string;
}

export interface WorkerHistoryLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface WorkerMaster {
  id: string;
  workerCode: string;
  fullName: string;
  role: WorkerRole;
  avatarUrl?: string;
  employmentType: EmploymentType;
  phone: string;
  region: string;
  dailyRateRupiah: number;
  vehicleOwnership: VehicleOwnership;
  availability: AvailabilityState;
  currentAssignment?: string;
  status: "Active" | "Inactive";
  joinedDate: string;
  assignments: WorkerAssignment[];
  attendanceLogs: WorkerAttendanceLog[];
  compensationHistory: WorkerCompensationRecord[];
  history: WorkerHistoryLog[];
}
