"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { mockGuestsData } from "@/data/mockGuestsData";
import { mockTourPackagesData } from "@/data/mockTourPackagesData";
import { GuestGroup, GuestTripAssignment } from "@/types/guestAssignment";
import { UserCheck, Calendar, MapPin, Package, AlertCircle } from "lucide-react";

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: GuestGroup[];
  onAddGuest: (newGuestAssignment: GuestTripAssignment) => void;
}

export function AddGuestModal({
  isOpen,
  onClose,
  groups,
  onAddGuest,
}: AddGuestModalProps) {
  const [selectedGuestId, setSelectedGuestId] = useState(mockGuestsData[0]?.id || "");
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || "grp-a");
  const [joinLocation, setJoinLocation] = useState("Malang");
  const [joinDate, setJoinDate] = useState("2026-08-27");
  const [joinTime, setJoinTime] = useState("14:00");
  const [leaveLocation, setLeaveLocation] = useState("Bali");
  const [leaveDate, setLeaveDate] = useState("2026-08-29");
  const [leaveTime, setLeaveTime] = useState("18:30");
  const [selectedPackageId, setSelectedPackageId] = useState(mockTourPackagesData[3]?.id || "tp-004");
  const [paxCount, setPaxCount] = useState(2);
  const [isAddedMidTrip, setIsAddedMidTrip] = useState(true);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedMaster = mockGuestsData.find((g) => g.id === selectedGuestId) || mockGuestsData[0];
    const selectedGroup = groups.find((grp) => grp.id === selectedGroupId) || groups[0];
    const selectedPackage = mockTourPackagesData.find((tp) => tp.id === selectedPackageId) || mockTourPackagesData[0];

    const newAssignment: GuestTripAssignment = {
      id: `gta-${Date.now()}`,
      tripId: "trip-001",
      guestId: selectedMaster.id,
      guestCode: selectedMaster.code,
      guestName: selectedMaster.fullName,
      nationality: selectedMaster.nationality,
      passportNumber: selectedMaster.passportNumber,
      phone: selectedMaster.phone,
      pax: Number(paxCount) || 1,
      groupId: selectedGroup.id,
      groupName: selectedGroup.name.split(" — ")[0] || "GROUP B",
      joinLocation,
      joinDate,
      joinTime,
      leaveLocation,
      leaveDate,
      leaveTime,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      status: isAddedMidTrip ? "Added During Trip" : "Active",
      addedMidTrip: isAddedMidTrip,
      addedLocation: isAddedMidTrip ? joinLocation : undefined,
      addedDate: isAddedMidTrip ? `${joinDate} ${joinTime} WIB` : undefined,
      addedBy: "Dispatcher (Current Session)",
      transportAssignments: [
        {
          segmentId: `seg-${Date.now()}`,
          segmentName: `${joinLocation} → ${leaveLocation}`,
          fromLocation: joinLocation,
          toLocation: leaveLocation,
          transportType: "Vehicle",
          vehicleOrTicket: "Toyota HiAce #02 (B 5678 ABC)",
          vehiclePlate: "B 5678 ABC",
          driverName: "Budi Pratama",
          assignedPax: Number(paxCount) || 1,
          vehicleCapacity: 15,
        },
      ],
      notes,
    };

    onAddGuest(newAssignment);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Guest Assignment to Trip">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        {/* HELP INFO BOX */}
        <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 font-mono text-[11px] text-indigo-900 dark:text-indigo-300 flex items-start gap-2">
          <UserCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            Select existing guest from Guest Master. This preserves master guest records and allows mid-trip additions with custom tour packages.
          </span>
        </div>

        {/* FIELD 1: GUEST MASTER SELECTOR */}
        <FormField label="Select Guest from Master (Single Source of Truth) *">
          <Select
            value={selectedGuestId}
            onChange={(e) => setSelectedGuestId(e.target.value)}
            options={mockGuestsData.map((g) => ({
              value: g.id,
              label: `${g.fullName} (${g.nationality} · ${g.passportNumber} · Phone: ${g.phone})`,
            }))}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          {/* FIELD 2: GUEST GROUP */}
          <FormField label="Guest Group *">
            <Select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              options={groups.map((grp) => ({
                value: grp.id,
                label: grp.name,
              }))}
            />
          </FormField>

          {/* FIELD 3: PAX COUNT */}
          <FormField label="Pax Count *">
            <Input
              type="number"
              min={1}
              max={20}
              value={paxCount}
              onChange={(e) => setPaxCount(Number(e.target.value))}
            />
          </FormField>
        </div>

        {/* FIELD 4: TOUR PACKAGE MASTER SELECTOR */}
        <FormField label="Tour Package (Selected from Tour Package Master) *">
          <Select
            value={selectedPackageId}
            onChange={(e) => setSelectedPackageId(e.target.value)}
            options={mockTourPackagesData.map((tp) => ({
              value: tp.id,
              label: `${tp.code} — ${tp.name} (${tp.duration} · ${tp.type})`,
            }))}
          />
        </FormField>

        {/* JOIN LOCATION, DATE, TIME */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3">
          <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 block flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> JOIN JOURNEY DETAILS
          </span>
          <div className="grid grid-cols-3 gap-2">
            <FormField label="Join Location">
              <Input value={joinLocation} onChange={(e) => setJoinLocation(e.target.value)} placeholder="e.g. Malang" />
            </FormField>
            <FormField label="Join Date">
              <Input type="date" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
            </FormField>
            <FormField label="Join Time">
              <Input type="time" value={joinTime} onChange={(e) => setJoinTime(e.target.value)} />
            </FormField>
          </div>
        </div>

        {/* LEAVE LOCATION, DATE, TIME */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3">
          <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 block flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> LEAVE / DROP-OFF DETAILS
          </span>
          <div className="grid grid-cols-3 gap-2">
            <FormField label="Leave Location">
              <Input value={leaveLocation} onChange={(e) => setLeaveLocation(e.target.value)} placeholder="e.g. Bali" />
            </FormField>
            <FormField label="Leave Date">
              <Input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />
            </FormField>
            <FormField label="Leave Time">
              <Input type="time" value={leaveTime} onChange={(e) => setLeaveTime(e.target.value)} />
            </FormField>
          </div>
        </div>

        {/* ADDED MID-TRIP CHECKBOX */}
        <div className="flex items-center gap-2 font-mono text-xs pt-1">
          <input
            type="checkbox"
            id="midtrip"
            checked={isAddedMidTrip}
            onChange={(e) => setIsAddedMidTrip(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="midtrip" className="font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
            Identify visually as &quot;Added During Trip&quot; (Mid-trip Joiner)
          </label>
        </div>

        {/* NOTES */}
        <FormField label="Operational Assignment Notes">
          <Textarea
            placeholder="Special requests, pickup instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormField>

        {/* BUTTONS */}
        <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Confirm Guest Assignment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
