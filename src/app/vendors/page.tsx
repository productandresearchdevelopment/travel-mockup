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
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { mockVendorsData } from "@/data/mockVendorsData";
import { VendorMaster } from "@/types/vendor";
import {
  Building,
  Plus,
  Search,
  Filter,
  FileText,
  Truck,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Lock,
} from "lucide-react";

export default function VendorsListPage() {
  const [vendors, setVendors] = useState<VendorMaster[]>(mockVendorsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [contractFilter, setContractFilter] = useState("All");

  // Modals state
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showAddContractModal, setShowAddContractModal] = useState(false);

  // New Vendor Form
  const [newVendorName, setNewVendorName] = useState("");
  const [newLegalName, setNewLegalName] = useState("");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRegion, setNewRegion] = useState<"East Java" | "Banyuwangi" | "Bali">("East Java");
  const [newCity, setNewCity] = useState("Malang");
  const [newAddress, setNewAddress] = useState("");

  // Summary Metrics
  const summary = useMemo(() => {
    const total = 18;
    const active = 15;
    const inactive = 3;
    const vehiclesSupplied = 42;
    const activeContracts = 14;
    const monthlyEstimated = 48500000;
    const monthlyActual = 50200000;
    const monthlyVariance = 1700000;

    return {
      total,
      active,
      inactive,
      vehiclesSupplied,
      activeContracts,
      monthlyEstimated,
      monthlyActual,
      monthlyVariance,
    };
  }, []);

  // Filtered Vendors
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.legalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || v.status === statusFilter;
      const matchRegion = regionFilter === "All" || v.region === regionFilter;

      return matchSearch && matchStatus && matchRegion;
    });
  }, [vendors, searchQuery, statusFilter, regionFilter]);

  // Handle Save New Vendor
  const handleSaveVendor = () => {
    if (!newVendorName || !newContactPerson) return;

    const newVnd: VendorMaster = {
      id: `vnd-${Date.now()}`,
      code: `VND-${newCity.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newVendorName,
      legalName: newLegalName || newVendorName,
      contactPerson: newContactPerson,
      phone: newPhone || "0812-0000-0000",
      email: newEmail || "vendor@example.com",
      address: newAddress || "Main Street No. 1",
      region: newRegion,
      city: newCity,
      suppliedVehiclesCount: 0,
      activeContractsCount: 0,
      currentTripsCount: 0,
      estimatedMonthlyCostRupiah: 0,
      actualMonthlyCostRupiah: 0,
      varianceRupiah: 0,
      variancePercent: 0,
      status: "Active",
      contracts: [],
      rates: [],
      vehicles: [],
      trips: [],
      costHistory: [],
      documents: [],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          timestamp: "2026-08-18 10:00",
          user: "Ops Admin",
          action: "Vendor Created",
          details: "Master vendor partner created.",
        },
      ],
    };

    setVendors([newVnd, ...vendors]);
    setShowAddVendorModal(false);

    // Reset Form
    setNewVendorName("");
    setNewLegalName("");
    setNewContactPerson("");
    setNewPhone("");
    setNewEmail("");
  };

  return (
    <AppShell>
      <PageHeader
        title="Vendors & Rental Management"
        description="Manage vehicle vendor partners, active rental contracts, locked rates, and cost variance controls."
        breadcrumbItems={[{ label: "Resources", href: "/vehicles" }, { label: "Vendors" }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddContractModal(true)}
              leftIcon={<FileText className="w-3.5 h-3.5 text-blue-600" />}
            >
              Add Contract
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddVendorModal(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Vendor
            </Button>
          </div>
        }
      />

      {/* TOP SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOTAL VENDORS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{summary.total}</span>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">15 Active</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">VEHICLES SUPPLIED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{summary.vehiclesSupplied}</span>
            <span className="text-[10px] text-slate-400 font-mono">Units</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">ACTIVE CONTRACTS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">{summary.activeContracts}</span>
            <Badge variant="emerald">Active</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">ESTIMATED RENTAL (MONTH)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">Rp {summary.monthlyEstimated.toLocaleString("id-ID")}</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">ACTUAL RENTAL SPENT</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">Rp {summary.monthlyActual.toLocaleString("id-ID")}</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">COST VARIANCE</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">+Rp {summary.monthlyVariance.toLocaleString("id-ID")}</span>
            <span className="text-[10px] font-mono text-amber-600 font-bold">+3.5%</span>
          </div>
        </Card>
      </div>

      {/* RENTAL CONTROL BANNER */}
      <Card className="p-4 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border-blue-800/40 text-white space-y-2">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-300">
            LOCKED RATE & COST VARIANCE CONTROL ARCHITECTURE
          </h2>
        </div>
        <p className="text-xs text-slate-300 font-sans">
          Vendor Contracts enforce locked daily/trip rates. Dispatchers cannot manually overwrite rental costs. Any variance between Estimated and Actual rental costs triggers mandatory operational review.
        </p>
      </Card>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search vendor, contact, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "Active", label: "Active Vendors" },
                { value: "Inactive", label: "Inactive Vendors" },
              ]}
              className="w-36"
            />

            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={[
                { value: "All", label: "All Regions" },
                { value: "East Java", label: "East Java" },
                { value: "Banyuwangi", label: "Banyuwangi" },
                { value: "Bali", label: "Bali" },
              ]}
              className="w-36"
            />

            <Select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              options={[
                { value: "All", label: "All Contracts" },
                { value: "Active", label: "Active Contracts" },
                { value: "Expiring", label: "Expiring Soon" },
              ]}
              className="w-36"
            />
          </div>
        </div>

        {/* VENDORS DATA TABLE */}
        <DataTable
          columns={[
            {
              key: "name",
              header: "Vendor Partner",
              render: (r: VendorMaster) => (
                <div className="space-y-0.5">
                  <Link href={`/vendors/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {r.name}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono block">{r.code} · {r.legalName}</span>
                </div>
              ),
            },
            {
              key: "contact",
              header: "Contact Person",
              render: (r: VendorMaster) => (
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.contactPerson}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">{r.phone}</span>
                </div>
              ),
            },
            {
              key: "region",
              header: "Region",
              render: (r: VendorMaster) => (
                <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{r.city}, {r.region}</span>
              ),
            },
            {
              key: "vehicles",
              header: "Vehicles Supplied",
              render: (r: VendorMaster) => (
                <span className="font-mono font-bold text-blue-600">{r.suppliedVehiclesCount} Units</span>
              ),
            },
            {
              key: "contracts",
              header: "Active Contracts",
              render: (r: VendorMaster) => (
                <Badge variant={r.activeContractsCount > 0 ? "emerald" : "amber"}>
                  {r.activeContractsCount} Active
                </Badge>
              ),
            },
            {
              key: "monthlySpent",
              header: "Monthly Rental Spent",
              render: (r: VendorMaster) => (
                <div className="font-mono text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 block">Rp {r.actualMonthlyCostRupiah.toLocaleString("id-ID")}</span>
                  {r.varianceRupiah > 0 && (
                    <span className="text-[10px] font-bold text-amber-600 block">+Rp {r.varianceRupiah.toLocaleString("id-ID")} (+{r.variancePercent}%)</span>
                  )}
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r: VendorMaster) => (
                <Badge variant={r.status === "Active" ? "emerald" : "slate"}>
                  ● {r.status}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r: VendorMaster) => (
                <Link href={`/vendors/${r.id}`}>
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                    View Detail
                  </Button>
                </Link>
              ),
            },
          ]}
          data={filteredVendors}
          keyExtractor={(r) => r.id}
        />
      </Card>

      {/* MODAL 1: ADD VENDOR */}
      <Modal isOpen={showAddVendorModal} onClose={() => setShowAddVendorModal(false)} title="Create Master Vendor Partner">
        <div className="space-y-4 text-xs">
          <FormField label="Vendor Name *">
            <Input
              placeholder="e.g. PT ABC Transport"
              value={newVendorName}
              onChange={(e) => setNewVendorName(e.target.value)}
            />
          </FormField>

          <FormField label="Legal Business Name">
            <Input
              placeholder="e.g. PT ABC Transport Nusantara"
              value={newLegalName}
              onChange={(e) => setNewLegalName(e.target.value)}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Contact Person *">
              <Input
                placeholder="e.g. Budi Hartono"
                value={newContactPerson}
                onChange={(e) => setNewContactPerson(e.target.value)}
              />
            </FormField>

            <FormField label="Phone Number">
              <Input
                placeholder="0812-3456-7890"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Email">
              <Input
                type="email"
                placeholder="vendor@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Operating Region">
              <Select
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value as any)}
                options={[
                  { value: "East Java", label: "East Java" },
                  { value: "Banyuwangi", label: "Banyuwangi" },
                  { value: "Bali", label: "Bali" },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Office Address">
            <Textarea
              placeholder="Full office or depot address..."
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddVendorModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveVendor}>
              Create Vendor
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: ADD CONTRACT */}
      <Modal isOpen={showAddContractModal} onClose={() => setShowAddContractModal(false)} title="Create Rental Contract">
        <div className="space-y-4 text-xs">
          <FormField label="Vendor Partner">
            <Select
              options={vendors.map((v) => ({ value: v.id, label: `${v.name} (${v.city})` }))}
            />
          </FormField>

          <FormField label="Contract Number">
            <Input placeholder="e.g. CTR-ABC-2026-002" defaultValue={`CTR-ABC-2026-${Math.floor(100 + Math.random() * 900)}`} />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Start Date">
              <Input type="date" defaultValue="2026-09-01" />
            </FormField>

            <FormField label="End Date">
              <Input type="date" defaultValue="2026-09-30" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Rental Type">
              <Select
                options={[
                  { value: "Daily", label: "Daily Rate" },
                  { value: "Weekly", label: "Weekly Rate" },
                  { value: "Monthly", label: "Monthly Rate" },
                  { value: "Per Trip", label: "Per Trip Rate" },
                ]}
              />
            </FormField>

            <FormField label="Payment Terms">
              <Select
                options={[
                  { value: "Monthly", label: "Monthly Billing" },
                  { value: "Per Trip", label: "Per Trip" },
                  { value: "Net 30", label: "Net 30 Days" },
                ]}
              />
            </FormField>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddContractModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowAddContractModal(false)}>
              Save Contract
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
