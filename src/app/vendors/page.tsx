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
import { MetricCard } from "@/components/ui/MetricCard";
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
  FileCheck,
  Wallet,
  Eye,
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
        showBackButton={false}
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

            <Link href="/vendors/new">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Vendor
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricCard
          title="TOTAL VENDORS"
          value={summary.total}
          subtitle="Partners"
          icon={<Building className="w-4 h-4" />}
          variant="slate"
        />
        <MetricCard
          title="VEHICLES SUPPLIED"
          value={summary.vehiclesSupplied}
          subtitle="Units Fleet"
          icon={<Truck className="w-4 h-4" />}
          variant="blue"
          badge="Fleet"
        />
        <MetricCard
          title="ACTIVE CONTRACTS"
          value={summary.activeContracts}
          subtitle="Rate Agreements"
          icon={<FileCheck className="w-4 h-4" />}
          variant="emerald"
          badge="● Active"
        />
        <MetricCard
          title="EST. RENTAL (MONTH)"
          value={`Rp ${summary.monthlyEstimated.toLocaleString("id-ID")}`}
          subtitle="Budget Forecast"
          icon={<Wallet className="w-4 h-4" />}
          variant="violet"
        />
        <MetricCard
          title="ACTUAL RENTAL SPENT"
          value={`Rp ${summary.monthlyActual.toLocaleString("id-ID")}`}
          subtitle="Realized Cost"
          icon={<DollarSign className="w-4 h-4" />}
          variant="blue"
        />
        <MetricCard
          title="COST VARIANCE"
          value={`+Rp ${summary.monthlyVariance.toLocaleString("id-ID")}`}
          subtitle="Over Budget"
          icon={<AlertTriangle className="w-4 h-4" />}
          variant="amber"
          trend={{ value: "+3.5%", isPositive: false }}
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search vendor, contact, city..."
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "All", label: "All Statuses" },
              { value: "Active", label: "Active Vendors" },
              { value: "Inactive", label: "Inactive Vendors" },
            ],
          },
          {
            key: "region",
            value: regionFilter,
            onChange: setRegionFilter,
            options: [
              { value: "All", label: "All Regions" },
              { value: "East Java", label: "East Java" },
              { value: "Banyuwangi", label: "Banyuwangi" },
              { value: "Bali", label: "Bali" },
            ],
          },
          {
            key: "contract",
            value: contractFilter,
            onChange: setContractFilter,
            options: [
              { value: "All", label: "All Contracts" },
              { value: "Active", label: "Active Contracts" },
              { value: "Expiring", label: "Expiring Soon" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Vendor Code,Vendor Name,Contact Person,Phone,Region,Vehicles Supplied,Active Contracts,Monthly Spent,Status\n";
          const rows = filteredVendors
            .map((r) => `"${r.code}","${r.name}","${r.contactPerson}","${r.phone}","${r.city}, ${r.region}",${r.suppliedVehiclesCount},${r.activeContractsCount},${r.actualMonthlyCostRupiah},"${r.status}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Vendors_Export.csv";
          a.click();
        }}
        exportLabel="Export Vendors"
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
              <div className="flex justify-end">
                <Link href={`/vendors/${r.id}`}>
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
        data={filteredVendors}
        keyExtractor={(r) => r.id}
      />

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
