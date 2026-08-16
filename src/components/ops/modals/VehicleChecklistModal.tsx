"use client";

import React, { useState } from "react";
import { Vehicle, ChecklistItemResult } from "@/types/travelOps";
import { X, ClipboardCheck, CheckCircle2, AlertTriangle, XCircle, Truck } from "lucide-react";

interface VehicleChecklistModalProps {
  isOpen: boolean;
  vehicle: Vehicle | null;
  vehicles: Vehicle[];
  onClose: () => void;
  onSubmitChecklist: (data: {
    vehicleId: string;
    inspectorName: string;
    engineStatus: ChecklistItemResult;
    oilStatus: ChecklistItemResult;
    brakeStatus: ChecklistItemResult;
    tireStatus: ChecklistItemResult;
    lightsStatus: ChecklistItemResult;
    acStatus: ChecklistItemResult;
    fuelStatus: ChecklistItemResult;
    cleanlinessStatus: ChecklistItemResult;
    overallResult: "Passed" | "Warning" | "Failed";
    notes?: string;
  }) => void;
}

export const VehicleChecklistModal: React.FC<VehicleChecklistModalProps> = ({
  isOpen,
  vehicle,
  vehicles,
  onClose,
  onSubmitChecklist,
}) => {
  if (!isOpen) return null;

  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicle?.id || vehicles[0]?.id || "");
  const [inspectorName, setInspectorName] = useState("Andi Pratama (Driver)");
  const [engineStatus, setEngineStatus] = useState<ChecklistItemResult>("Passed");
  const [oilStatus, setOilStatus] = useState<ChecklistItemResult>("Passed");
  const [brakeStatus, setBrakeStatus] = useState<ChecklistItemResult>("Passed");
  const [tireStatus, setTireStatus] = useState<ChecklistItemResult>("Passed");
  const [lightsStatus, setLightsStatus] = useState<ChecklistItemResult>("Passed");
  const [acStatus, setAcStatus] = useState<ChecklistItemResult>("Passed");
  const [fuelStatus, setFuelStatus] = useState<ChecklistItemResult>("Passed");
  const [cleanlinessStatus, setCleanlinessStatus] = useState<ChecklistItemResult>("Passed");
  const [notes, setNotes] = useState("");

  const items: { label: string; state: ChecklistItemResult; setState: (val: ChecklistItemResult) => void }[] = [
    { label: "Engine & Mechanical", state: engineStatus, setState: setEngineStatus },
    { label: "Engine Oil Level", state: oilStatus, setState: setOilStatus },
    { label: "Brake System & Fluid", state: brakeStatus, setState: setBrakeStatus },
    { label: "Tire Pressure & Tread", state: tireStatus, setState: setTireStatus },
    { label: "Headlights & Signals", state: lightsStatus, setState: setLightsStatus },
    { label: "Cabin AC Cooling", state: acStatus, setState: setAcStatus },
    { label: "Fuel Tank & Lines", state: fuelStatus, setState: setFuelStatus },
    { label: "Cabin Cleanliness & Sanitization", state: cleanlinessStatus, setState: setCleanlinessStatus },
  ];

  // Calculate overall result
  const hasFailed = items.some((i) => i.state === "Failed");
  const hasWarning = items.some((i) => i.state === "Warning");
  const overallResult: "Passed" | "Warning" | "Failed" = hasFailed ? "Failed" : hasWarning ? "Warning" : "Passed";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitChecklist({
      vehicleId: selectedVehicleId,
      inspectorName,
      engineStatus,
      oilStatus,
      brakeStatus,
      tireStatus,
      lightsStatus,
      acStatus,
      fuelStatus,
      cleanlinessStatus,
      overallResult,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-fade-in text-xs font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Log Vehicle Operational Checklist</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Vehicle</label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none font-medium"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.plateNumber} - {v.brand} {v.model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Inspector / Driver Name</label>
              <input
                type="text"
                required
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Checklist Items Table */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              Pre-Trip Operational Safety Inspection Items
            </span>

            <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-850">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-none">
                  <span className="font-medium text-slate-200">{item.label}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => item.setState("Passed")}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        item.state === "Passed"
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      Passed
                    </button>
                    <button
                      type="button"
                      onClick={() => item.setState("Warning")}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        item.state === "Warning"
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      Warning
                    </button>
                    <button
                      type="button"
                      onClick={() => item.setState("Failed")}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        item.state === "Failed"
                          ? "bg-red-500 text-white"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      Failed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overall computed status */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="font-semibold text-slate-300">Overall Calculated Result:</span>
            <span
              className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded border ${
                overallResult === "Passed"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : overallResult === "Warning"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
              }`}
            >
              RESULT: {overallResult.toUpperCase()}
            </span>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Inspector Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Brake fluid topped up, tires checked."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
            />
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold shadow cursor-pointer"
            >
              Submit Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
