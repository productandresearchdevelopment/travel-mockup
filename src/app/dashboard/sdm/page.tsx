"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  initialCrews,
  initialTours,
  initialAttendances,
  initialFieldReports,
  initialNotifications,
  initialBookings,
  initialMaintenance,
  initialExpenses,
} from "@/data/mockData";

import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";
import {
  Users,
  UserCheck,
  Clock,
  FileText,
  Star,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function SdmDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [crews] = useState(initialCrews);
  const [tours] = useState(initialTours);
  const [attendances] = useState(initialAttendances);
  const [fieldReports] = useState(initialFieldReports);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const availableDrivers = crews.filter((c) => c.role === "Driver" && c.status === "Available");
  const availableGuides = crews.filter((c) => c.role === "Local Guide" && c.status === "Available");
  const availableTMs = crews.filter((c) => c.role === "Tour Manager" && c.status === "Available");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        <SidebarNav
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          {/* Header */}
          <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[11px] font-bold uppercase tracking-wider">
                  SDM & Crew Operations Workspace
                </span>
                <span className="text-xs text-slate-500 font-mono">/dashboard/sdm</span>
              </div>
              <h1 className="text-xl font-extrabold dark:text-white text-slate-900 tracking-tight mt-1">
                SDM / Crew Management Command — Sari Lestari
              </h1>
              <p className="text-xs dark:text-slate-400 text-slate-600">
                Focus: Do we have enough crew and who is available? Manage drivers, local guides, and tour managers for East Java excursions.
              </p>
            </div>

            <button
              onClick={() => router.push("/crew")}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-4 py-2 rounded-xl font-bold shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Manage Crew Roster</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* SDM AVAILABILITY BREAKDOWN CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Available Drivers</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{availableDrivers.length} Available</div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400">Out of {crews.filter((c) => c.role === "Driver").length} Drivers</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Available Local Guides</span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{availableGuides.length} Available</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Out of {crews.filter((c) => c.role === "Local Guide").length} Guides</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Available Tour Managers</span>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{availableTMs.length} Available</div>
              <span className="text-[10px] text-purple-600 dark:text-purple-400">Out of {crews.filter((c) => c.role === "Tour Manager").length} TMs</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Attendance Compliance</span>
              <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">99.4%</div>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400">Check-in Verified</span>
            </div>
          </div>

          {/* CREW ROSTER & FIELD REPORTS QUEUE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* CREW ROSTER QUICK VIEW */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-3 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-500" /> Active Crew Roster Status
                </h3>
                <button onClick={() => router.push("/crew")} className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline">
                  View Full Roster
                </button>
              </div>

              <div className="space-y-2">
                {crews.map((c) => (
                  <div key={c.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold dark:text-white text-slate-900">{c.name} ({c.role})</div>
                      <div className="dark:text-slate-400 text-slate-500 text-[10px]">Base: {c.homeBase} • {c.employmentType}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIELD REPORTS SUBMITTED BY CREW */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-3 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" /> Field Dispatch Reports
                </h3>
                <button onClick={() => router.push("/crew")} className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                  View Reports
                </button>
              </div>

              <div className="space-y-2">
                {fieldReports.map((rep) => (
                  <div key={rep.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 space-y-1">
                    <div className="flex items-center justify-between font-bold dark:text-slate-200 text-slate-800">
                      <span className="text-cyan-600 dark:text-cyan-400">{rep.location}</span>
                      <span className="font-mono text-[10px] text-slate-500">{rep.date}</span>
                    </div>
                    <div className="dark:text-slate-300 text-slate-700 italic">{rep.reportText}</div>
                    <div className="dark:text-slate-400 text-slate-500 text-[10px]">By: {rep.crewName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        notifications={notifications}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      />
    </div>
  );
}
