"use client";

import React, { useState } from "react";
import { Tour, FinanceExpense, TourBopRecord, FinanceCategory } from "@/types/travelOps";
import {
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  CreditCard,
  TrendingUp,
  Search,
  Filter,
  Eye,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface FinanceBopViewProps {
  bopRecords: TourBopRecord[];
  expenses: FinanceExpense[];
  tours: Tour[];
  onSelectTourCostDetail: (tourId: string) => void;
}

export const FinanceBopView: React.FC<FinanceBopViewProps> = ({
  bopRecords,
  expenses,
  tours,
  onSelectTourCostDetail,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"bop" | "reimbursement" | "expenses" | "reconciliation">("bop");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // TOP KPI COMPUTATIONS (6 CARDS)
  const todayOpsCost = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingBopCount = bopRecords.filter((b) => b.status === "Submitted").length;
  const pendingReimbursementsCount = expenses.filter((e) => e.category === "Reimbursement" && e.status === "Submitted").length;
  const pendingPaymentCount = expenses.filter((e) => e.paymentStatus === "Pending").length;
  const approvedCount = expenses.filter((e) => e.status === "Approved").length;
  const reconciledCount = bopRecords.filter((b) => b.reconciliationStatus === "Reconciled").length;

  const reimbursements = expenses.filter((e) => e.category === "Reimbursement" || e.category === "Other");

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider">
              Field Travel Finance Control
            </span>
            <span className="text-xs text-slate-400 font-mono">/finance</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Travel Operational Finance & BOP Reconciliations
          </h1>
          <p className="text-xs text-slate-400">
            Dedicated operational finance module for field advances (BOP), guide/driver reimbursements, Multi-transfer tracking, and tour category cost breakdowns.
          </p>
        </div>
      </div>

      {/* TOP KPI CARDS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Today's Ops Cost</span>
          <div className="text-xl font-extrabold text-emerald-400 font-mono">
            Rp {todayOpsCost.toLocaleString("id-ID")}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">Field Disbursed</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Pending BOP</span>
          <div className="text-xl font-extrabold text-amber-400 font-mono">{pendingBopCount} Tours</div>
          <span className="text-[10px] text-amber-400 font-medium">Approval Required</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Pending Reimbursement</span>
          <div className="text-xl font-extrabold text-purple-400 font-mono">{pendingReimbursementsCount} Claims</div>
          <span className="text-[10px] text-purple-400 font-medium">Field Staff Claims</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Pending Payment</span>
          <div className="text-xl font-extrabold text-cyan-400 font-mono">{pendingPaymentCount} Items</div>
          <span className="text-[10px] text-cyan-400 font-medium">Bank Transfer Queue</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Approved</span>
          <div className="text-xl font-extrabold text-blue-400 font-mono">{approvedCount} Claims</div>
          <span className="text-[10px] text-blue-400 font-medium">Ready for Disbursal</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Reconciled</span>
          <div className="text-xl font-extrabold text-slate-300 font-mono">{reconciledCount} Tours</div>
          <span className="text-[10px] text-slate-500">Post-Tour Settled</span>
        </div>
      </div>

      {/* SUB-TABS CONTROL */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveSubTab("bop")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "bop" ? "bg-emerald-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            BOP Field Allowance ({bopRecords.length})
          </button>
          <button
            onClick={() => setActiveSubTab("reimbursement")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "reimbursement" ? "bg-emerald-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Field Reimbursements ({reimbursements.length})
          </button>
          <button
            onClick={() => setActiveSubTab("expenses")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "expenses" ? "bg-emerald-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Operational Costs ({expenses.length})
          </button>
          <button
            onClick={() => setActiveSubTab("reconciliation")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "reconciliation" ? "bg-emerald-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Multi-Transfer Reconciliation
          </button>
        </div>

        {activeSubTab === "expenses" && (
          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Ticket">Ticket</option>
              <option value="Jeep">Jeep</option>
              <option value="Guide">Guide</option>
              <option value="Assist Guide">Assist Guide</option>
              <option value="Hotel">Hotel</option>
              <option value="Train">Train</option>
              <option value="Ferry">Ferry</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>

      {/* SUB-TAB 1: BOP FIELD ALLOWANCE TABLE */}
      {activeSubTab === "bop" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Tour ID & Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Requested Amount</th>
                <th className="p-3">Approved Amount</th>
                <th className="p-3">Used Amount</th>
                <th className="p-3">Remaining Balance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {bopRecords.map((bop) => (
                <tr
                  key={bop.id}
                  className="ops-table-row hover:bg-slate-850/60 transition-colors cursor-pointer"
                  onClick={() => onSelectTourCostDetail(bop.tourId)}
                >
                  <td className="p-3">
                    <div className="font-mono text-cyan-400 font-bold">{bop.tourId}</div>
                    <div className="font-bold text-white max-w-[220px] truncate" title={bop.tourName}>
                      {bop.tourName}
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-300 whitespace-nowrap">{bop.date}</td>
                  <td className="p-3 font-mono font-bold text-slate-300">
                    Rp {bop.requestedAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-400">
                    Rp {bop.approvedAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 font-mono text-slate-300">
                    Rp {bop.usedAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 font-mono font-bold text-blue-400">
                    Rp {bop.remainingAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        bop.status === "Paid" || bop.status === "Reconciled"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : bop.status === "Submitted"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {bop.status}
                    </span>
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectTourCostDetail(bop.tourId)}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] px-3 py-1 rounded-lg font-bold shadow transition-colors cursor-pointer"
                    >
                      View Cost Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 2: REIMBURSEMENT TABLE */}
      {activeSubTab === "reimbursement" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Request ID</th>
                <th className="p-3">Tour ID</th>
                <th className="p-3">Requester Staff</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {reimbursements.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-850/60">
                  <td className="p-3 font-mono font-bold text-emerald-400">{exp.id}</td>
                  <td className="p-3 font-mono text-cyan-400">{exp.tourId}</td>
                  <td className="p-3 font-bold text-white">{exp.requesterName}</td>
                  <td className="p-3 text-slate-300">{exp.category}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">
                    Rp {exp.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {exp.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-300">{exp.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 3: OPERATIONAL EXPENSES */}
      {activeSubTab === "expenses" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Date</th>
                <th className="p-3">Tour ID</th>
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {expenses
                .filter((e) => categoryFilter === "ALL" || e.category === categoryFilter)
                .map((e) => (
                  <tr key={e.id} className="hover:bg-slate-850/60 font-mono">
                    <td className="p-3 text-slate-300">{e.submissionDate}</td>
                    <td className="p-3 text-cyan-400 font-bold">{e.tourId}</td>
                    <td className="p-3 font-sans font-bold text-emerald-400">{e.category}</td>
                    <td className="p-3 font-sans text-slate-200">{e.description}</td>
                    <td className="p-3 font-bold text-white">Rp {e.amount.toLocaleString("id-ID")}</td>
                    <td className="p-3 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 4: PAYMENT / TRANSFER RECONCILIATION */}
      {activeSubTab === "reconciliation" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Tour ID</th>
                <th className="p-3">Requested BOP</th>
                <th className="p-3">Transfer 1 (Initial)</th>
                <th className="p-3">Transfer 2 (Follow-up)</th>
                <th className="p-3">Difference / Variance</th>
                <th className="p-3">Reconciliation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {bopRecords.map((bop) => {
                const totalTransferred = bop.transfer1 + bop.transfer2;
                const diff = totalTransferred - bop.approvedAmount;

                return (
                  <tr key={bop.id} className="hover:bg-slate-850/60">
                    <td className="p-3 font-bold text-cyan-400">{bop.tourId}</td>
                    <td className="p-3 text-slate-300">Rp {bop.requestedAmount.toLocaleString("id-ID")}</td>
                    <td className="p-3 text-emerald-400 font-bold">Rp {bop.transfer1.toLocaleString("id-ID")}</td>
                    <td className="p-3 text-blue-400 font-bold">Rp {bop.transfer2.toLocaleString("id-ID")}</td>
                    <td className="p-3 font-bold text-white">
                      {diff === 0 ? "Rp 0 (Exact)" : diff > 0 ? `+Rp ${diff.toLocaleString("id-ID")}` : `-Rp ${Math.abs(diff).toLocaleString("id-ID")}`}
                    </td>
                    <td className="p-3 font-sans">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          bop.reconciliationStatus === "Reconciled"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {bop.reconciliationStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
