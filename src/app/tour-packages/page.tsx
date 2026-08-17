"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
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
  Copy,
  CheckCircle2,
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
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOTAL TOUR PACKAGES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{summary.total}</span>
            <span className="text-[10px] text-blue-600 font-bold font-mono">Catalog</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">ACTIVE PACKAGES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.active}</span>
            <Badge variant="emerald">● Active</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">INACTIVE PACKAGES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-400">{summary.inactive}</span>
            <Badge variant="slate">Inactive</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20">
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase block">MULTI DESTINATION</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{summary.multiDestination}</span>
            <span className="text-[10px] text-blue-600 font-mono">Packages</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">DAY TOURS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">{summary.dayTour}</span>
            <span className="text-[10px] text-slate-400 font-mono">1 Day</span>
          </div>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search package name, code, destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { value: "All", label: "All Package Types" },
                { value: "Day Tour", label: "Day Tour" },
                { value: "Multi Destination", label: "Multi Destination" },
                { value: "Overland", label: "Overland" },
              ]}
              className="w-40"
            />

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
                { value: "Draft", label: "Draft" },
              ]}
              className="w-32"
            />

            <Select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              options={[
                { value: "All", label: "All Durations" },
                { value: "1 Day", label: "1 Day" },
                { value: "2D1N", label: "2D1N" },
                { value: "3D2N", label: "3D2N" },
                { value: "4D3N", label: "4D3N" },
                { value: "5D4N", label: "5D4N" },
              ]}
              className="w-32"
            />
          </div>
        </div>

        {/* TOUR PACKAGES DATA TABLE */}
        <DataTable
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
                <div className="flex items-center gap-1.5">
                  <Link href={`/tour-packages/${r.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                      View Detail
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(r)}
                    className="h-7 text-xs px-1.5 text-slate-500"
                    title="Duplicate Package"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={filteredPackages}
          keyExtractor={(r) => r.id}
        />
      </Card>
    </AppShell>
  );
}
