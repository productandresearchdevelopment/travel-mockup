"use client";

import React, { useState } from "react";
import { Booking, Vehicle, Crew } from "@/types/travelOps";
import { X, Layers } from "lucide-react";

interface GroupTourModalProps {
  isOpen: boolean;
  selectedBookingIds: string[];
  bookings: Booking[];
  vehicles: Vehicle[];
  crews: Crew[];
  onClose: () => void;
  onSubmitGroupTour: (data: {
    tourName: string;
    date: string;
    origin: string;
    destination: string;
    dropOff: string;
    bookingIds: string[];
    vehicleId?: string;
    driverId?: string;
    guideId?: string;
  }) => void;
}

export const GroupTourModal: React.FC<GroupTourModalProps> = ({
  isOpen,
  selectedBookingIds,
  bookings,
  vehicles,
  crews,
  onClose,
  onSubmitGroupTour,
}) => {
  if (!isOpen) return null;

  const targetBookings = bookings.filter((b) => selectedBookingIds.includes(b.id));
  const totalPax = targetBookings.reduce((sum, b) => sum + b.pax, 0);

  const [tourName, setTourName] = useState(`Bromo & Ijen Overland Group #${Math.floor(100 + Math.random() * 900)}`);
  const [date, setDate] = useState(targetBookings[0]?.tourDate || "2026-08-15");
  const [origin, setOrigin] = useState(targetBookings[0]?.origin || "Yogyakarta");
  const [destination, setDestination] = useState("Bromo -> Ijen -> Ketapang");
  const [dropOff, setDropOff] = useState(targetBookings[0]?.dropOff || "Bali");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const [guideId, setGuideId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitGroupTour({
      tourName,
      date,
      origin,
      destination,
      dropOff,
      bookingIds: selectedBookingIds,
      vehicleId: vehicleId || undefined,
      driverId: driverId || undefined,
      guideId: guideId || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl animate-fade-in font-sans text-[#172033] dark:text-[#F8FAFC]">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2563EB] dark:text-[#4F8CFF]" />
            <h3 className="font-bold text-base text-[#172033] dark:text-white">Create Consolidated Excursion Tour</h3>
          </div>
          <button onClick={onClose} className="text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#F9FAFB] dark:bg-[#131D28] p-3.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] text-xs space-y-1">
          <span className="font-semibold text-[#667085] dark:text-[#A7B1C0]">Selected Bookings ({targetBookings.length}):</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {targetBookings.map((b) => (
              <span key={b.id} className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] px-2 py-0.5 rounded font-mono text-[11px]">
                {b.id} ({b.pax} Pax)
              </span>
            ))}
          </div>
          <div className="pt-2 font-bold text-[#2563EB] dark:text-[#4F8CFF]">Total Group Size: {totalPax} Pax</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
          <div>
            <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Excursion Tour Name</label>
            <input
              type="text"
              required
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Tour Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
              />
            </div>
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Origin City</label>
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2.5 text-[#172033] dark:text-[#F8FAFC] font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Assigned Vehicle</label>
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2 text-[#172033] dark:text-[#F8FAFC]"
              >
                <option value="">-- Assign Later --</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>{v.plateNumber} ({v.brand})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1">Assigned Driver</label>
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl p-2 text-[#172033] dark:text-[#F8FAFC]"
              >
                <option value="">-- Assign Later --</option>
                {crews.filter((c) => c.role === "Driver").map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white border border-[#E4E7EC] dark:border-[#202B38] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white font-bold cursor-pointer shadow-xs"
            >
              Confirm Grouping
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
