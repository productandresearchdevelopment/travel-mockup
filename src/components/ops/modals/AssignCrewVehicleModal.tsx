"use client";

import React, { useState } from "react";
import { Tour, Vehicle, Crew } from "@/types/travelOps";
import { X, Truck, Users, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

interface AssignCrewVehicleModalProps {
  isOpen: boolean;
  tour: Tour | null;
  vehicles: Vehicle[];
  crews: Crew[];
  onClose: () => void;
  onSubmitAssignment: (tourId: string, data: {
    vehicleId?: string;
    driverId?: string;
    tourManagerId?: string;
    guideId?: string;
    assistGuideId?: string;
  }) => void;
}

export const AssignCrewVehicleModal: React.FC<AssignCrewVehicleModalProps> = ({
  isOpen,
  tour,
  vehicles,
  crews,
  onClose,
  onSubmitAssignment,
}) => {
  if (!isOpen || !tour) return null;

  const [vehicleId, setVehicleId] = useState(tour.vehicleId || "");
  const [driverId, setDriverId] = useState(tour.driverId || "");
  const [tourManagerId, setTourManagerId] = useState(tour.tourManagerId || "");
  const [guideId, setGuideId] = useState(tour.guideId || "");
  const [assistGuideId, setAssistGuideId] = useState(tour.assistGuideId || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAssignment(tour.id, {
      vehicleId: vehicleId || undefined,
      driverId: driverId || undefined,
      tourManagerId: tourManagerId || undefined,
      guideId: guideId || undefined,
      assistGuideId: assistGuideId || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-fade-in font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {tour.id}
            </span>
            <h3 className="font-bold text-base text-white mt-1">Assign Operational Resources</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tour Header Summary */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
          <div className="font-bold text-slate-200">{tour.tourName}</div>
          <div className="text-slate-400 font-mono mt-0.5">
            Date: {tour.date} | Route: {tour.origin} → {tour.dropOff} | Pax: {tour.pax}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* VEHICLE ASSIGNMENT */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-400" /> Operational Vehicle (Availability Enforced)
            </label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="">-- No Vehicle Assigned --</option>
              {vehicles.map((v) => {
                const isCurrent = v.id === tour.vehicleId;
                const isAvailable = v.status === "Available" || isCurrent;
                return (
                  <option
                    key={v.id}
                    value={v.id}
                    disabled={!isAvailable}
                    className={!isAvailable ? "text-slate-600 bg-slate-900" : "text-slate-100"}
                  >
                    {v.plateNumber} - {v.brand} {v.model} (Cap: {v.capacity} Pax) - Status: [{v.status}]
                    {!isAvailable ? " (UNAVAILABLE - LOCKED)" : " (AVAILABLE)"}
                  </option>
                );
              })}
            </select>
          </div>

          {/* DRIVER & TOUR MANAGER */}
          <div className="grid grid-cols-2 gap-3">
            {/* DRIVER */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" /> Driver
              </label>
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="">-- Unassigned --</option>
                {crews
                  .filter((c) => c.role === "Driver")
                  .map((c) => {
                    const isCurrent = c.id === tour.driverId;
                    const isAvailable = c.status === "Available" || isCurrent;
                    return (
                      <option
                        key={c.id}
                        value={c.id}
                        disabled={!isAvailable}
                        className={!isAvailable ? "text-slate-600 bg-slate-900" : "text-slate-100"}
                      >
                        {c.name} ({c.homeBase}) - [{c.status}] {!isAvailable ? " (LOCKED)" : " (AVAILABLE)"}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* TOUR MANAGER */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Tour Manager (TM)
              </label>
              <select
                value={tourManagerId}
                onChange={(e) => setTourManagerId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="">-- Unassigned --</option>
                {crews
                  .filter((c) => c.role === "Tour Manager")
                  .map((c) => {
                    const isCurrent = c.id === tour.tourManagerId;
                    const isAvailable = c.status === "Available" || isCurrent;
                    return (
                      <option
                        key={c.id}
                        value={c.id}
                        disabled={!isAvailable}
                        className={!isAvailable ? "text-slate-600 bg-slate-900" : "text-slate-100"}
                      >
                        {c.name} ({c.homeBase}) - [{c.status}] {!isAvailable ? " (LOCKED)" : " (AVAILABLE)"}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          {/* LOCAL GUIDE & ASSIST GUIDE */}
          <div className="grid grid-cols-2 gap-3">
            {/* LOCAL GUIDE */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Local Guide
              </label>
              <select
                value={guideId}
                onChange={(e) => setGuideId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="">-- Unassigned --</option>
                {crews
                  .filter((c) => c.role === "Local Guide")
                  .map((c) => {
                    const isCurrent = c.id === tour.guideId;
                    const isAvailable = c.status === "Available" || isCurrent;
                    return (
                      <option
                        key={c.id}
                        value={c.id}
                        disabled={!isAvailable}
                        className={!isAvailable ? "text-slate-600 bg-slate-900" : "text-slate-100"}
                      >
                        {c.name} ({c.homeBase}) - [{c.status}] {!isAvailable ? " (LOCKED)" : " (AVAILABLE)"}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* ASSIST GUIDE */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> Assist Guide
              </label>
              <select
                value={assistGuideId}
                onChange={(e) => setAssistGuideId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="">-- None --</option>
                {crews.map((c) => {
                  const isCurrent = c.id === tour.assistGuideId;
                  const isAvailable = c.status === "Available" || isCurrent;
                  return (
                    <option
                      key={c.id}
                      value={c.id}
                      disabled={!isAvailable}
                      className={!isAvailable ? "text-slate-600 bg-slate-900" : "text-slate-100"}
                    >
                      {c.name} ({c.role}) - [{c.status}] {!isAvailable ? " (LOCKED)" : " (AVAILABLE)"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Validation Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg text-[11px] text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Strict Operational Rule: Resources marked as [Assigned] or [On Trip] are locked and cannot be double-booked.</span>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg font-bold shadow cursor-pointer"
            >
              Confirm Resource Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
