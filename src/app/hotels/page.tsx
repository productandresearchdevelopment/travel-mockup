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
import { mockHotelsData } from "@/data/mockHotels";
import { HotelMaster } from "@/types/hotel";
import { Plus, Download, Hotel, ExternalLink, MapPin, DollarSign } from "lucide-react";

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
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/hotels/${h.id}`);
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
    (statusFilter !== "ALL" ? 1 : 0) +
    (contractFilter !== "ALL" ? 1 : 0) +
    (locationFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Hotels"
        description="Manage accommodation partners and room availability."
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
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Partner Hotels</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{hotels.length} Partners</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Total Available Rooms</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {hotels.reduce((acc, h) => acc + h.totalAvailableRooms, 0)} Rooms
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Active Group Allocations</span>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {hotels.reduce((acc, h) => acc + h.allocations.length, 0)} Groups
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Contract Alerts</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {hotels.filter((h) => h.contractStatus !== "Active").length} Alerts
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search by hotel name, city, address, reservation contact..."
          containerClassName="lg:w-80"
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Master Status Filter */}
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </div>

          {/* Contract Status Filter */}
          <div className="w-36">
            <Select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Contracts" },
                { value: "Active", label: "Active" },
                { value: "Expiring Soon", label: "Expiring Soon" },
                { value: "Expired", label: "Expired" },
              ]}
            />
          </div>

          {/* Location Filter */}
          <div className="w-36">
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Locations" },
                { value: "Malang", label: "Malang" },
                { value: "Batu", label: "Batu" },
                { value: "Banyuwangi", label: "Banyuwangi" },
                { value: "Surabaya", label: "Surabaya" },
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
                setContractFilter("ALL");
                setLocationFilter("ALL");
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
        data={filteredHotels}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/hotels/${row.id}`)}
        emptyMessage="No hotels match your search and filter criteria."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredHotels.length}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
