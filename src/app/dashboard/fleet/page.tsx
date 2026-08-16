"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  initialVehicles,
  initialVehicleLogs,
  initialMaintenance,
  initialChecklists,
  initialRepairs,
  initialNotifications,
  initialBookings,
  initialTours,
  initialExpenses,
} from "@/data/mockData";

import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";
import {
  Truck,
  Wrench,
  Fuel,
  Gauge,
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function FleetDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [vehicles] = useState(initialVehicles);
  const [maintenance] = useState(initialMaintenance);
  const [repairs] = useState(initialRepairs);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const availableVehicles = vehicles.filter((v) => v.status === "Available");
  const onTripVehicles = vehicles.filter((v) => v.status === "On Trip");
  const inWorkshop = vehicles.filter((v) => v.status === "Maintenance" || v.status === "Inspection");

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
            activeTours: initialTours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: maintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          {/* Header */}
          <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-bold uppercase tracking-wider">
                  Fleet Operations Workspace
                </span>
                <span className="text-xs text-slate-500 font-mono">/dashboard/fleet</span>
              </div>
              <h1 className="text-xl font-extrabold dark:text-white text-slate-900 tracking-tight mt-1">
                Fleet & Maintenance Operations Command — Dimas Saputra
              </h1>
              <p className="text-xs dark:text-slate-400 text-slate-600">
                Focus: Are vehicles available, healthy and ready? Track Toyota Hiace, Isuzu ELF & 4x4 Jeeps across East Java garages.
              </p>
            </div>

            <button
              onClick={() => router.push("/fleet")}
              className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-4 py-2 rounded-xl font-bold shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Manage Fleet Roster</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* FLEET METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Available Fleet</span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{availableVehicles.length} Units</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Ready for Dispatch</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">On Trip / En Route</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{onTripVehicles.length} Units</div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400">Java-Bali Overland</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">In Workshop / Repair</span>
              <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{inWorkshop.length} Units</div>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">Service Action Required</span>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Fleet Utilization</span>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">84.5%</div>
              <span className="text-[10px] text-purple-600 dark:text-purple-400">Aug 2026 Average</span>
            </div>
          </div>

          {/* VEHICLE READINESS MATRIX & WORKSHOP TICKETS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* READINESS MATRIX */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-3 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500" /> Vehicle Readiness Matrix
                </h3>
                <button onClick={() => router.push("/fleet/vehicles")} className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">
                  View Full List
                </button>
              </div>

              <div className="space-y-2">
                {vehicles.map((v) => (
                  <div key={v.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-300 mr-2">{v.plateNumber}</span>
                      <span className="font-bold dark:text-white text-slate-900">{v.brand} {v.model}</span>
                      <div className="dark:text-slate-400 text-slate-500 text-[10px]">{v.currentLocation} • Fuel: {v.fuelLevel}%</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        v.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : v.status === "On Trip"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WORKSHOP REPAIR TICKETS */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-3 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-rose-500" /> Active Workshop Repair Tickets
                </h3>
                <button onClick={() => router.push("/fleet/maintenance")} className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline">
                  View Maintenance
                </button>
              </div>

              <div className="space-y-2">
                {repairs.map((r) => (
                  <div key={r.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-amber-600 dark:text-amber-300 font-bold">{r.vehicleId}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                        {r.status}
                      </span>
                    </div>
                    <div className="font-bold text-rose-600 dark:text-rose-400">{r.problem}</div>
                    <div className="dark:text-slate-400 text-slate-500 text-[10px]">Workshop: {r.assignedWorkshop} • Est: {r.estimatedCompletion}</div>
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
