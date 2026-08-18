"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { VehicleRentalCostRecord } from "@/types/vendorRentalCost";
import { ShieldCheck, AlertTriangle, DollarSign } from "lucide-react";

interface EditRentalCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: VehicleRentalCostRecord | null;
  onSubmitCostChange: (data: {
    newBaseRate: number;
    newDriverCost: number;
    additionalCategory: string;
    additionalAmount: number;
    reason: string;
  }) => void;
}

export function EditRentalCostModal({
  isOpen,
  onClose,
  record,
  onSubmitCostChange,
}: EditRentalCostModalProps) {
  const [baseRate, setBaseRate] = useState<number>(record?.baseRentalRate || 1500000);
  const [driverCost, setDriverCost] = useState<number>(record?.driverCost || 300000);
  const [additionalCategory, setAdditionalCategory] = useState<string>("Overtime");
  const [additionalAmount, setAdditionalAmount] = useState<number>(100000);
  const [reason, setReason] = useState<string>("Emergency replacement vehicle & towing assistance at Probolinggo rest area");

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCostChange({
      newBaseRate: Number(baseRate),
      newDriverCost: Number(driverCost),
      additionalCategory,
      additionalAmount: Number(additionalAmount) || 0,
      reason,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Vendor Rental Cost & Fraud Audit Log">
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        {/* CURRENT COST SUMMARY */}
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">CURRENT ESTIMATED COST</span>
          <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 text-xs">
            <span>Vendor: {record.vendorName}</span>
            <span className="text-indigo-600">Current Cost: Rp {record.actualVendorCost.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Vendor Base Rental Rate (Rp) *">
            <Input
              type="number"
              value={baseRate}
              onChange={(e) => setBaseRate(Number(e.target.value))}
            />
          </FormField>

          <FormField label="Driver Cost Allowance (Rp) *">
            <Input
              type="number"
              value={driverCost}
              onChange={(e) => setDriverCost(Number(e.target.value))}
            />
          </FormField>
        </div>

        {/* LOG ADDITIONAL OPERATIONAL EXPENSE */}
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3 font-mono">
          <span className="font-bold text-indigo-700 dark:text-indigo-300 text-xs block">
            LOG ADDITIONAL OPERATIONAL EXPENSE
          </span>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Expense Category">
              <Select
                value={additionalCategory}
                onChange={(e) => setAdditionalCategory(e.target.value)}
                options={[
                  { value: "Overtime", label: "Overtime Allowance" },
                  { value: "Towing", label: "Towing / Rescue Fee" },
                  { value: "Fuel", label: "Fuel Expense" },
                  { value: "Parking", label: "Parking & Terminal" },
                  { value: "Toll", label: "Toll Highway Fee" },
                  { value: "Cleaning", label: "Vehicle Cleaning" },
                  { value: "Other", label: "Other Fee" },
                ]}
              />
            </FormField>

            <FormField label="Expense Amount (Rp)">
              <Input
                type="number"
                value={additionalAmount}
                onChange={(e) => setAdditionalAmount(Number(e.target.value))}
              />
            </FormField>
          </div>
        </div>

        {/* FRAUD PREVENTION MANDATORY REASON */}
        <FormField label="Reason for Price Change (Mandatory Fraud Audit Log) *">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why the vendor rate or additional cost was modified..."
          />
        </FormField>

        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-sans text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Fraud Prevention Rule: This price adjustment will be permanently logged under your username (Deni — Dispatcher).</span>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
            <DollarSign className="w-3.5 h-3.5 mr-1.5" /> Save Price Change & Audit Log
          </Button>
        </div>
      </form>
    </Modal>
  );
}
