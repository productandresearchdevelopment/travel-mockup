"use client";

import React from "react";
import { PickupRecord, DropoffRecord } from "@/types/pickupDropoff";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  X,
  MapPin,
  Clock,
  Truck,
  User,
  AlertTriangle,
  CheckCircle2,
  Ticket,
  ExternalLink,
  FileText,
  Phone,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface PickupDropoffDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  record: (PickupRecord | DropoffRecord) | null;
  type: "pickup" | "dropoff";
  onOpenUpdateModal?: () => void;
}

export function PickupDropoffDetailDrawer({
  isOpen,
  onClose,
  record,
  type,
  onOpenUpdateModal,
}: PickupDropoffDetailDrawerProps) {
  if (!isOpen || !record) return null;

  const isPickup = type === "pickup";
  const pickupRec = isPickup ? (record as PickupRecord) : null;
  const dropoffRec = !isPickup ? (record as DropoffRecord) : null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
      case "Issued":
      case "Ticket Issued":
        return <Badge variant="emerald">✓ {status}</Badge>;
      case "Delayed":
        return <Badge variant="amber">⚠️ Delayed</Badge>;
      case "On The Way":
      case "In Transit":
        return <Badge variant="blue">● {status}</Badge>;
      case "Scheduled":
      case "Booked":
        return <Badge variant="violet">○ {status}</Badge>;
      case "Missed":
      case "Cancelled":
      case "Failed":
        return <Badge variant="danger">✕ {status}</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#101726] border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col font-sans text-slate-800 dark:text-slate-200 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex items-center justify-between sticky top-0 z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {isPickup ? "PICKUP OPERATIONAL RECORD" : "DROP-OFF OPERATIONAL RECORD"}
              </span>
              {getStatusBadge(record.status)}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {record.code} — {record.guestName}
            </h2>
            <span className="text-xs font-mono text-slate-500 block">
              Trip: {record.tripCode} · {record.groupName} · {record.pax} Pax
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* LOCATION MISMATCH ALERT BANNER */}
          {pickupRec?.hasLocationMismatch && (
            <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 flex items-start gap-2.5 font-mono">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <strong className="block text-xs font-bold text-rose-700 dark:text-rose-400 uppercase">
                  ⚠️ LOCATION MISMATCH DETECTED
                </strong>
                <span className="text-[11px] block">
                  Planned location was <strong>{pickupRec.plannedLocation.name}</strong>, but actual pickup took place at <strong>{pickupRec.actualLocation?.name}</strong>. Both records preserved.
                </span>
              </div>
            </div>
          )}

          {/* SECTION 1: GUEST INFORMATION */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <User className="w-4 h-4 text-indigo-600" /> Guest & Booking Information
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">GUEST NAME</span>
                <strong className="text-slate-900 dark:text-slate-100 block text-sm">{record.guestName}</strong>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">ASSIGNED GROUP & PAX</span>
                <strong className="text-indigo-600 dark:text-indigo-400 block text-sm">{record.groupName} ({record.pax} Pax)</strong>
              </div>
            </div>
          </div>

          {/* SECTION 2: SCHEDULE (PLANNED VS ACTUAL & AUTOMATED DELAY) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Clock className="w-4 h-4 text-indigo-600" /> Execution Schedule (Planned vs Actual)
            </h3>

            {isPickup && pickupRec && (
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">PLANNED TIME</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-base block">{pickupRec.plannedTime}</strong>
                  <span className="text-[9px] text-slate-400 block">{pickupRec.date}</span>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">ACTUAL TIME</span>
                  <strong className="text-indigo-600 dark:text-indigo-400 text-base block">
                    {pickupRec.actualTime || "—:—"}
                  </strong>
                  <span className="text-[9px] text-slate-400 block">Recorded by Driver</span>
                </div>

                <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-1">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block">DELAY DURATION</span>
                  <strong className="text-amber-600 dark:text-amber-400 text-base block">
                    {pickupRec.delayMinutes > 0
                      ? `+${pickupRec.delayMinutes} min`
                      : pickupRec.delayMinutes < 0
                      ? `${pickupRec.delayMinutes} min`
                      : "On Time"}
                  </strong>
                  <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold block">
                    {pickupRec.delayStatus}
                  </span>
                </div>
              </div>
            )}

            {!isPickup && dropoffRec && dropoffRec.method === "Vehicle" && (
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">PLANNED DROP-OFF</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-base block">{dropoffRec.plannedDropoffTime || "18:30"}</strong>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">ACTUAL DROP-OFF</span>
                  <strong className="text-indigo-600 dark:text-indigo-400 text-base block">{dropoffRec.actualDropoffTime || "18:42"}</strong>
                </div>

                <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-1">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block">DELAY</span>
                  <strong className="text-amber-600 dark:text-amber-400 text-base block">
                    +{(dropoffRec.delayMinutes || 12)} min
                  </strong>
                  <span className="text-[9px] text-amber-600 font-bold block">Delayed</span>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: LOCATION (PLANNED VS ACTUAL LOCATION) */}
          {isPickup && pickupRec && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-indigo-600" /> Location Details
              </h3>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">PLANNED LOCATION</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-sm block">{pickupRec.plannedLocation.name}</strong>
                  <span className="text-slate-500 text-[11px] block">{pickupRec.plannedLocation.address}, {pickupRec.plannedLocation.city}</span>
                  {pickupRec.plannedLocation.instructions && (
                    <span className="text-indigo-600 dark:text-indigo-400 text-[10px] block pt-1 font-sans">
                      Note: {pickupRec.plannedLocation.instructions}
                    </span>
                  )}
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${
                  pickupRec.hasLocationMismatch
                    ? "border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]"
                }`}>
                  <span className="text-[10px] text-slate-400 font-bold block">ACTUAL LOCATION</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-sm block">
                    {pickupRec.actualLocation?.name || pickupRec.plannedLocation.name}
                  </strong>
                  <span className="text-slate-500 text-[11px] block">
                    {pickupRec.actualLocation?.address || pickupRec.plannedLocation.address}
                  </span>
                  {pickupRec.hasLocationMismatch && (
                    <Badge variant="danger" className="text-[9px]">
                      ⚠️ Location Mismatch Preserved
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <Button variant="outline" size="sm" leftIcon={<MapPin className="w-3.5 h-3.5 text-blue-600" />}>
                  View on Map (GPS Lat/Lng)
                </Button>
              </div>
            </div>
          )}

          {/* SECTION 4: TRANSPORT / TICKET METHOD */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              {dropoffRec?.method === "Ticket" ? (
                <><Ticket className="w-4 h-4 text-purple-600" /> Ticket-Based Drop-off Information</>
              ) : (
                <><Truck className="w-4 h-4 text-indigo-600" /> Vehicle & Driver Assignment</>
              )}
            </h3>

            {/* VEHICLE BASED */}
            {(isPickup || dropoffRec?.method === "Vehicle") && (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2 font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ASSIGNED VEHICLE</span>
                    <strong className="text-blue-600 dark:text-blue-400 text-sm block">
                      {isPickup ? pickupRec?.vehicleName : dropoffRec?.vehicleName}
                    </strong>
                    <span className="text-slate-500 text-[11px] block">
                      Plate: {isPickup ? pickupRec?.vehiclePlate : dropoffRec?.vehiclePlate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ASSIGNED DRIVER</span>
                    <strong className="text-slate-900 dark:text-slate-100 text-sm block">
                      {isPickup ? pickupRec?.driverName : dropoffRec?.driverName}
                    </strong>
                    <span className="text-indigo-600 dark:text-indigo-400 text-[11px] block flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {isPickup ? pickupRec?.driverPhone : dropoffRec?.driverPhone}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TICKET BASED */}
            {!isPickup && dropoffRec?.method === "Ticket" && (
              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20 space-y-3 font-mono">
                <div className="flex justify-between items-center pb-2 border-b border-purple-200 dark:border-purple-800">
                  <div>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold block">
                      TRANSPORT TYPE & PROVIDER
                    </span>
                    <strong className="text-slate-900 dark:text-slate-100 text-sm block">
                      {dropoffRec.transportType} — {dropoffRec.provider}
                    </strong>
                  </div>
                  <Badge variant={dropoffRec.ticketStatus === "Issued" ? "emerald" : "amber"}>
                    {dropoffRec.ticketStatus === "Issued" ? "✓ Ticket Issued" : "● Ticket Pending"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ROUTE & DEPARTURE</span>
                    <strong className="text-slate-900 dark:text-slate-100 block">{dropoffRec.route}</strong>
                    <span className="text-slate-500 block">{dropoffRec.departureDate} @ {dropoffRec.departureTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">BOOKING REFERENCE</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 block">{dropoffRec.bookingReference || "Pending"}</strong>
                    <span className="text-slate-500 block">Status: {dropoffRec.bookingStatus}</span>
                  </div>
                </div>

                {dropoffRec.ticketAttachmentUrl && (
                  <div className="pt-2 border-t border-purple-200 dark:border-purple-800 flex justify-end">
                    <Button variant="outline" size="sm" leftIcon={<ExternalLink className="w-3.5 h-3.5 text-purple-600" />}>
                      View E-Ticket PDF / Attachment
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* OPERATIONAL NOTES */}
          {record.notes && (
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1 font-mono">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">OPERATIONAL NOTES</span>
              <p className="text-slate-700 dark:text-slate-300 text-xs font-sans">{record.notes}</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex justify-between gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Panel
          </Button>
          {onOpenUpdateModal && (
            <Button variant="primary" size="sm" onClick={onOpenUpdateModal}>
              Update Status / Schedule
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
