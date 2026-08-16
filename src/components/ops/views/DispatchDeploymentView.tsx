"use client";

import React, { useState } from "react";
import { Booking, Tour, Vehicle, Crew, TourStatus } from "@/types/travelOps";
import {
  Send,
  Layers,
  CheckSquare,
  Square,
  MapPin,
} from "lucide-react";

interface DispatchDeploymentViewProps {
  bookings: Booking[];
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  onOpenAssignModal: (tourId: string) => void;
  onOpenGroupModal: (bookingIds: string[]) => void;
  onUpdateTourStatus: (tourId: string, status: TourStatus) => void;
}

export const DispatchDeploymentView: React.FC<DispatchDeploymentViewProps> = ({
  bookings,
  tours,
  vehicles,
  crews,
  onOpenAssignModal,
  onOpenGroupModal,
  onUpdateTourStatus,
}) => {
  const [groupingTab, setGroupingTab] = useState<"departure" | "destination" | "dropoff">("departure");
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);
  const [deploymentFilter, setDeploymentFilter] = useState<string>("ALL");

  // TOP KPI COMPUTATIONS (6 CARDS)
  const unassignedBookingsCount = bookings.filter((b) => !b.groupedTourId || b.status === "Pending Review").length;
  const needGroupingCount = bookings.filter((b) => b.status === "Pending Review").length;
  const needResourceCount = tours.filter((t) => !t.vehicleId || !t.driverId || !t.guideId).length;
  const pendingDeploymentCount = tours.filter((t) => t.status === "Planning" || t.status === "Pending Deployment").length;
  const readyToDeployCount = tours.filter((t) => t.status === "Ready").length;
  const issuesCount = tours.filter((t) => t.status === "Issue").length;

  const toggleSelectBooking = (id: string) => {
    if (selectedBookingIds.includes(id)) {
      setSelectedBookingIds(selectedBookingIds.filter((item) => item !== id));
    } else {
      setSelectedBookingIds([...selectedBookingIds, id]);
    }
  };

  // Compute grouping buckets
  const unassignedBookings = bookings.filter((b) => b.status === "Pending Review" || !b.groupedTourId);

  const getBucketKey = (b: Booking) => {
    if (groupingTab === "departure") return b.origin;
    if (groupingTab === "destination") return b.product.includes("Bromo") ? "Bromo" : b.product.includes("Ijen") ? "Ijen" : b.product.includes("Waterfall") ? "Tumpak Sewu" : "Java Overland";
    return b.dropOff;
  };

  const buckets: { [key: string]: Booking[] } = {};
  unassignedBookings.forEach((b) => {
    const key = getBucketKey(b);
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(b);
  });

  // Filtered Tours for Deployment Planning Board
  const filteredTours = tours.filter((t) => {
    if (deploymentFilter === "ALL") return true;
    if (deploymentFilter === "Missing Resource") return !t.vehicleId || !t.driverId || !t.guideId;
    if (deploymentFilter === "Ready") return t.status === "Ready";
    if (deploymentFilter === "Dispatched") return t.status === "Departed" || t.status === "On Trip" || t.status === "In Transit";
    if (deploymentFilter === "Planning") return t.status === "Planning" || t.status === "Pending Deployment";
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Module Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50 text-[11px] font-bold uppercase tracking-wider">
              Dispatcher Control Command
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/dispatch/deployment</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Dispatch Deployment & Grouping Control
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Match ingested reservations to 14-pax Hiace & 4x4 Jeep excursion tours, assign available drivers & local guides, and authorize tour departures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={selectedBookingIds.length === 0}
            onClick={() => onOpenGroupModal(selectedBookingIds)}
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Create Grouped Excursion ({selectedBookingIds.length})</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Unassigned Pax</span>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{unassignedBookingsCount}</div>
          <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF]">Needs Tour Grouping</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pending Review</span>
          <div className="text-2xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{needGroupingCount}</div>
          <span className="text-[10px] text-[#D97706] dark:text-[#FDB022]">Booking Inbox</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Missing Resource</span>
          <div className="text-2xl font-extrabold text-[#DC2626] dark:text-[#F97066] font-mono">{needResourceCount}</div>
          <span className="text-[10px] text-[#DC2626] dark:text-[#F97066]">Needs Vehicle / Crew</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Planning Phase</span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{pendingDeploymentCount}</div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400">In Preparation</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Ready to Deploy</span>
          <div className="text-2xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{readyToDeployCount}</div>
          <span className="text-[10px] text-[#16A34A] dark:text-[#32D583]">Clear for Departure</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Flagged Issues</span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{issuesCount}</div>
          <span className="text-[10px] text-rose-600 dark:text-rose-400">Handover Alert</span>
        </div>
      </div>

      {/* SECTION 1: INGESTION BUCKETS & BOOKING GROUPING */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div>
            <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Unassigned Reservation Ingestion Buckets
            </h3>
            <span className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">
              Select multiple single/double reservations and click 'Create Grouped Excursion'
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: "departure", label: "Group by Departure Origin" },
              { id: "destination", label: "Group by Destination Excursion" },
              { id: "dropoff", label: "Group by Drop-Off Location" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGroupingTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  groupingTab === tab.id
                    ? "bg-[#2563EB] dark:bg-[#4F8CFF] text-white shadow-xs"
                    : "bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* BUCKETS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.keys(buckets).map((key) => {
            const list = buckets[key];
            const totalPaxInBucket = list.reduce((sum, item) => sum + item.pax, 0);

            return (
              <div key={key} className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl p-3.5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />
                    <span className="font-bold text-xs text-[#172033] dark:text-white">{key}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF]">
                    {totalPaxInBucket} Pax ({list.length} Bookings)
                  </span>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                  {list.map((b) => {
                    const isSelected = selectedBookingIds.includes(b.id);
                    return (
                      <div
                        key={b.id}
                        onClick={() => toggleSelectBooking(b.id)}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                          isSelected
                            ? "bg-[#EEF4FF] dark:bg-[#16263F] border-[#2563EB]"
                            : "bg-white dark:bg-[#101822] border-[#E4E7EC] dark:border-[#202B38]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#98A2B3]" />
                          )}
                          <div>
                            <span className="font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{b.id}</span>
                            <div className="font-bold text-xs text-[#172033] dark:text-white">{b.guestName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-[#172033] dark:text-white">{b.pax} Pax</span>
                          <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block">{b.source}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: DEPLOYMENT PLANNING BOARD */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Excursion Deployment Board
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={deploymentFilter}
              onChange={(e) => setDeploymentFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1 rounded-lg"
            >
              <option value="ALL">All Deployments</option>
              <option value="Missing Resource">Missing Resource</option>
              <option value="Ready">Ready to Deploy</option>
              <option value="Planning">Planning Phase</option>
              <option value="Dispatched">Dispatched / En Route</option>
            </select>
          </div>
        </div>

        {/* DEPLOYMENT TOURS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Tour Ref</th>
                <th className="py-2.5 px-3">Excursion Name</th>
                <th className="py-2.5 px-3">Pax</th>
                <th className="py-2.5 px-3">Vehicle</th>
                <th className="py-2.5 px-3">Driver</th>
                <th className="py-2.5 px-3">Local Guide</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
              {filteredTours.map((t) => (
                <tr key={t.id} className="saas-table-row">
                  <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{t.id}</td>
                  <td className="py-3 px-3 font-bold text-[#172033] dark:text-white max-w-[180px] truncate">{t.tourName}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#172033] dark:text-[#F8FAFC]">{t.pax} Pax</td>
                  <td className="py-3 px-3 font-mono text-[11px]">
                    {t.vehicleId ? (
                      <span className="text-[#172033] dark:text-white font-semibold">{t.vehicleId}</span>
                    ) : (
                      <span className="text-[#DC2626] font-bold">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-[11px]">
                    {t.driverId ? (
                      <span className="text-[#172033] dark:text-white font-medium">{t.driverId}</span>
                    ) : (
                      <span className="text-[#DC2626] font-bold">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-[11px]">
                    {t.guideId ? (
                      <span className="text-[#172033] dark:text-white font-medium">{t.guideId}</span>
                    ) : (
                      <span className="text-[#D97706] font-bold">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        t.status === "Ready"
                          ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                          : t.status === "Departed" || t.status === "On Trip"
                          ? "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border-blue-200/60 dark:border-blue-800/40"
                          : "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onOpenAssignModal(t.id)}
                      className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] text-white rounded text-[11px] font-bold cursor-pointer"
                    >
                      Assign Resources
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
