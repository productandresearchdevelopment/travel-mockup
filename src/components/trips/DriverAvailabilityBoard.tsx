"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DriverAvailabilityRecord } from "@/types/driverWorkManagement";
import { mockDriverAvailabilityData } from "@/data/mockDriverWorkManagementData";
import { Users, Clock, AlertTriangle, CheckCircle2, UserCheck } from "lucide-react";

interface DriverAvailabilityBoardProps {
  roster?: DriverAvailabilityRecord[];
}

export function DriverAvailabilityBoard({
  roster = mockDriverAvailabilityData,
}: DriverAvailabilityBoardProps) {
  const availableCount = roster.filter((r) => r.status === "Available").length;
  const onTripCount = roster.filter((r) => r.status === "On Trip").length;
  const offDutyCount = roster.filter((r) => r.status === "Off Duty").length;
  const absentCount = roster.filter((r) => r.status === "Absent").length;

  return (
    <Card className="p-5 space-y-4 font-mono text-xs border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            OPERATIONAL WORKER AVAILABILITY ROSTER
          </h3>
        </div>
        <span className="text-xs text-slate-400">Real-time driver shift dispatch board</span>
      </div>

      {/* SUMMARY ROSTER COUNT PILLS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 flex justify-between items-center">
          <span className="font-bold text-emerald-600">Available:</span>
          <strong className="text-lg font-extrabold text-emerald-600">{availableCount} Drivers</strong>
        </div>

        <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 flex justify-between items-center">
          <span className="font-bold text-blue-600">On Trip:</span>
          <strong className="text-lg font-extrabold text-blue-600">{onTripCount} Drivers</strong>
        </div>

        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034] flex justify-between items-center">
          <span className="font-bold text-slate-500">Off Duty:</span>
          <strong className="text-lg font-extrabold text-slate-700 dark:text-slate-300">{offDutyCount} Drivers</strong>
        </div>

        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20 flex justify-between items-center">
          <span className="font-bold text-rose-600">Absent / Leave:</span>
          <strong className="text-lg font-extrabold text-rose-600">{absentCount} Drivers</strong>
        </div>
      </div>

      {/* DRIVER LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roster.map((d) => (
          <div
            key={d.driverId}
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              d.status === "On Trip"
                ? "border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20"
                : d.status === "Available"
                ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034]"
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-slate-900 dark:text-slate-100">{d.driverName} ({d.driverCode})</span>
              <Badge
                variant={
                  d.status === "Available"
                    ? "emerald"
                    : d.status === "On Trip"
                    ? "blue"
                    : "danger"
                }
              >
                ● {d.status}
              </Badge>
            </div>

            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Worker: {d.workerType}</span>
              <span>Shift: {d.shiftWindow}</span>
            </div>

            {d.currentTripCode && (
              <span className="text-blue-600 font-bold text-[11px] block">
                Assigned Trip: {d.currentTripCode}
              </span>
            )}

            {d.conflictWarning && (
              <div className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 font-bold text-[10px] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{d.conflictWarning}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
