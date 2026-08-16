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
} from "@/data/mockData";

import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";
import {
  Send,
  ShoppingBag,
  Layers,
  Truck,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function DispatcherDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [bookings] = useState(initialBookings);
  const [tours] = useState(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const unassignedBookings = bookings.filter((b) => !b.groupedTourId || b.status === "Pending Review");
  const missingResourceTours = tours.filter((t) => !t.vehicleId || !t.driverId || !t.guideId);

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
            pendingBookings: unassignedBookings.length,
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
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-[11px] font-bold uppercase tracking-wider">
                  Dispatcher Workspace
                </span>
                <span className="text-xs text-slate-500 font-mono">/dashboard/dispatcher</span>
              </div>
              <h1 className="text-xl font-extrabold dark:text-white text-slate-900 tracking-tight mt-1">
                Dispatcher Operations Command — Rina Pratama
              </h1>
              <p className="text-xs dark:text-slate-400 text-slate-600">
                Focus: What needs to be planned and deployed? Group incoming OTA bookings, match available vehicles & crew, and generate operational passenger manifests.
              </p>
            </div>

            <button
              onClick={() => router.push("/dispatch")}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-4 py-2 rounded-xl font-bold shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Open Grouping Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* DISPATCHER FOCUS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Unassigned Booking Inbox</span>
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{unassignedBookings.length} Bookings</div>
              <button onClick={() => router.push("/bookings")} className="text-[10px] text-amber-600 dark:text-amber-300 font-bold hover:underline">
                Review & Group Bookings →
              </button>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Tours Missing Resources</span>
              <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{missingResourceTours.length} Tours</div>
              <button onClick={() => router.push("/dispatch/deployment")} className="text-[10px] text-rose-600 dark:text-rose-400 font-bold hover:underline">
                Assign Vehicle & Crew →
              </button>
            </div>

            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-4 rounded-xl space-y-2 shadow">
              <span className="dark:text-slate-400 text-slate-500">Ready for Departure</span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {tours.filter((t) => t.status === "Ready").length} Tours
              </div>
              <button onClick={() => router.push("/operations")} className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                Monitor Live Excursions →
              </button>
            </div>
          </div>

          {/* UNASSIGNED BOOKINGS & RESOURCE MATCHING QUEUE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* BOOKINGS INBOX */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-3 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-blue-500" /> Incoming Reservations (Needs Batching)
                </h3>
                <button onClick={() => router.push("/bookings")} className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {unassignedBookings.map((b) => (
                  <div key={b.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{b.id}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {b.source}
                      </span>
                    </div>
                    <div className="font-bold dark:text-white text-slate-900">{b.greeting} {b.guestName} ({b.pax} Pax)</div>
                    <div className="dark:text-slate-400 text-slate-600 text-[11px]">{b.product} • {b.origin} → {b.dropOff}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESOURCE MATCHING QUEUE */}
            <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-5 rounded-xl space-y-3 shadow">
              <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2">
                <h3 className="font-bold dark:text-white text-slate-900 text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500" /> Tour Resource Assignment Board
                </h3>
                <button onClick={() => router.push("/dispatch/deployment")} className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">
                  View Board
                </button>
              </div>

              <div className="space-y-2">
                {tours.map((t) => (
                  <div key={t.id} className="dark:bg-slate-950 bg-slate-50 p-3 rounded-lg border dark:border-slate-850 border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{t.id}</div>
                      <div className="font-bold dark:text-white text-slate-900">{t.tourName}</div>
                      <div className="dark:text-slate-400 text-slate-500 text-[10px]">Veh: {t.vehicleId || "MISSING"} | Driver: {t.driverId || "MISSING"}</div>
                    </div>
                    <button
                      onClick={() => router.push("/dispatch/deployment")}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] px-3 py-1 rounded font-bold cursor-pointer"
                    >
                      Assign
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
