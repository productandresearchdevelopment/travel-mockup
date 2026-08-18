"use client";

import React from "react";
import { GuestTripAssignment } from "@/types/guestAssignment";
import { mockGuestsData } from "@/data/mockGuestsData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  X,
  User,
  MapPin,
  Calendar,
  Clock,
  Package,
  Truck,
  Phone,
  Globe,
  FileText,
  ShieldCheck,
  Tag,
  AlertCircle,
} from "lucide-react";

interface GuestDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: GuestTripAssignment | null;
}

export function GuestDetailDrawer({
  isOpen,
  onClose,
  assignment,
}: GuestDetailDrawerProps) {
  if (!isOpen || !assignment) return null;

  // Find linked GuestMaster profile
  const guestMaster = mockGuestsData.find(
    (g) => g.id === assignment.guestId || g.fullName === assignment.guestName
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="emerald">● Active</Badge>;
      case "Added During Trip":
        return <Badge variant="blue">● Added During Trip</Badge>;
      case "Scheduled":
        return <Badge variant="violet">○ Scheduled</Badge>;
      case "Completed":
        return <Badge variant="emerald">✓ Completed</Badge>;
      case "Cancelled":
        return <Badge variant="danger">✕ Cancelled</Badge>;
      case "No-show":
        return <Badge variant="amber">⚠️ No-show</Badge>;
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
        {/* DRAWER HEADER */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex items-center justify-between sticky top-0 z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                GUEST TRIP ASSIGNMENT DETAIL
              </span>
              {getStatusBadge(assignment.status)}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {assignment.guestName}
            </h2>
            <span className="text-xs font-mono text-slate-500 block">
              {assignment.nationality} · Passport: {assignment.passportNumber} · {assignment.pax} Pax
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* DRAWER BODY */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* ADDED MID TRIP ALERT BANNER */}
          {assignment.addedMidTrip && (
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 flex items-start gap-2.5 font-mono">
              <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold">
                  + Added During Trip at {assignment.addedLocation || "Intermediate Stop"}
                </strong>
                <span className="text-[11px] block text-blue-700 dark:text-blue-300">
                  Added on {assignment.addedDate || "Mid-trip"} by {assignment.addedBy || "Dispatcher"}. Original trip data preserved.
                </span>
              </div>
            </div>
          )}

          {/* SECTION 1: TRIP ASSIGNMENT & GROUP INFO */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Package className="w-4 h-4 text-indigo-600" /> Trip Assignment & Group Info
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">ASSIGNED GROUP</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block">{assignment.groupName}</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">TOUR PACKAGE (MASTER)</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">{assignment.packageName}</span>
              </div>
            </div>

            {/* JOIN & LEAVE DETAILS */}
            <div className="grid grid-cols-2 gap-3 font-mono pt-1">
              <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> JOIN LOCATION & TIME
                </span>
                <strong className="text-slate-900 dark:text-slate-100 text-sm block">{assignment.joinLocation}</strong>
                <span className="text-slate-500 text-[11px] block">
                  {assignment.joinDate} @ {assignment.joinTime} WIB
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-1">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> LEAVE LOCATION & TIME
                </span>
                <strong className="text-slate-900 dark:text-slate-100 text-sm block">{assignment.leaveLocation}</strong>
                <span className="text-slate-500 text-[11px] block">
                  {assignment.leaveDate} @ {assignment.leaveTime} WIB
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: TRANSPORT SEGMENTS RELATION */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Truck className="w-4 h-4 text-indigo-600" /> Assigned Transport Segments
            </h3>

            {assignment.transportAssignments.length > 0 ? (
              <div className="space-y-2.5 font-mono">
                {assignment.transportAssignments.map((ts, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {ts.segmentName}
                      </span>
                      <Badge variant={ts.transportType === "Vehicle" ? "blue" : "violet"}>
                        {ts.transportType}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span>Assigned: <strong className="text-indigo-600 dark:text-indigo-400">{ts.vehicleOrTicket}</strong></span>
                      {ts.driverName && <span>Driver: <strong className="text-slate-700 dark:text-slate-300">{ts.driverName}</strong></span>}
                    </div>

                    <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>Capacity Checked ({ts.assignedPax}/{ts.vehicleCapacity} Pax)</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">No transport segments assigned yet.</p>
            )}
          </div>

          {/* SECTION 3: REUSED GUEST MASTER DATA */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <User className="w-4 h-4 text-indigo-600" /> Guest Master Record (Single Source of Truth)
            </h3>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034] space-y-3">
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">FULL NAME</span>
                  <strong className="text-slate-900 dark:text-slate-100">{assignment.guestName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">NATIONALITY</span>
                  <strong className="text-slate-900 dark:text-slate-100">{assignment.nationality}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">PASSPORT NUMBER</span>
                  <strong className="text-slate-900 dark:text-slate-100">{assignment.passportNumber}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">PHONE / WHATSAPP</span>
                  <strong className="text-indigo-600 dark:text-indigo-400">{assignment.phone}</strong>
                </div>
              </div>

              {guestMaster && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block">EMAIL ADDRESS</span>
                    <span className="text-slate-700 dark:text-slate-300">{guestMaster.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">DIETARY / SPECIAL REQUIREMENTS</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      {guestMaster.travelProfile.dietaryRequirement} · {guestMaster.travelProfile.specialRequirement}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">EMERGENCY CONTACT</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {guestMaster.emergencyContact.name} ({guestMaster.emergencyContact.relationship}) — {guestMaster.emergencyContact.phone}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* NOTES */}
          {assignment.notes && (
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20 space-y-1 font-mono">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">OPERATIONAL NOTES</span>
              <p className="text-slate-700 dark:text-slate-300 text-xs font-sans">{assignment.notes}</p>
            </div>
          )}
        </div>

        {/* DRAWER FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
