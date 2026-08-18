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
import { MetricCard } from "@/components/ui/MetricCard";
import { mockVehiclesData } from "@/data/mockVehicles";
import { VehicleMaster } from "@/types/vehicle";
import { Plus, Download, ExternalLink, Truck, ShieldCheck, MapPin, Wrench, Building, Navigation, CheckCircle, Clock, Eye } from "lucide-react";

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
          {v.imageUrl ? (
            <img
              src={v.imageUrl}
              alt={v.name}
              className="w-10 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
              {v.code}
            </div>
          )}
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
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/vehicles/${v.id}`);
          }}
          className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-center transition-all duration-200 group"
          title="View Detail"
        >
          <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
        </button>
      ),
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Vehicles Fleet Master"
        description="Enterprise SaaS operational resource management and fleet monitoring workspace."
        showBackButton={false}
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
        <MetricCard
          title="TOTAL FLEET"
          value="32"
          subtitle="Units"
          icon={<Truck className="w-4 h-4" />}
          variant="slate"
        />
        <MetricCard
          title="AVAILABLE"
          value="12"
          subtitle="Units"
          icon={<CheckCircle className="w-4 h-4" />}
          variant="emerald"
          badge="Available"
        />
        <MetricCard
          title="ON TRIP"
          value="14"
          subtitle="Units"
          icon={<Navigation className="w-4 h-4" />}
          variant="blue"
          badge="● On Trip"
        />
        <MetricCard
          title="RESERVED"
          value="4"
          subtitle="Units"
          icon={<Clock className="w-4 h-4" />}
          variant="amber"
          badge="Reserved"
        />
        <MetricCard
          title="MAINTENANCE"
          value="2"
          subtitle="Units"
          icon={<Wrench className="w-4 h-4" />}
          variant="rose"
          badge="Maintenance"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        columns={columns}
        data={filteredVehicles}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/vehicles/${row.id}`)}
        emptyMessage="No vehicles match your search and filter criteria."
        searchQuery={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search plate, vehicle name, vendor, driver..."
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "ALL", label: "All Statuses" },
              { value: "Available", label: "Available" },
              { value: "On Trip", label: "On Trip" },
              { value: "Reserved", label: "Reserved" },
              { value: "Maintenance", label: "Maintenance" },
            ],
          },
          {
            key: "region",
            value: regionFilter,
            onChange: setRegionFilter,
            options: [
              { value: "ALL", label: "All Regions" },
              { value: "East Java", label: "East Java" },
              { value: "Banyuwangi", label: "Banyuwangi" },
              { value: "Bali", label: "Bali" },
            ],
          },
          {
            key: "vendor",
            value: vendorFilter,
            onChange: setVendorFilter,
            options: [
              { value: "ALL", label: "All Vendors" },
              { value: "PT ABC Transport", label: "PT ABC Transport" },
              { value: "CV Nusantara Transport", label: "CV Nusantara Transport" },
              { value: "PT Bali VIP Rent", label: "PT Bali VIP Rent" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Plate Number,Vehicle Name,Status,Region\n";
          const rows = filteredVehicles
            .map((v) => `"${v.licensePlate}","${v.name}","${v.status}","${v.region}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Vehicles_Fleet_Export.csv";
          a.click();
        }}
        exportLabel="Export Fleet"
        pageSize={10}
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredVehicles.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
