"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { mockTourPackagesData } from "@/data/mockTourPackagesData";
import { TourPackageMaster } from "@/types/tourPackage";
import {
  Package,
  Plus,
  Search,
  Filter,
  Layers,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Compass,
  Eye,
  Copy,
} from "lucide-react";

export default function TourPackagesListPage() {
  const [packages, setPackages] = useState<TourPackageMaster[]>(mockTourPackagesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");

  // Summary Metrics
  const summary = useMemo(() => {
    return {
      total: packages.length,
      active: packages.filter((p) => p.status === "Active").length,
      inactive: packages.filter((p) => p.status === "Inactive").length,
      multiDestination: packages.filter((p) => p.type === "Multi Destination").length,
      dayTour: packages.filter((p) => p.type === "Day Tour").length,
    };
  }, [packages]);

  // Filtered Packages
  const filteredPackages = useMemo(() => {
    return packages.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.destinations.some((d) => d.destinationName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchType = typeFilter === "All" || p.type === typeFilter;
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      const matchDuration = durationFilter === "All" || p.duration === durationFilter;

      return matchSearch && matchType && matchStatus && matchDuration;
    });
  }, [packages, searchQuery, typeFilter, statusFilter, durationFilter]);

  // Duplicate Package Handler
  const handleDuplicate = (pkg: TourPackageMaster) => {
    const duplicatedPkg: TourPackageMaster = {
      ...pkg,
      id: `tp-${Date.now()}`,
      code: `${pkg.code}-COPY`,
      name: `${pkg.name} Copy`,
      status: "Draft",
      usedInBookingsCount: 0,
      linkedBookings: [],
      history: [{ id: `h-${Date.now()}`, timestamp: "2026-08-18", user: "Ops Staff", action: "Duplicated", details: `Duplicated from ${pkg.code}` }],
      createdAt: "2026-08-18",
      updatedAt: "2026-08-18",
    };
    setPackages([duplicatedPkg, ...packages]);
  };

  return (
    <AppShell>
      <PageHeader
        title="Tour Package Master Catalog"
        description="Manage commercial tour products, destination sequences, operational requirements, and package costs."
        showBackButton={false}
        breadcrumbItems={[{ label: "Resources", href: "/vehicles" }, { label: "Tour Package" }]}
        actions={
          <Link href="/tour-packages/create">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Create Tour Package
            </Button>
          </Link>
        }
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <MetricCard
          title="TOTAL TOUR PACKAGES"
          value={summary.total}
          subtitle="Catalog"
          icon={<Package className="w-4 h-4" />}
          variant="violet"
        />
        <MetricCard
          title="ACTIVE PACKAGES"
          value={summary.active}
          icon={<CheckCircle2 className="w-4 h-4" />}
          variant="emerald"
          badge="● Active"
        />
        <MetricCard
          title="INACTIVE PACKAGES"
          value={summary.inactive}
          icon={<Package className="w-4 h-4" />}
          variant="slate"
          badge="Inactive"
        />
        <MetricCard
          title="MULTI DESTINATION"
          value={summary.multiDestination}
          subtitle="Packages"
          icon={<Compass className="w-4 h-4" />}
          variant="blue"
          badge="Multi-Spot"
        />
        <MetricCard
          title="DAY TOURS"
          value={summary.dayTour}
          subtitle="1 Day"
          icon={<Calendar className="w-4 h-4" />}
          variant="amber"
          badge="Day Tour"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search package name, code, destination..."
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "All", label: "All Statuses" },
              { value: "Active", label: "Active Packages" },
              { value: "Draft", label: "Draft Packages" },
              { value: "Inactive", label: "Inactive Packages" },
            ],
          },
          {
            key: "type",
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { value: "All", label: "All Package Types" },
              { value: "Day Tour", label: "Day Tour" },
              { value: "Multi Destination", label: "Multi Destination" },
              { value: "Custom Group", label: "Custom Group" },
            ],
          },
          {
            key: "duration",
            value: durationFilter,
            onChange: setDurationFilter,
            options: [
              { value: "All", label: "All Durations" },
              { value: "1 Day", label: "1 Day" },
              { value: "2D1N", label: "2D1N" },
              { value: "3D2N", label: "3D2N" },
              { value: "4D3N", label: "4D3N" },
              { value: "5D4N", label: "5D4N" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Package Code,Package Name,Type,Duration,Operational Cost,Status,Updated At\n";
          const rows = filteredPackages
            .map((r) => `"${r.code}","${r.name}","${r.type}","${r.duration}",${r.totalOperationalCostRupiah},"${r.status}","${r.updatedAt}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Tour_Packages_Master_Export.csv";
          a.click();
        }}
        exportLabel="Export Packages"
        columns={[
          {
            key: "package",
            header: "Package Name & Code",
            render: (r: TourPackageMaster) => (
              <div className="space-y-0.5">
                <Link href={`/tour-packages/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                  {r.name}
                </Link>
                <span className="text-[10px] text-slate-400 font-mono block">{r.code}</span>
              </div>
            ),
          },
          {
            key: "type",
            header: "Package Type",
            render: (r: TourPackageMaster) => (
              <Badge variant={r.type === "Day Tour" ? "slate" : r.type === "Multi Destination" ? "blue" : "emerald"}>
                {r.type}
              </Badge>
            ),
          },
          { key: "duration", header: "Duration", render: (r: TourPackageMaster) => <span className="font-mono text-xs font-bold">{r.duration}</span> },
          {
            key: "destinations",
            header: "Included Destinations",
            render: (r: TourPackageMaster) => (
              <div className="flex items-center gap-1 flex-wrap text-[10px] font-mono">
                {r.destinations.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                    📍 {d.destinationName}
                  </span>
                ))}
              </div>
            ),
          },
          {
            key: "cost",
            header: "Operational Cost",
            render: (r: TourPackageMaster) => (
              <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
                Rp {r.totalOperationalCostRupiah.toLocaleString("id-ID")}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (r: TourPackageMaster) => (
              <Badge variant={r.status === "Active" ? "emerald" : r.status === "Draft" ? "amber" : "slate"}>
                ● {r.status}
              </Badge>
            ),
          },
          { key: "updated", header: "Updated", render: (r: TourPackageMaster) => <span className="font-mono text-xs">{r.updatedAt}</span> },
          {
            key: "actions",
            header: "Actions",
            render: (r: TourPackageMaster) => (
              <div className="flex items-center gap-1.5 justify-end">
                <Link href={`/tour-packages/${r.id}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-center transition-all duration-200 group"
                    title="View Detail"
                  >
                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDuplicate(r)}
                  className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-200 dark:hover:border-purple-800 flex items-center justify-center transition-all duration-200 group"
                  title="Duplicate Package"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-600 transition-colors" />
                </button>
              </div>
            ),
          },
        ]}
        data={filteredPackages}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
