"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Truck, Gauge, Fuel, Calendar, Clock, ArrowRight } from "lucide-react";

interface VehicleCheckOutInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLogbook?: (newLog: any) => void;
}

export const VehicleCheckOutInModal: React.FC<VehicleCheckOutInModalProps> = ({
  isOpen,
  onClose,
  onSaveLogbook,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<"checkout" | "checkin">("checkout");

  // Form State
  const [vehicle, setVehicle] = useState("N 7012 AA (Hiace Premio)");
  const [driver, setDriver] = useState("Andi Pratama");
  const [date, setDate] = useState("2026-08-23");
  const [time, setTime] = useState("05:00 WIB");
  const [kmStart, setKmStart] = useState(45120);
  const [kmEnd, setKmEnd] = useState(45280);
  const [fuelStart, setFuelStart] = useState(100);
  const [fuelEnd, setFuelEnd] = useState(78);
  const [destination, setDestination] = useState("Mount Bromo, Probolinggo");
  const [tour, setTour] = useState("TR-260823-001 (Bromo Sunrise VIP)");
  const [notes, setNotes] = useState("Vehicle returned in clean condition. No issues.");

  // Calculated values
  const distanceTraveled = Math.max(0, kmEnd - kmStart);
  const fuelUsedPercent = Math.max(0, fuelStart - fuelEnd);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog = {
      id: `LOG-260823-${Math.floor(100 + Math.random() * 900)}`,
      date,
      vehicle,
      driver,
      kmStart,
      kmEnd,
      distance: distanceTraveled,
      fuelStart,
      fuelEnd,
      fuelUsagePercent: fuelUsedPercent,
      purpose: `${tour} - ${destination}`,
      status: mode === "checkout" ? "In Progress" : "Completed",
    };

    if (onSaveLogbook) onSaveLogbook(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs p-4 animate-fade-in font-sans">
      <div className="w-full max-w-xl bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200">
              Fleet Operations Form
            </span>
            <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
              Vehicle Check-Out & Check-In Log
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-[#F8FAFC] dark:bg-[#151E30] p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]">
          <button
            type="button"
            onClick={() => setMode("checkout")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === "checkout"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#475569] dark:text-[#94A3B8]"
            }`}
          >
            Check-Out (Depot Departure)
          </button>
          <button
            type="button"
            onClick={() => setMode("checkin")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === "checkin"
                ? "bg-[#16A34A] text-white shadow-xs"
                : "text-[#475569] dark:text-[#94A3B8]"
            }`}
          >
            Check-In (Depot Return)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Common Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">Select Vehicle</label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">Assigned Driver</label>
              <input
                type="text"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono font-bold text-[#2563EB]"
              />
            </div>
          </div>

          {/* KM and Fuel Calculation Box */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">KM Start (Odometer)</label>
                <input
                  type="number"
                  value={kmStart}
                  onChange={(e) => setKmStart(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#101726] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 font-mono font-bold text-[#0F172A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">KM End (Odometer)</label>
                <input
                  type="number"
                  value={kmEnd}
                  onChange={(e) => setKmEnd(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#101726] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 font-mono font-bold text-[#0F172A] dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">Fuel Start (%)</label>
                <input
                  type="number"
                  value={fuelStart}
                  onChange={(e) => setFuelStart(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#101726] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 font-mono font-bold text-[#0F172A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[#475569] dark:text-[#94A3B8] font-semibold mb-1">Fuel End (%)</label>
                <input
                  type="number"
                  value={fuelEnd}
                  onChange={(e) => setFuelEnd(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#101726] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3 py-2 font-mono font-bold text-[#0F172A] dark:text-white"
                />
              </div>
            </div>

            {/* Live Calculated Stats */}
            <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between font-mono font-bold text-xs">
              <span className="text-[#2563EB] dark:text-[#60A5FA]">
                Distance Traveled: {distanceTraveled} KM
              </span>
              <span className="text-amber-600 dark:text-amber-400">
                Fuel Consumption: {fuelUsedPercent}%
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#1E293B] font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5 ${
                mode === "checkout" ? "bg-[#2563EB] hover:bg-[#1D4ED8]" : "bg-[#16A34A] hover:bg-[#15803D]"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{mode === "checkout" ? "Submit Departure Check-Out" : "Submit Return Check-In"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
