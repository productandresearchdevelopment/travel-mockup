"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { MetricCard } from "@/components/ui/MetricCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { mockWorkforceData } from "@/data/mockWorkforceData";
import { WorkerMaster, WorkerRole, EmploymentType, VehicleOwnership } from "@/types/workforce";
import {
  UserCheck,
  Plus,
  Search,
  Filter,
  Users,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  UserX,
  Eye,
} from "lucide-react";

export default function WorkforceListPage() {
  const [workers, setWorkers] = useState<WorkerMaster[]>(mockWorkforceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [employmentFilter, setEmploymentFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Worker Form State
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<WorkerRole>("Driver");
  const [newEmploymentType, setNewEmploymentType] = useState<EmploymentType>("Daily Worker");
  const [newPhone, setNewPhone] = useState("+62 812-");
  const [newRegion, setNewRegion] = useState("Surabaya");
  const [newDailyRate, setNewDailyRate] = useState(350000);
  const [newVehicleOwnership, setNewVehicleOwnership] = useState<VehicleOwnership>("No Vehicle");

  // Summary Metrics
  const summary = useMemo(() => {
    return {
      total: 48,
      availableToday: 21,
      assignedToday: 18,
      onTrip: 7,
      unavailable: 2,
    };
  }, []);

  // Filtered Workers
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchSearch =
        w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.workerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.phone.includes(searchQuery) ||
        w.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = roleFilter === "All" || w.role === roleFilter;
      const matchEmployment = employmentFilter === "All" || w.employmentType === employmentFilter;
      const matchAvailability = availabilityFilter === "All" || w.availability === availabilityFilter;

      return matchSearch && matchRole && matchEmployment && matchAvailability;
    });
  }, [workers, searchQuery, roleFilter, employmentFilter, availabilityFilter]);

  // Add Worker Handler
  const handleAddWorker = () => {
    if (!newName) return;

    const newWorker: WorkerMaster = {
      id: `wrk-${Date.now()}`,
      workerCode: `WRK-${newRole.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
      fullName: newName,
      role: newRole,
      employmentType: newEmploymentType,
      phone: newPhone,
      region: newRegion,
      dailyRateRupiah: newDailyRate,
      vehicleOwnership: newVehicleOwnership,
      availability: "Available",
      currentAssignment: "None",
      status: "Active",
      joinedDate: "2026-08-18",
      assignments: [],
      attendanceLogs: [],
      compensationHistory: [],
      history: [{ id: `h-${Date.now()}`, timestamp: "2026-08-18", user: "Operations HQ", action: "Registered", details: "Worker registered in Workforce Master" }],
    };

    setWorkers([newWorker, ...workers]);
    setShowAddModal(false);
    setNewName("");
  };

  return (
    <AppShell>
      <PageHeader
        title="Workforce Management"
        description="Operational management layer for drivers, tour guides, tour managers, daily workers, and daily rate compensations."
        showBackButton={false}
        breadcrumbItems={[{ label: "Workforce", href: "/workforce" }, { label: "Workforce List" }]}
        actions={
          <Link href="/workforce/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Register New Worker
            </Button>
          </Link>
        }
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <MetricCard
          title="TOTAL WORKFORCE"
          value={summary.total}
          subtitle="Workers"
          icon={<Users className="w-4 h-4" />}
          variant="slate"
        />
        <MetricCard
          title="AVAILABLE TODAY"
          value={summary.availableToday}
          icon={<UserCheck className="w-4 h-4" />}
          variant="emerald"
          badge="● Available"
        />
        <MetricCard
          title="ASSIGNED TODAY"
          value={summary.assignedToday}
          icon={<Briefcase className="w-4 h-4" />}
          variant="blue"
          badge="Assigned"
        />
        <MetricCard
          title="ON TRIP ON ROAD"
          value={summary.onTrip}
          icon={<Navigation className="w-4 h-4" />}
          variant="violet"
          badge="● On Trip"
        />
        <MetricCard
          title="UNAVAILABLE / LEAVE"
          value={summary.unavailable}
          icon={<UserX className="w-4 h-4" />}
          variant="rose"
          badge="Unavailable"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search worker name, code, phone..."
        filters={[
          {
            key: "role",
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { value: "All", label: "All Roles" },
              { value: "Driver", label: "Driver" },
              { value: "Guide", label: "Guide" },
              { value: "Tour Manager", label: "Tour Manager" },
              { value: "Other Operational", label: "Other Operational" },
            ],
          },
          {
            key: "employment",
            value: employmentFilter,
            onChange: setEmploymentFilter,
            options: [
              { value: "All", label: "All Employment" },
              { value: "Daily Worker", label: "Daily Worker" },
              { value: "Contract", label: "Contract" },
              { value: "Freelance", label: "Freelance" },
              { value: "Permanent", label: "Permanent" },
            ],
          },
          {
            key: "availability",
            value: availabilityFilter,
            onChange: setAvailabilityFilter,
            options: [
              { value: "All", label: "All Availability" },
              { value: "Available", label: "Available" },
              { value: "Assigned", label: "Assigned" },
              { value: "On Trip", label: "On Trip" },
              { value: "Unavailable", label: "Unavailable" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Worker Code,Full Name,Role,Employment Type,Phone,Region,Daily Rate,Availability\n";
          const rows = filteredWorkers
            .map((r) => `"${r.workerCode}","${r.fullName}","${r.role}","${r.employmentType}","${r.phone}","${r.region}",${r.dailyRateRupiah},"${r.availability}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Workforce_Master_Export.csv";
          a.click();
        }}
        exportLabel="Export Workforce"
        columns={[
          {
            key: "worker",
            header: "Worker Name & Code",
            render: (r: WorkerMaster) => (
              <div className="flex items-center gap-2.5 max-w-[190px]">
                {r.avatarUrl ? (
                  <img
                    src={r.avatarUrl}
                    alt={r.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {r.fullName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/workforce/${r.id}`}
                    title={r.fullName}
                    className="font-bold text-xs text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 block truncate"
                  >
                    {r.fullName}
                  </Link>
                  <span title={r.workerCode} className="text-[10px] text-slate-500 font-mono block truncate">
                    {r.workerCode}
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: (r: WorkerMaster) => (
              <Badge variant={r.role === "Driver" ? "blue" : r.role === "Guide" ? "emerald" : "violet"}>
                {r.role}
              </Badge>
            ),
          },
          {
            key: "employment",
            header: "Employment Type",
            render: (r: WorkerMaster) => (
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">
                {r.employmentType}
              </span>
            ),
          },
          { key: "phone", header: "Phone", render: (r: WorkerMaster) => <span className="font-mono text-xs">{r.phone}</span> },
          { key: "region", header: "Region", render: (r: WorkerMaster) => <span className="font-mono text-xs">📍 {r.region}</span> },
          {
            key: "rate",
            header: "Daily Rate",
            render: (r: WorkerMaster) => (
              <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                Rp {r.dailyRateRupiah.toLocaleString("id-ID")} / day
              </span>
            ),
          },
          {
            key: "availability",
            header: "Availability",
            render: (r: WorkerMaster) => (
              <Badge
                variant={
                  r.availability === "Available"
                    ? "emerald"
                    : r.availability === "Assigned"
                    ? "blue"
                    : r.availability === "On Trip"
                    ? "violet"
                    : "slate"
                }
              >
                ● {r.availability}
              </Badge>
            ),
          },
          {
            key: "assignment",
            header: "Current Assignment",
            render: (r: WorkerMaster) => (
              <span className="font-mono text-xs text-slate-600 dark:text-slate-300 truncate max-w-[150px] block">
                {r.currentAssignment || "None"}
              </span>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: (r: WorkerMaster) => (
              <div className="flex justify-end">
                <Link href={`/workforce/${r.id}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-center transition-all duration-200 group"
                    title="View Detail"
                  >
                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </button>
                </Link>
              </div>
            ),
          },
        ]}
        data={filteredWorkers}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
