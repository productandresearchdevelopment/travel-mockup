import { WorkerRole, EmploymentType } from "@/types/workforce";

export type PayrollStatus =
  | "Draft"
  | "Pending Review"
  | "Approved"
  | "Paid"
  | "Cancelled";

export interface WorkingDayProof {
  date: string;
  assignmentName: string;
  tripCode?: string;
  attendanceStatus: string;
}

export interface RateHistoryItem {
  effectiveDate: string;
  rateRupiah: number;
  previousRateRupiah?: number;
}

export interface PayrollRecord {
  id: string;
  payrollCode: string;
  period: string; // e.g. "August 2026"
  workerId: string;
  workerName: string;
  workerCode: string;
  role: WorkerRole;
  avatarUrl?: string;
  employmentType: EmploymentType;
  workingDaysCount: number;
  dailyRateRupiah: number;
  basePayRupiah: number; // workingDaysCount * dailyRateRupiah
  adjustmentRupiah: number;
  adjustmentReason?: string;
  deductionRupiah: number;
  deductionReason?: string;
  totalPayRupiah: number; // basePayRupiah + adjustmentRupiah - deductionRupiah
  status: PayrollStatus;
  workingDaysList: WorkingDayProof[];
  anomalies: string[];
  rateHistory: RateHistoryItem[];
  approvedBy?: string;
  notes?: string;
}

export interface RoleCostBreakdown {
  role: WorkerRole;
  workerCount: number;
  totalCostRupiah: number;
}

export interface TripCostBreakdown {
  tripCode: string;
  tripName: string;
  totalWorkforceCostRupiah: number;
}
