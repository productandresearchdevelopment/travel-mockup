"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { OperationalException, ExceptionStatus } from "@/types/operationalException";
import { CheckCircle2, ShieldCheck, Bell } from "lucide-react";

interface ResolveExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  exception: OperationalException | null;
  onSubmitResolution: (updatedData: {
    status: ExceptionStatus;
    actionTaken: string;
    resolution: string;
    recoveryType?: any;
    recoveryCost?: number;
    ownerNotified: boolean;
  }) => void;
}

export function ResolveExceptionModal({
  isOpen,
  onClose,
  exception,
  onSubmitResolution,
}: ResolveExceptionModalProps) {
  const [status, setStatus] = useState<ExceptionStatus>("Resolved");
  const [actionTaken, setActionTaken] = useState(
    exception?.actionTaken || "Driver contacted and guest informed immediately. Dispatcher reconfirmed pickup location."
  );
  const [resolution, setResolution] = useState(
    exception?.resolution || "Guest picked up cleanly and schedule adjusted."
  );
  const [recoveryType, setRecoveryType] = useState<string>("Replacement Vehicle");
  const [recoveryCost, setRecoveryCost] = useState<number>(750000);
  const [ownerNotified, setOwnerNotified] = useState<boolean>(exception?.ownerNotified || false);

  if (!isOpen || !exception) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitResolution({
      status,
      actionTaken,
      resolution,
      recoveryType: recoveryType as any,
      recoveryCost: Number(recoveryCost) || 0,
      ownerNotified,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Take Action & Resolve — ${exception.id}`}>
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">ISSUE SUMMARY</span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-xs block">
            {exception.type} ({exception.location})
          </span>
          <span className="text-slate-500 text-[10px] block">Severity: {exception.severity} · {exception.guestGroupName}</span>
        </div>

        <FormField label="Update Status *">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as ExceptionStatus)}
            options={[
              { value: "In Progress", label: "● In Progress (Action Being Taken)" },
              { value: "Resolved", label: "✓ Resolved (Issue Handled)" },
              { value: "Closed", label: "✓ Closed (Confirmed & Archived)" },
            ]}
          />
        </FormField>

        <FormField label="Action Taken *">
          <Textarea
            value={actionTaken}
            onChange={(e) => setActionTaken(e.target.value)}
            placeholder="Record exact operational action taken..."
          />
        </FormField>

        <FormField label="Resolution Summary *">
          <Input
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="e.g. Schedule adjusted smoothly"
          />
        </FormField>

        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20 space-y-3 font-mono">
          <span className="font-bold text-purple-700 dark:text-purple-300 text-xs block">
            RECOVERY & COMPENSATION ACTION
          </span>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Recovery Action">
              <Select
                value={recoveryType}
                onChange={(e) => setRecoveryType(e.target.value)}
                options={[
                  { value: "Replacement Vehicle", label: "Replacement Vehicle" },
                  { value: "Alternative Driver", label: "Alternative Driver" },
                  { value: "Train Ticket", label: "Train Ticket" },
                  { value: "Bus Ticket", label: "Bus Ticket" },
                  { value: "Refund", label: "Customer Refund" },
                  { value: "Voucher", label: "Service Voucher" },
                  { value: "Additional Cost", label: "Additional Ops Cost" },
                  { value: "Other", label: "Other Action" },
                ]}
              />
            </FormField>

            <FormField label="Additional Cost (Rp)">
              <Input
                type="number"
                value={recoveryCost}
                onChange={(e) => setRecoveryCost(Number(e.target.value))}
                placeholder="e.g. 750000"
              />
            </FormField>
          </div>
        </div>

        {/* OWNER NOTIFICATION TOGGLE */}
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 flex items-center justify-between font-mono">
          <div className="space-y-0.5">
            <span className="font-bold text-rose-600 dark:text-rose-400 text-xs block flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" /> OWNER NOTIFICATION INDICATOR
            </span>
            <span className="text-slate-500 text-[11px] block">Notify executive owner of critical issue/resolution.</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
            <input
              type="checkbox"
              checked={ownerNotified}
              onChange={(e) => setOwnerNotified(e.target.checked)}
              className="w-4 h-4 text-rose-600 rounded"
            />
            <span>Owner Notified</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Confirm Resolution
          </Button>
        </div>
      </form>
    </Modal>
  );
}
