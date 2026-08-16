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
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
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
  { id: "Planning", title: "Planning / Unassigned", color: "text-slate-400", bg: "border-slate-800" },
  { id: "Ready", title: "Ready for Deployment", color: "text-emerald-400", bg: "border-emerald-500/30" },
  { id: "Departed", title: "Departed / En Route", color: "text-cyan-400", bg: "border-cyan-500/30" },
  { id: "On Trip", title: "On Trip Execution", color: "text-blue-400", bg: "border-blue-500/30" },
  { id: "Handover", title: "Inter-Region Handover", color: "text-purple-400", bg: "border-purple-500/30" },
  { id: "Completed", title: "Arrived & Completed", color: "text-teal-400", bg: "border-teal-500/30" },
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
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" /> Dispatch & Tour Execution Control
          </h2>
          <p className="text-xs text-slate-400">
            Monitor tour departures, checkpoint clearances, and inter-island ferry handovers (Ketapang Port to Gilimanuk / Bali).
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">Filter Corridor:</span>
          <select
            value={corridorFilter}
            onChange={(e) => setCorridorFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
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
            <div key={stage.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col space-y-3">
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${stage.color}`}>
                  {stage.title}
                </span>
                <span className="font-mono text-xs font-bold bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                  {stageTours.length}
                </span>
              </div>

              {/* Stage Tour Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-1">
                {stageTours.length === 0 ? (
                  <div className="text-center py-8 text-slate-600 text-xs italic">
                    No active departures in this stage
                  </div>
                ) : (
                  stageTours.map((tour) => {
                    const vehicle = vehicles.find((v) => v.id === tour.vehicleId);
                    const driver = crews.find((c) => c.id === tour.driverId);
                    const guide = crews.find((c) => c.id === tour.guideId);
                    const passedCheckpoints = tour.checkpoints.filter((cp) => cp.status === "Passed").length;

                    return (
                      <div
                        key={tour.id}
                        className={`bg-slate-950 border ${stage.bg} p-3 rounded-lg space-y-2 hover:border-blue-500/50 transition-all shadow-md group`}
                      >
                        {/* Tour Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[11px] font-bold text-emerald-400 block">
                              {tour.id}
                            </span>
                            <h4
                              onClick={() => onSelectTour(tour.id)}
                              className="font-bold text-xs text-white group-hover:text-blue-400 cursor-pointer line-clamp-2"
                            >
                              {tour.tourName}
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                            {tour.pax} Pax
                          </span>
                        </div>

                        {/* Route Info */}
                        <div className="text-[11px] text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                          <span className="truncate">{tour.origin} → {tour.dropOff}</span>
                        </div>

                        {/* Vehicle & Crew info */}
                        <div className="bg-slate-900/80 p-2 rounded border border-slate-850 text-[10px] space-y-1">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Truck className="w-3 h-3 text-amber-400" /> Vehicle:
                            </span>
                            <span className="font-mono font-semibold text-amber-300">
                              {vehicle ? vehicle.plateNumber : "Unassigned"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Users className="w-3 h-3 text-purple-400" /> Driver/Guide:
                            </span>
                            <span className="font-medium truncate max-w-[110px]">
                              {driver ? driver.name.split(" ")[0] : "None"} / {guide ? guide.name.split(" ")[0] : "None"}
                            </span>
                          </div>
                        </div>

                        {/* Checkpoint Status */}
                        {tour.checkpoints.length > 0 && (
                          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                            <span>Checkpoints: {passedCheckpoints}/{tour.checkpoints.length} Cleared</span>
                            <span className="font-mono text-emerald-400 font-semibold">
                              {Math.round((passedCheckpoints / tour.checkpoints.length) * 100)}%
                            </span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-850 gap-1">
                          {!vehicle || !driver ? (
                            <button
                              onClick={() => onOpenAssignModal(tour.id)}
                              className="w-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] py-1 rounded font-semibold transition-colors"
                            >
                              Assign Crew & Vehicle
                            </button>
                          ) : (
                            <div className="w-full flex items-center gap-1">
                              <button
                                onClick={() => onSelectTour(tour.id)}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] py-1 rounded font-medium transition-colors"
                              >
                                View Tour Details
                              </button>

                              <select
                                value={tour.status}
                                onChange={(e) => onUpdateTourStatus(tour.id, e.target.value as TourStatus)}
                                className="bg-slate-900 text-emerald-400 border border-slate-700 text-[10px] py-1 px-1 rounded font-semibold focus:outline-none"
                              >
                                <option value="Planning">Planning</option>
                                <option value="Ready">Ready</option>
                                <option value="Departed">Departed</option>
                                <option value="On Trip">On Trip</option>
                                <option value="Handover">Handover</option>
                                <option value="Completed">Completed</option>
                                <option value="Issue">Issue</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
