"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/ops/AppLayout";
import { SdmFieldReportDetailDrawer } from "@/components/ops/drawers/SdmFieldReportDetailDrawer";

// Static Data Files
import driversData from "@/data/drivers.json";
import guidesData from "@/data/guides.json";
import tourManagersData from "@/data/tour-managers.json";
import crewAvailabilityData from "@/data/crew-availability.json";
import crewManifestsData from "@/data/crew-manifests.json";
import attendanceData from "@/data/attendance.json";
import fieldReportsData from "@/data/field-reports.json";
import crewRecommendationsData from "@/data/crew-recommendations.json";

import {
  Users,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Phone,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function SdmCrewManagementPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "directory" | "availability" | "manifests" | "attendance" | "reports"
  >("overview");

  // Directory Sub-Tabs
  const [directorySubTab, setDirectorySubTab] = useState<"drivers" | "guides" | "tms">("drivers");

  // Manifest Sub-Tabs
  const [manifestSubTab, setManifestSubTab] = useState<"drivers" | "guides" | "tms">("drivers");

  // Selected Field Report for Drawer
  const [selectedFieldReport, setSelectedFieldReport] = useState<any | null>(null);
  const [reportsList, setReportsList] = useState(fieldReportsData);

  const handleUpdateReport = (updated: any) => {
    setReportsList((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  return (
    <AppLayout>
      <div className="space-y-8 font-sans">
        {/* ================================================== */}
        {/* PAGE HEADER */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-[11px] font-bold uppercase tracking-wider">
                SDM / Human Resource Control
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">/dashboard/sdm</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">
              SDM Crew Roster & Field Operations Management
            </h1>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
              Supervise Drivers, Local Guides, and Tour Managers availability, manifests, daily attendance, and field reports.
            </p>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#151E30] p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "SDM Overview" },
            { id: "directory", label: "Crew Directory" },
            { id: "availability", label: "Availability Calendar" },
            { id: "manifests", label: "Crew Manifests" },
            { id: "attendance", label: "Daily Attendance" },
            { id: "reports", label: "Field Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================== */}
        {/* CREW DASHBOARD KPI CARDS */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Drivers Available</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#16A34A] dark:text-[#4ADE80] font-mono">12 / 18</div>
            <span className="text-[10px] text-[#16A34A] font-semibold">4 Assigned • 2 Off</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Guides Available</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">9 / 12</div>
            <span className="text-[10px] text-purple-600 font-semibold">3 Assigned to Tour</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">TMs Available</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] dark:text-[#60A5FA] font-mono">6 / 8</div>
            <span className="text-[10px] text-[#2563EB] font-semibold">2 Assigned to Tour</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Missing Assignment</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B45309] dark:text-[#FBBF24] font-mono">1</div>
            <span className="text-[10px] text-[#B45309] font-semibold">Action Required</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Today's Deployment</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">12</div>
            <span className="text-[10px] text-cyan-600 font-semibold">Field Crew Active</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-rose-200 dark:border-rose-900/50 p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Attendance Issues</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B91C1C] dark:text-[#F87171] font-mono">1</div>
            <span className="text-[10px] text-[#B91C1C] font-semibold">1 Late Check-In</span>
          </div>
        </div>

        {/* ================================================== */}
        {/* DAILY CREW RECOMMENDATIONS FOR DISPATCHER */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Daily Crew Recommendations for Dispatcher
            </h2>
            <span className="text-[11px] font-mono text-[#475569] dark:text-[#94A3B8]">SDM Roster Advisory</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* RECOMMENDED DRIVER */}
            <div className="bg-[#F0FDF4] dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-xl space-y-2">
              <span className="font-bold text-xs text-[#15803D] dark:text-[#4ADE80] uppercase tracking-wider block">
                ✓ Recommended Driver
              </span>
              {crewRecommendationsData.recommendedDrivers.map((drv, idx) => (
                <div key={idx} className="bg-white dark:bg-[#101726] p-3 rounded-lg border border-emerald-200/60 text-xs space-y-1">
                  <div className="font-bold text-[#0F172A] dark:text-white">{drv.name}</div>
                  {drv.reasons.map((r, rIdx) => (
                    <div key={rIdx} className="text-[11px] text-[#15803D] dark:text-[#4ADE80] font-medium">{r}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* RECOMMENDED TM */}
            <div className="bg-[#EFF6FF] dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 p-4 rounded-xl space-y-2">
              <span className="font-bold text-xs text-[#2563EB] dark:text-[#60A5FA] uppercase tracking-wider block">
                ✓ Recommended Tour Manager
              </span>
              {crewRecommendationsData.recommendedTms.map((tm, idx) => (
                <div key={idx} className="bg-white dark:bg-[#101726] p-3 rounded-lg border border-blue-200/60 text-xs space-y-1">
                  <div className="font-bold text-[#0F172A] dark:text-white">{tm.name}</div>
                  {tm.reasons.map((r, rIdx) => (
                    <div key={rIdx} className="text-[11px] text-[#2563EB] dark:text-[#60A5FA] font-medium">{r}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* CREW WARNINGS */}
            <div className="bg-[#FEF2F2] dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 p-4 rounded-xl space-y-2">
              <span className="font-bold text-xs text-[#B91C1C] dark:text-[#F87171] uppercase tracking-wider block">
                ⚠ Crew Allocation Alert
              </span>
              {crewRecommendationsData.warnings.map((wrn, idx) => (
                <div key={idx} className="bg-white dark:bg-[#101726] p-3 rounded-lg border border-rose-200/60 text-xs font-semibold text-[#B91C1C] dark:text-[#F87171]">
                  {wrn.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* TAB 1: CREW DIRECTORY (DRIVERS, GUIDES, TMS) */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "directory") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Operational Crew Directory
              </h2>

              <div className="flex items-center gap-1.5 bg-[#F8FAFC] dark:bg-[#151E30] p-1 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]">
                {[
                  { id: "drivers", label: "Drivers" },
                  { id: "guides", label: "Local Guides" },
                  { id: "tms", label: "Tour Managers" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setDirectorySubTab(st.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      directorySubTab === st.id
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">Availability</th>
                    <th className="py-2.5 px-3">Current Assignment</th>
                    <th className="py-2.5 px-3">Current Tour</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {(directorySubTab === "drivers"
                    ? driversData
                    : directorySubTab === "guides"
                    ? guidesData
                    : tourManagersData
                  ).map((person) => (
                    <tr key={person.id} className="saas-table-row">
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{person.name}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{person.role}</td>
                      <td className="py-3 px-3 font-mono text-[#2563EB] dark:text-[#60A5FA]">{person.phone}</td>
                      <td className="py-3 px-3 font-semibold text-[#16A34A]">{person.availability}</td>
                      <td className="py-3 px-3 text-[#0F172A] dark:text-white max-w-[160px] truncate">{person.currentAssignment}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] max-w-[160px] truncate">{person.currentTour}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{person.location}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            person.status === "Available"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : person.status === "On Trip" || person.status === "Assigned"
                              ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                              : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]"
                          }`}
                        >
                          {person.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 2: AVAILABILITY CALENDAR / SCHEDULE */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "availability") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Crew Availability Calendar & Rostering
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Person</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Availability</th>
                    <th className="py-2.5 px-3">Shift / Tour Assignment</th>
                    <th className="py-2.5 px-3">Roster Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {crewAvailabilityData.map((avl) => (
                    <tr key={avl.id} className="saas-table-row">
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{avl.person}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{avl.role}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#0F172A] dark:text-white">{avl.date}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            avl.availability === "Available"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                          }`}
                        >
                          {avl.availability}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#2563EB] dark:text-[#60A5FA]">{avl.assignment}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{avl.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 3: DAILY ATTENDANCE */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "attendance") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Daily Crew Attendance & Check-In Log
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Check-In Time</th>
                    <th className="py-2.5 px-3">Check-Out Time</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {attendanceData.map((att) => (
                    <tr key={att.id} className="saas-table-row">
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{att.name}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{att.role}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#0F172A] dark:text-white">{att.date}</td>
                      <td className="py-3 px-3 font-mono text-[#2563EB] dark:text-[#60A5FA] font-bold">{att.checkIn}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{att.checkOut}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            att.status === "Present"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : att.status === "Late"
                              ? "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                              : "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                          }`}
                        >
                          {att.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 4: FIELD REPORTS */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "reports") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Operational Field Reports
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Report ID</th>
                    <th className="py-2.5 px-3">Tour Excursion</th>
                    <th className="py-2.5 px-3">Submitted By</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Summary</th>
                    <th className="py-2.5 px-3">Attachments</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {reportsList.map((rep) => (
                    <tr
                      key={rep.id}
                      onClick={() => setSelectedFieldReport(rep)}
                      className="saas-table-row cursor-pointer"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">{rep.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{rep.tour}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{rep.submittedBy}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{rep.role}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{rep.date}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] max-w-[200px] truncate">{rep.summary}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">📷 {rep.attachmentCount} Photos</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            rep.status === "Acknowledged"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : rep.status === "Escalated"
                              ? "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                              : "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                          }`}
                        >
                          {rep.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFieldReport(rep);
                          }}
                          className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* DRAWERS */}
      <SdmFieldReportDetailDrawer
        report={selectedFieldReport}
        onClose={() => setSelectedFieldReport(null)}
        onUpdateReport={handleUpdateReport}
      />
    </AppLayout>
  );
}
