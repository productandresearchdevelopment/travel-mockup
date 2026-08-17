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
import { mockDestinationsData } from "@/data/mockDestinations";
import { DestinationMaster } from "@/types/destination";
import { Plus, Download, MapPin, ExternalLink, Compass, AlertTriangle, ShieldCheck, Eye } from "lucide-react";

export default function DestinationsPage() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<DestinationMaster[]>(mockDestinationsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [guideFilter, setGuideFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Multi-Filter logic
  const filteredDestinations = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || d.masterStatus === statusFilter;
    const matchesType = typeFilter === "ALL" || d.type === typeFilter;
    const matchesRegion = regionFilter === "ALL" || d.region === regionFilter;
    const matchesCity = cityFilter === "ALL" || d.city === cityFilter;
    const matchesGuide = guideFilter === "ALL" || d.guideRequirement === guideFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType &&
      matchesRegion &&
      matchesCity &&
      matchesGuide
    );
  });

  const columns: Column<DestinationMaster>[] = [
    {
      key: "destination",
      header: "Destination",
      render: (d) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-teal-200 dark:border-teal-800">
            {d.code}
          </div>
          <div>
            <Link
              href={`/destinations/${d.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              {d.name}
            </Link>
            {d.temporaryClosure?.status === "Closed" && (
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block flex items-center gap-1 mt-0.5">
                <AlertTriangle className="w-2.5 h-2.5" /> Closed Today
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "region",
      header: "Region & City",
      render: (d) => (
        <div>
          <span className="font-semibold text-slate-900 dark:text-slate-100 block text-xs">{d.city}</span>
          <span className="text-[11px] font-medium text-teal-600 dark:text-teal-400">{d.region}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (d) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {d.type}
        </span>
      ),
    },
    {
      key: "operatingHours",
      header: "Operating Hours",
      render: (d) => <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{d.operatingHoursText}</span>,
    },
    {
      key: "startingTicketFee",
      header: "Ticket From",
      render: (d) => (
        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
          Rp {d.startingTicketFee.toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "guideRequirement",
      header: "Guide Required",
      render: (d) => (
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
          d.guideRequirement === "Required"
            ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            : d.guideRequirement === "Recommended"
            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          {d.guideRequirement}
        </span>
      ),
    },
    {
      key: "masterStatus",
      header: "Status",
      render: (d) => <Badge status={d.masterStatus === "Active" ? "Available" : "Inactive"}>{d.masterStatus}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (d) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/destinations/${d.id}`);
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
    (typeFilter !== "ALL" ? 1 : 0) +
    (regionFilter !== "ALL" ? 1 : 0) +
    (cityFilter !== "ALL" ? 1 : 0) +
    (guideFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Destinations"
        description="Manage destinations and operational information."
        breadcrumbItems={[{ label: "Destinations" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Data
            </Button>
            <Link href="/destinations/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Destination
              </Button>
            </Link>
          </>
        }
      />

      {/* Destination Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard
          title="TOTAL DESTINATIONS"
          value={destinations.length}
          subtitle="Locations"
          icon={<MapPin className="w-4 h-4" />}
          variant="pink"
        />
        <MetricCard
          title="EAST JAVA SPOTS"
          value={destinations.filter((d) => d.region === "East Java").length}
          subtitle="Spots"
          icon={<Compass className="w-4 h-4" />}
          variant="emerald"
          badge="East Java"
        />
        <MetricCard
          title="BALI SPOTS"
          value={destinations.filter((d) => d.region === "Bali").length}
          subtitle="Spots"
          icon={<MapPin className="w-4 h-4" />}
          variant="cyan"
          badge="Bali"
        />
        <MetricCard
          title="GUIDE REQUIRED"
          value={destinations.filter((d) => d.guideRequirement === "Required").length}
          subtitle="Mandatory"
          icon={<ShieldCheck className="w-4 h-4" />}
          variant="violet"
          badge="Mandatory"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        columns={columns}
        data={filteredDestinations}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/destinations/${row.id}`)}
        emptyMessage="No destinations match your search and filter criteria."
        searchQuery={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search by name, region, city, type..."
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
            key: "region",
            value: regionFilter,
            onChange: setRegionFilter,
            options: [
              { value: "ALL", label: "All Regions" },
              { value: "East Java", label: "East Java" },
              { value: "Bali", label: "Bali" },
            ],
          },
          {
            key: "type",
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { value: "ALL", label: "All Types" },
              { value: "Nature", label: "Nature" },
              { value: "Culture", label: "Culture" },
              { value: "Adventure", label: "Adventure" },
              { value: "Beach", label: "Beach" },
            ],
          },
          {
            key: "guide",
            value: guideFilter,
            onChange: setGuideFilter,
            options: [
              { value: "ALL", label: "All Guide Rules" },
              { value: "Required", label: "Guide Required" },
              { value: "Recommended", label: "Recommended" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Destination Name,Type,Region,City\n";
          const rows = filteredDestinations
            .map((d) => `"${d.name}","${d.type}","${d.region}","${d.city}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Destinations_Master_Export.csv";
          a.click();
        }}
        exportLabel="Export Destinations"
        pageSize={10}
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredDestinations.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
