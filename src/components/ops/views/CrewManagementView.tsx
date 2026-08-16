"use client";

import React, { useState } from "react";
import { Crew, Tour, CrewAttendance, CrewFieldReport } from "@/types/travelOps";
import {
  Users,
  Star,
  MapPin,
  Eye,
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
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [employmentFilter, setEmploymentFilter] = useState<string>("ALL");
  const [homebaseFilter, setHomebaseFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // KPI Computations for Drivers, Guides, Tour Managers
  const drivers = crews.filter((c) => c.role === "Driver");
  const driversAvailable = drivers.filter((c) => c.status === "Available").length;

  const guides = crews.filter((c) => c.role === "Local Guide");
  const guidesAvailable = guides.filter((c) => c.status === "Available").length;

  const tms = crews.filter((c) => c.role === "Tour Manager");
  const tmsAvailable = tms.filter((c) => c.status === "Available").length;

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

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 text-[11px] font-bold uppercase tracking-wider">
              Operational SDM Command
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/crew</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Operational Crew & Resource Management
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Roster management for drivers, local guides & tour managers. Specialized for daily & freelance workers across Java-Bali bases.
          </p>
        </div>
      </div>

      {/* THREE ROLE KPI MATRICES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* DRIVERS MATRIX */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
            <span className="font-bold text-sm text-[#172033] dark:text-white">Drivers Roster</span>
            <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF]">
              {driversAvailable} / {drivers.length} Available
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-2 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Available</span>
              <span className="font-bold text-[#16A34A] dark:text-[#32D583] text-sm font-mono">{driversAvailable}</span>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-2 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Assigned / On Trip</span>
              <span className="font-bold text-[#2563EB] dark:text-[#4F8CFF] text-sm font-mono">{drivers.length - driversAvailable}</span>
            </div>
          </div>
        </div>

        {/* GUIDES MATRIX */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
            <span className="font-bold text-sm text-[#172033] dark:text-white">Local Guides Roster</span>
            <span className="font-mono text-xs font-bold text-[#16A34A] dark:text-[#32D583]">
              {guidesAvailable} / {guides.length} Available
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-2 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Available</span>
              <span className="font-bold text-[#16A34A] dark:text-[#32D583] text-sm font-mono">{guidesAvailable}</span>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-2 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Assigned / On Trip</span>
              <span className="font-bold text-[#2563EB] dark:text-[#4F8CFF] text-sm font-mono">{guides.length - guidesAvailable}</span>
            </div>
          </div>
        </div>

        {/* TOUR MANAGERS MATRIX */}
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
            <span className="font-bold text-sm text-[#172033] dark:text-white">Tour Managers</span>
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
              {tmsAvailable} / {tms.length} Available
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-2 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Available</span>
              <span className="font-bold text-[#16A34A] dark:text-[#32D583] text-sm font-mono">{tmsAvailable}</span>
            </div>
            <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-2 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Assigned / On Trip</span>
              <span className="font-bold text-[#2563EB] dark:text-[#4F8CFF] text-sm font-mono">{tms.length - tmsAvailable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CREW ROSTER TABLE */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <h3 className="font-bold text-sm text-[#172033] dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Active Crew Personnel Roster ({filteredCrews.length})
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1 rounded-lg"
            >
              <option value="ALL">All Roles</option>
              <option value="Driver">Drivers</option>
              <option value="Local Guide">Local Guides</option>
              <option value="Tour Manager">Tour Managers</option>
            </select>

            <select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1 rounded-lg"
            >
              <option value="ALL">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Daily Contract">Daily Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Crew Name</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Home Base</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
              {filteredCrews.map((crew) => (
                <tr
                  key={crew.id}
                  onClick={() => onSelectCrewDetail(crew.id)}
                  className="saas-table-row cursor-pointer"
                >
                  <td className="py-3 px-3 font-bold text-[#172033] dark:text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 text-[#2563EB] dark:text-[#4F8CFF] font-mono text-[10px] flex items-center justify-center font-bold">
                      {crew.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span>{crew.name}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#172033] dark:text-[#F8FAFC]">{crew.role}</td>
                  <td className="py-3 px-3 text-[#667085] dark:text-[#A7B1C0]">{crew.employmentType}</td>
                  <td className="py-3 px-3 text-[#667085] dark:text-[#A7B1C0]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#2563EB] dark:text-[#4F8CFF]" />
                      <span>{crew.homeBase}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#667085] dark:text-[#A7B1C0]">{crew.phone}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 font-bold text-amber-500 font-mono">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{crew.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        crew.status === "Available"
                          ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                          : crew.status === "On Trip" || crew.status === "Assigned"
                          ? "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border-blue-200/60 dark:border-blue-800/40"
                          : "bg-[#FEF3F2] text-[#B42318] dark:bg-[rgba(249,112,102,0.12)] dark:text-[#FDA29B] border-rose-200/60 dark:border-rose-800/40"
                      }`}
                    >
                      {crew.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCrewDetail(crew.id);
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
      </div>
    </div>
  );
};
