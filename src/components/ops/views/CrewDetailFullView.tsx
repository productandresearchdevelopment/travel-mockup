"use client";

import React, { useState } from "react";
import { Crew, Tour, CrewAttendance, CrewFieldReport, ActivityHistoryItem } from "@/types/travelOps";
import { useAuth } from "@/context/AuthContext";
import { canPerformAction } from "@/data/actionRules";
import {
  ArrowLeft,
  CheckCircle2,
  User,
  Star,
  History,
} from "lucide-react";

interface CrewDetailFullViewProps {
  crew: Crew;
  tours?: Tour[];
  attendances?: CrewAttendance[];
  fieldReports?: CrewFieldReport[];
  onBack: () => void;
  onAssignToTour?: (crewId: string) => void;
}

export const CrewDetailFullView: React.FC<CrewDetailFullViewProps> = ({
  crew: initialCrew,
  onBack,
  onAssignToTour,
}) => {
  const { user } = useAuth();
  const [crew, setCrew] = useState<Crew>(initialCrew);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const initialHistory: ActivityHistoryItem[] = crew.activityHistory || [
    {
      id: "ACT-301",
      type: "available",
      title: "Daily Attendance Checked In",
      description: "Checked in at Malang Operating Depot.",
      userId: "USR-005",
      timestamp: "2026-08-16 06:15",
    },
    {
      id: "ACT-302",
      type: "assigned",
      title: "Assigned to Excursion Roster",
      description: "Assigned to tour TR-260814-001 as Driver.",
      userId: "USR-003",
      timestamp: "2026-08-16 07:30",
    },
  ];

  const [history, setHistory] = useState<ActivityHistoryItem[]>(initialHistory);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateCrewStatus = (newStatus: any, statusLabel: string, actionTitle: string) => {
    const updated: Crew = {
      ...crew,
      status: newStatus,
      statusLabel,
    };
    setCrew(updated);

    const newActivity: ActivityHistoryItem = {
      id: `ACT-${Date.now()}`,
      type: newStatus.toLowerCase(),
      title: actionTitle,
      description: `Crew status updated to '${statusLabel}' by ${user?.name || "SDM Officer"}`,
      userId: user?.id || "USR-005",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setHistory([newActivity, ...history]);
    showToast(`Success: Crew ${crew.name} status updated to '${statusLabel}'`);
  };

  const canAssign = canPerformAction(user?.role, "crew.assign");
  const canMarkAvailable = canPerformAction(user?.role, "crew.markAvailable");
  const canMarkUnavailable = canPerformAction(user?.role, "crew.markUnavailable");

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-200 dark:border-purple-800/50">
                {crew.role}
              </span>
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/crew/{crew.id}</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
              {crew.name}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-xs">
          {canAssign && onAssignToTour && (
            <button
              onClick={() => onAssignToTour(crew.id)}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Assign to Tour</span>
            </button>
          )}

          {canMarkAvailable && crew.status !== "Available" && (
            <button
              onClick={() => handleUpdateCrewStatus("Available", "Available", "Marked Available")}
              className="flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] dark:bg-[#32D583] text-white px-3.5 py-2 rounded-xl font-bold shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Available</span>
            </button>
          )}

          {canMarkUnavailable && crew.status === "Available" && (
            <button
              onClick={() => handleUpdateCrewStatus("Unavailable", "Unavailable", "Marked Unavailable")}
              className="flex items-center gap-1.5 bg-[#FEF3F2] dark:bg-[rgba(249,112,102,0.12)] text-[#B42318] dark:text-[#FDA29B] border border-rose-200/60 dark:border-rose-800/40 px-3.5 py-2 rounded-xl font-bold cursor-pointer"
            >
              <span>Mark Off Duty</span>
            </button>
          )}
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* LEFT COLUMN (8 cols): Personnel Profile */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Personnel Profile & Qualifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Employment Type</span>
                <span className="font-bold text-xs text-[#172033] dark:text-white">{crew.employmentType}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Home Base</span>
                <span className="font-bold text-xs text-[#172033] dark:text-white">{crew.homeBase}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Rating</span>
                <div className="font-bold text-xs text-amber-500 font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{crew.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Tours Completed</span>
                <span className="font-mono font-extrabold text-xs text-[#2563EB] dark:text-[#4F8CFF]">{crew.toursCompleted} Tours</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Current Status</span>
                <span className="font-bold text-xs text-[#16A34A] dark:text-[#32D583]">{crew.status}</span>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
                <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Phone</span>
                <span className="font-mono text-xs text-[#172033] dark:text-white">{crew.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): History Timeline */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] dark:text-white border-b border-[#E4E7EC] dark:border-[#202B38] pb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" /> Personnel Activity Log
            </h3>

            <div className="space-y-3 relative pl-3 border-l-2 border-[#E4E7EC] dark:border-[#202B38] ml-2">
              {history.map((act) => (
                <div key={act.id} className="relative space-y-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#4F8CFF] absolute -left-[17px] top-1"></div>
                  <div className="font-bold text-xs text-[#172033] dark:text-white">{act.title}</div>
                  <div className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">{act.description}</div>
                  <div className="text-[10px] text-[#98A2B3] dark:text-[#667085] font-mono">{act.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
