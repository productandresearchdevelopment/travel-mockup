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
import { mockDriversData } from "@/data/mockDrivers";
import { DriverMaster } from "@/types/driver";
import { Plus, Download, UserCheck, ExternalLink, AlertTriangle } from "lucide-react";

export default function DriversPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<DriverMaster[]>(mockDriversData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch =
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.license.licenseNumber.includes(search) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || d.operationalStatus === statusFilter;
    const matchesRegion = regionFilter === "ALL" || d.city === regionFilter || d.region === regionFilter;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const columns: Column<DriverMaster>[] = [
    {
      key: "driver",
      header: "Driver",
      render: (d) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
            {d.code}
          </div>
          <div>
            <Link
              href={`/drivers/${d.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {d.fullName}
            </Link>
            <div className="text-[11px] text-slate-400">{d.city}, {d.region}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (d) => <span className="font-mono text-slate-700 dark:text-slate-300">{d.phone}</span>,
    },
    {
      key: "license",
      header: "License (SIM)",
      render: (d) => (
        <div className="space-y-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 block w-fit">
            {d.license.licenseType}
          </span>
          <div className="flex items-center gap-1">
            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
              d.license.status === "Valid"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : d.license.status === "Expiring Soon"
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            }`}>
              {d.license.status}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "experienceYears",
      header: "Experience",
      render: (d) => <span className="font-semibold text-slate-800 dark:text-slate-200">{d.experienceYears} Years</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (d) => <Badge status={d.operationalStatus} />,
    },
    {
      key: "currentAssignment",
      header: "Current Assignment",
      render: (d) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[180px] block font-medium">
          {d.currentAssignment || "—"}
        </span>
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
            router.push(`/drivers/${d.id}`);
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
        title="Drivers"
        description="Manage drivers available for operational activities."
        breadcrumbItems={[{ label: "Drivers" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Data
            </Button>
            <Link href="/drivers/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Driver
              </Button>
            </Link>
          </>
        }
      />

      {/* Driver Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Drivers</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{drivers.length} Drivers</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Available</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {drivers.filter((d) => d.operationalStatus === "Available").length} Active
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Deployed / Assigned</span>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {drivers.filter((d) => d.operationalStatus === "On Trip" || d.operationalStatus === "Assigned").length} Deployed
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">License Expiry Warning</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {drivers.filter((d) => d.license.status === "Expiring Soon" || d.license.status === "Expired").length} Alerts
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search by driver name, phone, license, region..."
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
                { value: "On Trip", label: "On Trip" },
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
                { value: "Surabaya", label: "Surabaya" },
                { value: "Malang", label: "Malang" },
                { value: "Batu", label: "Batu" },
                { value: "East Java", label: "East Java" },
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
        data={filteredDrivers}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/drivers/${row.id}`)}
        emptyMessage="No drivers match your search and filter criteria."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredDrivers.length}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
