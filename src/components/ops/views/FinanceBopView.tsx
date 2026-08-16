"use client";

import React, { useState } from "react";
import { Tour, FinanceExpense, TourBopRecord } from "@/types/travelOps";
import {
  DollarSign,
  Eye,
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

  // TOP KPI COMPUTATIONS (6 CARDS)
  const todayOpsCost = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingBopCount = bopRecords.filter((b) => b.status === "Submitted").length;
  const pendingReimbursementsCount = expenses.filter((e) => e.category === "Reimbursement" && e.status === "Submitted").length;
  const pendingPaymentCount = expenses.filter((e) => e.paymentStatus === "Pending").length;
  const approvedCount = expenses.filter((e) => e.status === "Approved").length;
  const reconciledCount = bopRecords.filter((b) => b.reconciliationStatus === "Reconciled").length;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#15803D] dark:text-[#6CE9A6] border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-bold uppercase tracking-wider">
              Field Travel Finance Control
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/finance</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Travel Operational Finance & BOP Reconciliations
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Dedicated operational finance module for field advances (BOP), guide/driver reimbursements, Multi-transfer tracking, and tour category cost breakdowns.
          </p>
        </div>
      </div>

      {/* TOP KPI CARDS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Today's Ops Cost</span>
          <div className="text-xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">
            Rp {todayOpsCost.toLocaleString("id-ID")}
          </div>
          <span className="text-[10px] text-[#16A34A] dark:text-[#32D583] font-medium">Field Disbursed</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pending BOP</span>
          <div className="text-xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{pendingBopCount} Tours</div>
          <span className="text-[10px] text-[#D97706] dark:text-[#FDB022] font-medium">Approval Required</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pending Reimbursement</span>
          <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{pendingReimbursementsCount} Claims</div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Field Staff Claims</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pending Payment</span>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">{pendingPaymentCount} Items</div>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">Bank Transfer Queue</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Approved</span>
          <div className="text-xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{approvedCount} Claims</div>
          <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF] font-medium">Ready for Disbursal</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Reconciled</span>
          <div className="text-xl font-extrabold text-teal-600 dark:text-teal-400 font-mono">{reconciledCount} Records</div>
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">Audit Completed</span>
        </div>
      </div>

      {/* BOP RECORDS TABLE */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#16A34A] dark:text-[#32D583]" /> Tour Operational Budget (BOP) Table
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1 rounded-lg"
            >
              <option value="ALL">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Submitted">Submitted</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Tour Ref</th>
                <th className="py-2.5 px-3">Approved Budget</th>
                <th className="py-2.5 px-3">Used Amount</th>
                <th className="py-2.5 px-3">Remaining</th>
                <th className="py-2.5 px-3">Tour Name</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Reconciliation</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
              {bopRecords.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => onSelectTourCostDetail(b.tourId)}
                  className="saas-table-row cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{b.tourId}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#172033] dark:text-white">
                    Rp {b.approvedAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-3 font-mono text-[#667085] dark:text-[#A7B1C0]">
                    Rp {b.usedAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={b.remainingAmount < 0 ? "text-[#DC2626] font-bold" : "text-[#16A34A] font-bold"}>
                      Rp {b.remainingAmount.toLocaleString("id-ID")}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#172033] dark:text-[#F8FAFC]">{b.tourName}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        b.status === "Approved"
                          ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                          : "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        b.reconciliationStatus === "Reconciled"
                          ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                          : "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                      }`}
                    >
                      {b.reconciliationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTourCostDetail(b.tourId);
                      }}
                      className="p-1 rounded text-[#2563EB] dark:text-[#4F8CFF] hover:bg-[#EEF4FF] dark:hover:bg-[#16263F] font-semibold text-[11px] cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
