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
  const canMarkReady = canPerformAction(user?.role, "vehicle.markReady");

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF] bg-[#EFF8FF] dark:bg-[rgba(83,177,253,0.12)] px-2.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/40">
                {vehicle.plateNumber}
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/fleet/vehicles/{vehicle.id}</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              {vehicle.brand} {vehicle.model}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-xs">
          {canChecklist && (
            <button
              onClick={() => onOpenChecklistModal(vehicle.id)}
              className="flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] dark:bg-[#32D583] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Safety Checklist</span>
            </button>
          )}

          {canSendMaintenance && vehicle.status !== "Maintenance" && (
            <button
              onClick={() => handleUpdateVehicleStatus("Maintenance", "In Workshop", "Sent to Maintenance")}
              className="flex items-center gap-1.5 bg-[#D97706] hover:bg-[#B54708] dark:bg-[#FDB022] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Send to Workshop</span>
            </button>
          )}

          {canMarkReady && vehicle.status === "Maintenance" && (
            <button
              onClick={() => handleUpdateVehicleStatus("Available", "Available", "Marked Ready")}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Available</span>
            </button>
          )}
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* LEFT COLUMN (8 cols): Specifications & Logs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D97706] dark:text-[#FDB022]" /> Vehicle Specifications & Telematics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Ownership</span>
                <span className="font-bold text-xs text-[#172033] dark:text-white">{vehicle.ownership}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Passenger Capacity</span>
                <span className="font-mono font-bold text-xs text-[#2563EB] dark:text-[#4F8CFF]">{vehicle.capacity} Seats</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Current Odometer</span>
                <span className="font-mono font-bold text-xs text-[#172033] dark:text-white">{vehicle.odometer.toLocaleString()} KM</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Fuel Level</span>
                <span className="font-mono font-bold text-xs text-[#16A34A] dark:text-[#32D583]">{vehicle.fuelLevel}%</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Current Location</span>
                <span className="font-bold text-xs text-[#172033] dark:text-white">{vehicle.currentLocation}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Maintenance State</span>
                <span className="font-bold text-xs text-amber-600 dark:text-amber-400">{vehicle.maintenanceStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): History */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Vehicle Telematics Log
            </h3>

            <div className="space-y-3 relative pl-3 border-l-2 border-[#E4E7EC] dark:border-[#202B38] ml-2">
              {history.map((act) => (
                <div key={act.id} className="relative space-y-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#4F8CFF] absolute -left-[17px] top-1"></div>
                  <div className="font-bold text-xs text-[#172033] dark:text-white">{act.title}</div>
                  <div className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">{act.description}</div>
                  <div className="text-[10px] text-[#98A2B3] dark:text-[#667085] font-mono">{act.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
