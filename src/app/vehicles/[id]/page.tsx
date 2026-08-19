"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { mockVehiclesData } from "@/data/mockVehicles";
import { VehicleMaster, ChecklistRecord, FuelLogItem, MaintenanceRecord, VehicleCostItem, VehicleDocumentItem } from "@/types/vehicle";
import {
  Truck,
  UserCheck,
  Compass,
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
  Fuel,
  AlertTriangle,
  ExternalLink,
  Plus,
  Radio,
  CheckCircle2,
} from "lucide-react";

// Dynamic import for Leaflet map component (no SSR)
const MapTracking = dynamic(() => import("@/components/tracking/MapTracking"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-mono">
      <span>Loading Telemetry Map...</span>
    </div>
  ),
});

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "v-001";

  const initialVehicle = useMemo(() => {
    return mockVehiclesData.find((v) => v.id === id) || mockVehiclesData[0];
  }, [id]);

  const [vehicle, setVehicle] = useState<VehicleMaster>(initialVehicle);
  const [activeTab, setActiveTab] = useState("overview");

  // Modals state
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showFuelModal, setShowFuelModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // Form Fields
  const [checklistItems, setChecklistItems] = useState({
    engine: true,
    brakes: true,
    tires: true,
    lights: true,
    ac: true,
    safetyEquipment: true,
    documents: true,
  });
  const [checklistNote, setChecklistNote] = useState("");

  const [fuelOdometer, setFuelOdometer] = useState(vehicle.currentOdometerKm + 250);
  const [fuelLiters, setFuelLiters] = useState(50);
  const [fuelCost, setFuelCost] = useState(750000);
  const [fuelDriver, setFuelDriver] = useState(vehicle.currentAssignment?.driverName || "Agus Santoso");
  const [fuelNotes, setFuelNotes] = useState("");

  const [issueType, setIssueType] = useState("Brake inspection required");
  const [issueSeverity, setIssueSeverity] = useState("Medium");
  const [issueDesc, setIssueDesc] = useState("");

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "assignment", label: "Assignment & Calendar" },
    { id: "tracking", label: "Live Tracking" },
    { id: "checklist", label: `Checklist (${vehicle.checklists.length})` },
    { id: "fuel_logbook", label: `Fuel & Logbook (${vehicle.fuelRecords.length})` },
    { id: "maintenance", label: `Maintenance (${vehicle.maintenanceRecords.length})` },
    { id: "cost_history", label: "Cost History" },
    { id: "documents", label: `Documents (${vehicle.documents.length})` },
    { id: "history", label: `History (${vehicle.activityHistory.length})` },
  ];

  // Handle Save Checklist
  const handleSaveChecklist = () => {
    const passedCount = Object.values(checklistItems).filter(Boolean).length;
    const isPassed = passedCount === 7;

    const newChecklist: ChecklistRecord = {
      id: `chk-${Date.now()}`,
      date: "2026-08-21",
      type: "Pre-Trip Inspection",
      inspector: `${vehicle.currentAssignment?.driverName || "Agus Santoso"} (Driver)`,
      result: isPassed ? "Passed" : "Failed",
      passedItemsCount: passedCount,
      totalItemsCount: 7,
      items: checklistItems,
      notes: checklistNote || (isPassed ? "All 7 inspection points verified." : "Inspection failure detected."),
    };

    setVehicle((prev) => ({
      ...prev,
      checklists: [newChecklist, ...prev.checklists],
      status: isPassed ? prev.status : "Maintenance",
    }));

    setShowChecklistModal(false);
  };

  // Handle Save Fuel Log
  const handleSaveFuelLog = () => {
    const newFuel: FuelLogItem = {
      id: `fuel-${Date.now()}`,
      date: "2026-08-21",
      odometerKm: fuelOdometer,
      liters: fuelLiters,
      costRupiah: fuelCost,
      driverName: fuelDriver,
      notes: fuelNotes || "Routine operational refill.",
      referenceCode: `FUEL-${Date.now().toString().slice(-4)}`,
    };

    const newCost: VehicleCostItem = {
      id: `cst-${Date.now()}`,
      date: "2026-08-21",
      category: "Fuel",
      description: `Fuel Refill ${fuelLiters} L`,
      amountRupiah: fuelCost,
      referenceCode: newFuel.referenceCode || "FUEL-LOG",
    };

    setVehicle((prev) => ({
      ...prev,
      currentOdometerKm: fuelOdometer,
      lastOdometerUpdate: "2026-08-21 18:00",
      fuelRecords: [newFuel, ...prev.fuelRecords],
      costRecords: [newCost, ...prev.costRecords],
    }));

    setShowFuelModal(false);
  };

  return (
    <AppShell>
      <PageHeader
        title={`${vehicle.name} (${vehicle.licensePlate})`}
        description={`Vehicle Code: ${vehicle.code} · ${vehicle.vendorName} · ${vehicle.region}`}
        breadcrumbItems={[
          { label: "Resources", href: "/vehicles" },
          { label: "Vehicles", href: "/vehicles" },
          { label: vehicle.code },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowChecklistModal(true)}
            leftIcon={<CheckSquare className="w-3.5 h-3.5" />}
          >
            Start Checklist
          </Button>
        }
      />

      {/* Vehicle Detail Banner Header */}
      <DetailHeader
        title={vehicle.name}
        code={vehicle.code}
        subtitle={`${vehicle.vehicleType} · ${vehicle.brand} ${vehicle.model} (${vehicle.year}) · ${vehicle.fuelType} ${vehicle.transmission}`}
        status={vehicle.status as any}
        metrics={[
          { label: "License Plate", value: vehicle.licensePlate },
          { label: "Ownership / Vendor", value: `${vehicle.ownershipType} (${vehicle.vendorName})` },
          { label: "Passenger Capacity", value: `${vehicle.passengerCapacity} Pax` },
          { label: "Daily Rental Rate", value: `Rp ${vehicle.dailyRentalRate.toLocaleString("id-ID")}` },
        ]}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFuelModal(true)}
              className="bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-md shadow-2xs font-semibold"
              leftIcon={<Fuel className="w-3.5 h-3.5 text-white" />}
            >
              Add Fuel Log
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIssueModal(true)}
              className="bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-md shadow-2xs font-semibold"
              leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-amber-300" />}
            >
              Report Issue
            </Button>

            <Link href="/dispatch/tracking">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-md shadow-2xs font-semibold"
                leftIcon={<Compass className="w-3.5 h-3.5 text-white" />}
              >
                Track Vehicle
              </Button>
            </Link>
          </div>
        }
      />

      {/* CURRENT OPERATIONAL STATE BANNER */}
      <Card className="p-5 bg-slate-900 border-slate-800 text-white space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                CURRENT OPERATIONAL STATE
              </span>
              <h2 className="text-sm font-extrabold text-white">
                {vehicle.currentAssignment ? vehicle.currentAssignment.tripName : "Unassigned / Available in Fleet Pool"}
              </h2>
            </div>
          </div>
          <Badge variant={vehicle.status === "On Trip" ? "emerald" : vehicle.status === "Available" ? "blue" : "danger"}>
            ● {vehicle.status}
          </Badge>
        </div>

        {vehicle.currentAssignment ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">DESTINATION</span>
              <span className="font-bold text-white">{vehicle.currentAssignment.destinationName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">DRIVER</span>
              <span className="font-bold text-slate-200">{vehicle.currentAssignment.driverName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">TOUR MANAGER</span>
              <span className="font-bold text-slate-200">{vehicle.currentAssignment.tmName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">PAX CAPACITY</span>
              <span className="font-bold text-emerald-400">{vehicle.currentAssignment.paxCount} / {vehicle.passengerCapacity} Pax (OK)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">ACTION</span>
              <Link href={`/dispatch/trips/${vehicle.currentAssignment.tripId}`} className="text-blue-400 hover:underline font-bold flex items-center gap-1">
                View Trip <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-sans">
            This vehicle is currently available for dispatching in {vehicle.region}.
          </p>
        )}
      </Card>

      {/* TABS SELECTOR */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section A: Specifications */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Truck className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Vehicle Master Specifications
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
                  <span className="text-slate-400 block">Fuel & Transmission</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.fuelType} · {vehicle.transmission}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Manufacture Year</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.year}</span>
                </div>
              </div>
            </Card>

            {/* Section B: Ownership & Vendor */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Ownership & Vendor Partner
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Ownership Model</span>
                  <span className="font-bold text-blue-600">{vehicle.ownershipType} Vehicle</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Daily Rental Rate</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">Rp {vehicle.dailyRentalRate.toLocaleString("id-ID")}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vendor Partner</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{vehicle.vendorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vendor Contact</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{vehicle.vendorContact}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vendor Phone</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{vehicle.vendorPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Contract Status</span>
                  <Badge variant="emerald">{vehicle.vendorContractStatus}</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Compact Availability Timeline Calendar */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Vehicle Operational Availability Timeline
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Next 4 Days Schedule</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {vehicle.availabilitySchedule.map((day, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 bg-slate-50/50 dark:bg-[#162034]">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="font-bold">{day.label} ({day.date})</span>
                  </div>
                  <Badge variant={day.status === "On Trip" ? "emerald" : day.status === "Available" ? "blue" : "amber"}>
                    ● {day.status}
                  </Badge>
                  {day.tripName && (
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block truncate">{day.tripName}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: ASSIGNMENT */}
      {activeTab === "assignment" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Current & Upcoming Assignment Details
          </h3>
          {vehicle.currentAssignment ? (
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{vehicle.currentAssignment.tripName} ({vehicle.currentAssignment.tripCode})</span>
                <Badge variant="emerald">● {vehicle.currentAssignment.status}</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-slate-700 dark:text-slate-300">
                <div><span>Date:</span> <strong className="text-slate-900 dark:text-slate-100">{vehicle.currentAssignment.date}</strong></div>
                <div><span>Destination:</span> <strong className="text-slate-900 dark:text-slate-100">{vehicle.currentAssignment.destinationName}</strong></div>
                <div><span>Driver:</span> <strong className="text-slate-900 dark:text-slate-100">{vehicle.currentAssignment.driverName}</strong></div>
                <div><span>Tour Manager:</span> <strong className="text-slate-900 dark:text-slate-100">{vehicle.currentAssignment.tmName}</strong></div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No active operational assignment.</p>
          )}
        </Card>
      )}

      {/* TAB 3: TRACKING */}
      {activeTab === "tracking" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Live Vehicle Telemetry Map
            </h3>
            <Badge variant="emerald">GPS Online</Badge>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-700">
            <MapTracking
              vehicles={[
                {
                  id: vehicle.id,
                  vehicleId: vehicle.id,
                  vehiclePlate: vehicle.licensePlate,
                  vehicleName: vehicle.name,
                  driverId: "drv-001",
                  driverName: vehicle.currentAssignment?.driverName || "Agus Santoso",
                  status: vehicle.status === "On Trip" ? "Moving" : "Stopped",
                  lat: -7.98,
                  lng: 112.63,
                  speedKmH: vehicle.status === "On Trip" ? 42 : 0,
                  headingDegrees: 90,
                  destinationId: "dest-001",
                  destinationName: vehicle.currentAssignment?.destinationName || "Mount Bromo",
                  destinationLat: -7.94,
                  destinationLng: 112.95,
                  city: "Probolinggo",
                  routePoints: [
                    [-7.98, 112.63],
                    [-7.96, 112.75],
                    [-7.94, 112.95],
                  ],
                  lastUpdate: vehicle.lastOdometerUpdate,
                  deploymentId: "tr-001",
                  deploymentName: vehicle.currentAssignment?.tripName || "Bromo Tour",
                  eta: "17:42 WIB",
                  totalDistanceKm: 85,
                  distanceTraveledKm: 52,
                  distanceRemainingKm: 33,
                  region: vehicle.region,
                  history: [],
                },
              ]}
              selectedVehicleId={vehicle.id}
              onSelectVehicle={() => {}}
              isDarkTheme={true}
            />
          </div>
        </Card>
      )}

      {/* TAB 4: CHECKLIST */}
      {activeTab === "checklist" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Pre-Trip Vehicle Safety Inspection Log
            </h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowChecklistModal(true)}
              leftIcon={<CheckSquare className="w-3.5 h-3.5" />}
            >
              Start Inspection
            </Button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {vehicle.checklists.map((chk) => (
              <div key={chk.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{chk.type} · {chk.date}</span>
                  <Badge variant={chk.result === "Passed" ? "emerald" : "danger"}>
                    ● {chk.result} ({chk.passedItemsCount}/{chk.totalItemsCount} Passed)
                  </Badge>
                </div>
                <p className="text-slate-500 font-sans">{chk.notes}</p>
                <span className="text-[10px] text-slate-400 block">Inspector: {chk.inspector}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: FUEL & LOGBOOK */}
      {activeTab === "fuel_logbook" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Fuel Refill & Odometer Logbook
              </h3>
              <p className="text-xs text-slate-500">Current Odometer: <strong>{vehicle.currentOdometerKm.toLocaleString("id-ID")} km</strong></p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFuelModal(true)}
              leftIcon={<Fuel className="w-3.5 h-3.5 text-blue-600" />}
            >
              Add Fuel Log
            </Button>
          </div>

          <DataTable
            columns={[
              { key: "date", header: "Date", render: (r: FuelLogItem) => <span className="font-mono">{r.date}</span> },
              { key: "odometer", header: "Odometer", render: (r: FuelLogItem) => <span className="font-mono font-bold">{r.odometerKm.toLocaleString("id-ID")} km</span> },
              { key: "liters", header: "Fuel Quantity", render: (r: FuelLogItem) => <span className="font-bold text-blue-600">{r.liters} L</span> },
              { key: "cost", header: "Cost (Rp)", render: (r: FuelLogItem) => <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">Rp {r.costRupiah.toLocaleString("id-ID")}</span> },
              { key: "driver", header: "Driver", render: (r: FuelLogItem) => <span>{r.driverName}</span> },
              { key: "notes", header: "Notes", render: (r: FuelLogItem) => <span className="text-slate-500 text-xs">{r.notes}</span> },
            ]}
            data={vehicle.fuelRecords}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 6: MAINTENANCE */}
      {activeTab === "maintenance" && (
        <Card className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Next Maintenance Due: {vehicle.nextServiceDueDate} ({vehicle.nextServiceDueKm.toLocaleString("id-ID")} km)
            </span>
            <Badge variant="amber">Up to Date</Badge>
          </div>

          <DataTable
            columns={[
              { key: "date", header: "Date", render: (r: MaintenanceRecord) => <span className="font-mono">{r.date}</span> },
              { key: "type", header: "Service Type", render: (r: MaintenanceRecord) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.serviceType}</span> },
              { key: "vendor", header: "Workshop", render: (r: MaintenanceRecord) => <span>{r.vendorName}</span> },
              { key: "cost", header: "Cost (Rp)", render: (r: MaintenanceRecord) => <span className="font-mono font-bold">Rp {r.costRupiah.toLocaleString("id-ID")}</span> },
              { key: "status", header: "Status", render: (r: MaintenanceRecord) => <Badge variant={r.status === "Completed" ? "emerald" : "amber"}>{r.status}</Badge> },
            ]}
            data={vehicle.maintenanceRecords}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 7: COST HISTORY */}
      {activeTab === "cost_history" && (
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white">
              <span className="text-[10px] text-slate-400 block">TOTAL RENTAL COST</span>
              <span className="font-bold text-sm text-blue-400">Rp 1.700.000</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white">
              <span className="text-[10px] text-slate-400 block">TOTAL FUEL COST</span>
              <span className="font-bold text-sm text-blue-400">Rp 1.545.000</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white">
              <span className="text-[10px] text-slate-400 block">TOTAL MAINTENANCE</span>
              <span className="font-bold text-sm text-blue-400">Rp 1.700.000</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white">
              <span className="text-[10px] text-emerald-400 block">TOTAL OPERATIONAL EXPENSE</span>
              <span className="font-extrabold text-sm text-emerald-300">Rp 4.945.000</span>
            </div>
          </div>

          <DataTable
            columns={[
              { key: "date", header: "Date", render: (r: VehicleCostItem) => <span className="font-mono">{r.date}</span> },
              { key: "category", header: "Category", render: (r: VehicleCostItem) => <Badge variant="blue">{r.category}</Badge> },
              { key: "description", header: "Description", render: (r: VehicleCostItem) => <span>{r.description}</span> },
              { key: "amount", header: "Amount (Rp)", render: (r: VehicleCostItem) => <span className="font-mono font-bold">Rp {r.amountRupiah.toLocaleString("id-ID")}</span> },
              { key: "ref", header: "Reference", render: (r: VehicleCostItem) => <span className="font-mono text-xs text-blue-600">{r.referenceCode}</span> },
            ]}
            data={vehicle.costRecords}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 8: DOCUMENTS */}
      {activeTab === "documents" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Vehicle Documents & Expiration Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            {vehicle.documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                  <Badge variant={doc.status === "Valid" ? "emerald" : "amber"}>{doc.status}</Badge>
                </div>
                <p className="text-slate-500 font-sans text-xs">{doc.documentNumber}</p>
                <span className="text-[10px] text-slate-400 block">Valid Until: {doc.validUntil}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 9: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Complete Operational Activity History
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {vehicle.activityHistory.map((act) => (
              <div key={act.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">{act.event}</span>
                  <span className="text-slate-500 font-sans text-xs">{act.notes}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">{act.date} {act.time}</span>
                  <span className="text-blue-600 font-bold">{act.user}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* MODAL 1: START CHECKLIST INSPECTION */}
      <Modal isOpen={showChecklistModal} onClose={() => setShowChecklistModal(false)} title="Pre-Trip Inspection Checklist">
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            Verify 7 mechanical & safety checkpoints for <strong>{vehicle.name} ({vehicle.licensePlate})</strong>:
          </p>

          <div className="space-y-2 font-mono">
            {Object.keys(checklistItems).map((key) => (
              <label key={key} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer">
                <span className="capitalize font-bold text-slate-800 dark:text-slate-200">{key}</span>
                <input
                  type="checkbox"
                  checked={(checklistItems as any)[key]}
                  onChange={(e) => setChecklistItems({ ...checklistItems, [key]: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>
            ))}
          </div>

          <FormField label="Inspection Notes">
            <Textarea
              placeholder="Inspection observations or notes..."
              value={checklistNote}
              onChange={(e) => setChecklistNote(e.target.value)}
            />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowChecklistModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveChecklist}>
              Save Inspection
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: ADD FUEL LOG */}
      <Modal isOpen={showFuelModal} onClose={() => setShowFuelModal(false)} title="Add Fuel Refill Log">
        <div className="space-y-4 text-xs">
          <FormField label="Odometer Reading (km)">
            <Input
              type="number"
              value={fuelOdometer}
              onChange={(e) => setFuelOdometer(Number(e.target.value))}
            />
          </FormField>

          <FormField label="Fuel Quantity (Liters)">
            <Input
              type="number"
              value={fuelLiters}
              onChange={(e) => setFuelLiters(Number(e.target.value))}
            />
          </FormField>

          <FormField label="Fuel Cost (Rp)">
            <Input
              type="number"
              value={fuelCost}
              onChange={(e) => setFuelCost(Number(e.target.value))}
            />
          </FormField>

          <FormField label="Driver Name">
            <Input
              value={fuelDriver}
              onChange={(e) => setFuelDriver(e.target.value)}
            />
          </FormField>

          <FormField label="Notes">
            <Input
              placeholder="SPBU location / refuelling notes..."
              value={fuelNotes}
              onChange={(e) => setFuelNotes(e.target.value)}
            />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowFuelModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveFuelLog}>
              Save Fuel Log
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
