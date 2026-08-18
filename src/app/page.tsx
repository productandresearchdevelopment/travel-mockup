"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { mockTripsData } from "@/data/mockTripsData";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockTrackingVehicles } from "@/data/mockTrackingData";
import { mockNotificationsData } from "@/data/mockNotificationsData";
import {
  Truck,
  UserCheck,
  Compass,
  Briefcase,
  Building2,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  Radio,
  CheckCircle2,
  RefreshCw,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Plus,
  Users,
  Activity,
} from "lucide-react";

// Dynamically import Leaflet map snapshot component (no SSR)
const MapTracking = dynamic(() => import("@/components/tracking/MapTracking"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-mono">
      <span>Loading Telemetry Snapshot...</span>
    </div>
  ),
});

export default function OperationalOverviewDashboard() {
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [selectedMapVehicleId, setSelectedMapVehicleId] = useState<string | null>("track-001");
  const [isDarkMap, setIsDarkMap] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDarkMap(document.documentElement.classList.contains("dark"));
    }
  }, []);

  // Dynamically calculated mock data based on Region Filter
  const kpiData = useMemo(() => {
    if (regionFilter === "East Java") {
      return { total: 18, active: 8, upcoming: 5, completed: 4, delayed: 1, pax: 210 };
    }
    if (regionFilter === "Banyuwangi") {
      return { total: 6, active: 2, upcoming: 2, completed: 2, delayed: 0, pax: 72 };
    }
    if (regionFilter === "Bali") {
      return { total: 10, active: 4, upcoming: 3, completed: 3, delayed: 0, pax: 132 };
    }
    return { total: 28, active: 12, upcoming: 8, completed: 7, delayed: 1, pax: 342 };
  }, [regionFilter]);

  return (
    <AppShell>
      {/* PAGE HEADER */}
      <PageHeader
        title="Overview"
        description="Monitor today's operations, resources, trips, and fleet status."
        breadcrumbItems={[{ label: "Operational Hub", href: "/" }, { label: "Overview" }]}
        actions={
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-slate-500 hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-[#162034] px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-blue-600" /> Tuesday, 18 August 2026
            </span>
            <div className="w-36 sm:w-40">
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
        }
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Card className="p-4 space-y-2 border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/70 via-indigo-50/20 to-white dark:from-indigo-950/40 dark:via-indigo-950/10 dark:to-[#101726] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-300 font-extrabold uppercase tracking-wider">
              TOTAL TRIPS
            </span>
            <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {kpiData.total}
            </span>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100/80 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full">
              100% Scheduled
            </span>
          </div>
        </Card>

        <Card className="p-4 space-y-2 border-blue-200/90 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/80 via-blue-50/20 to-white dark:from-blue-950/50 dark:via-blue-950/10 dark:to-[#101726] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300 font-extrabold uppercase tracking-wider">
              ACTIVE TRIPS
            </span>
            <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 animate-pulse text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {kpiData.active}
            </span>
            <Badge variant="blue">● In Progress</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-2 border-purple-200/80 dark:border-purple-900/60 bg-gradient-to-b from-purple-50/70 via-purple-50/20 to-white dark:from-purple-950/40 dark:via-purple-950/10 dark:to-[#101726] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-extrabold uppercase tracking-wider">
              UPCOMING
            </span>
            <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-300">
              {kpiData.upcoming}
            </span>
            <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-100/80 dark:bg-purple-950/80 px-2 py-0.5 rounded-full">
              Ready
            </span>
          </div>
        </Card>

        <Card className="p-4 space-y-2 border-emerald-200/90 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/80 via-emerald-50/20 to-white dark:from-emerald-950/50 dark:via-emerald-950/10 dark:to-[#101726] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-extrabold uppercase tracking-wider">
              COMPLETED
            </span>
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {kpiData.completed}
            </span>
            <Badge variant="emerald">✓ Released</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-2 border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-b from-amber-50/80 via-amber-50/20 to-white dark:from-amber-950/50 dark:via-amber-950/10 dark:to-[#101726] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 font-extrabold uppercase tracking-wider">
              DELAYED
            </span>
            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {kpiData.delayed}
            </span>
            <Badge variant="amber">⚠ +42 min</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-2 border-cyan-200/80 dark:border-cyan-900/60 bg-gradient-to-b from-cyan-50/70 via-cyan-50/20 to-white dark:from-cyan-950/40 dark:via-cyan-950/10 dark:to-[#101726] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 font-extrabold uppercase tracking-wider">
              PASSENGERS
            </span>
            <div className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-900/60 text-cyan-600 dark:text-cyan-300 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {kpiData.pax}
            </span>
            <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100/80 dark:bg-cyan-950/80 px-2 py-0.5 rounded-full">
              On-Board
            </span>
          </div>
        </Card>
      </div>

      {/* SECTION 1: ACTIVE OPERATIONS & OPERATIONAL ATTENTION ALERTS (8:4 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Active Operations */}
        <Card className="lg:col-span-8 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Active Operations ({mockTripsData.filter(t => t.status === "In Progress").length})
              </h2>
            </div>
            <Link href="/dispatch/trips" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              View All Trips Operations →
            </Link>
          </div>

          <div className="space-y-3 font-sans">
            {mockTripsData.slice(0, 4).map((trip) => (
              <div
                key={trip.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{trip.name}</span>
                      <span className="font-mono text-xs text-slate-400">({trip.code})</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {trip.vehiclePlate} ({trip.driverName}) · Dest: <strong className="text-slate-700 dark:text-slate-300">{trip.destinationName}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={trip.status === "In Progress" ? "emerald" : "blue"}>
                      ● {trip.status}
                    </Badge>
                    <Link href={`/dispatch/trips/${trip.id}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                        View Trip
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>
                      Progress: {trip.checkpoints.filter((c) => c.status === "Completed").length} / {trip.checkpoints.length} Checkpoints
                    </span>
                    <span>
                      ETA: <strong className="text-slate-800 dark:text-slate-200">{trip.estimatedEndTime}</strong>
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          trip.checkpoints.length > 0
                            ? Math.round(
                                (trip.checkpoints.filter((c) => c.status === "Completed").length /
                                  trip.checkpoints.length) *
                                  100
                              )
                            : trip.progressPercent
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right 4 Cols: Operational Attention Alerts */}
        <Card className="lg:col-span-4 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Operational Attention
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-rose-500">4 Active Alerts</span>
          </div>

          <div className="space-y-2.5 font-sans text-xs">
            {mockNotificationsData.slice(0, 4).map((alt) => (
              <div
                key={alt.id}
                className={`p-3 rounded-xl border space-y-1.5 transition-all ${
                  alt.severity === "Critical"
                    ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60"
                    : "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span className={alt.severity === "Critical" ? "text-rose-500 font-bold" : "text-amber-500"}>
                      {alt.severity === "Critical" ? "🔴" : "⚠️"}
                    </span>
                    {alt.title}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{alt.relativeTime}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{alt.description}</p>
                <div className="pt-1 flex justify-end">
                  <Link href={alt.actions[0].href} className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-[11px] flex items-center gap-1">
                    {alt.actions[0].label} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* SECTION 2: LIVE FLEET TELEMETRY SNAPSHOT MAP & FLEET STATUS (8:4 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Live Telemetry Snapshot Map */}
        <Card className="lg:col-span-8 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-500" /> Live Vehicle Telemetry Snapshot
              </h2>
              <p className="text-xs text-slate-500">Real-time GPS positioning over East Java, Banyuwangi, and Bali corridors</p>
            </div>
            <Link href="/dispatch/tracking" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Open Full-Screen Tracking →
            </Link>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
            <MapTracking
              vehicles={mockTrackingVehicles}
              selectedVehicleId={selectedMapVehicleId}
              onSelectVehicle={(v) => setSelectedMapVehicleId(v.id)}
              isDarkTheme={isDarkMap}
            />
          </div>
        </Card>

        {/* Right 4 Cols: Fleet Status & Resource Capacity Breakdown */}
        <Card className="lg:col-span-4 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Fleet & Capacity Status
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">32 Units Total</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-bold">AVAILABLE POOL</span>
              <span className="font-extrabold text-base text-emerald-700 dark:text-emerald-300">12 Units</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 block font-bold">ON ACTIVE TRIP</span>
              <span className="font-extrabold text-base text-blue-700 dark:text-blue-300">14 Units</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 block font-bold">RESERVED</span>
              <span className="font-extrabold text-base text-amber-700 dark:text-amber-300">4 Units</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
              <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-bold">MAINTENANCE</span>
              <span className="font-extrabold text-base text-rose-700 dark:text-rose-300">2 Units</span>
            </div>
          </div>

          {/* Vehicles Requiring Attention */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              VEHICLES REQUIRING ATTENTION
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800/60">
                <span className="font-bold text-slate-800 dark:text-slate-200">Hiace B 1234 XYZ</span>
                <Badge variant="danger">🔴 Offline 8 min</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800/60">
                <span className="font-bold text-slate-800 dark:text-slate-200">Innova B 2468 DEF</span>
                <Badge variant="amber">⚠️ Service Due</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 3: UPCOMING DEPLOYMENTS READINESS & RESOURCE AVAILABILITY (7:5 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Upcoming Deployments Readiness */}
        <Card className="lg:col-span-7 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Upcoming Deployments Readiness
              </h2>
            </div>
            <Link href="/dispatch/deployment" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              View All Deployments →
            </Link>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {[
              {
                title: "Bali South Coast Tour",
                code: "TR-2026-003",
                time: "08:00 WIB",
                vehicle: "Toyota Hiace Premio (B 3456 GHI)",
                driver: "Dewa Putra",
                guide: "Made Arya",
                tm: "Sinta Wijaya",
                status: "READY",
                readyItems: ["Veh", "Drv", "Gde", "TM", "Htl", "Dst"],
              },
              {
                title: "Banyuwangi Ijen Crater Day Trip",
                code: "TR-2026-004",
                time: "10:30 WIB",
                vehicle: "Toyota Innova Zenix (B 5678 ABC)",
                driver: "Budi Hartono",
                guide: "Dimas Saputra",
                tm: "Ayu Lestari",
                status: "READY",
                readyItems: ["Veh", "Drv", "Gde", "TM", "Htl", "Dst"],
              },
            ].map((dep, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{dep.title}</span>
                    <span className="font-mono text-xs text-slate-400 ml-2">({dep.code}) · Departure: <strong>{dep.time}</strong></span>
                  </div>
                  <Badge variant="emerald">✓ {dep.status}</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <div><span>Veh:</span> <strong className="text-slate-800 dark:text-slate-200">{dep.vehicle}</strong></div>
                  <div><span>Driver:</span> <strong className="text-slate-800 dark:text-slate-200">{dep.driver}</strong></div>
                  <div><span>Guide:</span> <strong className="text-slate-800 dark:text-slate-200">{dep.guide}</strong></div>
                  <div><span>TM:</span> <strong className="text-slate-800 dark:text-slate-200">{dep.tm}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right 5 Cols: Resource Capacity & Demand */}
        <Card className="lg:col-span-5 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Resource Capacity & Demand
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Available / Assigned</span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {/* Drivers */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="font-bold text-slate-800 dark:text-slate-200">Drivers (18 Total)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">12 Available (6 Assigned)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: "66%" }} />
                <div className="bg-blue-600 h-full" style={{ width: "34%" }} />
              </div>
            </div>

            {/* Guides */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="font-bold text-slate-800 dark:text-slate-200">Tour Guides (15 Total)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">10 Available (5 Assigned)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: "67%" }} />
                <div className="bg-blue-600 h-full" style={{ width: "33%" }} />
              </div>
            </div>

            {/* Tour Managers */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="font-bold text-slate-800 dark:text-slate-200">Tour Managers (8 Total)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">5 Available (3 Assigned)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: "62%" }} />
                <div className="bg-blue-600 h-full" style={{ width: "38%" }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 4: TODAY'S TIMELINE & DESTINATION OPERATIONS (6:6 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Today's Timeline */}
        <Card className="lg:col-span-6 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> Today's Operations Timeline
            </h2>
            <span className="text-xs text-slate-400 font-mono">18 Aug 2026</span>
          </div>

          <div className="space-y-3 font-mono text-xs border-l-2 border-slate-200 dark:border-slate-800 pl-4 ml-2">
            {[
              { time: "03:00 WIB", title: "Bromo Sunrise Tour Departure", status: "In Progress", color: "emerald" },
              { time: "05:30 WIB", title: "Ijen Crater Expedition Departure", status: "In Progress", color: "emerald" },
              { time: "08:00 WIB", title: "Bali South Coast Tour Departure", status: "Ready", color: "blue" },
              { time: "17:42 WIB", title: "Expected Return - Bromo Sunrise Tour", status: "Scheduled", color: "slate" },
            ].map((t, idx) => (
              <div key={idx} className="relative space-y-0.5">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-[#101726]" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{t.time} — {t.title}</span>
                  <Badge variant={t.color as any}>{t.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right 6 Cols: Today's Destination Operations */}
        <Card className="lg:col-span-6 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" /> Today's Destination Operational Demand
            </h2>
            <Link href="/destinations" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Destinations Master →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
            {[
              { name: "Mount Bromo", trips: "8 Trips Active", status: "Open" },
              { name: "Ijen Crater", trips: "5 Trips Active", status: "Open" },
              { name: "Uluwatu Temple", trips: "4 Trips Active", status: "Open" },
              { name: "Nusa Penida", trips: "3 Trips Active", status: "Open" },
              { name: "Ubud Culture", trips: "6 Trips Active", status: "Open" },
              { name: "Pulau Merah", trips: "2 Trips Active", status: "Open" },
            ].map((d, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">{d.name}</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold text-[11px] block">{d.trips}</span>
                <Badge variant="emerald">● {d.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* SECTION 5: QUICK ACTIONS BAR */}
      <Card className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">OPERATIONAL QUICK SHORTCUTS</h3>
            <p className="text-xs text-slate-400">Direct shortcuts to active dispatching and fleet monitoring hubs</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/dispatch/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Create Deployment
            </Button>
          </Link>
          <Link href="/dispatch">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              Open Dispatcher
            </Button>
          </Link>
          <Link href="/dispatch/tracking">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              Track Vehicles
            </Button>
          </Link>
          <Link href="/dispatch/trips">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              View Trips
            </Button>
          </Link>
        </div>
      </Card>
    </AppShell>
  );
}
