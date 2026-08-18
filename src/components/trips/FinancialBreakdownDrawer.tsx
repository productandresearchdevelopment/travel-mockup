"use client";

import React from "react";
import { TripProfitabilityRecord } from "@/types/tripProfitability";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { X, DollarSign, ShieldCheck, CheckCircle2, Link as LinkIcon, FileText, ArrowRight } from "lucide-react";

interface FinancialBreakdownDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  record: TripProfitabilityRecord | null;
}

export function FinancialBreakdownDrawer({
  isOpen,
  onClose,
  record,
}: FinancialBreakdownDrawerProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200 font-sans">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#101726] border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col font-sans text-slate-800 dark:text-slate-200 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex items-center justify-between sticky top-0 z-10 font-mono text-xs">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              FINANCIAL AUDIT BREAKDOWN & PROFITABILITY
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {record.tripCode} — {record.tripName}
            </h2>
            <span className="text-xs text-slate-500 block">Total Pax: {record.paxCount} Guests</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 flex-1 font-mono text-xs">
          {/* PROFITABILITY SUMMARY BOX */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL REVENUE</span>
              <strong className="text-lg font-extrabold text-blue-600 block">
                Rp {record.revenue.totalRevenue.toLocaleString("id-ID")}
              </strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">ACTUAL COST</span>
              <strong className="text-lg font-extrabold text-amber-600 block">
                Rp {record.actualCost.totalActualCost.toLocaleString("id-ID")}
              </strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">GROSS PROFIT</span>
              <strong className="text-lg font-extrabold text-emerald-600 block">
                Rp {record.grossProfit.toLocaleString("id-ID")}
              </strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">GROSS MARGIN</span>
              <strong className="text-lg font-extrabold text-emerald-600 block">
                {record.grossMarginPercent}%
              </strong>
            </div>
          </div>

          {/* REVENUE BREAKDOWN */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase block">
              1. ITEMIZED REVENUE BREAKDOWN
            </span>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tour Package Base Revenue:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.revenue.tourPackageRevenue.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transport & Overland Fee:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.revenue.transportRevenue.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hotel Accommodation Revenue:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.revenue.hotelRevenue.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket & Entrance Fees:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.revenue.ticketRevenue.toLocaleString("id-ID")}
                </strong>
              </div>
              {record.revenue.additionalGuestRevenue > 0 && (
                <div className="flex justify-between text-indigo-600 font-bold">
                  <span>Mid-Trip Additional Guests (+4 Pax):</span>
                  <span>+Rp {record.revenue.additionalGuestRevenue.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-extrabold text-sm text-blue-600">
                <span>TOTAL REVENUE:</span>
                <span>Rp {record.revenue.totalRevenue.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* ACTUAL COST BREAKDOWN */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">
              2. ITEMIZED ACTUAL COST BREAKDOWN
            </span>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle Rental (Vendor Cost):</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.actualCost.vehicleCost.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Driver Compensation & Allowances:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.actualCost.driverCost.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hotel Accommodation Cost:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.actualCost.hotelCost.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Train & Transport Tickets:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.actualCost.ticketCost.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tour & Attraction Entrance:</span>
                <strong className="text-slate-900 dark:text-slate-100">
                  Rp {record.actualCost.tourCost.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex justify-between text-amber-600 font-bold">
                <span>Vehicle Replacement Swap Cost:</span>
                <span>+Rp {record.actualCost.additionalVehicleReplacementCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-indigo-600 font-bold">
                <span>Additional 4 Pax Joiner Operational Cost:</span>
                <span>+Rp {record.actualCost.additionalGuestCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-extrabold text-sm text-amber-600">
                <span>TOTAL ACTUAL COST:</span>
                <span>Rp {record.actualCost.totalActualCost.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* PAYMENT TRANSACTIONS & PAYMENT LINK */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              3. PAYMENT TRANSACTIONS & PAYMENT LINK
            </span>

            <div className="space-y-2">
              {record.transactions.map((tx) => (
                <div key={tx.id} className="p-2.5 rounded bg-slate-50 dark:bg-[#162034] border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{tx.guestName}</span>
                    <span className="text-slate-500 text-[10px] block">{tx.paymentMethod} · Ref: {tx.reference} ({tx.paymentDate})</span>
                  </div>
                  <strong className="text-emerald-600 font-extrabold text-sm">
                    Rp {tx.amount.toLocaleString("id-ID")}
                  </strong>
                </div>
              ))}
            </div>

            {record.paymentLink && (
              <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5" /> Outstanding Payment Link
                  </span>
                  <span className="text-slate-500 text-[11px] block">Expiry: {record.paymentLink.expiryDate}</span>
                </div>
                <strong className="text-blue-600 font-bold">
                  Rp {record.paymentLink.amount.toLocaleString("id-ID")}
                </strong>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Drawer
          </Button>
        </div>
      </div>
    </div>
  );
}
