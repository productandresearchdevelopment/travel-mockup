"use client";

import React, { useState } from "react";
import { Vehicle, Tour, Crew, VehicleLog, Maintenance, VehicleChecklist, VehicleRepairAssignment, ActivityHistoryItem } from "@/types/travelOps";
import { useAuth } from "@/context/AuthContext";
import { canPerformAction } from "@/data/actionRules";
import {
  ArrowLeft,
  CheckCircle2,
  Truck,
  Wrench,
  Gauge,
  Fuel,
  Calendar,
  AlertTriangle,
  History,
  ShieldCheck,
} from "lucide-react";

interface VehicleDetailFullViewProps {
  vehicle: Vehicle;
  tours?: Tour[];
  crews?: Crew[];
  logs?: VehicleLog[];
  maintenance?: Maintenance[];
  checklists?: VehicleChecklist[];
  repairs?: VehicleRepairAssignment[];
  onBack: () => void;
  onOpenChecklistModal: (vehicleId: string) => void;
  onOpenRepairModal?: (vehicleId: string) => void;
  onOpenMaintenanceModal?: () => void;
}

export const VehicleDetailFullView: React.FC<VehicleDetailFullViewProps> = ({
  vehicle: initialVehicle,
  onBack,
  onOpenChecklistModal,
  onOpenRepairModal,
}) => {
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const initialHistory: ActivityHistoryItem[] = vehicle.activityHistory || [
    {
      id: "ACT-201",
      type: "available",
      title: "Pre-trip Safety Checklist Passed",
      description: "Inspected by Dimas Saputra. All 8 safety items passed.",
      userId: "USR-004",
      timestamp: "2026-08-16 06:30",
    },
    {
      id: "ACT-202",
      type: "assigned",
      title: "Assigned to Bromo Sunrise Excursion",
      description: "Assigned to tour TR-260814-001 with Driver Andi Pratama.",
      userId: "USR-003",
      timestamp: "2026-08-16 07:15",
    },
  ];

  const [history, setHistory] = useState<ActivityHistoryItem[]>(initialHistory);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateVehicleStatus = (newStatus: any, statusLabel: string, actionTitle: string) => {
    const updated: Vehicle = {
      ...vehicle,
      status: newStatus,
      statusLabel,
    };
    setVehicle(updated);

    const newActivity: ActivityHistoryItem = {
      id: `ACT-${Date.now()}`,
      type: newStatus.toLowerCase(),
      title: actionTitle,
      description: `Vehicle status changed to '${statusLabel}' by ${user?.name || "Fleet Officer"}`,
      userId: user?.id || "USR-004",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setHistory([newActivity, ...history]);
    showToast(`Success: Vehicle ${vehicle.plateNumber} updated to '${statusLabel}'`);
  };

  const canChecklist = canPerformAction(user?.role, "vehicle.checklist");
  const canSendMaintenance = canPerformAction(user?.role, "vehicle.sendToMaintenance");
  const canCompleteMaintenance = canPerformAction(user?.role, "vehicle.completeMaintenance");
  const canMarkReady = canPerformAction(user?.role, "vehicle.markReady");

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Vehicle List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  {vehicle.plateNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    vehicle.status === "Available"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : vehicle.status === "On Trip"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                  }`}
                >
                  ● {vehicle.statusLabel || vehicle.status}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-white mt-1">
                {vehicle.brand} {vehicle.model} ({vehicle.year}) — {vehicle.ownership} Fleet
              </h1>
            </div>
          </div>

          {/* Role Guarded Actions */}
          <div className="flex items-center gap-2 text-xs">
            {canChecklist && (
              <button
                onClick={() => {
                  onOpenChecklistModal(vehicle.id);
                  handleUpdateVehicleStatus("Available", "Checklist Passed & Available", "Pre-Trip Checklist Completed");
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg font-bold shadow cursor-pointer transition-colors"
              >
                Log Safety Checklist
              </button>
            )}

            {canSendMaintenance && vehicle.status !== "Maintenance" && (
              <button
                onClick={() => handleUpdateVehicleStatus("Maintenance", "In Workshop Maintenance", "Sent to Workshop Repair")}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-lg font-bold cursor-pointer"
              >
                Send to Maintenance
              </button>
            )}

            {canMarkReady && (
              <button
                onClick={() => handleUpdateVehicleStatus("Available", "Available for Dispatch", "Marked Ready")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-lg font-bold cursor-pointer"
              >
                Mark Ready
              </button>
            )}
          </div>
        </div>
      </div>

      {/* METRICS & STATUS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block text-[10px]">Odometer Reading</span>
          <span className="font-mono font-bold text-slate-100 text-sm">{vehicle.odometer.toLocaleString("id-ID")} KM</span>
          <span className="text-[10px] text-slate-400 block">Garaged at: {vehicle.currentLocation}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Fuel Tank Level</span>
          <span className="font-mono font-bold text-amber-300 text-sm">{vehicle.fuelLevel}%</span>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-amber-400 h-full" style={{ width: `${vehicle.fuelLevel}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Seating Capacity</span>
          <span className="font-mono font-bold text-cyan-400 text-sm">{vehicle.capacity} Passengers</span>
          <span className="text-[10px] text-slate-400 block">Ownership: {vehicle.ownership}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Last Safety Inspection</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{vehicle.lastChecklist}</span>
          <span className="text-[10px] text-emerald-400 font-semibold block">{vehicle.maintenanceStatus}</span>
        </div>
      </div>

      {/* ACTIVITY TIMELINE SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-lg text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" /> Vehicle Logbook & Inspection Timeline
        </h2>

        <div className="space-y-3 pl-2 border-l-2 border-slate-800 ml-2">
          {history.map((act) => (
            <div key={act.id} className="relative pl-6 space-y-1">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{act.title}</span>
                <span className="font-mono text-slate-400 text-[10px]">{act.timestamp}</span>
              </div>
              <p className="text-slate-400 italic text-[11px]">{act.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
