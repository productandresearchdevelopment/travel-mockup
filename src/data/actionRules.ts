import { UserRole } from "@/types/travelOps";

export interface ActionDefinition {
  id: string;
  label: string;
  allowedRoles: UserRole[];
  category: "booking" | "dispatch" | "tour" | "vehicle" | "crew" | "finance";
}

export const ACTION_DEFINITIONS: Record<string, ActionDefinition> = {
  // BOOKING ACTIONS
  "booking.view": {
    id: "booking.view",
    label: "View Booking Detail",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher"],
    category: "booking",
  },
  "booking.assignToTour": {
    id: "booking.assignToTour",
    label: "Assign to Tour",
    allowedRoles: ["operation_manager", "dispatcher"],
    category: "booking",
  },
  "booking.edit": {
    id: "booking.edit",
    label: "Edit Booking Info",
    allowedRoles: ["operation_manager", "dispatcher"],
    category: "booking",
  },
  "booking.cancel": {
    id: "booking.cancel",
    label: "Cancel Reservation",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher"],
    category: "booking",
  },

  // DISPATCH ACTIONS
  "dispatch.assignVehicle": {
    id: "dispatch.assignVehicle",
    label: "Assign Vehicle",
    allowedRoles: ["operation_manager", "dispatcher", "fleet"],
    category: "dispatch",
  },
  "dispatch.assignDriver": {
    id: "dispatch.assignDriver",
    label: "Assign Driver",
    allowedRoles: ["operation_manager", "dispatcher", "sdm"],
    category: "dispatch",
  },
  "dispatch.assignGuide": {
    id: "dispatch.assignGuide",
    label: "Assign Local Guide",
    allowedRoles: ["operation_manager", "dispatcher", "sdm"],
    category: "dispatch",
  },
  "dispatch.assignTM": {
    id: "dispatch.assignTM",
    label: "Assign Tour Manager",
    allowedRoles: ["operation_manager", "dispatcher", "sdm"],
    category: "dispatch",
  },
  "dispatch.createManifest": {
    id: "dispatch.createManifest",
    label: "Generate Passenger Manifest",
    allowedRoles: ["operation_manager", "dispatcher"],
    category: "dispatch",
  },
  "dispatch.markReady": {
    id: "dispatch.markReady",
    label: "Mark Deployment Ready",
    allowedRoles: ["operation_manager", "dispatcher"],
    category: "dispatch",
  },
  "dispatch.dispatch": {
    id: "dispatch.dispatch",
    label: "Dispatch Tour Departure",
    allowedRoles: ["operation_manager", "dispatcher", "business_manager"],
    category: "dispatch",
  },

  // TOUR ACTIONS
  "tour.view": {
    id: "tour.view",
    label: "View Operational Picture",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher", "fleet", "sdm"],
    category: "tour",
  },
  "tour.confirmDeparture": {
    id: "tour.confirmDeparture",
    label: "Confirm Departure",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher"],
    category: "tour",
  },
  "tour.confirmArrival": {
    id: "tour.confirmArrival",
    label: "Confirm Arrival",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "tour",
  },
  "tour.startHandover": {
    id: "tour.startHandover",
    label: "Initiate Regional Handover",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher"],
    category: "tour",
  },
  "tour.confirmHandover": {
    id: "tour.confirmHandover",
    label: "Confirm Inter-Region Handover",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "tour",
  },
  "tour.completeTour": {
    id: "tour.completeTour",
    label: "Complete & Close Tour",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "tour",
  },
  "tour.reportIssue": {
    id: "tour.reportIssue",
    label: "Report Operational Issue",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher", "fleet", "sdm"],
    category: "tour",
  },

  // VEHICLE ACTIONS
  "vehicle.view": {
    id: "vehicle.view",
    label: "View Vehicle Profile",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher", "fleet"],
    category: "vehicle",
  },
  "vehicle.assign": {
    id: "vehicle.assign",
    label: "Assign to Excursion",
    allowedRoles: ["operation_manager", "dispatcher", "fleet"],
    category: "vehicle",
  },
  "vehicle.checklist": {
    id: "vehicle.checklist",
    label: "Log Pre-Trip Safety Checklist",
    allowedRoles: ["operation_manager", "dispatcher", "fleet"],
    category: "vehicle",
  },
  "vehicle.reportIssue": {
    id: "vehicle.reportIssue",
    label: "Report Mechanical Problem",
    allowedRoles: ["operation_manager", "fleet"],
    category: "vehicle",
  },
  "vehicle.sendToMaintenance": {
    id: "vehicle.sendToMaintenance",
    label: "Send to Workshop Maintenance",
    allowedRoles: ["operation_manager", "fleet"],
    category: "vehicle",
  },
  "vehicle.completeMaintenance": {
    id: "vehicle.completeMaintenance",
    label: "Complete Workshop Maintenance",
    allowedRoles: ["operation_manager", "fleet"],
    category: "vehicle",
  },
  "vehicle.markReady": {
    id: "vehicle.markReady",
    label: "Mark Available / Ready",
    allowedRoles: ["operation_manager", "fleet"],
    category: "vehicle",
  },

  // CREW ACTIONS
  "crew.view": {
    id: "crew.view",
    label: "View Crew Profile",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher", "sdm"],
    category: "crew",
  },
  "crew.assign": {
    id: "crew.assign",
    label: "Assign to Tour Roster",
    allowedRoles: ["operation_manager", "dispatcher", "sdm"],
    category: "crew",
  },
  "crew.markAvailable": {
    id: "crew.markAvailable",
    label: "Set Status Available",
    allowedRoles: ["operation_manager", "sdm"],
    category: "crew",
  },
  "crew.markUnavailable": {
    id: "crew.markUnavailable",
    label: "Set Status Off-Duty",
    allowedRoles: ["operation_manager", "sdm"],
    category: "crew",
  },

  // FINANCE ACTIONS
  "finance.view": {
    id: "finance.view",
    label: "View Financial Records",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "finance",
  },
  "finance.submit": {
    id: "finance.submit",
    label: "Submit BOP / Reimbursement",
    allowedRoles: ["operation_manager", "business_manager", "dispatcher", "fleet", "sdm"],
    category: "finance",
  },
  "finance.approve": {
    id: "finance.approve",
    label: "Approve Disbursal",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "finance",
  },
  "finance.markPaid": {
    id: "finance.markPaid",
    label: "Confirm Disbursal Transfer",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "finance",
  },
  "finance.reconcile": {
    id: "finance.reconcile",
    label: "Reconcile Tour Expense Sheet",
    allowedRoles: ["operation_manager", "business_manager"],
    category: "finance",
  },
};

export const canPerformAction = (role: UserRole | undefined, actionId: string): boolean => {
  if (!role) return false;
  const action = ACTION_DEFINITIONS[actionId];
  if (!action) return false;
  return action.allowedRoles.includes(role);
};
