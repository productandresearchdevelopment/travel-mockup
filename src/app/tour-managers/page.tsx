"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterButton } from "@/components/ui/FilterButton";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { mockTourManagersData } from "@/data/mockTourManagers";
import { TourManagerMaster } from "@/types/tourManager";
import { Plus, Download, Briefcase, ExternalLink, Calendar, MapPin } from "lucide-react";

export default function TourManagersPage() {
  const router = useRouter();
  const [managers, setManagers] = useState<TourManagerMaster[]>(mockTourManagersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredManagers = managers.filter((tm) => {
    const matchesSearch =
      tm.fullName.toLowerCase().includes(search.toLowerCase()) ||
      tm.phone.includes(search) ||
      tm.city.toLowerCase().includes(search.toLowerCase()) ||
      tm.primaryRegion.toLowerCase().includes(search.toLowerCase()) ||
      tm.specialization.toLowerCase().includes(search.toLowerCase()) ||
      tm.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || tm.operationalStatus === statusFilter;
    const matchesRegion =
      regionFilter === "ALL" ||
      tm.city === regionFilter ||
      tm.primaryRegion === regionFilter ||
      tm.additionalRegions.includes(regionFilter);

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const columns: Column<TourManagerMaster>[] = [
    {
      key: "manager",
      header: "Tour Manager",
      render: (tm) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
            {tm.code}
          </div>
          <div>
            <Link
              href={`/tour-managers/${tm.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {tm.fullName}
            </Link>
            <div className="text-[11px] text-slate-400">{tm.specialization}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (tm) => <span className="font-mono text-slate-700 dark:text-slate-300">{tm.phone}</span>,
    },
    {
      key: "region",
      header: "Operational Region",
      render: (tm) => (
        <div className="space-y-1">
          <span className="font-semibold text-slate-900 dark:text-slate-100 block text-xs">
            {tm.primaryRegion}
          </span>
          <div className="flex flex-wrap gap-1">
            {tm.additionalRegions.map((r) => (
              <span
                key={r}
                className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "experienceYears",
      header: "Experience",
      render: (tm) => <span className="font-semibold text-slate-800 dark:text-slate-200">{tm.experienceYears} Years</span>,
    },
    {
      key: "activeAssignmentsCount",
      header: "Active Assignments",
      render: (tm) => (
        <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
          tm.activeAssignmentsCount > 0
            ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          {tm.activeAssignmentsCount} Tour{tm.activeAssignmentsCount !== 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (tm) => <Badge status={tm.operationalStatus} />,
    },
    {
      key: "nextScheduleDate",
      header: "Next Schedule",
      render: (tm) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {tm.nextScheduleDate || "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (tm) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/tour-managers/${tm.id}`);
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
        title="Tour Managers"
        description="Manage tour managers available for operational activities."
        breadcrumbItems={[{ label: "Tour Managers" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Data
            </Button>
            <Link href="/tour-managers/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Tour Manager
              </Button>
            </Link>
          </>
        }
      />

      {/* TM Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Tour Managers</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{managers.length} Managers</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Available</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {managers.filter((tm) => tm.operationalStatus === "Available").length} Active
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">On Tour / Deployed</span>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {managers.filter((tm) => tm.operationalStatus === "On Tour" || tm.operationalStatus === "Assigned").length} Deployed
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Active Tours Coordinated</span>
          <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {managers.reduce((acc, tm) => acc + tm.activeAssignmentsCount, 0)} Tours
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search by manager name, phone, region, specialization..."
          containerClassName="lg:w-80"
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="w-40">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "Available", label: "Available" },
                { value: "Assigned", label: "Assigned" },
                { value: "On Tour", label: "On Tour" },
                { value: "Unavailable", label: "Unavailable" },
                { value: "Inactive", label: "Inactive" },
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
                { value: "Malang", label: "Malang" },
                { value: "Surabaya", label: "Surabaya" },
                { value: "Batu", label: "Batu" },
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

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredManagers}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/tour-managers/${row.id}`)}
        emptyMessage="No tour managers match your search and filter criteria."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredManagers.length}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
