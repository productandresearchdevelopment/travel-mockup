"use client";

import React, { useState } from "react";
import { Tour, Vehicle, Crew, Booking, FinanceExpense, ActivityHistoryItem } from "@/types/travelOps";
import { useAuth } from "@/context/AuthContext";
import { canPerformAction } from "@/data/actionRules";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Truck,
  User,
  Users,
  DollarSign,
  FileText,
  AlertTriangle,
  Send,
  History,
  Anchor,
} from "lucide-react";

interface TourDetailFullViewProps {
  tour: Tour;
  vehicle?: Vehicle;
  driver?: Crew;
  guide?: Crew;
  tourManager?: Crew;
  bookings?: Booking[];
  vehicles?: Vehicle[];
  crews?: Crew[];
  expenses?: FinanceExpense[];
  onBack: () => void;
  onConfirmHandover?: (tourId: string) => void;
}

export const TourDetailFullView: React.FC<TourDetailFullViewProps> = ({
  tour: initialTour,
  vehicle,
  driver,
  guide,
  tourManager,
  onBack,
}) => {
  const { user } = useAuth();
  const [tour, setTour] = useState<Tour>(initialTour);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const initialHistory: ActivityHistoryItem[] = tour.activityHistory || [
    {
      id: "ACT-101",
      type: "created",
      title: "Operational Tour Created",
      description: `Tour batch generated for ${tour.destination}`,
      userId: "USR-003",
      timestamp: tour.date + " 06:00",
    },
    {
      id: "ACT-102",
      type: "planned",
      title: "Resource Assignment Complete",
      description: `Assigned Vehicle ${tour.vehicleId || "VH-001"} & Driver ${driver?.name || "Andi Pratama"}`,
      userId: "USR-003",
      timestamp: tour.date + " 07:30",
    },
    {
      id: "ACT-103",
      type: "departed",
      title: "Excursion Departed",
      description: `Vehicle departed from ${tour.origin}`,
      userId: "USR-003",
      timestamp: tour.date + " 08:00",
    },
  ];

  const [history, setHistory] = useState<ActivityHistoryItem[]>(initialHistory);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateTourStatus = (newStatus: any, statusLabel: string, actionTitle: string) => {
    const updated: Tour = {
      ...tour,
      status: newStatus,
      statusLabel,
      lastUpdate: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setTour(updated);

    const newActivity: ActivityHistoryItem = {
      id: `ACT-${Date.now()}`,
      type: newStatus.toLowerCase(),
      title: actionTitle,
      description: `Tour ${tour.id} updated to '${statusLabel}' by ${user?.name || "Operation Manager"}`,
      userId: user?.id || "USR-001",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setHistory([newActivity, ...history]);
    showToast(`Success: Tour ${tour.id} updated to '${statusLabel}'`);
  };

  const canConfirmDeparture = canPerformAction(user?.role, "tour.confirmDeparture");
  const canConfirmArrival = canPerformAction(user?.role, "tour.confirmArrival");
  const canConfirmHandover = canPerformAction(user?.role, "tour.confirmHandover");
  const canComplete = canPerformAction(user?.role, "tour.completeTour");

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Tour List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  {tour.id}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ● {tour.statusLabel || tour.status}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-white mt-1">
                {tour.tourName} ({tour.pax} Pax) — {tour.origin} → {tour.destination}
              </h1>
            </div>
          </div>

          {/* Role Guarded Actions */}
          <div className="flex items-center gap-2 text-xs">
            {canConfirmDeparture && tour.status !== "Departed" && tour.status !== "On Trip" && (
              <button
                onClick={() => handleUpdateTourStatus("Departed", "Departed", "Departure Confirmed")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg font-bold shadow cursor-pointer transition-colors"
              >
                Confirm Departure
              </button>
            )}

            {canConfirmHandover && (
              <button
                onClick={() => handleUpdateTourStatus("Handover", "Inter-Region Handover", "Handover Verified")}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 rounded-lg font-bold shadow cursor-pointer transition-colors"
              >
                Confirm Ferry Handover
              </button>
            )}

            {canConfirmArrival && tour.status !== "Arrived" && (
              <button
                onClick={() => handleUpdateTourStatus("Arrived", "Arrived at Destination", "Arrival Confirmed")}
                className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-lg font-bold shadow cursor-pointer transition-colors"
              >
                Confirm Arrival
              </button>
            )}

            {canComplete && tour.status !== "Completed" && (
              <button
                onClick={() => handleUpdateTourStatus("Completed", "Tour Completed & Closed", "Tour Closed")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-lg font-bold cursor-pointer transition-colors"
              >
                Complete Tour
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RECOUPLING SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block text-[10px]">Vehicle Assigned</span>
          <span className="font-mono font-bold text-amber-300 text-sm">{vehicle ? `${vehicle.plateNumber} (${vehicle.brand})` : tour.vehicleId || "VH-001"}</span>
          <span className="text-[10px] text-slate-400 block">Cap: {vehicle?.capacity || 14} Pax</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Crew Roster</span>
          <span className="font-bold text-white text-sm block">Driver: {driver?.name || "Andi Pratama"}</span>
          <span className="text-[10px] text-emerald-400 block">Guide: {guide?.name || "Bambang Sugeng"}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Checkpoints Progress</span>
          <span className="font-mono font-bold text-cyan-400 text-sm block">3 / 4 Checkpoints Passed</span>
          <span className="text-[10px] text-slate-400 block">Last Check: Probolinggo Checkpoint</span>
        </div>
      </div>

      {/* ACTIVITY TIMELINE SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-lg text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" /> Tour Execution Audit Timeline & State History
        </h2>

        <div className="space-y-3 pl-2 border-l-2 border-slate-800 ml-2">
          {history.map((act) => (
            <div key={act.id} className="relative pl-6 space-y-1">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{act.title}</span>
                <span className="font-mono text-slate-400 text-[10px]">{act.timestamp}</span>
              </div>
              <p className="text-slate-400 italic text-[11px]">{act.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
