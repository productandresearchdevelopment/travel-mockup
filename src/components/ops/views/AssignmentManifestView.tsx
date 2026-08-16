"use client";

import React, { useState } from "react";
import { Manifest, Tour, Vehicle, Crew } from "@/types/travelOps";
import {
  ClipboardList,
  CheckCircle2,
  Printer,
  Edit,
  Truck,
  Users,
  Building,
  Anchor,
  FileText,
  Search,
} from "lucide-react";

interface AssignmentManifestViewProps {
  manifests: Manifest[];
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  onOpenAssignModal: (tourId: string) => void;
  onOpenManifestPreview: (manifest: Manifest) => void;
}

export const AssignmentManifestView: React.FC<AssignmentManifestViewProps> = ({
  manifests,
  tours,
  vehicles,
  crews,
  onOpenAssignModal,
  onOpenManifestPreview,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredManifests = manifests.filter((m) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = m.id.toLowerCase().includes(q);
      const matchTour = m.tourId.toLowerCase().includes(q);
      const matchGuest = m.passengers.some((p) => p.guestName.toLowerCase().includes(q));
      if (!matchId && !matchTour && !matchGuest) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-400" /> Manifest & Crew / Vehicle Assignment
          </h2>
          <p className="text-xs text-slate-400">
            Generate operational passenger manifests connecting Tours, Vehicles, Drivers, Tour Managers, Local Guides, Hotel Vouchers & ASDP Ferry tickets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Manifest ID, Tour ID, Guest..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Manifest Cards Grid */}
      <div className="space-y-4">
        {filteredManifests.map((manifest) => {
          const tour = tours.find((t) => t.id === manifest.tourId);
          const vehicle = vehicles.find((v) => v.id === manifest.vehicleId);
          const driver = crews.find((c) => c.id === manifest.driverId);
          const tourManager = crews.find((c) => c.id === manifest.tourManagerId);
          const guide = crews.find((c) => c.id === manifest.guideId);

          const totalPax = manifest.passengers.reduce((sum, p) => sum + p.pax, 0);

          return (
            <div
              key={manifest.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-lg hover:border-purple-500/30 transition-all"
            >
              {/* Card Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded">
                    {manifest.id}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {tour ? tour.tourName : `Tour ${manifest.tourId}`}
                    </h3>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>Tour ID: <strong className="text-slate-200">{manifest.tourId}</strong></span>
                      <span>•</span>
                      <span>Total Passengers: <strong className="text-emerald-400">{totalPax} Pax</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      manifest.status === "Complete"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    Status: {manifest.status}
                  </span>

                  <button
                    onClick={() => onOpenAssignModal(manifest.tourId)}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Assignment</span>
                  </button>

                  <button
                    onClick={() => onOpenManifestPreview(manifest)}
                    className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Manifest</span>
                  </button>
                </div>
              </div>

              {/* Assignment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                {/* Vehicle Box */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Assigned Vehicle
                  </div>
                  {vehicle ? (
                    <div>
                      <div className="font-mono font-bold text-amber-300 text-sm">{vehicle.plateNumber}</div>
                      <div className="text-slate-300 font-medium">{vehicle.brand} {vehicle.model}</div>
                      <div className="text-[10px] text-slate-400">Cap: {vehicle.capacity} Pax ({vehicle.ownership})</div>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">No vehicle assigned</div>
                  )}
                </div>

                {/* Driver Box */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-400" /> Driver & Tour Manager
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-[10px] text-slate-500">Driver: </span>
                      <span className="font-semibold text-slate-200">{driver ? driver.name : "Unassigned"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Tour Manager: </span>
                      <span className="font-semibold text-slate-200">{tourManager ? tourManager.name : "Unassigned"}</span>
                    </div>
                  </div>
                </div>

                {/* Local Guide Box */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Local Guide & Jeep
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-[10px] text-slate-500">Guide: </span>
                      <span className="font-semibold text-slate-200">{guide ? guide.name : "Local Guide"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Jeep Provider: </span>
                      <span className="text-emerald-400 font-medium truncate block">{tour?.jeepProvider || "Bromo Paguyuban Jeep"}</span>
                    </div>
                  </div>
                </div>

                {/* Accommodation & Ferry Box */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-cyan-400" /> Hotels & Ferry Shuttle
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div className="truncate" title={manifest.hotel}>
                      <span className="text-slate-500">Hotel: </span>{manifest.hotel}
                    </div>
                    <div className="truncate text-cyan-400" title={manifest.ferryDetails}>
                      <span className="text-slate-500">Ferry: </span>{manifest.ferryDetails || "ASDP Ketapang Ferry"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Passengers Table Summary */}
              <div className="bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden">
                <div className="bg-slate-900/60 px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Passenger Roster ({manifest.passengers.length} Bookings / {totalPax} Guest Pax)
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800">
                      <th className="p-2">Guest Name</th>
                      <th className="p-2">Passport Status</th>
                      <th className="p-2">Phone</th>
                      <th className="p-2">Pickup Point</th>
                      <th className="p-2">Drop-Off Point</th>
                      <th className="p-2">Special Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {manifest.passengers.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-2 font-semibold text-slate-200">
                          {p.greeting} {p.guestName} ({p.pax} Pax)
                        </td>
                        <td className="p-2">
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                            {p.passportStatus}
                          </span>
                        </td>
                        <td className="p-2 text-slate-400 font-mono">{p.phone}</td>
                        <td className="p-2 text-slate-300">{p.pickupLocation}</td>
                        <td className="p-2 text-slate-300">{p.dropOff}</td>
                        <td className="p-2 text-amber-300 italic">{p.specialRequests || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
