"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { GuestTripAssignment, GuestTransportSegmentAssignment } from "@/types/guestAssignment";
import { Truck, ShieldCheck, AlertTriangle, Train, CheckCircle2 } from "lucide-react";

interface AssignTransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: GuestTripAssignment | null;
  onSaveTransport: (updatedAssignment: GuestTripAssignment) => void;
}

export function AssignTransportModal({
  isOpen,
  onClose,
  assignment,
  onSaveTransport,
}: AssignTransportModalProps) {
  const [segmentName, setSegmentName] = useState("Probolinggo → Bali");
  const [transportType, setTransportType] = useState<"Vehicle" | "Train" | "Ferry" | "Flight">("Vehicle");
  const [vehicleOrTicket, setVehicleOrTicket] = useState("Toyota HiAce #02 (B 5678 ABC)");
  const [driverName, setDriverName] = useState("Budi Pratama");
  const [assignedPax, setAssignedPax] = useState(assignment?.pax || 4);
  const [vehicleCapacity, setVehicleCapacity] = useState(15);

  if (!isOpen || !assignment) return null;

  const isCapacityExceeded = assignedPax > vehicleCapacity;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const newSegment: GuestTransportSegmentAssignment = {
      segmentId: `seg-${Date.now()}`,
      segmentName,
      fromLocation: segmentName.split("→")[0]?.trim() || "Handover",
      toLocation: segmentName.split("→")[1]?.trim() || "Destination",
      transportType,
      vehicleOrTicket,
      vehiclePlate: transportType === "Vehicle" ? vehicleOrTicket.split("(")[1]?.replace(")", "") || "" : undefined,
      driverName: transportType === "Vehicle" ? driverName : undefined,
      assignedPax: Number(assignedPax),
      vehicleCapacity: Number(vehicleCapacity),
    };

    const updatedAssignment: GuestTripAssignment = {
      ...assignment,
      transportAssignments: [...assignment.transportAssignments, newSegment],
    };

    onSaveTransport(updatedAssignment);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Transport Segment — ${assignment.guestName}`}>
      <form onSubmit={handleConfirm} className="space-y-4 text-xs font-sans">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">TARGET GUEST ASSIGNMENT</span>
          <strong className="text-slate-900 dark:text-slate-100 text-sm block">{assignment.guestName} ({assignment.pax} Pax)</strong>
          <span className="text-slate-500 block">{assignment.groupName} · {assignment.joinLocation} → {assignment.leaveLocation}</span>
        </div>

        <FormField label="Segment Route Name *">
          <Input
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="e.g. Yogyakarta → Probolinggo or Probolinggo → Bali"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Transport Category *">
            <Select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value as any)}
              options={[
                { value: "Vehicle", label: "Vehicle (Bus / Van / Car)" },
                { value: "Train", label: "KAI Train Ticket" },
                { value: "Ferry", label: "Ferizy Ferry Crossing" },
                { value: "Flight", label: "Airline Flight" },
              ]}
            />
          </FormField>

          <FormField label="Vehicle / Ticket Name *">
            <Input
              value={vehicleOrTicket}
              onChange={(e) => setVehicleOrTicket(e.target.value)}
              placeholder="e.g. Toyota HiAce #02 (B 5678 ABC)"
            />
          </FormField>
        </div>

        {transportType === "Vehicle" && (
          <FormField label="Assigned Driver Name">
            <Input
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="e.g. Agus Santoso"
            />
          </FormField>
        )}

        {/* PAX CAPACITY VALIDATION SECTION */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-[#162034] font-mono">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block uppercase tracking-wider">
            PAX Capacity Validation
          </span>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Assigned Pax Count">
              <Input
                type="number"
                value={assignedPax}
                onChange={(e) => setAssignedPax(Number(e.target.value))}
              />
            </FormField>

            <FormField label="Vehicle / Transport Capacity">
              <Input
                type="number"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(Number(e.target.value))}
              />
            </FormField>
          </div>

          {/* VALIDATION STATUS BADGE */}
          <div className="pt-2">
            {!isCapacityExceeded ? (
              <div className="p-3 rounded-lg border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span className="font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ✓ Capacity Available
                </span>
                <span className="text-xs">
                  {assignedPax} of {vehicleCapacity} Pax ({vehicleCapacity - assignedPax} Seats Free)
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" /> ⚠️ Capacity Exceeded!
                  </span>
                  <span className="text-xs font-bold">
                    {assignedPax} Pax &gt; {vehicleCapacity} Capacity!
                  </span>
                </div>
                <p className="text-[11px] text-rose-700 dark:text-rose-300 font-sans">
                  Warning: Assigned passengers exceed maximum vehicle capacity. Dispatcher confirmation required before assigning.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={isCapacityExceeded ? "danger" : "primary"} type="submit">
            {isCapacityExceeded ? "Override & Confirm Transport" : "Confirm Transport Segment"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
