"use client";

import React, { useState, useMemo } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockDriversData } from "@/data/mockDrivers";
import { TransportSegment } from "@/types/transportSegment";
import { PlusCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AddSegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  tripCode: string;
  existingSegments: TransportSegment[];
  onSubmitAddSegment: (newSegment: TransportSegment) => void;
}

export function AddSegmentModal({
  isOpen,
  onClose,
  tripId,
  tripCode,
  existingSegments,
  onSubmitAddSegment,
}: AddSegmentModalProps) {
  const [origin, setOrigin] = useState("Probolinggo");
  const [destination, setDestination] = useState("Bali");
  const [date, setDate] = useState("2026-08-27");
  const [plannedDeparture, setPlannedDeparture] = useState("16:00");
  const [plannedArrival, setPlannedArrival] = useState("22:00");
  const [transportType, setTransportType] = useState<"Vehicle" | "Ticket">("Vehicle");

  const [vehicleId, setVehicleId] = useState("v-002");
  const [driverId, setDriverId] = useState("drv-002");
  const [guestGroupName, setGuestGroupName] = useState("GROUP A & B (10 Guests)");
  const [assignedPax, setAssignedPax] = useState(10);
  const [ticketReference, setTicketReference] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const selectedVehicle = mockVehiclesData.find((v) => v.id === vehicleId) || mockVehiclesData[0];
  const selectedDriver = mockDriversData.find((d) => d.id === driverId) || mockDriversData[0];

  // Conflict Check Simulation
  const vehicleConflict = useMemo(() => {
    if (transportType !== "Vehicle") return false;
    // Check if vehicleId is assigned in existingSegments on same date with overlapping times
    return existingSegments.some(
      (s) => s.vehicleId === vehicleId && s.date === date && s.status === "In Transit" && s.id !== "seg-002"
    );
  }, [vehicleId, date, transportType, existingSegments]);

  const driverConflict = useMemo(() => {
    if (transportType !== "Vehicle") return false;
    return driverId === "drv-002" && date === "2026-08-25"; // Simulating Budi conflict on 25 Aug
  }, [driverId, date, transportType]);

  // Capacity Check
  const capacityAvailable = selectedVehicle.passengerCapacity >= assignedPax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSeg: TransportSegment = {
      id: `seg-${Date.now().toString().slice(-3)}`,
      code: `SEG-0${existingSegments.length + 1}`,
      tripId,
      tripCode,
      origin,
      destination,
      date,
      plannedDeparture,
      plannedArrival,
      departureDelayMinutes: 0,
      arrivalDelayMinutes: 0,
      transportType,
      vehicleId: transportType === "Vehicle" ? selectedVehicle.id : undefined,
      vehiclePlate: transportType === "Vehicle" ? selectedVehicle.licensePlate : undefined,
      vehicleName: transportType === "Vehicle" ? selectedVehicle.name : undefined,
      vehicleCapacity: transportType === "Vehicle" ? selectedVehicle.passengerCapacity : undefined,
      driverId: transportType === "Vehicle" ? selectedDriver.id : undefined,
      driverName: transportType === "Vehicle" ? selectedDriver.fullName : undefined,
      driverPhone: transportType === "Vehicle" ? selectedDriver.phone : undefined,
      assignedGuestGroups: [guestGroupName],
      assignedPax,
      ticketReference: transportType === "Ticket" ? ticketReference || "KAI-98421" : undefined,
      status: "Scheduled",
      notes,
    };
    onSubmitAddSegment(newSeg);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Transport Segment">
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Origin Location *">
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. Yogyakarta" />
          </FormField>

          <FormField label="Destination Location *">
            <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Probolinggo" />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Segment Date *">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormField>

          <FormField label="Planned Departure *">
            <Input type="time" value={plannedDeparture} onChange={(e) => setPlannedDeparture(e.target.value)} />
          </FormField>

          <FormField label="Planned Arrival *">
            <Input type="time" value={plannedArrival} onChange={(e) => setPlannedArrival(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Transport Type *">
          <div className="flex items-center gap-4 text-xs font-bold pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="add-transport-type"
                value="Vehicle"
                checked={transportType === "Vehicle"}
                onChange={() => setTransportType("Vehicle")}
                className="w-4 h-4 text-indigo-600"
              />
              <span>Company Vehicle</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="add-transport-type"
                value="Ticket"
                checked={transportType === "Ticket"}
                onChange={() => setTransportType("Ticket")}
                className="w-4 h-4 text-purple-600"
              />
              <span>Purchased Ticket (Train / Bus / Flight / Ferry)</span>
            </label>
          </div>
        </FormField>

        {transportType === "Vehicle" ? (
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3 font-mono">
            <FormField label="Assigned Vehicle (Vehicle Master) *">
              <Select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                options={mockVehiclesData.map((v) => ({
                  value: v.id,
                  label: `${v.name} (${v.licensePlate}) — ${v.vendorName} (Cap: ${v.passengerCapacity} Pax)`,
                }))}
              />
            </FormField>

            {/* CAPACITY BADGE */}
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500">PAX Capacity Verification:</span>
              <Badge variant={capacityAvailable ? "emerald" : "danger"}>
                {capacityAvailable
                  ? `✓ Capacity Available (${assignedPax}/${selectedVehicle.passengerCapacity} Pax)`
                  : `⚠️ Capacity Exceeded (${assignedPax}/${selectedVehicle.passengerCapacity} Pax)`}
              </Badge>
            </div>

            {/* VEHICLE CONFLICT WARNING */}
            {vehicleConflict && (
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-sans text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4" /> ⚠️ VEHICLE CONFLICT: {selectedVehicle.licensePlate} is already assigned during this timeframe!
              </div>
            )}

            <FormField label="Assigned Driver (Driver Master) *">
              <Select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                options={mockDriversData.map((d) => ({
                  value: d.id,
                  label: `${d.fullName} (${d.region}) — ${d.phone}`,
                }))}
              />
            </FormField>

            {/* DRIVER CONFLICT WARNING */}
            {driverConflict && (
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-sans text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4" /> ⚠️ DRIVER CONFLICT: Driver {selectedDriver.fullName} is double-booked!
              </div>
            )}
          </div>
        ) : (
          <FormField label="Ticket Reference Code *">
            <Input
              value={ticketReference}
              onChange={(e) => setTicketReference(e.target.value)}
              placeholder="e.g. KA-123456 or FER-77219"
            />
          </FormField>
        )}

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Assigned Guest Group *">
            <Input value={guestGroupName} onChange={(e) => setGuestGroupName(e.target.value)} />
          </FormField>

          <FormField label="Assigned PAX Count *">
            <Input
              type="number"
              value={assignedPax}
              onChange={(e) => setAssignedPax(parseInt(e.target.value) || 1)}
            />
          </FormField>
        </div>

        <FormField label="Notes">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Segment instructions..." />
        </FormField>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={vehicleConflict || driverConflict}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Segment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
