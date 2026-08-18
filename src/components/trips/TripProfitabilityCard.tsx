"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TripProfitabilityRecord } from "@/types/tripProfitability";
import { mockTripProfitabilityRecordData } from "@/data/mockTripProfitabilityData";
import { FinancialBreakdownDrawer } from "./FinancialBreakdownDrawer";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Wallet,
  Clock,
  ArrowRight,
} from "lucide-react";

interface TripProfitabilityCardProps {
  record?: TripProfitabilityRecord;
}

export function TripProfitabilityCard({
  record = mockTripProfitabilityRecordData,
}: TripProfitabilityCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const estimatedProfit = record.revenue.totalRevenue - record.estimatedCost;
  const estimatedMargin = Number(((estimatedProfit / record.revenue.totalRevenue) * 100).toFixed(2));
  const profitVariance = record.grossProfit - estimatedProfit;

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-200">
      {/* EXECUTIVE FINANCIAL HEALTH CARD */}
      <Card className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-slate-800 text-white space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                TRIP FINANCIAL CONTROL & PROFITABILITY SUMMARY
              </h2>
              <span className="text-xs text-slate-400">
                Connected Revenue, Estimated vs. Actual Cost, Gross Profit & Cash Collection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="emerald">✓ Status: Healthy</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="h-7 text-[11px] font-bold text-white border-slate-700 hover:bg-slate-800"
            >
              <FileText className="w-3.5 h-3.5 mr-1" /> View Breakdown
            </Button>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL REVENUE</span>
            <strong className="text-xl font-extrabold text-blue-400">
              Rp {record.revenue.totalRevenue.toLocaleString("id-ID")}
            </strong>
            <span className="text-slate-400 text-[10px] block">12 Pax Total</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">ESTIMATED COST</span>
            <strong className="text-xl font-extrabold text-slate-300">
              Rp {record.estimatedCost.toLocaleString("id-ID")}
            </strong>
            <span className="text-slate-400 text-[10px] block">Initial Estimate</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-900/60 bg-amber-950/20 space-y-0.5">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">ACTUAL COST</span>
            <strong className="text-xl font-extrabold text-amber-400">
              Rp {record.actualCost.totalActualCost.toLocaleString("id-ID")}
            </strong>
            <span className="text-slate-400 text-[10px] block">Includes Swap & Mid-Trip</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-900/60 bg-emerald-950/20 space-y-0.5">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block">GROSS PROFIT</span>
            <strong className="text-xl font-extrabold text-emerald-400">
              Rp {record.grossProfit.toLocaleString("id-ID")}
            </strong>
            <span className="text-emerald-400 text-[10px] block font-bold">Margin: {record.grossMarginPercent}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">PAID AMOUNT</span>
            <strong className="text-xl font-extrabold text-emerald-300">
              Rp {record.paidAmount.toLocaleString("id-ID")}
            </strong>
            <span className="text-slate-400 text-[10px] block">2 Transactions</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-rose-900/60 bg-rose-950/20 space-y-0.5">
            <span className="text-[10px] text-rose-400 font-bold uppercase block">OUTSTANDING</span>
            <strong className="text-xl font-extrabold text-rose-400">
              Rp {record.outstandingAmount.toLocaleString("id-ID")}
            </strong>
            <span className="text-rose-400 text-[10px] block font-bold">Partially Paid</span>
          </div>
        </div>

        {/* CASH COLLECTION VS OPERATIONAL SPENDING HEALTH BAR (REQUIREMENT 27) */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold">
              Cash Flow Health: Paid (Rp 9.0M) covers 82.5% of Actual Cost (Rp 10.9M). Outstanding Rp 6.0M link active.
            </span>
          </div>
          <Badge variant="amber">Partially Paid</Badge>
        </div>
      </Card>

      {/* DRAWER */}
      <FinancialBreakdownDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        record={record}
      />
    </div>
  );
}
