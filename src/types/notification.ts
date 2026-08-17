export type NotificationSeverity = "Critical" | "Warning" | "Info" | "Success";

export type NotificationCategory =
  | "Trip"
  | "Vehicle"
  | "Assignment"
  | "Maintenance"
  | "Document"
  | "Checklist"
  | "Operational Issue"
  | "Resource";

export interface NotificationAction {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "danger";
}

export interface OperationalNotification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  severity: NotificationSeverity;
  timestamp: string;
  relativeTime: string;
  read: boolean;
  status: "Active" | "Acknowledged" | "Resolved";
  relatedType: "trip" | "vehicle" | "deployment" | "driver";
  relatedId: string;
  relatedCode: string;
  actions: NotificationAction[];
}
