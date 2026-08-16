export type UserRole = 
  | 'operation_manager'
  | 'business_manager'
  | 'dispatcher'
  | 'fleet'
  | 'sdm';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  roleLabel: string;
  region: string;
  avatar: string;
}

export interface ActivityHistoryItem {
  id: string;
  type: string;
  title: string;
  description: string;
  userId: string;
  timestamp: string;
}

export type OperationalRole = 
  | 'Operation Manager (OM)'
  | 'Business Manager (BM)'
  | 'Dispatcher'
  | 'Vehicle / Fleet Management'
  | 'SDM / Crew Management';

export type BookingPlatform = 'GetYourGuide' | 'Direct Online' | 'Direct Offline';

export type BookingStatus = 
  | 'Created'
  | 'Pending Review' 
  | 'Reviewed'
  | 'Assigned to Tour'
  | 'Grouped' 
  | 'Ready for Dispatch' 
  | 'Planned'
  | 'Ready'
  | 'In Transit' 
  | 'Completed' 
  | 'Cancelled';

export type BillingStatus = 'Paid in Full' | 'Deposit Paid' | 'Payment Pending' | 'Invoice Issued';

export interface Booking {
  id: string;
  bookingDate: string;
  tourDate: string;
  source: BookingPlatform;
  origin: string;
  product: string;
  dropOff: string;
  tourType: 'Standard - Sharing' | 'Private VIP' | 'Luxury Overland' | 'Custom Private';
  pax: number;
  guestName: string;
  gender: 'M' | 'F';
  greeting: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  passportStatus: 'Verified' | 'Pending' | 'Not Required';
  phone: string;
  pickupTime: string;
  pickupLocation: string;
  billingStatus: BillingStatus;
  totalBilling: number;
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  operationalNotes: string;
  status: BookingStatus;
  statusLabel?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  assignedTo?: string;
  groupedTourId?: string;
  activityHistory?: ActivityHistoryItem[];
}

export type TourStatus = 
  | 'Created'
  | 'Unassigned'
  | 'Planning'
  | 'Planned'
  | 'Pending Deployment'
  | 'Ready'
  | 'Departed'
  | 'In Transit'
  | 'On Trip'
  | 'Handover'
  | 'Arrived'
  | 'Completed'
  | 'Issue';

export interface TourIssue {
  id: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  description: string;
  reportedBy: string;
  time: string;
  status: 'Open' | 'Resolving' | 'Resolved';
  resolution?: string;
}

export interface TourHandover {
  currentRegion: string;
  nextRegion: string;
  handoverTime: string;
  responsibleBm: string;
  status: 'Pending' | 'In Progress' | 'Confirmed';
}

export interface Tour {
  id: string;
  bookingIds: string[];
  tourName: string;
  date: string;
  origin: string;
  destination: string;
  dropOff: string;
  pax: number;
  status: TourStatus;
  statusLabel?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  vehicleId?: string;
  driverId?: string;
  tourManagerId?: string;
  guideId?: string;
  assistGuideId?: string;
  jeepProvider?: string;
  handoverLocation?: string;
  handoverDetails?: TourHandover;
  checkpoints: {
    location: string;
    scheduledTime: string;
    actualTime?: string;
    status: 'Pending' | 'Passed' | 'Delayed';
    activity?: string;
  }[];
  operationalIssue?: string;
  issuesList?: TourIssue[];
  lastUpdate?: string;
  activityHistory?: ActivityHistoryItem[];
}

export type VehicleStatus = 
  | 'Available'
  | 'Assigned'
  | 'On Trip'
  | 'Returned'
  | 'Maintenance'
  | 'Inspection'
  | 'Unavailable'
  | 'Issue Reported'
  | 'Repair Assigned'
  | 'Ready';

export type VehicleOwnership = 'Company' | 'Rental' | 'Partner';

export interface Vehicle {
  id: string;
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
  ownership: VehicleOwnership;
  status: VehicleStatus;
  statusLabel?: string;
  currentLocation: string;
  currentTourId: string | null;
  fuelLevel: number;
  odometer: number;
  lastChecklist: string;
  maintenanceStatus: 'Good' | 'Needs Inspection' | 'Service Due' | 'In Repair';
  assignedDriverId?: string;
  activityHistory?: ActivityHistoryItem[];
}

export type ChecklistItemResult = 'Passed' | 'Warning' | 'Failed';

export interface VehicleChecklist {
  id: string;
  vehicleId: string;
  timestamp: string;
  inspectorName: string;
  engineStatus: ChecklistItemResult;
  oilStatus: ChecklistItemResult;
  brakeStatus: ChecklistItemResult;
  tireStatus: ChecklistItemResult;
  lightsStatus: ChecklistItemResult;
  acStatus: ChecklistItemResult;
  fuelStatus: ChecklistItemResult;
  cleanlinessStatus: ChecklistItemResult;
  overallResult: 'Passed' | 'Warning' | 'Failed';
  notes?: string;
}

export type RepairStatus = 'Reported' | 'Assigned' | 'Repair' | 'Inspection' | 'Ready';

export interface VehicleRepairAssignment {
  id: string;
  vehicleId: string;
  problem: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedWorkshop: string;
  reportedDate: string;
  estimatedCompletion: string;
  status: RepairStatus;
}

export type CrewRole = 'Driver' | 'Local Guide' | 'Tour Manager' | 'Assist Guide';
export type CrewEmploymentType = 'Permanent' | 'Freelance' | 'Daily Worker' | 'Partner';
export type CrewStatus = 'Available' | 'Assigned' | 'On Trip' | 'Completed' | 'Unavailable' | 'Off Duty';

export interface Crew {
  id: string;
  name: string;
  role: CrewRole;
  employmentType: CrewEmploymentType;
  phone: string;
  status: CrewStatus;
  statusLabel?: string;
  currentTourId: string | null;
  homeBase: string;
  rating: number;
  licenses: string[];
  toursCompleted: number;
  activityHistory?: ActivityHistoryItem[];
}

export interface CrewAttendance {
  id: string;
  date: string;
  crewId: string;
  crewName: string;
  role: CrewRole;
  tourId: string;
  checkIn: string;
  checkOut: string;
  status: 'Checked In' | 'On Duty' | 'Checked Out' | 'Late';
}

export interface CrewFieldReport {
  id: string;
  tourId: string;
  crewId: string;
  crewName: string;
  date: string;
  location: string;
  reportText: string;
  photoCount: number;
  status: 'Submitted' | 'Verified';
}

export interface ManifestPassenger {
  bookingId: string;
  guestName: string;
  greeting: string;
  gender: string;
  pax: number;
  passportStatus: string;
  phone: string;
  pickupLocation: string;
  dropOff: string;
  specialRequests?: string;
}

export interface Manifest {
  id: string;
  tourId: string;
  passengers: ManifestPassenger[];
  vehicleId: string | null;
  driverId: string | null;
  tourManagerId: string | null;
  guideId: string | null;
  assistGuideId?: string | null;
  hotel: string;
  transport: string | null;
  jeepDetails?: string;
  ferryDetails?: string;
  status: 'Draft' | 'Pending Approval' | 'Complete' | 'Locked';
  updatedAt: string;
}

export interface VehicleLog {
  id: string;
  vehicleId: string;
  tourId: string;
  driverId: string;
  date: string;
  departureTime: string;
  returnTime: string;
  odometerStart: number;
  odometerEnd: number;
  fuelStart: number;
  fuelEnd: number;
  status: 'Pending' | 'On Trip' | 'Completed';
  notes?: string;
}

export type MaintenanceType = 'Scheduled Service' | 'Emergency Repair' | 'Tire Replacement' | 'Brake Inspection' | 'AC Maintenance';
export type MaintenanceStatus = 'Scheduled' | 'Due' | 'In Progress' | 'Completed' | 'Overdue';
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Maintenance {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  description: string;
  dueDate: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  assignedWorkshop: string;
  estimatedCost: number;
}

export type FinanceCategory = 
  | 'BOP'
  | 'Ticket'
  | 'Jeep'
  | 'Guide'
  | 'Assist Guide'
  | 'Hotel'
  | 'Train'
  | 'Ferry'
  | 'Transport'
  | 'Operational Cost'
  | 'Toll & Fuel'
  | 'Reimbursement'
  | 'Other';

export interface FinanceExpense {
  id: string;
  tourId: string;
  category: FinanceCategory;
  description: string;
  amount: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Paid' | 'Rejected';
  paymentStatus: 'Pending' | 'Paid' | 'Processing';
  requesterName: string;
  submissionDate: string;
  receiptUrl?: string;
}

export type BopStatus = 'Draft' | 'Submitted' | 'Approved' | 'Partially Paid' | 'Paid' | 'Reconciled';

export interface TourBopRecord {
  id: string;
  tourId: string;
  tourName: string;
  date: string;
  requestedAmount: number;
  approvedAmount: number;
  usedAmount: number;
  remainingAmount: number;
  status: BopStatus;
  transfer1: number;
  transfer2: number;
  reconciliationStatus: 'Pending' | 'Reconciled' | 'Discrepancy';
}

export interface OperationalReportSummary {
  period: string;
  totalBookings: number;
  totalTours: number;
  totalPax: number;
  departuresCompleted: number;
  arrivalsCompleted: number;
  handoverSuccessRate: number;
  onTimeDepartureRate: number;
  vehicleUtilizationRate: number;
  crewUtilizationRate: number;
  totalBillingRevenue: number;
  totalBopExpenses: number;
  netOperatingMargin: number;
  platformBreakdown: {
    getYourGuide: number;
    directOnline: number;
    directOffline: number;
  };
  topDestinations: { name: string; count: number }[];
}

export interface OperationalNotification {
  id: string;
  timestamp: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  category: 'handover' | 'maintenance' | 'booking' | 'crew' | 'finance';
  read: boolean;
  relatedId?: string;
}
