"use client";

import React from "react";
import { Booking } from "@/types/travelOps";
import { X, Calendar, MapPin, Phone, CreditCard, ShieldCheck, UserCheck, Layers, FileText } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                {booking.id}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Booking Detail Record</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guest Information Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Primary Guest & Identity
            </div>
            <div className="flex items-center justify-between">
              <div className="font-bold text-base text-white">
                {booking.greeting} {booking.guestName}
              </div>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                  booking.passportStatus === "Verified"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                }`}
              >
                Passport: {booking.passportStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-900">
              <div>
                <span className="text-slate-500 block">Phone Number</span>
                <span className="font-mono font-semibold text-slate-200">{booking.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Pax Count & Type</span>
                <span className="font-bold text-emerald-400">{booking.pax} Pax ({booking.tourType})</span>
              </div>
            </div>
          </div>

          {/* Product & Route Info */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Product & Pickup Route
            </div>
            <div className="font-semibold text-sm text-slate-100">{booking.product}</div>

            <div className="space-y-2 pt-2 border-t border-slate-900">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Pickup Location & Time:</span>
                  <span className="font-medium">{booking.pickupLocation}</span> ({booking.pickupTime} WIB)
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Tour Date & Route Corridor:</span>
                  <span className="font-mono font-semibold text-white">{booking.tourDate}</span> ({booking.origin} → {booking.dropOff})
                </div>
              </div>
            </div>
          </div>

          {/* Financial & Platform Source */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Platform & Billing Status
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block">Source Channel</span>
                <span className="font-bold text-amber-400">{booking.source}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Billing</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  Rp {booking.totalBilling.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
              <span className="text-slate-400">Payment Status:</span>
              <span className="font-semibold text-emerald-400">{booking.billingStatus}</span>
            </div>
          </div>

          {/* Operational Notes */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Operational Notes
            </div>
            <p className="text-slate-300 italic leading-relaxed">{booking.operationalNotes}</p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            Close
          </button>

          {booking.status === "Pending Review" && (
            <button
              onClick={() => {
                onGroupBooking(booking.id);
                onClose();
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-xs font-bold transition-colors shadow-lg"
            >
              + Add to Grouped Tour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
