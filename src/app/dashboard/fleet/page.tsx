"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  initialVehicles,
  initialRepairs,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import {
  Truck,
  Wrench,
  ArrowRight,
} from "lucide-react";

export default function FleetDashboardPage() {
  const router = useRouter();

  const [vehicles] = useState(initialVehicles);
  const [repairs] = useState(initialRepairs);

  const availableVehicles = vehicles.filter((v) => v.status === "Available");
  const onTripVehicles = vehicles.filter((v) => v.status === "On Trip");
  const inWorkshop = vehicles.filter((v) => v.status === "Maintenance" || v.status === "Inspection");

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-[11px] font-bold uppercase tracking-wider">
                Fleet Operations Workspace
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/dashboard/fleet</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              Fleet & Maintenance Operations Command — Dimas Saputra
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
              Focus: Track Toyota Hiace, Isuzu ELF & 4x4 Jeeps across East Java garages.
            </p>
          </div>

          <button
            onClick={() => router.push("/fleet")}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white text-xs px-4 py-2 rounded-xl font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Manage Fleet Roster</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FLEET METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Available Fleet</span>
            <div className="text-3xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{availableVehicles.length} Units</div>
            <span className="text-[10px] text-[#16A34A] dark:text-[#32D583]">Ready for Dispatch</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">On Trip / En Route</span>
            <div className="text-3xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{onTripVehicles.length} Units</div>
            <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF]">Java-Bali Overland</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">In Workshop / Repair</span>
            <div className="text-3xl font-extrabold text-[#DC2626] dark:text-[#F97066] font-mono">{inWorkshop.length} Units</div>
            <span className="text-[10px] text-[#DC2626] dark:text-[#F97066] font-semibold">Service Action Required</span>
          </div>

          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl space-y-2 shadow-xs">
            <span className="text-[#667085] dark:text-[#A7B1C0]">Fleet Utilization</span>
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">84.5%</div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">Aug 2026 Average</span>
          </div>
        </div>

        {/* VEHICLE READINESS MATRIX & WORKSHOP TICKETS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* READINESS MATRIX */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D97706] dark:text-[#FDB022]" /> Vehicle Readiness Matrix
              </h3>
              <button onClick={() => router.push("/fleet/vehicles")} className="text-xs text-[#D97706] dark:text-[#FDB022] font-bold hover:underline cursor-pointer">
                View Full List
              </button>
            </div>

            <div className="space-y-2">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-[#D97706] dark:text-[#FDB022] mr-2">{v.plateNumber}</span>
                    <span className="font-bold text-[#172033] dark:text-white">{v.brand} {v.model}</span>
                    <div className="text-[#667085] dark:text-[#A7B1C0] text-[10px]">{v.currentLocation} • Fuel: {v.fuelLevel}%</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      v.status === "Available"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50"
                        : v.status === "On Trip"
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                        : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WORKSHOP REPAIR TICKETS */}
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
              <h3 className="font-bold text-[#172033] dark:text-white text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#DC2626] dark:text-[#F97066]" /> Active Workshop Repair Tickets
              </h3>
              <button onClick={() => router.push("/fleet/maintenance")} className="text-xs text-[#DC2626] dark:text-[#F97066] font-bold hover:underline cursor-pointer">
                View Maintenance
              </button>
            </div>

            <div className="space-y-2">
              {repairs.map((r) => (
                <div key={r.id} className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#D97706] dark:text-[#FDB022] font-bold">{r.vehicleId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50">
                      {r.status}
                    </span>
                  </div>
                  <div className="font-bold text-[#DC2626] dark:text-[#F97066]">{r.problem}</div>
                  <div className="text-[#667085] dark:text-[#A7B1C0] text-[10px]">Workshop: {r.assignedWorkshop} • Est: {r.estimatedCompletion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
