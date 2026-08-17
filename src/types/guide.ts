export type GuideStatus = "Available" | "Assigned" | "On Tour" | "Unavailable" | "Inactive";
export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface DestinationExperience {
  id: string;
  destinationName: string;
  level: ExperienceLevel;
  tripsCount: number;
}

export interface GuideDocument {
  id: string;
  name: string;
  documentNumber: string;
  expiryDate: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export interface GuideScheduleItem {
  id: string;
  date: string;
  title: string;
  timeWindow: string;
  status: "Available" | "Assigned" | "On Tour" | "Off";
}

export interface GuideAssignmentRecord {
  id: string;
  date: string;
  tourName: string;
  destination: string;
  vehicleAssigned: string;
  tourManager: string;
  status: "Completed" | "Assigned" | "In Progress";
}

export interface GuideActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: string;
}

export interface GuideMaster {
  id: string;
  code: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  address: string;
  experienceYears: number;
  guideType: "Local Guide" | "Tour Guide" | "Specialist Guide" | "Freelance Guide";
  specialization: string;
  notes?: string;
  languages: string[];
  destinationExperiences: DestinationExperience[];
  documents: GuideDocument[];
  masterStatus: "Active" | "Inactive";
  operationalStatus: GuideStatus;
  currentAssignment?: string;
  currentDestination?: string;
  nextScheduleDate?: string;
  schedules: GuideScheduleItem[];
  assignments: GuideAssignmentRecord[];
  activityHistory: GuideActivityLog[];
}
