"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  mockVehicleRentalCostData,
  mockOwnerCostSummaryData,
} from "@/data/mockVendorRentalCostData";
import { VehicleRentalCostRecord } from "@/types/vendorRentalCost";
import { VendorComparisonModal } from "./VendorComparisonModal";
import { EditRentalCostModal } from "./EditRentalCostModal";
import {
  DollarSign,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  FileText,
  Truck,
  Building2,
  Phone,
  History,
} from "lucide-react";

interface VendorRentalCostCardProps {
  tripId: string;
  userRole?: string; // e.g. "Finance", "Dispatcher", "Owner"
}

export function VendorRentalCostCard({ tripId, userRole = "Finance" }: VendorRentalCostCardProps) {
  const [records, setRecords] = useState<VehicleRentalCostRecord[]>(mockVehicleRentalCostData);
  const [showFinancials, setShowFinancials] = useState<boolean>(true);

  const [selectedRecord, setSelectedRecord] = useState<VehicleRentalCostRecord | null>(records[0]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  const ownerSummary = mockOwnerCostSummaryData;

  // Selected Record
  const activeRecord = selectedRecord || records[0];

  // Submit vendor quote selection
  const handleSelectVendorQuotation = (quotationId: string, selectionReason: string) => {
    const selectedQuote = activeRecord.quotations.find((q) => q.id === quotationId);
    if (!selectedQuote) return;

    setRecords(
      records.map((r) =>
        r.id === activeRecord.id
          ? {
              ...r,
              vendorName: selectedQuote.vendorName,
              baseRentalRate: selectedQuote.baseRentalRate,
              driverCost: selectedQuote.driverCost,
              estimatedVendorCost: selectedQuote.totalVendorCost,
              actualVendorCost: selectedQuote.totalVendorCost + r.totalAdditionalCost,
              selectedQuotationId: selectedQuote.id,
              priceHistory: [
                {
                  id: `pch-${Date.now().toString().slice(-3)}`,
                  timestamp: `${new Date().toISOString().split("T")[0]} — ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} WIB`,
                  previousCost: r.actualVendorCost,
                  newCost: selectedQuote.totalVendorCost + r.totalAdditionalCost,
                  varianceRupiah: selectedQuote.totalVendorCost + r.totalAdditionalCost - r.actualVendorCost,
                  user: "Deni — Dispatcher",
                  role: "Dispatcher HQ",
                  reason: `Vendor Quotation ${selectedQuote.quotationNumber} selected (${selectionReason})`,
                },
                ...r.priceHistory,
              ],
            }
          : r
      )
    );
  };

  // Submit cost change or additional expense
  const handleSubmitCostChange = (data: {
    newBaseRate: number;
    newDriverCost: number;
    additionalCategory: string;
    additionalAmount: number;
    reason: string;
  }) => {
    const newAdditionalItem =
      data.additionalAmount > 0
        ? {
            id: `ac-${Date.now().toString().slice(-3)}`,
            category: data.additionalCategory as any,
            amount: data.additionalAmount,
            reason: data.reason,
            recordedBy: "Deni — Dispatcher",
            recordedAt: `${new Date().toISOString().split("T")[0]} — ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} WIB`,
          }
        : null;

    const updatedAdditionalCosts = newAdditionalItem
      ? [...activeRecord.additionalCosts, newAdditionalItem]
      : activeRecord.additionalCosts;

    const newTotalAdditional = updatedAdditionalCosts.reduce((acc, c) => acc + c.amount, 0);
    const newActualCost = data.newBaseRate + data.newDriverCost + newTotalAdditional;
    const newVarianceRupiah = newActualCost - activeRecord.estimatedVendorCost;
    const newVariancePercent = Number(((newVarianceRupiah / activeRecord.estimatedVendorCost) * 100).toFixed(2));
    const newMarkupRupiah = activeRecord.sellingPrice - newActualCost;
    const newMarginPercent = Number(((newMarkupRupiah / activeRecord.sellingPrice) * 100).toFixed(2));

    const updatedRecord: VehicleRentalCostRecord = {
      ...activeRecord,
      baseRentalRate: data.newBaseRate,
      driverCost: data.newDriverCost,
      additionalCosts: updatedAdditionalCosts,
      totalAdditionalCost: newTotalAdditional,
      actualVendorCost: newActualCost,
      costVarianceRupiah: newVarianceRupiah,
      costVariancePercent: newVariancePercent,
      markupRupiah: newMarkupRupiah,
      marginPercent: newMarginPercent,
      approvalRequired: newVariancePercent > 20,
      priceHistory: [
        {
          id: `pch-${Date.now().toString().slice(-3)}`,
          timestamp: `${new Date().toISOString().split("T")[0]} — ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} WIB`,
          previousCost: activeRecord.actualVendorCost,
          newCost: newActualCost,
          varianceRupiah: newVarianceRupiah,
          user: "Deni — Dispatcher",
          role: "Dispatcher HQ",
          reason: data.reason,
        },
        ...activeRecord.priceHistory,
      ],
    };

    setRecords(records.map((r) => (r.id === activeRecord.id ? updatedRecord : r)));
    setSelectedRecord(updatedRecord);
  };

  return (
    <div className="space-y-5 font-sans text-slate-800 dark:text-slate-200">
      {/* OWNER / FINANCE FINANCIAL SEPARATION SUMMARY BAR */}
      <Card className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-slate-800 text-white space-y-4 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                VENDOR COST & FINANCIAL MARKUP CONTROL
              </h2>
              <span className="text-xs text-slate-400">
                Source of Truth Vendor Cost vs. Customer Selling Price Separation
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFinancials(!showFinancials)}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              {showFinancials ? <EyeOff className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
              {showFinancials ? "Hide Financials" : "Show Financials"}
            </button>
            <Badge variant="violet">Role: {userRole}</Badge>
          </div>
        </div>

        {/* FINANCIAL SUMMARY METRICS */}
        {showFinancials ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL VENDOR COST</span>
              <strong className="text-xl font-extrabold text-white">
                Rp {ownerSummary.totalVendorCost.toLocaleString("id-ID")}
              </strong>
              <span className="text-slate-400 text-[10px] block">Source of Truth Cost</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-blue-900/60 bg-blue-950/20 space-y-0.5">
              <span className="text-[10px] text-blue-400 font-bold block uppercase">CUSTOMER SELLING PRICE</span>
              <strong className="text-xl font-extrabold text-blue-400">
                Rp {ownerSummary.totalSellingPrice.toLocaleString("id-ID")}
              </strong>
              <span className="text-slate-400 text-[10px] block">Internal Billing</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-purple-900/60 bg-purple-950/20 space-y-0.5">
              <span className="text-[10px] text-purple-400 font-bold block uppercase">OPERATIONAL MARKUP</span>
              <strong className="text-xl font-extrabold text-purple-400">
                Rp {ownerSummary.totalMarkup.toLocaleString("id-ID")}
              </strong>
              <span className="text-slate-400 text-[10px] block">Gross Margin</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-900/60 bg-amber-950/20 space-y-0.5">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">ACTUAL VENDOR COST</span>
              <strong className="text-xl font-extrabold text-amber-400">
                Rp {ownerSummary.totalActualCost.toLocaleString("id-ID")}
              </strong>
              <span className="text-slate-400 text-[10px] block">Includes Overtime/Fees</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-900/60 bg-emerald-950/20 space-y-0.5">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">MARGIN PERCENTAGE</span>
              <strong className="text-xl font-extrabold text-emerald-400">
                {ownerSummary.totalMarginPercent}%
              </strong>
              <span className="text-emerald-400 text-[10px] block font-bold">✓ Target Margin Met</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold">
              <Lock className="w-4 h-4 text-amber-400" /> Financial details hidden for role: Dispatcher.
            </span>
            <span className="text-[11px] underline cursor-pointer" onClick={() => setShowFinancials(true)}>
              Click to unlock
            </span>
          </div>
        )}
      </Card>

      {/* RENTAL VEHICLE COST BREAKDOWN CARD */}
      {records.map((rec) => (
        <Card
          key={rec.id}
          className="p-6 space-y-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-xs"
        >
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm block">
                  {rec.vendorName} ({rec.vendorCode})
                </span>
                <span className="text-slate-500 text-[11px] block">
                  Vehicle: {rec.vehicleName} ({rec.vehiclePlate}) · Period: {rec.rentalPeriod}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={rec.vehicleSource === "Vendor Rental" ? "violet" : "blue"}>
                {rec.vehicleSource === "Vendor Rental" ? "🏢 Vendor Rental" : "🚌 Company Owned"}
              </Badge>
              {rec.costVarianceRupiah > 0 && (
                <Badge variant="amber">⚠️ Variance +Rp {rec.costVarianceRupiah.toLocaleString("id-ID")}</Badge>
              )}
            </div>
          </div>

          {/* FINANCIAL SEPARATION COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* VENDOR COST BREAKDOWN */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                1. ORIGINAL VENDOR COST
              </span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Rental Rate:</span>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Rp {rec.baseRentalRate.toLocaleString("id-ID")} / Day
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Driver Cost:</span>
                  <strong className="text-slate-900 dark:text-slate-100">
                    {rec.driverIncluded ? "Included" : `Rp ${rec.driverCost.toLocaleString("id-ID")}`}
                  </strong>
                </div>
                {rec.totalAdditionalCost > 0 && (
                  <div className="flex justify-between text-amber-600 font-bold">
                    <span>Additional Expenses:</span>
                    <span>+Rp {rec.totalAdditionalCost.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
                  <span>Total Vendor Cost:</span>
                  <span>Rp {rec.actualVendorCost.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* SELLING PRICE & MARKUP */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block uppercase">
                2. SELLING PRICE & MARKUP
              </span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selling Price:</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
                    Rp {rec.sellingPrice.toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Markup Amount:</span>
                  <strong className="text-purple-600 dark:text-purple-400">
                    Rp {rec.markupRupiah.toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-slate-500">Margin Percentage:</span>
                  <span className="text-emerald-600">{rec.marginPercent}%</span>
                </div>
              </div>
            </div>

            {/* ESTIMATED VS ACTUAL VARIANCE */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20 space-y-2">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block uppercase">
                3. COST VARIANCE & AUDIT
              </span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Cost:</span>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Rp {rec.estimatedVendorCost.toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Actual Cost:</span>
                  <strong className="text-amber-600 font-bold">
                    Rp {rec.actualVendorCost.toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-slate-500">Variance:</span>
                  <span className={rec.costVarianceRupiah > 0 ? "text-amber-600" : "text-emerald-600"}>
                    {rec.costVarianceRupiah > 0 ? `+Rp ${rec.costVarianceRupiah.toLocaleString("id-ID")} (+${rec.costVariancePercent}%)` : "✓ On Budget"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ADDITIONAL EXPENSES LOG LIST */}
          {rec.additionalCosts.length > 0 && (
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1 font-mono text-xs">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">LOGGED ADDITIONAL EXPENSES</span>
              {rec.additionalCosts.map((ac) => (
                <div key={ac.id} className="flex justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    • {ac.category}: {ac.reason} ({ac.recordedBy})
                  </span>
                  <span className="text-amber-600 font-bold">+Rp {ac.amount.toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedRecord(rec);
                  setIsCompareModalOpen(true);
                }}
                className="text-xs font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-900/60 dark:hover:bg-indigo-950/40"
              >
                <Building2 className="w-3.5 h-3.5 mr-1.5" /> Compare Vendor Quotations
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedRecord(rec);
                  setIsEditModalOpen(true);
                }}
                className="text-xs font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-900/60 dark:hover:bg-indigo-950/40"
              >
                <DollarSign className="w-3.5 h-3.5 mr-1.5" /> Edit Rate / Log Expense
              </Button>
            </div>

            <button
              onClick={() => setShowAuditTrail(!showAuditTrail)}
              className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 font-bold underline"
            >
              <History className="w-3.5 h-3.5" /> Price Change History ({rec.priceHistory.length})
            </button>
          </div>

          {/* FRAUD AUDIT TRAIL LOG LIST */}
          {showAuditTrail && rec.priceHistory.length > 0 && (
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2 font-mono text-xs animate-in fade-in">
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> IMMUTABLE PRICE AUDIT LOG (FRAUD PREVENTION)
              </span>
              {rec.priceHistory.map((ph) => (
                <div key={ph.id} className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px]">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>{ph.user} ({ph.role})</span>
                    <span>{ph.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Change: Rp {ph.previousCost.toLocaleString("id-ID")} → Rp {ph.newCost.toLocaleString("id-ID")}</span>
                    <span className="text-amber-600 font-bold">Variance: +Rp {ph.varianceRupiah.toLocaleString("id-ID")}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] block font-sans italic">Reason: {ph.reason}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      {/* MODALS */}
      <VendorComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        quotations={activeRecord.quotations}
        selectedQuotationId={activeRecord.selectedQuotationId}
        onSelectVendorQuotation={handleSelectVendorQuotation}
      />

      <EditRentalCostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        record={activeRecord}
        onSubmitCostChange={handleSubmitCostChange}
      />
    </div>
  );
}
