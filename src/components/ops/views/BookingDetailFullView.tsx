"use client";

import React, { useState } from "react";
import { Booking, Tour, Vehicle, Crew, ActivityHistoryItem } from "@/types/travelOps";
import { useAuth } from "@/context/AuthContext";
import { canPerformAction } from "@/data/actionRules";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  DollarSign,
  FileText,
  Send,
  AlertTriangle,
  History,
  Tag,
  CheckSquare,
  XCircle,
} from "lucide-react";

interface BookingDetailFullViewProps {
  booking: Booking;
  tours: Tour[];
  vehicles?: Vehicle[];
  crews?: Crew[];
  onBack: () => void;
  onAssignToTour: (bookingId: string) => void;
}

export const BookingDetailFullView: React.FC<BookingDetailFullViewProps> = ({
  booking: initialBooking,
  tours,
  onBack,
  onAssignToTour,
}) => {
  const { user } = useAuth();
  const [booking, setBooking] = useState<Booking>(initialBooking);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const assignedTour = tours.find((t) => t.id === booking.groupedTourId);

  const initialHistory: ActivityHistoryItem[] = booking.activityHistory || [
    {
      id: "ACT-001",
      type: "created",
      title: "Booking Ingested",
      description: `Reservation received from ${booking.source}`,
      userId: "USR-003",
      timestamp: booking.bookingDate + " 08:15",
    },
    ...(booking.groupedTourId
      ? [
          {
            id: "ACT-002",
            type: "assigned",
            title: "Assigned to Operational Tour",
            description: `Matched to departure ${booking.groupedTourId}`,
            userId: "USR-003",
            timestamp: booking.bookingDate + " 09:25",
          },
        ]
      : []),
  ];

  const [history, setHistory] = useState<ActivityHistoryItem[]>(initialHistory);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateStatus = (newStatus: any, statusLabel: string, actionTitle: string) => {
    const updated: Booking = {
      ...booking,
      status: newStatus,
      statusLabel,
      updatedAt: new Date().toISOString(),
    };
    setBooking(updated);

    const newActivity: ActivityHistoryItem = {
      id: `ACT-${Date.now()}`,
      type: newStatus.toLowerCase(),
      title: actionTitle,
      description: `Status updated to '${statusLabel}' by ${user?.name || "Dispatcher"}`,
      userId: user?.id || "USR-003",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setHistory([newActivity, ...history]);
    showToast(`Success: Booking ${booking.id} updated to '${statusLabel}'`);
  };

  const canAssign = canPerformAction(user?.role, "booking.assignToTour");
  const canEdit = canPerformAction(user?.role, "booking.edit");
  const canCancel = canPerformAction(user?.role, "booking.cancel");

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
              title="Back to Booking Inbox"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  {booking.id}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    booking.source === "GetYourGuide"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  }`}
                >
                  {booking.source}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    booking.status === "Grouped" || booking.status === "Assigned to Tour"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30 font-bold animate-pulse"
                  }`}
                >
                  ● {booking.statusLabel || booking.status}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-white mt-1">
                {booking.greeting} {booking.guestName} ({booking.pax} Pax) — {booking.product}
              </h1>
            </div>
          </div>

          {/* Role Guarded Actions */}
          <div className="flex items-center gap-2 text-xs">
            {canAssign && booking.status !== "Grouped" && (
              <button
                onClick={() => {
                  onAssignToTour(booking.id);
                  handleUpdateStatus("Assigned to Tour", "Assigned to Tour", "Assigned to Departure");
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-bold shadow cursor-pointer transition-colors"
              >
                Assign to Tour
              </button>
            )}

            {canEdit && (
              <button
                onClick={() => handleUpdateStatus("Reviewed", "Reviewed & Verified", "Booking Reviewed")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg font-bold border border-slate-700 cursor-pointer"
              >
                Review Booking
              </button>
            )}

            {canCancel && (
              <button
                onClick={() => handleUpdateStatus("Cancelled", "Cancelled", "Reservation Cancelled")}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-lg font-bold cursor-pointer"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 8 INFORMATION SECTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block text-[10px]">Tour Date</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{booking.tourDate}</span>
          <span className="text-[10px] text-slate-400 block">Pickup: {booking.pickupTime} WIB</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Origin & Drop-off</span>
          <span className="font-bold text-white text-sm block truncate">{booking.origin} → {booking.dropOff}</span>
          <span className="text-[10px] text-slate-400 block">Pickup: {booking.pickupLocation}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Total Billing</span>
          <span className="font-mono font-bold text-amber-300 text-sm">Rp {booking.totalBilling.toLocaleString("id-ID")}</span>
          <span className="text-[10px] text-emerald-400 block font-semibold">{booking.billingStatus}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Assigned Operational Tour</span>
          <span className="font-mono font-bold text-cyan-400 text-sm block">
            {assignedTour ? assignedTour.id : "Unassigned"}
          </span>
          <span className="text-[10px] text-slate-400 block truncate">{assignedTour ? assignedTour.tourName : "Pending Dispatch Grouping"}</span>
        </div>
      </div>

      {/* ACTIVITY TIMELINE SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-lg text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" /> Activity & Status Lifecycle Audit Timeline
        </h2>

        <div className="space-y-3 pl-2 border-l-2 border-slate-800 ml-2">
          {history.map((act) => (
            <div key={act.id} className="relative pl-6 space-y-1">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
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
