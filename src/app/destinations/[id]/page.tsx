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
import { mockDestinationsData } from "@/data/mockDestinations";
import { mockGuidesData } from "@/data/mockGuides";
import { mockHotelsData } from "@/data/mockHotels";
import { DestinationMaster, OperatingScheduleDay, TicketFeeItem } from "@/types/destination";
import {
  Compass,
  MapPin,
  Clock,
  DollarSign,
  ShieldAlert,
  FileText,
  Calendar,
  Ban,
  Edit,
  ArrowLeft,
  AlertTriangle,
  UserCheck,
  Hotel,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "dest-001";

  // Find destination by ID or fallback to first destination
  const dest = mockDestinationsData.find((d) => d.id === id) || mockDestinationsData[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [masterStatus, setMasterStatus] = useState(dest.masterStatus);

  // Contextual experienced guides for this destination
  const experiencedGuides = mockGuidesData.filter((g) =>
    g.destinationExperiences.some((de) => de.destinationName.toLowerCase().includes(dest.name.toLowerCase()) || dest.name.toLowerCase().includes(de.destinationName.toLowerCase()))
  );

  // Contextual nearby hotels in same city/region
  const nearbyHotels = mockHotelsData.filter(
    (h) => h.city.toLowerCase() === dest.city.toLowerCase() || h.region.toLowerCase() === dest.region.toLowerCase()
  );

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "hours", label: "Operating Hours" },
    { id: "fees", label: "Fees", count: dest.ticketFees.length },
    { id: "requirements", label: "Requirements" },
    { id: "rules", label: "Rules & Notes" },
    { id: "history", label: "History" },
  ];

  const handleDeactivate = () => {
    if (confirm(`Deactivate destination ${dest.name}?`)) {
      setMasterStatus("Inactive");
    }
  };

  return (
    <AppShell>
      <PageHeader
        title={dest.name}
        description={`Destination Code: ${dest.code} · ${dest.type}`}
        breadcrumbItems={[
          { label: "Destinations", href: "/destinations" },
          { label: dest.code },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/destinations")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Destinations
          </Button>
        }
      />

      {/* Temporary Closure Alert Banner */}
      {dest.temporaryClosure?.status === "Closed" && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold text-rose-900 dark:text-rose-100 block">
                TEMPORARY OPERATING CLOSURE ON {dest.temporaryClosure.date}
              </span>
              <span className="text-rose-700 dark:text-rose-300">
                Reason: {dest.temporaryClosure.reason} (Master Record remains Active for future scheduling).
              </span>
            </div>
          </div>
          <span className="px-2 py-1 rounded bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold uppercase text-[10px]">
            CLOSED TODAY
          </span>
        </div>
      )}

      {/* Destination Detail Header Banner */}
      <DetailHeader
        title={dest.name}
        code={dest.code}
        subtitle={`${dest.type} · ${dest.city} · ${dest.region}`}
        status={masterStatus === "Active" ? "Available" : "Inactive"}
        metrics={[
          { label: "Operating Hours", value: dest.operatingHoursText },
          { label: "Guide Requirement", value: dest.guideRequirement },
          { label: "Vehicle Restriction", value: dest.vehicleRestriction },
          { label: "Ticket From", value: `Rp ${dest.startingTicketFee.toLocaleString("id-ID")}` },
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
              {masterStatus === "Inactive" ? "Deactivated" : "Deactivate Destination"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/destinations/new")}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Master Data
            </Button>
          </>
        }
      />

      {/* Operational Summary Card */}
      <Card className="p-5 bg-gradient-to-r from-teal-50/50 via-emerald-50/20 to-white dark:from-[#101726] dark:to-[#0F1726] border-teal-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              OPERATIONAL DESTINATION SUMMARY
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono font-semibold">
            Dispatcher Location Context
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Guide Requirement</span>
            <div className="mt-1">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                dest.guideRequirement === "Required"
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                  : dest.guideRequirement === "Recommended"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}>
                {dest.guideRequirement}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Vehicle Restriction</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block flex items-center gap-1">
              <Truck className="w-3 h-3 text-teal-600" />
              {dest.vehicleRestriction}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Recommended Arrival</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {dest.recommendedArrivalTime} WIB
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Booking Required</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              {dest.bookingRequired ? `Yes (${dest.bookingLeadTimeDays || 1} Day Lead)` : "No (On-Site Ticket)"}
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
            {/* Section A: Destination Information */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Compass className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Destination Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Destination Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{dest.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Type Category</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{dest.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">City / Area</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{dest.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Region</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{dest.region}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Full Address</span>
                  <span className="text-slate-700 dark:text-slate-300">{dest.address}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block">Operational Description</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{dest.description}</p>
                </div>
              </div>
            </Card>

            {/* Section B: Location & Map Coordinates Reference */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Location & Map Coordinates
                </h3>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162034]/60 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Geographic Coordinates Reference
                </span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>Lat: <strong className="text-slate-800 dark:text-slate-200">{dest.lat}</strong></span>
                  <span>Lng: <strong className="text-slate-800 dark:text-slate-200">{dest.lng}</strong></span>
                </div>
              </div>
            </Card>
          </div>

          {/* Section C: Contextual Experienced Guides & Nearby Partner Hotels Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Experienced Guides (Contextual Preview)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono font-semibold">Master Resource Match</span>
              </div>

              {experiencedGuides.length > 0 ? (
                <div className="space-y-2 text-xs">
                  {experiencedGuides.map((g) => {
                    const de = g.destinationExperiences.find((d) => d.destinationName.toLowerCase().includes(dest.name.toLowerCase()));
                    return (
                      <div key={g.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 block">{g.fullName} ({g.code})</span>
                          <span className="text-[11px] text-slate-400">{g.languages.join(", ")}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                          {de?.level || "Expert"} ({de?.tripsCount || 20} Trips)
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Any active licensed guide can be assigned based on Dispatcher availability.</p>
              )}
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Nearby Partner Hotels (Contextual Preview)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono font-semibold">Accommodation Match</span>
              </div>

              {nearbyHotels.length > 0 ? (
                <div className="space-y-2 text-xs">
                  {nearbyHotels.map((h) => (
                    <div key={h.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">{h.name}</span>
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{h.category} · {h.city}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {h.totalAvailableRooms} Rooms
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No specific partner hotels configured in immediate city radius.</p>
              )}
            </Card>
          </div>

          {/* Section D: Activity History */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Destination Master Activity History
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {dest.activityHistory.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
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

      {/* TAB 2: OPERATING HOURS */}
      {activeTab === "hours" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Weekly Operating Hours Schedule
              </h3>
              <p className="text-xs text-slate-400">Used by Dispatcher to prevent out-of-bounds tour departures</p>
            </div>
          </div>

          <DataTable
            columns={[
              { key: "dayName", header: "Day", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.dayName}</span> },
              { key: "operatingWindow", header: "Operating Window", render: (r) => <span className="font-mono text-slate-800 dark:text-slate-200">{r.openTime} – {r.closeTime}</span> },
              { key: "isOpen", header: "Open Status", render: (r) => <Badge variant={r.isOpen ? "emerald" : "danger"}>{r.isOpen ? "Open" : "Closed"}</Badge> },
            ]}
            data={dest.weeklySchedule}
            keyExtractor={(row) => row.dayName}
          />
        </Card>
      )}

      {/* TAB 3: FEES */}
      {activeTab === "fees" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Ticket & Entrance Fees Structure
              </h3>
              <p className="text-xs text-slate-400">Current and effective rate periods for cost calculations</p>
            </div>
          </div>

          <DataTable
            columns={[
              { key: "categoryName", header: "Ticket Category / Fee Name", render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.categoryName}</span> },
              { key: "amount", header: "Fee Amount", render: (r) => <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">Rp {r.amount.toLocaleString("id-ID")}</span> },
              { key: "effectivePeriod", header: "Effective Period", render: (r) => <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{r.effectiveFrom} – {r.effectiveUntil}</span> },
              { key: "status", header: "Status", render: (r) => <Badge variant={r.status === "Active" ? "emerald" : "slate"}>{r.status}</Badge> },
            ]}
            data={dest.ticketFees}
            keyExtractor={(row) => row.id}
          />
        </Card>
      )}

      {/* TAB 4: REQUIREMENTS */}
      {activeTab === "requirements" && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Access Requirements & Restrictions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GUIDE REQUIREMENT</span>
              <span className={`px-2.5 py-1 rounded text-xs font-bold w-fit block ${
                dest.guideRequirement === "Required"
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                  : dest.guideRequirement === "Recommended"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}>
                {dest.guideRequirement}
              </span>
              {dest.guideRequirementReason && (
                <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1">{dest.guideRequirementReason}</p>
              )}
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">VEHICLE RESTRICTION</span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm block">
                {dest.vehicleRestriction}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ADVANCE BOOKING</span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm block">
                {dest.bookingRequired ? `Required (${dest.bookingLeadTimeDays || 1} Day Lead)` : "Not Required"}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RECOMMENDED ARRIVAL TIME</span>
              <span className="font-mono font-extrabold text-teal-600 dark:text-teal-400 text-sm block">
                {dest.recommendedArrivalTime} WIB
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 5: RULES & NOTES */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Destination Rules & Safety Restrictions
              </h3>
            </div>

            <ul className="space-y-2 text-xs">
              {dest.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Compass className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Operational Field Notes for Dispatcher & Crew
              </h3>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {dest.operationalNotes}
            </p>
          </Card>
        </div>
      )}

      {/* TAB 6: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Destination Master Activity History
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {dest.activityHistory.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
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
