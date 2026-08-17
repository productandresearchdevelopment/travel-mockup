"use client";

import React from "react";
import { X, CheckCircle2, MapPin, Truck, User, ShieldCheck } from "lucide-react";

interface BmTourDetailDrawerProps {
  tour: any | null;
  onClose: () => void;
}

export const BmTourDetailDrawer: React.FC<BmTourDetailDrawerProps> = ({ tour, onClose }) => {
  if (!tour) return null;

  const timelineSteps = [
    { key: "Booking", label: "Booking" },
    { key: "Planning", label: "Planning" },
    { key: "Deployment", label: "Deployment" },
    { key: "Departed", label: "Departed" },
    { key: "In Progress", label: "In Progress" },
    { key: "Arrived", label: "Arrived" },
    { key: "Completed", label: "Completed" },
  ];

  const getStepIndex = (status: string) => {
    if (status === "Ready" || status === "Planned") return 2;
    if (status === "Departed") return 3;
    if (status === "In Progress" || status === "On Trip" || status === "Handover" || status === "Attention") return 4;
    if (status === "Arrived") return 5;
    if (status === "Completed") return 6;
    return 1;
  };

  const currentStepIdx = getStepIndex(tour.status);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-[#101726] border-l border-[#E2E8F0] dark:border-[#1E293B] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] bg-[#EFF6FF] dark:bg-[#172A4A] px-2.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-900/40">
                  {tour.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] dark:bg-emerald-950/40 text-[#15803D] dark:text-[#4ADE80] border border-emerald-200/60">
                  {tour.status}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
                {tour.tourName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Operational Timeline Progress */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] block">
              Operational Lifecycle Timeline
            </span>
            <div className="flex items-center justify-between overflow-x-auto pt-2 pb-1 scrollbar-none">
              {timelineSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.key} className="flex flex-col items-center min-w-[70px] text-center space-y-1 relative">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                        isCurrent
                          ? "bg-[#2563EB] text-white ring-4 ring-blue-100 dark:ring-blue-900/50"
                          : isPassed
                          ? "bg-[#16A34A] text-white"
                          : "bg-[#E2E8F0] dark:bg-[#1E293B] text-[#94A3B8]"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <span className={`text-[10px] font-medium whitespace-nowrap ${isCurrent ? "font-bold text-[#2563EB] dark:text-[#60A5FA]" : isPassed ? "text-[#0F172A] dark:text-white" : "text-[#94A3B8]"}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Departure & Corridor Summary */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Departure & Origin</span>
              <div className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                <span>{tour.origin || "Surabaya Depot"}</span>
              </div>
              <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-mono font-bold block">{tour.departureTime || "02:30 WIB"}</span>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Destination Corridor</span>
              <div className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#16A34A] dark:text-[#4ADE80]" />
                <span>{tour.destination}</span>
              </div>
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] font-mono block">Pax Count: {tour.pax} Passengers</span>
            </div>
          </div>

          {/* Customer / Booking Summary */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white block uppercase tracking-wider text-[10px]">
              Customer & Ingestion Summary
            </span>
            <p className="text-[#475569] dark:text-[#94A3B8] font-medium leading-relaxed">
              {tour.customerSummary || "GetYourGuide VIP Excursion Group (12 Pax - Passport Verified)"}
            </p>
          </div>

          {/* Assigned Roster (Vehicle, Driver, Guide, TM) */}
          <div className="space-y-2">
            <span className="font-bold text-[#0F172A] dark:text-white text-xs block">
              Assigned Operational Roster
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-0.5">
                <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Vehicle</span>
                <span className="font-mono font-bold text-[#0F172A] dark:text-white text-[11px] truncate block">{tour.vehicle || "N/A"}</span>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-0.5">
                <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Lead Driver</span>
                <span className="font-bold text-[#0F172A] dark:text-white text-[11px] truncate block">{tour.driver || "N/A"}</span>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-0.5">
                <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Local Guide</span>
                <span className="font-bold text-[#0F172A] dark:text-white text-[11px] truncate block">{tour.guide || "N/A"}</span>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-0.5">
                <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Tour Manager</span>
                <span className="font-bold text-[#0F172A] dark:text-white text-[11px] truncate block">{tour.tourManager || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Operational Notes */}
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1 text-xs">
            <span className="font-bold text-[#0F172A] dark:text-white block uppercase tracking-wider text-[10px]">
              Operational Field Notes
            </span>
            <p className="text-[#475569] dark:text-[#94A3B8]">
              {tour.notes || "All 4x4 Jeep transfers and regional ferry boarding passes confirmed."}
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};
