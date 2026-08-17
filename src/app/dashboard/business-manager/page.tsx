"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/ops/AppLayout";
import { BmTourDetailDrawer } from "@/components/ops/drawers/BmTourDetailDrawer";
import { BmHandoverDetailDrawer } from "@/components/ops/drawers/BmHandoverDetailDrawer";

// Static Data Files
import bmDashboardData from "@/data/bm-dashboard.json";
import alertsData from "@/data/operational-alerts.json";
import departuresData from "@/data/departures.json";
import arrivalsData from "@/data/arrivals.json";
import handoversData from "@/data/handovers.json";
import toursData from "@/data/tours.json";

import {
  Compass,
  AlertTriangle,
  Send,
  Truck,
  Users,
  DollarSign,
  MapPin,
  Clock,
  Eye,
  CheckCircle2,
  Anchor,
  Layers,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function BusinessManagerDashboardPage() {
  const router = useRouter();

  // Drawers State
  const [selectedTour, setSelectedTour] = useState<any | null>(null);
  const [selectedHandover, setSelectedHandover] = useState<any | null>(null);
  const [activeHandoverTab, setActiveHandoverTab] = useState<"Outgoing" | "Incoming">("Outgoing");
  const [alertFilter, setAlertFilter] = useState<string | null>(null);

  // Filtered Departures
  const filteredDepartures = alertFilter
    ? departuresData.filter((d) => d.status === alertFilter || d.id === alertFilter)
    : departuresData;

  // Filtered Handovers
  const filteredHandovers = handoversData.filter((h) => h.handoverType === activeHandoverTab);

  return (
    <AppLayout>
      <div className="space-y-8 font-sans">
        {/* ================================================== */}
        {/* PAGE HEADER */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#15803D] dark:text-[#4ADE80] border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-bold uppercase tracking-wider">
                Regional Control Tower
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">/dashboard/business-manager</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">
              Operational Overview — {bmDashboardData.region}
            </h1>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
              Control Tower Lead: <span className="font-semibold text-[#0F172A] dark:text-white">{bmDashboardData.responsibleBm}</span>. Supervision of active departures, inter-region ferry handovers, team readiness, and operational alerts.
            </p>
          </div>
        </div>

        {/* ================================================== */}
        {/* TOP SECTION: OPERATIONAL OVERVIEW KPI CARDS (6 CARDS) */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs hover:border-[#2563EB]/40 transition-all">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Total Tours Today</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white font-mono">
              {bmDashboardData.overviewKpis.totalToursToday}
            </div>
            <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold">Active Schedules</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs hover:border-[#2563EB]/40 transition-all">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Departing Today</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] dark:text-[#60A5FA] font-mono">
              {bmDashboardData.overviewKpis.departing}
            </div>
            <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold">Scheduled Today</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs hover:border-[#16A34A]/40 transition-all">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">In Progress</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#16A34A] dark:text-[#4ADE80] font-mono">
              {bmDashboardData.overviewKpis.inProgress}
            </div>
            <span className="text-[10px] text-[#16A34A] dark:text-[#4ADE80] font-semibold">En Route Overland</span>
          </div>

          <div className="bg-white dark:bg-[#101826] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs hover:border-cyan-500/40 transition-all">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Arriving Today</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
              {bmDashboardData.overviewKpis.arriving}
            </div>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">Target Depot</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs hover:border-purple-500/40 transition-all">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Ferry Handover</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
              {bmDashboardData.overviewKpis.handover}
            </div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Ketapang Port</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-rose-200 dark:border-rose-900/50 p-4 rounded-xl space-y-1.5 shadow-xs hover:border-rose-500 transition-all">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Operational Issues</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
              {bmDashboardData.overviewKpis.issues}
            </div>
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">Action Required</span>
          </div>
        </div>

        {/* ================================================== */}
        {/* NEEDS ATTENTION / OPERATIONAL ALERTS BAR */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-3 shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 animate-pulse" /> Needs Attention — Operational Action Items ({alertsData.length})
            </h2>
            {alertFilter && (
              <button
                onClick={() => setAlertFilter(null)}
                className="text-[11px] text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {alertsData.map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  if (alert.tourId) {
                    const matched = toursData.find((t) => t.id === alert.tourId) || departuresData.find((d) => d.id === alert.tourId);
                    if (matched) setSelectedTour(matched);
                  }
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  alert.severity === "Urgent"
                    ? "bg-[#FEF2F2] dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 hover:border-rose-500"
                    : alert.severity === "High"
                    ? "bg-[#FFFBEB] dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 hover:border-amber-500"
                    : "bg-[#F8FAFC] dark:bg-[#151E30] border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#2563EB]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase ${
                    alert.severity === "Urgent" ? "bg-rose-600 text-white" : alert.severity === "High" ? "bg-amber-600 text-white" : "bg-blue-600 text-white"
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="font-mono text-[10px] text-[#94A3B8]">{alert.id}</span>
                </div>
                <div className="font-bold text-xs text-[#0F172A] dark:text-white leading-snug">
                  {alert.title}
                </div>
                <div className="text-[10px] text-[#475569] dark:text-[#94A3B8] line-clamp-2">
                  {alert.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* DEPARTURE CONTROL SECTION */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <div>
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Departure Control — Scheduled Today
              </h2>
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Readiness score computed from Vehicle + Crew + Manifest + Daily Checklist
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Tour ID</th>
                  <th className="py-2.5 px-3">Tour Name</th>
                  <th className="py-2.5 px-3">Departure Time</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Pax</th>
                  <th className="py-2.5 px-3">Vehicle</th>
                  <th className="py-2.5 px-3">Driver</th>
                  <th className="py-2.5 px-3">Guide</th>
                  <th className="py-2.5 px-3">TM</th>
                  <th className="py-2.5 px-3">Readiness</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                {filteredDepartures.map((dep) => (
                  <tr
                    key={dep.id}
                    onClick={() => setSelectedTour(dep)}
                    className="saas-table-row cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{dep.id}</td>
                    <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white max-w-[180px] truncate">{dep.tourName}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#0F172A] dark:text-white">{dep.departureTime}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{dep.destination}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-[#0F172A] dark:text-white">{dep.pax} Pax</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#0F172A] dark:text-white">{dep.vehicle}</td>
                    <td className="py-3 px-3 text-[#0F172A] dark:text-white">{dep.driver}</td>
                    <td className="py-3 px-3 text-[#0F172A] dark:text-white">{dep.guide}</td>
                    <td className="py-3 px-3 text-[#0F172A] dark:text-white">{dep.tourManager}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          dep.readiness.score === "Ready"
                            ? "bg-[#F0FDF4] text-[#15803D] dark:bg-emerald-950/40 dark:text-[#4ADE80] border-emerald-200"
                            : dep.readiness.score === "Attention"
                            ? "bg-[#FFFBEB] text-[#B45309] dark:bg-amber-950/40 dark:text-[#FBBF24] border-amber-200"
                            : "bg-[#FEF2F2] text-[#B91C1C] dark:bg-rose-950/40 dark:text-[#F87171] border-rose-200"
                        }`}
                      >
                        {dep.readiness.score}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#475569] dark:text-[#94A3B8]">{dep.status}</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTour(dep);
                        }}
                        className="px-2.5 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold cursor-pointer"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================== */}
        {/* ARRIVAL CONTROL SECTION */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Arrival Control — Target Operating Depots Today
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Tour Ref</th>
                  <th className="py-2.5 px-3">Tour Name</th>
                  <th className="py-2.5 px-3">Target Depot</th>
                  <th className="py-2.5 px-3">ETA</th>
                  <th className="py-2.5 px-3">Actual Arrival</th>
                  <th className="py-2.5 px-3">Vehicle</th>
                  <th className="py-2.5 px-3">Crew</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                {arrivalsData.map((arr) => (
                  <tr key={arr.id} className="saas-table-row">
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{arr.id}</td>
                    <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{arr.tourName}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{arr.destination}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#0F172A] dark:text-white">{arr.eta}</td>
                    <td className="py-3 px-3 font-mono text-[#16A34A] dark:text-[#4ADE80] font-bold">{arr.actualArrival}</td>
                    <td className="py-3 px-3 font-mono text-[#0F172A] dark:text-white">{arr.vehicle}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{arr.crew}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          arr.status === "Arrived"
                            ? "bg-[#F0FDF4] text-[#15803D] dark:bg-emerald-950/40 dark:text-[#4ADE80] border-emerald-200"
                            : arr.status === "Arriving"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950/40 dark:text-[#60A5FA] border-blue-200"
                            : arr.status === "Delayed"
                            ? "bg-[#FEF2F2] text-[#B91C1C] dark:bg-rose-950/40 dark:text-[#F87171] border-rose-200"
                            : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]"
                        }`}
                      >
                        {arr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================== */}
        {/* TOUR MONITORING (ACTIVE TOURS) SECTION */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80]" /> Active Tour Monitoring — In Transit Progress
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Tour ID</th>
                  <th className="py-2.5 px-3">Tour Name</th>
                  <th className="py-2.5 px-3">Current Location</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Vehicle</th>
                  <th className="py-2.5 px-3">Driver</th>
                  <th className="py-2.5 px-3">TM</th>
                  <th className="py-2.5 px-3">Progress</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                {toursData.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTour(t)}
                    className="saas-table-row cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{t.id}</td>
                    <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white max-w-[180px] truncate">{t.tourName}</td>
                    <td className="py-3 px-3 text-[#16A34A] dark:text-[#4ADE80] font-semibold">{t.currentLocation}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{t.destination}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#0F172A] dark:text-white">{t.vehicle}</td>
                    <td className="py-3 px-3 text-[#0F172A] dark:text-white">{t.driver}</td>
                    <td className="py-3 px-3 text-[#0F172A] dark:text-white">{t.tourManager}</td>
                    <td className="py-3 px-3">
                      <div className="space-y-1 w-28">
                        <div className="flex justify-between font-mono text-[10px] font-bold">
                          <span className="text-[#0F172A] dark:text-white">{t.progress}%</span>
                          <span className="text-[#16A34A] dark:text-[#4ADE80]">{t.status}</span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] dark:bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#16A34A] h-full rounded-full" style={{ width: `${t.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTour(t);
                        }}
                        className="p-1 rounded text-[#2563EB] dark:text-[#60A5FA] hover:bg-[#EFF6FF] dark:hover:bg-[#172A4A] cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================== */}
        {/* HANDOVER MONITORING SECTION */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <div>
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Anchor className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Regional Handover Supervision (Ketapang Port)
              </h2>
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Inter-regional transfer coordination between East Java & Bali Business Managers
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveHandoverTab("Outgoing")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeHandoverTab === "Outgoing"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#1E293B]"
                }`}
              >
                Outgoing Handover
              </button>
              <button
                onClick={() => setActiveHandoverTab("Incoming")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeHandoverTab === "Incoming"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#1E293B]"
                }`}
              >
                Incoming Handover
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Tour Ref</th>
                  <th className="py-2.5 px-3">Excursion Name</th>
                  <th className="py-2.5 px-3">From Region</th>
                  <th className="py-2.5 px-3">To Region</th>
                  <th className="py-2.5 px-3">Handover Time</th>
                  <th className="py-2.5 px-3">Responsible BM</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                {filteredHandovers.map((ho) => (
                  <tr
                    key={ho.id}
                    onClick={() => setSelectedHandover(ho)}
                    className="saas-table-row cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{ho.tourId}</td>
                    <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white max-w-[180px] truncate">{ho.tourName}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{ho.fromRegion}</td>
                    <td className="py-3 px-3 text-[#16A34A] dark:text-[#4ADE80] font-semibold">{ho.toRegion}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#0F172A] dark:text-white">{ho.handoverTime}</td>
                    <td className="py-3 px-3 font-medium text-[#0F172A] dark:text-white text-[11px] max-w-[180px] truncate">{ho.responsibleBm}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          ho.status === "Completed" || ho.status === "Handed Over"
                            ? "bg-[#F0FDF4] text-[#15803D] dark:bg-emerald-950/40 dark:text-[#4ADE80] border-emerald-200"
                            : ho.status === "In Transit"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950/40 dark:text-[#60A5FA] border-blue-200"
                            : "bg-[#FFFBEB] text-[#B45309] dark:bg-amber-950/40 dark:text-[#FBBF24] border-amber-200"
                        }`}
                      >
                        {ho.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHandover(ho);
                        }}
                        className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Supervise
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM SECTION: TEAM OVERVIEW & BOP/REIMBURSEMENT */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-sans">
          {/* TEAM OVERVIEW (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Subordinate Operational Roster Status (Team Overview)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* DISPATCHER */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2">
                  <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider">Dispatcher Team</span>
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Total Bookings:</span>
                    <span className="font-mono font-bold text-[#0F172A] dark:text-white">{bmDashboardData.teamOverview.dispatcher.bookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Deployment Board:</span>
                    <span className="font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{bmDashboardData.teamOverview.dispatcher.deployment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Unassigned:</span>
                    <span className="font-mono font-bold text-amber-600">{bmDashboardData.teamOverview.dispatcher.unassigned}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/dispatch")}
                  className="w-full mt-2 bg-white dark:bg-[#101726] hover:bg-[#EFF6FF] text-[#2563EB] dark:text-[#60A5FA] border border-blue-200 dark:border-blue-900/40 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Open Dispatcher</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* FLEET */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2">
                  <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider">Fleet Team</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Available Vehicles:</span>
                    <span className="font-mono font-bold text-[#16A34A]">{bmDashboardData.teamOverview.fleet.available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Assigned to Tour:</span>
                    <span className="font-mono font-bold text-[#2563EB]">{bmDashboardData.teamOverview.fleet.assigned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">In Maintenance:</span>
                    <span className="font-mono font-bold text-rose-600">{bmDashboardData.teamOverview.fleet.maintenance}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/fleet")}
                  className="w-full mt-2 bg-white dark:bg-[#101726] hover:bg-[#FFFBEB] text-[#B45309] dark:text-[#FBBF24] border border-amber-200 dark:border-amber-900/40 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Open Fleet Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* SDM */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2">
                  <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider">SDM / Crew Team</span>
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Driver Available:</span>
                    <span className="font-mono font-bold text-[#16A34A]">{bmDashboardData.teamOverview.sdm.driverAvailable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">Guide Available:</span>
                    <span className="font-mono font-bold text-purple-600">{bmDashboardData.teamOverview.sdm.guideAvailable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#94A3B8]">TM Available:</span>
                    <span className="font-mono font-bold text-[#2563EB]">{bmDashboardData.teamOverview.sdm.tmAvailable}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/crew")}
                  className="w-full mt-2 bg-white dark:bg-[#101726] hover:bg-purple-50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Open Crew Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* BOP & REIMBURSEMENT COMPACT MONITORING (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80]" /> Operational BOP & Reimbursements
            </h2>

            <div className="space-y-3">
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex justify-between items-center">
                <span className="text-[#475569] dark:text-[#94A3B8] font-medium">BOP Requested Today:</span>
                <span className="font-mono font-bold text-[#0F172A] dark:text-white">
                  Rp {bmDashboardData.financeOverview.bopRequested.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex justify-between items-center">
                <span className="text-[#475569] dark:text-[#94A3B8] font-medium">BOP Approved:</span>
                <span className="font-mono font-bold text-[#16A34A] dark:text-[#4ADE80]">
                  Rp {bmDashboardData.financeOverview.bopApproved.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex justify-between items-center">
                <span className="text-[#475569] dark:text-[#94A3B8] font-medium">BOP Pending Approval:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  Rp {bmDashboardData.financeOverview.bopPending.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex justify-between items-center">
                <span className="text-[#475569] dark:text-[#94A3B8] font-medium">Reimbursement Pending:</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  Rp {bmDashboardData.financeOverview.reimbursementPending.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/finance")}
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-2 rounded-xl font-bold text-xs cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Manage Operational Finance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* DRAWERS */}
      <BmTourDetailDrawer
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
      />

      <BmHandoverDetailDrawer
        handover={selectedHandover}
        onClose={() => setSelectedHandover(null)}
      />
    </AppLayout>
  );
}
