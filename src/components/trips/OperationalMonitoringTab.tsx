"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  mockOperationalExceptionsData,
  mockOperationalHealthSummaryData,
  mockDailyOperationalEventsData,
} from "@/data/mockOperationalExceptionsData";
import {
  OperationalException,
  OperationalStatus,
  ExceptionSeverity,
  ExceptionStatus,
} from "@/types/operationalException";
import { ExceptionDetailDrawer } from "./ExceptionDetailDrawer";
import { ResolveExceptionModal } from "./ResolveExceptionModal";
import { ReportExceptionModal } from "./ReportExceptionModal";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Compass,
  Bell,
  PlusCircle,
  Filter,
  FileText,
  Activity,
  Calendar,
  Truck,
  Ticket,
  User,
} from "lucide-react";

interface OperationalMonitoringTabProps {
  tripId: string;
}

export default function OperationalMonitoringTab({ tripId }: OperationalMonitoringTabProps) {
  const [exceptions, setExceptions] = useState<OperationalException[]>(mockOperationalExceptionsData);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const [selectedException, setSelectedException] = useState<OperationalException | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Health summary metrics
  const summary = mockOperationalHealthSummaryData;

  // Filtered exceptions
  const filteredExceptions = useMemo(() => {
    if (filterCategory === "All") return exceptions;
    if (filterCategory === "Open") return exceptions.filter((e) => e.status === "Open");
    if (filterCategory === "In Progress") return exceptions.filter((e) => e.status === "In Progress");
    if (filterCategory === "Critical") return exceptions.filter((e) => e.severity === "Critical");
    if (filterCategory === "Delayed") return exceptions.filter((e) => e.type.includes("Delayed"));
    if (filterCategory === "Resolved") return exceptions.filter((e) => e.status === "Resolved" || e.status === "Closed");
    return exceptions;
  }, [exceptions, filterCategory]);

  const handleOpenDrawer = (exc: OperationalException) => {
    setSelectedException(exc);
    setIsDrawerOpen(true);
  };

  const handleOpenResolveModal = (exc: OperationalException) => {
    setSelectedException(exc);
    setIsResolveModalOpen(true);
  };

  const handleReportNewException = (newExc: OperationalException) => {
    setExceptions([newExc, ...exceptions]);
  };

  const handleUpdateResolution = (updatedData: {
    status: ExceptionStatus;
    actionTaken: string;
    resolution: string;
    recoveryType?: any;
    recoveryCost?: number;
    ownerNotified: boolean;
  }) => {
    if (!selectedException) return;
    setExceptions(
      exceptions.map((e) =>
        e.id === selectedException.id
          ? {
              ...e,
              status: updatedData.status,
              actionTaken: updatedData.actionTaken,
              resolution: updatedData.resolution,
              recoveryType: updatedData.recoveryType,
              recoveryCost: updatedData.recoveryCost,
              ownerNotified: updatedData.ownerNotified,
              ownerNotifiedAt: updatedData.ownerNotified ? new Date().toISOString() : e.ownerNotifiedAt,
              updatedAt: new Date().toISOString(),
            }
          : e
      )
    );
  };

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
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* OWNER VIEW OPERATIONAL HEALTH BAR (REQUIREMENTS 1 & 22) */}
      <Card className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-slate-800 text-white space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                EXECUTIVE OPERATIONAL HEALTH SUMMARY
              </h2>
              <span className="text-xs text-slate-400">Real-time trip operation tracking & issue monitoring</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">✓ 87% On Time</Badge>
            <Badge variant="danger">🔴 1 Critical Alert</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">ON TIME RATE</span>
            <strong className="text-xl font-extrabold text-emerald-400">{summary.onTimePercentage}%</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">DELAYED</span>
            <strong className="text-xl font-extrabold text-amber-400">{summary.delayedPercentage}%</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">AT RISK</span>
            <strong className="text-xl font-extrabold text-orange-400">{summary.atRiskPercentage}%</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">MISSED</span>
            <strong className="text-xl font-extrabold text-rose-400">{summary.missedPercentage}%</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">ACTIVE ISSUES</span>
            <strong className="text-xl font-extrabold text-blue-400">{summary.totalActiveIssues} Active</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-rose-900/60 bg-rose-950/20 space-y-1">
            <span className="text-[10px] text-rose-400 block font-bold uppercase">CRITICAL ALERTS</span>
            <strong className="text-xl font-extrabold text-rose-400">{summary.criticalIssues} Issue</strong>
          </div>
        </div>
      </Card>

      {/* DAILY OPERATIONAL BOARD (REQUIREMENT 23) */}
      <Card className="p-6 space-y-4 border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Daily Operational Board — 25 Aug 2026
            </h3>
          </div>
          <span className="text-xs text-slate-400">Chronological execution view</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs">
          {mockDailyOperationalEventsData.map((ev) => (
            <div
              key={ev.id}
              className={`p-3.5 rounded-xl border space-y-1 ${
                ev.status === "On Time" || ev.status === "Completed"
                  ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20"
                  : ev.status === "Delayed"
                  ? "border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#162034]"
              }`}
            >
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{ev.time}</span>
                <Badge
                  variant={
                    ev.status === "On Time" || ev.status === "Completed"
                      ? "emerald"
                      : ev.status === "Delayed"
                      ? "amber"
                      : "violet"
                  }
                >
                  {ev.status === "On Time" || ev.status === "Completed" ? `✓ ${ev.status}` : `⚠️ ${ev.status}`}
                </Badge>
              </div>

              <span className="font-bold text-slate-900 dark:text-slate-100 text-xs block">{ev.title}</span>
              <span className="text-slate-500 text-[10px] block">{ev.location} ({ev.pax} Pax)</span>
            </div>
          ))}
        </div>
      </Card>

      {/* OPERATIONAL EXCEPTION MANAGEMENT TABLE */}
      <div className="space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" /> Operational Exceptions & Issues ({exceptions.length})
            </h3>
            <span className="text-xs text-slate-400">
              Traceable problem log with resolution actions & owner notification indicators
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsReportModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Report Issue
          </Button>
        </div>

        {/* QUICK FILTERS */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {["All", "Open", "In Progress", "Critical", "Delayed", "Resolved"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all font-bold ${
                filterCategory === cat
                  ? "border-rose-600 bg-rose-600 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EXCEPTION TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#162034] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4">Issue ID / Type</th>
                <th className="py-3 px-4">Trip / Location</th>
                <th className="py-3 px-4">Related Entity</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Owner Notified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredExceptions.map((exc) => (
                <tr key={exc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm block">
                        {exc.id}
                      </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400 text-xs block">
                        {exc.type}
                      </span>
                      {exc.delayMinutes && exc.delayMinutes > 0 && (
                        <span className="text-amber-600 text-[10px] font-bold block">
                          ⚠️ +{exc.delayMinutes} min delay
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{exc.tripCode}</span>
                      <span className="text-slate-500 text-[11px] block">{exc.location}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {exc.relatedEntityType}: {exc.relatedEntityId}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">{getSeverityBadge(exc.severity)}</td>

                  <td className="py-3.5 px-4">{getStatusBadge(exc.status)}</td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">{exc.assignedTo}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    {exc.ownerNotified ? (
                      <Badge variant="danger" className="text-[10px]">
                        <Bell className="w-2.5 h-2.5 mr-1" /> Sent
                      </Badge>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Not Required</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px] font-bold"
                        onClick={() => handleOpenDrawer(exc)}
                      >
                        Details
                      </Button>
                      {exc.status !== "Resolved" && exc.status !== "Closed" && (
                        <Button
                          size="sm"
                          className="h-7 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                          onClick={() => handleOpenResolveModal(exc)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWERS AND MODALS */}
      <ExceptionDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        exception={selectedException}
        onOpenResolveModal={() => {
          setIsDrawerOpen(false);
          setIsResolveModalOpen(true);
        }}
      />

      <ResolveExceptionModal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        exception={selectedException}
        onSubmitResolution={handleUpdateResolution}
      />

      <ReportExceptionModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        tripId={tripId}
        tripCode="TRP-2026-00421"
        onSubmitReport={handleReportNewException}
      />
    </div>
  );
}
