"use client";

import React, { useState } from "react";
import { X, CheckCircle2, MapPin, Anchor, ArrowRight, UserCheck } from "lucide-react";

interface BmHandoverDetailDrawerProps {
  handover: any | null;
  onClose: () => void;
  onConfirmHandover?: (handoverId: string) => void;
}

export const BmHandoverDetailDrawer: React.FC<BmHandoverDetailDrawerProps> = ({
  handover: initialHandover,
  onClose,
  onConfirmHandover,
}) => {
  if (!initialHandover) return null;

  const [handover, setHandover] = useState(initialHandover);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleConfirm = () => {
    const updated = { ...handover, status: "Completed" };
    setHandover(updated);
    if (onConfirmHandover) onConfirmHandover(handover.id);
    setToastMsg(`Handover ${handover.id} confirmed successfully!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
      <div className="w-full max-w-xl bg-white dark:bg-[#101726] border-l border-[#E2E8F0] dark:border-[#1E293B] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
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
                <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-200 dark:border-purple-800/50">
                  {handover.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-[#60A5FA] border border-blue-200/60">
                  {handover.status}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
                {handover.tourName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inter-Region Direction Pill */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between text-xs font-bold">
            <span className="text-[#2563EB] dark:text-[#60A5FA]">{handover.fromRegion}</span>
            <div className="flex items-center gap-1 text-[#94A3B8]">
              <ArrowRight className="w-4 h-4" />
            </div>
            <span className="text-[#16A34A] dark:text-[#4ADE80]">{handover.toRegion}</span>
          </div>

          {/* Key Handover Fields */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Departure Time</span>
              <span className="font-mono font-bold text-[#0F172A] dark:text-white block">{handover.departureTime}</span>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Handover Target Time</span>
              <span className="font-mono font-bold text-[#2563EB] dark:text-[#60A5FA] block">{handover.handoverTime}</span>
            </div>
          </div>

          {/* Responsible Business Managers */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white block uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" /> Responsible Regional BMs
            </span>
            <span className="font-mono font-bold text-[#0F172A] dark:text-white text-xs block">
              {handover.responsibleBm}
            </span>
          </div>

          {/* Ferry & Manifest Ticket Status */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white block uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> ASDP Ferry Crossing & Ticket Status
            </span>
            <span className="font-semibold text-[#16A34A] dark:text-[#4ADE80]">
              {handover.ferryTicketStatus || "ASDP Boarding Pass Scanned & Verified"}
            </span>
          </div>

          {/* Handover Notes */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white block uppercase tracking-wider text-[10px]">
              Transfer & Operational Notes
            </span>
            <p className="text-[#475569] dark:text-[#94A3B8]">
              {handover.notes}
            </p>
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

          {handover.status !== "Completed" && (
            <button
              onClick={handleConfirm}
              className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Handover Supervision</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
