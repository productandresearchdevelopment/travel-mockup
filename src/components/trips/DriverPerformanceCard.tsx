"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DriverPerformanceSummary } from "@/types/driverWorkManagement";
import { mockDriverPerformanceSummaryData } from "@/data/mockDriverWorkManagementData";
import { Activity, Clock, CheckCircle2, AlertTriangle, ShieldCheck, UserCheck } from "lucide-react";

interface DriverPerformanceCardProps {
  summary?: DriverPerformanceSummary;
}

export function DriverPerformanceCard({
  summary = mockDriverPerformanceSummaryData,
}: DriverPerformanceCardProps) {
  return (
    <Card className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-slate-800 text-white space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              OPERATIONAL DRIVER PERFORMANCE & RELIABILITY
            </h3>
            <span className="text-xs text-slate-400">On-time metrics, trip completion & overtime audit</span>
          </div>
        </div>
        <Badge variant="emerald">✓ 87.5% On-Time Score</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL TRIPS</span>
          <strong className="text-xl font-extrabold text-white">{summary.totalTrips} Trips</strong>
          <span className="text-slate-400 text-[10px] block">100% Completed</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-900/60 bg-emerald-950/20 space-y-0.5">
          <span className="text-[10px] text-emerald-400 font-bold uppercase block">ON-TIME RATE</span>
          <strong className="text-xl font-extrabold text-emerald-400">{summary.onTimeRatePercent}%</strong>
          <span className="text-emerald-400 text-[10px] block font-bold">✓ High Reliability</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-900/60 bg-amber-950/20 space-y-0.5">
          <span className="text-[10px] text-amber-400 font-bold uppercase block">DELAYED TRIPS</span>
          <strong className="text-xl font-extrabold text-amber-400">{summary.delayedTrips} Trips</strong>
          <span className="text-slate-400 text-[10px] block">Avg Delay: {summary.averageDelayMinutes}m</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-blue-900/60 bg-blue-950/20 space-y-0.5">
          <span className="text-[10px] text-blue-400 font-bold uppercase block">WORKING DAYS</span>
          <strong className="text-xl font-extrabold text-blue-400">{summary.workingDays} Days</strong>
          <span className="text-slate-400 text-[10px] block">Daily Shift Logged</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-purple-900/60 bg-purple-950/20 space-y-0.5">
          <span className="text-[10px] text-purple-400 font-bold uppercase block">OVERTIME HOURS</span>
          <strong className="text-xl font-extrabold text-purple-400">{summary.totalOvertimeHours} Hours</strong>
          <span className="text-slate-400 text-[10px] block">Calculated at Rp 30k/h</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold block uppercase">VEHICLE SWAPS</span>
          <strong className="text-xl font-extrabold text-indigo-400">{summary.vehicleChangesCount} Event</strong>
          <span className="text-slate-400 text-[10px] block">Probolinggo HiAce</span>
        </div>
      </div>
    </Card>
  );
}
