"use client";

import React, { useState } from "react";
import { Vehicle, MaintenanceType, MaintenancePriority } from "@/types/travelOps";
import { X, Wrench } from "lucide-react";

interface MaintenanceModalProps {
  isOpen: boolean;
  preselectedVehicleId?: string;
  vehicles: Vehicle[];
  onClose: () => void;
  onSubmitMaintenance: (data: {
    vehicleId: string;
    type: MaintenanceType;
    description: string;
    dueDate: string;
    priority: MaintenancePriority;
    assignedWorkshop: string;
    estimatedCost: number;
  }) => void;
}

export const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  isOpen,
  preselectedVehicleId,
  vehicles,
  onClose,
  onSubmitMaintenance,
}) => {
  if (!isOpen) return null;

  const [vehicleId, setVehicleId] = useState(preselectedVehicleId || vehicles[0]?.id || "");
  const [type, setType] = useState<MaintenanceType>("Scheduled Service");
  const [description, setDescription] = useState("Periodic 10,000 KM Engine & Brake Maintenance");
  const [dueDate, setDueDate] = useState("2026-08-18");
  const [priority, setPriority] = useState<MaintenancePriority>("Medium");
  const [assignedWorkshop, setAssignedWorkshop] = useState("Malang Internal Workshop");
  const [estimatedCost, setEstimatedCost] = useState(2500000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitMaintenance({
      vehicleId,
      type,
      description,
      dueDate,
      priority,
      assignedWorkshop,
      estimatedCost: Number(estimatedCost),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-fade-in text-xs font-sans text-[#172033] dark:text-[#F8FAFC]">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#D97706] dark:text-[#FDB022]" />
            <h3 className="font-bold text-base text-[#172033] dark:text-white">Log Vehicle Maintenance Ticket</h3>
          </div>
          <button onClick={onClose} className="text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Target Vehicle</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plateNumber} - {v.brand} {v.model} ({v.currentLocation})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Maintenance Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MaintenanceType)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
              >
                <option value="Scheduled Service">Scheduled Service</option>
                <option value="Unscheduled Repair">Unscheduled Repair</option>
                <option value="Tire Replacement">Tire Replacement</option>
                <option value="Inspection">Safety Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Assigned Workshop / Location</label>
            <input
              type="text"
              required
              value={assignedWorkshop}
              onChange={(e) => setAssignedWorkshop(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            />
          </div>

          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Estimated Cost (IDR)</label>
            <input
              type="number"
              required
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(Number(e.target.value))}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-mono font-bold"
            />
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
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
