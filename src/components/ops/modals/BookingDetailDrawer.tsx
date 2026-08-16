"use client";

import React from "react";
import { Booking } from "@/types/travelOps";
import { X, Layers } from "lucide-react";

interface BookingDetailDrawerProps {
  booking: Booking | null;
  onClose: () => void;
  onGroupBooking: (bookingId: string) => void;
}

export const BookingDetailDrawer: React.FC<BookingDetailDrawerProps> = ({
  booking,
  onClose,
  onGroupBooking,
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-[#172230] border-l border-[#E4E7EC] dark:border-[#202B38] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF] bg-[#EFF8FF] dark:bg-[rgba(83,177,253,0.12)] px-2.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/40">
                {booking.id}
              </span>
              <h3 className="text-lg font-bold text-[#172033] dark:text-white mt-1">Booking Detail Record</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guest Information Card */}
          <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-4 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-3">
            <div className="text-xs font-bold text-[#667085] dark:text-[#A7B1C0] uppercase tracking-wider">
              Primary Guest & Identity
            </div>
            <div className="flex items-center justify-between">
              <div className="font-bold text-base text-[#172033] dark:text-white">
                {booking.greeting} {booking.guestName}
              </div>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                  booking.passportStatus === "Verified"
                    ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                    : "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                }`}
              >
                Passport: {booking.passportStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#E4E7EC] dark:border-[#202B38]">
              <div>
                <span className="text-[#667085] dark:text-[#A7B1C0] block">Phone / WhatsApp</span>
                <span className="font-mono text-[#172033] dark:text-white font-medium">{booking.phone}</span>
              </div>
              <div>
                <span className="text-[#667085] dark:text-[#A7B1C0] block">Channel</span>
                <span className="text-[#172033] dark:text-white font-medium truncate block">{booking.source}</span>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-4 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-3 text-xs">
            <div className="text-xs font-bold text-[#667085] dark:text-[#A7B1C0] uppercase tracking-wider">
              Excursion Product Info
            </div>
            <div className="space-y-1.5">
              <div className="font-bold text-sm text-[#172033] dark:text-white">{booking.product}</div>
              <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0]">
                <span>Pax Count:</span>
                <span className="font-mono font-bold text-[#172033] dark:text-white">{booking.pax} Pax</span>
              </div>
              <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0]">
                <span>Tour Date:</span>
                <span className="font-mono font-bold text-[#172033] dark:text-white">{booking.tourDate}</span>
              </div>
              <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0]">
                <span>OTA Channel:</span>
                <span className="font-semibold text-[#2563EB] dark:text-[#4F8CFF]">{booking.source}</span>
              </div>
              <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0]">
                <span>Pickup Location:</span>
                <span className="font-medium text-[#172033] dark:text-white">{booking.pickupLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E4E7EC] dark:border-[#202B38] flex items-center gap-3">
          <button
            onClick={() => onGroupBooking(booking.id)}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Layers className="w-4 h-4" />
            <span>Group Into Excursion Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
};
