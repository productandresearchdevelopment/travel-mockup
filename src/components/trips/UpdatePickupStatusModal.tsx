"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PickupRecord, PickupStatus } from "@/types/pickupDropoff";
import { Clock, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";

interface UpdatePickupStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  pickup: PickupRecord | null;
  onSavePickup: (updatedPickup: PickupRecord) => void;
}

export function UpdatePickupStatusModal({
  isOpen,
  onClose,
  pickup,
  onSavePickup,
}: UpdatePickupStatusModalProps) {
  const [actualTime, setActualTime] = useState("");
  const [actualLocationName, setActualLocationName] = useState("");
  const [status, setStatus] = useState<PickupStatus>("Completed");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (pickup) {
      setActualTime(pickup.actualTime || "08:17");
      setActualLocationName(pickup.actualLocation?.name || pickup.plannedLocation.name);
      setStatus(pickup.status);
      setNotes(pickup.notes || "");
    }
  }, [pickup]);

  if (!isOpen || !pickup) return null;

  // Automated Delay Duration Calculation (Requirement 19, 20, 21)
  const calculateDelay = () => {
    if (!actualTime || !pickup.plannedTime) return { minutes: 0, label: "On Time", isDelayed: false };
    
    const [pMaxH, pMaxM] = pickup.plannedTime.split(":").map(Number);
    const [aMaxH, aMaxM] = actualTime.split(":").map(Number);

    const plannedMinutes = (pMaxH || 0) * 60 + (pMaxM || 0);
    const actualMinutes = (aMaxH || 0) * 60 + (aMaxM || 0);

    const diff = actualMinutes - plannedMinutes;

    if (diff > 5) {
      return { minutes: diff, label: `⚠️ Delayed +${diff} min`, isDelayed: true };
    } else if (diff < 0) {
      return { minutes: diff, label: `✓ Early ${diff} min`, isDelayed: false };
    } else {
      return { minutes: diff, label: `✓ On Time (${diff >= 0 ? `+${diff}` : diff} min)`, isDelayed: false };
    }
  };

  const delayInfo = calculateDelay();
  const hasMismatch = actualLocationName.trim().toLowerCase() !== pickup.plannedLocation.name.toLowerCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: PickupRecord = {
      ...pickup,
      actualTime,
      actualLocation: {
        ...pickup.plannedLocation,
        name: actualLocationName,
      },
      hasLocationMismatch: hasMismatch,
      delayMinutes: delayInfo.minutes,
      delayStatus: delayInfo.minutes > 5 ? "Delayed" : delayInfo.minutes < 0 ? "Early" : "On Time",
      status: status,
      notes,
    };

    onSavePickup(updated);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Pickup Event — ${pickup.code}`}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 font-bold block">TARGET PICKUP</span>
          <strong className="text-slate-900 dark:text-slate-100 text-sm block">{pickup.guestName} ({pickup.pax} Pax)</strong>
          <span className="text-slate-500 block">Planned: {pickup.plannedTime} @ {pickup.plannedLocation.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Planned Pickup Time">
            <Input value={pickup.plannedTime} disabled className="bg-slate-100 font-mono text-slate-500" />
          </FormField>

          <FormField label="Actual Pickup Time *">
            <Input
              type="time"
              value={actualTime}
              onChange={(e) => setActualTime(e.target.value)}
              className="font-mono font-bold text-indigo-600"
            />
          </FormField>
        </div>

        {/* AUTOMATED DELAY / EARLY DISPLAY BOX */}
        <div className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between ${
          delayInfo.isDelayed
            ? "border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
            : "border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
        }`}>
          <span className="font-bold">Automated Schedule Calculation:</span>
          <strong className="text-sm font-extrabold">{delayInfo.label}</strong>
        </div>

        {/* ACTUAL LOCATION (LOCATION MISMATCH DETECTOR) */}
        <div className="space-y-2">
          <FormField label="Actual Pickup Location Name *">
            <Input
              value={actualLocationName}
              onChange={(e) => setActualLocationName(e.target.value)}
              placeholder="e.g. Hotel Santika Yogyakarta"
            />
          </FormField>

          {hasMismatch && (
            <div className="p-2.5 rounded-lg border border-rose-300 bg-rose-50 text-rose-800 text-[11px] font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>⚠️ Location Mismatch! Planned location was &quot;{pickup.plannedLocation.name}&quot;.</span>
            </div>
          )}
        </div>

        {/* STATUS SELECTOR */}
        <FormField label="Pickup Operational Status *">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            options={[
              { value: "Scheduled", label: "Scheduled" },
              { value: "Driver Assigned", label: "Driver Assigned" },
              { value: "On The Way", label: "On The Way" },
              { value: "Arrived", label: "Arrived at Hotel / Pickup Point" },
              { value: "Guest Ready", label: "Guest Ready" },
              { value: "Picked Up", label: "Picked Up" },
              { value: "Completed", label: "Completed" },
              { value: "Delayed", label: "Delayed (+15m or higher)" },
              { value: "Missed", label: "Missed Pickup (Guest Not Found)" },
              { value: "Failed", label: "Failed / Cancelled" },
            ]}
          />
        </FormField>

        {/* NOTES */}
        <FormField label="Operational Notes / Delay Reason">
          <Textarea
            placeholder="Describe cause of delay, traffic conditions, or guest instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormField>

        <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Pickup Record
          </Button>
        </div>
      </form>
    </Modal>
  );
}
