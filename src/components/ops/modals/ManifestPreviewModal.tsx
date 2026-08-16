"use client";

import React from "react";
import { Manifest, Tour, Vehicle, Crew } from "@/types/travelOps";
import { X, Printer, Compass, FileText, CheckCircle2, MapPin } from "lucide-react";

interface ManifestPreviewModalProps {
  manifest: Manifest | null;
  tours: Tour[];
  vehicles: Vehicle[];
  crews: Crew[];
  onClose: () => void;
}

export const ManifestPreviewModal: React.FC<ManifestPreviewModalProps> = ({
  manifest,
  tours,
  vehicles,
  crews,
  onClose,
}) => {
  if (!manifest) return null;

  const tour = tours.find((t) => t.id === manifest.tourId);
  const vehicle = vehicles.find((v) => v.id === manifest.vehicleId);
  const driver = crews.find((c) => c.id === manifest.driverId);
  const tourManager = crews.find((c) => c.id === manifest.tourManagerId);
  const guide = crews.find((c) => c.id === manifest.guideId);

  const totalPax = manifest.passengers.reduce((sum, p) => sum + p.pax, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl p-6 space-y-6 shadow-2xl my-8 animate-fade-in text-slate-100 font-sans">
        {/* Actions Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base text-white">Official Passenger Manifest Document</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Box */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-6 text-xs print:bg-white print:text-black">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-emerald-400" />
                <h1 className="text-lg font-extrabold text-white tracking-tight">
                  QIFESS <span className="text-emerald-400">TRAVEL OPERATIONS</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400">
                East Java & Bali Dispatch Operations Center | Headquarters Malang
              </p>
            </div>

            <div className="text-right">
              <div className="font-mono text-sm font-bold text-purple-400">{manifest.id}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Date Issued: {manifest.updatedAt.slice(0, 10)}</div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase mt-1">STATUS: {manifest.status}</div>
            </div>
          </div>

          {/* Tour & Route Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Tour Name</span>
              <span className="font-bold text-slate-100">{tour?.tourName || manifest.tourId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Route Corridor</span>
              <span className="font-semibold text-slate-200">{tour?.origin} → {tour?.dropOff}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Passenger Total</span>
              <span className="font-mono font-bold text-emerald-400">{totalPax} Pax</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Tour Date</span>
              <span className="font-mono font-semibold text-white">{tour?.date}</span>
            </div>
          </div>

          {/* Crew & Vehicle Assignment Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-purple-400">
              Assigned Operational Fleet & Crew
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">Vehicle Plate</span>
                <span className="font-mono font-bold text-amber-300">{vehicle?.plateNumber || "N/A"}</span>
                <div className="text-[10px] text-slate-400">{vehicle?.brand} {vehicle?.model}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Driver</span>
                <span className="font-semibold text-slate-100">{driver?.name || "Unassigned"}</span>
                <div className="text-[10px] text-slate-400">{driver?.phone}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tour Manager</span>
                <span className="font-semibold text-slate-100">{tourManager?.name || "Unassigned"}</span>
                <div className="text-[10px] text-slate-400">{tourManager?.phone}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Local Guide</span>
                <span className="font-semibold text-slate-100">{guide?.name || "Local Guide"}</span>
                <div className="text-[10px] text-slate-400">{guide?.phone}</div>
              </div>
            </div>
          </div>

          {/* Hotels & Ferry Tickets */}
          <div className="grid grid-cols-2 gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Accommodations Voucher</span>
              <span className="font-semibold text-slate-200">{manifest.hotel}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">ASDP Ferry & Transport Details</span>
              <span className="font-semibold text-cyan-400">{manifest.ferryDetails || "Ketapang - Gilimanuk Ferry"}</span>
            </div>
          </div>

          {/* Passenger Roster */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">
              Passenger Roster & Pickup Points
            </h4>
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <th className="p-2">No</th>
                  <th className="p-2">Guest Name</th>
                  <th className="p-2">Pax</th>
                  <th className="p-2">Passport</th>
                  <th className="p-2">Contact Phone</th>
                  <th className="p-2">Pickup Location</th>
                  <th className="p-2">Drop-Off</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {manifest.passengers.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="p-2 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-2 font-bold text-slate-100">
                      {p.greeting} {p.guestName}
                    </td>
                    <td className="p-2 font-mono font-bold text-emerald-400">{p.pax}</td>
                    <td className="p-2 font-semibold text-emerald-400">{p.passportStatus}</td>
                    <td className="p-2 font-mono text-slate-300">{p.phone}</td>
                    <td className="p-2 text-slate-300">{p.pickupLocation}</td>
                    <td className="p-2 text-slate-300">{p.dropOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-lg text-xs font-semibold"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
