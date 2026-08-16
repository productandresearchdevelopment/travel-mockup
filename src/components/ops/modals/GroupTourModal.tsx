"use client";

import React, { useState } from "react";
import { Booking, Vehicle, Crew } from "@/types/travelOps";
import { X, Layers, Plus, CheckCircle2 } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-xl p-6 space-y-5 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Create Grouped Tour Departure</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Bookings Summary Pill */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
          <div className="flex items-center justify-between font-semibold text-slate-300">
            <span>Grouping {selectedBookingIds.length} Booking Records:</span>
            <span className="font-mono text-emerald-400 font-bold">{totalPax} Total Pax</span>
          </div>
          <div className="text-slate-400 truncate">
            IDs: {selectedBookingIds.join(", ")}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Operational Tour Name</label>
            <input
              type="text"
              required
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Tour Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Origin City</label>
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Destination Route</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Final Drop-Off Location</label>
              <input
                type="text"
                required
                value={dropOff}
                onChange={(e) => setDropOff(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Initial Vehicle & Driver Selection */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
              Initial Vehicle & Crew Matching (Optional)
            </span>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Vehicle</label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded p-1.5 focus:outline-none"
                >
                  <option value="">-- Assign Later --</option>
                  {vehicles
                    .filter((v) => v.status === "Available")
                    .map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.plateNumber} ({v.model} - {v.capacity} Pax)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Driver</label>
                <select
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded p-1.5 focus:outline-none"
                >
                  <option value="">-- Assign Later --</option>
                  {crews
                    .filter((c) => c.role === "Driver" && c.status === "Available")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.homeBase})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Local Guide</label>
                <select
                  value={guideId}
                  onChange={(e) => setGuideId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded p-1.5 focus:outline-none"
                >
                  <option value="">-- Assign Later --</option>
                  {crews
                    .filter((c) => c.role === "Local Guide" && c.status === "Available")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.homeBase})
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold shadow transition-colors"
            >
              Confirm Grouped Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
