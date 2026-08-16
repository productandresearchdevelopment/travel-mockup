"use client";

import React, { useState } from "react";
import { OperationalReportSummary } from "@/types/travelOps";
import {
  TrendingUp,
  FileSpreadsheet,
  FileText,
  Compass,
  ShoppingBag,
  Truck,
  Users,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

interface ReportsAnalyticsViewProps {
  report: OperationalReportSummary;
}

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({ report }) => {
  const [activeCategory, setActiveCategory] = useState<"operational" | "booking" | "fleet" | "crew" | "financial">("operational");
  const [exportToast, setExportToast] = useState<string | null>(null);

  const handleSimulateExport = (type: "CSV" | "PDF") => {
    setExportToast(`Exporting ${activeCategory.toUpperCase()} Report as ${type}... (File Generated)`);
    setTimeout(() => setExportToast(null), 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <FileSpreadsheet className="w-4 h-4" />
          <span>{exportToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 text-[11px] font-bold uppercase tracking-wider">
              Executive Reporting Center
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/reports</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            QIFESS Travel Operations Analytics & Reporting
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Categorized operational performance reporting covering tour execution, OTA channel volume, fleet utilization, crew availability, and field BOP financial reconciliations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => handleSimulateExport("CSV")}
            className="flex items-center gap-1.5 bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] text-[#172033] dark:text-[#F8FAFC] px-3 py-2 rounded-xl font-bold border border-[#E4E7EC] dark:border-[#202B38] transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#16A34A] dark:text-[#32D583]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleSimulateExport("PDF")}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* REPORT CATEGORY TABS */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E4E7EC] dark:border-[#202B38] pb-3 text-xs">
        {[
          { id: "operational", label: "Operational Performance", icon: <Compass className="w-4 h-4" /> },
          { id: "booking", label: "Booking & Channels", icon: <ShoppingBag className="w-4 h-4" /> },
          { id: "fleet", label: "Fleet Readiness & Logs", icon: <Truck className="w-4 h-4" /> },
          { id: "crew", label: "Crew Utilization", icon: <Users className="w-4 h-4" /> },
          { id: "financial", label: "Financial Reconciliation", icon: <DollarSign className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === tab.id
                ? "bg-[#2563EB] dark:bg-[#4F8CFF] text-white shadow-xs"
                : "bg-white dark:bg-[#101822] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38]"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* METRICS & CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* KPI CARD 1 */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-2 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] font-semibold block">Total Tours Executed</span>
          <div className="text-3xl font-extrabold text-[#172033] dark:text-white font-mono">{report.totalTours}</div>
          <div className="text-xs text-[#16A34A] dark:text-[#32D583] font-bold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> {report.onTimeDepartureRate}% On-Time Departure Rate
          </div>
        </div>

        {/* KPI CARD 2 */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-2 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] font-semibold block">Total Guests (Pax)</span>
          <div className="text-3xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{report.totalPax} Pax</div>
          <div className="text-xs text-[#2563EB] dark:text-[#4F8CFF] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {report.handoverSuccessRate}% Handover Success Rate
          </div>
        </div>

        {/* KPI CARD 3 */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-2 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] font-semibold block">Total Disbursed BOP</span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            Rp {report.totalBopExpenses.toLocaleString("id-ID")}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 100% Reconciled
          </div>
        </div>
      </div>
    </div>
  );
};
