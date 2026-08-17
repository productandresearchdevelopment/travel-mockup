"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Camera, UserCheck } from "lucide-react";

interface SdmFieldReportDetailDrawerProps {
  report: any | null;
  onClose: () => void;
  onUpdateReport?: (updated: any) => void;
}

export const SdmFieldReportDetailDrawer: React.FC<SdmFieldReportDetailDrawerProps> = ({
  report: initialReport,
  onClose,
  onUpdateReport,
}) => {
  if (!initialReport) return null;

  const [report, setReport] = useState(initialReport);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAcknowledge = () => {
    const updated = { ...report, status: "Acknowledged" };
    setReport(updated);
    if (onUpdateReport) onUpdateReport(updated);
    showToast(`Field report ${report.id} acknowledged!`);
  };

  const handleEscalate = () => {
    const updated = { ...report, status: "Escalated" };
    setReport(updated);
    if (onUpdateReport) onUpdateReport(updated);
    showToast(`Field report ${report.id} escalated to Business Manager!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-[#101726] border-l border-[#E2E8F0] dark:border-[#1E293B] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Toast */}
          {toastMsg && (
            <div className="bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-200">
                  {report.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    report.status === "Acknowledged"
                      ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                      : report.status === "Escalated"
                      ? "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                      : "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
                Field Report — {report.tour}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Submitted By & Role */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Submitted By: {report.submittedBy} ({report.role})</span>
            </div>
            <span className="font-mono text-[11px] text-[#475569] dark:text-[#94A3B8]">{report.date}</span>
          </div>

          {/* Report Summary */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] block">
              Operational Field Summary
            </span>
            <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Issues & Resolution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#FFFBEB] dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-300 text-[10px] uppercase block">
                Operational Issue Encountered
              </span>
              <p className="text-[#0F172A] dark:text-white font-medium">{report.issue}</p>
            </div>

            <div className="bg-[#F0FDF4] dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/40 space-y-1">
              <span className="font-bold text-[#15803D] dark:text-[#4ADE80] text-[10px] uppercase block">
                Field Resolution / Action Taken
              </span>
              <p className="text-[#0F172A] dark:text-white font-medium">{report.resolution}</p>
            </div>
          </div>

          {/* Photos / Attachments */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-3 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#2563EB]" /> Verified Field Attachments ({report.attachmentCount})
            </span>

            <div className="grid grid-cols-3 gap-2">
              {report.photos && report.photos.map((photo: string, idx: number) => (
                <div key={idx} className="bg-[#0B111A] p-3 rounded-lg border border-[#1E293B] text-center text-[10px] font-mono text-slate-300 truncate">
                  📷 {photo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#1E293B] font-bold text-xs cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEscalate}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Escalate to BM
            </button>
            <button
              onClick={handleAcknowledge}
              className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Acknowledge Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
