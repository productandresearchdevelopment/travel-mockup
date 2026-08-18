"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockDriversData } from "@/data/mockDrivers";
import { TransportSegment, VehicleChangeEvent } from "@/types/transportSegment";
import { RefreshCw, Truck, AlertTriangle } from "lucide-react";

interface ChangeVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  segment: TransportSegment | null;
  onSubmitChange: (eventData: Partial<VehicleChangeEvent>) => void;
}

export function ChangeVehicleModal({
  isOpen,
  onClose,
  segment,
  onSubmitChange,
}: ChangeVehicleModalProps) {
  const [newVehicleId, setNewVehicleId] = useState("v-002");
  const [newDriverId, setNewDriverId] = useState("drv-002");
  const [location, setLocation] = useState("Probolinggo Handover Terminal");
  const [changeTime, setChangeTime] = useState("15:30");
  const [reason, setReason] = useState("Vehicle replacement for Bromo mountain climb & Bali overland segment");
  const [notes, setNotes] = useState("Luggage transferred cleanly from HiAce #01 to HiAce #02.");

  if (!isOpen || !segment) return null;

  const currentVehicle = mockVehiclesData.find((v) => v.id === segment.vehicleId) || mockVehiclesData[0];
  const currentDriver = mockDriversData.find((d) => d.id === segment.driverId) || mockDriversData[0];

  const selectedNewVehicle = mockVehiclesData.find((v) => v.id === newVehicleId) || mockVehiclesData[1];
  const selectedNewDriver = mockDriversData.find((d) => d.id === newDriverId) || mockDriversData[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitChange({
      tripId: segment.tripId,
      timestamp: `${segment.date} — ${changeTime} WIB`,
      location,
      previousVehicleId: currentVehicle.id,
      previousVehiclePlate: currentVehicle.licensePlate,
      newVehicleId: selectedNewVehicle.id,
      newVehiclePlate: selectedNewVehicle.licensePlate,
      previousDriverName: currentDriver.fullName,
      newDriverName: selectedNewDriver.fullName,
      reason,
      operator: "Dispatcher HQ",
      notes,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Vehicle & Driver Assignment">
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        {/* CURRENT ASSIGNMENT PREVIEW */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">CURRENT ASSIGNMENT (HISTORICAL PRESERVED)</span>
          <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 text-xs">
            <span>Vehicle: {currentVehicle.name} ({currentVehicle.licensePlate})</span>
            <span className="text-indigo-600">Driver: {currentDriver.fullName}</span>
          </div>
          <span className="text-slate-500 text-[10px] block">Segment: {segment.code} ({segment.origin} → {segment.destination})</span>
        </div>

        {/* NEW VEHICLE SELECTION */}
        <FormField label="New Vehicle (Vehicle Master) *">
          <Select
            value={newVehicleId}
            onChange={(e) => setNewVehicleId(e.target.value)}
            options={mockVehiclesData.map((v) => ({
              value: v.id,
              label: `${v.name} (${v.licensePlate}) — ${v.vendorName} (Cap: ${v.passengerCapacity} Pax)`,
            }))}
          />
        </FormField>

        {/* NEW DRIVER SELECTION */}
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
          <FormField label="Change Location *">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Probolinggo" />
          </FormField>

          <FormField label="Change Time *">
            <Input type="time" value={changeTime} onChange={(e) => setChangeTime(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Reason for Change *">
          <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Vehicle replacement" />
        </FormField>

        <FormField label="Operational Notes">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Luggage handover notes..." />
        </FormField>

        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-sans text-[11px] text-amber-800 dark:text-amber-300">
          <strong>Note:</strong> Historical vehicle assignment for {segment.code} ({currentVehicle.licensePlate}) will be preserved in audit logs.
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Confirm Vehicle Change
          </Button>
        </div>
      </form>
    </Modal>
  );
}
