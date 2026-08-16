"use client";

import React, { useState } from "react";
import { Tour, TourStatus, Vehicle, Crew } from "@/types/travelOps";
import {
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Truck,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";

interface DispatchExecutionViewProps {
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  onSelectTour: (tourId: string) => void;
  onUpdateTourStatus: (tourId: string, newStatus: TourStatus) => void;
  onOpenAssignModal: (tourId: string) => void;
}

const stages: { id: TourStatus; title: string; color: string; bg: string }[] = [
  { id: "Planning", title: "Planning / Unassigned", color: "text-[#667085] dark:text-[#A7B1C0]", bg: "border-[#E4E7EC] dark:border-[#202B38]" },
  { id: "Ready", title: "Ready for Deployment", color: "text-[#16A34A] dark:text-[#32D583]", bg: "border-emerald-200/60 dark:border-emerald-800/40" },
  { id: "Departed", title: "Departed / En Route", color: "text-cyan-600 dark:text-cyan-400", bg: "border-cyan-200/60 dark:border-cyan-800/40" },
  { id: "On Trip", title: "On Trip Execution", color: "text-[#2563EB] dark:text-[#4F8CFF]", bg: "border-blue-200/60 dark:border-blue-800/40" },
  { id: "Handover", title: "Inter-Region Handover", color: "text-purple-600 dark:text-purple-400", bg: "border-purple-200/60 dark:border-purple-800/40" },
  { id: "Completed", title: "Arrived & Completed", color: "text-teal-600 dark:text-teal-400", bg: "border-teal-200/60 dark:border-teal-800/40" },
];

export const DispatchExecutionView: React.FC<DispatchExecutionViewProps> = ({
  tours,
  vehicles,
  crews,
  onSelectTour,
  onUpdateTourStatus,
  onOpenAssignModal,
}) => {
  const [corridorFilter, setCorridorFilter] = useState<string>("ALL");

  const filteredTours = tours.filter((t) => {
    if (corridorFilter !== "ALL" && !t.origin.toLowerCase().includes(corridorFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-[#172033] dark:text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-[#2563EB] dark:text-[#4F8CFF]" /> Dispatch & Tour Execution Control
          </h2>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Monitor tour departures, checkpoint clearances, and inter-island ferry handovers (Ketapang Port to Gilimanuk / Bali).
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] font-semibold">Filter Corridor:</span>
          <select
            value={corridorFilter}
            onChange={(e) => setCorridorFilter(e.target.value)}
            className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1.5 rounded-xl font-medium focus:outline-none"
          >
            <option value="ALL">All Java & Bali Routes</option>
            <option value="Yogyakarta">Yogyakarta Departures</option>
            <option value="Malang">Malang Bromo Departures</option>
            <option value="Surabaya">Surabaya Departures</option>
            <option value="Banyuwangi">Banyuwangi & Bali Handover</option>
          </select>
        </div>
      </div>

      {/* Dispatch Pipeline Matrix (Horizontal Stages) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageTours = filteredTours.filter(
            (t) => t.status === stage.id || (stage.id === "Planning" && t.status === "Unassigned")
          );

          return (
            <div key={stage.id} className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl p-3 flex flex-col space-y-3 shadow-xs">
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider ${stage.color}`}>
                  {stage.title}
                </span>
                <span className="font-mono text-xs font-bold bg-[#F9FAFB] dark:bg-[#131D28] text-[#172033] dark:text-[#F8FAFC] px-2 py-0.5 rounded-md border border-[#E4E7EC] dark:border-[#202B38]">
                  {stageTours.length}
                </span>
              </div>

              {/* Pipeline Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[620px] scrollbar-none pr-0.5">
                {stageTours.map((tour) => {
                  const assignedVehicle = vehicles.find((v) => v.id === tour.vehicleId);
                  const assignedDriver = crews.find((c) => c.id === tour.driverId);
                  const assignedGuide = crews.find((c) => c.id === tour.guideId);

                  return (
                    <div
                      key={tour.id}
                      onClick={() => onSelectTour(tour.id)}
                      className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] p-3 rounded-xl hover:border-[#2563EB] dark:hover:border-[#4F8CFF] transition-all cursor-pointer space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono font-bold text-xs text-[#2563EB] dark:text-[#4F8CFF]">{tour.id}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-[#101822] text-[#172033] dark:text-[#F8FAFC] border border-[#E4E7EC] dark:border-[#202B38]">
                          {tour.pax} Pax
                        </span>
                      </div>

                      <div className="font-bold text-xs text-[#172033] dark:text-white leading-tight">
                        {tour.tourName}
                      </div>

                      <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2563EB] dark:text-[#4F8CFF]" />
                        <span>{tour.origin} → {tour.destination}</span>
                      </div>

                      {/* Resource Assignment Badges */}
                      <div className="space-y-1 pt-1 border-t border-[#E4E7EC] dark:border-[#202B38] text-[10px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#667085] dark:text-[#A7B1C0]">Vehicle:</span>
                          {assignedVehicle ? (
                            <span className="font-mono font-semibold text-[#172033] dark:text-white">{assignedVehicle.plateNumber}</span>
                          ) : (
                            <span className="text-[#DC2626] font-bold">Unassigned</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#667085] dark:text-[#A7B1C0]">Driver:</span>
                          {assignedDriver ? (
                            <span className="text-[#172033] dark:text-white font-medium">{assignedDriver.name}</span>
                          ) : (
                            <span className="text-[#DC2626] font-bold">Unassigned</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#667085] dark:text-[#A7B1C0]">Guide:</span>
                          {assignedGuide ? (
                            <span className="text-[#172033] dark:text-white font-medium">{assignedGuide.name}</span>
                          ) : (
                            <span className="text-[#D97706] font-medium">Unassigned</span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons inside Card */}
                      <div className="pt-1 flex items-center gap-1.5">
                        {(!tour.vehicleId || !tour.driverId) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenAssignModal(tour.id);
                            }}
                            className="w-full bg-[#2563EB] dark:bg-[#4F8CFF] hover:brightness-105 text-white py-1 rounded text-[10px] font-bold shadow-xs cursor-pointer"
                          >
                            Assign Resources
                          </button>
                        )}
                        {tour.status === "Ready" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateTourStatus(tour.id, "Departed");
                            }}
                            className="w-full bg-[#16A34A] dark:bg-[#32D583] hover:brightness-105 text-white py-1 rounded text-[10px] font-bold shadow-xs cursor-pointer"
                          >
                            Confirm Departure
                          </button>
                        )}
                        {tour.status === "Departed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateTourStatus(tour.id, "On Trip");
                            }}
                            className="w-full bg-cyan-600 dark:bg-cyan-500 hover:brightness-105 text-white py-1 rounded text-[10px] font-bold shadow-xs cursor-pointer"
                          >
                            Mark On Trip
                          </button>
                        )}
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
  );
};
