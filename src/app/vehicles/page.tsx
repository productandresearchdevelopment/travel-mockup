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
import { mockVehiclesData } from "@/data/mockVehicles";
import { VehicleMaster, VehicleStatus } from "@/types/vehicle";
import { Plus, Download, Eye, ExternalLink } from "lucide-react";

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<VehicleMaster[]>(mockVehiclesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [vendorFilter, setVendorFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
      v.vehicleType.toLowerCase().includes(search.toLowerCase()) ||
      v.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      v.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    const matchesType = typeFilter === "ALL" || v.vehicleType === typeFilter;
    const matchesVendor = vendorFilter === "ALL" || v.vendorName === vendorFilter;

    return matchesSearch && matchesStatus && matchesType && matchesVendor;
  });

  const columns: Column<VehicleMaster>[] = [
    {
      key: "vehicle",
      header: "Vehicle",
      render: (v) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            {v.code}
          </div>
          <div>
            <Link
              href={`/vehicles/${v.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {v.name}
            </Link>
            <div className="text-[11px] text-slate-400">
              {v.brand} {v.model} ({v.year})
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "licensePlate",
      header: "License Plate",
      render: (v) => (
        <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono font-bold text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
          {v.licensePlate}
        </span>
      ),
    },
    {
      key: "vehicleType",
      header: "Type",
      render: (v) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {v.vehicleType}
        </span>
      ),
    },
    {
      key: "vendorName",
      header: "Vendor",
      render: (v) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[150px]">
            {v.vendorName}
          </span>
          <span className="text-[10px] text-slate-400">{v.vendorContact}</span>
        </div>
      ),
    },
    {
      key: "capacity",
      header: "Capacity",
      render: (v) => (
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-200">{v.passengerCapacity} Pax</span>
          <div className="text-[10px] text-slate-400">{v.luggageCapacity} Bags</div>
        </div>
      ),
    },
    {
      key: "rate",
      header: "Rate / Day",
      render: (v) => (
        <div>
          <span className="font-extrabold text-blue-600 dark:text-blue-400">
            Rp {v.rate.rateAmount.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-slate-400 block">{v.rate.rateUnit}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (v) => <Badge status={v.status} />,
    },
    {
      key: "currentAssignment",
      header: "Current Assignment",
      render: (v) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[180px] block font-medium">
          {v.currentAssignment || "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (v) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/vehicles/${v.id}`);
          }}
          className="h-7 px-2 text-[11px] gap-1"
        >
          <span>Detail</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Button>
      ),
    },
  ];

  // Active filter counter
  const activeFiltersCount =
    (statusFilter !== "ALL" ? 1 : 0) +
    (typeFilter !== "ALL" ? 1 : 0) +
    (vendorFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Vehicles"
        description="Manage vehicles used for operational activities."
        breadcrumbItems={[{ label: "Vehicles" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Fleet Data
            </Button>
            <Link href="/vehicles/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Vehicle
              </Button>
            </Link>
          </>
        }
      />

      {/* Fleet Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Fleet</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{vehicles.length} Units</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Available</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {vehicles.filter((v) => v.status === "Available").length} Units
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">On Trip / Assigned</span>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {vehicles.filter((v) => v.status === "On Trip" || v.status === "Assigned").length} Units
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Maintenance</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {vehicles.filter((v) => v.status === "Maintenance").length} Unit
          </p>
        </div>
      </div>

      {/* Search & Multi-Filter Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search by vehicle name, plate, type, vendor..."
          containerClassName="lg:w-80"
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "Available", label: "Available" },
                { value: "Assigned", label: "Assigned" },
                { value: "On Trip", label: "On Trip" },
                { value: "Maintenance", label: "Maintenance" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </div>

          {/* Type Filter */}
          <div className="w-32">
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Types" },
                { value: "Hiace", label: "Hiace" },
                { value: "Innova", label: "Innova" },
                { value: "Elf", label: "Elf" },
                { value: "Sprinter", label: "Sprinter" },
              ]}
            />
          </div>

          {/* Vendor Filter */}
          <div className="w-44">
            <Select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Vendors" },
                { value: "PT ABC Transport", label: "PT ABC Transport" },
                { value: "CV Nusantara Transport", label: "CV Nusantara Transport" },
                { value: "PT Sumber Armada", label: "PT Sumber Armada" },
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
                setTypeFilter("ALL");
                setVendorFilter("ALL");
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
        data={filteredVehicles}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/vehicles/${row.id}`)}
        emptyMessage="No vehicles match your search and filter criteria."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredVehicles.length}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
