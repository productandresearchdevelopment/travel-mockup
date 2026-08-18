export type TMStatus = "Available" | "Assigned" | "On Tour" | "Unavailable" | "Inactive";

export interface TMScheduleItem {
  id: string;
  date: string;
  title: string;
  timeWindow: string;
  status: "Available" | "Assigned" | "On Tour" | "Off";
}

export interface TMAssignmentRecord {
  id: string;
  date: string;
  tourName: string;
  destination: string;
  vehicleAssigned: string;
  driverAssigned: string;
  guideAssigned: string;
  status: "Completed" | "Assigned" | "In Progress";
}

export interface TMActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface TourManagerMaster {
  id: string;
  code: string;
  fullName: string;
  avatarUrl?: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  address: string;
  experienceYears: number;
  specialization: "Group Tour" | "Corporate Tour" | "Family Tour" | "Adventure Tour" | "International Tour";
  notes?: string;
  primaryRegion: string;
  additionalRegions: string[];
  masterStatus: "Active" | "Inactive";
  operationalStatus: TMStatus;
  currentAssignment?: string;
  activeAssignmentsCount: number;
  nextScheduleDate?: string;
  schedules: TMScheduleItem[];
  assignments: TMAssignmentRecord[];
  activityHistory: TMActivityLog[];
}
