"use client";

import React, { useState } from "react";
import { Vehicle, ChecklistItemResult } from "@/types/travelOps";
import { X, ClipboardCheck } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl animate-fade-in text-xs font-sans text-[#172033] dark:text-[#F8FAFC]">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-[#16A34A] dark:text-[#32D583]" />
            <h3 className="font-bold text-base text-[#172033] dark:text-white">Daily Vehicle Inspection Checklist</h3>
          </div>
          <button onClick={onClose} className="text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Target Vehicle</label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2 text-[#172033] dark:text-[#F8FAFC]"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.plateNumber} - {v.brand} {v.model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Inspector Name</label>
              <input
                type="text"
                required
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2 text-[#172033] dark:text-[#F8FAFC]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#172033] dark:text-white block">Inspection Items</span>
            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-none">
              {items.map((item, idx) => (
                <div key={idx} className="bg-[#F9FAFB] dark:bg-[#131D28] p-2.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between">
                  <span className="font-semibold text-[#172033] dark:text-[#F8FAFC]">{item.label}</span>
                  <div className="flex items-center gap-1">
                    {(["Passed", "Warning", "Failed"] as ChecklistItemResult[]).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => item.setState(val)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                          item.state === val
                            ? val === "Passed"
                              ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200"
                              : val === "Warning"
                              ? "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200"
                              : "bg-[#FEF3F2] text-[#B42318] dark:bg-[rgba(249,112,102,0.12)] dark:text-[#FDA29B] border-rose-200"
                            : "bg-white dark:bg-[#101822] text-[#667085] dark:text-[#A7B1C0] border-[#E4E7EC] dark:border-[#202B38]"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white font-bold cursor-pointer shadow-xs"
            >
              Submit Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
