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
    <div className="space-y-6 font-sans">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Navigation & Action Header */}
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
                {booking.id}
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/bookings/{booking.id}</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              Reservation File: {booking.greeting} {booking.guestName}
            </h1>
          </div>
        </div>

        {/* Role-Gated Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          {canAssign && (
            <button
              onClick={() => onAssignToTour(booking.id)}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Assign to Tour</span>
            </button>
          )}

          {canEdit && (
            <button
              onClick={() => handleUpdateStatus("Ready for Dispatch", "Ready for Dispatch", "Reviewed & Cleared")}
              className="flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] dark:bg-[#32D583] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Approve & Clear</span>
            </button>
          )}

          {canCancel && (
            <button
              onClick={() => handleUpdateStatus("Cancelled", "Cancelled", "Booking Cancelled")}
              className="flex items-center gap-1.5 bg-[#FEF3F2] dark:bg-[rgba(249,112,102,0.12)] text-[#B42318] dark:text-[#FDA29B] border border-rose-200/60 dark:border-rose-800/40 px-3.5 py-2 rounded-xl font-bold cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Reservation</span>
            </button>
          )}
        </div>
      </div>

      {/* TWO COLUMN GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* LEFT COLUMN (8 cols): Deep Reservation Audit & Excursion Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Guest Identity & Pickup Card */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Guest Identity & Contact Roster
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Full Name</span>
                <span className="font-bold text-sm text-[#172033] dark:text-white">{booking.greeting} {booking.guestName}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Passenger Count</span>
                <span className="font-mono font-extrabold text-sm text-[#2563EB] dark:text-[#4F8CFF]">{booking.pax} Pax</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Passport Verification</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{booking.passportStatus}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Phone / WhatsApp</span>
                <span className="font-mono text-[#172033] dark:text-white font-medium">{booking.phone}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pickup Location</span>
                <span className="text-[#172033] dark:text-white font-medium">{booking.pickupLocation}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pickup Time</span>
                <span className="font-mono text-[#172033] dark:text-white font-medium">{booking.pickupTime}</span>
              </div>
            </div>
          </div>

          {/* Excursion Product & Package Details */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Excursion Product & Corridor
            </h3>

            <div className="space-y-3">
              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-4 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex justify-between items-center">
                <div>
                  <span className="text-[#667085] dark:text-[#A7B1C0] block text-[10px]">Product Package</span>
                  <span className="font-extrabold text-base text-[#172033] dark:text-white">{booking.product}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] font-bold text-xs">
                  {booking.tourType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                  <span className="text-[#667085] dark:text-[#A7B1C0] block">Departure Origin</span>
                  <div className="font-bold text-xs text-[#172033] dark:text-white mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#4F8CFF]" />
                    <span>{booking.origin}</span>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                  <span className="text-[#667085] dark:text-[#A7B1C0] block">Final Drop-Off</span>
                  <div className="font-bold text-xs text-[#172033] dark:text-white mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A] dark:text-[#32D583]" />
                    <span>{booking.dropOff}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): Activity History Timeline */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Activity Audit Trail
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
