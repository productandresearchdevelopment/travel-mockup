"use client";

import React, { useState } from "react";
import { Vehicle, MaintenanceType, MaintenancePriority } from "@/types/travelOps";
import { X, Wrench, CheckCircle2 } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-fade-in text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">Log Vehicle Maintenance Ticket</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Vehicle</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none focus:border-amber-500 font-medium"
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
              <label className="block font-semibold text-slate-300 mb-1">Service Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MaintenanceType)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="Scheduled Service">Scheduled Service</option>
                <option value="Emergency Repair">Emergency Repair</option>
                <option value="Tire Replacement">Tire Replacement</option>
                <option value="Brake Inspection">Brake Inspection</option>
                <option value="AC Maintenance">AC Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Service Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Due Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Est. Cost (IDR)</label>
              <input
                type="number"
                required
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Assigned Workshop</label>
            <input
              type="text"
              required
              value={assignedWorkshop}
              onChange={(e) => setAssignedWorkshop(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-lg font-bold shadow"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
