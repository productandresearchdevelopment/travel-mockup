"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  initialBookings,
  initialTours,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import {
  ShoppingBag,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function DispatcherDashboardPage() {
  const router = useRouter();

  const [bookings] = useState(initialBookings);
  const [tours] = useState(initialTours);

  const unassignedBookings = bookings.filter((b) => !b.groupedTourId || b.status === "Pending Review");
  const missingResourceTours = tours.filter((t) => !t.vehicleId || !t.driverId || !t.guideId);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#4F8CFF] border border-blue-200 dark:border-blue-800/50 text-[11px] font-bold uppercase tracking-wider">
                Dispatcher Workspace
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/dashboard/dispatcher</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              Dispatcher Operations Command — Rina Pratama
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
              Focus: Group incoming OTA bookings, match available vehicles & crew, and generate operational passenger manifests.
            </p>
          </div>

          <button
            onClick={() => router.push("/dispatch")}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white text-xs px-4 py-2 rounded-xl font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Open Grouping Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* DISPATCHER FOCUS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Unassigned Booking Inbox</span>
            <div className="text-3xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{unassignedBookings.length} Bookings</div>
            <button onClick={() => router.push("/bookings")} className="text-[10px] text-[#D97706] dark:text-[#FDB022] font-bold hover:underline cursor-pointer">
              Review & Group Bookings →
            </button>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Tours Missing Resources</span>
            <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{missingResourceTours.length} Tours</div>
            <button onClick={() => router.push("/dispatch/deployment")} className="text-[10px] text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer">
              Assign Vehicle & Crew →
            </button>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Ready for Departure</span>
            <div className="text-3xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">
              {tours.filter((t) => t.status === "Ready").length} Tours
            </div>
            <button onClick={() => router.push("/operations")} className="text-[10px] text-[#16A34A] dark:text-[#32D583] font-bold hover:underline cursor-pointer">
              Monitor Live Excursions →
            </button>
          </div>
        </div>

        {/* UNASSIGNED BOOKINGS & RESOURCE MATCHING QUEUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* BOOKINGS INBOX */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Incoming Reservations (Needs Batching)
              </h3>
              <button onClick={() => router.push("/bookings")} className="text-xs text-[#2563EB] dark:text-[#4F8CFF] font-bold hover:underline cursor-pointer">
                View All
              </button>
            </div>

            <div className="space-y-2">
              {unassignedBookings.map((b) => (
                <div key={b.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                  <div className="flex justify-between">
                    <span className="font-mono text-[#2563EB] dark:text-[#4F8CFF] font-bold">{b.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                      {b.source}
                    </span>
                  </div>
                  <div className="font-bold text-[#172033] dark:text-white">{b.greeting} {b.guestName} ({b.pax} Pax)</div>
                  <div className="text-[#667085] dark:text-[#A7B1C0] text-[11px]">{b.product} • {b.origin} → {b.dropOff}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RESOURCE MATCHING QUEUE */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D97706] dark:text-[#FDB022]" /> Tour Resource Assignment Board
              </h3>
              <button onClick={() => router.push("/dispatch/deployment")} className="text-xs text-[#D97706] dark:text-[#FDB022] font-bold hover:underline cursor-pointer">
                View Board
              </button>
            </div>

            <div className="space-y-2">
              {tours.map((t) => (
                <div key={t.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[#2563EB] dark:text-[#4F8CFF] font-bold">{t.id}</div>
                    <div className="font-bold text-[#172033] dark:text-white">{t.tourName}</div>
                    <div className="text-[#667085] dark:text-[#A7B1C0] text-[10px]">Veh: {t.vehicleId || "MISSING"} | Driver: {t.driverId || "MISSING"}</div>
                  </div>
                  <button
                    onClick={() => router.push("/dispatch/deployment")}
                    className="bg-[#2563EB] dark:bg-[#4F8CFF] hover:brightness-105 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold cursor-pointer"
                  >
                    Assign
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
