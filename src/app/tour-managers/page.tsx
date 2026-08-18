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
import { MetricCard } from "@/components/ui/MetricCard";
import { Select } from "@/components/ui/Select";
import { mockTourManagersData } from "@/data/mockTourManagers";
import { TourManagerMaster } from "@/types/tourManager";
import { Plus, Download, Briefcase, ExternalLink, Calendar, MapPin, ShieldCheck, Navigation, Eye } from "lucide-react";

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
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/tour-managers/${tm.id}`);
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
    (statusFilter !== "ALL" ? 1 : 0) + (regionFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Tour Managers"
        description="Manage tour managers available for operational activities."
        showBackButton={false}
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
        <MetricCard
          title="TOTAL TOUR MANAGERS"
          value={managers.length}
          subtitle="Managers"
          icon={<Briefcase className="w-4 h-4" />}
          variant="amber"
        />
        <MetricCard
          title="AVAILABLE"
          value={managers.filter((tm) => tm.operationalStatus === "Available").length}
          subtitle="Active"
          icon={<ShieldCheck className="w-4 h-4" />}
          variant="emerald"
          badge="● Active"
        />
        <MetricCard
          title="ON TOUR / DEPLOYED"
          value={managers.filter((tm) => tm.operationalStatus === "On Tour" || tm.operationalStatus === "Assigned").length}
          subtitle="Deployed"
          icon={<Navigation className="w-4 h-4" />}
          variant="violet"
          badge="Deployed"
        />
        <MetricCard
          title="ACTIVE TOURS COORDINATED"
          value={managers.reduce((acc, tm) => acc + tm.activeAssignmentsCount, 0)}
          subtitle="Tours"
          icon={<Briefcase className="w-4 h-4" />}
          variant="blue"
          badge="Active Tours"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        columns={columns}
        data={filteredManagers}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/tour-managers/${row.id}`)}
        emptyMessage="No tour managers match your search and filter criteria."
        searchQuery={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search by manager name, phone, region, specialization..."
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "ALL", label: "All Statuses" },
              { value: "Available", label: "Available" },
              { value: "Assigned", label: "Assigned" },
              { value: "On Tour", label: "On Tour" },
              { value: "Unavailable", label: "Unavailable" },
            ],
          },
          {
            key: "region",
            value: regionFilter,
            onChange: setRegionFilter,
            options: [
              { value: "ALL", label: "All Regions" },
              { value: "East Java", label: "East Java" },
              { value: "Malang", label: "Malang" },
              { value: "Surabaya", label: "Surabaya" },
              { value: "Batu", label: "Batu" },
              { value: "Bali", label: "Bali" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Manager Name,Phone,Specialization,Region,Status\n";
          const rows = filteredManagers
            .map((tm) => `"${tm.fullName}","${tm.phone}","${tm.specialization}","${tm.region}","${tm.operationalStatus}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Tour_Managers_Export.csv";
          a.click();
        }}
        exportLabel="Export Managers"
        pageSize={10}
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredManagers.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
