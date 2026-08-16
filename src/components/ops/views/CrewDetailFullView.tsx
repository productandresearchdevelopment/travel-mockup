"use client";

import React, { useState } from "react";
import { Crew, Tour, CrewAttendance, CrewFieldReport, ActivityHistoryItem } from "@/types/travelOps";
import { useAuth } from "@/context/AuthContext";
import { canPerformAction } from "@/data/actionRules";
import {
  ArrowLeft,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  Star,
  Award,
  History,
  ShieldCheck,
  Calendar,
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
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Crew List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                  {crew.id}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    crew.status === "Available"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  }`}
                >
                  ● {crew.statusLabel || crew.status}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-white mt-1">
                {crew.name} ({crew.role}) — {crew.employmentType}
              </h1>
            </div>
          </div>

          {/* Role Guarded Actions */}
          <div className="flex items-center gap-2 text-xs">
            {canAssign && onAssignToTour && (
              <button
                onClick={() => {
                  onAssignToTour(crew.id);
                  handleUpdateCrewStatus("Assigned", "Assigned to Tour", "Assigned to Tour Roster");
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-lg font-bold shadow cursor-pointer transition-colors"
              >
                Assign to Tour Roster
              </button>
            )}

            {canMarkAvailable && (
              <button
                onClick={() => handleUpdateCrewStatus("Available", "Available for Deployment", "Set Available")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg font-bold cursor-pointer transition-colors"
              >
                Mark Available
              </button>
            )}

            {canMarkUnavailable && (
              <button
                onClick={() => handleUpdateCrewStatus("Off Duty", "Off Duty / Unavailable", "Set Off Duty")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-lg font-bold cursor-pointer"
              >
                Set Off Duty
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CREW SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block text-[10px]">Home Base Depot</span>
          <span className="font-bold text-white text-sm block">{crew.homeBase}</span>
          <span className="text-[10px] text-slate-400 block">Phone: {crew.phone}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Excursion Performance</span>
          <span className="font-mono font-bold text-emerald-400 text-sm flex items-center gap-1">
            <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" /> {crew.rating} / 5.0
          </span>
          <span className="text-[10px] text-slate-400 block">{crew.toursCompleted} Tours Completed</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Employment Category</span>
          <span className="font-bold text-cyan-400 text-sm block">{crew.employmentType}</span>
          <span className="text-[10px] text-slate-400 block">Verified Operational Resource</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow">
          <span className="text-slate-400 block">Active Licenses</span>
          <span className="font-mono font-bold text-purple-300 text-sm block">{crew.licenses.join(", ")}</span>
          <span className="text-[10px] text-emerald-400 font-semibold block">Fully Compliant</span>
        </div>
      </div>

      {/* ACTIVITY TIMELINE SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-lg text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-purple-400" /> Crew Assignment & Attendance Timeline
        </h2>

        <div className="space-y-3 pl-2 border-l-2 border-slate-800 ml-2">
          {history.map((act) => (
            <div key={act.id} className="relative pl-6 space-y-1">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{act.title}</span>
                <span className="font-mono text-slate-400 text-[10px]">{act.timestamp}</span>
              </div>
              <p className="text-slate-400 italic text-[11px]">{act.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
