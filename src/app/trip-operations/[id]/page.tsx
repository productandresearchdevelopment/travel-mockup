"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import TripCostsTab from "@/components/trips/TripCostsTab";
import TripGuestsTab from "@/components/trips/TripGuestsTab";
import PickupDropoffTab from "@/components/trips/PickupDropoffTab";
import TransportTab from "@/components/trips/TransportTab";
import OperationalMonitoringTab from "@/components/trips/OperationalMonitoringTab";
import TripActivityTimeline from "@/components/trips/TripActivityTimeline";
import {
  Compass,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Users,
  Truck,
  UserCheck,
  Briefcase,
  Hotel,
  Train,
  Plus,
  ShieldCheck,
  ArrowLeft,
  Lock,
  MessageSquare,
  Activity,
  FileCheck,
} from "lucide-react";

export default function TripOperationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params.id as string) || "TRP-2026-00421";
  const tripId = rawId.toUpperCase();

  const [activeTab, setActiveTab] = useState("overview");

  // Determine if trip is Simple or Complex based on ID
  const isSimpleTrip = tripId.includes("00418");

  // Trip Data Scenarios
  const trip = useMemo(() => {
    if (isSimpleTrip) {
      return {
        id: "TRP-2026-00418",
        code: "TRP-2026-00418",
        bookingCode: "BKG-2026-00750",
        deploymentCode: "DEP-2026-00750",
        tourPackageName: "Borobudur & Prambanan Private Day Tour",
        journeyRoute: "Yogyakarta → Borobudur → Prambanan → Yogyakarta",
        startDate: "25 Aug 2026",
        endDate: "25 Aug 2026",
        status: "In Progress",
        progressPercent: 75,
        currentSegment: "Prambanan Temple Exploration",
        currentLocation: "Prambanan Temple Complex",
        nextDestination: "The Phoenix Hotel Yogyakarta",
        primaryGuestName: "James Anderson",
        totalGuestsCount: 2,
        originalGuestCount: 2,
        joinedMidTripCount: 0,
        assignedVehicle: "Toyota HiAce (AB 1234 CD)",
        assignedDriver: "Agus Santoso",
        vendorName: "Jogja Trans",
        assignedGuide: "Rian Kurniawan",
        assignedTM: "Dimas Anggara",
        isSimple: true,
        vehicleChange: false,
        driverChange: false,
        pickupStatus: "Completed (07:00 at Phoenix Hotel)",
        dropoffStatus: "Pending (18:30 at Phoenix Hotel)",
      };
    }

    // Default Complex Trip (TRP-2026-00421)
    return {
      id: "TRP-2026-00421",
      code: "TRP-2026-00421",
      bookingCode: "BKG-2026-00821",
      deploymentCode: "DEP-2026-00421",
      tourPackageName: "East Java Explorer — Bromo, Ijen & Bali",
      journeyRoute: "Yogyakarta → Malang → Probolinggo → Bali",
      startDate: "25 Aug 2026",
      endDate: "29 Aug 2026",
      status: "In Progress",
      progressPercent: 65,
      currentSegment: "Overland Malang → Probolinggo",
      currentLocation: "Probolinggo (Hotel Santika)",
      nextDestination: "Ijen Crater, Banyuwangi",
      primaryGuestName: "Michael Carter",
      totalGuestsCount: 12,
      originalGuestCount: 8,
      joinedMidTripCount: 4,
      assignedVehicle: "Toyota HiAce #02 (L 8901 GH)",
      assignedDriver: "Budi Pratama (Handover from Agus Santoso)",
      vendorName: "East Java Transport",
      assignedGuide: "Rian Kurniawan",
      assignedTM: "Dimas Anggara",
      isSimple: false,
      vehicleChange: true,
      driverChange: true,
      pickupStatus: "Completed (2 Pickups: Phoenix Hotel & Malang Station)",
      dropoffStatus: "Scheduled (10 Bali Vehicle + 2 Banyuwangi Train Ticket)",
    };
  }, [isSimpleTrip]);

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "guests", label: `Guest Manifest (${trip.totalGuestsCount})` },
    { id: "transport", label: trip.isSimple ? "Transport" : "Transport (2 Segments)" },
    { id: "pickup_dropoff", label: "Pickup & Drop-off" },
    { id: "costs", label: "Costs & Profitability" },
    { id: "monitoring", label: "Operational Monitoring" },
    { id: "timeline", label: "Activity Timeline" },
  ];

  return (
    <AppShell>
      <PageHeader
        title={`${trip.code} — Operational Control`}
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Trip Operations", href: "/trip-operations" },
          { label: trip.code },
        ]}
      />

      {/* HIGHLIGHTED HERO DETAIL BANNER */}
      <DetailHeader
        title={trip.code}
        subtitle={`${trip.tourPackageName} (${trip.startDate}${trip.startDate !== trip.endDate ? ` – ${trip.endDate}` : ""})`}
        status={trip.status}
        metrics={[
          { label: "Primary Guest", value: trip.primaryGuestName },
          {
            label: "Total Pax",
            value: trip.isSimple
              ? `${trip.totalGuestsCount} Guests (Full Tour)`
              : `${trip.totalGuestsCount} Guests (${trip.originalGuestCount} Initial + ${trip.joinedMidTripCount} Joined)`,
          },
          { label: "Current Location", value: trip.currentLocation },
          { label: "Vehicle & Driver", value: `${trip.assignedVehicle} · ${trip.assignedDriver}` },
        ]}
      />

      {/* Detail Navigation Tabs */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB CONTENTS */}
      {activeTab === "overview" && (
        <div className="space-y-6 font-mono text-xs">
          {/* OPERATIONAL SUMMARY CARD (DYNAMIC FOR SIMPLE VS COMPLEX SCENARIO) */}
          <Card className="p-5 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-blue-100 dark:border-blue-900/50">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-xs flex items-center gap-1.5 font-sans">
                  <Activity className="w-4 h-4 text-blue-600" /> OPERATIONAL SUMMARY
                </span>
                <Badge variant={trip.isSimple ? "slate" : "blue"}>
                  {trip.isSimple ? "Single Transport Operation" : "Multi-Segment Overland"}
                </Badge>
              </div>
              <Badge variant="blue">Progress: {trip.progressPercent}% Completed</Badge>
            </div>

            {/* DYNAMIC SUMMARY GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">TRIP STATUS</span>
                <strong className="text-sm font-extrabold text-blue-600 dark:text-blue-400 block">{trip.status}</strong>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">TOTAL GUESTS</span>
                <strong className="text-sm font-extrabold text-slate-900 dark:text-white block">{trip.totalGuestsCount} Guests</strong>
                <span className="text-[10px] text-slate-500 block">
                  {trip.isSimple ? "No Guest Changes" : `+${trip.joinedMidTripCount} Added Mid-Trip`}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">VEHICLES & DRIVERS</span>
                <strong className="text-sm font-extrabold text-slate-900 dark:text-white block">
                  {trip.isSimple ? "1 Vehicle / 1 Driver" : "2 Vehicles / 2 Drivers"}
                </strong>
                <span className="text-[10px] text-slate-500 block">
                  {trip.vehicleChange ? "Handover at Probolinggo" : "Single Assignment"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">PICKUP STATUS</span>
                <strong className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block">✓ Completed</strong>
                <span className="text-[10px] text-slate-500 block">{trip.isSimple ? "Phoenix Hotel" : "Phoenix & Malang Stn"}</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">DROP-OFF STATUS</span>
                <strong className="text-sm font-extrabold text-amber-600 dark:text-amber-400 block">Pending</strong>
                <span className="text-[10px] text-slate-500 block">{trip.isSimple ? "Phoenix Hotel" : "Bali & Banyuwangi Tkt"}</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">OPERATIONAL ISSUES</span>
                <strong className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block">None</strong>
                <span className="text-[10px] text-slate-500 block">On Schedule</span>
              </div>
            </div>
          </Card>

          {/* TIMELINE OVERVIEW EMBED */}
          <TripActivityTimeline tripId={trip.id} />
        </div>
      )}

      {activeTab === "guests" && <TripGuestsTab tripId={trip.id} />}
      {activeTab === "transport" && <TransportTab tripId={trip.id} />}
      {activeTab === "pickup_dropoff" && <PickupDropoffTab tripId={trip.id} />}
      {activeTab === "costs" && <TripCostsTab tripId={trip.id} paxCount={trip.totalGuestsCount} />}
      {activeTab === "monitoring" && <OperationalMonitoringTab tripId={trip.id} />}
      {activeTab === "timeline" && <TripActivityTimeline tripId={trip.id} />}
    </AppShell>
  );
}
