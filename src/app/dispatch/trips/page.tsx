"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { mockTripsData } from "@/data/mockTripsData";
import { TripRecord } from "@/types/trip";
import {
  PlaySquare,
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Truck,
  User,
  Users,
  Compass,
  ArrowRight,
  LayoutGrid,
  List,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function TripOperationsPage() {
  const router = useRouter();

  const [trips] = useState<TripRecord[]>(mockTripsData);
  const [subTab, setSubTab] = useState<"Active" | "Completed" | "All">("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // Summary Metrics
  const summaryMetrics = useMemo(() => {
    return {
      todaysTrips: 28,
      upcoming: 8,
      inProgress: 12,
      completed: 7,
      issues: 1,
    };
  }, []);

  // Filtered Trips
  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      // Sub-tab filter
      if (subTab === "Active" && (t.status === "Completed" || t.status === "Cancelled")) return false;
      if (subTab === "Completed" && t.status !== "Completed") return false;

      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tourManagerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || t.status === statusFilter;
      const matchRegion = regionFilter === "All" || t.region === regionFilter;

      return matchSearch && matchStatus && matchRegion;
    });
  }, [trips, subTab, searchQuery, statusFilter, regionFilter]);

  return (
    <AppShell>
      <PageHeader
        title="Trip Operations"
        description="Monitor active, upcoming, and completed operational tour trips in real-time."
        breadcrumbItems={[
          { label: "Operations", href: "/dispatch" },
          { label: "Trip Operations" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/dispatch/tracking">
              <Button variant="outline" size="sm" leftIcon={<Compass className="w-3.5 h-3.5 text-blue-600" />}>
                Live GPS Map
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top Operational Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">TODAY'S TRIPS</span>
            <PlaySquare className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">{summaryMetrics.todaysTrips}</p>
          <span className="text-[10px] text-slate-400">Total Scheduled</span>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">UPCOMING</span>
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">{summaryMetrics.upcoming}</p>
          <span className="text-[10px] text-slate-400">Departure Soon</span>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">IN PROGRESS</span>
            <Play className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{summaryMetrics.inProgress}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Active On Trip</span>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">COMPLETED</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">{summaryMetrics.completed}</p>
          <span className="text-[10px] text-teal-600 font-semibold">Finished 100%</span>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">ACTIVE ISSUES</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">{summaryMetrics.issues}</p>
          <span className="text-[10px] text-rose-600 font-semibold">Action Required</span>
        </Card>
      </div>

      {/* Sub-Tab Selector (Active Trips vs Completed Trips vs All) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setSubTab("Active")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            subTab === "Active"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#162034]"
          }`}
        >
          Active & Upcoming Trips ({trips.filter((t) => t.status !== "Completed").length})
        </button>

        <button
          onClick={() => setSubTab("Completed")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            subTab === "Completed"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#162034]"
          }`}
        >
          ✓ Completed Trips History ({trips.filter((t) => t.status === "Completed").length})
        </button>

        <button
          onClick={() => setSubTab("All")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            subTab === "All"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#162034]"
          }`}
        >
          All Operations ({trips.length})
        </button>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search trip, plate, driver, TM, dest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-40">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "Scheduled", label: "Scheduled" },
                { value: "Ready", label: "Ready" },
                { value: "In Progress", label: "In Progress" },
                { value: "Delayed", label: "Delayed" },
                { value: "Completed", label: "Completed" },
              ]}
            />
          </div>

          <div className="w-full sm:w-40">
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={[
                { value: "All", label: "All Regions" },
                { value: "East Java", label: "East Java" },
                { value: "Banyuwangi", label: "Banyuwangi" },
                { value: "Bali", label: "Bali" },
              ]}
            />
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 p-1 rounded-lg bg-slate-50 dark:bg-[#162034] self-end md:self-auto">
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === "table" ? "bg-white dark:bg-[#101726] text-blue-600 shadow-xs font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === "card" ? "bg-white dark:bg-[#101726] text-blue-600 shadow-xs font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === "table" ? (
        <Card className="p-0 overflow-hidden">
          <DataTable
            columns={[
              {
                key: "code",
                header: "Trip / Ref",
                render: (t: TripRecord) => (
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{t.name}</span>
                    <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">{t.code}</span>
                  </div>
                ),
              },
              {
                key: "schedule",
                header: subTab === "Completed" ? "Completed Time" : "Scheduled Time",
                render: (t: TripRecord) => (
                  <div className="text-xs font-mono">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">{t.date}</span>
                    <span className="text-[11px] text-slate-500">
                      {t.status === "Completed" ? `Finished: ${t.completedAt}` : `${t.departureTime} – ${t.estimatedEndTime}`}
                    </span>
                  </div>
                ),
              },
              {
                key: "destination",
                header: "Destination",
                render: (t: TripRecord) => (
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{t.destinationName}</span>
                ),
              },
              {
                key: "vehicle",
                header: "Assigned Vehicle",
                render: (t: TripRecord) => (
                  <div>
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 block">{t.vehicleName}</span>
                    <span className="font-mono text-[11px] text-blue-600 font-bold">{t.vehiclePlate}</span>
                  </div>
                ),
              },
              { key: "driver", header: "Driver", render: (t: TripRecord) => <span className="text-xs text-slate-700 dark:text-slate-300">{t.driverName}</span> },
              {
                key: "performance",
                header: subTab === "Completed" ? "Schedule Performance" : "Status",
                render: (t: TripRecord) =>
                  t.status === "Completed" ? (
                    <div>
                      <Badge variant={t.performanceStatus === "On Schedule" ? "emerald" : "amber"}>
                        {t.performanceStatus || "Completed"}
                      </Badge>
                      <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
                        Variance: {t.scheduleVariance || "+0 min"}
                      </span>
                    </div>
                  ) : (
                    <Badge variant={t.status === "In Progress" ? "emerald" : t.status === "Ready" ? "blue" : t.status === "Delayed" ? "danger" : "slate"}>
                      ● {t.status}
                    </Badge>
                  ),
              },
              {
                key: "action",
                header: "Action",
                render: (t: TripRecord) => (
                  <Link href={`/dispatch/trips/${t.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                      {t.status === "Completed" ? "View Summary" : "View Trip"}
                    </Button>
                  </Link>
                ),
              },
            ]}
            data={filteredTrips}
            keyExtractor={(t) => t.id}
          />
        </Card>
      ) : (
        /* CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrips.map((t) => (
            <Card key={t.id} className="p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 block">{t.code}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{t.name}</h3>
                  <span className="text-xs text-slate-500">{t.destinationName} ({t.city})</span>
                </div>
                <Badge variant={t.status === "Completed" ? "emerald" : t.status === "In Progress" ? "blue" : "slate"}>
                  ● {t.status}
                </Badge>
              </div>

              {/* Vehicle & Crew Summary */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#162034] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t.vehiclePlate} ({t.vehicleName})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Driver:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{t.driverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resource Status:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {t.status === "Completed" ? "✓ Released / Available" : "On Trip"}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-mono text-slate-400">
                  {t.status === "Completed" ? `Finished: ${t.completedAt}` : `${t.departureTime} – ${t.estimatedEndTime}`}
                </span>
                <Link href={`/dispatch/trips/${t.id}`}>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                    <span>{t.status === "Completed" ? "View Summary" : "View Trip"}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
