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
import { mockTourManagersData } from "@/data/mockTourManagers";
import { TourManagerMaster, TMAssignmentRecord } from "@/types/tourManager";
import {
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Ban,
  Edit,
  ArrowLeft,
  UserCheck,
  Truck,
  Compass,
  CheckCircle2,
} from "lucide-react";

export default function TourManagerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "tm-001";

  // Find tour manager by ID or fallback to first TM
  const tm = mockTourManagersData.find((t) => t.id === id) || mockTourManagersData[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [opStatus, setOpStatus] = useState(tm.operationalStatus);
  const [masterStatus, setMasterStatus] = useState(tm.masterStatus);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "assignment", label: "Assignment", count: tm.assignments.length },
    { id: "history", label: "History" },
  ];

  const handleDeactivate = () => {
    if (confirm(`Deactivate tour manager ${tm.fullName}?`)) {
      setMasterStatus("Inactive");
      setOpStatus("Inactive");
    }
  };

  const activeAssignment = tm.assignments.find(
    (a) => a.status === "In Progress" || a.status === "Assigned"
  );

  return (
    <AppShell>
      <PageHeader
        title={tm.fullName}
        description={`TM Code: ${tm.code} · ${tm.specialization}`}
        breadcrumbItems={[
          { label: "Tour Managers", href: "/tour-managers" },
          { label: tm.code },
        ]}
      />

      {/* TM Detail Header Banner */}
      <DetailHeader
        title={tm.fullName}
        code={tm.code}
        subtitle={`Tour Manager · ${tm.city} · ${tm.region}`}
        status={opStatus}
        metrics={[
          { label: "Specialization", value: tm.specialization },
          { label: "Experience", value: `${tm.experienceYears} Years` },
          { label: "Primary Zone", value: tm.primaryRegion },
          { label: "Active Tours", value: `${tm.activeAssignmentsCount} Active` },
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeactivate}
              disabled={masterStatus === "Inactive"}
              leftIcon={<Ban className="w-3.5 h-3.5 text-rose-500" />}
            >
              {masterStatus === "Inactive" ? "Deactivated" : "Deactivate TM"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/tour-managers/new")}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Master Data
            </Button>
          </>
        }
      />

      {/* Operational Availability Summary Card */}
      <Card className="p-5 bg-gradient-to-r from-purple-50/50 via-indigo-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-purple-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              CURRENT AVAILABILITY SUMMARY (OPERATIONAL CONTEXT)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono font-semibold">
            Dispatcher TM Availability
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Operational Status</span>
            <div className="mt-1">
              <Badge status={opStatus} />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Current Assignment</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block truncate">
              {tm.currentAssignment || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Next Scheduled Departure</span>
            <span className="font-bold text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {tm.nextScheduleDate || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Active Tour Count</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">
              {tm.activeAssignmentsCount} Tour Deployment
            </span>
          </div>
        </div>

        {/* Active Assignment Preview Card */}
        {activeAssignment && (
          <div className="mt-4 pt-3 border-t border-purple-200/60 dark:border-slate-800/80">
            <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-2">
              DEPLOYED ACTIVE TOUR CONTEXT
            </span>
            <div className="p-3 rounded-lg bg-white/80 dark:bg-[#162034]/80 border border-purple-200/80 dark:border-purple-900/40 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Tour Assignment</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{activeAssignment.tourName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Destination</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-500" />
                  {activeAssignment.destination}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Vehicle Allocated</span>
                <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{activeAssignment.vehicleAssigned}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Driver</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{activeAssignment.driverAssigned}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Guide</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{activeAssignment.guideAssigned}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Detail Navigation Tabs */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section A: Personal Information */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Full Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{tm.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{tm.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{tm.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">City Base</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{tm.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Home Region</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{tm.region}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{tm.address}</span>
                </div>
              </div>
            </Card>

            {/* Section B: TM Profile & Region Coverage */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  TM Profile & Operational Region
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Years of Experience</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{tm.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tour Specialization</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{tm.specialization}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Primary Operational Zone</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{tm.primaryRegion}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Additional Covered Operational Regions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tm.additionalRegions.map((reg) => (
                    <span
                      key={reg}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Master Status & Operational Notes */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Master Status & Notes
              </h3>
              <Badge variant={masterStatus === "Active" ? "emerald" : "slate"}>
                Master Record: {masterStatus}
              </Badge>
            </div>

            {tm.notes && (
              <div className="text-xs">
                <span className="text-slate-400 block">Operational Notes</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1">{tm.notes}</p>
              </div>
            )}
          </Card>

          {/* Section D: Activity History */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Tour Manager Master Activity History
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {tm.activityHistory.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
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
        </div>
      )}

      {/* TAB 2: SCHEDULE */}
      {activeTab === "schedule" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Tour Manager Schedule Preview (August 2026)
            </h3>
            <span className="text-xs text-slate-400 font-medium">Availability Timeline</span>
          </div>

          <div className="space-y-3">
            {tm.schedules.length > 0 ? (
              tm.schedules.map((sch) => (
                <div key={sch.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50/50 dark:bg-[#162034]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex flex-col items-center justify-center font-bold font-mono shrink-0">
                      <span className="text-[10px] uppercase">AUG</span>
                      <span className="text-xs">{sch.date.split("-")[2]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{sch.title}</span>
                      <span className="text-[11px] font-mono text-slate-400">{sch.timeWindow}</span>
                    </div>
                  </div>
                  <Badge status={sch.status} />
                </div>
              ))
            ) : (
              <EmptyState
                title="No upcoming schedule entries"
                description="No specific departure schedules assigned for the selected period. Tour Manager remains available in the pool."
              />
            )}
          </div>
        </Card>
      )}

      {/* TAB 3: ASSIGNMENT */}
      {activeTab === "assignment" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Tour Manager Deployment History & Active Assignments
            </h3>
          </div>

          {tm.assignments.length > 0 ? (
            <DataTable
              columns={[
                { key: "date", header: "Date", render: (r) => <span className="font-mono">{r.date}</span> },
                { key: "tourName", header: "Tour Assignment", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.tourName}</span> },
                { key: "destination", header: "Destination", render: (r) => <span className="font-semibold text-slate-700 dark:text-slate-300">{r.destination}</span> },
                { key: "vehicleAssigned", header: "Vehicle Allocated", render: (r) => <span className="font-mono text-slate-700 dark:text-slate-300">{r.vehicleAssigned}</span> },
                { key: "driverAssigned", header: "Driver", render: (r) => <span>{r.driverAssigned}</span> },
                { key: "guideAssigned", header: "Guide", render: (r) => <span>{r.guideAssigned}</span> },
                { key: "status", header: "Status", render: (r) => <Badge status={r.status === "Completed" ? "Available" : r.status === "In Progress" ? "On Tour" : "Assigned"}>{r.status}</Badge> },
              ]}
              data={tm.assignments}
              keyExtractor={(row) => row.id}
            />
          ) : (
            <EmptyState
              title="No active assignment"
              description="This Tour Manager has no active or past tour assignments recorded in this operational session."
            />
          )}
        </Card>
      )}

      {/* TAB 4: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Tour Manager Master Activity History
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {tm.activityHistory.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
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
    </AppShell>
  );
}
