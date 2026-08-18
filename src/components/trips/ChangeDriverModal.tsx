"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { mockDriversData } from "@/data/mockDrivers";
import { TransportSegment, DriverChangeEvent } from "@/types/transportSegment";
import { UserCheck, RefreshCw } from "lucide-react";

interface ChangeDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  segment: TransportSegment | null;
  onSubmitDriverChange: (eventData: Partial<DriverChangeEvent>) => void;
}

export function ChangeDriverModal({
  isOpen,
  onClose,
  segment,
  onSubmitDriverChange,
}: ChangeDriverModalProps) {
  const [newDriverId, setNewDriverId] = useState("drv-002");
  const [location, setLocation] = useState("Probolinggo");
  const [changeTime, setChangeTime] = useState("15:45");
  const [reason, setReason] = useState("Driver shift change after 8-hour driving limit");

  if (!isOpen || !segment) return null;

  const currentDriver = mockDriversData.find((d) => d.id === segment.driverId) || mockDriversData[0];
  const selectedNewDriver = mockDriversData.find((d) => d.id === newDriverId) || mockDriversData[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitDriverChange({
      tripId: segment.tripId,
      timestamp: `${segment.date} — ${changeTime} WIB`,
      location,
      previousDriverId: currentDriver.id,
      previousDriverName: currentDriver.fullName,
      newDriverId: selectedNewDriver.id,
      newDriverName: selectedNewDriver.fullName,
      reason,
      operator: "SDM Operations HQ",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Driver Assignment (Shift Handover)">
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">CURRENT DRIVER</span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm block">{currentDriver.fullName}</span>
          <span className="text-slate-500 text-[10px] block">Region: {currentDriver.region} · SIM B1 Commercial Valid</span>
        </div>

        <FormField label="New Driver (Driver Master) *">
          <Select
            value={newDriverId}
            onChange={(e) => setNewDriverId(e.target.value)}
            options={mockDriversData.map((d) => ({
              value: d.id,
              label: `${d.fullName} (${d.region}) — ${d.phone}`,
            }))}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Shift Handover Location *">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Probolinggo" />
          </FormField>

          <FormField label="Handover Time *">
            <Input type="time" value={changeTime} onChange={(e) => setChangeTime(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Reason for Shift Handover *">
          <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Driver shift change" />
        </FormField>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
            <UserCheck className="w-3.5 h-3.5 mr-1.5" /> Confirm Driver Shift Handover
          </Button>
        </div>
      </form>
    </Modal>
  );
}
