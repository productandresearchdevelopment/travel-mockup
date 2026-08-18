"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  mockPickupRecordsData,
  mockDropoffRecordsData,
  mockPickupDropoffSummaryData,
} from "@/data/mockPickupDropoffData";
import {
  PickupRecord,
  DropoffRecord,
  PickupStatus,
  DropoffMethod,
  TicketStatus,
} from "@/types/pickupDropoff";
import { PickupDropoffDetailDrawer } from "./PickupDropoffDetailDrawer";
import { UpdatePickupStatusModal } from "./UpdatePickupStatusModal";
import { AddDropoffTicketModal } from "./AddDropoffTicketModal";
import {
  MapPin,
  Clock,
  Truck,
  Ticket,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Eye,
  Plus,
  Compass,
  Train,
  Bus,
  Plane,
  Ship,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Tag,
  Search,
} from "lucide-react";

interface PickupDropoffTabProps {
  tripId?: string;
}

export default function PickupDropoffTab({ tripId = "trip-001" }: PickupDropoffTabProps) {
  // Main state
  const [pickupRecords, setPickupRecords] = useState<PickupRecord[]>(mockPickupRecordsData);
  const [dropoffRecords, setDropoffRecords] = useState<DropoffRecord[]>(mockDropoffRecordsData);
  const [activeSubTab, setActiveSubTab] = useState<"pickup" | "dropoff">("pickup");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [exceptionFilter, setExceptionFilter] = useState<string | null>(null);

  // Selected Record & Drawer/Modal state
  const [selectedRecord, setSelectedRecord] = useState<PickupRecord | DropoffRecord | null>(pickupRecords[0] || null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdatePickupModalOpen, setIsUpdatePickupModalOpen] = useState(false);
  const [isAddDropoffModalOpen, setIsAddDropoffModalOpen] = useState(false);

  // Computed Owner Summary (Requirement 25)
  const summary = useMemo(() => {
    const totalPickups = pickupRecords.length;
    const onTimePickups = pickupRecords.filter((p) => p.delayStatus === "On Time" || p.delayStatus === "Early").length;
    const delayedPickups = pickupRecords.filter((p) => p.delayStatus === "Delayed").length;
    const missedPickups = pickupRecords.filter((p) => p.status === "Missed").length;
    const locationMismatches = pickupRecords.filter((p) => p.hasLocationMismatch).length;

    const totalDropoffs = dropoffRecords.length;
    const vehicleDropoffs = dropoffRecords.filter((d) => d.method === "Vehicle").length;
    const ticketDropoffs = dropoffRecords.filter((d) => d.method === "Ticket").length;
    const pendingTickets = dropoffRecords.filter((d) => d.method === "Ticket" && d.ticketStatus === "Pending").length;

    return {
      totalPickups,
      onTimePickups,
      delayedPickups,
      missedPickups,
      locationMismatches,
      totalDropoffs,
      vehicleDropoffs,
      ticketDropoffs,
      pendingTickets,
    };
  }, [pickupRecords, dropoffRecords]);

  // Filtered Pickups
  const filteredPickups = useMemo(() => {
    return pickupRecords.filter((p) => {
      const matchQuery =
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.plannedLocation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase() || p.delayStatus.toLowerCase() === statusFilter.toLowerCase();

      const matchException =
        !exceptionFilter ||
        (exceptionFilter === "delay" && p.delayStatus === "Delayed") ||
        (exceptionFilter === "mismatch" && p.hasLocationMismatch) ||
        (exceptionFilter === "missed" && p.status === "Missed");

      return matchQuery && matchStatus && matchException;
    });
  }, [pickupRecords, searchQuery, statusFilter, exceptionFilter]);

  // Filtered Drop-offs
  const filteredDropoffs = useMemo(() => {
    return dropoffRecords.filter((d) => {
      const matchQuery =
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.bookingReference && d.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === "all" || d.status.toLowerCase() === statusFilter.toLowerCase() || d.method.toLowerCase() === statusFilter.toLowerCase();

      const matchException =
        !exceptionFilter ||
        (exceptionFilter === "pending_ticket" && d.method === "Ticket" && d.ticketStatus === "Pending") ||
        (exceptionFilter === "delay" && d.delayStatus === "Delayed");

      return matchQuery && matchStatus && matchException;
    });
  }, [dropoffRecords, searchQuery, statusFilter, exceptionFilter]);

  // Save updated pickup from modal
  const handleSavePickup = (updated: PickupRecord) => {
    setPickupRecords(pickupRecords.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedRecord(updated);
  };

  // Add new drop-off record from modal
  const handleAddDropoff = (newRecord: DropoffRecord) => {
    setDropoffRecords([newRecord, ...dropoffRecords]);
    setSelectedRecord(newRecord);
  };

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
    <div className="space-y-6 font-sans">
      {/* REQUIREMENT 25: COMPACT OWNER SUMMARY BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">TODAY PICKUPS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{summary.totalPickups}</span>
            <span className="text-[11px] text-emerald-400 font-bold">✓ {summary.onTimePickups} On Time</span>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1 border-amber-900/60 bg-amber-950/20">
          <span className="text-[10px] text-amber-400 font-bold uppercase block">PICKUP DELAYS & MISSED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-400">
              {summary.delayedPickups + summary.missedPickups}
            </span>
            <span className="text-[10px] text-amber-400 font-bold">
              {summary.delayedPickups} Delayed · {summary.missedPickups} Missed
            </span>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">TODAY DROP-OFFS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{summary.totalDropoffs}</span>
            <span className="text-[11px] text-indigo-400 font-bold">
              {summary.vehicleDropoffs} Vehicle / {summary.ticketDropoffs} Ticket
            </span>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1 border-purple-900/60 bg-purple-950/20">
          <span className="text-[10px] text-purple-400 font-bold uppercase block">EXCEPTIONS & TICKETS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-400">
              {summary.pendingTickets + summary.locationMismatches}
            </span>
            <span className="text-[10px] text-purple-400 font-bold">
              {summary.pendingTickets} Pending Tkt · {summary.locationMismatches} Location Mismatch
            </span>
          </div>
        </Card>
      </div>

      {/* REQUIREMENT 26: CLICKABLE EXCEPTION INDICATORS */}
      <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
        <span className="font-bold text-slate-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> EXCEPTION WARNING INDICATORS:
        </span>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => {
              setActiveSubTab("pickup");
              setExceptionFilter(exceptionFilter === "delay" ? null : "delay");
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 border ${
              exceptionFilter === "delay"
                ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-sm"
                : "bg-slate-800 border-amber-900/80 text-amber-400 hover:bg-amber-950/40"
            }`}
          >
            <span>⚠️ {summary.delayedPickups} Pickup Delays</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("pickup");
              setExceptionFilter(exceptionFilter === "mismatch" ? null : "mismatch");
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 border ${
              exceptionFilter === "mismatch"
                ? "bg-rose-500 text-white border-rose-400 font-extrabold shadow-sm"
                : "bg-slate-800 border-rose-900/80 text-rose-400 hover:bg-rose-950/40"
            }`}
          >
            <span>⚠️ {summary.locationMismatches} Location Mismatch</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("dropoff");
              setExceptionFilter(exceptionFilter === "pending_ticket" ? null : "pending_ticket");
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 border ${
              exceptionFilter === "pending_ticket"
                ? "bg-purple-500 text-white border-purple-400 font-extrabold shadow-sm"
                : "bg-slate-800 border-purple-900/80 text-purple-400 hover:bg-purple-950/40"
            }`}
          >
            <span>⚠️ {summary.pendingTickets} Ticket Pending</span>
          </button>

          {exceptionFilter && (
            <button
              onClick={() => setExceptionFilter(null)}
              className="text-slate-400 underline text-[11px] hover:text-white"
            >
              Clear Filter
            </button>
          )}
        </div>
      </Card>

      {/* CONTROLS BAR: SEGMENTED SUB-TABS & SEARCH */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* SEGMENTED SUB-TABS (PICKUP vs DROP-OFF) */}
          <div className="flex items-center rounded-xl p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <button
              onClick={() => {
                setActiveSubTab("pickup");
                const firstPickup = filteredPickups[0];
                if (firstPickup) setSelectedRecord(firstPickup);
              }}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                activeSubTab === "pickup"
                  ? "bg-white dark:bg-[#101726] text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>📍 Pickup Management ({pickupRecords.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveSubTab("dropoff");
                const firstDropoff = filteredDropoffs[0];
                if (firstDropoff) setSelectedRecord(firstDropoff);
              }}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                activeSubTab === "dropoff"
                  ? "bg-white dark:bg-[#101726] text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>🏁 Drop-off Management ({dropoffRecords.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-48 sm:w-60">
              <SearchInput
                placeholder="Search location, driver, guest, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeSubTab === "pickup" ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (selectedRecord && "plannedLocation" in selectedRecord) {
                    setIsUpdatePickupModalOpen(true);
                  }
                }}
                leftIcon={<Clock className="w-3.5 h-3.5" />}
              >
                Log Pickup Execution
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddDropoffModalOpen(true)}
                leftIcon={<Ticket className="w-3.5 h-3.5" />}
              >
                + Issue Drop-off Ticket
              </Button>
            )}
          </div>
        </div>

        {/* REQUIREMENT 7: PICKUP OPERATIONAL FLOW STEPPER */}
        {activeSubTab === "pickup" && (
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] font-mono text-[11px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-2">OPERATIONAL PICKUP FLOW</span>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-bold overflow-x-auto gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">1. Scheduled</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">2. Driver Assigned</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-600">3. On The Way</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-600">4. Arrived at Hotel</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600">5. Guest Picked Up</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-emerald-600 text-white">6. Completed</span>
            </div>
          </div>
        )}

        {/* REQUIREMENT 33: DESKTOP TWO-COLUMN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* LEFT COLUMN: OPERATIONAL LIST CARDS / BOARD (7 COLS) */}
          <div className="lg:col-span-7 space-y-3">
            {activeSubTab === "pickup" && (
              <div className="space-y-3">
                {filteredPickups.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedRecord(p)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      selectedRecord?.id === p.id
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{p.code}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{p.guestName}</span>
                      </div>
                      {getStatusBadge(p.status)}
                    </div>

                    {/* LOCATION & MISMATCH DISPLAY */}
                    <div className="font-mono text-xs space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {p.plannedLocation.name}
                        </span>
                        {p.hasLocationMismatch && (
                          <Badge variant="danger" className="text-[9px]">
                            ⚠️ Location Mismatch
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block">{p.plannedLocation.address}, {p.plannedLocation.city}</span>
                    </div>

                    {/* PLANNED VS ACTUAL TIME & AUTOMATED DELAY */}
                    <div className="flex items-center justify-between font-mono text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4 text-[11px]">
                        <span>Planned: <strong className="text-slate-900 dark:text-slate-100">{p.plannedTime}</strong></span>
                        <span>Actual: <strong className="text-indigo-600 dark:text-indigo-400">{p.actualTime || "—:—"}</strong></span>
                      </div>

                      <Badge variant={p.delayStatus === "Delayed" ? "amber" : "emerald"}>
                        {p.delayMinutes > 0 ? `+${p.delayMinutes} min delay` : p.delayStatus}
                      </Badge>
                    </div>

                    {/* VEHICLE & DRIVER */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                      <span>Vehicle: <strong className="text-slate-700 dark:text-slate-300">{p.vehiclePlate}</strong></span>
                      <span>Driver: <strong className="text-slate-700 dark:text-slate-300">{p.driverName}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === "dropoff" && (
              <div className="space-y-3">
                {filteredDropoffs.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedRecord(d)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      selectedRecord?.id === d.id
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{d.code}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{d.guestName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant={d.method === "Vehicle" ? "blue" : "violet"}>
                          {d.method === "Vehicle" ? "🚌 Vehicle" : "🎫 Ticket"}
                        </Badge>
                        {getStatusBadge(d.status)}
                      </div>
                    </div>

                    <div className="font-mono text-xs space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">
                        Destination: {d.destination}
                      </span>
                      {d.method === "Ticket" ? (
                        <span className="text-purple-600 dark:text-purple-400 font-bold block text-[11px]">
                          {d.transportType} — {d.provider} ({d.route}) · Ref: {d.bookingReference || "Pending"}
                        </span>
                      ) : (
                        <span className="text-slate-500 block text-[11px]">
                          HiAce {d.vehiclePlate} · Driver: {d.driverName} · Drop-off: {d.plannedDropoffTime} (Actual: {d.actualDropoffTime})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: INTERACTIVE RECORD DETAIL PANEL (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            {selectedRecord ? (
              <Card className="p-5 space-y-4 sticky top-6 font-sans border-slate-300 dark:border-slate-700">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      SELECTED RECORD PREVIEW
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {selectedRecord.code} — {selectedRecord.guestName}
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsDrawerOpen(true)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-indigo-600" />}
                  >
                    Full Panel
                  </Button>
                </div>

                {/* SCHEDULE METRICS */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2 font-mono text-xs">
                  {"plannedLocation" in selectedRecord ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Planned Pickup:</span>
                        <strong className="text-slate-900 dark:text-slate-100">{(selectedRecord as PickupRecord).plannedTime}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Actual Pickup:</span>
                        <strong className="text-indigo-600 dark:text-indigo-400">{(selectedRecord as PickupRecord).actualTime || "Not Logged"}</strong>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-1 font-bold">
                        <span className="text-amber-600">Calculated Delay:</span>
                        <span className="text-amber-600">+{(selectedRecord as PickupRecord).delayMinutes} min</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Drop-off Method:</span>
                        <strong className="text-indigo-600 font-bold">{(selectedRecord as DropoffRecord).method}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Destination:</span>
                        <strong className="text-slate-900 dark:text-slate-100">{(selectedRecord as DropoffRecord).destination}</strong>
                      </div>
                    </>
                  )}
                </div>

                {/* LOCATION & TRANSPORT */}
                {"plannedLocation" in selectedRecord && (
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">LOCATION VERIFICATION</span>
                    <strong className="text-slate-900 dark:text-slate-100 block">{(selectedRecord as PickupRecord).plannedLocation.name}</strong>
                    {(selectedRecord as PickupRecord).hasLocationMismatch && (
                      <Badge variant="danger" className="text-[9px]">
                        ⚠️ Location Mismatch! Actual: {(selectedRecord as PickupRecord).actualLocation?.name}
                      </Badge>
                    )}
                  </div>
                )}

                {/* TICKET SUMMARY IF APPLICABLE */}
                {"transportType" in selectedRecord && (selectedRecord as DropoffRecord).method === "Ticket" && (
                  <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20 space-y-1.5 font-mono text-xs">
                    <span className="text-[10px] text-purple-600 font-bold block uppercase">ISSUED TICKET REFERENCE</span>
                    <strong className="text-slate-900 dark:text-slate-100 block">
                      {(selectedRecord as DropoffRecord).transportType} — {(selectedRecord as DropoffRecord).provider}
                    </strong>
                    <span className="text-indigo-600 block font-bold">Ref: {(selectedRecord as DropoffRecord).bookingReference}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if ("plannedLocation" in selectedRecord) {
                        setIsUpdatePickupModalOpen(true);
                      } else {
                        setIsDrawerOpen(true);
                      }
                    }}
                  >
                    {"plannedLocation" in selectedRecord ? "Update Pickup Status" : "View Drop-off Details"}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center text-slate-400 text-xs italic font-mono">
                Select a pickup or drop-off record from the list to preview operational details.
              </Card>
            )}
          </div>
        </div>
      </Card>

      {/* DETAIL DRAWER */}
      <PickupDropoffDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        record={selectedRecord}
        type={activeSubTab}
        onOpenUpdateModal={() => {
          setIsDrawerOpen(false);
          if (activeSubTab === "pickup") {
            setIsUpdatePickupModalOpen(true);
          }
        }}
      />

      {/* UPDATE PICKUP MODAL */}
      <UpdatePickupStatusModal
        isOpen={isUpdatePickupModalOpen}
        onClose={() => setIsUpdatePickupModalOpen(false)}
        pickup={selectedRecord && "plannedLocation" in selectedRecord ? (selectedRecord as PickupRecord) : null}
        onSavePickup={handleSavePickup}
      />

      {/* ADD DROPOFF TICKET MODAL */}
      <AddDropoffTicketModal
        isOpen={isAddDropoffModalOpen}
        onClose={() => setIsAddDropoffModalOpen(false)}
        onAddDropoff={handleAddDropoff}
      />
    </div>
  );
}
