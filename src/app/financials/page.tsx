"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Tabs } from "@/components/ui/Tabs";
import {
  mockTripProfitabilityRecordData,
  mockExecutiveOwnerFinancialSummaryData,
} from "@/data/mockTripProfitabilityData";
import { TripProfitabilityRecord } from "@/types/tripProfitability";
import { FinancialBreakdownDrawer } from "@/components/trips/FinancialBreakdownDrawer";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Clock,
  ShieldCheck,
  FileText,
  Building,
  Truck,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

export default function FinancialsOverviewPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTripRecord, setSelectedTripRecord] = useState<TripProfitabilityRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const summary = mockExecutiveOwnerFinancialSummaryData;
  const tripRecord = mockTripProfitabilityRecordData;

  const handleOpenBreakdown = (record: TripProfitabilityRecord) => {
    setSelectedTripRecord(record);
    setIsDrawerOpen(true);
  };

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "trip_revenue", label: "Trip Revenue" },
    { id: "operational_costs", label: "Operational Costs" },
    { id: "payments", label: "Payments" },
    { id: "profitability", label: "Profitability" },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Financials & Profitability Control"
        description="High-level financial summary, revenue tracking, operational costs, payments & profitability drill-down"
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Financials" },
        ]}
      />

      {/* FINANCIALS LANDING PAGE KPI SUMMARY (SECTION 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 font-mono text-xs">
        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            TOTAL REVENUE
          </span>
          <strong className="text-xl font-extrabold text-blue-400 block">
            Rp {summary.totalRevenue.toLocaleString("id-ID")}
          </strong>
          <span className="text-slate-400 text-[10px]">24 Active Trips</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            OPERATIONAL COST
          </span>
          <strong className="text-xl font-extrabold text-amber-600 dark:text-amber-400 block">
            Rp {summary.totalActualCost.toLocaleString("id-ID")}
          </strong>
          <span className="text-slate-500 text-[10px]">Actual Disbursed</span>
        </Card>

        <Card className="p-4 space-y-1 bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
            GROSS PROFIT
          </span>
          <strong className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
            Rp {summary.totalGrossProfit.toLocaleString("id-ID")}
          </strong>
          <span className="text-emerald-600 text-[10px] font-bold">Net Operational Margin</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            GROSS MARGIN
          </span>
          <strong className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
            30.53%
          </strong>
          <span className="text-slate-500 text-[10px]">✓ Target Margin Met</span>
        </Card>

        <Card className="p-4 space-y-1 border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20">
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider block">
            OUTSTANDING
          </span>
          <strong className="text-xl font-extrabold text-purple-600 dark:text-purple-400 block">
            Rp {summary.totalOutstanding.toLocaleString("id-ID")}
          </strong>
          <span className="text-slate-500 text-[10px]">Pending Collection</span>
        </Card>

        <Card className="p-4 space-y-1 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider block">
            COST OVERRUN
          </span>
          <strong className="text-xl font-extrabold text-rose-600 dark:text-rose-400 block">
            Rp {summary.totalCostOverrun.toLocaleString("id-ID")}
          </strong>
          <span className="text-rose-600 text-[10px] font-bold">⚠️ Overrun Flagged</span>
        </Card>
      </div>

      {/* INTERNAL SECONDARY NAVIGATION TABS (SECTION 5) */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB CONTENTS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* TRIP PROFITABILITY TABLE */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Active Deployments Financial Overview
                </h3>
                <p className="text-xs text-slate-500">Connected revenue, actual cost, gross profit & payment status</p>
              </div>
              <Badge variant="emerald">✓ 100% Traceable Financials</Badge>
            </div>

            <DataTable
              columns={[
                {
                  key: "trip",
                  header: "Trip Code & Name",
                  render: (r: TripProfitabilityRecord) => (
                    <div className="space-y-0.5 font-mono text-xs">
                      <Link href={`/dispatch/trips/${r.tripId}`} className="font-extrabold text-slate-900 dark:text-slate-100 hover:text-blue-600 block">
                        {r.tripCode}
                      </Link>
                      <span className="text-slate-500 text-[11px] block">{r.tripName} ({r.paxCount} Pax)</span>
                    </div>
                  ),
                },
                {
                  key: "revenue",
                  header: "Revenue",
                  render: (r: TripProfitabilityRecord) => (
                    <span className="font-mono font-bold text-blue-600 text-xs">
                      Rp {r.revenue.totalRevenue.toLocaleString("id-ID")}
                    </span>
                  ),
                },
                {
                  key: "actualCost",
                  header: "Actual Cost",
                  render: (r: TripProfitabilityRecord) => (
                    <span className="font-mono font-bold text-amber-600 text-xs">
                      Rp {r.actualCost.totalActualCost.toLocaleString("id-ID")}
                    </span>
                  ),
                },
                {
                  key: "grossProfit",
                  header: "Gross Profit",
                  render: (r: TripProfitabilityRecord) => (
                    <span className="font-mono font-extrabold text-emerald-600 text-xs">
                      Rp {r.grossProfit.toLocaleString("id-ID")} ({r.grossMarginPercent}%)
                    </span>
                  ),
                },
                {
                  key: "paid",
                  header: "Paid Amount",
                  render: (r: TripProfitabilityRecord) => (
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 text-xs">
                      Rp {r.paidAmount.toLocaleString("id-ID")}
                    </span>
                  ),
                },
                {
                  key: "outstanding",
                  header: "Outstanding",
                  render: (r: TripProfitabilityRecord) => (
                    <span className="font-mono font-bold text-rose-600 text-xs">
                      Rp {r.outstandingAmount.toLocaleString("id-ID")}
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Financial Status",
                  render: (r: TripProfitabilityRecord) => (
                    <Badge variant={r.financialStatus === "Healthy" ? "emerald" : "amber"}>
                      {r.financialStatus}
                    </Badge>
                  ),
                },
                {
                  key: "actions",
                  header: "Action",
                  render: (r: TripProfitabilityRecord) => (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-[11px] font-bold text-indigo-600 border-indigo-200"
                      onClick={() => handleOpenBreakdown(r)}
                    >
                      Cost Breakdown
                    </Button>
                  ),
                },
              ]}
              data={[tripRecord]}
              keyExtractor={(r) => r.id}
            />
          </Card>

          {/* ITEMIZED COST BREAKDOWN MATRIX (SECTION 7) */}
          <Card className="p-6 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                TRP-2026-00421 Operational Cost Breakdown Matrix
              </h3>
              <Badge variant="violet">Total: Rp 8,900,000</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">VEHICLE RENTAL</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-slate-100 block">Rp 3.200.000</strong>
                <span className="text-slate-500 text-[10px]">PT Maju Transport</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">DRIVER COST</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-slate-100 block">Rp 600.000</strong>
                <span className="text-slate-500 text-[10px]">Agus Santoso (Payroll)</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">HOTEL COST</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-slate-100 block">Rp 2.000.000</strong>
                <span className="text-slate-500 text-[10px]">Hotel Santika</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">TICKET COST</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-slate-100 block">Rp 900.000</strong>
                <span className="text-slate-500 text-[10px]">KAI Train & Ferizy</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">TOUR COST</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-slate-100 block">Rp 1.500.000</strong>
                <span className="text-slate-500 text-[10px]">Bromo & Ijen Trek</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">OTHER COST</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-slate-100 block">Rp 700.000</strong>
                <span className="text-slate-500 text-[10px]">Fuel, Tolls & Parking</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "trip_revenue" && (
        <Card className="p-6 space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Trip Revenue Stream & Booking Contributions
          </h3>
          <p className="text-slate-500">Connected revenue sources from Tour Packages, Transport, Hotels, and Tickets.</p>
        </Card>
      )}

      {activeTab === "operational_costs" && (
        <Card className="p-6 space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Operational Cost Audit & Vendor Disbursements
          </h3>
          <p className="text-slate-500">Real-time operational expenses from Vendor Rentals, Driver Compensation, and Tickets.</p>
        </Card>
      )}

      {activeTab === "payments" && (
        <Card className="p-6 space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Guest Payments, Payment Links & Outstanding Balances
          </h3>
          <p className="text-slate-500">Traceable bank transfers, QRIS receipts, and pending payment links.</p>
        </Card>
      )}

      {activeTab === "profitability" && (
        <Card className="p-6 space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Gross Margin & Profitability Analysis
          </h3>
          <p className="text-slate-500">Trip margin performance, cost overruns, and financial health badges.</p>
        </Card>
      )}

      {/* DRAWER */}
      <FinancialBreakdownDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        record={selectedTripRecord}
      />
    </AppShell>
  );
}
