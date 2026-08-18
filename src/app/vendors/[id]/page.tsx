"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { mockVendorsData } from "@/data/mockVendorsData";
import { VendorMaster, VendorTripCostRecord, RentalContract, RentalRate } from "@/types/vendor";
import {
  Building,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Truck,
  ArrowLeft,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Plus,
  ShieldCheck,
  Clock,
  History,
} from "lucide-react";

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "vnd-001";

  const initialVendor = useMemo(() => {
    return mockVendorsData.find((v) => v.id === id) || mockVendorsData[0];
  }, [id]);

  const [vendor, setVendor] = useState<VendorMaster>(initialVendor);
  const [activeTab, setActiveTab] = useState("overview");

  // Cost Review Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTripCost, setSelectedTripCost] = useState<VendorTripCostRecord | null>(null);
  const [reviewNote, setReviewNote] = useState("");

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "vehicles", label: `Vehicles (${vendor.suppliedVehiclesCount})` },
    { id: "contracts", label: `Contracts (${vendor.contracts.length})` },
    { id: "rates", label: `Rates & Pricing (${vendor.rates.length})` },
    { id: "trips_cost", label: `Trips & Rental Costs (${vendor.trips.length})` },
    { id: "cost_history", label: "Monthly Cost History" },
    { id: "documents", label: `Documents (${vendor.documents.length})` },
    { id: "history", label: `Audit Trail (${vendor.activityHistory.length})` },
  ];

  // Handle Cost Variance Review Action
  const handleApproveCost = (approved: boolean) => {
    if (!selectedTripCost) return;

    const updatedTrips = vendor.trips.map((t) =>
      t.id === selectedTripCost.id
        ? {
            ...t,
            reviewStatus: approved ? ("Approved" as const) : ("Rejected" as const),
            reviewNotes: reviewNote || (approved ? "Cost variance reviewed & approved." : "Rejected due to unverified charge."),
          }
        : t
    );

    setVendor((prev) => ({
      ...prev,
      trips: updatedTrips,
    }));

    setShowReviewModal(false);
  };

  return (
    <AppShell>
      <PageHeader
        title={vendor.name}
        description={`Code: ${vendor.code} · ${vendor.legalName}`}
        breadcrumbItems={[
          { label: "Resources", href: "/vehicles" },
          { label: "Vendors", href: "/vendors" },
          { label: vendor.code },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab("contracts")}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Contract
          </Button>
        }
      />

      {/* Vendor Header Banner */}
      <DetailHeader
        title={vendor.name}
        code={vendor.code}
        subtitle={`${vendor.legalName} · ${vendor.city}, ${vendor.region}`}
        status={vendor.status as any}
        metrics={[
          { label: "Contact Person", value: vendor.contactPerson },
          { label: "Phone", value: vendor.phone },
          { label: "Vehicles Supplied", value: `${vendor.suppliedVehiclesCount} Units` },
          { label: "Monthly Rental Spent", value: `Rp ${vendor.actualMonthlyCostRupiah.toLocaleString("id-ID")}` },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant={vendor.varianceRupiah > 0 ? "amber" : "emerald"}>
              {vendor.varianceRupiah > 0 ? `Cost Variance: +Rp ${vendor.varianceRupiah.toLocaleString("id-ID")}` : "✓ Costs Within Estimate"}
            </Badge>
          </div>
        }
      />

      {/* QUICK SUMMARY CARD */}
      <Card className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border-slate-800 text-white grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block">VEHICLES SUPPLIED</span>
          <span className="font-extrabold text-base text-blue-400">{vendor.suppliedVehiclesCount} Units</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">ACTIVE CONTRACTS</span>
          <span className="font-extrabold text-base text-emerald-400">{vendor.activeContractsCount} Active</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">ESTIMATED (MONTH)</span>
          <span className="font-extrabold text-sm text-slate-200">Rp {vendor.estimatedMonthlyCostRupiah.toLocaleString("id-ID")}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">ACTUAL SPENT</span>
          <span className="font-extrabold text-sm text-amber-400">Rp {vendor.actualMonthlyCostRupiah.toLocaleString("id-ID")}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">VARIANCE</span>
          <span className="font-extrabold text-sm text-amber-300">+Rp {vendor.varianceRupiah.toLocaleString("id-ID")} (+{vendor.variancePercent}%)</span>
        </div>
      </Card>

      {/* TABS */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Building className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Vendor Master Profile
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Vendor Name</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{vendor.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Legal Name</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{vendor.legalName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contact Person</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{vendor.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{vendor.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{vendor.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Region</span>
                <span className="font-bold text-blue-600">{vendor.city}, {vendor.region}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Lock className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Rental Control & Anti-Fraud Architecture
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              All vehicles rented from <strong>{vendor.name}</strong> operate under locked daily/trip rates established in active contracts. Dispatchers cannot alter rates during assignment.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#162034] border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Active Contract: CTR-ABC-2026-001</span>
              <span className="text-slate-500 block">Approved Hiace Rate: Rp 850.000 / day 🔒 (Locked)</span>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: VEHICLES */}
      {activeTab === "vehicles" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Supplied Vehicle Fleet Units ({vendor.vehicles.length})
          </h3>
          <DataTable
            columns={[
              {
                key: "vehicle",
                header: "Vehicle Model & Plate",
                render: (r: any) => (
                  <div className="space-y-0.5">
                    <Link href={`/vehicles/${r.vehicleId}`} className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600">
                      {r.name}
                    </Link>
                    <span className="font-mono text-xs text-blue-600 block">{r.vehiclePlate}</span>
                  </div>
                ),
              },
              { key: "type", header: "Vehicle Type", render: (r: any) => <span>{r.vehicleType}</span> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant={r.status === "On Trip" ? "emerald" : "blue"}>{r.status}</Badge> },
              { key: "rate", header: "Locked Daily Rate", render: (r: any) => <span className="font-mono font-bold text-slate-900 dark:text-slate-100">Rp {r.rateRupiah.toLocaleString("id-ID")} / day 🔒</span> },
              {
                key: "action",
                header: "Action",
                render: (r: any) => (
                  <Link href={`/vehicles/${r.vehicleId}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                      View Vehicle
                    </Button>
                  </Link>
                ),
              },
            ]}
            data={vendor.vehicles}
            keyExtractor={(r) => r.vehicleId}
          />
        </Card>
      )}

      {/* TAB 3: CONTRACTS */}
      {activeTab === "contracts" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Rental Master Contracts ({vendor.contracts.length})
            </h3>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              New Contract
            </Button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {vendor.contracts.map((ctr) => (
              <div key={ctr.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{ctr.contractNumber}</span>
                  <Badge variant={ctr.status === "Active" ? "emerald" : "amber"}>● {ctr.status}</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600 dark:text-slate-300">
                  <div><span>Period:</span> <strong className="text-slate-900 dark:text-slate-100">{ctr.startDate} — {ctr.endDate}</strong></div>
                  <div><span>Rental Type:</span> <strong className="text-slate-900 dark:text-slate-100">{ctr.rentalType}</strong></div>
                  <div><span>Assigned Fleet:</span> <strong className="text-blue-600">{ctr.assignedVehiclesCount} Vehicles</strong></div>
                  <div><span>Payment Terms:</span> <strong className="text-slate-900 dark:text-slate-100">{ctr.paymentTerms}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: RATES */}
      {activeTab === "rates" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Locked Rental Rates Matrix
            </h3>
            <Badge variant="blue">🔒 Dispatcher Lock Active</Badge>
          </div>

          <DataTable
            columns={[
              { key: "contract", header: "Contract", render: (r: RentalRate) => <span className="font-mono font-bold text-blue-600">{r.contractNumber}</span> },
              { key: "vehicleType", header: "Vehicle Model / Type", render: (r: RentalRate) => <span className="font-bold">{r.vehicleType}</span> },
              { key: "rateType", header: "Rate Type", render: (r: RentalRate) => <span>{r.rateType}</span> },
              { key: "rate", header: "Agreed Rate (Rp)", render: (r: RentalRate) => <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">Rp {r.rateRupiah.toLocaleString("id-ID")} / day 🔒</span> },
              { key: "period", header: "Effective Period", render: (r: RentalRate) => <span className="font-mono text-xs">{r.effectiveStartDate} — {r.effectiveEndDate}</span> },
              { key: "status", header: "Status", render: (r: RentalRate) => <Badge variant="emerald">{r.status}</Badge> },
            ]}
            data={vendor.rates}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 5: TRIPS & RENTAL COSTS (REQUIREMENTS 24 & 25) */}
      {activeTab === "trips_cost" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Vendor Trips, Rental History & Performance Audit
              </h3>
              <p className="text-xs text-slate-500">Historical vehicle rental assignments, cost variance, and reliability metrics</p>
            </div>
            <Badge variant="violet">✓ Vendor Score: 98/100</Badge>
          </div>

          {/* VENDOR PERFORMANCE METRICS (REQUIREMENTS 24 & 25) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL RENTALS</span>
              <strong className="text-lg font-extrabold text-slate-900 dark:text-slate-100 block">14 Trips</strong>
              <span className="text-slate-500 text-[10px]">HiAce, Elf & Innova</span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL RENTAL VALUE</span>
              <strong className="text-lg font-extrabold text-indigo-600 block">Rp 25.500.000</strong>
              <span className="text-slate-500 text-[10px]">Actual Disbursed</span>
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-0.5">
              <span className="text-[10px] text-emerald-600 font-bold block uppercase">ON-TIME RATE</span>
              <strong className="text-lg font-extrabold text-emerald-600 block">96.4%</strong>
              <span className="text-emerald-600 text-[10px] block font-bold">✓ High Reliability</span>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20 space-y-0.5">
              <span className="text-[10px] text-amber-600 font-bold block uppercase">VEHICLE ISSUES</span>
              <strong className="text-lg font-extrabold text-amber-600 block">2 Events</strong>
              <span className="text-slate-500 text-[10px]">AC & Tire Pressure</span>
            </div>

            <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20 space-y-0.5">
              <span className="text-[10px] text-purple-600 font-bold block uppercase">REPLACEMENT COUNT</span>
              <strong className="text-lg font-extrabold text-purple-600 block">1 Event</strong>
              <span className="text-slate-500 text-[10px]">HiAce Premio Replacement</span>
            </div>
          </div>

          <DataTable
            columns={[
              {
                key: "trip",
                header: "Trip Name & Code",
                render: (r: VendorTripCostRecord) => (
                  <div className="space-y-0.5">
                    <Link href={`/dispatch/trips/${r.tripId}`} className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600">
                      {r.tripName}
                    </Link>
                    <span className="font-mono text-[10px] text-slate-400 block">{r.date} · {r.tripCode}</span>
                  </div>
                ),
              },
              { key: "vehicle", header: "Vehicle", render: (r: VendorTripCostRecord) => <span className="font-mono font-bold">{r.vehiclePlate}</span> },
              { key: "estimated", header: "Estimated Rental", render: (r: VendorTripCostRecord) => <span className="font-mono">Rp {r.estimatedRentalCost.toLocaleString("id-ID")}</span> },
              { key: "actual", header: "Actual Rental Cost", render: (r: VendorTripCostRecord) => <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">Rp {r.actualRentalCost.toLocaleString("id-ID")}</span> },
              {
                key: "variance",
                header: "Cost Variance",
                render: (r: VendorTripCostRecord) => (
                  <span className={`font-mono font-bold ${r.varianceRupiah > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                    +{r.varianceRupiah.toLocaleString("id-ID")} (+{r.variancePercent}%)
                  </span>
                ),
              },
              {
                key: "review",
                header: "Review Status",
                render: (r: VendorTripCostRecord) => (
                  <Badge variant={r.reviewStatus === "Approved" ? "emerald" : "amber"}>
                    {r.reviewStatus}
                  </Badge>
                ),
              },
              {
                key: "action",
                header: "Action",
                render: (r: VendorTripCostRecord) => (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2"
                    onClick={() => {
                      setSelectedTripCost(r);
                      setShowReviewModal(true);
                    }}
                  >
                    Review Cost
                  </Button>
                ),
              },
            ]}
            data={vendor.trips}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 6: COST HISTORY */}
      {activeTab === "cost_history" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Monthly Cost History & Audit Summary
          </h3>
          <DataTable
            columns={[
              { key: "month", header: "Month", render: (r: any) => <span className="font-mono font-bold">{r.monthYear}</span> },
              { key: "trips", header: "Trips Executed", render: (r: any) => <span className="font-mono">{r.tripsCount} Trips</span> },
              { key: "estimated", header: "Estimated Rental (Rp)", render: (r: any) => <span className="font-mono">Rp {r.estimatedRupiah.toLocaleString("id-ID")}</span> },
              { key: "actual", header: "Actual Rental (Rp)", render: (r: any) => <span className="font-mono font-extrabold">Rp {r.actualRupiah.toLocaleString("id-ID")}</span> },
              { key: "variance", header: "Variance", render: (r: any) => <span className="font-mono font-bold text-amber-600">+Rp {r.varianceRupiah.toLocaleString("id-ID")} (+{r.variancePercent}%)</span> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant="amber">{r.status}</Badge> },
            ]}
            data={vendor.costHistory}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 7: DOCUMENTS */}
      {activeTab === "documents" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Vendor Supporting Documents & License Validity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {vendor.documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                  <Badge variant={doc.status === "Valid" ? "emerald" : "amber"}>{doc.status}</Badge>
                </div>
                <p className="text-slate-500 font-sans text-xs">{doc.documentNumber}</p>
                <span className="text-[10px] text-slate-400 block">Valid Until: {doc.validUntil}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 8: AUDIT TRAIL */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Vendor Operational Audit Trail
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {vendor.activityHistory.map((act) => (
              <div key={act.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">{act.action}</span>
                  <span className="text-slate-500 font-sans text-xs">{act.details}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">{act.timestamp}</span>
                  <span className="text-blue-600 font-bold">{act.user}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* COST VARIANCE REVIEW MODAL */}
      <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Review Rental Cost Variance">
        {selectedTripCost && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-mono space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-300 block">{selectedTripCost.tripName} ({selectedTripCost.tripCode})</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span>Estimated Rental:</span> <strong>Rp {selectedTripCost.estimatedRentalCost.toLocaleString("id-ID")}</strong></div>
                <div><span>Actual Invoiced:</span> <strong className="text-rose-600">Rp {selectedTripCost.actualRentalCost.toLocaleString("id-ID")}</strong></div>
              </div>
              <span className="text-rose-600 font-extrabold block pt-1">Variance: +Rp {selectedTripCost.varianceRupiah.toLocaleString("id-ID")} (+{selectedTripCost.variancePercent}%)</span>
            </div>

            <FormField label="Review Notes / Variance Justification">
              <Textarea
                placeholder="Reason for cost variance (e.g., additional waiting time, route extension)..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
              />
            </FormField>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => handleApproveCost(false)} className="text-rose-600 border-rose-300">
                Reject Variance
              </Button>
              <Button variant="primary" onClick={() => handleApproveCost(true)}>
                Approve Variance
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
