"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DailyWorkRecord, PaymentStatus } from "@/types/driverWorkManagement";
import { Clock, DollarSign, CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";

interface DriverWorkRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DailyWorkRecord | null;
  onSubmitRecord: (updatedData: {
    checkInTime: string;
    checkOutTime: string;
    overtimeHours: number;
    mealAllowance: number;
    paymentStatus: PaymentStatus;
    notes: string;
  }) => void;
}

export function DriverWorkRecordModal({
  isOpen,
  onClose,
  record,
  onSubmitRecord,
}: DriverWorkRecordModalProps) {
  const [checkIn, setCheckIn] = useState(record?.checkInTime || "07:30 WIB");
  const [checkOut, setCheckOut] = useState(record?.checkOutTime || "19:00 WIB");
  const [overtimeHours, setOvertimeHours] = useState<number>(record?.overtimeHours || 3.5);
  const [mealAllowance, setMealAllowance] = useState<number>(record?.mealAllowanceRupiah || 50000);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(record?.paymentStatus || "Pending Review");
  const [notes, setNotes] = useState(record?.notes || "Completed segment shift cleanly.");

  if (!isOpen || !record) return null;

  // Real-time calculation preview
  const baseRate = record.dailyRateRupiah; // 250,000
  const otRate = record.overtimeRatePerHour; // 30,000
  const otPay = overtimeHours * otRate;
  const netPay = baseRate + otPay + Number(mealAllowance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRecord({
      checkInTime: checkIn,
      checkOutTime: checkOut,
      overtimeHours: Number(overtimeHours),
      mealAllowance: Number(mealAllowance),
      paymentStatus,
      notes,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Driver Attendance & Payment Prep — ${record.driverName}`}>
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        {/* DRIVER SUMMARY HEADER */}
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-slate-900 dark:text-slate-100">{record.driverName} ({record.driverCode})</span>
            <span className="text-indigo-600 font-bold">{record.workerType} · {record.vehicleOwnership}</span>
          </div>
          <span className="text-slate-500 text-[11px] block">
            Trip: {record.tripCode} · Vehicle: {record.vehiclePlate} · Date: {record.date}
          </span>
        </div>

        {/* CHECK-IN / CHECK-OUT TIMESTAMPS */}
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Check In Time *">
            <Input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="07:30 WIB" />
          </FormField>

          <FormField label="Check Out Time *">
            <Input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="19:00 WIB" />
          </FormField>
        </div>

        {/* OVERTIME & ALLOWANCES */}
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
          <span className="font-bold text-indigo-700 dark:text-indigo-300 text-xs block">
            WORK COMPENSATION & OVERTIME ENGINE
          </span>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Overtime Hours (hrs)">
              <Input
                type="number"
                step="0.5"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(Number(e.target.value))}
              />
            </FormField>

            <FormField label="Meal Allowance (Rp)">
              <Input
                type="number"
                value={mealAllowance}
                onChange={(e) => setMealAllowance(Number(e.target.value))}
              />
            </FormField>
          </div>

          {/* CALCULATION PREVIEW */}
          <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Base Daily Rate (8 hrs):</span>
              <strong className="text-slate-900 dark:text-slate-100">Rp {baseRate.toLocaleString("id-ID")}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Overtime Pay ({overtimeHours} hrs @ Rp 30,000):</span>
              <strong className="text-indigo-600">Rp {otPay.toLocaleString("id-ID")}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Meal Allowance:</span>
              <strong className="text-emerald-600">Rp {Number(mealAllowance).toLocaleString("id-ID")}</strong>
            </div>
            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 flex justify-between font-extrabold text-xs text-indigo-600">
              <span>TOTAL NET PAY:</span>
              <span>Rp {netPay.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* PAYMENT STATUS */}
        <FormField label="Payment Preparation Status *">
          <Select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            options={[
              { value: "Draft", label: "● Draft" },
              { value: "Pending Review", label: "⏳ Pending Review" },
              { value: "Approved", label: "✓ Approved for Payment" },
              { value: "Paid", label: "💰 Paid (Disbursed)" },
            ]}
          />
        </FormField>

        {/* NOTES */}
        <FormField label="Operational Work Notes">
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Shift notes..." />
        </FormField>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Save Work Record & Pay Prep
          </Button>
        </div>
      </form>
    </Modal>
  );
}
