"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  initialTours,
  initialExpenses,
  initialBopRecords,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import {
  DollarSign,
  MapPin,
} from "lucide-react";

export default function BusinessManagerDashboardPage() {
  const router = useRouter();

  const [tours] = useState(initialTours);
  const [bopRecords] = useState(initialBopRecords);

  const pendingApprovalsCount = bopRecords.filter((b) => b.status === "Submitted").length;
  const handoversInRegion = tours.filter((t) => t.handoverDetails && t.handoverDetails.status !== "Confirmed").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 text-[11px] font-bold uppercase tracking-wider">
                Regional Management Control
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/dashboard/business-manager</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              Business Manager Workspace — East Java Corridor
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
              Focus: Monitor margin performance, regional ferry handovers, and approve field BOP disbursals.
            </p>
          </div>
        </div>

        {/* TOP MANAGEMENT ATTENTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Regional Revenue (Aug 2026)</span>
            <div className="text-2xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">Rp 485,000,000</div>
            <span className="text-[10px] text-[#16A34A] dark:text-[#32D583] font-medium">70.6% Net Operating Margin</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Pending BOP Approvals</span>
            <div className="text-2xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{pendingApprovalsCount} Approvals</div>
            <button
              onClick={() => router.push("/finance/bop")}
              className="text-[10px] text-[#D97706] dark:text-[#FDB022] font-bold hover:underline cursor-pointer"
            >
              Review Field Allowances →
            </button>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Ketapang Handover Queue</span>
            <div className="text-2xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{handoversInRegion} Handovers</div>
            <button
              onClick={() => router.push("/operations?status=Handover")}
              className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF] font-bold hover:underline cursor-pointer"
            >
              Monitor Regional Handovers →
            </button>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">On-Time Departure Rate</span>
            <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">96.2%</div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">Target: 95%+</span>
          </div>
        </div>

        {/* REGIONAL HANDOVER & BOP APPROVALS LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* BOP APPROVAL QUEUE */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#16A34A] dark:text-[#32D583]" /> Pending BOP Disbursal Approvals
              </h3>
              <button
                onClick={() => router.push("/finance/bop")}
                className="text-xs text-[#16A34A] dark:text-[#32D583] font-bold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {bopRecords.map((bop) => (
                <div key={bop.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[#2563EB] dark:text-[#4F8CFF] font-bold">{bop.tourId}</div>
                    <div className="font-bold text-[#172033] dark:text-white">{bop.tourName}</div>
                    <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Date: {bop.date}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-mono font-bold text-[#16A34A] dark:text-[#32D583]">Rp {bop.requestedAmount.toLocaleString("id-ID")}</div>
                    <button
                      onClick={() => router.push("/finance/bop")}
                      className="bg-[#16A34A] dark:bg-[#32D583] hover:brightness-105 text-white dark:text-[#080D14] text-[10px] px-2.5 py-1 rounded-lg font-bold cursor-pointer"
                    >
                      Approve BOP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KETAPANG INTER-REGION HANDOVER MONITOR */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Ketapang Ferry Handover Supervision
              </h3>
              <button
                onClick={() => router.push("/operations")}
                className="text-xs text-[#2563EB] dark:text-[#4F8CFF] font-bold hover:underline cursor-pointer"
              >
                View All Operations
              </button>
            </div>

            <div className="space-y-3">
              {tours.map((t) => (
                <div key={t.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#2563EB] dark:text-[#4F8CFF] font-bold">{t.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#4F8CFF] border border-blue-200 dark:border-blue-800/50">
                      {t.status}
                    </span>
                  </div>
                  <div className="font-bold text-[#172033] dark:text-white">{t.tourName}</div>
                  <div className="text-[#667085] dark:text-[#A7B1C0] font-mono text-[11px]">Handover Hub: {t.handoverLocation || "Ketapang Ferry Port"}</div>
                  <button
                    onClick={() => router.push(`/operations/${t.id}`)}
                    className="w-full bg-white dark:bg-[#101822] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] text-[#172033] dark:text-[#F8FAFC] text-xs py-1.5 rounded-lg font-bold cursor-pointer border border-[#E4E7EC] dark:border-[#202B38]"
                  >
                    Supervise Handover Detail
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
