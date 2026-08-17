"use client";

import React, { useState, useMemo } from "react";
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
import { mockVehiclesData } from "@/data/mockVehicles";
import { VehicleMaster } from "@/types/vehicle";
import { Plus, Download, ExternalLink, Truck, ShieldCheck, MapPin, Wrench } from "lucide-react";

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles] = useState<VehicleMaster[]>(mockVehiclesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [vendorFilter, setVendorFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
        v.vehicleType.toLowerCase().includes(search.toLowerCase()) ||
        v.vendorName.toLowerCase().includes(search.toLowerCase()) ||
        v.code.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
      const matchesType = typeFilter === "ALL" || v.vehicleType === typeFilter;
      const matchesVendor = vendorFilter === "ALL" || v.vendorName === vendorFilter;
      const matchesRegion = regionFilter === "ALL" || v.region === regionFilter;

      return matchesSearch && matchesStatus && matchesType && matchesVendor && matchesRegion;
    });
  }, [vehicles, search, statusFilter, typeFilter, vendorFilter, regionFilter]);

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
              {v.brand} {v.model} ({v.year}) · {v.region}
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
      key: "vendorName",
      header: "Ownership & Vendor",
      render: (v) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[150px]">
            {v.vendorName}
          </span>
          <span className="text-[10px] text-slate-400">{v.ownershipType} · {v.vendorContact}</span>
        </div>
      ),
    },
    {
      key: "rate",
      header: "Daily Rental Rate",
      render: (v) => (
        <div>
          <span className="font-extrabold text-blue-600 dark:text-blue-400">
            Rp {v.dailyRentalRate.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-slate-400 block">Per Day</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <Badge variant={v.status === "Available" ? "emerald" : v.status === "On Trip" ? "blue" : v.status === "Maintenance" ? "danger" : "slate"}>
          ● {v.status}
        </Badge>
      ),
    },
    {
      key: "currentAssignment",
      header: "Current Trip / Driver",
      render: (v) => (
        <div className="text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            {v.currentAssignment ? v.currentAssignment.tripName : "Unassigned / Available"}
          </span>
          {v.currentAssignment && (
            <span className="text-[10px] text-slate-500">Driver: {v.currentAssignment.driverName}</span>
          )}
        </div>
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
          className="h-7 px-2.5 text-[11px] gap-1"
        >
          <span>Detail Workspace</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Button>
      ),
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Vehicles Fleet Master"
        description="Enterprise SaaS operational resource management and fleet monitoring workspace."
        breadcrumbItems={[{ label: "Resources", href: "/vehicles" }, { label: "Vehicles" }]}
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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL FLEET</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">32 Units</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">AVAILABLE</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">12 Units</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">ON TRIP</span>
          <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">14 Units</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">RESERVED</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">4 Units</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">MAINTENANCE</span>
          <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">2 Units</p>
        </div>
      </div>

      {/* Search & Multi-Filter Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search plate, vehicle name, vendor, driver..."
          containerClassName="lg:w-80"
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "Available", label: "Available" },
                { value: "On Trip", label: "On Trip" },
                { value: "Reserved", label: "Reserved" },
                { value: "Maintenance", label: "Maintenance" },
              ]}
            />
          </div>

          <div className="w-36">
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Regions" },
                { value: "East Java", label: "East Java" },
                { value: "Banyuwangi", label: "Banyuwangi" },
                { value: "Bali", label: "Bali" },
              ]}
            />
          </div>

          <div className="w-44">
            <Select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Vendors" },
                { value: "PT ABC Transport", label: "PT ABC Transport" },
                { value: "CV Nusantara Transport", label: "CV Nusantara Transport" },
                { value: "PT Bali VIP Rent", label: "PT Bali VIP Rent" },
              ]}
            />
          </div>
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
