"use client";

import React, { useState } from "react";
import { Manifest, Tour, Vehicle, Crew } from "@/types/travelOps";
import {
  ClipboardList,
  Printer,
  Edit,
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
    <div className="space-y-4 font-sans">
      {/* Header Bar */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#172033] dark:text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Manifest & Resource Roster
          </h2>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Generate operational passenger manifests connecting Tours, Vehicles, Drivers, Tour Managers, Local Guides, Hotel Vouchers & ASDP Ferry tickets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Manifest ID, Tour ID, Guest..."
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#172033] dark:text-[#F8FAFC]"
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
          const guide = crews.find((c) => c.id === manifest.guideId);

          const totalPax = manifest.passengers.reduce((sum, p) => sum + p.pax, 0);

          return (
            <div
              key={manifest.id}
              className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl p-5 space-y-4 shadow-xs text-xs"
            >
              {/* Card Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 px-2.5 py-1 rounded-lg">
                    {manifest.id}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-[#172033] dark:text-white">
                      {tour ? tour.tourName : `Tour ${manifest.tourId}`}
                    </h3>
                    <div className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">
                      Tour Ref: <span className="font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{manifest.tourId}</span> • Total Pax: <span className="font-bold text-[#172033] dark:text-white">{totalPax} Passengers</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAssignModal(manifest.tourId)}
                    className="flex items-center gap-1.5 bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] text-[#172033] dark:text-[#F8FAFC] border border-[#E4E7EC] dark:border-[#202B38] px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#4F8CFF]" />
                    <span>Edit Assignment</span>
                  </button>

                  <button
                    onClick={() => onOpenManifestPreview(manifest)}
                    className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white px-3.5 py-1.5 rounded-xl font-bold shadow-xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Preview & Print Manifest</span>
                  </button>
                </div>
              </div>

              {/* Resource Roster Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                  <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Assigned Vehicle</span>
                  <span className="font-bold text-[#172033] dark:text-white">{vehicle ? `${vehicle.plateNumber} (${vehicle.brand} ${vehicle.model})` : "Not Assigned"}</span>
                </div>

                <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                  <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Lead Driver</span>
                  <span className="font-bold text-[#172033] dark:text-white">{driver ? driver.name : "Not Assigned"}</span>
                </div>

                <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                  <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Local Guide</span>
                  <span className="font-bold text-[#172033] dark:text-white">{guide ? guide.name : "Not Assigned"}</span>
                </div>

                <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                  <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Manifest Status</span>
                  <span className="font-bold text-[#16A34A] dark:text-[#32D583]">{manifest.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
