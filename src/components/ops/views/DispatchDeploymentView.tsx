"use client";

import React, { useState } from "react";
import { Booking, Tour, Vehicle, Crew, TourStatus } from "@/types/travelOps";
import {
  Send,
  Layers,
  Truck,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar,
  Compass,
  CheckSquare,
  Square,
  Plus,
  Edit,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

export type DeploymentStatus = "Planning" | "Missing Resource" | "Ready" | "Dispatched" | "Cancelled";

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
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold uppercase tracking-wider">
              Dispatcher Control Command
            </span>
            <span className="text-xs text-slate-400 font-mono">/dispatch/deployment</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Dispatch & Deployment Planning Hub
          </h1>
          <p className="text-xs text-slate-400">
            Group incoming reservation bookings into departures and allocate operational vehicles, drivers, tour managers & guides.
          </p>
        </div>

        {selectedBookingIds.length > 0 && (
          <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-2 rounded-xl animate-pulse">
            <span className="text-xs font-bold text-cyan-400">
              {selectedBookingIds.length} Bookings Selected
            </span>
            <button
              onClick={() => onOpenGroupModal(selectedBookingIds)}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-extrabold shadow cursor-pointer transition-all"
            >
              + Create Grouped Departure
            </button>
          </div>
        )}
      </div>

      {/* TOP KPI CARDS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* KPI 1: Unassigned Bookings */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Unassigned Bookings</span>
          <div className="text-2xl font-extrabold text-white font-mono">{unassignedBookingsCount}</div>
          <span className="text-[10px] text-slate-400">Awaiting Grouping</span>
        </div>

        {/* KPI 2: Need Grouping */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Need Grouping</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{needGroupingCount}</div>
          <span className="text-[10px] text-emerald-400 font-medium">Pending Review</span>
        </div>

        {/* KPI 3: Need Resource */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Need Resource</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{needResourceCount}</div>
          <span className="text-[10px] text-amber-400 font-medium">Missing Veh / Driver</span>
        </div>

        {/* KPI 4: Pending Deployment */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Pending Deployment</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{pendingDeploymentCount}</div>
          <span className="text-[10px] text-cyan-400 font-medium">Planning Stage</span>
        </div>

        {/* KPI 5: Ready to Deploy */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Ready to Deploy</span>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">{readyToDeployCount}</div>
          <span className="text-[10px] text-purple-400 font-medium">Crew/Fleet Matched</span>
        </div>

        {/* KPI 6: Issues */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Issues / Delays</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">{issuesCount}</div>
          <span className="text-[10px] text-rose-400 font-medium">Ferry / Maintenance</span>
        </div>
      </div>

      {/* WORKSPACE SECTION 1: BOOKING GROUPING WORKSPACE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" /> Dispatcher Booking Grouping Workspace
            </h2>
            <p className="text-xs text-slate-400">
              Conceptually group incoming customer reservations into operational departures by origin, destination, or drop-off point.
            </p>
          </div>

          {/* Grouping Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setGroupingTab("departure")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                groupingTab === "departure"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Group by Departure
            </button>
            <button
              onClick={() => setGroupingTab("destination")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                groupingTab === "destination"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Group by Destination
            </button>
            <button
              onClick={() => setGroupingTab("dropoff")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                groupingTab === "dropoff"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Group by Drop-off
            </button>
          </div>
        </div>

        {/* Grouping Buckets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Object.keys(buckets).length === 0 ? (
            <div className="col-span-full text-center py-8 text-slate-500 text-xs italic">
              All bookings are currently grouped into active operational tours!
            </div>
          ) : (
            Object.keys(buckets).map((bucketName) => {
              const bucketBookings = buckets[bucketName];
              const bucketPax = bucketBookings.reduce((sum, b) => sum + b.pax, 0);

              return (
                <div
                  key={bucketName}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                      <span className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {bucketName}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {bucketPax} Pax ({bucketBookings.length} Bks)
                      </span>
                    </div>

                    {/* Booking Cards in Bucket */}
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {bucketBookings.map((b) => {
                        const isSelected = selectedBookingIds.includes(b.id);
                        return (
                          <div
                            key={b.id}
                            onClick={() => toggleSelectBooking(b.id)}
                            className={`p-2.5 rounded-lg border text-xs space-y-1.5 cursor-pointer transition-all ${
                              isSelected
                                ? "bg-blue-950/60 border-blue-500/60 ring-1 ring-blue-500/30"
                                : "bg-slate-900 border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <span className="font-mono text-[10px] font-bold text-slate-400">{b.id}</span>
                                <div className="font-bold text-slate-100">
                                  {b.greeting} {b.guestName} ({b.pax} Pax)
                                </div>
                              </div>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${
                                  b.source === "GetYourGuide"
                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                    : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                }`}
                              >
                                {b.source}
                              </span>
                            </div>

                            <div className="text-[10px] text-slate-300 font-medium truncate" title={b.product}>
                              {b.product}
                            </div>

                            <div className="text-[10px] text-slate-400 flex items-center justify-between">
                              <span>{b.origin} → {b.dropOff}</span>
                              <span className="font-mono text-emerald-400">{b.tourDate}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bucket Quick Group Action */}
                  <button
                    onClick={() => onOpenGroupModal(bucketBookings.map((b) => b.id))}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-1.5 rounded-lg font-bold border border-slate-700 transition-colors cursor-pointer"
                  >
                    + Group All in {bucketName}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* WORKSPACE SECTION 2: DEPLOYMENT PLANNING BOARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" /> Operational Deployment Board
            </h2>
            <p className="text-xs text-slate-400">
              Planner table for matching vehicles, drivers, tour managers, and guides to tour departures.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Filter Board:</span>
            <select
              value={deploymentFilter}
              onChange={(e) => setDeploymentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="ALL">All Tours ({tours.length})</option>
              <option value="Missing Resource">Missing Resource</option>
              <option value="Planning">Planning Stage</option>
              <option value="Ready">Ready for Deployment</option>
              <option value="Dispatched">Dispatched / En Route</option>
            </select>
          </div>
        </div>

        {/* Planning Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Tour ID & Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Pax</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Driver</th>
                <th className="p-3">TM</th>
                <th className="p-3">Guide</th>
                <th className="p-3">Deployment Status</th>
                <th className="p-3 text-right">Assign Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTours.map((tour) => {
                const vehicle = vehicles.find((v) => v.id === tour.vehicleId);
                const driver = crews.find((c) => c.id === tour.driverId);
                const guide = crews.find((c) => c.id === tour.guideId);
                const tm = crews.find((c) => c.id === tour.tourManagerId);

                const isMissingResource = !vehicle || !driver || !guide;
                const deploymentStatusStr: DeploymentStatus =
                  tour.status === "Departed" || tour.status === "On Trip" || tour.status === "In Transit"
                    ? "Dispatched"
                    : tour.status === "Ready"
                    ? "Ready"
                    : isMissingResource
                    ? "Missing Resource"
                    : "Planning";

                return (
                  <tr key={tour.id} className="ops-table-row hover:bg-slate-850/60 transition-colors">
                    {/* Tour ID & Name */}
                    <td className="p-3 max-w-[200px]">
                      <div className="font-mono text-[10px] font-bold text-cyan-400">{tour.id}</div>
                      <div className="font-bold text-slate-100 truncate" title={tour.tourName}>
                        {tour.tourName}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-3 font-mono text-slate-300 whitespace-nowrap">{tour.date}</td>

                    {/* Pax */}
                    <td className="p-3">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {tour.pax} Pax
                      </span>
                    </td>

                    {/* Origin */}
                    <td className="p-3 text-slate-300 font-medium whitespace-nowrap">{tour.origin}</td>

                    {/* Destination */}
                    <td className="p-3 max-w-[160px] truncate" title={tour.destination}>
                      {tour.destination}
                    </td>

                    {/* Vehicle */}
                    <td className="p-3">
                      {vehicle ? (
                        <div>
                          <span className="font-mono font-bold text-amber-300 block">{vehicle.plateNumber}</span>
                          <span className="text-[10px] text-slate-400">{vehicle.model}</span>
                        </div>
                      ) : (
                        <span className="text-red-400 font-bold text-[10px] bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                          Needs Vehicle
                        </span>
                      )}
                    </td>

                    {/* Driver */}
                    <td className="p-3">
                      {driver ? (
                        <span className="font-medium text-slate-200">{driver.name.split(" ")[0]}</span>
                      ) : (
                        <span className="text-red-400 font-bold text-[10px]">Needs Driver</span>
                      )}
                    </td>

                    {/* TM */}
                    <td className="p-3">
                      {tm ? (
                        <span className="font-medium text-slate-200">{tm.name.split(" ")[0]}</span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">-</span>
                      )}
                    </td>

                    {/* Guide */}
                    <td className="p-3">
                      {guide ? (
                        <span className="font-medium text-slate-200">{guide.name.split(" ")[0]}</span>
                      ) : (
                        <span className="text-amber-400 font-bold text-[10px]">Needs Guide</span>
                      )}
                    </td>

                    {/* Deployment Status */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          deploymentStatusStr === "Ready"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : deploymentStatusStr === "Dispatched"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : deploymentStatusStr === "Missing Resource"
                            ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {deploymentStatusStr}
                      </span>
                    </td>

                    {/* Assign Action */}
                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenAssignModal(tour.id)}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] px-3 py-1 rounded-lg font-bold shadow transition-colors cursor-pointer"
                      >
                        Assign Resources
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
