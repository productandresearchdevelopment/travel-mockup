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
import { Tabs } from "@/components/ui/Tabs";
import {
  CalendarCheck,
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  LayoutList,
  UserCheck,
  Truck,
  Compass,
  Briefcase,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Users,
} from "lucide-react";

interface DeploymentItem {
  id: string;
  code: string;
  bookingCode: string;
  tourName: string;
  date: string;
  paxCount: number;
  guestNames: string;
  journeyRoute: string;
  destination: string;
  vehiclePlate: string;
  vehicleName: string;
  driverName: string;
  guideName: string;
  tmName: string;
  status: "Ready" | "Needs Assignment" | "In Progress" | "Completed" | "Conflict";
  conflictNote?: string;
}

const mockDeploymentsList: DeploymentItem[] = [
  {
    id: "dep-001",
    code: "DEP-2026-00421",
    bookingCode: "BKG-2026-00821",
    tourName: "East Java Explorer (Bromo & Ijen)",
    date: "2026-08-25",
    paxCount: 4,
    guestNames: "Rossella Cescon (+3 Pax)",
    journeyRoute: "Yogyakarta → Bromo → Ijen → Bali",
    destination: "Mount Bromo & Ijen",
    vehiclePlate: "B 1234 XYZ",
    vehicleName: "Toyota Hiace Commuter",
    driverName: "Agus Santoso",
    guideName: "Rian Kurniawan",
    tmName: "Sinta Wijaya",
    status: "Ready",
  },
  {
    id: "dep-002",
    code: "DEP-2026-00422",
    bookingCode: "BKG-2026-00835",
    tourName: "Banyuwangi Ijen Sunrise Trip",
    date: "2026-08-27",
    paxCount: 2,
    guestNames: "Suthasinee Sivara (+1 Pax)",
    journeyRoute: "Surabaya → Bromo → Ijen → Bali",
    destination: "Ijen Crater",
    vehiclePlate: "B 5678 ABC",
    vehicleName: "Toyota Innova Zenix",
    driverName: "Unassigned",
    guideName: "Dimas Saputra",
    tmName: "Unassigned",
    status: "Needs Assignment",
  },
  {
    id: "dep-003",
    code: "DEP-2026-00423",
    bookingCode: "BKG-2026-00888",
    tourName: "Bali South Coast & Uluwatu Sunset",
    date: "2026-08-21",
    paxCount: 6,
    guestNames: "Sarah Wilson (+5 Pax)",
    journeyRoute: "Denpasar → Uluwatu → Ubud",
    destination: "Uluwatu Temple",
    vehiclePlate: "B 3456 GHI",
    vehicleName: "Toyota Hiace Premio",
    driverName: "Dewa Putra",
    guideName: "Made Arya",
    tmName: "Ayu Lestari",
    status: "In Progress",
  },
  {
    id: "dep-004",
    code: "DEP-2026-00424",
    bookingCode: "BKG-2026-00910",
    tourName: "Malang City & Bromo Sunrise",
    date: "2026-08-26",
    paxCount: 3,
    guestNames: "James Wilson (+2 Pax)",
    journeyRoute: "Malang → Bromo",
    destination: "Mount Bromo",
    vehiclePlate: "B 1234 XYZ",
    vehicleName: "Toyota Hiace Commuter",
    driverName: "Agus Santoso",
    guideName: "Rian Kurniawan",
    tmName: "Sinta Wijaya",
    status: "Conflict",
    conflictNote: "Driver Agus Santoso is double-booked on 26 Aug 03:00-18:00",
  },
];

export default function DispatcherMainPage() {
  const [deployments] = useState<DeploymentItem[]>(mockDeploymentsList);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const summary = useMemo(() => {
    return {
      today: 12,
      upcoming: 24,
      inProgress: 8,
      unassigned: 5,
      conflicts: 2,
    };
  }, []);

  const filteredDeployments = useMemo(() => {
    return deployments.filter((d) => {
      const matchSearch =
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.guestNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab =
        activeTab === "all" ||
        (activeTab === "today" && d.date === "2026-08-21") ||
        (activeTab === "in_progress" && d.status === "In Progress") ||
        (activeTab === "needs_assignment" && d.status === "Needs Assignment");

      const matchStatus = statusFilter === "All" || d.status === statusFilter;

      return matchSearch && matchTab && matchStatus;
    });
  }, [deployments, searchQuery, activeTab, statusFilter]);

  return (
    <AppShell>
      <PageHeader
        title="Dispatcher Operational Command"
        description="Plan journeys, assign operational resources, and manage upcoming deployments."
        breadcrumbItems={[{ label: "Operations", href: "/dispatch" }, { label: "Dispatcher" }]}
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

            <Link href="/dispatch/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Create Deployment
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TODAY'S DEPLOYMENTS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{summary.today}</span>
            <span className="text-[10px] text-blue-600 font-bold font-mono">18 Aug 2026</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">UPCOMING DEPARTURES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">{summary.upcoming}</span>
            <Badge variant="blue">Ready</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">IN PROGRESS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.inProgress}</span>
            <Badge variant="emerald">● Active</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">UNASSIGNED DEPLOYMENTS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{summary.unassigned}</span>
            <Badge variant="amber">Needs Resource</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase block">RESOURCE CONFLICTS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{summary.conflicts}</span>
            <Badge variant="danger">🔴 Attention</Badge>
          </div>
        </Card>
      </div>

      {/* FILTER & TABS BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Deployments" },
              { id: "today", label: "Today (18 Aug)" },
              { id: "in_progress", label: "In Progress" },
              { id: "needs_assignment", label: "Needs Assignment" },
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
              placeholder="Search booking, guest, driver, plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* VIEW MODE 1: TABLE VIEW */}
        {viewMode === "table" && (
          <DataTable
            columns={[
              {
                key: "code",
                header: "Deployment & Booking",
                render: (r: DeploymentItem) => (
                  <div className="space-y-0.5">
                    <Link href={`/dispatch/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                      {r.code}
                    </Link>
                    <span className="text-[10px] text-slate-400 font-mono block">{r.bookingCode} · {r.date}</span>
                  </div>
                ),
              },
              {
                key: "tour",
                header: "Tour Product & Route",
                render: (r: DeploymentItem) => (
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">{r.tourName}</span>
                    <span className="font-mono text-[10px] text-blue-600 block">{r.journeyRoute}</span>
                  </div>
                ),
              },
              {
                key: "guests",
                header: "Guests & PAX",
                render: (r: DeploymentItem) => (
                  <div className="text-xs font-mono">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.guestNames}</span>
                    <Badge variant="blue">{r.paxCount} Pax</Badge>
                  </div>
                ),
              },
              {
                key: "vehicle",
                header: "Vehicle Assigned",
                render: (r: DeploymentItem) => (
                  <div className="font-mono text-xs">
                    {r.vehiclePlate !== "Unassigned" ? (
                      <>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.vehiclePlate}</span>
                        <span className="text-[10px] text-slate-400 block">{r.vehicleName}</span>
                      </>
                    ) : (
                      <span className="text-amber-600 font-bold">⚠️ Unassigned</span>
                    )}
                  </div>
                ),
              },
              {
                key: "resources",
                header: "Crew (Driver / Guide / TM)",
                render: (r: DeploymentItem) => (
                  <div className="text-[11px] font-mono space-y-0.5">
                    <div>Drv: <strong className={r.driverName === "Unassigned" ? "text-amber-600" : "text-slate-800 dark:text-slate-200"}>{r.driverName}</strong></div>
                    <div>Gde: <strong className="text-slate-700 dark:text-slate-300">{r.guideName}</strong> · TM: <strong className="text-slate-700 dark:text-slate-300">{r.tmName}</strong></div>
                  </div>
                ),
              },
              {
                key: "status",
                header: "Status",
                render: (r: DeploymentItem) => (
                  <Badge variant={r.status === "Ready" ? "emerald" : r.status === "In Progress" ? "blue" : r.status === "Conflict" ? "danger" : "amber"}>
                    {r.status === "Conflict" ? "🔴 Conflict" : r.status}
                  </Badge>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                render: (r: DeploymentItem) => (
                  <Link href={`/dispatch/${r.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                      View Detail
                    </Button>
                  </Link>
                ),
              },
            ]}
            data={filteredDeployments}
            keyExtractor={(r) => r.id}
          />
        )}

        {/* VIEW MODE 2: VISUAL SCHEDULE CALENDAR VIEW */}
        {viewMode === "calendar" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-400" /> VISUAL SCHEDULE & CONFLICT MATRIX (AUG 2026)
              </span>
              <span className="text-xs text-slate-400">Click entry to inspect resource assignment</span>
            </div>

            <div className="space-y-2">
              {["25 Aug 2026", "26 Aug 2026", "27 Aug 2026"].map((dateStr) => (
                <div key={dateStr} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1 flex justify-between">
                    <span>📅 {dateStr}</span>
                    <span className="text-blue-600 font-bold">2 Deployments Scheduled</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white dark:bg-[#101726] border border-blue-200 dark:border-blue-900/60 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">BKG-2026-00821 · East Java Explorer</span>
                        <Badge variant="emerald">✓ Ready</Badge>
                      </div>
                      <span className="text-[11px] text-slate-500 block">Veh: Hiace (B 1234 XYZ) · Drv: Agus Santoso · Gde: Rian Kurniawan</span>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#101726] border border-rose-200 dark:border-rose-900/60 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">BKG-2026-00910 · Bromo Sunrise</span>
                        <Badge variant="danger">🔴 Conflict</Badge>
                      </div>
                      <span className="text-[11px] text-rose-500 font-bold block">⚠️ Driver Agus Santoso is double-booked on 26 Aug</span>
                    </div>
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
