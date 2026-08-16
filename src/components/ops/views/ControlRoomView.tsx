"use client";

import React, { useState } from "react";
import {
  Booking,
  Tour,
  Vehicle,
  Crew,
  FinanceExpense,
  OperationalNotification,
  TourStatus,
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
  Calendar,
  Eye,
  RefreshCw,
  Anchor,
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
  const fleetInspection = vehicles.filter((v) => v.status === "Inspection").length;

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
      <div className="dark:bg-slate-900 bg-white p-5 rounded-xl border dark:border-slate-800 border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-lg transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span> Live Operational Feed
            </span>
            <span className="text-xs dark:text-slate-400 text-slate-500 font-mono">/dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold dark:text-white text-slate-900 tracking-tight mt-1">
            Operation Control Center
          </h1>
          <p className="text-xs dark:text-slate-400 text-slate-600">
            Real-time overview of today's travel operations across Yogyakarta, Bromo, Ijen, Banyuwangi, and Bali.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenGroupModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Group Bookings</span>
          </button>
          <button
            onClick={() => onNavigateTab("dispatch_execution")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
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
          className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl cursor-pointer hover:border-emerald-500/40 transition-all group shadow"
        >
          <div className="flex items-center justify-between dark:text-slate-400 text-slate-500 mb-2">
            <span className="text-xs font-medium dark:text-slate-400 text-slate-500">Today's Tours</span>
            <Compass className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold dark:text-white text-slate-900 font-mono">{todayToursCount}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +12% vs Yest Avg
          </div>
        </div>

        {/* KPI 2: Departure Today */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl cursor-pointer hover:border-blue-500/40 transition-all group shadow"
        >
          <div className="flex items-center justify-between dark:text-slate-400 text-slate-500 mb-2">
            <span className="text-xs font-medium dark:text-slate-400 text-slate-500">Departure Today</span>
            <Send className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold dark:text-white text-slate-900 font-mono">{departuresTodayCount}</div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 font-medium">
            100% On Schedule
          </div>
        </div>

        {/* KPI 3: Tour In Progress */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl cursor-pointer hover:border-cyan-500/40 transition-all group shadow"
        >
          <div className="flex items-center justify-between dark:text-slate-400 text-slate-500 mb-2">
            <span className="text-xs font-medium dark:text-slate-400 text-slate-500">Tour In Progress</span>
            <Clock className="w-4 h-4 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold dark:text-white text-slate-900 font-mono">{inProgressCount}</div>
          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-1 font-medium">
            Active On Trip
          </div>
        </div>

        {/* KPI 4: Arrival Today */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl cursor-pointer hover:border-teal-500/40 transition-all group shadow"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-400">Arrival Today</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{arrivalTodayCount}</div>
          <div className="text-[10px] text-teal-400 mt-1 font-medium">
            Target Met
          </div>
        </div>

        {/* KPI 5: Pending Deployment */}
        <div
          onClick={() => onNavigateTab("booking_grouping")}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-amber-500/40 transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-400">Pending Deployment</span>
            <Layers className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{pendingDeploymentCount}</div>
          <div className="text-[10px] text-amber-400 mt-1 font-medium">
            Awaiting Match
          </div>
        </div>

        {/* KPI 6: Operational Issues */}
        <div
          onClick={() => onNavigateTab("dispatch_execution")}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-red-500/40 transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-400">Operational Issues</span>
            <ShieldAlert className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-red-400 font-mono">{operationalIssuesCount}</div>
          <div className="text-[10px] text-red-400 mt-1 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Requires Action
          </div>
        </div>
      </div>

      {/* MAIN SECTION 1: TODAY'S OPERATION (LARGEST TABLE) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" /> Today's Operation Schedule
            </h2>
            <p className="text-xs text-slate-400">
              Detailed operational tracking table answering "What tours are happening today?"
            </p>
          </div>

          {/* Status Filter Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Status Filter:</span>
            <select
              value={tableStatusFilter}
              onChange={(e) => setTableStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Statuses ({tours.length})</option>
              <option value="Ready">Ready</option>
              <option value="Departed">Departed</option>
              <option value="On Trip">On Trip</option>
              <option value="Handover">Handover</option>
              <option value="Completed">Completed</option>
              <option value="Issue">Issue</option>
            </select>
          </div>
        </div>

        {/* Dense Operational Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Time</th>
                <th className="p-3">Tour Name & ID</th>
                <th className="p-3">Pax</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Guide</th>
                <th className="p-3">TM</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredToursTable.map((tour) => {
                const vehicle = vehicles.find((v) => v.id === tour.vehicleId);
                const driver = crews.find((c) => c.id === tour.driverId);
                const guide = crews.find((c) => c.id === tour.guideId);
                const tm = crews.find((c) => c.id === tour.tourManagerId);
                const pickupTime = tour.checkpoints[0]?.scheduledTime || "06:00";

                return (
                  <tr
                    key={tour.id}
                    className="ops-table-row hover:bg-slate-850/60 transition-colors cursor-pointer"
                    onClick={() => onSelectTour(tour.id)}
                  >
                    {/* Time */}
                    <td className="p-3 font-mono text-emerald-400 font-bold whitespace-nowrap">
                      {pickupTime} WIB
                    </td>

                    {/* Tour Name & ID */}
                    <td className="p-3 max-w-[220px]">
                      <div className="font-mono text-[10px] font-bold text-slate-400">{tour.id}</div>
                      <div className="font-bold text-slate-100 truncate" title={tour.tourName}>
                        {tour.tourName}
                      </div>
                    </td>

                    {/* Pax */}
                    <td className="p-3">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {tour.pax} Pax
                      </span>
                    </td>

                    {/* Origin */}
                    <td className="p-3 text-slate-300 font-medium whitespace-nowrap">{tour.origin}</td>

                    {/* Destination */}
                    <td className="p-3 max-w-[180px]">
                      <div className="text-slate-200 truncate" title={tour.destination}>
                        {tour.destination}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">Drop: {tour.dropOff}</div>
                    </td>

                    {/* Vehicle */}
                    <td className="p-3">
                      {vehicle ? (
                        <div>
                          <span className="font-mono font-bold text-amber-300 block">{vehicle.plateNumber}</span>
                          <span className="text-[10px] text-slate-400">{vehicle.model}</span>
                        </div>
                      ) : (
                        <span className="text-red-400 font-semibold text-[11px] bg-red-500/10 px-1.5 py-0.5 rounded">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Driver */}
                    <td className="p-3">
                      {driver ? (
                        <span className="font-medium text-slate-200">{driver.name.split(" ")[0]}</span>
                      ) : (
                        <span className="text-red-400 text-[11px]">Unassigned</span>
                      )}
                    </td>

                    {/* Guide */}
                    <td className="p-3">
                      {guide ? (
                        <span className="font-medium text-slate-200">{guide.name.split(" ")[0]}</span>
                      ) : (
                        <span className="text-amber-400 text-[11px]">Local Guide</span>
                      )}
                    </td>

                    {/* TM */}
                    <td className="p-3">
                      {tm ? (
                        <span className="font-medium text-slate-200">{tm.name.split(" ")[0]}</span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          tour.status === "Ready"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : tour.status === "Departed"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                            : tour.status === "On Trip" || tour.status === "In Transit"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : tour.status === "Handover"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : tour.status === "Issue"
                            ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                            : "bg-teal-500/10 text-teal-400 border-teal-500/30"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectTour(tour.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="View Tour Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MIDDLE SECTION 2: FLEET STATUS & CREW AVAILABILITY (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FLEET STATUS (Compact Visualization) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" /> Fleet Readiness & Deployment
              </h3>
              <p className="text-[11px] text-slate-400">Answers "Do we have enough vehicles?"</p>
            </div>
            <button
              onClick={() => onNavigateTab("fleet_management")}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              Fleet Center <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Main Fleet Breakdown Bar */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">Total Fleet Managed</span>
              <span className="font-mono text-xl font-bold text-white">{totalFleet} Vehicles</span>
            </div>

            {/* Compact Badges Matrix */}
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Available</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{fleetAvailable}</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Assigned</span>
                <span className="font-mono font-bold text-blue-400 text-sm">{fleetAssigned}</span>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">On Trip</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{fleetOnTrip}</span>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Maint.</span>
                <span className="font-mono font-bold text-red-400 text-sm">{fleetMaintenance}</span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Inspect.</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{fleetInspection}</span>
              </div>
            </div>

            {/* Visual Ratio Progress Bar */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Active Deployment Rate</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {Math.round(((fleetAssigned + fleetOnTrip) / totalFleet) * 100)}% Deployed
                </span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(fleetAvailable / totalFleet) * 100}%` }}
                  title="Available"
                ></div>
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(fleetAssigned / totalFleet) * 100}%` }}
                  title="Assigned"
                ></div>
                <div
                  className="bg-cyan-500 h-full"
                  style={{ width: `${(fleetOnTrip / totalFleet) * 100}%` }}
                  title="On Trip"
                ></div>
                <div
                  className="bg-red-500 h-full"
                  style={{ width: `${(fleetMaintenance / totalFleet) * 100}%` }}
                  title="Maintenance"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* CREW AVAILABILITY */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Operational Crew Roster Availability
              </h3>
              <p className="text-[11px] text-slate-400">Answers "Do we have enough crew?"</p>
            </div>
            <button
              onClick={() => onNavigateTab("crew_sdm")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              Crew Roster <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Drivers */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Drivers Roster</div>
                  <div className="text-[10px] text-slate-400">SIM B1 & Overland Java-Bali Certified</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-extrabold text-emerald-400">
                  {driversAvailable} Available <span className="text-slate-500 font-normal">/ {driversTotal} Total</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {driversTotal - driversAvailable} Currently On Trip
                </span>
              </div>
            </div>

            {/* Local Guides */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Local Tour Guides</div>
                  <div className="text-[10px] text-slate-400">Bromo, Ijen & Waterfall Specialists</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-extrabold text-emerald-400">
                  {guidesAvailable} Available <span className="text-slate-500 font-normal">/ {guidesTotal} Total</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {guidesTotal - guidesAvailable} Currently On Trip
                </span>
              </div>
            </div>

            {/* Tour Managers */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Tour Managers (TM)</div>
                  <div className="text-[10px] text-slate-400">Senior Expedition Leaders</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-extrabold text-emerald-400">
                  {tmAvailable} Available <span className="text-slate-500 font-normal">/ {tmTotal} Total</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {tmTotal - tmAvailable} Currently On Trip
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION 3: OPERATION ALERTS & LIVE TOUR MONITORING (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ACTIONABLE OPERATION ALERTS */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Actionable Operational Alerts
              </h3>
              <p className="text-[11px] text-slate-400">Answers "Which tours & problems need attention?"</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold text-xs border border-amber-500/30">
              {alertsList.length} Active Alerts
            </span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {alertsList.length === 0 ? (
              <div className="text-center py-8 text-emerald-400 text-xs flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8" />
                <span>All departures fully assigned with zero operational alerts!</span>
              </div>
            ) : (
              alertsList.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border text-xs flex flex-wrap items-center justify-between gap-2 ${
                    alert.type === "urgent"
                      ? "bg-red-500/10 border-red-500/30 text-red-200"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-200"
                  }`}
                >
                  <div className="space-y-0.5 flex-1 min-w-[200px]">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> {alert.title}
                    </div>
                    <div className="text-[11px] text-slate-300 leading-relaxed">{alert.desc}</div>
                  </div>

                  <button
                    onClick={alert.action}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] px-3 py-1.5 rounded-lg font-bold border border-slate-700 transition-colors shadow"
                  >
                    {alert.actionLabel} →
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* LIVE TOUR MONITORING */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" /> Live Tour Monitoring Feed
              </h3>
              <p className="text-[11px] text-slate-400">Answers "Which tours are currently running?"</p>
            </div>
            <button
              onClick={() => onNavigateTab("dispatch_execution")}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              Full Pipeline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {tours
              .filter((t) => ["On Trip", "In Transit", "Handover", "Departed"].includes(t.status))
              .map((tour) => {
                const vehicle = vehicles.find((v) => v.id === tour.vehicleId);
                const driver = crews.find((c) => c.id === tour.driverId);

                return (
                  <div
                    key={tour.id}
                    onClick={() => onSelectTour(tour.id)}
                    className="bg-slate-950 border border-slate-800 hover:border-cyan-500/40 p-3 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-cyan-400">{tour.id}</span>
                        <span className="font-bold text-white">{tour.tourName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-slate-500" /> Loc: <strong className="text-white">{tour.origin}</strong>
                        </span>
                        <span>•</span>
                        <span>Veh: <strong className="text-amber-300 font-mono">{vehicle?.plateNumber || "Hiace"}</strong></span>
                        <span>•</span>
                        <span>Drv: <strong className="text-slate-200">{driver?.name.split(" ")[0] || "Andi"}</strong></span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          tour.status === "Handover"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        }`}
                      >
                        {tour.status}
                      </span>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">Updated 2m ago</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
