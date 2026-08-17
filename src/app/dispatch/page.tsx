"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { mockDeploymentsData } from "@/data/mockDeployments";
import { DeploymentRecord } from "@/types/dispatch";
import {
  Plus,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  List,
  Clock,
  ExternalLink,
  AlertTriangle,
  Users,
  MapPin,
  Truck,
  UserCheck,
  Compass,
  Briefcase,
} from "lucide-react";

export default function DispatcherPage() {
  const router = useRouter();
  const [deployments, setDeployments] = useState<DeploymentRecord[]>(mockDeploymentsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  const [selectedDate, setSelectedDate] = useState("2026-08-21");
  const [currentPage, setCurrentPage] = useState(1);

  // Multi-Filter logic
  const filteredDeployments = deployments.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.destinationName.toLowerCase().includes(search.toLowerCase()) ||
      d.vehiclePlate.toLowerCase().includes(search.toLowerCase()) ||
      d.driverName.toLowerCase().includes(search.toLowerCase()) ||
      d.tourManagerName.toLowerCase().includes(search.toLowerCase()) ||
      (d.guideName && d.guideName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    const matchesRegion = regionFilter === "ALL" || d.region === regionFilter;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const columns: Column<DeploymentRecord>[] = [
    {
      key: "timeWindow",
      header: "Time",
      render: (d) => (
        <div className="font-mono text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 font-bold">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{d.departureTime} – {d.estimatedEndTime}</span>
        </div>
      ),
    },
    {
      key: "deployment",
      header: "Deployment Name",
      render: (d) => (
        <div>
          <Link
            href={`/dispatch/${d.id}`}
            className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block text-xs"
          >
            {d.name}
          </Link>
          <span className="text-[10px] font-mono text-slate-400">{d.code}</span>
        </div>
      ),
    },
    {
      key: "destination",
      header: "Destination",
      render: (d) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">{d.destinationName}</span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{d.city}, {d.region}</span>
        </div>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (d) => (
        <div>
          <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs block">{d.vehiclePlate}</span>
          <span className="text-[10px] text-slate-400 truncate max-w-[120px] block">{d.vehicleName}</span>
        </div>
      ),
    },
    {
      key: "driver",
      header: "Driver",
      render: (d) => <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">{d.driverName}</span>,
    },
    {
      key: "guide",
      header: "Guide",
      render: (d) => (
        <span className="text-xs text-slate-700 dark:text-slate-300">
          {d.guideName ? d.guideName : <span className="text-slate-400 italic">Not Required</span>}
        </span>
      ),
    },
    {
      key: "tourManager",
      header: "Tour Manager",
      render: (d) => <span className="font-medium text-xs text-slate-700 dark:text-slate-300">{d.tourManagerName}</span>,
    },
    {
      key: "pax",
      header: "Pax",
      render: (d) => (
        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
          {d.paxCount} Pax
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (d) => (
        <Badge status={d.status === "Ready" ? "Available" : d.status === "Confirmed" ? "Assigned" : d.status === "In Progress" ? "On Trip" : "Unavailable"}>
          {d.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (d) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dispatch/${d.id}`);
          }}
          className="h-7 px-2 text-[11px] gap-1"
        >
          <span>Detail</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Button>
      ),
    },
  ];

  const activeFiltersCount =
    (statusFilter !== "ALL" ? 1 : 0) + (regionFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Dispatcher Workspace"
        description="Plan and manage operational assignments across vehicles, drivers, guides, tour managers, hotels, and destinations."
        breadcrumbItems={[{ label: "Operations" }, { label: "Dispatcher" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Roster
            </Button>
            <Link href="/dispatch/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Create Deployment
              </Button>
            </Link>
          </>
        }
      />

      {/* Dispatcher Workspace Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Today's Deployments</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">12 Departures</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Upcoming Confirmed</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">24 Scheduled</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">In Progress</span>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">8 Active Tours</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Resource Conflicts</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">3 Warnings</p>
        </div>
      </div>

      {/* Date Navigation & View Switcher Bar */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Date Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 px-2">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-[#162034] rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>17 Aug 2026</span>
          </div>
          <Button variant="outline" size="sm" className="h-8 px-2">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Today
          </Button>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-white dark:bg-[#101726] text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List Table</span>
          </button>

          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "timeline"
                ? "bg-white dark:bg-[#101726] text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timeline View</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search by tour name, destination, plate, driver, guide, TM..."
          containerClassName="lg:w-96"
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="w-40">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "Draft", label: "Draft" },
                { value: "Ready", label: "Ready" },
                { value: "Confirmed", label: "Confirmed" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />
          </div>

          {/* Region Filter */}
          <div className="w-36">
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Regions" },
                { value: "East Java", label: "East Java" },
                { value: "Bali", label: "Bali" },
              ]}
            />
          </div>

          {(search || activeFiltersCount > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setStatusFilter("ALL");
                setRegionFilter("ALL");
              }}
              className="text-xs text-rose-600 hover:text-rose-700"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: LIST TABLE */}
      {viewMode === "list" && (
        <>
          <DataTable
            columns={columns}
            data={filteredDeployments}
            keyExtractor={(row) => row.id}
            onRowClick={(row) => router.push(`/dispatch/${row.id}`)}
            emptyMessage="No deployments scheduled for this date matching your criteria."
          />

          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={filteredDeployments.length}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* VIEW MODE 2: VISUAL HORIZONTAL TIMELINE VIEW */}
      {viewMode === "timeline" && (
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Deployment Resource Schedule Timeline (21 Aug 2026)
            </h3>
            <span className="text-xs font-mono text-slate-400">00:00 - 24:00 Hours</span>
          </div>

          <div className="space-y-4">
            {filteredDeployments.map((d) => (
              <div key={d.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{d.name} ({d.code})</span>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold block">{d.destinationName} · {d.paxCount} Pax</span>
                  </div>
                  <Badge status={d.status === "Ready" ? "Available" : d.status === "Confirmed" ? "Assigned" : "On Trip"}>{d.status}</Badge>
                </div>

                {/* Timeline Visual Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-6 rounded-lg relative overflow-hidden flex items-center px-3 text-[10px] font-mono">
                  <div
                    className="absolute top-0 bottom-0 bg-blue-600/80 dark:bg-blue-500/80 text-white flex items-center px-2 font-bold truncate rounded"
                    style={{
                      left: d.departureTime === "03:00" ? "12.5%" : d.departureTime === "06:00" ? "25%" : "37.5%",
                      width: "55%",
                    }}
                  >
                    {d.departureTime} – {d.estimatedEndTime} | {d.vehiclePlate} ({d.driverName})
                  </div>
                </div>

                {/* Resource breakdown chips */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                    <Truck className="w-3 h-3 text-slate-400" /> {d.vehiclePlate}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-slate-400" /> {d.driverName}
                  </span>
                  {d.guideName && (
                    <span className="flex items-center gap-1">
                      <Compass className="w-3 h-3 text-slate-400" /> {d.guideName}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-400" /> {d.tourManagerName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
