"use client";

import React from "react";
import { Tour, FinanceExpense, FinanceCategory } from "@/types/travelOps";
import { X, DollarSign, CheckCircle2, Clock, Tag } from "lucide-react";

interface TourCostDetailModalProps {
  isOpen: boolean;
  tour: Tour | null;
  expenses: FinanceExpense[];
  onClose: () => void;
}

export const TourCostDetailModal: React.FC<TourCostDetailModalProps> = ({
  isOpen,
  tour,
  expenses,
  onClose,
}) => {
  if (!isOpen || !tour) return null;

  const tourExpenses = expenses.filter((e) => e.tourId === tour.id);

  const categories: FinanceCategory[] = [
    "Ticket",
    "Jeep",
    "Guide",
    "Assist Guide",
    "Hotel",
    "Train",
    "Ferry",
    "Transport",
    "Other",
  ];

  const categoryTotals: { [key in FinanceCategory]?: number } = {};
  categories.forEach((cat) => {
    categoryTotals[cat] = tourExpenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
  });

  const totalCost = tourExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl p-6 space-y-5 shadow-2xl animate-fade-in text-xs font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {tour.id}
            </span>
            <h3 className="font-bold text-base text-white mt-1">Tour Operational Cost Breakdown</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex items-center justify-between font-mono">
          <div>
            <div className="font-bold text-white font-sans text-sm">{tour.tourName}</div>
            <div className="text-slate-400 text-[11px]">Date: {tour.date} | Pax: {tour.pax}</div>
          </div>
          <div className="text-right">
            <span className="text-slate-400 text-[10px] block">TOTAL COST</span>
            <span className="font-bold text-emerald-400 text-base">Rp {totalCost.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Category Breakdown Cards Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat) => {
            const amount = categoryTotals[cat] || 0;
            return (
              <div
                key={cat}
                className={`p-3 rounded-lg border text-xs space-y-1 ${
                  amount > 0 ? "bg-slate-950 border-slate-800" : "bg-slate-950/40 border-slate-850 opacity-60"
                }`}
              >
                <span className="text-slate-400 font-semibold text-[10px] block uppercase tracking-wider">{cat}</span>
                <span className="font-mono font-bold text-white block text-sm">
                  Rp {amount.toLocaleString("id-ID")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Detailed Items List */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">
            Itemized Field Receipts & Expenses ({tourExpenses.length} Claims)
          </span>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {tourExpenses.length === 0 ? (
              <div className="text-slate-500 italic text-center py-4">No field expense claims recorded yet.</div>
            ) : (
              tourExpenses.map((exp) => (
                <div key={exp.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-cyan-400 font-bold mr-2 text-[10px]">{exp.category}</span>
                    <span className="font-semibold text-slate-200">{exp.description}</span>
                    <div className="text-slate-400 text-[10px]">Requester: {exp.requesterName}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-white block">Rp {exp.amount.toLocaleString("id-ID")}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                        exp.paymentStatus === "Paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {exp.paymentStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg font-bold cursor-pointer"
          >
            Close Cost Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
