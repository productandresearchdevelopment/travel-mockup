"use client";

import React from "react";
import { TripActivityRecord } from "@/types/tripActivityTimeline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  X,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  Compass,
  ArrowRight,
  FileText,
  Truck,
  Ticket,
  AlertTriangle,
} from "lucide-react";

interface ActivityDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activity: TripActivityRecord | null;
}

export function ActivityDetailDrawer({
  isOpen,
  onClose,
  activity,
}: ActivityDetailDrawerProps) {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#101726] border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col font-sans text-slate-800 dark:text-slate-200 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex items-center justify-between sticky top-0 z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                ACTIVITY AUDIT RECORD
              </span>
              <Badge variant={activity.actorType === "SYSTEM" ? "amber" : "violet"}>
                {activity.actorType === "SYSTEM" ? "🤖 SYSTEM" : "👤 USER"}
              </Badge>
              <Badge variant="slate">{activity.category}</Badge>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {activity.title}
            </h2>
            <span className="text-xs font-mono text-slate-500 block">
              Trip: {activity.tripCode} · Date: {activity.date} @ {activity.time}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 flex-1 text-xs font-mono">
          {/* ACTOR ACCOUNTABILITY */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">PERFORMED BY</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm block">{activity.actorName}</strong>
            <span className="text-slate-500 text-[11px] block">{activity.actorRole}</span>
          </div>

          {/* LIVE TELEMETRY MAP LINK */}
          {activity.liveTrackingUrl && (
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30 flex items-center justify-between">
              <div>
                <span className="font-bold text-blue-600 dark:text-blue-400 block flex items-center gap-1.5 text-xs">
                  <Compass className="w-4 h-4" /> Live Telemetry Linked Event
                </span>
                <span className="text-slate-500 text-[11px] block">Location: {activity.location || "On Road"}</span>
              </div>
              <Link href={activity.liveTrackingUrl}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px]">
                  View Live Tracking →
                </Button>
              </Link>
            </div>
          )}

          {/* BEFORE VS AFTER COMPARISON */}
          {(activity.previousValue || activity.newValue) && (
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase block">
                BEFORE VS AFTER CHANGE COMPARISON
              </span>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-rose-500 font-bold block uppercase">BEFORE VALUE</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs">
                    {activity.previousValue || "— (Not Set)"}
                  </span>
                </div>

                <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 space-y-0.5">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block uppercase">
                    AFTER VALUE
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs">
                    {activity.newValue || "—"}
                  </span>
                </div>
              </div>

              {activity.reason && (
                <div className="pt-2 text-[11px]">
                  <span className="text-slate-400 font-bold block">REASON FOR CHANGE:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-sans italic">{activity.reason}</span>
                </div>
              )}
            </div>
          )}

          {/* PLANNED VS ACTUAL SCHEDULE */}
          {activity.plannedValue && (
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
              <span className="text-[10px] text-amber-600 font-bold uppercase block">PLANNED VS ACTUAL DEVIATION</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">PLANNED TIME</span>
                  <strong className="text-slate-900 dark:text-slate-100 block">{activity.plannedValue}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">ACTUAL TIME</span>
                  <strong className="text-amber-600 block">{activity.actualValue || "—:—"}</strong>
                </div>
              </div>
              {activity.delayMinutes && activity.delayMinutes > 0 && (
                <span className="text-amber-600 text-[10px] font-bold block pt-1">
                  ⚠️ Delay Duration: +{activity.delayMinutes} minutes
                </span>
              )}
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">DESCRIPTION</span>
            <p className="text-slate-700 dark:text-slate-300 font-sans text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034]">
              {activity.description}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
