import { WorkerRole } from "@/types/workforce";

export type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Leave"
  | "On Assignment"
  | "Off"
  | "Not Recorded";

export type AttendanceSource =
  | "Trip Assignment"
  | "Manual Record"
  | "System Derived";

export interface AttendanceRecord {
  id: string;
  date: string; // e.g. "25 Aug 2026"
  workerId: string;
  workerName: string;
  workerCode: string;
  role: WorkerRole;
  assignmentName: string; // e.g. "East Java Explorer"
  tripCode?: string; // e.g. "TRP-2026-00421"
  tripId?: string; // e.g. "trip-001"
  status: AttendanceStatus;
  checkInTime?: string; // e.g. "02:45"
  checkOutTime?: string; // e.g. "17:30"
  workingHours?: string; // e.g. "14h 45m"
  source: AttendanceSource;
  notes?: string;
  recordedBy: string;
  recordedAt: string;
}

export interface AttendanceSummaryMetrics {
  totalWorkforce: number;
  present: number;
  onAssignment: number;
  absent: number;
  leave: number;
  notRecorded: number;
}

export interface MonthlyAttendanceSummary {
  monthYear: string;
  workingDays: number;
  presentDays: number;
  assignmentDays: number;
  absentDays: number;
  leaveDays: number;
}
