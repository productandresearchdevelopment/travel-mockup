"use client";

import React, { useState } from "react";
import { Tour, Vehicle, Crew, Booking, FinanceExpense, ActivityHistoryItem } from "@/types/travelOps";
import { useAuth } from "@/context/AuthContext";
import { canPerformAction } from "@/data/actionRules";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Clock,
  Truck,
  Users,
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
  driver,
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
    showToast(`Success: Tour ${tour.id} status updated to '${statusLabel}'`);
  };

  const canConfirmHandover = canPerformAction(user?.role, "tour.confirmHandover");
  const canUpdateStatus = canPerformAction(user?.role, "tour.updateStatus");

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF] bg-[#EFF8FF] dark:bg-[rgba(83,177,253,0.12)] px-2.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/40">
                {tour.id}
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/operations/{tour.id}</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              {tour.tourName}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-xs">
          {canConfirmHandover && tour.status === "Handover" && (
            <button
              onClick={() => handleUpdateTourStatus("On Trip", "Handover Confirmed", "Ferry Handover Confirmed")}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <Anchor className="w-4 h-4" />
              <span>Confirm Ketapang Handover</span>
            </button>
          )}

          {canUpdateStatus && tour.status === "On Trip" && (
            <button
              onClick={() => handleUpdateTourStatus("Completed", "Arrived & Completed", "Tour Completed")}
              className="flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] dark:bg-[#32D583] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Tour</span>
            </button>
          )}
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* LEFT COLUMN (8 cols): Tour Checkpoints & Assigned Resources */}
        <div className="lg:col-span-8 space-y-6">
          {/* Assigned Resources Summary */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D97706] dark:text-[#FDB022]" /> Assigned Fleet & Crew
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Assigned Vehicle</span>
                <span className="font-mono font-bold text-xs text-[#172033] dark:text-white">{tour.vehicleId || "Not Assigned"}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Lead Driver</span>
                <span className="font-bold text-xs text-[#172033] dark:text-white">{tour.driverId || "Not Assigned"}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Local Guide</span>
                <span className="font-bold text-xs text-[#172033] dark:text-white">{tour.guideId || "Not Assigned"}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Passenger Pax</span>
                <span className="font-mono font-extrabold text-xs text-[#2563EB] dark:text-[#4F8CFF]">{tour.pax} Pax</span>
              </div>
            </div>
          </div>

          {/* Checkpoint Clearance Timeline */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Route Checkpoint Clearances
            </h3>

            <div className="space-y-3">
              {tour.checkpoints.map((cp, idx) => (
                <div key={idx} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${cp.status === "Passed" ? "text-[#16A34A] dark:text-[#32D583]" : "text-[#98A2B3] dark:text-[#667085]"}`} />
                    <span className="font-bold text-xs text-[#172033] dark:text-white">{cp.location}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-[#667085] dark:text-[#A7B1C0]">Sched: {cp.scheduledTime}</span>
                    <span className={`font-bold ${cp.status === "Passed" ? "text-[#16A34A] dark:text-[#32D583]" : "text-[#D97706]"}`}>
                      {cp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): History Timeline */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Tour Execution Log
            </h3>

            <div className="space-y-3 relative pl-3 border-l-2 border-[#E4E7EC] dark:border-[#202B38] ml-2">
              {history.map((act) => (
                <div key={act.id} className="relative space-y-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#4F8CFF] absolute -left-[17px] top-1"></div>
                  <div className="font-bold text-xs text-[#172033] dark:text-white">{act.title}</div>
                  <div className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">{act.description}</div>
                  <div className="text-[10px] text-[#98A2B3] dark:text-[#667085] font-mono">{act.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
