"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { mockDeploymentsData } from "@/data/mockDeployments";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockDriversData } from "@/data/mockDrivers";
import { mockGuidesData } from "@/data/mockGuides";
import { mockTourManagersData } from "@/data/mockTourManagers";
import { mockHotelsData } from "@/data/mockHotels";
import { mockDestinationsData } from "@/data/mockDestinations";
import { DeploymentRecord, DeploymentStatus } from "@/types/dispatch";
import {
  Compass,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  FileText,
  Calendar,
  Ban,
  Edit,
  ArrowLeft,
  CheckCircle2,
  Truck,
  UserCheck,
  Briefcase,
  Hotel,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  Copy,
  Check,
  XCircle,
} from "lucide-react";

export default function DeploymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "tr-001";

  const [dep, setDep] = useState<DeploymentRecord>(() => {
    return mockDeploymentsData.find((d) => d.id === id) || mockDeploymentsData[0];
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Modal States
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [replaceResourceType, setReplaceResourceType] = useState<"Vehicle" | "Driver" | "Guide" | "TM">("Driver");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("Operational Change");

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateDate, setDuplicateDate] = useState("2026-08-25");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Selected master references
  const dest = mockDestinationsData.find((d) => d.id === dep.destinationId) || mockDestinationsData[0];
  const veh = mockVehiclesData.find((v) => v.id === dep.vehicleId) || mockVehiclesData[0];
  const drv = mockDriversData.find((d) => d.id === dep.driverId) || mockDriversData[0];
  const gde = mockGuidesData.find((g) => g.id === dep.guideId);
  const tm = mockTourManagersData.find((t) => t.id === dep.tourManagerId) || mockTourManagersData[0];
  const htl = mockHotelsData.find((h) => h.id === dep.hotelId);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "resources", label: "Assigned Resources" },
    { id: "schedule", label: "Schedule Timeline" },
    { id: "hotel", label: "Hotel Allocation" },
    { id: "cost", label: "Cost Reference" },
    { id: "history", label: "History" },
  ];

  // Lifecycle Status Handlers
  const handleMarkReady = () => {
    setDep((prev) => ({
      ...prev,
      status: "Ready",
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          title: "Deployment Marked Ready",
          description: "All required master resources verified with zero conflicts.",
          user: "Ops Dispatcher",
        },
        ...prev.activityHistory,
      ],
    }));
  };

  const handleConfirmDeployment = () => {
    setDep((prev) => ({
      ...prev,
      status: "Confirmed",
      confirmedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      confirmedBy: "Operations Admin",
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          title: "Deployment Confirmed",
          description: "Deployment officially confirmed by Head Operations Manager.",
          user: "Operations Admin",
        },
        ...prev.activityHistory,
      ],
    }));
    setShowConfirmModal(false);
  };

  const handleCancelDeployment = () => {
    setDep((prev) => ({
      ...prev,
      status: "Cancelled",
      cancelledAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      cancellationReason: cancellationReason,
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          title: "Deployment Cancelled",
          description: `Deployment cancelled. Reason: ${cancellationReason}`,
          user: "Ops Dispatcher",
        },
        ...prev.activityHistory,
      ],
    }));
    setShowCancelModal(false);
  };

  const handleDuplicateDeployment = () => {
    setShowDuplicateModal(false);
    alert(`Duplicated deployment ${dep.name} for ${duplicateDate} as Draft.`);
    router.push("/dispatch");
  };

  const handleReplaceResourceSubmit = (newId: string, newName: string) => {
    setShowReplaceModal(false);

    if (replaceResourceType === "Driver") {
      setDep((prev) => ({
        ...prev,
        driverId: newId,
        driverName: newName,
        activityHistory: [
          {
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            title: `Driver Replaced (${newName})`,
            description: `Replaced driver with ${newName}. Revalidated schedule availability.`,
            user: "Ops Dispatcher",
          },
          ...prev.activityHistory,
        ],
      }));
    } else if (replaceResourceType === "Vehicle") {
      setDep((prev) => ({
        ...prev,
        vehicleId: newId,
        vehicleName: newName,
        activityHistory: [
          {
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            title: `Vehicle Replaced (${newName})`,
            description: `Replaced vehicle with ${newName}. Revalidated capacity & 4WD rules.`,
            user: "Ops Dispatcher",
          },
          ...prev.activityHistory,
        ],
      }));
    }
  };

  return (
    <AppShell>
      <PageHeader
        title={dep.name}
        description={`Deployment Reference: ${dep.code} · ${dep.destinationName}`}
        breadcrumbItems={[
          { label: "Dispatcher", href: "/dispatch" },
          { label: dep.code },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dispatch")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Dispatcher
          </Button>
        }
      />

      {/* Blocking Conflict Alert Banner (If Applicable) */}
      {dep.conflicts.some((c) => c.severity === "Blocking") && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold text-rose-900 dark:text-rose-100 block">
                BLOCKING RESOURCE CONFLICT DETECTED
              </span>
              <span className="text-rose-700 dark:text-rose-300">
                {dep.conflicts.find((c) => c.severity === "Blocking")?.message}
              </span>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setReplaceResourceType("Driver");
              setShowReplaceModal(true);
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            Resolve Conflict
          </Button>
        </div>
      )}

      {/* Deployment Detail Header Banner */}
      <DetailHeader
        title={dep.name}
        code={dep.code}
        subtitle={`${dep.date} · ${dep.departureTime}–${dep.estimatedEndTime} · ${dep.destinationName}`}
        status={dep.status === "Ready" ? "Available" : dep.status === "Confirmed" ? "Assigned" : dep.status === "In Progress" ? "On Trip" : "Unavailable"}
        metrics={[
          { label: "Pax Count", value: `${dep.paxCount} Pax` },
          { label: "Vehicle Plate", value: dep.vehiclePlate },
          { label: "Driver", value: dep.driverName },
          { label: "Tour Manager", value: dep.tourManagerName },
        ]}
        actions={
          <>
            {dep.status === "Draft" && (
              <Button variant="primary" size="sm" onClick={handleMarkReady} leftIcon={<Check className="w-3.5 h-3.5" />}>
                Mark as Ready
              </Button>
            )}

            {dep.status === "Ready" && (
              <Button variant="primary" size="sm" onClick={() => setShowConfirmModal(true)} leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                Mark as Confirmed
              </Button>
            )}

            {dep.status === "Confirmed" && (
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Confirmed at {dep.confirmedAt} by {dep.confirmedBy}
              </span>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setReplaceResourceType("Driver");
                setShowReplaceModal(true);
              }}
              leftIcon={<RefreshCw className="w-3.5 h-3.5 text-blue-600" />}
            >
              Replace Resource
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDuplicateModal(true)}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Duplicate
            </Button>

            {dep.status !== "Cancelled" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelModal(true)}
                leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
              >
                Cancel Deployment
              </Button>
            )}
          </>
        }
      />

      {/* Assignment Readiness Checklist Section */}
      <Card className="p-5 bg-gradient-to-r from-blue-50/40 via-teal-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-blue-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              ASSIGNMENT READINESS VERIFICATION (AUTOMATED DISPATCH CHECK)
            </h2>
          </div>
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase ${
            dep.readinessChecklist.noConflicts ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-rose-100 text-rose-800"
          }`}>
            {dep.readinessChecklist.noConflicts ? "READY FOR OPERATION" : "ACTION REQUIRED"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Destination Assigned
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Vehicle Capacity Compatible
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Driver Schedule Verified
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Guide Rule Satisfied
          </div>
        </div>
      </Card>

      {/* Detail Navigation Tabs */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Section A: 6 Master Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Vehicle Card */}
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VEHICLE</span>
                <Badge variant="emerald">Assigned</Badge>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{veh.name}</p>
              <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{veh.licensePlate}</p>
              <p className="text-[11px] text-slate-500">Cap: {veh.passengerCapacity} Pax | Vendor: {veh.vendorName}</p>
              <div className="pt-2">
                <Link href={`/vehicles/${veh.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1">
                    <span>View Vehicle Master</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Driver Card */}
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DRIVER</span>
                <Badge status={drv.operationalStatus} />
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{drv.fullName}</p>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">{drv.license.licenseType}</p>
              <p className="text-[11px] text-slate-500">Exp: {drv.experienceYears} Years | {drv.city}</p>
              <div className="pt-2">
                <Link href={`/drivers/${drv.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1">
                    <span>View Driver Master</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Guide Card */}
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GUIDE</span>
                <Badge variant={gde ? "emerald" : "slate"}>{gde ? "Assigned" : "Not Required"}</Badge>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{gde ? gde.fullName : "No Guide Required"}</p>
              <p className="text-[11px] text-slate-500">{gde ? `Languages: ${gde.languages.join(", ")}` : "Self-guided destination"}</p>
              <div className="pt-2">
                {gde ? (
                  <Link href={`/guides/${gde.id}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1">
                      <span>View Guide Master</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled className="w-full text-xs h-7">
                    Guide Not Required
                  </Button>
                )}
              </div>
            </Card>

            {/* Tour Manager Card */}
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOUR MANAGER</span>
                <Badge variant="emerald">Assigned</Badge>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{tm.fullName}</p>
              <p className="text-[11px] text-slate-500">Spec: {tm.specialization} | Region: {tm.primaryRegion}</p>
              <div className="pt-2">
                <Link href={`/tour-managers/${tm.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1">
                    <span>View TM Master</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Hotel Card */}
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HOTEL</span>
                <Badge variant={htl ? "emerald" : "slate"}>{htl ? "Allocated" : "No Hotel"}</Badge>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{htl ? htl.name : "Day Trip (No Hotel)"}</p>
              <p className="text-[11px] text-slate-500">{htl ? `Rooms: ${dep.hotelRoomsAllocated || 6} Twin Rooms Allocated` : "Non-accommodation tour"}</p>
              <div className="pt-2">
                {htl ? (
                  <Link href={`/hotels/${htl.id}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1">
                      <span>View Hotel Master</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled className="w-full text-xs h-7">
                    No Hotel Required
                  </Button>
                )}
              </div>
            </Card>

            {/* Destination Card */}
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DESTINATION</span>
                <Badge variant="emerald">Assigned</Badge>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{dest.name}</p>
              <p className="text-[11px] text-slate-500">Location: {dest.city}, {dest.region} | Hours: {dest.operatingHoursText}</p>
              <div className="pt-2">
                <Link href={`/destinations/${dest.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1">
                    <span>View Destination Master</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Section B: Operational Notes & Summary */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Operational Notes for Crew
              </h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {dep.notes || "No operational notes provided."}
            </p>
          </Card>
        </div>
      )}

      {/* TAB 2: RESOURCES */}
      {activeTab === "resources" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Assigned Master Resources & Replacement Actions
            </h3>
          </div>

          <DataTable
            columns={[
              { key: "role", header: "Resource Role", render: (r: any) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.role}</span> },
              { key: "name", header: "Resource Name / Identifier", render: (r: any) => <span className="font-mono text-slate-800 dark:text-slate-200">{r.name}</span> },
              { key: "masterLink", header: "Master Reference", render: (r: any) => <Link href={r.href} className="text-blue-600 hover:underline flex items-center gap-1 text-xs">{r.code} <ExternalLink className="w-3 h-3" /></Link> },
              { key: "status", header: "Status", render: () => <Badge variant="emerald">Assigned</Badge> },
              {
                key: "action",
                header: "Action",
                render: (r: any) => (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[11px]"
                    onClick={() => {
                      setReplaceResourceType(r.role as any);
                      setShowReplaceModal(true);
                    }}
                  >
                    Replace
                  </Button>
                ),
              },
            ]}
            data={[
              { role: "Vehicle", name: `${veh.name} (${veh.licensePlate})`, code: veh.code, href: `/vehicles/${veh.id}` },
              { role: "Driver", name: drv.fullName, code: drv.code, href: `/drivers/${drv.id}` },
              { role: "Guide", name: gde ? gde.fullName : "Not Required", code: gde ? gde.code : "—", href: gde ? `/guides/${gde.id}` : "#" },
              { role: "Tour Manager", name: tm.fullName, code: tm.code, href: `/tour-managers/${tm.id}` },
            ]}
            keyExtractor={(r) => r.role}
          />
        </Card>
      )}

      {/* TAB 3: SCHEDULE */}
      {activeTab === "schedule" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Timeline Schedule
            </h3>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162034]">
              <span className="font-bold text-blue-600 dark:text-blue-400 w-16">{dep.departureTime} WIB</span>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Departure & Pick Up</span>
                <span className="text-[11px] text-slate-400">Boarding passengers & departure to {dest.name}.</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162034]">
              <span className="font-bold text-teal-600 dark:text-teal-400 w-16">04:00 WIB</span>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Arrival at Checkpoint</span>
                <span className="text-[11px] text-slate-400">Guide coordination and entry ticket verification.</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162034]">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 w-16">{dep.estimatedEndTime} WIB</span>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Return & Completion</span>
                <span className="text-[11px] text-slate-400">Return transit and passenger drop-off.</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 4: HOTEL */}
      {activeTab === "hotel" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Hotel Allocation Details
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Hotel Partner</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{dep.hotelName || "None"}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Rooms Allocated</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{dep.hotelRoomsAllocated || 0} Twin Rooms</span>
            </div>
            <div>
              <span className="text-slate-400 block">Status</span>
              <Badge variant="emerald">Confirmed</Badge>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 5: COST */}
      {activeTab === "cost" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Cost Estimate Reference
            </h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162034]">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Estimated Vehicle Rental Cost:</span>
            <span className="text-base font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
              Rp {dep.estimatedVehicleCost.toLocaleString("id-ID")}
            </span>
          </div>
        </Card>
      )}

      {/* TAB 6: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Deployment Activity Timeline Log
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {dep.activityHistory.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{act.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{act.description}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">Logged By: {act.user}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* MODAL 1: RESOURCE REPLACEMENT MODAL */}
      <Modal
        isOpen={showReplaceModal}
        onClose={() => setShowReplaceModal(false)}
        title={`Replace ${replaceResourceType}`}
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            Select a candidate replacement from Master Data. Systems will revalidate availability & requirements instantly.
          </p>

          {replaceResourceType === "Driver" && (
            <div className="space-y-2">
              {mockDriversData.map((d) => (
                <div
                  key={d.id}
                  onClick={() => handleReplaceResourceSubmit(d.id, d.fullName)}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{d.fullName} ({d.code})</span>
                    <span className="text-[11px] text-slate-400">License: {d.license.licenseType} | {d.city}</span>
                  </div>
                  <Badge status={d.operationalStatus} />
                </div>
              ))}
            </div>
          )}

          {replaceResourceType === "Vehicle" && (
            <div className="space-y-2">
              {mockVehiclesData.map((v) => (
                <div
                  key={v.id}
                  onClick={() => handleReplaceResourceSubmit(v.id, v.name)}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{v.name} ({v.licensePlate})</span>
                    <span className="text-[11px] text-slate-400">Capacity: {v.passengerCapacity} Pax</span>
                  </div>
                  <Badge status={v.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL 2: CANCEL DEPLOYMENT MODAL */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Deployment"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            Are you sure you want to cancel deployment <strong>{dep.name}</strong>? Please select a cancellation reason:
          </p>

          <FormField label="Cancellation Reason" required>
            <Select
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              options={[
                { value: "Operational Change", label: "Operational Change" },
                { value: "Vehicle Unavailable", label: "Vehicle Unavailable" },
                { value: "Customer Cancellation", label: "Customer Cancellation" },
                { value: "Weather / Nature Restriction", label: "Weather / Nature Restriction" },
                { value: "Other", label: "Other" },
              ]}
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowCancelModal(false)}>
              Back
            </Button>
            <Button variant="primary" onClick={handleCancelDeployment} className="bg-rose-600 hover:bg-rose-700 text-white">
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 3: DUPLICATE DEPLOYMENT MODAL */}
      <Modal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        title="Duplicate Deployment"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            Duplicate <strong>{dep.name}</strong> as a new Draft deployment for a different date:
          </p>

          <FormField label="New Deployment Date" required>
            <input
              type="date"
              required
              value={duplicateDate}
              onChange={(e) => setDuplicateDate(e.target.value)}
              className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowDuplicateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDuplicateDeployment}>
              Duplicate as Draft
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 4: CONFIRM DEPLOYMENT MODAL */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Deployment"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300">
            Confirm deployment <strong>{dep.name}</strong> for departure on <strong>{dep.date} ({dep.departureTime} WIB)</strong>?
          </p>

          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
            ✓ All 6 required master resources verified with zero blocking conflicts.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmDeployment}>
              Confirm Deployment
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
