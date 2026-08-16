"use client";

import React, { useState } from "react";
import { Tour, Vehicle, Crew } from "@/types/travelOps";
import { X, CheckCircle2 } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-fade-in font-sans text-[#172033] dark:text-[#F8FAFC]">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF] bg-[#EFF8FF] dark:bg-[rgba(83,177,253,0.12)] px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/40">
              {tour.id}
            </span>
            <h3 className="font-bold text-base text-[#172033] dark:text-white mt-1">Assign Operational Resources</h3>
          </div>
          <button onClick={onClose} className="text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Select Vehicle (Hiace / 4x4 Jeep)</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            >
              <option value="">-- No Vehicle Assigned --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plateNumber} - {v.brand} {v.model} ({v.ownership})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Select Driver</label>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            >
              <option value="">-- No Driver Assigned --</option>
              {crews.filter((c) => c.role === "Driver").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.homeBase}) - {c.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Select Local Guide</label>
            <select
              value={guideId}
              onChange={(e) => setGuideId(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            >
              <option value="">-- No Local Guide Assigned --</option>
              {crews.filter((c) => c.role === "Local Guide").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.homeBase}) - {c.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Select Tour Manager</label>
            <select
              value={tourManagerId}
              onChange={(e) => setTourManagerId(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            >
              <option value="">-- No Tour Manager Assigned --</option>
              {crews.filter((c) => c.role === "Tour Manager").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.homeBase}) - {c.status}
                </option>
              ))}
            </select>
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
              Save Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
