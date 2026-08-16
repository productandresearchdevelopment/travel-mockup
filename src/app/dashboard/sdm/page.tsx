"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  initialCrews,
  initialFieldReports,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import {
  UserCheck,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function SdmDashboardPage() {
  const router = useRouter();

  const [crews] = useState(initialCrews);
  const [fieldReports] = useState(initialFieldReports);

  const availableDrivers = crews.filter((c) => c.role === "Driver" && c.status === "Available");
  const availableGuides = crews.filter((c) => c.role === "Local Guide" && c.status === "Available");
  const availableTMs = crews.filter((c) => c.role === "Tour Manager" && c.status === "Available");

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 text-[11px] font-bold uppercase tracking-wider">
                SDM & Crew Operations Workspace
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/dashboard/sdm</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              SDM / Crew Management Command — Sari Lestari
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
              Focus: Manage drivers, local guides, and tour managers for East Java excursions.
            </p>
          </div>

          <button
            onClick={() => router.push("/crew")}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white text-xs px-4 py-2 rounded-xl font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Manage Crew Roster</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* SDM AVAILABILITY BREAKDOWN CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Available Drivers</span>
            <div className="text-3xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{availableDrivers.length} Available</div>
            <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF]">Out of {crews.filter((c) => c.role === "Driver").length} Drivers</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Available Local Guides</span>
            <div className="text-3xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{availableGuides.length} Available</div>
            <span className="text-[10px] text-[#16A34A] dark:text-[#32D583]">Out of {crews.filter((c) => c.role === "Local Guide").length} Guides</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Available Tour Managers</span>
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{availableTMs.length} Available</div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">Out of {crews.filter((c) => c.role === "Tour Manager").length} TMs</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Attendance Compliance</span>
            <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">99.4%</div>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400">Check-in Verified</span>
          </div>
        </div>

        {/* CREW ROSTER & FIELD REPORTS QUEUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* CREW ROSTER QUICK VIEW */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-500" /> Active Crew Roster Status
              </h3>
              <button onClick={() => router.push("/crew")} className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer">
                View Full Roster
              </button>
            </div>

            <div className="space-y-2">
              {crews.map((c) => (
                <div key={c.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#172033] dark:text-white">{c.name} ({c.role})</div>
                    <div className="text-[#667085] dark:text-[#A7B1C0] text-[10px]">Base: {c.homeBase} • {c.employmentType}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      c.status === "Available"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50"
                        : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FIELD REPORTS SUBMITTED BY CREW */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#16A34A] dark:text-[#32D583]" /> Field Dispatch Reports
              </h3>
              <button onClick={() => router.push("/crew")} className="text-xs text-[#16A34A] dark:text-[#32D583] font-bold hover:underline cursor-pointer">
                View Reports
              </button>
            </div>

            <div className="space-y-2">
              {fieldReports.map((rep) => (
                <div key={rep.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#172033] dark:text-white">
                    <span className="text-[#2563EB] dark:text-[#4F8CFF]">{rep.location}</span>
                    <span className="font-mono text-[10px] text-[#667085] dark:text-[#A7B1C0]">{rep.date}</span>
                  </div>
                  <div className="text-[#172033] dark:text-[#F8FAFC] italic">{rep.reportText}</div>
                  <div className="text-[#667085] dark:text-[#A7B1C0] text-[10px]">By: {rep.crewName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
