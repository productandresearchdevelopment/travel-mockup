"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/ops/AppLayout";
import { FleetVehicleDetailDrawer } from "@/components/ops/drawers/FleetVehicleDetailDrawer";
import { VehicleCheckOutInModal } from "@/components/ops/modals/VehicleCheckOutInModal";

// Static Data Files
import vehiclesData from "@/data/vehicles.json";
import vehicleManifestsData from "@/data/vehicle-manifests.json";
import vehicleChecklistsData from "@/data/vehicle-checklists.json";
import vehicleLogbooksData from "@/data/vehicle-logbooks.json";
import repairAssignmentsData from "@/data/repair-assignments.json";
import vehicleMovementsData from "@/data/vehicle-movements.json";
import vehicleRecommendationsData from "@/data/vehicle-recommendations.json";

import {
  Truck,
  Wrench,
  Fuel,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Eye,
  Plus,
  ShieldCheck,
  Navigation,
  Compass,
  ArrowRight,
  Activity,
} from "lucide-react";

export default function FleetOperationsPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "vehicles" | "manifests" | "logbooks" | "checklists" | "repairs" | "livemap"
  >("overview");

  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [logbooksList, setLogbooksList] = useState(vehicleLogbooksData);

  const handleSaveLogbook = (newLog: any) => {
    setLogbooksList([newLog, ...logbooksList]);
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
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 text-[11px] font-bold uppercase tracking-wider">
                Fleet Management Operations
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">/dashboard/fleet</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">
              Fleet Operations & Vehicle Maintenance Hub
            </h1>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
              Supervise vehicle readiness, daily checklists, fuel consumption logbooks, repairs, and live GPS movements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCheckOutModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Check-Out / Check-In Log</span>
            </button>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#151E30] p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Fleet Overview" },
            { id: "vehicles", label: "Vehicle Roster" },
            { id: "manifests", label: "Vehicle Manifests" },
            { id: "logbooks", label: "Fuel & Logbook" },
            { id: "checklists", label: "Pre-Deployment Checklist" },
            { id: "repairs", label: "Repair Tickets" },
            { id: "livemap", label: "Live GPS Movements" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================== */}
        {/* FLEET DASHBOARD KPI CARDS (6 CARDS) */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Total Vehicles</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white font-mono">48</div>
            <span className="text-[10px] text-[#2563EB] font-semibold">Registered Fleet</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Available</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#16A34A] dark:text-[#4ADE80] font-mono">28</div>
            <span className="text-[10px] text-[#16A34A] font-semibold">Ready for Dispatch</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Assigned</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] dark:text-[#60A5FA] font-mono">12</div>
            <span className="text-[10px] text-[#2563EB] font-semibold">Allocated to Tour</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">On Trip</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">12</div>
            <span className="text-[10px] text-cyan-600 font-semibold">En Route Overland</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Maintenance</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B45309] dark:text-[#FBBF24] font-mono">5</div>
            <span className="text-[10px] text-[#B45309] font-semibold">Workshop Repair</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-rose-200 dark:border-rose-900/50 p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Unavailable</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B91C1C] dark:text-[#F87171] font-mono">3</div>
            <span className="text-[10px] text-[#B91C1C] font-semibold">Checklist Failed</span>
          </div>
        </div>

        {/* ================================================== */}
        {/* DAILY VEHICLE RECOMMENDATIONS FOR DISPATCHER */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80]" /> Daily Vehicle Recommendations for Dispatcher
            </h2>
            <span className="text-[11px] font-mono text-[#475569] dark:text-[#94A3B8]">Fleet Engine Advisory</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* RECOMMENDED */}
            <div className="bg-[#F0FDF4] dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-xl space-y-3">
              <span className="font-bold text-xs text-[#15803D] dark:text-[#4ADE80] uppercase tracking-wider block">
                ✓ Recommended Vehicles
              </span>
              <div className="space-y-2">
                {vehicleRecommendationsData[0].vehicles.map((v, vIdx) => (
                  <div key={vIdx} className="bg-white dark:bg-[#101726] p-3 rounded-lg border border-emerald-200/60 text-xs space-y-1">
                    <div className="font-bold text-[#0F172A] dark:text-white">{v.name} ({v.plateNumber})</div>
                    <div className="space-y-0.5">
                      {v.reasons.map((r, rIdx) => (
                        <div key={rIdx} className="text-[11px] text-[#15803D] dark:text-[#4ADE80] font-medium">{r}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NOT RECOMMENDED */}
            <div className="bg-[#FEF2F2] dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 p-4 rounded-xl space-y-3">
              <span className="font-bold text-xs text-[#B91C1C] dark:text-[#F87171] uppercase tracking-wider block">
                ⚠ Not Recommended Vehicles
              </span>
              <div className="space-y-2">
                {vehicleRecommendationsData[1].vehicles.map((v, vIdx) => (
                  <div key={vIdx} className="bg-white dark:bg-[#101726] p-3 rounded-lg border border-rose-200/60 text-xs space-y-1">
                    <div className="font-bold text-[#0F172A] dark:text-white">{v.name} ({v.plateNumber})</div>
                    <div className="space-y-0.5">
                      {v.reasons.map((r, rIdx) => (
                        <div key={rIdx} className="text-[11px] text-[#B91C1C] dark:text-[#F87171] font-medium">{r}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* TAB 1: VEHICLE ROSTER TABLE */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "vehicles") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Active Vehicle Fleet Roster
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Vehicle</th>
                    <th className="py-2.5 px-3">Plate Number</th>
                    <th className="py-2.5 px-3">Type & Capacity</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Current Location</th>
                    <th className="py-2.5 px-3">Driver</th>
                    <th className="py-2.5 px-3">Current Tour</th>
                    <th className="py-2.5 px-3">Fuel</th>
                    <th className="py-2.5 px-3">Last Checklist</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {vehiclesData.map((v) => (
                    <tr
                      key={v.id}
                      onClick={() => setSelectedVehicle(v)}
                      className="saas-table-row cursor-pointer"
                    >
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{v.name}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{v.plateNumber}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{v.type} ({v.capacity} Seats)</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            v.status === "Available"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : v.status === "On Trip" || v.status === "Assigned"
                              ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                              : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{v.currentLocation}</td>
                      <td className="py-3 px-3 text-[#0F172A] dark:text-white">{v.driver}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] max-w-[160px] truncate">{v.currentTour}</td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-600">{v.fuel}%</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] text-[11px]">{v.lastChecklist}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicle(v);
                          }}
                          className="p-1 rounded text-[#2563EB] hover:bg-[#EFF6FF] cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
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
        {/* TAB 2: FUEL & LOGBOOK */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "logbooks") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Fuel className="w-4 h-4 text-amber-500" /> Fuel Consumption & Vehicle Logbook
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Vehicle</th>
                    <th className="py-2.5 px-3">Driver</th>
                    <th className="py-2.5 px-3">KM Start</th>
                    <th className="py-2.5 px-3">KM End</th>
                    <th className="py-2.5 px-3">Distance</th>
                    <th className="py-2.5 px-3">Fuel Consumption</th>
                    <th className="py-2.5 px-3">Purpose</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {logbooksList.map((log) => (
                    <tr key={log.id} className="saas-table-row">
                      <td className="py-3 px-3 font-mono font-bold text-[#0F172A] dark:text-white">{log.date}</td>
                      <td className="py-3 px-3 font-bold text-[#2563EB] dark:text-[#60A5FA]">{log.vehicle}</td>
                      <td className="py-3 px-3 text-[#0F172A] dark:text-white">{log.driver}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{log.kmStart} KM</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{log.kmEnd} KM</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#16A34A] dark:text-[#4ADE80]">{log.distance} KM</td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-600">{log.fuelUsagePercent}% Used</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] max-w-[180px] truncate">{log.purpose}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
                          {log.status}
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
        {/* TAB 3: PRE-DEPLOYMENT CHECKLIST */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "checklists") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80]" /> 9-Category Pre-Deployment Safety Checklist
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicleChecklistsData.map((chk) => (
                <div key={chk.id} className="bg-[#F8FAFC] dark:bg-[#151E30] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2 font-bold">
                    <span className="text-[#0F172A] dark:text-white">{chk.vehicle}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                        chk.overallResult === "READY"
                          ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                          : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                      }`}
                    >
                      {chk.overallResult}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    {Object.entries(chk.categories).map(([cat, res]) => (
                      <div key={cat} className="bg-white dark:bg-[#101726] p-1.5 rounded border border-[#E2E8F0] text-center">
                        <span className="capitalize block text-[9px] text-[#475569] dark:text-[#94A3B8]">{cat}</span>
                        <span className={`font-bold ${res === "Passed" ? "text-[#16A34A]" : res === "Warning" ? "text-amber-600" : "text-[#B91C1C]"}`}>
                          {res as any}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-[#475569] dark:text-[#94A3B8] pt-1">
                    Inspector: {chk.inspector} ({chk.date})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 4: REPAIR ASSIGNMENTS */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "repairs") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-rose-500" /> Workshop Repair Assignments & Tickets
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Ticket ID</th>
                    <th className="py-2.5 px-3">Checklist Issue Description</th>
                    <th className="py-2.5 px-3">Target Vehicle</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Assigned Mechanic</th>
                    <th className="py-2.5 px-3">Created Date</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {repairAssignmentsData.map((rpr) => (
                    <tr key={rpr.id} className="saas-table-row">
                      <td className="py-3 px-3 font-mono font-bold text-rose-600">{rpr.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{rpr.issue}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-[#2563EB] dark:text-[#60A5FA]">{rpr.vehicle}</td>
                      <td className="py-3 px-3">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                          rpr.priority === "High" ? "bg-rose-600 text-white" : "bg-amber-600 text-white"
                        }`}>
                          {rpr.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#0F172A] dark:text-white">{rpr.assignedTo}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{rpr.created}</td>
                      <td className="py-3 px-3 font-mono text-[#475569] dark:text-[#94A3B8]">{rpr.dueDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-amber-200">
                          {rpr.status}
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
        {/* TAB 5: LIVE VEHICLE MOVEMENT GPS MAP MOCKUP */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "livemap") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Live Vehicle Movement GPS Radar
              </h2>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Mock GPS Live Stream
              </span>
            </div>

            {/* Static Interactive Mock Map Container */}
            <div className="bg-[#0B111A] text-white p-6 rounded-2xl border border-[#1E293B] relative min-h-[320px] flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
                  OVERLAND CORRIDOR MOCK GPS RADAR
                </span>
                <span className="text-slate-400 text-[10px]">Active Tracking: 4 Vehicles</span>
              </div>

              {/* Mock Map Markers Grid */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                {vehicleMovementsData.map((gps) => (
                  <div key={gps.id} className="bg-[#101726]/90 border border-[#1E293B] p-4 rounded-xl space-y-2 hover:border-[#2563EB] transition-all backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                      <span className="font-mono font-bold text-[#60A5FA]">{gps.plateNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {gps.speed}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white">{gps.vehicle}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Location: {gps.currentLocation}</div>
                    <div className="text-[10px] text-slate-400">Driver: {gps.driver}</div>
                    <div className="text-[9px] text-slate-500 font-mono pt-1">Updated: {gps.lastUpdate}</div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Coordinates: -7.9254 S, 112.9515 E</span>
                <span>Signal Status: 100% Online</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DRAWERS & MODALS */}
      <FleetVehicleDetailDrawer
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />

      <VehicleCheckOutInModal
        isOpen={isCheckOutModalOpen}
        onClose={() => setIsCheckOutModalOpen(false)}
        onSaveLogbook={handleSaveLogbook}
      />
    </AppLayout>
  );
}
