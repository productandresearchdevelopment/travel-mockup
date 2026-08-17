"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import {
  Compass,
  PlaySquare,
  Search,
  Filter,
  Calendar as CalendarIcon,
  LayoutList,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Users,
  Truck,
  UserCheck,
} from "lucide-react";

interface TripItem {
  id: string;
  code: string;
  bookingCode: string;
  tourName: string;
  date: string;
  paxCount: number;
  guestNames: string;
  journeyRoute: string;
  currentLocation: string;
  nextDestination: string;
  progressPercent: number;
  vehiclePlate: string;
  vehicleName: string;
  driverName: string;
  guideName: string;
  tmName: string;
  status: "In Progress" | "Upcoming" | "Delayed" | "Completed" | "Scheduled";
  hasOpenIssue?: boolean;
}

const mockTripsList: TripItem[] = [
  {
    id: "trip-001",
    code: "TRP-2026-00421",
    bookingCode: "BKG-2026-00821",
    tourName: "East Java Explorer (BP, BROMO, IJEN)",
    date: "2026-08-25",
    paxCount: 4,
    guestNames: "Rossella Cescon (+3 Pax)",
    journeyRoute: "Yogyakarta → Bromo → Ijen → Bali",
    currentLocation: "Mount Bromo",
    nextDestination: "Ijen Crater",
    progressPercent: 65,
    vehiclePlate: "B 1234 XYZ",
    vehicleName: "Toyota Hiace Commuter",
    driverName: "Agus Santoso",
    guideName: "Rian Kurniawan",
    tmName: "Sinta Wijaya",
    status: "In Progress",
    hasOpenIssue: true,
  },
  {
    id: "trip-002",
    code: "TRP-2026-00422",
    bookingCode: "BKG-2026-00835",
    tourName: "Banyuwangi Ijen Sunrise & Red Island",
    date: "2026-08-27",
    paxCount: 2,
    guestNames: "Suthasinee Sivara (+1 Pax)",
    journeyRoute: "Surabaya → Bromo → Ijen → Bali",
    currentLocation: "Surabaya Pickup Point",
    nextDestination: "Mount Bromo",
    progressPercent: 15,
    vehiclePlate: "B 5678 ABC",
    vehicleName: "Toyota Innova Zenix",
    driverName: "Budi Hartono",
    guideName: "Dimas Saputra",
    tmName: "Sinta Wijaya",
    status: "Delayed",
  },
  {
    id: "trip-003",
    code: "TRP-2026-00423",
    bookingCode: "BKG-2026-00888",
    tourName: "Bali South Coast & Uluwatu Sunset",
    date: "2026-08-21",
    paxCount: 6,
    guestNames: "Sarah Wilson (+5 Pax)",
    journeyRoute: "Denpasar → Uluwatu → Ubud",
    currentLocation: "Uluwatu Temple",
    nextDestination: "Ubud Hotel Drop-off",
    progressPercent: 80,
    vehiclePlate: "B 3456 GHI",
    vehicleName: "Toyota Hiace Premio",
    driverName: "Dewa Putra",
    guideName: "Made Arya",
    tmName: "Ayu Lestari",
    status: "In Progress",
  },
  {
    id: "trip-004",
    code: "TRP-2026-00399",
    bookingCode: "BKG-2026-00710",
    tourName: "Malang City & Bromo Sunrise",
    date: "2026-08-18",
    paxCount: 3,
    guestNames: "James Wilson (+2 Pax)",
    journeyRoute: "Malang → Bromo → Surabaya",
    currentLocation: "Surabaya Drop-off Complete",
    nextDestination: "Completed",
    progressPercent: 100,
    vehiclePlate: "B 1234 XYZ",
    vehicleName: "Toyota Hiace Commuter",
    driverName: "Agus Santoso",
    guideName: "Rian Kurniawan",
    tmName: "Sinta Wijaya",
    status: "Completed",
  },
];

export default function TripOperationsMainPage() {
  const [trips] = useState<TripItem[]>(mockTripsList);
  const [activeTab, setActiveTab] = useState("in_progress");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [searchQuery, setSearchQuery] = useState("");

  const summary = useMemo(() => {
    return {
      active: 8,
      upcoming: 14,
      completedToday: 6,
      delayed: 2,
      issues: 3,
    };
  }, []);

  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const matchSearch =
        t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.guestNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.driverName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab =
        activeTab === "all" ||
        (activeTab === "in_progress" && t.status === "In Progress") ||
        (activeTab === "delayed" && t.status === "Delayed") ||
        (activeTab === "completed" && t.status === "Completed") ||
        (activeTab === "upcoming" && t.status === "Upcoming");

      return matchSearch && matchTab;
    });
  }, [trips, searchQuery, activeTab]);

  return (
    <AppShell>
      <PageHeader
        title="Live Trip Operations & Execution"
        description="Monitor active journeys, milestone execution, field resource status, and operational issues."
        breadcrumbItems={[{ label: "Operations", href: "/dispatch" }, { label: "Trip Operations" }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-900">
              <button
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === "table"
                    ? "bg-white dark:bg-[#101726] text-blue-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === "calendar"
                    ? "bg-white dark:bg-[#101726] text-blue-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Schedule Calendar</span>
              </button>
            </div>

            <Link href="/dispatch/tracking">
              <Button variant="primary" size="sm" leftIcon={<Compass className="w-3.5 h-3.5" />}>
                View Live Telemetry Map
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-4 space-y-1 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20">
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase block">ACTIVE TRIPS ON ROAD</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{summary.active}</span>
            <Badge variant="blue">● Moving</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">UPCOMING TRIPS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">{summary.upcoming}</span>
            <span className="text-[10px] text-slate-400 font-mono">Next 48h</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">COMPLETED TODAY</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.completedToday}</span>
            <Badge variant="emerald">✓ Done</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">DELAYED TRIPS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{summary.delayed}</span>
            <Badge variant="amber">⚠️ Delayed</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase block">FIELD ISSUES REPORTED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{summary.issues}</span>
            <Badge variant="danger">🔴 Open</Badge>
          </div>
        </Card>
      </div>

      {/* FILTER & TABS BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: "All Trips" },
              { id: "in_progress", label: "In Progress (8)" },
              { id: "delayed", label: "Delayed (2)" },
              { id: "upcoming", label: "Upcoming (14)" },
              { id: "completed", label: "Completed (6)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <SearchInput
              placeholder="Search trip code, booking, guest, plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* VIEW MODE 1: TRIP OPERATIONS DATA TABLE */}
        {viewMode === "table" && (
          <DataTable
            columns={[
              {
                key: "code",
                header: "Trip Code & Booking",
                render: (r: TripItem) => (
                  <div className="space-y-0.5">
                    <Link href={`/dispatch/trips/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                      {r.code}
                    </Link>
                    <span className="text-[10px] text-slate-400 font-mono block">{r.bookingCode} · {r.date}</span>
                  </div>
                ),
              },
              {
                key: "tour",
                header: "Tour & Overland Route",
                render: (r: TripItem) => (
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">{r.tourName}</span>
                    <span className="font-mono text-[10px] text-blue-600 block">{r.journeyRoute}</span>
                  </div>
                ),
              },
              {
                key: "guests",
                header: "Guests & PAX",
                render: (r: TripItem) => (
                  <div className="text-xs font-mono">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.guestNames}</span>
                    <Badge variant="blue">{r.paxCount} Pax</Badge>
                  </div>
                ),
              },
              {
                key: "location",
                header: "Current Milestone Progress",
                render: (r: TripItem) => (
                  <div className="space-y-1 font-mono text-xs w-44">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold text-slate-800 dark:text-slate-200">📍 {r.currentLocation}</span>
                      <span className="font-bold text-blue-600">{r.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${r.progressPercent}%` }} />
                    </div>
                  </div>
                ),
              },
              {
                key: "vehicle",
                header: "Vehicle & Driver",
                render: (r: TripItem) => (
                  <div className="font-mono text-xs space-y-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.vehiclePlate}</span>
                    <span className="text-[10px] text-slate-400 block">Drv: {r.driverName} · Gde: {r.guideName}</span>
                  </div>
                ),
              },
              {
                key: "status",
                header: "Status",
                render: (r: TripItem) => (
                  <div className="space-y-1">
                    <Badge variant={r.status === "In Progress" ? "blue" : r.status === "Delayed" ? "amber" : r.status === "Completed" ? "emerald" : "slate"}>
                      {r.status === "In Progress" ? "● In Progress" : r.status === "Delayed" ? "⚠️ Delayed" : r.status}
                    </Badge>
                    {r.hasOpenIssue && (
                      <span className="text-[9px] text-rose-500 font-bold font-mono block">⚠️ 1 Open Issue</span>
                    )}
                  </div>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                render: (r: TripItem) => (
                  <div className="flex items-center gap-1.5">
                    <Link href={`/dispatch/trips/${r.id}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                        View Detail
                      </Button>
                    </Link>
                    <Link href="/dispatch/tracking">
                      <Button variant="outline" size="sm" className="h-7 text-xs px-1.5 text-blue-600">
                        <Compass className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                ),
              },
            ]}
            data={filteredTrips}
            keyExtractor={(r) => r.id}
          />
        )}

        {/* VIEW MODE 2: SCHEDULE CALENDAR VIEW */}
        {viewMode === "calendar" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-400" /> LIVE TRIP EXECUTION SCHEDULE (AUG 2026)
              </span>
              <span className="text-xs text-slate-400">Click trip to inspect execution progress</span>
            </div>

            <div className="space-y-2">
              {["25 Aug 2026", "27 Aug 2026"].map((dateStr) => (
                <div key={dateStr} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1 flex justify-between">
                    <span>📅 {dateStr}</span>
                    <span className="text-blue-600 font-bold">Active Trip Execution</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-[#101726] border border-blue-200 dark:border-blue-900/60 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">TRP-2026-00421 · East Java Explorer (BP, BROMO, IJEN)</span>
                      <Badge variant="blue">● 65% Progress</Badge>
                    </div>
                    <span className="text-[11px] text-slate-500 block">Current: Mount Bromo · Vehicle: Hiace (B 1234 XYZ) · Driver: Agus Santoso</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </AppShell>
  );
}
