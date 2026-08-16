"use client";

import React, { useState } from "react";
import { Crew, CrewRole, CrewEmploymentType, CrewStatus, Tour, CrewAttendance, CrewFieldReport } from "@/types/travelOps";
import {
  Users,
  Star,
  Phone,
  MapPin,
  Award,
  Search,
  Filter,
  CheckCircle2,
  Briefcase,
  UserCheck,
  Calendar,
  Clock,
  FileText,
  Camera,
  Eye,
  AlertTriangle,
  ChevronRight,
  Plus,
} from "lucide-react";

interface CrewManagementViewProps {
  crews: Crew[];
  tours: Tour[];
  attendances: CrewAttendance[];
  fieldReports: CrewFieldReport[];
  onSelectCrewDetail: (crewId: string) => void;
  onOpenAssignModal: (tourId: string) => void;
}

export const CrewManagementView: React.FC<CrewManagementViewProps> = ({
  crews,
  tours,
  attendances,
  fieldReports,
  onSelectCrewDetail,
  onOpenAssignModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"roster" | "availability" | "unassigned" | "attendance" | "reports">("roster");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [employmentFilter, setEmploymentFilter] = useState<string>("ALL");
  const [homebaseFilter, setHomebaseFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("2026-08-14");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // KPI Computations for Drivers, Guides, Tour Managers
  const drivers = crews.filter((c) => c.role === "Driver");
  const driversAvailable = drivers.filter((c) => c.status === "Available").length;
  const driversAssigned = drivers.filter((c) => c.status === "Assigned").length;
  const driversOnTrip = drivers.filter((c) => c.status === "On Trip").length;
  const driversUnavailable = drivers.filter((c) => c.status === "Unavailable" || c.status === "Off Duty").length;

  const guides = crews.filter((c) => c.role === "Local Guide");
  const guidesAvailable = guides.filter((c) => c.status === "Available").length;
  const guidesAssigned = guides.filter((c) => c.status === "Assigned").length;
  const guidesOnTrip = guides.filter((c) => c.status === "On Trip").length;
  const guidesUnavailable = guides.filter((c) => c.status === "Unavailable" || c.status === "Off Duty").length;

  const tms = crews.filter((c) => c.role === "Tour Manager");
  const tmsAvailable = tms.filter((c) => c.status === "Available").length;
  const tmsAssigned = tms.filter((c) => c.status === "Assigned").length;
  const tmsOnTrip = tms.filter((c) => c.status === "On Trip").length;
  const tmsUnavailable = tms.filter((c) => c.status === "Unavailable" || c.status === "Off Duty").length;

  const filteredCrews = crews.filter((c) => {
    if (roleFilter !== "ALL" && c.role !== roleFilter) return false;
    if (employmentFilter !== "ALL" && c.employmentType !== employmentFilter) return false;
    if (homebaseFilter !== "ALL" && c.homeBase !== homebaseFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchPhone = c.phone.includes(q);
      if (!matchName && !matchPhone) return false;
    }
    return true;
  });

  // Tours with missing crew assignments
  const missingCrewTours = tours.filter((t) => !t.driverId || !t.guideId || !t.tourManagerId);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-wider">
              Operational SDM Command
            </span>
            <span className="text-xs text-slate-400 font-mono">/crew</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Operational Crew & Resource Management
          </h1>
          <p className="text-xs text-slate-400">
            Roster management for drivers, local guides & tour managers. Specialized for daily & freelance workers across Java-Bali bases.
          </p>
        </div>
      </div>

      {/* CREW DASHBOARD KPI CARDS (SEPARATE FOR DRIVERS, GUIDES, TMs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* DRIVERS KPI BOX */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-xs text-blue-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" /> Drivers Roster
            </span>
            <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {drivers.length} Total
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Available</span>
              <span className="font-mono font-bold text-emerald-400">{driversAvailable}</span>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Assigned</span>
              <span className="font-mono font-bold text-blue-400">{driversAssigned}</span>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">On Trip</span>
              <span className="font-mono font-bold text-cyan-400">{driversOnTrip}</span>
            </div>
            <div className="bg-slate-950 border border-slate-850 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Unavail.</span>
              <span className="font-mono font-bold text-slate-400">{driversUnavailable}</span>
            </div>
          </div>
        </div>

        {/* GUIDES KPI BOX */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-xs text-emerald-400 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Local Guides Roster
            </span>
            <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {guides.length} Total
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Available</span>
              <span className="font-mono font-bold text-emerald-400">{guidesAvailable}</span>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Assigned</span>
              <span className="font-mono font-bold text-blue-400">{guidesAssigned}</span>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">On Trip</span>
              <span className="font-mono font-bold text-cyan-400">{guidesOnTrip}</span>
            </div>
            <div className="bg-slate-950 border border-slate-850 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Unavail.</span>
              <span className="font-mono font-bold text-slate-400">{guidesUnavailable}</span>
            </div>
          </div>
        </div>

        {/* TOUR MANAGERS KPI BOX */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-xs text-purple-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" /> Tour Managers Roster
            </span>
            <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {tms.length} Total
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Available</span>
              <span className="font-mono font-bold text-emerald-400">{tmsAvailable}</span>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Assigned</span>
              <span className="font-mono font-bold text-blue-400">{tmsAssigned}</span>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">On Trip</span>
              <span className="font-mono font-bold text-cyan-400">{tmsOnTrip}</span>
            </div>
            <div className="bg-slate-950 border border-slate-850 p-1.5 rounded">
              <span className="text-[9px] text-slate-400 block">Unavail.</span>
              <span className="font-mono font-bold text-slate-400">{tmsUnavailable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TABS CONTROL */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveSubTab("roster")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "roster" ? "bg-indigo-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Crew Roster ({crews.length})
          </button>
          <button
            onClick={() => setActiveSubTab("availability")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "availability" ? "bg-indigo-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Resource Availability
          </button>
          <button
            onClick={() => setActiveSubTab("unassigned")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "unassigned" ? "bg-indigo-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Missing Crew Matching ({missingCrewTours.length})
          </button>
          <button
            onClick={() => setActiveSubTab("attendance")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "attendance" ? "bg-indigo-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Attendance Logs ({attendances.length})
          </button>
          <button
            onClick={() => setActiveSubTab("reports")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeSubTab === "reports" ? "bg-indigo-600 text-white shadow font-extrabold" : "text-slate-400 hover:text-white"
            }`}
          >
            Field Reports ({fieldReports.length})
          </button>
        </div>

        {activeSubTab === "roster" && (
          <div className="flex items-center gap-2">
            <div className="relative min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Crew name, phone..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="Driver">Drivers</option>
              <option value="Local Guide">Local Guides</option>
              <option value="Tour Manager">Tour Managers</option>
            </select>

            <select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
            >
              <option value="ALL">All Employment</option>
              <option value="Freelance">Freelance</option>
              <option value="Daily Worker">Daily Worker</option>
              <option value="Partner">Partner</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>
        )}
      </div>

      {/* SUB-TAB 1: CREW ROSTER TABLE */}
      {activeSubTab === "roster" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Name & ID</th>
                <th className="p-3">Role</th>
                <th className="p-3">Employment Type</th>
                <th className="p-3">Home Base</th>
                <th className="p-3">Status</th>
                <th className="p-3">Current Tour</th>
                <th className="p-3">Rating / Exp</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCrews.map((c) => (
                <tr
                  key={c.id}
                  className="ops-table-row hover:bg-slate-850/60 transition-colors cursor-pointer"
                  onClick={() => onSelectCrewDetail(c.id)}
                >
                  <td className="p-3">
                    <div className="font-mono text-[10px] font-bold text-indigo-400">{c.id}</div>
                    <div className="font-bold text-white text-sm">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.phone}</div>
                  </td>
                  <td className="p-3 font-semibold text-emerald-400">{c.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.employmentType === "Permanent"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : c.employmentType === "Freelance"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {c.employmentType}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 font-medium">{c.homeBase}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        c.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : c.status === "On Trip"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-cyan-400">{c.currentTourId || "-"}</td>
                  <td className="p-3">
                    <div className="font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {c.rating}
                    </div>
                    <div className="text-[10px] text-slate-400">{c.toursCompleted} Tours</div>
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectCrewDetail(c.id)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="View Full Profile"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 2: RESOURCE AVAILABILITY CALENDAR */}
      {activeSubTab === "availability" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" /> Date Resource Availability Timeline
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Select Date:</span>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1 rounded focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crews.map((c) => (
              <div key={c.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{c.name} ({c.role})</div>
                  <div className="text-[10px] text-slate-400">Homebase: {c.homeBase} | {c.employmentType}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs font-bold border ${
                    c.status === "Available"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : c.status === "On Trip"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: UNASSIGNED CREW MATCHING */}
      {activeSubTab === "unassigned" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl text-xs">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Tours Requiring Crew Assignments
          </h3>
          <div className="space-y-3">
            {missingCrewTours.map((tour) => (
              <div key={tour.id} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-mono text-cyan-400 font-bold">{tour.id} - {tour.tourName}</div>
                  <div className="text-[11px] text-slate-400">Date: {tour.date} | Pax: {tour.pax} | Route: {tour.origin} → {tour.dropOff}</div>
                </div>
                <button
                  onClick={() => onOpenAssignModal(tour.id)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow cursor-pointer transition-colors"
                >
                  Assign Missing Crew
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ATTENDANCE */}
      {activeSubTab === "attendance" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Date</th>
                <th className="p-3">Crew Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Tour ID</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {attendances.map((att) => (
                <tr key={att.id} className="hover:bg-slate-850/60">
                  <td className="p-3 text-slate-300">{att.date}</td>
                  <td className="p-3 font-sans font-bold text-white">{att.crewName}</td>
                  <td className="p-3 font-sans text-emerald-400">{att.role}</td>
                  <td className="p-3 text-cyan-400">{att.tourId}</td>
                  <td className="p-3 text-emerald-400">{att.checkIn}</td>
                  <td className="p-3 text-slate-300">{att.checkOut}</td>
                  <td className="p-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 5: FIELD REPORTS */}
      {activeSubTab === "reports" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Tour ID</th>
                <th className="p-3">Crew Name</th>
                <th className="p-3">Date & Location</th>
                <th className="p-3">Report Summary</th>
                <th className="p-3">Photo Count</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {fieldReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-850/60">
                  <td className="p-3 font-mono font-bold text-cyan-400">{rep.tourId}</td>
                  <td className="p-3 font-bold text-white">{rep.crewName}</td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-200">{rep.location}</div>
                    <div className="font-mono text-[10px] text-slate-400">{rep.date}</div>
                  </td>
                  <td className="p-3 text-slate-300 italic max-w-xs">{rep.reportText}</td>
                  <td className="p-3 font-mono text-cyan-400">
                    <Camera className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />
                    {rep.photoCount} Photos
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {rep.status}
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
