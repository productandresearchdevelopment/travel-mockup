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
        breadcrumbItems={[{ label: "Workforce", href: "/workforce" }, { label: "Workforce List" }]}
        actions={
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Register New Worker
          </Button>
        }
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOTAL WORKFORCE</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{summary.total}</span>
            <span className="text-[10px] text-blue-600 font-bold font-mono">Workers</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">AVAILABLE TODAY</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.availableToday}</span>
            <Badge variant="emerald">● Available</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20">
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase block">ASSIGNED TODAY</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{summary.assignedToday}</span>
            <Badge variant="blue">Assigned</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20">
          <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase block">ON TRIP ON ROAD</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">{summary.onTrip}</span>
            <Badge variant="violet">● On Trip</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">UNAVAILABLE / LEAVE</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-400">{summary.unavailable}</span>
            <Badge variant="slate">Unavailable</Badge>
          </div>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search worker name, code, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: "All", label: "All Roles" },
                { value: "Driver", label: "Driver" },
                { value: "Guide", label: "Guide" },
                { value: "Tour Manager", label: "Tour Manager" },
                { value: "Other Operational", label: "Other Operational" },
              ]}
              className="w-36"
            />

            <Select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              options={[
                { value: "All", label: "All Employment" },
                { value: "Daily Worker", label: "Daily Worker" },
                { value: "Contract", label: "Contract" },
                { value: "Freelance", label: "Freelance" },
                { value: "Permanent", label: "Permanent" },
              ]}
              className="w-36"
            />

            <Select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              options={[
                { value: "All", label: "All Availability" },
                { value: "Available", label: "Available" },
                { value: "Assigned", label: "Assigned" },
                { value: "On Trip", label: "On Trip" },
                { value: "Unavailable", label: "Unavailable" },
              ]}
              className="w-36"
            />
          </div>
        </div>

        {/* WORKFORCE DATA TABLE */}
        <DataTable
          columns={[
            {
              key: "worker",
              header: "Worker Name & Code",
              render: (r: WorkerMaster) => (
                <div className="space-y-0.5">
                  <Link href={`/workforce/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {r.fullName}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono block">{r.workerCode}</span>
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
                <Link href={`/workforce/${r.id}`}>
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                    View Detail
                  </Button>
                </Link>
              ),
            },
          ]}
          data={filteredWorkers}
          keyExtractor={(r) => r.id}
        />
      </Card>

      {/* REGISTER NEW WORKER MODAL */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Register New Field Worker">
        <div className="space-y-4 text-xs font-sans">
          <FormField label="Full Name *">
            <Input
              placeholder="e.g. Bambang Sukoco"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Role *">
              <Select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                options={[
                  { value: "Driver", label: "Driver" },
                  { value: "Guide", label: "Tour Guide" },
                  { value: "Tour Manager", label: "Tour Manager" },
                  { value: "Other Operational", label: "Other Operational" },
                ]}
              />
            </FormField>

            <FormField label="Employment Type *">
              <Select
                value={newEmploymentType}
                onChange={(e) => setNewEmploymentType(e.target.value as any)}
                options={[
                  { value: "Daily Worker", label: "Daily Worker" },
                  { value: "Contract", label: "Contract" },
                  { value: "Freelance", label: "Freelance" },
                  { value: "Permanent", label: "Permanent" },
                ]}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Phone Number *">
              <Input
                placeholder="+62 812-xxxx-xxxx"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </FormField>

            <FormField label="Operating Region">
              <Select
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                options={[
                  { value: "Surabaya", label: "Surabaya" },
                  { value: "Malang", label: "Malang" },
                  { value: "Probolinggo", label: "Probolinggo" },
                  { value: "Banyuwangi", label: "Banyuwangi" },
                  { value: "Bali", label: "Bali" },
                ]}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Daily Rate (Rp / day)">
              <Input
                type="number"
                value={newDailyRate}
                onChange={(e) => setNewDailyRate(Number(e.target.value) || 0)}
              />
            </FormField>

            <FormField label="Vehicle Ownership">
              <Select
                value={newVehicleOwnership}
                onChange={(e) => setNewVehicleOwnership(e.target.value as any)}
                options={[
                  { value: "No Vehicle", label: "No Vehicle (Requires Rental)" },
                  { value: "Personal Vehicle", label: "Personal Vehicle" },
                  { value: "Company Vehicle", label: "Company Vehicle" },
                ]}
              />
            </FormField>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 font-mono text-[11px] text-blue-700 dark:text-blue-300">
            💡 <strong>Person ≠ Vehicle Principle</strong>: Setting <em>No Vehicle</em> allows Dispatcher to pair this worker with rented vendor vehicles during tour deployment.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddWorker}>
              Save Worker Profile
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
