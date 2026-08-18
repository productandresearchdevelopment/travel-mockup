export type WorkerType =
  | "Employee"
  | "Daily Worker"
  | "Freelance Driver"
  | "Vendor Driver";

export type VehicleOwnership =
  | "Own Vehicle"
  | "Company Vehicle"
  | "Vendor Vehicle"
  | "No Vehicle";

export type DriverAvailabilityStatus =
  | "Available"
  | "Assigned"
  | "On Trip"
  | "Off Duty"
  | "Absent"
  | "Leave"
  | "Unavailable";

export type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Late"
  | "Leave"
  | "Off Day";

export type RateType = "Per Day" | "Per Trip" | "Per Segment" | "Per Hour" | "Custom";

export type PaymentStatus =
  | "Draft"
  | "Pending Review"
  | "Approved"
  | "Paid"
  | "Cancelled";

export interface DailyWorkRecord {
  id: string; // e.g. dwr-001
  driverId: string;
  driverName: string;
  driverCode: string;
  workerType: WorkerType;
  vehicleOwnership: VehicleOwnership;

  tripId: string;
  tripCode: string;
  segmentId?: string;
  segmentCode?: string;
  date: string; // e.g. "2026-08-25"

  checkInTime: string; // e.g. "07:30 WIB"
  checkOutTime: string; // e.g. "19:00 WIB"
  checkInLocation: string; // e.g. "Hotel Tentrem Yogyakarta"
  checkOutLocation: string; // e.g. "Probolinggo Rest Area"

  totalHoursWorked: number; // e.g. 11.5
  baseHours: number; // e.g. 8.0
  overtimeHours: number; // e.g. 3.5

  rateType: RateType;
  dailyRateRupiah: number; // e.g. 250000
  overtimeRatePerHour: number; // e.g. 30000
  overtimePayRupiah: number; // e.g. 90000

  mealAllowanceRupiah: number; // e.g. 50000
  overnightAllowanceRupiah: number;
  totalAllowanceRupiah: number; // e.g. 50000

  deductionRupiah: number;
  deductionReason?: string;

  grossPayRupiah: number; // e.g. 390000
  netPayRupiah: number; // e.g. 390000

  attendanceStatus: AttendanceStatus;
  lateMinutes: number;
  paymentStatus: PaymentStatus;

  vehiclePlate: string; // e.g. "HiAce B 1234 XYZ"
  vendorName?: string;
  notes?: string;
}

export interface DriverPerformanceSummary {
  totalTrips: number;
  completedTrips: number;
  onTimeRatePercent: number;
  delayedTrips: number;
  averageDelayMinutes: number;
  workingDays: number;
  totalOvertimeHours: number;
  vehicleChangesCount: number;
}

export interface DriverAvailabilityRecord {
  driverId: string;
  driverName: string;
  driverCode: string;
  workerType: WorkerType;
  status: DriverAvailabilityStatus;
  currentTripCode?: string;
  shiftWindow: string; // e.g. "08:00 – 18:00"
  conflictWarning?: string;
}
