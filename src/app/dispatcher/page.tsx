"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import {
  CalendarCheck,
  Plus,
  Calendar as CalendarIcon,
  LayoutList,
  Eye,
  CheckCircle2,
  PlaySquare,
  AlertTriangle,
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
    date: "25 Aug 2026",
    paxCount: 12,
    guestNames: "Rossella Cescon (+11 Pax)",
    journeyRoute: "Yogyakarta → Malang → Probolinggo → Bali",
    destination: "Probolinggo & Bali",
    vehiclePlate: "B 1234 XYZ",
    vehicleName: "HiAce Commuter #01",
    driverName: "Agus Santoso",
    guideName: "Rian Kurniawan",
    tmName: "Dimas Anggara",
    status: "Ready",
  },
  {
    id: "dep-002",
    code: "DEP-2026-00422",
    bookingCode: "BKG-2026-00910",
    tourName: "Bromo Sunrise Midnight Express",
    date: "26 Aug 2026",
    paxCount: 6,
    guestNames: "Hans Mueller (+5 Pax)",
    journeyRoute: "Surabaya → Bromo → Surabaya",
    destination: "Bromo Sunrise Point",
    vehiclePlate: "N 5678 ABC",
    vehicleName: "Innova Reborn #04",
    driverName: "Agus Santoso",
    guideName: "Unassigned",
    tmName: "Unassigned",
    status: "Conflict",
    conflictNote: "Driver Agus Santoso is double-booked on 26 Aug for DEP-2026-00421",
  },
  {
    id: "dep-003",
    code: "DEP-2026-00423",
    bookingCode: "BKG-2026-00955",
    tourName: "Bali Overland Cultural Odyssey",
    date: "27 Aug 2026",
    paxCount: 15,
    guestNames: "Siti Rahma (+14 Pax)",
    journeyRoute: "Banyuwangi → Ferry Gilimanuk → Ubud",
    destination: "Ubud & Denpasar",
    vehiclePlate: "DK 9901 AB",
    vehicleName: "Isuzu Elf Long #02",
    driverName: "Budi Pratama",
    guideName: "Wayan Sudiarta",
    tmName: "Kadek Arta",
    status: "In Progress",
  },
];

export default function DispatcherPage() {
  const [deployments] = useState<DeploymentItem[]>(mockDeploymentsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("August 2026");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const filteredDeployments = useMemo(() => {
    return deployments.filter((d) => {
      const matchSearch =
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.guestNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.driverName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || d.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [deployments, searchQuery, statusFilter]);

  const summaryMetrics = useMemo(() => {
    return {
      total: deployments.length,
      ready: deployments.filter((d) => d.status === "Ready").length,
      inProgress: deployments.filter((d) => d.status === "In Progress").length,
      conflicts: deployments.filter((d) => d.status === "Conflict").length,
    };
  }, [deployments]);

  return (
    <AppShell>
      <PageHeader
        title="Dispatcher Operational Control"
        description="Centralized trip planning, crew/vehicle assignment & dispatch schedule management"
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Dispatcher" },
        ]}
        actions={
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle Pill Bar */}
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <button
                type="button"
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-[#101726] text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="w-3.5 h-3.5" /> List
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "calendar"
                    ? "bg-white dark:bg-[#101726] text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                onClick={() => setViewMode("calendar")}
              >
                <CalendarIcon className="w-3.5 h-3.5" /> Calendar
              </button>
            </div>

            <Link href="/dispatch/new">
              <Button size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Create Deployment
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP METRICS SUMMARY (Minimalist Stripe/Linear SaaS Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="Total Deployments"
          value={summaryMetrics.total}
          subtitle="Active"
          icon={<CalendarCheck className="w-4 h-4" />}
          variant="blue"
        />
        <MetricCard
          title="Ready to Depart"
          value={summaryMetrics.ready}
          subtitle="Assigned"
          icon={<CheckCircle2 className="w-4 h-4" />}
          variant="emerald"
        />
        <MetricCard
          title="In Progress"
          value={summaryMetrics.inProgress}
          subtitle="On Road"
          icon={<PlaySquare className="w-4 h-4" />}
          variant="blue"
        />
        <MetricCard
          title="Conflict Warnings"
          value={summaryMetrics.conflicts}
          subtitle="Action Needed"
          icon={<AlertTriangle className="w-4 h-4" />}
          variant="rose"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE (Structured Exactly Like Guests Page) */}
      {viewMode === "list" ? (
        <DataTable
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          searchPlaceholder="Search deployment, booking, guest, driver..."
          filters={[
            {
              key: "month",
              value: monthFilter,
              onChange: setMonthFilter,
              options: [
                { value: "August 2026", label: "August 2026" },
                { value: "September 2026", label: "September 2026" },
                { value: "October 2026", label: "October 2026" },
              ],
            },
            {
              key: "status",
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: "All", label: "All Statuses" },
                { value: "Ready", label: "Ready" },
                { value: "In Progress", label: "In Progress" },
                { value: "Conflict", label: "Conflict Warnings" },
              ],
            },
          ]}
          columns={[
            {
              key: "code",
              header: "Deployment & Booking",
              render: (r: DeploymentItem) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <Link href={`/dispatch/${r.id}`} className="font-extrabold text-blue-600 hover:underline block">
                    {r.code}
                  </Link>
                  <span className="text-slate-400 text-[10px] block">{r.bookingCode}</span>
                </div>
              ),
            },
            {
              key: "tour",
              header: "Tour & Route",
              render: (r: DeploymentItem) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.tourName}</span>
                  <span className="text-slate-500 text-[11px] block">{r.journeyRoute}</span>
                </div>
              ),
            },
            {
              key: "guests",
              header: "Guests & Date",
              render: (r: DeploymentItem) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.guestNames}</span>
                  <span className="text-slate-400 text-[10px] block">Date: {r.date}</span>
                </div>
              ),
            },
            {
              key: "assignments",
              header: "Vehicle & Driver",
              render: (r: DeploymentItem) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.vehicleName} ({r.vehiclePlate})</span>
                  <span className="text-emerald-600 font-bold block">Driver: {r.driverName}</span>
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r: DeploymentItem) => (
                <div className="relative inline-block group">
                  <Badge
                    variant={
                      r.status === "Ready"
                        ? "emerald"
                        : r.status === "In Progress"
                        ? "blue"
                        : "danger"
                    }
                    className={r.conflictNote ? "cursor-help" : ""}
                  >
                    {r.status}
                  </Badge>

                  {/* Sleek Floating Hover Tooltip */}
                  {r.conflictNote && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-mono leading-snug rounded-xl shadow-xl border border-slate-700 pointer-events-none transition-all duration-200">
                      <div className="flex items-start gap-1.5 text-rose-400 font-bold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>Schedule Conflict Warning</span>
                      </div>
                      <p className="text-slate-200 font-medium">{r.conflictNote}</p>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r: DeploymentItem) => (
                <div className="flex justify-end">
                  <Link href={`/dispatch/${r.id}`}>
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
          data={filteredDeployments}
          keyExtractor={(r) => r.id}
        />
      ) : (
        /* CALENDAR VIEW */
        <Card className="p-5 space-y-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white flex items-center justify-between">
            <span className="font-bold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-400" /> VISUAL SCHEDULE & CONFLICT MATRIX ({monthFilter.toUpperCase()})
            </span>
            <span className="text-xs text-slate-400">Click entry to inspect resource assignment</span>
          </div>

          <div className="space-y-3">
            {["25 Aug 2026", "26 Aug 2026", "27 Aug 2026"].map((dateStr) => (
              <div key={dateStr} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2.5">
                <div className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1.5 flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-blue-600" /> {dateStr}
                  </span>
                  <span className="text-blue-600 font-bold">2 Deployments Scheduled</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-blue-200 dark:border-blue-900/60 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-slate-100">BKG-2026-00821 · East Java Explorer</span>
                      <Badge variant="emerald">✓ Ready</Badge>
                    </div>
                    <span className="text-[11px] text-slate-500 block">Veh: Hiace (B 1234 XYZ) · Drv: Agus Santoso · Gde: Rian Kurniawan</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-rose-200 dark:border-rose-900/60 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-slate-100">BKG-2026-00910 · Bromo Sunrise</span>
                      <Badge variant="danger">🔴 Conflict</Badge>
                    </div>
                    <span className="text-[11px] text-rose-500 font-bold block">⚠️ Driver Agus Santoso is double-booked on 26 Aug</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AppShell>
  );
}
