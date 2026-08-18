"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  mockTransportSegmentsData,
  mockVehicleChangeEventsData,
  mockDriverChangeEventsData,
  mockTransportSummaryMetricsData,
} from "@/data/mockTransportSegmentsData";
import { TransportSegment, VehicleChangeEvent, DriverChangeEvent } from "@/types/transportSegment";
import { SegmentDetailDrawer } from "./SegmentDetailDrawer";
import { ChangeVehicleModal } from "./ChangeVehicleModal";
import { ChangeDriverModal } from "./ChangeDriverModal";
import { AddSegmentModal } from "./AddSegmentModal";
import {
  Truck,
  User,
  Clock,
  MapPin,
  RefreshCw,
  PlusCircle,
  Compass,
  Ticket,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  History,
} from "lucide-react";

interface TransportTabProps {
  tripId: string;
}

export default function TransportTab({ tripId }: TransportTabProps) {
  const [segments, setSegments] = useState<TransportSegment[]>(mockTransportSegmentsData);
  const [vehicleChanges, setVehicleChanges] = useState<VehicleChangeEvent[]>(mockVehicleChangeEventsData);
  const [driverChanges, setDriverChanges] = useState<DriverChangeEvent[]>(mockDriverChangeEventsData);

  const [selectedSegment, setSelectedSegment] = useState<TransportSegment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isAddSegmentModalOpen, setIsAddSegmentModalOpen] = useState(false);

  // Summary statistics
  const totalSegments = segments.length;
  const activeSegments = segments.filter((s) => s.status === "In Transit").length;
  const vehiclesCount = new Set(segments.map((s) => s.vehicleId).filter(Boolean)).size;
  const driversCount = new Set(segments.map((s) => s.driverId).filter(Boolean)).size;

  const handleOpenDrawer = (seg: TransportSegment) => {
    setSelectedSegment(seg);
    setIsDrawerOpen(true);
  };

  const handleOpenVehicleModalForSegment = (seg: TransportSegment) => {
    setSelectedSegment(seg);
    setIsVehicleModalOpen(true);
  };

  const handleOpenDriverModalForSegment = (seg: TransportSegment) => {
    setSelectedSegment(seg);
    setIsDriverModalOpen(true);
  };

  // Submit Vehicle Change
  const handleSubmitVehicleChange = (eventData: Partial<VehicleChangeEvent>) => {
    const newEvent: VehicleChangeEvent = {
      id: `vce-${Date.now().toString().slice(-3)}`,
      tripId: eventData.tripId || tripId,
      timestamp: eventData.timestamp || "2026-08-27 — 15:30 WIB",
      location: eventData.location || "Probolinggo",
      previousVehicleId: eventData.previousVehicleId || "v-001",
      previousVehiclePlate: eventData.previousVehiclePlate || "B 1234 XYZ",
      newVehicleId: eventData.newVehicleId || "v-002",
      newVehiclePlate: eventData.newVehiclePlate || "B 5678 ABC",
      previousDriverName: eventData.previousDriverName || "Agus Santoso",
      newDriverName: eventData.newDriverName || "Budi Pratama",
      reason: eventData.reason || "Vehicle replacement",
      operator: "Dispatcher HQ",
      notes: eventData.notes,
    };

    setVehicleChanges([newEvent, ...vehicleChanges]);

    // Update segment vehicle
    if (selectedSegment) {
      setSegments(
        segments.map((s) =>
          s.id === selectedSegment.id
            ? {
                ...s,
                vehicleId: eventData.newVehicleId,
                vehiclePlate: eventData.newVehiclePlate,
                driverName: eventData.newDriverName,
                notes: `Vehicle changed to ${eventData.newVehiclePlate} at ${eventData.location}. ${eventData.notes || ""}`,
              }
            : s
        )
      );
    }
  };

  // Submit Driver Change
  const handleSubmitDriverChange = (eventData: Partial<DriverChangeEvent>) => {
    const newEvent: DriverChangeEvent = {
      id: `dce-${Date.now().toString().slice(-3)}`,
      tripId: eventData.tripId || tripId,
      timestamp: eventData.timestamp || "2026-08-27 — 15:45 WIB",
      location: eventData.location || "Probolinggo",
      previousDriverId: eventData.previousDriverId || "drv-001",
      previousDriverName: eventData.previousDriverName || "Agus Santoso",
      newDriverId: eventData.newDriverId || "drv-002",
      newDriverName: eventData.newDriverName || "Budi Pratama",
      reason: eventData.reason || "Driver shift change",
      operator: "SDM HQ",
    };

    setDriverChanges([newEvent, ...driverChanges]);

    if (selectedSegment) {
      setSegments(
        segments.map((s) =>
          s.id === selectedSegment.id ? { ...s, driverName: eventData.newDriverName } : s
        )
      );
    }
  };

  // Add Segment
  const handleAddSegment = (newSeg: TransportSegment) => {
    setSegments([...segments, newSeg]);
  };

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
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* EXECUTIVE TOP SUMMARY METRICS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
            TOTAL SEGMENTS
          </span>
          <strong className="text-2xl font-extrabold text-white">{totalSegments} Segments</strong>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 shadow-sm border-blue-900/60 bg-blue-950/20">
          <span className="text-[10px] text-blue-400 block font-bold uppercase tracking-wider">
            ACTIVE IN TRANSIT
          </span>
          <strong className="text-2xl font-extrabold text-blue-400">{activeSegments} Segment</strong>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 shadow-sm border-indigo-900/60 bg-indigo-950/20">
          <span className="text-[10px] text-indigo-400 block font-bold uppercase tracking-wider">
            VEHICLES ASSIGNED
          </span>
          <strong className="text-2xl font-extrabold text-indigo-400">{vehiclesCount} Vehicles</strong>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 shadow-sm border-emerald-900/60 bg-emerald-950/20">
          <span className="text-[10px] text-emerald-400 block font-bold uppercase tracking-wider">
            DRIVERS ASSIGNED
          </span>
          <strong className="text-2xl font-extrabold text-emerald-400">{driversCount} Drivers</strong>
        </div>
      </div>

      {/* VISUAL TRANSPORT JOURNEY TIMELINE STEPPER (REQUIREMENT 14) */}
      <Card className="p-6 space-y-4 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/10 dark:bg-indigo-950/10">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Visual Journey Transport Flow & Vehicle Changes
            </h2>
          </div>
          <Badge variant="violet">Segment-Based Operations</Badge>
        </div>

        {/* STEPPER GRAPH NODES */}
        <div className="relative pt-2 pb-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* NODE 1 */}
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> YOGYAKARTA
                </span>
                <Badge variant="emerald">✓ Departed 08:17</Badge>
              </div>
              <span className="text-slate-500 text-[11px] block">
                SEG-01 → Probolinggo · Planned: 08:00
              </span>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-0.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  🚌 HiAce #01 (B 1234 XYZ)
                </span>
                <span className="text-slate-500 block">Driver: Agus Santoso (8 Pax)</span>
              </div>
            </div>

            {/* NODE 2 (VEHICLE CHANGE HANDOVER POINT) */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> PROBOLINGGO
                </span>
                <Badge variant="blue">● Active Handover</Badge>
              </div>
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 text-[11px] space-y-1">
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5" /> 15:30 WIB — VEHICLE & DRIVER SWAP
                </span>
                <span className="text-slate-600 dark:text-slate-400 block text-[10px]">
                  HiAce #01 (Agus) → HiAce #02 (Budi Pratama)
                </span>
              </div>
              <span className="text-slate-500 text-[11px] block">
                SEG-02 → Bali (10 Pax) & SEG-03 → Banyuwangi (2 Pax)
              </span>
            </div>

            {/* NODE 3 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034] space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-purple-600" /> BALI / BANYUWANGI
                </span>
                <Badge variant="violet">○ ETA 22:00</Badge>
              </div>
              <span className="text-slate-500 text-[11px] block">
                SEG-02 (Bali Drop-off) & SEG-03 (Train Drop-off)
              </span>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-0.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  🚌 HiAce #02 & 🎫 Train #KA-123456
                </span>
                <span className="text-slate-500 block">12 Pax Total Destination Drop-off</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* MAIN CONTENT: SEGMENT LIST & ACTION BUTTONS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" /> Transport Segments ({segments.length})
            </h3>
            <span className="text-xs text-slate-400">
              Operational transport segments assigned to trip #{tripId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSegment(segments[0]);
                setIsVehicleModalOpen(true);
              }}
              className="text-xs font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-900/60 dark:hover:bg-indigo-950/40"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Change Vehicle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSegment(segments[0]);
                setIsDriverModalOpen(true);
              }}
              className="text-xs font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-900/60 dark:hover:bg-indigo-950/40"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1.5" /> Change Driver
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddSegmentModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Segment
            </Button>
          </div>
        </div>

        {/* SEGMENTS LIST */}
        <div className="space-y-3 font-mono">
          {segments.map((seg) => (
            <div
              key={seg.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-3 shadow-xs"
            >
              {/* TOP LINE */}
              <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{seg.code}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    {seg.origin} → {seg.destination}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{seg.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={seg.transportType === "Vehicle" ? "blue" : "violet"}>
                    {seg.transportType === "Vehicle" ? "🚌 Vehicle Segment" : "🎫 Ticket Segment"}
                  </Badge>
                  {getStatusBadge(seg.status)}
                </div>
              </div>

              {/* MIDDLE DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* SCHEDULE */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-50/60 dark:bg-[#162034] border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">SCHEDULE (PLANNED VS ACTUAL)</span>
                  <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>Departure: {seg.plannedDeparture}</span>
                    <span className="text-emerald-600">Actual: {seg.actualDeparture || "—:—"}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Arrival: {seg.plannedArrival}</span>
                    <span>Actual: {seg.actualArrival || "—:—"}</span>
                  </div>
                  {seg.departureDelayMinutes > 0 && (
                    <span className="text-amber-600 text-[10px] font-bold block pt-0.5">
                      ⚠️ Departure Delayed +{seg.departureDelayMinutes} min
                    </span>
                  )}
                </div>

                {/* RESOURCE / VEHICLE / DRIVER */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-50/60 dark:bg-[#162034] border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">RESOURCE ASSIGNMENT</span>
                  {seg.transportType === "Vehicle" ? (
                    <>
                      <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600">{seg.vehicleName}</span>
                        <span>Plate: {seg.vehiclePlate}</span>
                      </div>
                      <span className="text-slate-500 text-[11px] block">Driver: {seg.driverName} ({seg.driverPhone})</span>
                      <Badge variant={seg.assignedPax <= (seg.vehicleCapacity || 15) ? "emerald" : "danger"} className="mt-1">
                        {seg.assignedPax <= (seg.vehicleCapacity || 15)
                          ? `✓ Capacity Available (${seg.assignedPax}/${seg.vehicleCapacity || 15} Pax)`
                          : `⚠️ Capacity Exceeded (${seg.assignedPax}/${seg.vehicleCapacity || 15} Pax)`}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-purple-600 block">KAI Train Segment</span>
                      <span className="text-slate-500 text-[11px] block">Ref: {seg.ticketReference || "KA-123456"}</span>
                    </>
                  )}
                </div>

                {/* GUESTS & ACTIONS */}
                <div className="space-y-2 p-3 rounded-xl bg-slate-50/60 dark:bg-[#162034] border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">ASSIGNED GUESTS</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-xs block">
                      {seg.assignedPax} Guests Assigned
                    </span>
                    <span className="text-slate-500 text-[10px] block truncate">
                      {seg.assignedGuestGroups.join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    {seg.status === "In Transit" && seg.transportType === "Vehicle" && (
                      <Link href="/dispatch/tracking" className="w-full">
                        <Button size="sm" className="w-full h-7 text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-bold">
                          <Compass className="w-3 h-3 mr-1" /> Live Tracking
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDrawer(seg)}
                      className="h-7 text-[11px] font-bold"
                    >
                      Details →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VEHICLE & DRIVER CHANGE HISTORY LOGS (REQUIREMENTS 9, 11, 12, 13) */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 font-mono">
          <History className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Vehicle & Driver Assignment Audit History
          </h3>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {vehicleChanges.map((vc) => (
            <div key={vc.id} className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/20 space-y-1">
              <div className="flex justify-between font-bold text-indigo-600 dark:text-indigo-400">
                <span>🔄 Vehicle Swap at {vc.location}</span>
                <span>{vc.timestamp}</span>
              </div>
              <span className="text-slate-900 dark:text-slate-100 font-bold block text-[11px]">
                Previous Vehicle: {vc.previousVehiclePlate} ({vc.previousDriverName}) → New Vehicle: {vc.newVehiclePlate} ({vc.newDriverName})
              </span>
              <span className="text-slate-500 text-[10px] block">Reason: {vc.reason} · Operator: {vc.operator}</span>
            </div>
          ))}

          {driverChanges.map((dc) => (
            <div key={dc.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>👤 Driver Shift Change at {dc.location}</span>
                <span>{dc.timestamp}</span>
              </div>
              <span className="text-slate-600 dark:text-slate-300 font-bold block text-[11px]">
                {dc.previousDriverName} → {dc.newDriverName}
              </span>
              <span className="text-slate-500 text-[10px] block">Reason: {dc.reason} · Operator: {dc.operator}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* DRAWERS AND MODALS */}
      <SegmentDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        segment={selectedSegment}
        onOpenVehicleChangeModal={() => {
          setIsDrawerOpen(false);
          setIsVehicleModalOpen(true);
        }}
        onOpenDriverChangeModal={() => {
          setIsDrawerOpen(false);
          setIsDriverModalOpen(true);
        }}
      />

      <ChangeVehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        segment={selectedSegment}
        onSubmitChange={handleSubmitVehicleChange}
      />

      <ChangeDriverModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        segment={selectedSegment}
        onSubmitDriverChange={handleSubmitDriverChange}
      />

      <AddSegmentModal
        isOpen={isAddSegmentModalOpen}
        onClose={() => setIsAddSegmentModalOpen(false)}
        tripId={tripId}
        tripCode="TRP-2026-00421"
        existingSegments={segments}
        onSubmitAddSegment={handleAddSegment}
      />
    </div>
  );
}
