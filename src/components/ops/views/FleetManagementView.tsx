"use client";

import React, { useState } from "react";
import { Vehicle, VehicleLog, Maintenance, VehicleChecklist, VehicleRepairAssignment } from "@/types/travelOps";
import {
  Truck,
  Wrench,
  ClipboardCheck,
  Eye,
  MapPin,
} from "lucide-react";

interface FleetManagementViewProps {
  vehicles: Vehicle[];
  logs: VehicleLog[];
  maintenance: Maintenance[];
  checklists: VehicleChecklist[];
  repairs: VehicleRepairAssignment[];
  onOpenChecklistModal: (vehicleId?: string) => void;
  onOpenMaintenanceModal: (vehicleId?: string) => void;
  onSelectVehicleDetail: (vehicleId: string) => void;
}

export const FleetManagementView: React.FC<FleetManagementViewProps> = ({
  vehicles,
  logs,
  maintenance,
  checklists,
  repairs,
  onOpenChecklistModal,
  onOpenMaintenanceModal,
  onSelectVehicleDetail,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"vehicles" | "utilization" | "logbook" | "maintenance" | "repairs">("vehicles");
  const [ownershipFilter, setOwnershipFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // TOP KPI COMPUTATIONS (7 CARDS)
  const totalFleet = vehicles.length;
  const availableCount = vehicles.filter((v) => v.status === "Available").length;
  const assignedCount = vehicles.filter((v) => v.status === "Assigned").length;
  const onTripCount = vehicles.filter((v) => v.status === "On Trip").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "Maintenance").length;
  const inspectionCount = vehicles.filter((v) => v.status === "Inspection").length;
  const unavailableCount = vehicles.filter((v) => v.status === "Unavailable").length;

  const filteredVehicles = vehicles.filter((v) => {
    if (ownershipFilter !== "ALL" && v.ownership !== ownershipFilter) return false;
    if (statusFilter !== "ALL" && v.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchPlate = v.plateNumber.toLowerCase().includes(q);
      const matchModel = v.model.toLowerCase().includes(q);
      const matchLoc = v.currentLocation.toLowerCase().includes(q);
      if (!matchPlate && !matchModel && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#B54708] dark:text-[#FEC84B] border border-amber-200 dark:border-amber-800/50 text-[11px] font-bold uppercase tracking-wider">
              Fleet Operations Control
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/fleet</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Enterprise Fleet & Maintenance Management
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Real-time management of company, rental, and partner vehicles (Hiace, ELF, 4x4 Jeeps). Monitor odometer readings, fuel logs, daily checklists, and workshop repair assignments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenChecklistModal()}
            className="flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] dark:bg-[#32D583] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Complete Checklist</span>
          </button>
          <button
            onClick={() => onOpenMaintenanceModal()}
            className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B54708] dark:bg-[#FDB022] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Wrench className="w-4 h-4" />
            <span>Schedule Maintenance</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS (7 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3 text-xs">
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Total Fleet</span>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{totalFleet}</div>
          <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Managed Vehicles</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Available</span>
          <div className="text-2xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{availableCount}</div>
          <span className="text-[10px] text-[#16A34A] dark:text-[#32D583] font-medium">Ready for Dispatch</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Assigned</span>
          <div className="text-2xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">{assignedCount}</div>
          <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF]">Booked for Tour</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">On Trip</span>
          <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">{onTripCount}</div>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">En Route Java-Bali</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Workshop</span>
          <div className="text-2xl font-extrabold text-[#DC2626] dark:text-[#F97066] font-mono">{maintenanceCount}</div>
          <span className="text-[10px] text-[#DC2626] dark:text-[#F97066]">Service / Repair</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Inspection</span>
          <div className="text-2xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{inspectionCount}</div>
          <span className="text-[10px] text-[#D97706] dark:text-[#FDB022]">Checklist Due</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-3.5 rounded-xl space-y-1 shadow-xs">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Unavailable</span>
          <div className="text-2xl font-extrabold text-[#667085] dark:text-[#A7B1C0] font-mono">{unavailableCount}</div>
          <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">Out of Service</span>
        </div>
      </div>

      {/* NAVIGATION SUB-TABS & FILTERS */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: "vehicles", label: "Fleet Roster (" + totalFleet + ")" },
              { id: "utilization", label: "Fleet Utilization" },
              { id: "logbook", label: "Fuel & Odometer Logs (" + logs.length + ")" },
              { id: "maintenance", label: "Maintenance Schedules (" + maintenance.length + ")" },
              { id: "repairs", label: "Repair Tickets (" + repairs.length + ")" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeSubTab === tab.id
                    ? "bg-[#2563EB] dark:bg-[#4F8CFF] text-white shadow-xs"
                    : "bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={ownershipFilter}
              onChange={(e) => setOwnershipFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-2.5 py-1 rounded-lg"
            >
              <option value="ALL">All Ownerships</option>
              <option value="Company">Company Owned</option>
              <option value="Rental">Rental Fleet</option>
              <option value="Partner">Partner Vehicle</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-2.5 py-1 rounded-lg"
            >
              <option value="ALL">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="On Trip">On Trip</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inspection">Inspection</option>
            </select>
          </div>
        </div>

        {/* TAB CONTENT: VEHICLE ROSTER TABLE */}
        {activeSubTab === "vehicles" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Plate Number</th>
                  <th className="py-2.5 px-3">Model</th>
                  <th className="py-2.5 px-3">Ownership</th>
                  <th className="py-2.5 px-3">Capacity</th>
                  <th className="py-2.5 px-3">Current Hub</th>
                  <th className="py-2.5 px-3">Odometer</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
                {filteredVehicles.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => onSelectVehicleDetail(v.id)}
                    className="saas-table-row cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{v.plateNumber}</td>
                    <td className="py-3 px-3 font-bold text-[#172033] dark:text-white">
                      {v.brand} {v.model}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-[#F8FAFC]">
                        {v.ownership}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#172033] dark:text-[#F8FAFC]">{v.capacity} Seats</td>
                    <td className="py-3 px-3 text-[#667085] dark:text-[#A7B1C0]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2563EB] dark:text-[#4F8CFF]" />
                        <span>{v.currentLocation}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#172033] dark:text-[#F8FAFC]">{v.odometer.toLocaleString()} KM</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          v.status === "Available"
                            ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                            : v.status === "On Trip" || v.status === "Assigned"
                            ? "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border-blue-200/60 dark:border-blue-800/40"
                            : "bg-[#FEF3F2] text-[#B42318] dark:bg-[rgba(249,112,102,0.12)] dark:text-[#FDA29B] border-rose-200/60 dark:border-rose-800/40"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVehicleDetail(v.id);
                        }}
                        className="p-1 rounded text-[#2563EB] dark:text-[#4F8CFF] hover:bg-[#EEF4FF] dark:hover:bg-[#16263F] font-semibold text-[11px] cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
