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
import { mockDriversData } from "@/data/mockDrivers";
import { DriverMaster, DriverAssignmentHistory } from "@/types/driver";
import {
  UserCheck,
  Phone,
  Mail,
  MapPin,
  FileText,
  Calendar,
  Clock,
  Ban,
  Edit,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  Truck,
  Award,
} from "lucide-react";

export default function DriverDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "drv-001";

  // Find driver by ID or fallback to first driver
  const driver = mockDriversData.find((d) => d.id === id) || mockDriversData[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [opStatus, setOpStatus] = useState(driver.operationalStatus);
  const [masterStatus, setMasterStatus] = useState(driver.masterStatus);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "assignment", label: "Assignment" },
    { id: "history", label: "History" },
  ];

  const handleDeactivate = () => {
    if (confirm(`Deactivate driver ${driver.fullName}?`)) {
      setMasterStatus("Inactive");
      setOpStatus("Inactive");
    }
  };

  return (
    <AppShell>
      <PageHeader
        title={driver.fullName}
        description={`Driver Code: ${driver.code} · ${driver.license.licenseType}`}
        breadcrumbItems={[
          { label: "Drivers", href: "/drivers" },
          { label: driver.code },
        ]}
      />

      {/* Driver Detail Header Banner */}
      <DetailHeader
        title={driver.fullName}
        code={driver.code}
        subtitle={`Driver · ${driver.region}`}
        status={opStatus}
        metrics={[
          { label: "License Type", value: driver.license.licenseType },
          { label: "Experience", value: `${driver.experienceYears} Years` },
          { label: "City Base", value: driver.city },
          { label: "License Status", value: driver.license.status },
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
              {masterStatus === "Inactive" ? "Deactivated" : "Deactivate Driver"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/drivers/new")}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Master Data
            </Button>
          </>
        }
      />

      {/* Operational Availability Summary Card */}
      <Card className="p-5 bg-gradient-to-r from-blue-50/50 via-indigo-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-blue-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              CURRENT AVAILABILITY SUMMARY (OPERATIONAL CONTEXT)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono font-semibold">
            Dispatcher Availability Status
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
              {driver.currentAssignment || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Next Scheduled Departure</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {driver.nextScheduleDate || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Assigned Vehicle</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block flex items-center gap-1">
              <Truck className="w-3 h-3 text-slate-400" />
              {driver.currentVehicle || "—"}
            </span>
          </div>
        </div>
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
                <UserCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Full Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{driver.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{driver.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{driver.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date of Birth</span>
                  <span className="text-slate-700 dark:text-slate-300">{driver.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">City Base</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{driver.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Operating Region</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{driver.region}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{driver.address}</span>
                </div>
              </div>
            </Card>

            {/* Section B: License Information & Expiry Visualization */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Driver License (SIM Credentials)
                </h3>
              </div>

              {/* SIM Expiry Alert Card */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                driver.license.status === "Valid"
                  ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60"
                  : driver.license.status === "Expiring Soon"
                  ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60"
                  : "bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60"
              }`}>
                <div className="flex items-center gap-3">
                  {driver.license.status === "Valid" ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      SIM Expiry Date: {driver.license.expiryDate}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {driver.license.status === "Valid"
                        ? "Driver license is active and verified for commercial dispatch."
                        : driver.license.status === "Expiring Soon"
                        ? "⚠ License expires within 30 days. Please submit renewal."
                        : "⛔ License EXPIRED. Driver cannot be assigned until renewed."}
                    </span>
                  </div>
                </div>
                <Badge variant={driver.license.status === "Valid" ? "emerald" : driver.license.status === "Expiring Soon" ? "warning" : "danger"}>
                  {driver.license.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">SIM License Number</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{driver.license.licenseNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">SIM License Type</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{driver.license.licenseType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Issued Date</span>
                  <span className="text-slate-700 dark:text-slate-300">{driver.license.issuedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Expiration Date</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{driver.license.expiryDate}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Experience & Qualification */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Award className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Experience & Specialization
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Driving Experience</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">{driver.experienceYears} Years</span>
              </div>
              <div>
                <span className="text-slate-400 block">Driving Specialization</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{driver.specialization}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Preferred Operational Corridor</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{driver.preferredRegion}</span>
              </div>
              {driver.notes && (
                <div className="md:col-span-3 pt-2">
                  <span className="text-slate-400 block text-[11px]">Operational Notes</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{driver.notes}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: SCHEDULE */}
      {activeTab === "schedule" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Driver Schedule Preview (August 2026)
            </h3>
            <span className="text-xs text-slate-400 font-medium">Availability Timeline</span>
          </div>

          <div className="space-y-3">
            {driver.schedules.length > 0 ? (
              driver.schedules.map((sch) => (
                <div key={sch.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50/50 dark:bg-[#162034]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex flex-col items-center justify-center font-bold font-mono shrink-0">
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
                description="No specific departure schedules assigned for the selected period. Driver remains available in the pool."
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
              Tour Assignment History & Current Deployment
            </h3>
          </div>

          {driver.assignments.length > 0 ? (
            <DataTable
              columns={[
                { key: "date", header: "Date", render: (r) => <span className="font-mono">{r.date}</span> },
                { key: "tourName", header: "Tour Assignment", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.tourName}</span> },
                { key: "vehicleAssigned", header: "Vehicle", render: (r) => <span className="font-mono text-slate-700 dark:text-slate-300">{r.vehicleAssigned}</span> },
                { key: "destination", header: "Destination", render: (r) => <span className="font-semibold text-slate-700 dark:text-slate-300">{r.destination}</span> },
                { key: "status", header: "Status", render: (r) => <Badge status={r.status === "Completed" ? "Available" : r.status === "In Progress" ? "On Trip" : "Assigned"}>{r.status}</Badge> },
              ]}
              data={driver.assignments}
              keyExtractor={(row) => row.id}
            />
          ) : (
            <EmptyState
              title="No active assignment"
              description="This driver has no active or past tour assignments recorded in this operational session."
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
              Driver Master Activity History
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {driver.activityHistory.map((act) => (
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
    </AppShell>
  );
}
