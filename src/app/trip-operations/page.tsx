"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { DataTable } from "@/components/ui/DataTable";
import {
  Compass,
  PlaySquare,
  Clock,
  AlertTriangle,
  Eye,
  Navigation,
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
    paxCount: 12,
    guestNames: "Rossella Cescon (+11 Pax)",
    journeyRoute: "Yogyakarta → Malang → Probolinggo → Bali",
    currentLocation: "Probolinggo (Hotel Santika)",
    nextDestination: "Ijen Crater, Banyuwangi",
    progressPercent: 65,
    vehiclePlate: "B 1234 XYZ",
    vehicleName: "HiAce Premio #02",
    driverName: "Agus Santoso",
    guideName: "Rian Kurniawan",
    tmName: "Dimas Anggara",
    status: "In Progress",
    hasOpenIssue: true,
  },
  {
    id: "trip-002",
    code: "TRP-2026-00422",
    bookingCode: "BKG-2026-00910",
    tourName: "Bromo Sunrise Express",
    date: "2026-08-26",
    paxCount: 6,
    guestNames: "Hans Mueller (+5 Pax)",
    journeyRoute: "Surabaya → Bromo → Surabaya",
    currentLocation: "Juanda Airport Surabaya",
    nextDestination: "Penanjakan 1 Bromo",
    progressPercent: 20,
    vehiclePlate: "N 5678 ABC",
    vehicleName: "Innova Reborn #04",
    driverName: "Agus Santoso",
    guideName: "Eko Prasetyo",
    tmName: "Unassigned",
    status: "Delayed",
    hasOpenIssue: true,
  },
  {
    id: "trip-003",
    code: "TRP-2026-00423",
    bookingCode: "BKG-2026-00955",
    tourName: "Bali Cultural Overland",
    date: "2026-08-27",
    paxCount: 15,
    guestNames: "Siti Rahma (+14 Pax)",
    journeyRoute: "Gilimanuk → Ubud → Kuta",
    currentLocation: "Ubud Art Village",
    nextDestination: "Tanah Lot Temple",
    progressPercent: 85,
    vehiclePlate: "DK 9901 AB",
    vehicleName: "Isuzu Elf Long #02",
    driverName: "Budi Pratama",
    guideName: "Wayan Sudiarta",
    tmName: "Kadek Arta",
    status: "In Progress",
  },
];

export default function TripOperationsPage() {
  const [trips] = useState<TripItem[]>(mockTripsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const matchSearch =
        t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.guestNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.driverName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || t.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [trips, searchQuery, statusFilter]);

  const metrics = useMemo(() => {
    return {
      total: trips.length,
      inProgress: trips.filter((t) => t.status === "In Progress").length,
      delayed: trips.filter((t) => t.status === "Delayed").length,
      openIssues: trips.filter((t) => t.hasOpenIssue).length,
    };
  }, [trips]);

  return (
    <AppShell>
      <PageHeader
        title="Trip Operations Management"
        description="Real-time execution monitoring, journey timelines, guest dynamic management & operational exceptions"
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Trip Operations" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/live-tracking">
              <Button size="sm" leftIcon={<Navigation className="w-3.5 h-3.5" />}>
                Live Tracking
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP SUMMARY METRIC CARDS (Minimalist Stripe/Linear SaaS Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="Active Trips"
          value={metrics.total}
          subtitle="On Journey"
          icon={<Compass className="w-4 h-4" />}
          variant="blue"
        />
        <MetricCard
          title="In Progress"
          value={metrics.inProgress}
          subtitle="On Track"
          icon={<PlaySquare className="w-4 h-4" />}
          variant="emerald"
        />
        <MetricCard
          title="Delayed Trips"
          value={metrics.delayed}
          subtitle="Variance"
          icon={<Clock className="w-4 h-4" />}
          variant="amber"
        />
        <MetricCard
          title="Open Exceptions"
          value={metrics.openIssues}
          subtitle="Action Needed"
          icon={<AlertTriangle className="w-4 h-4" />}
          variant="rose"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE (Matching Guests & Dispatcher Page System) */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search trip code, booking, guest, driver..."
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "All", label: "All Statuses" },
              { value: "In Progress", label: "In Progress" },
              { value: "Delayed", label: "Delayed" },
            ],
          },
        ]}
        columns={[
          {
            key: "code",
            header: "Trip Code & Booking",
            render: (r: TripItem) => (
              <div className="space-y-0.5 font-mono text-xs">
                <Link href={`/trip-operations/${r.id}`} className="font-extrabold text-blue-600 hover:underline block">
                  {r.code}
                </Link>
                <span className="text-slate-400 text-[10px] block">{r.bookingCode}</span>
              </div>
            ),
          },
          {
            key: "tour",
            header: "Tour & Route",
            render: (r: TripItem) => (
              <div className="space-y-0.5 font-mono text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.tourName}</span>
                <span className="text-slate-500 text-[11px] block">{r.journeyRoute}</span>
              </div>
            ),
          },
          {
            key: "location",
            header: "Current Location & Next",
            render: (r: TripItem) => (
              <div className="space-y-0.5 font-mono text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">📍 {r.currentLocation}</span>
                <span className="text-slate-400 text-[10px] block">Next: {r.nextDestination}</span>
              </div>
            ),
          },
          {
            key: "crew",
            header: "Vehicle & Crew",
            render: (r: TripItem) => (
              <div className="space-y-0.5 font-mono text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.vehicleName} ({r.vehiclePlate})</span>
                <span className="text-slate-500 text-[11px] block">Drv: {r.driverName} · Gde: {r.guideName}</span>
              </div>
            ),
          },
          {
            key: "status",
            header: "Status & Exception",
            render: (r: TripItem) => (
              <div className="flex items-center gap-1.5">
                <Badge variant={r.status === "In Progress" ? "blue" : r.status === "Delayed" ? "amber" : "emerald"}>
                  {r.status}
                </Badge>
                {r.hasOpenIssue && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold text-[10px] font-mono">
                    ⚠ Issue
                  </span>
                )}
              </div>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: (r: TripItem) => (
              <div className="flex justify-end">
                <Link href={`/trip-operations/${r.id}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-center transition-all duration-200 group"
                    title="View Detail"
                  >
                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </button>
                </Link>
              </div>
            ),
          },
        ]}
        data={filteredTrips}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
