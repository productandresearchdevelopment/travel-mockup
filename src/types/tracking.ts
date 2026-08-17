export type TrackingStatus = "Moving" | "Stopped" | "Idle" | "Offline" | "Maintenance";

export interface TrackingHistoryItem {
  timestamp: string;
  location: string;
  speedKmH: number;
  status: TrackingStatus;
}

export interface TrackingAlert {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  type: "Speed Warning" | "Long Stop" | "Offline";
  message: string;
  timestamp: string;
  severity: "High" | "Medium" | "Low";
}

export interface VehicleTelemetry {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  deploymentId: string;
  deploymentName: string;
  destinationId: string;
  destinationName: string;
  region: "East Java" | "Banyuwangi" | "Bali";
  city: string;
  lat: number;
  lng: number;
  speedKmH: number;
  headingDegrees: number;
  status: TrackingStatus;
  eta: string;
  distanceTraveledKm: number;
  distanceRemainingKm: number;
  totalDistanceKm: number;
  lastUpdate: string;
  routePoints: Array<[number, number]>;
  destinationLat: number;
  destinationLng: number;
  history: TrackingHistoryItem[];
}
