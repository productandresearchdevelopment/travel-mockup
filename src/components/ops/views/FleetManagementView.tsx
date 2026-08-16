"use client";

import React, { useState } from "react";
import { Vehicle, VehicleLog, Maintenance, VehicleChecklist, VehicleRepairAssignment, VehicleStatus, VehicleOwnership } from "@/types/travelOps";
import {
  Truck,
  Wrench,
  Fuel,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  ClipboardCheck,
  Eye,
  TrendingUp,
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
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-bold uppercase tracking-wider">
              Fleet Operations Control
            </span>
            <span className="text-xs text-slate-400 font-mono">/fleet</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Enterprise Fleet & Maintenance Management
          </h1>
          <p className="text-xs text-slate-400">
            Real-time management of company, rental, and partner vehicles (Hiace, ELF, 4x4 Jeeps). Monitor odometer readings, fuel logs, daily checklists, and workshop repair assignments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenChecklistModal()}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition-colors cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Complete Checklist</span>
          </button>
          <button
            onClick={() => onOpenMaintenanceModal()}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition-colors cursor-pointer"
          >
            <Wrench className="w-4 h-4" />
            <span>Schedule Maintenance</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS (7 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Total Fleet</span>
          <div className="text-2xl font-extrabold text-white font-mono">{totalFleet}</div>
          <span className="text-[10px] text-slate-400">Managed Vehicles</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Available</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{availableCount}</div>
          <span className="text-[10px] text-emerald-400 font-medium">Ready for Dispatch</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Assigned</span>
          <div className="text-2xl font-extrabold text-blue-400 font-mono">{assignedCount}</div>
          <span className="text-[10px] text-blue-400 font-medium">Tour Matched</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">On Trip</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{onTripCount}</div>
          <span className="text-[10px] text-cyan-400 font-medium">En Route</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Maintenance</span>
          <div className="text-2xl font-extrabold text-red-400 font-mono">{maintenanceCount}</div>
          <span className="text-[10px] text-red-400 font-medium">In Workshop</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Inspection</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{inspectionCount}</div>
          <span className="text-[10px] text-amber-400 font-medium">Checklist Pending</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Unavailable</span>
          <div className="text-2xl font-extrabold text-slate-400 font-mono">{unavailableCount}</div>
          <span className="text-[10px] text-slate-500">Off-Service</span>
        </div>
      </div>

      {/* SUB-TABS & FILTERS */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveSubTab("vehicles")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "vehicles" ? "bg-amber-500 text-slate-950 shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Vehicle List ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveSubTab("utilization")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "utilization" ? "bg-amber-500 text-slate-950 shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Utilization Metrics
          </button>
          <button
            onClick={() => setActiveSubTab("logbook")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "logbook" ? "bg-amber-500 text-slate-950 shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Fuel & Logbook ({logs.length})
          </button>
          <button
            onClick={() => setActiveSubTab("maintenance")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "maintenance" ? "bg-amber-500 text-slate-950 shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Maintenance ({maintenance.length})
          </button>
          <button
            onClick={() => setActiveSubTab("repairs")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "repairs" ? "bg-amber-500 text-slate-950 shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Repair Assignments ({repairs.length})
          </button>
        </div>

        {activeSubTab === "vehicles" && (
          <div className="flex items-center gap-2">
            <div className="relative min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Plate, model, loc..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <select
              value={ownershipFilter}
              onChange={(e) => setOwnershipFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
            >
              <option value="ALL">All Ownership</option>
              <option value="Company">Company</option>
              <option value="Rental">Rental</option>
              <option value="Partner">Partner</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="On Trip">On Trip</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inspection">Inspection</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        )}
      </div>

      {/* SUB-TAB 1: VEHICLE LIST TABLE */}
      {activeSubTab === "vehicles" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Vehicle</th>
                <th className="p-3">Plate Number</th>
                <th className="p-3">Type</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Ownership</th>
                <th className="p-3">Current Location</th>
                <th className="p-3">Current Tour</th>
                <th className="p-3">Fuel Level</th>
                <th className="p-3">Status</th>
                <th className="p-3">Maintenance</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="ops-table-row hover:bg-slate-850/60 transition-colors cursor-pointer"
                  onClick={() => onSelectVehicleDetail(vehicle.id)}
                >
                  <td className="p-3 font-bold text-white max-w-[140px] truncate">
                    {vehicle.brand} {vehicle.model}
                  </td>
                  <td className="p-3 font-mono font-bold text-amber-300 whitespace-nowrap">{vehicle.plateNumber}</td>
                  <td className="p-3 text-slate-300">{vehicle.model.includes("Hiace") ? "Minibus" : vehicle.model.includes("ELF") ? "Microbus" : "4x4 SUV"}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">{vehicle.capacity} Pax</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        vehicle.ownership === "Company"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : vehicle.ownership === "Rental"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {vehicle.ownership}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-[130px] truncate">{vehicle.currentLocation}</td>
                  <td className="p-3 font-mono text-cyan-400">{vehicle.currentTourId || "-"}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{vehicle.fuelLevel}%</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        vehicle.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : vehicle.status === "On Trip"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : vehicle.status === "Maintenance"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        vehicle.maintenanceStatus === "Good"
                          ? "text-emerald-400"
                          : vehicle.maintenanceStatus === "Service Due"
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {vehicle.maintenanceStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenChecklistModal(vehicle.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-2.5 py-1 rounded font-bold transition-colors cursor-pointer"
                        title="Log Safety Checklist"
                      >
                        Checklist
                      </button>
                      <button
                        onClick={() => onSelectVehicleDetail(vehicle.id)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 2: UTILIZATION METRICS */}
      {activeSubTab === "utilization" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2 shadow-lg">
            <span className="text-xs text-slate-400">Vehicle Utilization Rate</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-400">84.5%</div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: "84.5%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400">Active fleet hours per day</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2 shadow-lg">
            <span className="text-xs text-slate-400">Trips Completed YTD</span>
            <div className="text-3xl font-extrabold font-mono text-cyan-400">142 Trips</div>
            <span className="text-[10px] text-cyan-400 font-medium">+18 trips this month</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2 shadow-lg">
            <span className="text-xs text-slate-400">Distance Traveled</span>
            <div className="text-3xl font-extrabold font-mono text-blue-400">34,250 KM</div>
            <span className="text-[10px] text-blue-400">Total Java-Bali overland distance</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2 shadow-lg">
            <span className="text-xs text-slate-400">Average Daily Utilization</span>
            <div className="text-3xl font-extrabold font-mono text-purple-400">8.4 Hours</div>
            <span className="text-[10px] text-purple-400">Per active vehicle</span>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: LOGBOOK */}
      {activeSubTab === "logbook" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Date</th>
                <th className="p-3">Vehicle Plate</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Tour ID</th>
                <th className="p-3">Departure</th>
                <th className="p-3">Return</th>
                <th className="p-3">KM Start → End</th>
                <th className="p-3">Fuel Start → End</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-850/60">
                  <td className="p-3 text-slate-300">{l.date}</td>
                  <td className="p-3 text-amber-300 font-bold">{l.vehicleId}</td>
                  <td className="p-3 font-sans font-medium text-slate-200">{l.driverId}</td>
                  <td className="p-3 text-emerald-400">{l.tourId}</td>
                  <td className="p-3 text-slate-300">{l.departureTime}</td>
                  <td className="p-3 text-slate-300">{l.returnTime}</td>
                  <td className="p-3 text-white">
                    {l.odometerStart.toLocaleString()} → {l.odometerEnd.toLocaleString()} (+{l.odometerEnd - l.odometerStart} KM)
                  </td>
                  <td className="p-3 text-emerald-400">{l.fuelStart}% → {l.fuelEnd}%</td>
                  <td className="p-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 4: MAINTENANCE */}
      {activeSubTab === "maintenance" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Vehicle</th>
                <th className="p-3">Maintenance Description</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Assigned Workshop</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {maintenance.map((m) => (
                <tr key={m.id} className="hover:bg-slate-850/60">
                  <td className="p-3 font-mono font-bold text-amber-300">{m.vehicleId}</td>
                  <td className="p-3 font-semibold text-slate-200">{m.type} - {m.description}</td>
                  <td className="p-3 font-mono text-slate-300">{m.dueDate}</td>
                  <td className="p-3 font-bold text-amber-400">{m.priority}</td>
                  <td className="p-3 text-slate-300">{m.assignedWorkshop}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 5: REPAIR ASSIGNMENTS */}
      {activeSubTab === "repairs" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Vehicle</th>
                <th className="p-3">Problem / Reported Issue</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Assigned Workshop</th>
                <th className="p-3">Reported Date</th>
                <th className="p-3">Est. Completion</th>
                <th className="p-3">Repair Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {repairs.map((r) => (
                <tr key={r.id} className="hover:bg-slate-850/60">
                  <td className="p-3 font-mono font-bold text-amber-300">{r.vehicleId}</td>
                  <td className="p-3 font-semibold text-red-400">{r.problem}</td>
                  <td className="p-3 font-bold text-red-400">{r.priority}</td>
                  <td className="p-3 text-slate-300">{r.assignedWorkshop}</td>
                  <td className="p-3 font-mono text-slate-400">{r.reportedDate}</td>
                  <td className="p-3 font-mono text-emerald-400">{r.estimatedCompletion}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
