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
import { mockGuidesData } from "@/data/mockGuides";
import { GuideMaster } from "@/types/guide";
import { Plus, Download, Compass, ExternalLink, Globe, MapPin, Award, ShieldCheck, Eye } from "lucide-react";

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
          {g.avatarUrl ? (
            <img
              src={g.avatarUrl}
              alt={g.fullName}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
              {g.code}
            </div>
          )}
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
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/guides/${g.id}`);
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
    (regionFilter !== "ALL" ? 1 : 0) +
    (languageFilter !== "ALL" ? 1 : 0) +
    (destinationFilter !== "ALL" ? 1 : 0);

  return (
    <AppShell>
      <PageHeader
        title="Guides"
        description="Manage guides available for operational activities."
        showBackButton={false}
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
        <MetricCard
          title="TOTAL GUIDES"
          value={guides.length}
          subtitle="Licensed"
          icon={<Compass className="w-4 h-4" />}
          variant="emerald"
        />
        <MetricCard
          title="AVAILABLE"
          value={guides.filter((g) => g.operationalStatus === "Available").length}
          subtitle="Active"
          icon={<Compass className="w-4 h-4" />}
          variant="emerald"
          badge="● Active"
        />
        <MetricCard
          title="ON TOUR / ASSIGNED"
          value={guides.filter((g) => g.operationalStatus === "On Tour" || g.operationalStatus === "Assigned").length}
          subtitle="Deployed"
          icon={<Award className="w-4 h-4" />}
          variant="violet"
          badge="Deployed"
        />
        <MetricCard
          title="MULTILINGUAL GUIDES"
          value={guides.filter((g) => g.languages.length > 2).length}
          subtitle="Guides"
          icon={<Globe className="w-4 h-4" />}
          variant="blue"
          badge="Multilingual"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        columns={columns}
        data={filteredGuides}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => router.push(`/guides/${row.id}`)}
        emptyMessage="No guides match your search and filter criteria."
        searchQuery={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search by name, phone, language, destination..."
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
              { value: "Malang", label: "Malang" },
              { value: "Batu", label: "Batu" },
              { value: "Banyuwangi", label: "Banyuwangi" },
              { value: "Surabaya", label: "Surabaya" },
            ],
          },
          {
            key: "language",
            value: languageFilter,
            onChange: setLanguageFilter,
            options: [
              { value: "ALL", label: "All Languages" },
              { value: "English", label: "English" },
              { value: "Mandarin", label: "Mandarin" },
              { value: "Japanese", label: "Japanese" },
              { value: "German", label: "German" },
            ],
          },
          {
            key: "destination",
            value: destinationFilter,
            onChange: setDestinationFilter,
            options: [
              { value: "ALL", label: "All Destinations" },
              { value: "Bromo", label: "Bromo" },
              { value: "Ijen", label: "Ijen" },
              { value: "Tumpak Sewu", label: "Tumpak Sewu" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Guide Name,Phone,Languages,Region,Status\n";
          const rows = filteredGuides
            .map((g) => `"${g.fullName}","${g.phone}","${g.languages.join(";")}","${g.region}","${g.operationalStatus}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Guides_Roster_Export.csv";
          a.click();
        }}
        exportLabel="Export Guides"
        pageSize={10}
        currentPage={currentPage}
        totalPages={1}
        totalItems={filteredGuides.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AppShell>
  );
}
