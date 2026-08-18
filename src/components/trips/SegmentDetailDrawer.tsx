"use client";

import React from "react";
import { TransportSegment } from "@/types/transportSegment";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  X,
  MapPin,
  Clock,
  Truck,
  User,
  Ticket,
  Compass,
  ShieldCheck,
  Phone,
  RefreshCw,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

interface SegmentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  segment: TransportSegment | null;
  onOpenVehicleChangeModal?: () => void;
  onOpenDriverChangeModal?: () => void;
}

export function SegmentDetailDrawer({
  isOpen,
  onClose,
  segment,
  onOpenVehicleChangeModal,
  onOpenDriverChangeModal,
}: SegmentDetailDrawerProps) {
  if (!isOpen || !segment) return null;

  const isVehicle = segment.transportType === "Vehicle";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="emerald">✓ Completed</Badge>;
      case "In Transit":
      case "Departed":
        return <Badge variant="blue">● In Transit</Badge>;
      case "Scheduled":
      case "Ready":
        return <Badge variant="violet">○ {status}</Badge>;
      case "Delayed":
        return <Badge variant="amber">⚠️ Delayed</Badge>;
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
                TRANSPORT SEGMENT SPECIFICATION
              </span>
              {getStatusBadge(segment.status)}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {segment.code} — {segment.origin} → {segment.destination}
            </h2>
            <span className="text-xs font-mono text-slate-500 block">
              Trip: {segment.tripCode} · Date: {segment.date} · {segment.assignedPax} Pax Assigned
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
          {/* LIVE TRACKING BANNER IF IN TRANSIT */}
          {segment.status === "In Transit" && isVehicle && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-2 font-mono">
              <div className="flex justify-between items-center">
                <span className="font-bold flex items-center gap-1.5 text-xs text-blue-300">
                  <Compass className="w-4 h-4 text-blue-400 animate-spin" /> LIVE VEHICLE TELEMETRY ACTIVE
                </span>
                <Badge variant="blue">● Moving</Badge>
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Segment is currently active on road. Live telemetry coordinates and driver tracking available.
              </p>
              <div className="pt-1 flex justify-end">
                <Link href="/dispatch/tracking">
                  <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-500 font-mono text-[11px]">
                    Open Live Tracking Map →
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* SECTION 1: ROUTE & TIMING (PLANNED VS ACTUAL) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Clock className="w-4 h-4 text-indigo-600" /> Route & Schedule (Planned vs Actual)
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                  DEPARTURE ({segment.origin})
                </span>
                <span className="text-slate-500 text-[10px] block">Planned: {segment.plannedDeparture}</span>
                <strong className="text-slate-900 dark:text-slate-100 text-sm block">
                  Actual: {segment.actualDeparture || "—:—"}
                </strong>
                {(segment.departureDelayMinutes ?? 0) > 0 && (
                  <span className="text-amber-600 text-[10px] font-bold block">
                    ⚠️ +{segment.departureDelayMinutes} min delay
                  </span>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-1">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block">
                  ARRIVAL ({segment.destination})
                </span>
                <span className="text-slate-500 text-[10px] block">Planned: {segment.plannedArrival}</span>
                <strong className="text-slate-900 dark:text-slate-100 text-sm block">
                  Actual: {segment.actualArrival || "—:—"}
                </strong>
              </div>
            </div>
          </div>

          {/* SECTION 2: VEHICLE & DRIVER ASSIGNMENT */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                {isVehicle ? <Truck className="w-4 h-4 text-indigo-600" /> : <Ticket className="w-4 h-4 text-purple-600" />}
                {isVehicle ? "Assigned Vehicle & Driver" : "Ticket Transport Specifications"}
              </h3>
              {isVehicle && (
                <div className="flex items-center gap-1.5">
                  {onOpenVehicleChangeModal && (
                    <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 text-indigo-600 font-mono" onClick={onOpenVehicleChangeModal}>
                      <RefreshCw className="w-3 h-3 mr-1" /> Change Vehicle
                    </Button>
                  )}
                  {onOpenDriverChangeModal && (
                    <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 text-indigo-600 font-mono" onClick={onOpenDriverChangeModal}>
                      <UserCheck className="w-3 h-3 mr-1" /> Change Driver
                    </Button>
                  )}
                </div>
              )}
            </div>

            {isVehicle ? (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3 font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">VEHICLE ASSIGNED</span>
                    <strong className="text-blue-600 dark:text-blue-400 text-sm block">{segment.vehicleName}</strong>
                    <span className="text-slate-500 text-[11px] block">Plate: {segment.vehiclePlate}</span>
                    <span className="text-emerald-600 text-[10px] font-bold block pt-0.5">
                      ✓ Capacity ({segment.assignedPax}/{segment.vehicleCapacity || 15} Pax)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">DRIVER ASSIGNED</span>
                    <strong className="text-slate-900 dark:text-slate-100 text-sm block">{segment.driverName}</strong>
                    <span className="text-indigo-600 dark:text-indigo-400 text-[11px] block flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {segment.driverPhone}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20 space-y-2 font-mono">
                <span className="text-[10px] text-purple-600 font-bold block uppercase">KAI / OVERLAND TICKET REFERENCE</span>
                <strong className="text-slate-900 dark:text-slate-100 text-sm block">
                  Reference: {segment.ticketReference || "KAI-98421"}
                </strong>
                <span className="text-slate-500 text-[11px] block">
                  Route: {segment.origin} → {segment.destination} ({segment.assignedPax} Pax)
                </span>
              </div>
            )}
          </div>

          {/* SECTION 3: ASSIGNED GUESTS */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <User className="w-4 h-4 text-indigo-600" /> Assigned Guest Groups ({segment.assignedPax} Pax)
            </h3>

            <div className="space-y-2">
              {segment.assignedGuestGroups.map((groupName, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034] font-bold text-slate-900 dark:text-slate-100">
                  {groupName}
                </div>
              ))}
            </div>
          </div>

          {/* NOTES */}
          {segment.notes && (
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1 font-mono text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">OPERATIONAL NOTES</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans text-xs">{segment.notes}</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
