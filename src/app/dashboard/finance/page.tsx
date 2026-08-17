"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/ops/AppLayout";
import { FinanceBopDetailDrawer } from "@/components/ops/drawers/FinanceBopDetailDrawer";

// Static Data Files
import bopData from "@/data/bop.json";
import reimbursementsData from "@/data/reimbursements.json";
import expensesData from "@/data/expenses.json";
import paymentsData from "@/data/payments.json";
import financialSummaryData from "@/data/financial-summary.json";

import {
  DollarSign,
  CreditCard,
  PieChart,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  Compass,
} from "lucide-react";

export default function FinanceAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "bop" | "reimbursement" | "expenses" | "settlement" | "reports"
  >("overview");

  const [selectedBop, setSelectedBop] = useState<any | null>(null);
  const [bopList, setBopList] = useState(bopData);

  const handleUpdateBop = (updated: any) => {
    setBopList((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  return (
    <AppLayout>
      <div className="space-y-8 font-sans">
        {/* ================================================== */}
        {/* PAGE HEADER */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-[11px] font-bold uppercase tracking-wider">
                Finance & Operational Admin
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">/dashboard/finance</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">
              Field Operational Finance & Disbursements
            </h1>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
              Supervise BOP field allowances, operational reimbursements, expense categorization, and payment settlements.
            </p>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#151E30] p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Finance Overview" },
            { id: "bop", label: "BOP Field Allowances" },
            { id: "reimbursement", label: "Reimbursements" },
            { id: "expenses", label: "Expense Tracking" },
            { id: "settlement", label: "Payment & Settlement" },
            { id: "reports", label: "Financial Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#16A34A] text-white shadow-xs"
                  : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================== */}
        {/* FINANCE OVERVIEW KPI CARDS (6 CARDS) */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Total BOP Requested</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white font-mono">Rp 35.0M</div>
            <span className="text-[10px] text-[#2563EB] font-semibold">Active Tours Today</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Pending BOP</span>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">Rp 15.0M</div>
            <span className="text-[10px] text-amber-600 font-semibold">Under BM Review</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Approved BOP</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#16A34A] dark:text-[#4ADE80] font-mono">Rp 20.0M</div>
            <span className="text-[10px] text-[#16A34A] font-semibold">Cleared Disbursal</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Total Reimbursement</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#2563EB] dark:text-[#60A5FA] font-mono">Rp 1.9M</div>
            <span className="text-[10px] text-[#2563EB] font-semibold">Fuel & Toll Claims</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Pending Reimbursement</span>
            <div className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">Rp 850K</div>
            <span className="text-[10px] text-purple-600 font-semibold">Awaiting Verification</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Total Settled (Paid)</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#16A34A] dark:text-[#4ADE80] font-mono">Rp 8.15M</div>
            <span className="text-[10px] text-[#16A34A] font-semibold">Bank Transfer Completed</span>
          </div>
        </div>

        {/* ================================================== */}
        {/* TAB 1: BOP MANAGEMENT SECTION */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "bop") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80]" /> BOP Field Allowance Request Register
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Request ID</th>
                    <th className="py-2.5 px-3">Tour Excursion</th>
                    <th className="py-2.5 px-3">Requester</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Purpose Summary</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {bopList.map((bop) => (
                    <tr
                      key={bop.id}
                      onClick={() => setSelectedBop(bop)}
                      className="saas-table-row cursor-pointer"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-[#16A34A] dark:text-[#4ADE80]">{bop.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white max-w-[180px] truncate">{bop.tour}</td>
                      <td className="py-3 px-3 font-medium text-[#0F172A] dark:text-white">{bop.requester}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{bop.date}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#16A34A] dark:text-[#4ADE80]">
                        Rp {bop.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] max-w-[200px] truncate">{bop.purpose}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            bop.status === "Paid" || bop.status === "Approved"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : bop.status === "Rejected"
                              ? "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                              : "bg-[#FFFBEB] text-[#B45309] border-amber-200"
                          }`}
                        >
                          {bop.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBop(bop);
                          }}
                          className="px-2.5 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-[11px] font-bold cursor-pointer"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 2: REIMBURSEMENTS */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "reimbursement") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Employee Operational Reimbursements
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Reimbursement ID</th>
                    <th className="py-2.5 px-3">Tour Excursion</th>
                    <th className="py-2.5 px-3">Employee</th>
                    <th className="py-2.5 px-3">Expense Category</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {reimbursementsData.map((rmb) => (
                    <tr key={rmb.id} className="saas-table-row">
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{rmb.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white max-w-[180px] truncate">{rmb.tour}</td>
                      <td className="py-3 px-3 font-medium text-[#0F172A] dark:text-white">{rmb.employee}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] text-[#0F172A] dark:text-white">
                          {rmb.expenseType}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#16A34A] dark:text-[#4ADE80]">
                        Rp {rmb.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{rmb.date}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            rmb.status === "Paid"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                          }`}
                        >
                          {rmb.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 3: PAYMENT & SETTLEMENT */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "settlement") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Payment Disbursal & Settlement Register
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Payment Ref</th>
                    <th className="py-2.5 px-3">Disbursal Type</th>
                    <th className="py-2.5 px-3">Recipient</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Reference No</th>
                    <th className="py-2.5 px-3">Payment Date</th>
                    <th className="py-2.5 px-3">Financial Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {paymentsData.map((pay) => (
                    <tr key={pay.id} className="saas-table-row">
                      <td className="py-3 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">{pay.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{pay.type}</td>
                      <td className="py-3 px-3 text-[#0F172A] dark:text-white">{pay.recipient}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#16A34A] dark:text-[#4ADE80]">
                        Rp {pay.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{pay.referenceNo}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{pay.paymentDate}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            pay.financialStatus === "Paid"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : "bg-[#FFFBEB] text-[#B45309] border-amber-200"
                          }`}
                        >
                          {pay.financialStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 4: LIGHTWEIGHT FINANCIAL REPORTING */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "reports") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Lightweight Operational Financial Reporting
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EXPENSE BY CATEGORY BREAKDOWN */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
                <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider block">
                  Expense Category Distribution
                </span>

                <div className="space-y-2">
                  {financialSummaryData.expenseByCategory.map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[#0F172A] dark:text-white">{cat.category}</span>
                        <span className="font-mono font-bold text-[#16A34A]">Rp {cat.amount.toLocaleString("id-ID")} ({cat.percentage}%)</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] dark:bg-[#1E293B] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#16A34A] h-full rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MONTHLY EXPENSE TREND */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
                <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider block">
                  Monthly Disbursal Trend
                </span>

                <div className="space-y-2">
                  {financialSummaryData.monthlyExpenseTrend.map((m, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#101726] p-3 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] flex justify-between items-center text-xs">
                      <span className="font-bold text-[#0F172A] dark:text-white">{m.month}</span>
                      <div className="text-right font-mono">
                        <div className="font-bold text-[#16A34A]">BOP: Rp {m.bop.toLocaleString("id-ID")}</div>
                        <div className="text-[#2563EB]">Reimbursement: Rp {m.reimbursement.toLocaleString("id-ID")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DRAWERS */}
      <FinanceBopDetailDrawer
        bop={selectedBop}
        onClose={() => setSelectedBop(null)}
        onUpdateBop={handleUpdateBop}
      />
    </AppLayout>
  );
}
