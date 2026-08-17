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
import { mockGuidesData } from "@/data/mockGuides";
import { GuideMaster } from "@/types/guide";
import { Plus, Download, Compass, ExternalLink, Globe, MapPin } from "lucide-react";

export default function GuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState<GuideMaster[]>(mockGuidesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [languageFilter, setLanguageFilter] = useState<string>("ALL");
  const [destinationFilter, setDestinationFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Multi-Filter logic
  const filteredGuides = guides.filter((g) => {
    const matchesSearch =
      g.fullName.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search) ||
      g.city.toLowerCase().includes(search.toLowerCase()) ||
      g.code.toLowerCase().includes(search.toLowerCase()) ||
      g.languages.some((l) => l.toLowerCase().includes(search.toLowerCase())) ||
      g.destinationExperiences.some((d) => d.destinationName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || g.operationalStatus === statusFilter;
    const matchesRegion = regionFilter === "ALL" || g.city === regionFilter || g.region === regionFilter;
    const matchesLanguage = languageFilter === "ALL" || g.languages.includes(languageFilter);
    const matchesDestination =
      destinationFilter === "ALL" ||
      g.destinationExperiences.some((d) => d.destinationName === destinationFilter);

    return matchesSearch && matchesStatus && matchesRegion && matchesLanguage && matchesDestination;
  });

  const columns: Column<GuideMaster>[] = [
    {
      key: "guide",
      header: "Guide",
      render: (g) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            {g.code}
          </div>
          <div>
            <Link
              href={`/guides/${g.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {g.fullName}
            </Link>
            <div className="text-[11px] text-slate-400">{g.city}, {g.region}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (g) => <span className="font-mono text-slate-700 dark:text-slate-300">{g.phone}</span>,
    },
    {
      key: "languages",
      header: "Languages",
      render: (g) => (
        <div className="flex flex-wrap gap-1 max-w-[160px]">
          {g.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60"
            >
              {lang}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "destinations",
      header: "Destination Expertise",
      render: (g) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {g.destinationExperiences.map((d) => (
            <span
              key={d.id}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
            >
              {d.destinationName} ({d.level})
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (g) => <Badge status={g.operationalStatus} />,
    },
    {
      key: "currentAssignment",
      header: "Current Assignment",
      render: (g) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[180px] block font-medium">
          {g.currentAssignment || "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (g) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/guides/${g.id}`);
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
    (regionFilter !== "ALL" ? 1 : 0) +
    (languageFilter !== "ALL" ? 1 : 0) +
    (destinationFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Guides"
        description="Manage guides available for operational activities."
        breadcrumbItems={[{ label: "Guides" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Guide Roster
            </Button>
            <Link href="/guides/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Guide
              </Button>
            </Link>
          </>
        }
      />

      {/* Guide Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Guides</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{guides.length} Licensed</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Available</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {guides.filter((g) => g.operationalStatus === "Available").length} Active
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">On Tour / Assigned</span>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {guides.filter((g) => g.operationalStatus === "On Tour" || g.operationalStatus === "Assigned").length} Deployed
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Multilingual Guides</span>
          <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {guides.filter((g) => g.languages.length > 2).length} Guides
          </p>
        </div>
      </div>

      {/* Search & Multi-Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search by name, phone, language, destination..."
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
                { value: "On Tour", label: "On Tour" },
                { value: "Unavailable", label: "Unavailable" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </div>

          {/* Region Filter */}
          <div className="w-32">
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Regions" },
                { value: "Malang", label: "Malang" },
                { value: "Batu", label: "Batu" },
                { value: "Banyuwangi", label: "Banyuwangi" },
                { value: "Surabaya", label: "Surabaya" },
              ]}
            />
          </div>

          {/* Language Filter */}
          <div className="w-36">
            <Select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Languages" },
                { value: "English", label: "English" },
                { value: "Mandarin", label: "Mandarin" },
                { value: "Japanese", label: "Japanese" },
                { value: "German", label: "German" },
                { value: "Dutch", label: "Dutch" },
              ]}
            />
          </div>

          {/* Destination Filter */}
          <div className="w-36">
            <Select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Destinations" },
                { value: "Bromo", label: "Bromo" },
                { value: "Ijen", label: "Ijen" },
                { value: "Tumpak Sewu", label: "Tumpak Sewu" },
                { value: "Baluran", label: "Baluran" },
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
                setLanguageFilter("ALL");
                setDestinationFilter("ALL");
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
        data={filteredGuides}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/guides/${row.id}`)}
        emptyMessage="No guides match your search and filter criteria."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredGuides.length}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
