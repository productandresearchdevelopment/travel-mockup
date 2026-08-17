"use client";

import React from "react";
import { X, Truck, User, MapPin, Gauge, Fuel, ShieldCheck, Wrench, Calendar, Clock } from "lucide-react";

interface FleetVehicleDetailDrawerProps {
  vehicle: any | null;
  onClose: () => void;
}

export const FleetVehicleDetailDrawer: React.FC<FleetVehicleDetailDrawerProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-[#101726] border-l border-[#E2E8F0] dark:border-[#1E293B] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                  {vehicle.plateNumber}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    vehicle.status === "Available"
                      ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                      : vehicle.status === "On Trip" || vehicle.status === "Assigned"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                      : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
                {vehicle.name} ({vehicle.type})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Vehicle Key Parameters (Fuel, Mileage, Capacity, Location) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Fuel Level</span>
              <div className="font-mono font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5 text-sm">
                <Fuel className="w-4 h-4 text-amber-500" />
                <span>{vehicle.fuel}%</span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Odometer Mileage</span>
              <div className="font-mono font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5 text-sm">
                <Gauge className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <span>{vehicle.mileage ? vehicle.mileage.toLocaleString("id-ID") : "45,280"} KM</span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Passenger Capacity</span>
              <div className="font-mono font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5 text-sm">
                <Truck className="w-4 h-4 text-purple-500" />
                <span>{vehicle.capacity} Seats</span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Maintenance Status</span>
              <div className="font-bold text-[#16A34A] dark:text-[#4ADE80] text-xs flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>{vehicle.maintenanceStatus || "OK"}</span>
              </div>
            </div>
          </div>

          {/* Current Assignment & Location */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] block">
              Current Assignment & Location
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Current Location:</span>
                <span className="font-bold text-[#0F172A] dark:text-white">{vehicle.currentLocation}</span>
              </div>
              <div>
                <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Assigned Driver:</span>
                <span className="font-bold text-[#2563EB] dark:text-[#60A5FA]">{vehicle.driver}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Active Excursion Tour:</span>
                <span className="font-bold text-[#0F172A] dark:text-white">{vehicle.currentTour}</span>
              </div>
            </div>
          </div>

          {/* Checklist & Safety Inspection */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" /> Daily Pre-Deployment Checklist Status
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[#475569] dark:text-[#94A3B8]">Last Inspection: {vehicle.lastChecklist}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
                PASSED (9/9 Categories)
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};
