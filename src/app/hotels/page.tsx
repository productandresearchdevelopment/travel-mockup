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
import { MetricCard } from "@/components/ui/MetricCard";
import { mockHotelsData } from "@/data/mockHotels";
import { HotelMaster } from "@/types/hotel";
import { Plus, Download, Hotel, ExternalLink, MapPin, DollarSign, Bed, Users, AlertTriangle, Eye } from "lucide-react";

export default function HotelsPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState<HotelMaster[]>(mockHotelsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [contractFilter, setContractFilter] = useState<string>("ALL");
  const [locationFilter, setLocationFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase()) ||
      h.reservationContact.name.toLowerCase().includes(search.toLowerCase()) ||
      h.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || h.masterStatus === statusFilter;
    const matchesContract = contractFilter === "ALL" || h.contractStatus === contractFilter;
    const matchesLocation = locationFilter === "ALL" || h.city === locationFilter;

    return matchesSearch && matchesStatus && matchesContract && matchesLocation;
  });

  const columns: Column<HotelMaster>[] = [
    {
      key: "hotel",
      header: "Hotel",
      render: (h) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
            {h.code}
          </div>
          <div>
            <Link
              href={`/hotels/${h.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {h.name}
            </Link>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{h.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (h) => (
        <div>
          <span className="font-semibold text-slate-900 dark:text-slate-100 block text-xs">{h.city}</span>
          <span className="text-[11px] text-slate-400 truncate max-w-[180px] block">{h.address}</span>
        </div>
      ),
    },
    {
      key: "roomTypes",
      header: "Room Types",
      render: (h) => (
        <div className="flex flex-wrap gap-1 max-w-[180px]">
          {h.roomTypes.map((rt) => (
            <span
              key={rt.id}
              className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              {rt.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "availableRooms",
      header: "Available Rooms",
      render: (h) => (
        <div>
          <span className={`font-mono font-extrabold text-sm ${
            h.totalAvailableRooms > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          }`}>
            {h.totalAvailableRooms} Rooms
          </span>
          <span className="text-[10px] text-slate-400 block font-mono">/ {h.totalRoomsCount} Total</span>
        </div>
      ),
    },
    {
      key: "startingRate",
      header: "Starting Rate",
      render: (h) => (
        <span className="font-mono font-semibold text-xs text-slate-800 dark:text-slate-200">
          Rp {h.startingRate.toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "contractStatus",
      header: "Contract Status",
      render: (h) => (
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
          h.contractStatus === "Active"
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            : h.contractStatus === "Expiring Soon"
            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
            : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
        }`}>
          {h.contractStatus}
        </span>
      ),
    },
    {
      key: "masterStatus",
      header: "Master Status",
      render: (h) => <Badge status={h.masterStatus === "Active" ? "Available" : "Inactive"}>{h.masterStatus}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (h) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/hotels/${h.id}`);
          }}
          className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-center transition-all duration-200 group"
          title="View Detail"
        >
          <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
        </button>
      ),
    },
  ];

  const activeFiltersCount =
    (statusFilter !== "ALL" ? 1 : 0) +
    (contractFilter !== "ALL" ? 1 : 0) +
    (locationFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Hotels"
        description="Manage accommodation partners and room availability."
        showBackButton={false}
        breadcrumbItems={[{ label: "Hotels" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Data
            </Button>
            <Link href="/hotels/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Hotel
              </Button>
            </Link>
          </>
        }
      />

      {/* Hotel Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard
          title="TOTAL PARTNER HOTELS"
          value={hotels.length}
          subtitle="Partners"
          icon={<Hotel className="w-4 h-4" />}
          variant="cyan"
        />
        <MetricCard
          title="TOTAL AVAILABLE ROOMS"
          value={hotels.reduce((acc, h) => acc + h.totalAvailableRooms, 0)}
          subtitle="Rooms"
          icon={<Bed className="w-4 h-4" />}
          variant="emerald"
          badge="Available"
        />
        <MetricCard
          title="ACTIVE GROUP ALLOCATIONS"
          value={hotels.reduce((acc, h) => acc + h.allocations.length, 0)}
          subtitle="Groups"
          icon={<Users className="w-4 h-4" />}
          variant="violet"
          badge="Allocated"
        />
        <MetricCard
          title="CONTRACT ALERTS"
          value={hotels.filter((h) => h.contractStatus !== "Active").length}
          subtitle="Alerts"
          icon={<AlertTriangle className="w-4 h-4" />}
          variant="amber"
          badge="Contract Alert"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        columns={columns}
        data={filteredHotels}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/hotels/${row.id}`)}
        emptyMessage="No hotels match your search and filter criteria."
        searchQuery={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search by hotel name, city, address, reservation contact..."
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "ALL", label: "All Statuses" },
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ],
          },
          {
            key: "contract",
            value: contractFilter,
            onChange: setContractFilter,
            options: [
              { value: "ALL", label: "All Contracts" },
              { value: "Active", label: "Active" },
              { value: "Expiring Soon", label: "Expiring Soon" },
            ],
          },
          {
            key: "location",
            value: locationFilter,
            onChange: setLocationFilter,
            options: [
              { value: "ALL", label: "All Locations" },
              { value: "Malang", label: "Malang" },
              { value: "Batu", label: "Batu" },
              { value: "Banyuwangi", label: "Banyuwangi" },
              { value: "Surabaya", label: "Surabaya" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Hotel Name,City,Available Rooms,Contract Status\n";
          const rows = filteredHotels
            .map((h) => `"${h.name}","${h.city}",${h.totalAvailableRooms},"${h.contractStatus}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Hotels_Partners_Export.csv";
          a.click();
        }}
        exportLabel="Export Hotels"
        pageSize={10}
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredHotels.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
