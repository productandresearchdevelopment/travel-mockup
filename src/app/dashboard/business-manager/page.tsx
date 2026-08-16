"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
  initialNotifications,
  initialMaintenance,
  initialExpenses,
  initialBopRecords,
} from "@/data/mockData";

import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  MapPin,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function BusinessManagerDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [tours] = useState(initialTours);
  const [expenses] = useState(initialExpenses);
  const [bopRecords] = useState(initialBopRecords);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const pendingApprovalsCount = bopRecords.filter((b) => b.status === "Submitted").length;
  const handoversInRegion = tours.filter((t) => t.handoverDetails && t.handoverDetails.status !== "Confirmed").length;

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
            pendingBop: expenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          {/* Header */}
          <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider">
                  Regional Management Control
                </span>
                <span className="text-xs text-slate-500 font-mono">/dashboard/business-manager</span>
              </div>
              <h1 className="text-xl font-extrabold dark:text-white text-slate-900 tracking-tight mt-1">
                Business Manager Workspace — East Java Corridor
              </h1>
              <p className="text-xs dark:text-slate-400 text-slate-600">
                Focus: What requires regional management attention? Monitor margin performance, regional ferry handovers, and approve field BOP disbursals.
              </p>
            </div>
          </div>

          {/* TOP MANAGEMENT ATTENTION CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Regional Revenue (Aug 2026)</span>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">Rp 485,000,000</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">70.6% Net Operating Margin</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Pending BOP Approvals</span>
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{pendingApprovalsCount} Approvals</div>
              <button
                onClick={() => router.push("/finance/bop")}
                className="text-[10px] text-amber-600 dark:text-amber-300 font-bold hover:underline"
              >
                Review Field Allowances →
              </button>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Ketapang Handover Queue</span>
              <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">{handoversInRegion} Handovers</div>
              <button
                onClick={() => router.push("/operations?status=Handover")}
                className="text-[10px] text-cyan-600 dark:text-cyan-300 font-bold hover:underline"
              >
                Monitor Regional Handovers →
              </button>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">On-Time Departure Rate</span>
              <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">96.2%</div>
              <span className="text-[10px] text-purple-600 dark:text-purple-400">Target: 95%+</span>
            </div>
          </div>

          {/* REGIONAL HANDOVER & BOP APPROVALS LIST */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* BOP APPROVAL QUEUE */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-4 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Pending BOP Disbursal Approvals
                </h3>
                <button
                  onClick={() => router.push("/finance/bop")}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {bopRecords.map((bop) => (
                  <div key={bop.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{bop.tourId}</div>
                      <div className="font-bold dark:text-white text-slate-900">{bop.tourName}</div>
                      <div className="text-[10px] text-slate-500">Date: {bop.date}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Rp {bop.requestedAmount.toLocaleString("id-ID")}</div>
                      <button
                        onClick={() => router.push("/finance/bop")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        Approve BOP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KETAPANG INTER-REGION HANDOVER MONITOR */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-4 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500" /> Ketapang Ferry Handover Supervision
                </h3>
                <button
                  onClick={() => router.push("/operations")}
                  className="text-xs text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
                >
                  View All Operations
                </button>
              </div>

              <div className="space-y-3">
                {tours.map((t) => (
                  <div key={t.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{t.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                        {t.status}
                      </span>
                    </div>
                    <div className="font-bold dark:text-white text-slate-900">{t.tourName}</div>
                    <div className="text-slate-500 font-mono text-[11px]">Handover Hub: {t.handoverLocation || "Ketapang Ferry Port"}</div>
                    <button
                      onClick={() => router.push(`/operations/${t.id}`)}
                      className="w-full dark:bg-slate-800 bg-slate-100 dark:hover:bg-slate-700 hover:bg-slate-200 dark:text-slate-200 text-slate-800 text-xs py-1 rounded font-bold cursor-pointer border dark:border-slate-700 border-slate-300"
                    >
                      Supervise Handover Detail
                    </button>
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
