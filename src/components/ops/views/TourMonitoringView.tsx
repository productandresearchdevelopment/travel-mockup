"use client";

import React, { useState } from "react";
import { Tour, Vehicle, Crew } from "@/types/travelOps";
import {
  Eye,
  MapPin,
} from "lucide-react";

interface TourMonitoringViewProps {
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  onSelectTourDetail: (tourId: string) => void;
}

export const TourMonitoringView: React.FC<TourMonitoringViewProps> = ({
  tours,
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
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#15803D] dark:text-[#6CE9A6] border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-bold uppercase tracking-wider">
              Live Tour Operations Command
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/operations</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Tour Monitoring & Live Execution Control
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Real-time tracking matrix of active overland tours across East Java and Bali corridors. Complete operational visibility connecting bookings, resources, checkpoints, and handovers.
          </p>
        </div>
      </div>

      {/* TOP KPI CARDS (8 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 text-xs font-sans">
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Scheduled</span>
          <div className="text-xl font-extrabold text-[#172033] dark:text-white font-mono">{scheduledCount}</div>
          <span className="text-[9px] text-[#667085] dark:text-[#A7B1C0]">Planning Stage</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Ready</span>
          <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{readyCount}</div>
          <span className="text-[9px] text-purple-600 dark:text-purple-400">Resource Matched</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Departed</span>
          <div className="text-xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{departedCount}</div>
          <span className="text-[9px] text-[#2563EB] dark:text-[#4F8CFF]">En Route to Hub</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">On Trip</span>
          <div className="text-xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{onTripCount}</div>
          <span className="text-[9px] text-[#16A34A] dark:text-[#32D583]">In Transit</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Handover</span>
          <div className="text-xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{handoverCount}</div>
          <span className="text-[9px] text-[#D97706] dark:text-[#FDB022]">Ferry Crossing</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Arrived</span>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">{arrivedCount}</div>
          <span className="text-[9px] text-cyan-600 dark:text-cyan-400">Destination Reached</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Completed</span>
          <div className="text-xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{completedCount}</div>
          <span className="text-[9px] text-[#16A34A] dark:text-[#32D583]">Closed & Billed</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block text-[11px]">Issues</span>
          <div className="text-xl font-extrabold text-[#DC2626] dark:text-[#F97066] font-mono">{issueCount}</div>
          <span className="text-[9px] text-[#DC2626] dark:text-[#F97066]">Action Needed</span>
        </div>
      </div>

      {/* TOURS TABLE */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
            Active Excursion Tour Deployments ({filteredTours.length})
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1 rounded-lg"
            >
              <option value="ALL">All Statuses</option>
              <option value="On Trip">On Trip</option>
              <option value="Departed">Departed</option>
              <option value="Handover">Handover</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Tour Ref</th>
                <th className="py-2.5 px-3">Excursion Name</th>
                <th className="py-2.5 px-3">Pax</th>
                <th className="py-2.5 px-3">Corridor</th>
                <th className="py-2.5 px-3">Vehicle</th>
                <th className="py-2.5 px-3">Driver</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
              {filteredTours.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => onSelectTourDetail(t.id)}
                  className="saas-table-row cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{t.id}</td>
                  <td className="py-3 px-3 font-bold text-[#172033] dark:text-white max-w-[200px] truncate">{t.tourName}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#172033] dark:text-[#F8FAFC]">{t.pax} Pax</td>
                  <td className="py-3 px-3 text-[#667085] dark:text-[#A7B1C0]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#2563EB] dark:text-[#4F8CFF]" />
                      <span>{t.origin} → {t.destination}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#172033] dark:text-white">{t.vehicleId || "Unassigned"}</td>
                  <td className="py-3 px-3 text-[#172033] dark:text-white">{t.driverId || "Unassigned"}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        t.status === "On Trip" || t.status === "Completed"
                          ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                          : "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border-blue-200/60 dark:border-blue-800/40"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTourDetail(t.id);
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
    </div>
  );
};
