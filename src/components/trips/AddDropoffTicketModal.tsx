"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { DropoffRecord, DropoffMethod, TicketTransportType, TicketStatus } from "@/types/pickupDropoff";
import { Ticket, Train, Bus, Plane, Ship, CheckCircle2 } from "lucide-react";

interface AddDropoffTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDropoff: (newRecord: DropoffRecord) => void;
}

export function AddDropoffTicketModal({
  isOpen,
  onClose,
  onAddDropoff,
}: AddDropoffTicketModalProps) {
  const [method, setMethod] = useState<DropoffMethod>("Ticket");
  const [guestName, setGuestName] = useState("Rossella Cescon (+1 Guest)");
  const [groupName, setGroupName] = useState("GROUP A — Train Segment");
  const [pax, setPax] = useState(2);
  const [destination, setDestination] = useState("Banyuwangi (Ketapang Station)");
  const [transportType, setTransportType] = useState<TicketTransportType>("Train");
  const [provider, setProvider] = useState("KAI (Kereta Api Indonesia)");
  const [route, setRoute] = useState("Probolinggo → Banyuwangi");
  const [departureDate, setDepartureDate] = useState("2026-08-28");
  const [departureTime, setDepartureTime] = useState("19:30");
  const [arrivalDate, setArrivalDate] = useState("2026-08-28");
  const [arrivalTime, setArrivalTime] = useState("22:15");
  const [bookingReference, setBookingReference] = useState("KA-123456");
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>("Issued");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: DropoffRecord = {
      id: `do-${Date.now()}`,
      code: `DO-00${Math.floor(Math.random() * 90 + 10)}`,
      tripId: "trip-001",
      tripCode: "TRP-2026-00421",
      guestAssignmentId: "gta-001",
      guestName,
      groupName,
      pax: Number(pax),
      date: departureDate,
      destination,
      method,
      vehiclePlate: method === "Vehicle" ? "B 5678 ABC" : undefined,
      driverName: method === "Vehicle" ? "Budi Pratama" : undefined,
      plannedDropoffTime: method === "Vehicle" ? "18:30" : undefined,
      actualDropoffTime: method === "Vehicle" ? "18:42" : undefined,
      transportType: method === "Ticket" ? transportType : undefined,
      provider: method === "Ticket" ? provider : undefined,
      origin: method === "Ticket" ? route.split("→")[0]?.trim() || "Probolinggo" : undefined,
      route: method === "Ticket" ? route : undefined,
      departureDate: method === "Ticket" ? departureDate : undefined,
      departureTime: method === "Ticket" ? departureTime : undefined,
      arrivalDate: method === "Ticket" ? arrivalDate : undefined,
      arrivalTime: method === "Ticket" ? arrivalTime : undefined,
      bookingReference: method === "Ticket" ? bookingReference : undefined,
      bookingStatus: method === "Ticket" ? "Booked" : undefined,
      ticketStatus: method === "Ticket" ? ticketStatus : undefined,
      ticketAttachmentUrl: method === "Ticket" ? `https://tickets.example.com/${bookingReference}.pdf` : undefined,
      status: method === "Ticket" ? (ticketStatus === "Issued" ? "Ticket Issued" : "Scheduled") : "Completed",
      notes,
    };

    onAddDropoff(newRecord);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Drop-off Record / Purchase Ticket">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        <FormField label="Drop-off Method *">
          <Select
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            options={[
              { value: "Ticket", label: "Ticket-Based Transport (Train / Bus / Flight / Ferry)" },
              { value: "Vehicle", label: "Company Vehicle Drop-off" },
            ]}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Guest Name *">
            <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} />
          </FormField>
          <FormField label="Pax Count *">
            <Input type="number" value={pax} onChange={(e) => setPax(Number(e.target.value))} />
          </FormField>
        </div>

        <FormField label="Drop-off Destination *">
          <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Bali or Banyuwangi Station" />
        </FormField>

        {method === "Ticket" && (
          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 space-y-3 font-mono">
            <span className="font-bold text-purple-700 dark:text-purple-300 block text-xs flex items-center gap-1">
              <Ticket className="w-4 h-4" /> TICKET & TRANSPORTATION SPECIFICATIONS
            </span>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Transport Type">
                <Select
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value as any)}
                  options={[
                    { value: "Train", label: "Train (KAI Rail)" },
                    { value: "Bus", label: "Bus (DAMRI / Overland)" },
                    { value: "Ferry", label: "Ferry Crossing (Ferizy)" },
                    { value: "Flight", label: "Airline Flight" },
                  ]}
                />
              </FormField>

              <FormField label="Operator / Provider">
                <Input value={provider} onChange={(e) => setProvider(e.target.value)} placeholder="e.g. KAI / DAMRI" />
              </FormField>
            </div>

            <FormField label="Route">
              <Input value={route} onChange={(e) => setRoute(e.target.value)} placeholder="e.g. Probolinggo → Banyuwangi" />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Departure Date & Time">
                <div className="flex gap-1">
                  <Input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                  <Input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
                </div>
              </FormField>

              <FormField label="Arrival Date & Time">
                <div className="flex gap-1">
                  <Input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
                  <Input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
                </div>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Booking Reference Code">
                <Input value={bookingReference} onChange={(e) => setBookingReference(e.target.value)} placeholder="e.g. KA-123456" />
              </FormField>

              <FormField label="Ticket Status">
                <Select
                  value={ticketStatus}
                  onChange={(e) => setTicketStatus(e.target.value as any)}
                  options={[
                    { value: "Pending", label: "Pending Booking" },
                    { value: "Booked", label: "Booked (Unissued)" },
                    { value: "Issued", label: "Issued (Confirmed)" },
                    { value: "Completed", label: "Completed" },
                  ]}
                />
              </FormField>
            </div>
          </div>
        )}

        <FormField label="Operational Notes">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Special luggage requests or ticketing instructions..." />
        </FormField>

        <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Confirm Drop-off Record
          </Button>
        </div>
      </form>
    </Modal>
  );
}
