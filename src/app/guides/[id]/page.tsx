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
import { mockGuidesData } from "@/data/mockGuides";
import { GuideMaster, DestinationExperience } from "@/types/guide";
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  FileText,
  Calendar,
  Clock,
  Ban,
  Edit,
  ArrowLeft,
  Globe,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function GuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "g-001";

  // Find guide by ID or fallback to first guide
  const guide = mockGuidesData.find((g) => g.id === id) || mockGuidesData[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [opStatus, setOpStatus] = useState(guide.operationalStatus);
  const [masterStatus, setMasterStatus] = useState(guide.masterStatus);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "destinations", label: "Destinations", count: guide.destinationExperiences.length },
    { id: "schedule", label: "Schedule" },
    { id: "assignment", label: "Assignment" },
    { id: "history", label: "History" },
  ];

  const handleDeactivate = () => {
    if (confirm(`Deactivate guide ${guide.fullName}?`)) {
      setMasterStatus("Inactive");
      setOpStatus("Inactive");
    }
  };

  return (
    <AppShell>
      <PageHeader
        title={guide.fullName}
        description={`Guide Code: ${guide.code} · ${guide.guideType}`}
        breadcrumbItems={[
          { label: "Guides", href: "/guides" },
          { label: guide.code },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/guides")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Guides
          </Button>
        }
      />

      {/* Guide Detail Header Banner */}
      <DetailHeader
        title={guide.fullName}
        code={guide.code}
        subtitle={`Guide · ${guide.city} · ${guide.region}`}
        status={opStatus}
        metrics={[
          { label: "Guide Type", value: guide.guideType },
          { label: "Experience", value: `${guide.experienceYears} Years` },
          { label: "Languages", value: guide.languages.join(", ") },
          { label: "Top Destination", value: guide.destinationExperiences[0]?.destinationName || "—" },
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
              {masterStatus === "Inactive" ? "Deactivated" : "Deactivate Guide"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/guides/new")}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Master Data
            </Button>
          </>
        }
      />

      {/* Operational Availability Summary Card */}
      <Card className="p-5 bg-gradient-to-r from-emerald-50/50 via-teal-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-emerald-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              CURRENT AVAILABILITY SUMMARY (OPERATIONAL CONTEXT)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono font-semibold">
            Dispatcher Guide Availability
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
              {guide.currentAssignment || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Next Scheduled Departure</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {guide.nextScheduleDate || "—"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Current Destination</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {guide.currentDestination || "—"}
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
                <Compass className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Full Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{guide.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{guide.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{guide.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">City Base</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{guide.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Operating Region</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{guide.region}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{guide.address}</span>
                </div>
              </div>
            </Card>

            {/* Section B: Profile & Languages */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Globe className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Guide Profile & Languages
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Years of Experience</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{guide.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Guide Classification</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{guide.guideType}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Specialization</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{guide.specialization}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Language Capabilities (Supported Tour Languages)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {guide.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Certification & Master Status */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                HPI Certification & Documents
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guide.documents.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162034]/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">{doc.name}</span>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{doc.documentNumber}</span>
                    <span className="text-[10px] text-slate-400">Expiry: {doc.expiryDate}</span>
                  </div>
                  <Badge variant={doc.status === "Valid" ? "emerald" : "warning"}>{doc.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Section D: Activity History */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Guide Master Activity History
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {guide.activityHistory.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
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

      {/* TAB 2: DESTINATIONS */}
      {activeTab === "destinations" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Destination Expertise & Completed Tour Experience
              </h3>
              <p className="text-xs text-slate-400">Used by Dispatcher to match guides with target tour destinations</p>
            </div>
          </div>

          <DataTable
            columns={[
              {
                key: "destinationName",
                header: "Destination",
                render: (d) => (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900 dark:text-slate-100">{d.destinationName}</span>
                  </div>
                ),
              },
              {
                key: "level",
                header: "Expertise Rating Level",
                render: (d) => (
                  <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                    d.level === "Expert"
                      ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800"
                      : d.level === "Advanced"
                      ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                  }`}>
                    {d.level}
                  </span>
                ),
              },
              {
                key: "tripsCount",
                header: "Historical Completed Trips",
                render: (d) => (
                  <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">
                    {d.tripsCount} Trips Handled
                  </span>
                ),
              },
            ]}
            data={guide.destinationExperiences}
            keyExtractor={(row) => row.id}
            emptyMessage="No destination experience added yet."
          />
        </Card>
      )}

      {/* TAB 3: SCHEDULE */}
      {activeTab === "schedule" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Guide Schedule Preview (August 2026)
            </h3>
            <span className="text-xs text-slate-400 font-medium">Availability Timeline</span>
          </div>

          <div className="space-y-3">
            {guide.schedules.length > 0 ? (
              guide.schedules.map((sch) => (
                <div key={sch.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50/50 dark:bg-[#162034]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex flex-col items-center justify-center font-bold font-mono shrink-0">
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
                description="No specific departure schedules assigned for the selected period. Guide remains available in the pool."
              />
            )}
          </div>
        </Card>
      )}

      {/* TAB 4: ASSIGNMENT */}
      {activeTab === "assignment" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Tour Assignment History & Current Deployment
            </h3>
          </div>

          {guide.assignments.length > 0 ? (
            <DataTable
              columns={[
                { key: "date", header: "Date", render: (r) => <span className="font-mono">{r.date}</span> },
                { key: "tourName", header: "Tour Assignment", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.tourName}</span> },
                { key: "destination", header: "Destination", render: (r) => <span className="font-semibold text-slate-700 dark:text-slate-300">{r.destination}</span> },
                { key: "vehicleAssigned", header: "Vehicle", render: (r) => <span className="font-mono text-slate-700 dark:text-slate-300">{r.vehicleAssigned}</span> },
                { key: "tourManager", header: "Tour Manager", render: (r) => <span>{r.tourManager}</span> },
                { key: "status", header: "Status", render: (r) => <Badge status={r.status === "Completed" ? "Available" : r.status === "In Progress" ? "On Tour" : "Assigned"}>{r.status}</Badge> },
              ]}
              data={guide.assignments}
              keyExtractor={(row) => row.id}
            />
          ) : (
            <EmptyState
              title="No active assignment"
              description="This guide has no active or past tour assignments recorded in this operational session."
            />
          )}
        </Card>
      )}

      {/* TAB 5: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Guide Master Activity History
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {guide.activityHistory.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
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
