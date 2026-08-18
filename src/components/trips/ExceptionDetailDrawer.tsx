"use client";

import React from "react";
import { OperationalException } from "@/types/operationalException";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  X,
  AlertTriangle,
  Clock,
  MapPin,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  DollarSign,
  Compass,
  Bell,
  RefreshCw,
  FileText,
} from "lucide-react";

interface ExceptionDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  exception: OperationalException | null;
  onOpenResolveModal?: () => void;
}

export function ExceptionDetailDrawer({
  isOpen,
  onClose,
  exception,
  onOpenResolveModal,
}: ExceptionDetailDrawerProps) {
  if (!isOpen || !exception) return null;

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <Badge variant="danger">🔴 Critical</Badge>;
      case "High":
        return <Badge variant="amber">⚠️ High</Badge>;
      case "Medium":
        return <Badge variant="orange">● Medium</Badge>;
      case "Low":
        return <Badge variant="info">○ Low</Badge>;
      default:
        return <Badge variant="slate">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved":
      case "Closed":
        return <Badge variant="emerald">✓ {status}</Badge>;
      case "In Progress":
      case "Acknowledged":
        return <Badge variant="blue">● {status}</Badge>;
      case "Open":
        return <Badge variant="danger">🔴 Open</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

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
              <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                OPERATIONAL EXCEPTION RECORD
              </span>
              {getSeverityBadge(exception.severity)}
              {getStatusBadge(exception.status)}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {exception.id} — {exception.type}
            </h2>
            <span className="text-xs font-mono text-slate-500 block">
              Trip: {exception.tripCode} · {exception.guestGroupName} ({exception.guestPax} Pax)
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
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* OWNER NOTIFICATION BANNER IF SENT */}
          {exception.ownerNotified && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950 to-amber-950 border border-rose-800 text-white space-y-1.5 font-mono">
              <div className="flex justify-between items-center">
                <span className="font-bold flex items-center gap-1.5 text-xs text-rose-300">
                  <Bell className="w-4 h-4 text-rose-400 animate-bounce" /> OWNER NOTIFICATION: SENT
                </span>
                <Badge variant="danger">Critical Alert</Badge>
              </div>
              <span className="text-[11px] text-rose-200 block font-sans">
                Owner notified at {exception.ownerNotifiedAt || exception.time} via Push & SMS alert.
              </span>
            </div>
          )}

          {/* LIVE TELEMETRY MAP LINK IF VEHICLE ISSUE */}
          {(exception.relatedEntityType === "Vehicle" || exception.type === "Vehicle Breakdown") && (
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="font-bold text-blue-600 dark:text-blue-400 block flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Vehicle Breakdown Telemetry Active
                </span>
                <span className="text-slate-500 text-[11px] block">Location: {exception.location}</span>
              </div>
              <Link href="/dispatch/tracking">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px]">
                  View Live Tracking →
                </Button>
              </Link>
            </div>
          )}

          {/* SECTION 1: WHAT, WHEN, WHERE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <MapPin className="w-4 h-4 text-indigo-600" /> Operational Context & Location
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">DATE & TIME</span>
                <strong className="text-slate-900 dark:text-slate-100 text-xs block">{exception.date}</strong>
                <span className="text-slate-500 text-[10px] block">{exception.time}</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">LOCATION</span>
                <strong className="text-slate-900 dark:text-slate-100 text-xs block">{exception.location}</strong>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">RELATED ENTITY</span>
                <strong className="text-indigo-600 dark:text-indigo-400 text-xs block">
                  {exception.relatedEntityType}: {exception.relatedEntityId}
                </strong>
              </div>
            </div>

            {/* PLANNED VS ACTUAL DELAY */}
            {exception.plannedTime && (
              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 font-mono text-xs space-y-1">
                <span className="text-[10px] text-amber-600 font-bold uppercase block">SCHEDULE DEVIATION</span>
                <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                  <span>Planned: {exception.plannedTime} WIB</span>
                  <span className="text-amber-600">Actual: {exception.actualTime} WIB</span>
                </div>
                {exception.delayMinutes && exception.delayMinutes > 0 && (
                  <span className="text-amber-600 text-[10px] font-bold block">
                    ⚠️ Delay Duration: +{exception.delayMinutes} minutes
                  </span>
                )}
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1.5 font-mono">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">DESCRIPTION</span>
            <p className="text-slate-700 dark:text-slate-300 font-sans text-xs p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034]">
              {exception.description}
            </p>
          </div>

          {/* SECTION 2: WHO HANDLED IT */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <UserCheck className="w-4 h-4 text-indigo-600" /> Reporting & Personnel Accountability
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">REPORTED BY</span>
                <strong className="text-slate-900 dark:text-slate-100 block">{exception.reportedBy}</strong>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">ASSIGNED OPERATOR</span>
                <strong className="text-indigo-600 dark:text-indigo-400 block">{exception.assignedTo}</strong>
              </div>
            </div>
          </div>

          {/* SECTION 3: ACTION TAKEN & RESOLUTION */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Action Taken & Resolution Summary
            </h3>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
              <div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase block">
                  ACTION TAKEN
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-sans text-xs pt-0.5">
                  {exception.actionTaken || "Action logged and being processed."}
                </p>
              </div>

              {exception.resolution && (
                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/60">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase block">
                    RESOLUTION RESULT
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-sans text-xs pt-0.5">
                    {exception.resolution}
                  </p>
                </div>
              )}
            </div>

            {/* RECOVERY & COMPENSATION */}
            {exception.recoveryType && (
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162034] space-y-1 font-mono">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">RECOVERY ACTION RECORDED</span>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-purple-600 dark:text-purple-400">Action: {exception.recoveryType}</span>
                  {exception.recoveryCost && (
                    <span className="text-slate-900 dark:text-slate-100">
                      Additional Cost: Rp {exception.recoveryCost.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#162034] flex justify-between gap-2">
          {onOpenResolveModal && exception.status !== "Resolved" && exception.status !== "Closed" ? (
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenResolveModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Log Action & Resolve Issue
            </Button>
          ) : (
            <div />
          )}
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
