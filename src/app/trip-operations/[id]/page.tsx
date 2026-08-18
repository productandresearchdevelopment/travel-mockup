"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
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
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("overview");

  // Mock Trip detail data
  const trip = {
    id: id || "trip-001",
    code: "TRP-2026-00421",
    bookingCode: "BKG-2026-00821",
    deploymentCode: "DEP-2026-00421",
    tourPackageName: "East Java Explorer (Yogyakarta - Malang - Probolinggo - Bali)",
    journeyRoute: "Yogyakarta → Malang → Probolinggo → Bali",
    startDate: "25 Aug 2026",
    endDate: "30 Aug 2026",
    status: "In Progress",
    progressPercent: 65,
    currentSegment: "Overland Malang → Probolinggo",
    currentLocation: "Probolinggo (Hotel Santika)",
    nextDestination: "Ijen Crater, Banyuwangi",
    primaryGuestName: "Rossella Cescon",
    totalGuestsCount: 12,
    originalGuestCount: 8,
    joinedMidTripCount: 4,
    assignedVehicle: "HiAce Premio #02 (B 5678 ABC)",
    assignedDriver: "Agus Santoso",
    assignedGuide: "Rian Kurniawan",
    assignedTM: "Dimas Anggara",
  };

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "guests", label: `Guest Manifest (${trip.totalGuestsCount})` },
    { id: "transport", label: "Transport Segments" },
    { id: "pickup_dropoff", label: "Pickup & Drop-off" },
    { id: "costs", label: "Costs & Profitability" },
    { id: "monitoring", label: "Operational Monitoring" },
    { id: "timeline", label: "Activity Timeline" },
  ];

  return (
    <AppShell>
      <PageHeader
        title={`${trip.code} — Operational Control`}
        description={`${trip.tourPackageName} · ${trip.journeyRoute}`}
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Trip Operations", href: "/trip-operations" },
          { label: trip.code },
        ]}
      />

      {/* HIGHLIGHTED HERO DETAIL BANNER */}
      <DetailHeader
        title={trip.code}
        subtitle={`${trip.tourPackageName} (${trip.startDate} – ${trip.endDate})`}
        status={trip.status}
        metrics={[
          { label: "Primary Guest", value: trip.primaryGuestName },
          { label: "Total Pax", value: `${trip.totalGuestsCount} Guests (${trip.originalGuestCount} Original + ${trip.joinedMidTripCount} Joined)` },
          { label: "Current Location", value: trip.currentLocation },
          { label: "Vehicle & Driver", value: `${trip.assignedVehicle} · ${trip.assignedDriver}` },
        ]}
      />

      {/* Detail Navigation Tabs */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB CONTENTS */}
      {activeTab === "overview" && (
        <div className="space-y-6 font-mono text-xs">
          {/* LIVE OPERATIONAL STATUS & LATEST TIMELINE BANNER */}
          <Card className="p-5 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-blue-100 dark:border-blue-900/50">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-xs flex items-center gap-1.5 font-sans">
                <Activity className="w-4 h-4 text-blue-600" /> LIVE OPERATIONAL STATUS & PROGRESS
              </span>
              <Badge variant="blue">Progress: {trip.progressPercent}% Completed</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">CURRENT LOCATION</span>
                <strong className="text-sm font-extrabold text-slate-900 dark:text-white block">📍 {trip.currentLocation}</strong>
                <span className="text-slate-500 text-[11px] block">Next: {trip.nextDestination}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">VEHICLE & DRIVER ASSIGNMENT</span>
                <strong className="text-sm font-extrabold text-slate-900 dark:text-white block">{trip.assignedVehicle}</strong>
                <span className="text-blue-600 font-bold block">Driver: {trip.assignedDriver}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-2xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">GUEST MANIFEST STATUS</span>
                <strong className="text-sm font-extrabold text-blue-600 dark:text-blue-400 block">{trip.totalGuestsCount} Guests Total</strong>
                <span className="text-slate-500 text-[11px] block">8 Initial + 4 Mid-Trip Joiners</span>
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
