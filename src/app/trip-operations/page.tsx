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
  Eye,
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
              <Button variant="outline" size="sm">
                Open Live Tracking
              </Button>
            </Link>
            <Link href="/dispatcher">
              <Button size="sm">
                Open Dispatcher
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP METRICS SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            ACTIVE TRIPS
          </span>
          <strong className="text-2xl font-extrabold text-blue-400 block">{metrics.total}</strong>
          <span className="text-slate-400 text-[10px]">On Journey</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            IN PROGRESS
          </span>
          <strong className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">{metrics.inProgress}</strong>
          <span className="text-slate-500 text-[10px]">On Track</span>
        </Card>

        <Card className="p-4 space-y-1 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
            DELAYED TRIPS
          </span>
          <strong className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 block">{metrics.delayed}</strong>
          <span className="text-slate-500 text-[10px]">Schedule Variance</span>
        </Card>

        <Card className="p-4 space-y-1 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider block">
            OPEN EXCEPTIONS
          </span>
          <strong className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 block">{metrics.openIssues}</strong>
          <span className="text-rose-600 text-[10px] font-bold">Action Required</span>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-6 space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Trip Operations Roster
            </h3>
            <Badge variant="violet">Live Execution</Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-64">
              <SearchInput
                placeholder="Search trip code, guest, vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "In Progress", label: "In Progress" },
                { value: "Delayed", label: "Delayed" },
              ]}
            />
          </div>
        </div>

        <DataTable
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
                  <span className="font-bold text-emerald-600 block">📍 {r.currentLocation}</span>
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
              header: "Status & Issue",
              render: (r: TripItem) => (
                <div className="space-y-1">
                  <Badge variant={r.status === "In Progress" ? "violet" : "amber"}>
                    {r.status}
                  </Badge>
                  {r.hasOpenIssue && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-600 font-bold text-[10px] block">
                      ⚠ Open Exception
                    </span>
                  )}
                </div>
              ),
            },
            {
              key: "actions",
              header: "Action",
              render: (r: TripItem) => (
                <div className="flex justify-end">
                  <Link href={`/trip-operations/${r.id}`}>
                    <Button size="sm" variant="outline" className="h-7 text-[11px] font-bold">
                      Open Operational Control
                    </Button>
                  </Link>
                </div>
              ),
            },
          ]}
          data={filteredTrips}
          keyExtractor={(r) => r.id}
        />
      </Card>
    </AppShell>
  );
}
