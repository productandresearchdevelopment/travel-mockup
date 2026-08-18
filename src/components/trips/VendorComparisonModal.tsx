"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VendorQuotation } from "@/types/vendorRentalCost";
import { CheckCircle2, DollarSign, ShieldCheck } from "lucide-react";

interface VendorComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotations: VendorQuotation[];
  selectedQuotationId?: string;
  onSelectVendorQuotation: (quotationId: string, selectionReason: string) => void;
}

export function VendorComparisonModal({
  isOpen,
  onClose,
  quotations,
  selectedQuotationId = "qt-001",
  onSelectVendorQuotation,
}: VendorComparisonModalProps) {
  const [selectedId, setSelectedId] = useState<string>(selectedQuotationId);
  const [reason, setReason] = useState<string>("Lowest Cost & High Quality Rating");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectVendorQuotation(selectedId, reason);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compare Vendor Vehicle Quotations">
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <p className="text-slate-500 font-sans text-xs">
          Compare available vendor rental quotations for vehicle assignment. Select the optimal vendor based on cost, vehicle quality, and driver availability.
        </p>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#162034] text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Select</th>
                <th className="py-2.5 px-3">Vendor Name</th>
                <th className="py-2.5 px-3">Vehicle Type</th>
                <th className="py-2.5 px-3">Base Rental</th>
                <th className="py-2.5 px-3">Driver Cost</th>
                <th className="py-2.5 px-3">Total Vendor Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {quotations.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => setSelectedId(q.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedId === q.id
                      ? "bg-indigo-50/50 dark:bg-indigo-950/40 font-bold"
                      : "hover:bg-slate-50/50 dark:hover:bg-slate-900/40"
                  }`}
                >
                  <td className="py-3 px-3">
                    <input
                      type="radio"
                      name="vendor-quote-select"
                      checked={selectedId === q.id}
                      onChange={() => setSelectedId(q.id)}
                      className="w-4 h-4 text-indigo-600"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-slate-900 dark:text-slate-100 font-bold block">{q.vendorName}</span>
                    <span className="text-slate-400 text-[10px] block">Ref: {q.quotationNumber}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{q.vehicleType}</td>
                  <td className="py-3 px-3 text-slate-900 dark:text-slate-100">
                    Rp {q.baseRentalRate.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    {q.driverIncluded ? "Included" : `Rp ${q.driverCost.toLocaleString("id-ID")}`}
                  </td>
                  <td className="py-3 px-3 text-indigo-600 font-extrabold text-sm">
                    Rp {q.totalVendorCost.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SELECTION REASON */}
        <FormField label="Vendor Selection Reason (Accountability Audit) *">
          <Select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            options={[
              { value: "Lowest Cost & High Quality Rating", label: "Lowest Cost & High Quality Rating" },
              { value: "Immediate Vehicle Availability", label: "Immediate Vehicle Availability" },
              { value: "Preferred Fleet Vendor Contract", label: "Preferred Fleet Vendor Contract" },
              { value: "Superior Vehicle Condition", label: "Superior Vehicle Condition" },
              { value: "Customer / Group Specific Request", label: "Customer / Group Specific Request" },
            ]}
          />
        </FormField>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Confirm Selected Vendor
          </Button>
        </div>
      </form>
    </Modal>
  );
}
