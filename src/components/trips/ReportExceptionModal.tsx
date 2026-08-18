"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { OperationalException, ExceptionType, ExceptionSeverity } from "@/types/operationalException";
import { AlertTriangle, PlusCircle } from "lucide-react";

interface ReportExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  tripCode: string;
  onSubmitReport: (newException: OperationalException) => void;
}

export function ReportExceptionModal({
  isOpen,
  onClose,
  tripId,
  tripCode,
  onSubmitReport,
}: ReportExceptionModalProps) {
  const [type, setType] = useState<ExceptionType>("Pickup Delayed");
  const [severity, setSeverity] = useState<ExceptionSeverity>("Medium");
  const [location, setLocation] = useState("Hotel Santika Yogyakarta");
  const [guestGroupName, setGuestGroupName] = useState("GROUP A — Main Group (8 Guests)");
  const [guestPax, setGuestPax] = useState(8);
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("Dispatcher (Agus)");
  const [ownerNotified, setOwnerNotified] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExc: OperationalException = {
      id: `EXC-0${Math.floor(Math.random() * 900) + 100}`,
      tripId,
      tripCode,
      guestGroupName,
      guestPax,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      type,
      location,
      relatedEntityType: "Pickup",
      relatedEntityId: "pk-001",
      description,
      severity,
      reportedBy: "Dispatcher HQ",
      assignedTo,
      status: "Open",
      ownerNotified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmitReport(newExc);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report New Operational Exception">
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Exception Type *">
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as ExceptionType)}
              options={[
                { value: "Pickup Delayed", label: "Pickup Delayed" },
                { value: "Pickup Missed", label: "Pickup Missed" },
                { value: "Wrong Pickup Location", label: "Wrong Pickup Location" },
                { value: "Vehicle Breakdown", label: "Vehicle Breakdown" },
                { value: "Driver Late", label: "Driver Late" },
                { value: "Guest No-show", label: "Guest No-show" },
                { value: "Ticket Pending", label: "Ticket Pending" },
                { value: "Drop-off Delayed", label: "Drop-off Delayed" },
                { value: "Other", label: "Other Exception" },
              ]}
            />
          </FormField>

          <FormField label="Severity Level *">
            <Select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as ExceptionSeverity)}
              options={[
                { value: "Low", label: "○ Low (Minor deviation)" },
                { value: "Medium", label: "● Medium (15-30m delay)" },
                { value: "High", label: "⚠️ High (Resource issue)" },
                { value: "Critical", label: "🔴 Critical (Breakdown / Blocking)" },
              ]}
            />
          </FormField>
        </div>

        <FormField label="Location *">
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Hotel Santika Yogyakarta" />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Guest Group *">
            <Input value={guestGroupName} onChange={(e) => setGuestGroupName(e.target.value)} />
          </FormField>

          <FormField label="Assigned Operator *">
            <Input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Issue Description *">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what happened, when, where, and who was affected..."
          />
        </FormField>

        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 flex items-center justify-between font-mono">
          <span className="font-bold text-rose-600 dark:text-rose-400 text-xs">Send Executive Owner Notification</span>
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
          <Button variant="primary" type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Report Issue
          </Button>
        </div>
      </form>
    </Modal>
  );
}
