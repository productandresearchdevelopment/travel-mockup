"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockVehiclesData } from "@/data/mockVehicles";
import { VehicleMaster, VehicleFuelRecord, VehicleMaintenanceRecord } from "@/types/vehicle";
import {
  Truck,
  UserCheck,
  Compass,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  DollarSign,
  ShieldCheck,
  Wrench,
  Navigation,
  CheckSquare,
  Clock,
  Ban,
  Edit,
  ArrowLeft,
} from "lucide-react";

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "v-001";

  // Find vehicle by ID or fallback to first vehicle
  const vehicle = mockVehiclesData.find((v) => v.id === id) || mockVehiclesData[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [vehicleStatus, setVehicleStatus] = useState(vehicle.status);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "assignment", label: "Assignment" },
    { id: "tracking", label: "Tracking" },
    { id: "checklist", label: "Checklist" },
    { id: "fuel_logbook", label: "Fuel & Logbook" },
    { id: "maintenance", label: "Maintenance" },
    { id: "cost_history", label: "Cost History" },
  ];

  const handleDeactivate = () => {
    if (confirm(`Deactivate vehicle ${vehicle.name} (${vehicle.licensePlate})?`)) {
      setVehicleStatus("Inactive");
    }
  };

  return (
    <AppShell>
      <PageHeader
        title={vehicle.name}
        description={`Vehicle Code: ${vehicle.code} · License Plate: ${vehicle.licensePlate}`}
        breadcrumbItems={[
          { label: "Vehicles", href: "/vehicles" },
          { label: vehicle.code },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/vehicles")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Vehicles
          </Button>
        }
      />

      {/* Vehicle Detail Banner Header */}
      <DetailHeader
        title={vehicle.name}
        code={vehicle.code}
        subtitle={`${vehicle.vehicleType} · ${vehicle.brand} · ${vehicle.model} (${vehicle.year})`}
        status={vehicleStatus}
        metrics={[
          { label: "License Plate", value: vehicle.licensePlate },
          { label: "Vendor Partner", value: vehicle.vendorName },
          { label: "Passenger Capacity", value: `${vehicle.passengerCapacity} Pax` },
          { label: "Daily Rate", value: `Rp ${vehicle.rate.rateAmount.toLocaleString("id-ID")}` },
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeactivate}
              disabled={vehicleStatus === "Inactive"}
              leftIcon={<Ban className="w-3.5 h-3.5 text-rose-500" />}
            >
              {vehicleStatus === "Inactive" ? "Deactivated" : "Deactivate Vehicle"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/vehicles/new")}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Master Data
            </Button>
          </>
        }
      />

      {/* Operational Context Summary Card */}
      <Card className="p-5 bg-gradient-to-r from-blue-50/50 via-indigo-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-blue-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              CURRENT OPERATION SUMMARY (CONTEXTUAL STATE)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono font-semibold">
            Real-time Operational Context
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Operational Status</span>
            <div className="mt-1">
              <Badge status={vehicleStatus} />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Assigned Driver</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              {vehicle.operationalSummary.currentDriver || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Assigned Guide</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              {vehicle.operationalSummary.currentGuide || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Tour Manager (TM)</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              {vehicle.operationalSummary.currentTM || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Current Assignment</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block truncate max-w-[140px]">
              {vehicle.operationalSummary.currentAssignment || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Current Location</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {vehicle.operationalSummary.currentLocation || "Malang Hub"}
            </span>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section A: Vehicle Master Information */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Truck className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Vehicle Master Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Vehicle Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{vehicle.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">License Plate</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{vehicle.licensePlate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vehicle Type</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.vehicleType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Brand & Model</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.brand} {vehicle.model}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Manufacture Year</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Body Color</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.color}</span>
                </div>
              </div>
            </Card>

            {/* Section B: Capacity & Vendor */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Capacity & Vendor Ownership
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Passenger Capacity</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{vehicle.passengerCapacity} Passengers (Pax)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Luggage Capacity</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{vehicle.luggageCapacity} Standard Bags</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vendor Partner</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{vehicle.vendorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vendor Contact</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.vendorContact}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vendor Phone</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{vehicle.vendorPhone}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Rental / Rate (Fraud / Cost Control Data) */}
          <Card className="p-6 space-y-4 border-l-4 border-l-blue-600">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Rental & Contract Rate Data (Fraud & Cost Control)
                  </h3>
                  <p className="text-xs text-slate-400">Predefined rental rate used by Dispatcher to prevent manual price tampering</p>
                </div>
              </div>
              <Badge variant="emerald">Cost Control Active</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Rental Type</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{vehicle.rate.rentalType} Rental</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contract Rate Amount</span>
                <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                  Rp {vehicle.rate.rateAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Rate Unit</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.rate.rateUnit}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Effective Period</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {vehicle.rate.effectiveFrom} to {vehicle.rate.effectiveUntil}
                </span>
              </div>
            </div>
          </Card>

          {/* Section D: Vehicle Documents */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Vehicle Documents & Permits
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {vehicle.documents.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162034]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{doc.name}</span>
                    <Badge variant={doc.status === "Valid" ? "emerald" : "warning"}>{doc.status}</Badge>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">{doc.documentNumber}</div>
                  <div className="text-[10px] text-slate-400">Expiry Date: <span className="font-semibold">{doc.expiryDate}</span></div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section E: Lightweight Activity Log */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Vehicle Master Activity History
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {vehicle.activityHistory.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{act.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{act.description}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">By: {act.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: ASSIGNMENT */}
      {activeTab === "assignment" && (
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
            Operational Assignment Preview
          </h3>
          {vehicle.status === "On Trip" || vehicle.status === "Assigned" ? (
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-900 dark:text-blue-200">Active Assignment: {vehicle.currentAssignment}</span>
                <Badge status={vehicle.status} />
              </div>
              <p className="text-slate-600 dark:text-slate-400">Assigned Driver: {vehicle.operationalSummary.currentDriver}</p>
              <p className="text-slate-600 dark:text-slate-400">Assigned Guide: {vehicle.operationalSummary.currentGuide}</p>
              <p className="text-slate-600 dark:text-slate-400">Tour Manager: {vehicle.operationalSummary.currentTM}</p>
            </div>
          ) : (
            <EmptyState
              title="No active assignment"
              description="This vehicle is currently available in the master fleet pool. It will appear in the Dispatcher board for future operational assignment."
            />
          )}
        </Card>
      )}

      {/* TAB 3: TRACKING */}
      {activeTab === "tracking" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Live Vehicle Location Preview (GPS Concept)
            </h3>
            <Badge variant="emerald">GPS Signal Active</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Current Location</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{vehicle.operationalSummary.currentLocation}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Speed</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{vehicle.status === "On Trip" ? "42 km/h" : "0 km/h (Stationary)"}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Last Telemetry Update</span>
              <span className="font-mono text-slate-900 dark:text-slate-100">Just Now (2 min ago)</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">GPS Unit Hardware</span>
              <span className="font-mono text-slate-900 dark:text-slate-100">GPS-OBD2-9981</span>
            </div>
          </div>

          {/* Visual Map Placeholder */}
          <div className="h-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center text-center p-6 space-y-2">
            <Navigation className="w-10 h-10 text-blue-600 animate-bounce" />
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Live GPS Corridor Map Preview</p>
            <p className="text-[11px] text-slate-400 max-w-md">
              Current Zone: {vehicle.operationalSummary.currentLocation}. Live telemetry will stream vehicle coordinates during active deployment.
            </p>
          </div>
        </Card>
      )}

      {/* TAB 4: CHECKLIST */}
      {activeTab === "checklist" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Pre-Trip Vehicle Inspection Checklist
            </h3>
            <Button variant="outline" size="sm" leftIcon={<CheckSquare className="w-3.5 h-3.5" />}>
              Run New Inspection
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {vehicle.checklists.map((chk, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-900 dark:text-slate-100">{chk.item}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400">Checked: {chk.lastChecked}</span>
                  <Badge variant={chk.status === "Passed" ? "emerald" : chk.status === "Pending" ? "warning" : "danger"}>
                    {chk.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: FUEL & LOGBOOK */}
      {activeTab === "fuel_logbook" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Fuel & Odometer Logbook History
            </h3>
          </div>

          <DataTable
            columns={[
              { key: "date", header: "Date", render: (r) => <span className="font-mono">{r.date}</span> },
              { key: "fuelLiters", header: "Fuel (L)", render: (r) => <span className="font-bold text-blue-600">{r.fuelLiters} L</span> },
              { key: "odometerKm", header: "Odometer", render: (r) => <span className="font-mono">{r.odometerKm.toLocaleString("id-ID")} km</span> },
              { key: "driverName", header: "Driver", render: (r) => <span>{r.driverName}</span> },
              { key: "notes", header: "Notes", render: (r) => <span className="text-slate-500">{r.notes}</span> },
            ]}
            data={vehicle.fuelRecords}
            keyExtractor={(row) => row.id}
            emptyMessage="No fuel logbook records yet."
          />
        </Card>
      )}

      {/* TAB 6: MAINTENANCE */}
      {activeTab === "maintenance" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Maintenance & Workshop History
            </h3>
            <Button variant="outline" size="sm" leftIcon={<Wrench className="w-3.5 h-3.5" />}>
              Schedule Service
            </Button>
          </div>

          <DataTable
            columns={[
              { key: "date", header: "Service Date", render: (r) => <span className="font-mono">{r.date}</span> },
              { key: "serviceType", header: "Service Type", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.serviceType}</span> },
              { key: "workshop", header: "Workshop", render: (r) => <span>{r.workshop}</span> },
              { key: "costAmount", header: "Cost (Rp)", render: (r) => <span className="font-mono font-bold">Rp {r.costAmount.toLocaleString("id-ID")}</span> },
              { key: "nextServiceDate", header: "Next Due", render: (r) => <span className="font-mono text-slate-500">{r.nextServiceDate}</span> },
              { key: "status", header: "Status", render: (r) => <Badge status={r.status === "Completed" ? "Available" : "Maintenance"}>{r.status}</Badge> },
            ]}
            data={vehicle.maintenanceRecords}
            keyExtractor={(row) => row.id}
            emptyMessage="No maintenance records yet."
          />
        </Card>
      )}

      {/* TAB 7: COST HISTORY */}
      {activeTab === "cost_history" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Vehicle Operational Cost Summary Preview
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-slate-400 block text-[10px]">Rental Expense</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                Rp {(vehicle.rate.rateAmount * 2).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-slate-400 block text-[10px]">Fuel Expense</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                Rp 650.000
              </span>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-slate-400 block text-[10px]">Maintenance Expense</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                Rp {vehicle.maintenanceRecords.reduce((acc, m) => acc + m.costAmount, 0).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/40">
              <span className="text-blue-600 dark:text-blue-400 font-bold block text-[10px]">Total Tracked Cost</span>
              <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">
                Rp {(vehicle.rate.rateAmount * 2 + 650000 + vehicle.maintenanceRecords.reduce((acc, m) => acc + m.costAmount, 0)).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </Card>
      )}
    </AppShell>
  );
}
