"use client";

import React from "react";
import { Tour, FinanceExpense, FinanceCategory } from "@/types/travelOps";
import { X, DollarSign } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl animate-fade-in text-xs font-sans text-[#172033] dark:text-[#F8FAFC]">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#4F8CFF] bg-[#EFF8FF] dark:bg-[rgba(83,177,253,0.12)] px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/40">
              {tour.id}
            </span>
            <h3 className="font-bold text-base text-[#172033] dark:text-white mt-1">Tour Operational Cost Breakdown</h3>
          </div>
          <button onClick={onClose} className="text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between font-mono">
          <span className="text-[#667085] dark:text-[#A7B1C0] text-xs">Total Disbursed Field Expenses:</span>
          <span className="text-base font-extrabold text-[#16A34A] dark:text-[#32D583]">
            Rp {totalCost.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="space-y-2">
          <span className="font-bold text-[#172033] dark:text-white block">Cost Category Breakdown</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => {
              const amt = categoryTotals[cat] || 0;
              return (
                <div key={cat} className="bg-[#F9FAFB] dark:bg-[#131D28] p-2.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] space-y-0.5">
                  <span className="text-[10px] text-[#667085] dark:text-[#A7B1C0] block font-semibold">{cat}</span>
                  <span className="font-mono font-bold text-xs text-[#172033] dark:text-white">
                    Rp {amt.toLocaleString("id-ID")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#E4E7EC] dark:border-[#202B38] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white font-bold cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
