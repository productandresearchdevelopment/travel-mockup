"use client";

import React, { useState } from "react";
import { X, CheckCircle2, XCircle, DollarSign, FileText, UserCheck, ShieldCheck } from "lucide-react";

interface FinanceBopDetailDrawerProps {
  bop: any | null;
  onClose: () => void;
  onUpdateBop?: (updated: any) => void;
}

export const FinanceBopDetailDrawer: React.FC<FinanceBopDetailDrawerProps> = ({
  bop: initialBop,
  onClose,
  onUpdateBop,
}) => {
  if (!initialBop) return null;

  const [bop, setBop] = useState(initialBop);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = () => {
    const updated = {
      ...bop,
      status: "Approved",
      paymentStatus: "Approved",
      approvalHistory: [
        ...(bop.approvalHistory || []),
        { approver: "Budi Santoso (BM)", action: "Approved", date: "2026-08-23 15:45 WIB" },
      ],
    };
    setBop(updated);
    if (onUpdateBop) onUpdateBop(updated);
    showToast(`BOP ${bop.id} approved successfully!`);
  };

  const handleReject = () => {
    const updated = {
      ...bop,
      status: "Rejected",
      paymentStatus: "Rejected",
      approvalHistory: [
        ...(bop.approvalHistory || []),
        { approver: "Budi Santoso (BM)", action: "Rejected", date: "2026-08-23 15:45 WIB" },
      ],
    };
    setBop(updated);
    if (onUpdateBop) onUpdateBop(updated);
    showToast(`BOP ${bop.id} rejected.`);
  };

  const handleMarkPaid = () => {
    const updated = {
      ...bop,
      status: "Paid",
      paymentStatus: "Paid",
    };
    setBop(updated);
    if (onUpdateBop) onUpdateBop(updated);
    showToast(`BOP ${bop.id} marked as PAID!`);
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
                <span className="font-mono text-xs font-bold text-[#16A34A] dark:text-[#4ADE80] bg-[#F0FDF4] dark:bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-200">
                  {bop.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    bop.status === "Paid" || bop.status === "Approved"
                      ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                      : bop.status === "Rejected"
                      ? "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                      : "bg-[#FFFBEB] text-[#B45309] border-amber-200"
                  }`}
                >
                  {bop.status}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
                BOP Disbursal Request — {bop.tour}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Disbursal Amount Header Card */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px] uppercase font-bold">
                Requested Field Allowance Amount
              </span>
              <div className="text-2xl font-mono font-extrabold text-[#16A34A] dark:text-[#4ADE80]">
                Rp {bop.amount.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Payment Settlement:</span>
              <span className="font-bold text-[#2563EB] dark:text-[#60A5FA]">{bop.paymentStatus || "Pending"}</span>
            </div>
          </div>

          {/* Request Information */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] block">
              Request Information & Purpose
            </span>
            <div className="space-y-1">
              <div>
                <span className="text-[#475569] dark:text-[#94A3B8]">Requester:</span>{" "}
                <span className="font-bold text-[#0F172A] dark:text-white">{bop.requester}</span>
              </div>
              <div>
                <span className="text-[#475569] dark:text-[#94A3B8]">Submission Date:</span>{" "}
                <span className="font-mono text-[#0F172A] dark:text-white">{bop.date}</span>
              </div>
              <div className="pt-1">
                <span className="text-[#475569] dark:text-[#94A3B8] block">Purpose / Justification:</span>
                <p className="font-medium text-[#0F172A] dark:text-white leading-relaxed">{bop.purpose}</p>
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] block">
              Supporting Verification Documents
            </span>
            <div className="space-y-1">
              {bop.supportingDocuments && bop.supportingDocuments.map((doc: string, idx: number) => (
                <div key={idx} className="bg-white dark:bg-[#101726] p-2 rounded border border-[#E2E8F0] flex items-center justify-between font-mono text-[11px]">
                  <span>📄 {doc}</span>
                  <span className="text-[#2563EB] font-bold">Verified</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approval History */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] block">
              Approval Trail & History
            </span>
            <div className="space-y-1">
              {bop.approvalHistory && bop.approvalHistory.map((hist: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-[#0F172A] dark:text-white">{hist.approver} ({hist.action})</span>
                  <span className="font-mono text-[#475569] dark:text-[#94A3B8]">{hist.date}</span>
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
            {bop.status !== "Approved" && bop.status !== "Paid" && (
              <>
                <button
                  onClick={handleReject}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Approve BOP
                </button>
              </>
            )}

            {bop.status === "Approved" && (
              <button
                onClick={handleMarkPaid}
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <DollarSign className="w-4 h-4" />
                <span>Mark Paid & Settle</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
