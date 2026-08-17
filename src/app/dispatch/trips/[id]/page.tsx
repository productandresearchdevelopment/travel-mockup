"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { mockTripsData } from "@/data/mockTripsData";
import { TripRecord, TripCheckpoint, TripIssue, AuditTrailItem } from "@/types/trip";
import {
  PlaySquare,
  Clock,
  MapPin,
  Truck,
  User,
  Users,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Play,
  Check,
  Plus,
  ExternalLink,
  RotateCcw,
  FileText,
  History,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const initialTrip = useMemo(() => {
    return mockTripsData.find((t) => t.id === tripId) || mockTripsData[0];
  }, [tripId]);

  const [trip, setTrip] = useState<TripRecord>(initialTrip);
  const [activeTab, setActiveTab] = useState("overview");

  // Audit Trail Filter
  const [auditFilter, setAuditFilter] = useState<string>("All");

  // Modals state
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showCheckpointModal, setShowCheckpointModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<TripCheckpoint | null>(null);

  // Form Fields
  const [issueType, setIssueType] = useState<TripIssue["type"]>("Other");
  const [issueSeverity, setIssueSeverity] = useState<TripIssue["severity"]>("Medium");
  const [issueDescription, setIssueDescription] = useState("");
  const [delayReason, setDelayReason] = useState("");
  const [checkpointNote, setCheckpointNote] = useState("");
  const [newNote, setNewNote] = useState("");

  // Handle Complete Trip
  const handleCompleteTrip = () => {
    setTrip((prev) => ({
      ...prev,
      status: "Completed",
      completedAt: "2026-08-21 17:42",
      plannedDuration: "14h 00m",
      actualDuration: "14h 42m",
      scheduleVariance: "+42 min",
      performanceStatus: "Completed with Delay",
      resourceReleaseStatus: "Released / Available",
      progressPercent: 100,
      currentCheckpoint: "Malang Completion (Finished)",
      history: [
        {
          id: `h-${Date.now()}`,
          timestamp: "17:42",
          title: "Trip Completed",
          description: "Trip marked as Completed. Resources released to Available pool.",
          user: "Sinta Wijaya",
          category: "Trip Events",
        },
        ...prev.history,
      ],
      auditTrail: [
        {
          id: `aud-${Date.now()}`,
          timestamp: "17:42",
          activity: "Trip Completed",
          category: "Trip Events",
          user: "Sinta Wijaya",
          notes: "Trip completed with 6/6 checkpoints verified. Resources released.",
          status: "Success",
        },
        ...(prev.auditTrail || []),
      ],
    }));
    setShowCompleteModal(false);
  };

  // Filtered Audit Trail
  const filteredAuditTrail = useMemo(() => {
    if (!trip.auditTrail) return [];
    if (auditFilter === "All") return trip.auditTrail;
    return trip.auditTrail.filter((item) => item.category === auditFilter);
  }, [trip.auditTrail, auditFilter]);

  // Validation Checks for Completion
  const completedCheckpointsCount = trip.checkpoints.filter((c) => c.status === "Completed").length;
  const totalCheckpointsCount = trip.checkpoints.length;
  const openIssuesCount = trip.issues.filter((i) => i.status === "Open").length;
  const resolvedIssuesCount = trip.issues.filter((i) => i.status === "Resolved").length;

  const isReadyToComplete = totalCheckpointsCount > 0 && openIssuesCount === 0;

  return (
    <AppShell>
      {/* HEADER SECTION */}
      <DetailHeader
        title={trip.name}
        code={trip.code}
        subtitle={`${trip.destinationName} (${trip.region}) — Planned: ${trip.departureTime} - ${trip.estimatedEndTime}`}
        status={trip.status as any}
        metrics={[
          { label: "Pax Count", value: `${trip.paxCount} Pax` },
          { label: "Assigned Vehicle", value: trip.vehiclePlate },
          { label: "Driver", value: trip.driverName },
          { label: "Tour Manager", value: trip.tourManagerName },
        ]}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {trip.status !== "Completed" && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCompleteModal(true)}
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  className="bg-emerald-600 hover:bg-emerald-700 border-emerald-500"
                >
                  Complete Trip
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowIssueModal(true)}
                  leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                >
                  Report Issue
                </Button>
              </>
            )}

            <Link href="/dispatch/tracking">
              <Button variant="outline" size="sm" leftIcon={<Compass className="w-3.5 h-3.5 text-blue-600" />}>
                Track Vehicle
              </Button>
            </Link>

            <Link href={`/dispatch/${trip.deploymentId}`}>
              <Button variant="outline" size="sm" leftIcon={<ExternalLink className="w-3.5 h-3.5 text-slate-500" />}>
                Deployment Ref
              </Button>
            </Link>
          </div>
        }
      />

      {/* COMPLETED TRIP SUMMARY BANNER (Visually Prominent when Completed) */}
      {trip.status === "Completed" && (
        <Card className="p-5 border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 text-white space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  OFFICIALLY COMPLETED & STORED IN HISTORY
                </span>
                <h2 className="text-base font-extrabold text-white">
                  {trip.name} ({trip.code})
                </h2>
                <span className="text-xs text-slate-300">
                  Completed on {trip.completedAt || "2026-08-21 17:42 WIB"}
                </span>
              </div>
            </div>

            <Badge variant={trip.performanceStatus === "On Schedule" ? "emerald" : "amber"}>
              ● {trip.performanceStatus || "Completed"} ({trip.scheduleVariance || "+0 min"})
            </Badge>
          </div>

          {/* Operational Performance & Duration Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">PLANNED DURATION</span>
              <span className="font-bold text-sm text-slate-200">{trip.plannedDuration || "14h 00m"}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">ACTUAL DURATION</span>
              <span className="font-bold text-sm text-emerald-400">{trip.actualDuration || "14h 42m"}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">CHECKPOINTS</span>
              <span className="font-bold text-sm text-emerald-400">
                {completedCheckpointsCount} / {totalCheckpointsCount} Done
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">ISSUES HANDLED</span>
              <span className="font-bold text-sm text-slate-200">
                {resolvedIssuesCount} Resolved / {trip.issues.length} Total
              </span>
            </div>
          </div>

          {/* Resource Lifecycle Release Status Card */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span>
                Resource Availability Status: <strong>RELEASED TO AVAILABLE POOL</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-300">
              <span>Vehicle ({trip.vehiclePlate}): <strong className="text-emerald-400">Available</strong></span>
              <span>Driver ({trip.driverName}): <strong className="text-emerald-400">Available</strong></span>
            </div>
          </div>
        </Card>
      )}

      {/* OPERATIONAL DETAIL TABS */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "timeline", label: `Checkpoints (${completedCheckpointsCount}/${totalCheckpointsCount})` },
          { id: "resources", label: "Assigned Resources" },
          { id: "issues", label: `Issues (${trip.issues.length})` },
          { id: "history", label: `Audit Trail & History (${trip.history.length})` },
        ]}
      />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top Progress & Metrics Card */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  TRIP EXECUTION PROGRESS
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  {trip.progressPercent}% Completed
                </h3>
              </div>
              <Badge variant={trip.status === "Completed" ? "emerald" : "blue"}>
                Current: {trip.currentCheckpoint}
              </Badge>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${trip.progressPercent}%` }} />
            </div>
          </Card>

          {/* 6 Assigned Master Resource Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-bold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" /> VEHICLE
                </span>
                <Link href={`/vehicles/${trip.vehicleId}`} className="text-blue-600 hover:underline">
                  Master →
                </Link>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{trip.vehicleName}</h4>
              <span className="font-mono text-xs font-bold text-blue-600 block">{trip.vehiclePlate}</span>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                Status: {trip.resourceReleaseStatus || "On Trip"}
              </span>
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-bold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" /> DRIVER
                </span>
                <Link href={`/drivers/${trip.driverId}`} className="text-blue-600 hover:underline">
                  Master →
                </Link>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{trip.driverName}</h4>
              <span className="text-xs text-slate-500 block">Primary Operational Driver</span>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                Status: {trip.resourceReleaseStatus || "On Trip"}
              </span>
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-bold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-teal-600" /> TOUR MANAGER
                </span>
                <Link href={`/tour-managers/${trip.tourManagerId}`} className="text-blue-600 hover:underline">
                  Master →
                </Link>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{trip.tourManagerName}</h4>
              <span className="text-xs text-slate-500 block">Lead Operational Manager</span>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                Status: {trip.resourceReleaseStatus || "On Trip"}
              </span>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: TIMELINE / CHECKPOINTS */}
      {activeTab === "timeline" && (
        <Card className="p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Checkpoint Schedule & Execution</h3>
          <div className="space-y-3 font-mono text-xs">
            {trip.checkpoints.map((cp) => (
              <div key={cp.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#162034]">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{cp.name}</h4>
                  <span className="text-slate-500">
                    Scheduled: {cp.scheduledTime} {cp.actualTime && `· Actual: ${cp.actualTime}`}
                  </span>
                  {cp.notes && <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans mt-0.5">{cp.notes}</p>}
                </div>
                <Badge variant={cp.status === "Completed" ? "emerald" : "slate"}>
                  ✓ {cp.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: ASSIGNED RESOURCES */}
      {activeTab === "resources" && (
        <Card className="p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Assigned Operational Master Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">VEHICLE RESOURCE</span>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{trip.vehicleName} ({trip.vehiclePlate})</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">DRIVER RESOURCE</span>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{trip.driverName}</span>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 4: ISSUES */}
      {activeTab === "issues" && (
        <Card className="p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Operational Issues & Resolution</h3>
          {trip.issues.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No operational issues recorded for this trip.</p>
          ) : (
            trip.issues.map((iss) => (
              <div key={iss.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{iss.type} ({iss.severity} Severity)</span>
                  <Badge variant={iss.status === "Open" ? "danger" : "emerald"}>{iss.status}</Badge>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{iss.description}</p>
                {iss.resolutionNote && (
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Resolution Note: {iss.resolutionNote}
                  </p>
                )}
              </div>
            ))
          )}
        </Card>
      )}

      {/* TAB 5: AUDIT TRAIL & HISTORY */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {/* Audit Category Filter Bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Category Filter:</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {["All", "Trip Events", "Checkpoints", "Issues", "Status Changes"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAuditFilter(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    auditFilter === cat
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Structured Audit Trail Table */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Operational Audit Trail & Activity Log
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {filteredAuditTrail.length} Records Found
              </span>
            </div>

            <div className="overflow-x-auto font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-[#162034] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Time</th>
                    <th className="p-3">Activity</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">User / Performed By</th>
                    <th className="p-3">Notes / Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAuditTrail.map((aud) => (
                    <tr key={aud.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 text-slate-400 font-bold">{aud.timestamp}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{aud.activity}</td>
                      <td className="p-3 text-slate-500">{aud.category}</td>
                      <td className="p-3">
                        <Badge variant={aud.status === "Success" ? "emerald" : aud.status === "Resolved" ? "blue" : "amber"}>
                          {aud.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">{aud.user}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">{aud.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: COMPLETE TRIP CONFIRMATION & VALIDATION */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title={`Complete Trip? — ${trip.name}`}
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-400">
            Are you sure you want to mark <strong>{trip.name} ({trip.code})</strong> as completed?
          </p>

          {/* Validation Checklist Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#162034] border border-slate-200 dark:border-slate-800 space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Checkpoints Completed:</span>
              <span className="font-bold text-emerald-600">{completedCheckpointsCount} / {totalCheckpointsCount} ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Operational Issues:</span>
              <span className="font-bold text-emerald-600">{openIssuesCount === 0 ? "All Issues Resolved ✓" : `${openIssuesCount} Open Issues ⚠`}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Vehicle Assignment:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{trip.vehiclePlate} ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Driver Assignment:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{trip.driverName} ✓</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300">
            <span className="font-bold block">✓ Ready to Complete</span>
            Completing this trip will release assigned vehicle <strong>{trip.vehiclePlate}</strong> and driver <strong>{trip.driverName}</strong> back to the Available resource pool.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCompleteModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 border-emerald-500" onClick={handleCompleteTrip}>
              Confirm Complete Trip
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL: REPORT ISSUE */}
      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)} title="Report Operational Issue">
        <div className="space-y-4 text-xs">
          <FormField label="Issue Type">
            <Select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as TripIssue["type"])}
              options={[
                { value: "Destination", label: "Destination Delay / Access" },
                { value: "Vehicle", label: "Vehicle Breakdown / Issue" },
                { value: "Driver", label: "Driver Health / Absence" },
                { value: "Passenger", label: "Passenger Delay" },
                { value: "Other", label: "Other" },
              ]}
            />
          </FormField>

          <FormField label="Description">
            <Textarea
              placeholder="Describe the operational delay or issue..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
            />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowIssueModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const newIss: TripIssue = {
                  id: `iss-${Date.now()}`,
                  type: issueType,
                  severity: issueSeverity,
                  description: issueDescription || "Operational issue reported.",
                  reportedTime: "10:15",
                  reportedBy: "Sinta Wijaya",
                  status: "Open",
                };
                setTrip((prev) => ({
                  ...prev,
                  issues: [newIss, ...prev.issues],
                }));
                setShowIssueModal(false);
              }}
            >
              Report Issue
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
