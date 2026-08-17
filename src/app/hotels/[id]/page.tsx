"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockHotelsData } from "@/data/mockHotels";
import { HotelMaster, RoomTypeItem, RateContract, GroupAllocation } from "@/types/hotel";
import {
  Hotel,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Ban,
  Edit,
  ArrowLeft,
  DollarSign,
  Users,
  FileText,
  Calculator,
  Globe,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "h-001";

  // Find hotel by ID or fallback to first hotel
  const hotel = mockHotelsData.find((h) => h.id === id) || mockHotelsData[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [masterStatus, setMasterStatus] = useState(hotel.masterStatus);
  const [selectedDate, setSelectedDate] = useState("2026-08-21");

  // Cost Control Calculation state
  const [calcRooms, setCalcRooms] = useState(6);
  const [calcNights, setCalcNights] = useState(2);
  const [calcRate, setCalcRate] = useState(hotel.startingRate);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "rooms", label: "Rooms", count: hotel.roomTypes.length },
    { id: "rates", label: "Rates & Contract", count: hotel.contracts.length },
    { id: "availability", label: "Availability" },
    { id: "allocation", label: "Allocation", count: hotel.allocations.length },
    { id: "history", label: "History" },
  ];

  const handleDeactivate = () => {
    if (confirm(`Deactivate hotel partner ${hotel.name}?`)) {
      setMasterStatus("Inactive");
    }
  };

  const estimatedTotalCost = calcRooms * calcNights * calcRate;

  return (
    <AppShell>
      <PageHeader
        title={hotel.name}
        description={`Hotel Code: ${hotel.code} · ${hotel.category}`}
        breadcrumbItems={[
          { label: "Hotels", href: "/hotels" },
          { label: hotel.code },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/hotels")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Hotels
          </Button>
        }
      />

      {/* Hotel Detail Header Banner */}
      <DetailHeader
        title={hotel.name}
        code={hotel.code}
        subtitle={`${hotel.category} · ${hotel.city} · ${hotel.region}`}
        status={masterStatus === "Active" ? "Available" : "Inactive"}
        metrics={[
          { label: "Available Rooms", value: `${hotel.totalAvailableRooms} / ${hotel.totalRoomsCount}` },
          { label: "Starting Rate", value: `Rp ${hotel.startingRate.toLocaleString("id-ID")}` },
          { label: "Contract Status", value: hotel.contractStatus },
          { label: "Active Allocations", value: `${hotel.allocations.length} Groups` },
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeactivate}
              disabled={masterStatus === "Inactive"}
              leftIcon={<Ban className="w-3.5 h-3.5 text-rose-500" />}
            >
              {masterStatus === "Inactive" ? "Deactivated" : "Deactivate Hotel"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/hotels/new")}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Master Data
            </Button>
          </>
        }
      />

      {/* Operational Summary & Cost Control Card */}
      <Card className="p-5 bg-gradient-to-r from-amber-50/50 via-orange-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-amber-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              OPERATIONAL HOTEL SUMMARY & COST CONTROL PREVIEW
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono font-semibold">
            Dispatcher Accommodation Context
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Available Room Inventory</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm mt-1 block font-mono">
              {hotel.totalAvailableRooms} / {hotel.totalRoomsCount} Rooms Available
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Active Rate Contract</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-amber-500" />
              Rp {hotel.startingRate.toLocaleString("id-ID")} / Night
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Reservation Contact</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              {hotel.reservationContact.name} ({hotel.reservationContact.phone})
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Contract Validity</span>
            <span className={`font-bold mt-1 block ${
              hotel.contractStatus === "Active" ? "text-emerald-600" : "text-amber-600"
            }`}>
              {hotel.contractStatus}
            </span>
          </div>
        </div>
      </Card>

      {/* Detail Navigation Tabs */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section A: Hotel Information */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Hotel className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Hotel Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Hotel Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{hotel.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Category</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{hotel.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Main Phone</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{hotel.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Reservation Email</span>
                  <span className="text-slate-700 dark:text-slate-300 truncate block">{hotel.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">City Base</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{hotel.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Operating Region</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{hotel.region}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{hotel.address}</span>
                </div>
              </div>
            </Card>

            {/* Section B: Location & Reservation Contact */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Location Reference & Reservation Contact
                </h3>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162034]/60 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Map Coordinates Reference
                </span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>Lat: <strong className="text-slate-800 dark:text-slate-200">{hotel.lat}</strong></span>
                  <span>Lng: <strong className="text-slate-800 dark:text-slate-200">{hotel.lng}</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Reservation Contact Person
                </span>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Contact Person</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{hotel.reservationContact.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Direct Phone</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{hotel.reservationContact.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Operating Hours</span>
                    <span className="text-slate-700 dark:text-slate-300">{hotel.reservationContact.operatingHours}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Documents */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Hotel Contracts & Rate Agreements
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotel.documents.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162034]/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">{doc.name}</span>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{doc.documentNumber}</span>
                    <span className="text-[10px] text-slate-400">Expiry Date: {doc.expiryDate}</span>
                  </div>
                  <Badge variant={doc.status === "Valid" ? "emerald" : "warning"}>{doc.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Section D: Activity History */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Hotel Master Activity History
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {hotel.activityHistory.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{act.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{act.description}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">Logged By: {act.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: ROOMS */}
      {activeTab === "rooms" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Room Types & Inventory Capacity
              </h3>
              <p className="text-xs text-slate-400">Configured room types and remaining availability count</p>
            </div>
          </div>

          <DataTable
            columns={[
              {
                key: "name",
                header: "Room Type",
                render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.name}</span>,
              },
              {
                key: "occupancyPax",
                header: "Occupancy Capacity",
                render: (r) => <span className="font-semibold text-slate-700 dark:text-slate-300">{r.occupancyPax} Pax / Room</span>,
              },
              {
                key: "totalRooms",
                header: "Total Rooms",
                render: (r) => <span className="font-mono text-slate-800 dark:text-slate-200">{r.totalRooms} Rooms</span>,
              },
              {
                key: "availableRooms",
                header: "Available Rooms",
                render: (r) => (
                  <span className={`font-mono font-extrabold ${
                    r.availableRooms > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}>
                    {r.availableRooms} Available
                  </span>
                ),
              },
              {
                key: "occupiedRooms",
                header: "Occupied / Allocated",
                render: (r) => <span className="font-mono text-slate-600 dark:text-slate-400">{r.occupiedRooms} Rooms</span>,
              },
              {
                key: "status",
                header: "Status",
                render: (r) => (
                  <Badge status={r.status === "Available" ? "Available" : r.status === "Limited" ? "Assigned" : "Unavailable"}>
                    {r.status}
                  </Badge>
                ),
              },
            ]}
            data={hotel.roomTypes}
            keyExtractor={(row) => row.id}
          />
        </Card>
      )}

      {/* TAB 3: RATES & CONTRACT */}
      {activeTab === "rates" && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Contract & Rate Agreements
                </h3>
                <p className="text-xs text-slate-400">Predefined B2B contract rates for accommodation cost control</p>
              </div>
            </div>

            <DataTable
              columns={[
                { key: "contractName", header: "Contract / Rate Name", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.contractName}</span> },
                { key: "roomTypeName", header: "Room Type", render: (r) => <span className="font-medium text-slate-700 dark:text-slate-300">{r.roomTypeName}</span> },
                { key: "ratePerNight", header: "Contract Rate", render: (r) => <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">Rp {r.ratePerNight.toLocaleString("id-ID")}</span> },
                { key: "rateUnit", header: "Unit", render: (r) => <span className="text-xs text-slate-500">{r.rateUnit}</span> },
                { key: "effectivePeriod", header: "Effective Validity", render: (r) => <span className="font-mono text-xs">{r.effectiveFrom} – {r.effectiveUntil}</span> },
                { key: "status", header: "Status", render: (r) => <Badge variant={r.status === "Active" ? "emerald" : "slate"}>{r.status}</Badge> },
              ]}
              data={hotel.contracts}
              keyExtractor={(row) => row.id}
            />
          </Card>

          {/* Cost Control Estimator Card */}
          <Card className="p-6 space-y-4 bg-gradient-to-r from-slate-50 to-amber-50/30 dark:from-[#101726] dark:to-[#162034]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
              <Calculator className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Cost Control Calculator (Dispatcher Estimate Preview)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Number of Rooms</label>
                <input
                  type="number"
                  value={calcRooms}
                  onChange={(e) => setCalcRooms(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Number of Nights</label>
                <input
                  type="number"
                  value={calcNights}
                  onChange={(e) => setCalcNights(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Rate / Room / Night</label>
                <input
                  type="number"
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#101726] border border-amber-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Accommodation Cost:</span>
              <span className="text-lg font-mono font-extrabold text-amber-600 dark:text-amber-400">
                Rp {estimatedTotalCost.toLocaleString("id-ID")}
              </span>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: AVAILABILITY */}
      {activeTab === "availability" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Room Availability Date Preview (August 2026)
              </h3>
              <p className="text-xs text-slate-400">Select date to check remaining room type inventory</p>
            </div>
            {/* Date Switcher */}
            <div className="flex items-center gap-1.5">
              {["2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23", "2026-08-24"].map((dt) => (
                <button
                  key={dt}
                  onClick={() => setSelectedDate(dt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${
                    selectedDate === dt
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 dark:bg-[#162034] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  {dt.split("-")[2]} AUG
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {hotel.roomTypes.map((rt) => (
              <div key={rt.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{rt.name}</span>
                  <Badge status={rt.status === "Available" ? "Available" : "Unavailable"}>{rt.status}</Badge>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block">Occupancy</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{rt.occupancyPax} Pax / Room</span>
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Remaining Inventory:</span>
                  <span className="font-mono font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    {rt.availableRooms} / {rt.totalRooms} Rooms
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: ALLOCATION & MANIFEST */}
      {activeTab === "allocation" && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Active Group Accommodation Allocations
                </h3>
                <p className="text-xs text-slate-400">Operational group room blockings</p>
              </div>
            </div>

            {hotel.allocations.length > 0 ? (
              <DataTable
                columns={[
                  { key: "groupName", header: "Group Allocation Name", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.groupName}</span> },
                  { key: "stayPeriod", header: "Stay Period", render: (r) => <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{r.stayPeriod}</span> },
                  { key: "guestsCount", header: "Guests", render: (r) => <span className="font-bold text-slate-800 dark:text-slate-200">{r.guestsCount} Guests</span> },
                  { key: "roomsBreakdown", header: "Room Breakdown", render: (r) => <span className="text-xs text-slate-600 dark:text-slate-400">{r.roomsBreakdown}</span> },
                  { key: "status", header: "Status", render: (r) => <Badge status={r.status === "Confirmed" ? "Available" : "Assigned"}>{r.status}</Badge> },
                ]}
                data={hotel.allocations}
                keyExtractor={(row) => row.id}
              />
            ) : (
              <EmptyState
                title="No active allocations"
                description="This hotel currently has no active group room allocations for this operational session."
              />
            )}
          </Card>

          {/* Manifest Concept Preview */}
          {hotel.allocations.length > 0 && hotel.allocations[0].manifest.length > 0 && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Users className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Room Allocation Manifest Concept Preview ({hotel.allocations[0].groupName})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {hotel.allocations[0].manifest.map((m) => (
                  <div key={m.roomNumber} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                        Room {m.roomNumber}
                      </span>
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.2 rounded font-medium">
                        {m.roomType}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{m.guestName}</span>
                    <span className="text-[10px] text-slate-400 block">{m.paxCount} Guests Assigned</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* TAB 6: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Hotel Master Activity History
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {hotel.activityHistory.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{act.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{act.description}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">Logged By: {act.user}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AppShell>
  );
}
