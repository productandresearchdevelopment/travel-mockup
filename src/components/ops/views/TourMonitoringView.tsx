"use client";

import React, { useState } from "react";
import { Tour, Vehicle, Crew, TourStatus } from "@/types/travelOps";
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Truck,
  Users,
  Eye,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface TourMonitoringViewProps {
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  onSelectTourDetail: (tourId: string) => void;
}

export const TourMonitoringView: React.FC<TourMonitoringViewProps> = ({
  tours,
  vehicles,
  crews,
  onSelectTourDetail,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 8 TOP KPI CARDS COMPUTATIONS
  const scheduledCount = tours.filter((t) => t.status === "Planning" || t.status === "Pending Deployment").length;
  const readyCount = tours.filter((t) => t.status === "Ready").length;
  const departedCount = tours.filter((t) => t.status === "Departed").length;
  const onTripCount = tours.filter((t) => t.status === "On Trip" || t.status === "In Transit").length;
  const handoverCount = tours.filter((t) => t.status === "Handover").length;
  const arrivedCount = tours.filter((t) => t.status === "Arrived").length;
  const completedCount = tours.filter((t) => t.status === "Completed").length;
  const issueCount = tours.filter((t) => t.status === "Issue" || (t.issuesList && t.issuesList.length > 0)).length;

  const filteredTours = tours.filter((t) => {
    if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = t.id.toLowerCase().includes(q);
      const matchName = t.tourName.toLowerCase().includes(q);
      const matchDest = t.destination.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchDest) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider">
              Live Tour Operations Command
            </span>
            <span className="text-xs text-slate-400 font-mono">/operations</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Tour Monitoring & Live Execution Control
          </h1>
          <p className="text-xs text-slate-400">
            Real-time tracking matrix of active overland tours across East Java and Bali corridors. Complete operational visibility connecting bookings, resources, checkpoints, and handovers.
          </p>
        </div>
      </div>

      {/* TOP KPI CARDS (8 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Scheduled</span>
          <div className="text-xl font-extrabold text-white font-mono">{scheduledCount}</div>
          <span className="text-[9px] text-slate-500">Planning Stage</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Ready</span>
          <div className="text-xl font-extrabold text-purple-400 font-mono">{readyCount}</div>
          <span className="text-[9px] text-purple-400">Resource Matched</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Departed</span>
          <div className="text-xl font-extrabold text-blue-400 font-mono">{departedCount}</div>
          <span className="text-[9px] text-blue-400">En Route to Hub</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">On Trip</span>
          <div className="text-xl font-extrabold text-emerald-400 font-mono">{onTripCount}</div>
          <span className="text-[9px] text-emerald-400">Active Excursion</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Handover</span>
          <div className="text-xl font-extrabold text-cyan-400 font-mono">{handoverCount}</div>
          <span className="text-[9px] text-cyan-400">Ferry / Transit</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Arrived</span>
          <div className="text-xl font-extrabold text-indigo-400 font-mono">{arrivedCount}</div>
          <span className="text-[9px] text-indigo-400">Drop-off Point</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Completed</span>
          <div className="text-xl font-extrabold text-slate-300 font-mono">{completedCount}</div>
          <span className="text-[9px] text-slate-500">BOP Settled</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 shadow-md">
          <span className="text-slate-400 block text-[11px]">Issue</span>
          <div className="text-xl font-extrabold text-rose-400 font-mono">{issueCount}</div>
          <span className="text-[9px] text-rose-400 font-semibold">Action Required</span>
        </div>
      </div>

      {/* FILTER & TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Filter Live Operations:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="ALL">All Statuses ({tours.length})</option>
              <option value="Planning">Planning</option>
              <option value="Ready">Ready</option>
              <option value="Departed">Departed</option>
              <option value="On Trip">On Trip</option>
              <option value="Handover">Handover</option>
              <option value="Arrived">Arrived</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Tour ID, Name, Destination..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Tour ID</th>
                <th className="p-3">Tour Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Pax</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Guide</th>
                <th className="p-3">TM</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Update</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTours.map((tour) => {
                const vehicle = vehicles.find((v) => v.id === tour.vehicleId);
                const driver = crews.find((c) => c.id === tour.driverId);
                const guide = crews.find((c) => c.id === tour.guideId);
                const tm = crews.find((c) => c.id === tour.tourManagerId);

                const hasIssue = tour.status === "Issue" || (tour.issuesList && tour.issuesList.length > 0);

                return (
                  <tr
                    key={tour.id}
                    className="ops-table-row hover:bg-slate-850/60 transition-colors cursor-pointer"
                    onClick={() => onSelectTourDetail(tour.id)}
                  >
                    <td className="p-3 font-mono font-bold text-cyan-400 whitespace-nowrap">{tour.id}</td>
                    <td className="p-3 font-bold text-white max-w-[200px] truncate" title={tour.tourName}>
                      {tour.tourName}
                    </td>
                    <td className="p-3 font-mono text-slate-300 whitespace-nowrap">{tour.date}</td>
                    <td className="p-3 font-mono font-bold text-emerald-400 whitespace-nowrap">{tour.pax} Pax</td>
                    <td className="p-3 text-slate-300 whitespace-nowrap">{tour.origin}</td>
                    <td className="p-3 text-slate-300 max-w-[150px] truncate" title={tour.destination}>
                      {tour.destination}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {vehicle ? (
                        <span className="font-mono text-amber-300 font-bold">{vehicle.plateNumber}</span>
                      ) : (
                        <span className="text-red-400 font-bold text-[10px]">-</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-200 whitespace-nowrap">{driver ? driver.name.split(" ")[0] : "-"}</td>
                    <td className="p-3 text-slate-200 whitespace-nowrap">{guide ? guide.name.split(" ")[0] : "-"}</td>
                    <td className="p-3 text-slate-200 whitespace-nowrap">{tm ? tm.name.split(" ")[0] : "-"}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          hasIssue
                            ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                            : tour.status === "On Trip"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : tour.status === "Departed"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                      {tour.lastUpdate || "Just now"}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectTourDetail(tour.id)}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] px-3 py-1 rounded-lg font-bold shadow transition-colors cursor-pointer"
                      >
                        View Full Ops Picture
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
