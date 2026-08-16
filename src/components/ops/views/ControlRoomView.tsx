"use client";

import React, { useState } from "react";
import {
  Booking,
  Tour,
  Vehicle,
  Crew,
  FinanceExpense,
  OperationalNotification,
} from "@/types/travelOps";
import {
  Compass,
  Send,
  Truck,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  ChevronRight,
  TrendingUp,
  Layers,
  Wrench,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  Eye,
} from "lucide-react";

interface ControlRoomViewProps {
  bookings: Booking[];
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  expenses: FinanceExpense[];
  notifications: OperationalNotification[];
  onNavigateTab: (tab: any) => void;
  onSelectTour: (tourId: string) => void;
  onOpenGroupModal: () => void;
  onOpenAssignModal?: (tourId: string) => void;
  onOpenMaintenanceModal?: (vehicleId?: string) => void;
}

export const ControlRoomView: React.FC<ControlRoomViewProps> = ({
  bookings,
  tours,
  vehicles,
  crews,
  expenses,
  notifications,
  onNavigateTab,
  onSelectTour,
  onOpenGroupModal,
  onOpenAssignModal,
  onOpenMaintenanceModal,
}) => {
  const [tableStatusFilter, setTableStatusFilter] = useState<string>("ALL");

  // KPI Computations
  const todayToursCount = tours.length;
  const departuresTodayCount = tours.filter((t) =>
    ["Departed", "On Trip", "Handover", "Ready"].includes(t.status)
  ).length;
  const inProgressCount = tours.filter((t) =>
    ["On Trip", "In Transit", "Handover"].includes(t.status)
  ).length;
  const arrivalTodayCount = tours.filter((t) =>
    ["Arrived", "Completed"].includes(t.status)
  ).length;
  const pendingDeploymentCount = tours.filter((t) =>
    ["Planning", "Unassigned", "Ready", "Pending Deployment"].includes(t.status)
  ).length;
  const operationalIssuesCount = tours.filter((t) => t.status === "Issue").length;

  // Fleet Status Breakdown
  const totalFleet = vehicles.length;
  const fleetAvailable = vehicles.filter((v) => v.status === "Available").length;
  const fleetAssigned = vehicles.filter((v) => v.status === "Assigned").length;
  const fleetOnTrip = vehicles.filter((v) => v.status === "On Trip").length;
  const fleetMaintenance = vehicles.filter((v) => v.status === "Maintenance").length;

  // Crew Availability Breakdown
  const driversTotal = crews.filter((c) => c.role === "Driver").length;
  const driversAvailable = crews.filter((c) => c.role === "Driver" && c.status === "Available").length;

  const guidesTotal = crews.filter((c) => c.role === "Local Guide").length;
  const guidesAvailable = crews.filter((c) => c.role === "Local Guide" && c.status === "Available").length;

  const tmTotal = crews.filter((c) => c.role === "Tour Manager").length;
  const tmAvailable = crews.filter((c) => c.role === "Tour Manager" && c.status === "Available").length;

  // Filtered Today's Operations Table
  const filteredToursTable = tours.filter((t) => {
    if (tableStatusFilter !== "ALL" && t.status !== tableStatusFilter) return false;
    return true;
  });

  // Actionable Alerts List
  const alertsList: { id: string; title: string; desc: string; type: "urgent" | "warning" | "info"; actionLabel: string; action: () => void }[] = [];

  tours.forEach((t) => {
    if (!t.vehicleId && t.status !== "Completed") {
      alertsList.push({
        id: `alert-veh-${t.id}`,
        title: `Tour ${t.id} Missing Vehicle`,
        desc: `${t.tourName} (${t.pax} Pax) has no assigned vehicle.`,
        type: "urgent",
        actionLabel: "Assign Vehicle",
        action: () => onOpenAssignModal && onOpenAssignModal(t.id),
      });
    }
    if (!t.driverId && t.status !== "Completed") {
      alertsList.push({
        id: `alert-drv-${t.id}`,
        title: `Tour ${t.id} Missing Driver`,
        desc: `No driver assigned for departure from ${t.origin}.`,
        type: "urgent",
        actionLabel: "Assign Driver",
        action: () => onOpenAssignModal && onOpenAssignModal(t.id),
      });
    }
    if (!t.guideId && t.status !== "Completed") {
      alertsList.push({
        id: `alert-gde-${t.id}`,
        title: `Tour ${t.id} Missing Local Guide`,
        desc: `Local guide required for ${t.destination} excursion.`,
        type: "warning",
        actionLabel: "Assign Guide",
        action: () => onOpenAssignModal && onOpenAssignModal(t.id),
      });
    }
    if (t.status === "Issue") {
      alertsList.push({
        id: `alert-iss-${t.id}`,
        title: `Operational Issue on ${t.id}`,
        desc: t.operationalIssue || "Handover delay reported.",
        type: "urgent",
        actionLabel: "View Live Dispatch",
        action: () => onNavigateTab("dispatch_execution"),
      });
    }
  });

  vehicles.forEach((v) => {
    if (v.maintenanceStatus === "Service Due" || v.maintenanceStatus === "In Repair") {
      alertsList.push({
        id: `alert-maint-${v.id}`,
        title: `Vehicle ${v.plateNumber} Service Due`,
        desc: `${v.brand} ${v.model} (${v.odometer.toLocaleString()} KM) requires workshop check.`,
        type: "warning",
        actionLabel: "Schedule Service",
        action: () => onOpenMaintenanceModal && onOpenMaintenanceModal(v.id),
      });
    }
  });

  return (
    <div className="space-y-6">
      {/* Dashboard Page Header */}
      <div className="bg-white dark:bg-[#101822] p-5 rounded-2xl border border-[#E4E7EC] dark:border-[#202B38] flex flex-wrap items-center justify-between gap-4 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#15803D] dark:text-[#6CE9A6] border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] dark:bg-[#32D583] animate-pulse"></span> Live Operational Feed
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Operation Control Center
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Real-time overview of today's travel operations across Yogyakarta, Bromo, Ijen, Banyuwangi, and Bali.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenGroupModal}
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Group Bookings</span>
          </button>
          <button
            onClick={() => onNavigateTab("dispatch_execution")}
            className="flex items-center gap-2 bg-[#172033] dark:bg-[#172230] hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer border border-[#E4E7EC] dark:border-[#202B38]"
          >
            <Send className="w-4 h-4" />
            <span>Live Dispatch Monitor</span>
          </button>
        </div>
      </div>

      {/* TOP 6 PRIMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* KPI 1: Today's Tours */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl cursor-pointer hover:border-[#2563EB] dark:hover:border-[#4F8CFF] transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0] mb-2">
            <span className="text-xs font-medium">Today's Tours</span>
            <Compass className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{todayToursCount}</div>
          <div className="text-[10px] text-[#16A34A] dark:text-[#32D583] mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +12% vs Yest Avg
          </div>
        </div>

        {/* KPI 2: Departure Today */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl cursor-pointer hover:border-[#2563EB] dark:hover:border-[#4F8CFF] transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0] mb-2">
            <span className="text-xs font-medium">Departure Today</span>
            <Send className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{departuresTodayCount}</div>
          <div className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF] mt-1 font-medium">
            100% On Schedule
          </div>
        </div>

        {/* KPI 3: Tour In Progress */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl cursor-pointer hover:border-cyan-500 transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0] mb-2">
            <span className="text-xs font-medium">Tour In Progress</span>
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{inProgressCount}</div>
          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-1 font-medium">
            Active On Trip
          </div>
        </div>

        {/* KPI 4: Arrival Today */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl cursor-pointer hover:border-emerald-500 transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0] mb-2">
            <span className="text-xs font-medium">Arrival Today</span>
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] dark:text-[#32D583] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{arrivalTodayCount}</div>
          <div className="text-[10px] text-[#16A34A] dark:text-[#32D583] mt-1 font-medium">
            Ketapang & Bali Hub
          </div>
        </div>

        {/* KPI 5: Pending Deployment */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl cursor-pointer hover:border-amber-500 transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0] mb-2">
            <span className="text-xs font-medium">Pending Deploy</span>
            <Layers className="w-4 h-4 text-[#D97706] dark:text-[#FDB022] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{pendingDeploymentCount}</div>
          <div className="text-[10px] text-[#D97706] dark:text-[#FDB022] mt-1 font-medium">
            Needs Vehicle / Driver
          </div>
        </div>

        {/* KPI 6: Operational Issues */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl cursor-pointer hover:border-rose-500 transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0] mb-2">
            <span className="text-xs font-medium">Operational Issues</span>
            <AlertTriangle className="w-4 h-4 text-[#DC2626] dark:text-[#F97066] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{operationalIssuesCount}</div>
          <div className="text-[10px] text-[#DC2626] dark:text-[#F97066] mt-1 font-medium">
            Action Required
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: MAIN OPERATIONS TABLE & ACTIONABLE ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* LEFT COLUMN (8 cols): Today's Excursion Operations Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Today's Tour Operations Status
              </h3>
              <span className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">
                Live tracking across Yogyakarta, Sukapura, Ketapang & Bali
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5">
              {["ALL", "Departed", "On Trip", "Handover", "Completed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setTableStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    tableStatusFilter === st
                      ? "bg-[#2563EB] dark:bg-[#4F8CFF] text-white shadow-xs"
                      : "bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Operations Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Tour ID</th>
                  <th className="py-2.5 px-3">Excursion Name</th>
                  <th className="py-2.5 px-3">Pax</th>
                  <th className="py-2.5 px-3">Route Corridor</th>
                  <th className="py-2.5 px-3">Vehicle</th>
                  <th className="py-2.5 px-3">Crew</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
                {filteredToursTable.map((tour) => (
                  <tr
                    key={tour.id}
                    onClick={() => onSelectTour(tour.id)}
                    className="saas-table-row cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{tour.id}</td>
                    <td className="py-3 px-3 font-bold text-[#172033] dark:text-white max-w-[180px] truncate">{tour.tourName}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-[#172033] dark:text-[#F8FAFC]">{tour.pax} Pax</td>
                    <td className="py-3 px-3 text-[#667085] dark:text-[#A7B1C0]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2563EB] dark:text-[#4F8CFF]" />
                        <span>{tour.origin} → {tour.dropOff}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      {tour.vehicleId ? (
                        <span className="text-[#172033] dark:text-white font-semibold">{tour.vehicleId}</span>
                      ) : (
                        <span className="text-[#DC2626] dark:text-[#F97066] font-bold">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-[11px]">
                      {tour.driverId ? (
                        <span className="text-[#667085] dark:text-[#A7B1C0]">{tour.driverId}</span>
                      ) : (
                        <span className="text-[#DC2626] dark:text-[#F97066] font-bold">No Driver</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          tour.status === "On Trip" || tour.status === "Departed"
                            ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                            : tour.status === "Handover"
                            ? "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border-blue-200/60 dark:border-blue-800/40"
                            : tour.status === "Issue"
                            ? "bg-[#FEF3F2] text-[#B42318] dark:bg-[rgba(249,112,102,0.12)] dark:text-[#FDA29B] border-rose-200/60 dark:border-rose-800/40"
                            : "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTour(tour.id);
                        }}
                        className="p-1 rounded text-[#2563EB] dark:text-[#4F8CFF] hover:bg-[#EEF4FF] dark:hover:bg-[#16263F] font-semibold text-[11px] cursor-pointer"
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

        {/* RIGHT COLUMN (4 cols): Actionable Alerts & System Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Actionable Operations Alerts */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#DC2626] dark:text-[#F97066]" /> Action Required Alerts
              </h3>
              <span className="font-mono text-[10px] font-bold bg-[#FEF3F2] dark:bg-[rgba(249,112,102,0.12)] text-[#B42318] dark:text-[#FDA29B] px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/40">
                {alertsList.length} Items
              </span>
            </div>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-none">
              {alertsList.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border space-y-2 transition-colors ${
                    alert.type === "urgent"
                      ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                      : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>{alert.title}</span>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-[#DC2626] dark:text-[#F97066]" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#667085] dark:text-[#A7B1C0]">{alert.desc}</p>
                  <button
                    onClick={alert.action}
                    className="w-full bg-[#2563EB] dark:bg-[#4F8CFF] hover:brightness-105 text-white py-1.5 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Dispatch Shortcuts */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
              Dispatch Workspace Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab("booking_grouping")}
                className="p-3 bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl text-left space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-[#172033] dark:text-white">Booking Inbox</div>
                <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Batch GYG Reservations</div>
              </button>

              <button
                onClick={() => onNavigateTab("dispatch_execution")}
                className="p-3 bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl text-left space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-[#172033] dark:text-white">Dispatch Board</div>
                <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Assign Driver & Vehicle</div>
              </button>

              <button
                onClick={() => onNavigateTab("fleet_management")}
                className="p-3 bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl text-left space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-[#172033] dark:text-white">Fleet Roster</div>
                <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Hiace & 4x4 Readiness</div>
              </button>

              <button
                onClick={() => onNavigateTab("crew_sdm")}
                className="p-3 bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl text-left space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-[#172033] dark:text-white">Crew Roster</div>
                <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Local Guides & TMs</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: FLEET STATUS & CREW AVAILABILITY MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* FLEET STATUS BREAKDOWN PANEL */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D97706] dark:text-[#FDB022]" /> Fleet Capacity & Status Breakdown
            </h3>
            <span className="font-mono text-xs text-[#667085] dark:text-[#A7B1C0]">Total: {totalFleet} Vehicles</span>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">Available</span>
              <div className="text-xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono mt-1">{fleetAvailable}</div>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">Assigned</span>
              <div className="text-xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono mt-1">{fleetAssigned}</div>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">On Trip</span>
              <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono mt-1">{fleetOnTrip}</div>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">Workshop</span>
              <div className="text-xl font-extrabold text-[#DC2626] dark:text-[#F97066] font-mono mt-1">{fleetMaintenance}</div>
            </div>
          </div>
        </div>

        {/* CREW AVAILABILITY MATRIX PANEL */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Human Resources Availability Matrix
            </h3>
            <span className="font-mono text-xs text-[#667085] dark:text-[#A7B1C0]">Java & Bali Garages</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">Drivers</span>
              <div className="text-xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono mt-1">
                {driversAvailable} / {driversTotal}
              </div>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">Local Guides</span>
              <div className="text-xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono mt-1">
                {guidesAvailable} / {guidesTotal}
              </div>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">Tour Managers</span>
              <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-1">
                {tmAvailable} / {tmTotal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
