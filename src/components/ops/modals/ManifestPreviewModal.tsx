"use client";

import React from "react";
import { Manifest, Tour, Vehicle, Crew } from "@/types/travelOps";
import { X, Printer } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl w-full max-w-3xl p-6 space-y-6 shadow-2xl my-8 animate-fade-in text-[#172033] dark:text-[#F8FAFC] font-sans">
        {/* Actions Bar */}
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-4">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-base text-[#172033] dark:text-white">Official Passenger Manifest Document</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] dark:bg-[#32D583] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Box */}
        <div className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] p-6 rounded-xl space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-4">
            <div>
              <div className="font-extrabold text-lg text-[#172033] dark:text-white">QIFESS TRAVEL OPERATIONS</div>
              <div className="text-[11px] text-[#667085] dark:text-[#A7B1C0]">Official Passenger & Excursion Manifest</div>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="font-bold text-[#2563EB] dark:text-[#4F8CFF]">{manifest.id}</div>
              <div className="text-[#667085] dark:text-[#A7B1C0]">{manifest.updatedAt}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white dark:bg-[#101822] p-4 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
            <div>
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Tour Ref</span>
              <span className="font-bold font-mono text-[#2563EB] dark:text-[#4F8CFF]">{manifest.tourId}</span>
            </div>
            <div>
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Vehicle</span>
              <span className="font-bold text-[#172033] dark:text-white">{vehicle ? vehicle.plateNumber : manifest.vehicleId}</span>
            </div>
            <div>
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Driver</span>
              <span className="font-bold text-[#172033] dark:text-white">{driver ? driver.name : manifest.driverId}</span>
            </div>
            <div>
              <span className="text-[#667085] dark:text-[#A7B1C0] block">Total Pax</span>
              <span className="font-bold text-[#172033] dark:text-white font-mono">{totalPax} Passengers</span>
            </div>
          </div>

          {/* Passenger Table */}
          <div className="space-y-2">
            <span className="font-bold text-[#172033] dark:text-white block">Passenger Roster List</span>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-white dark:bg-[#101822] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Guest Name</th>
                  <th className="py-2 px-3">Pax</th>
                  <th className="py-2 px-3">Passport Status</th>
                  <th className="py-2 px-3">Drop Off</th>
                  <th className="py-2 px-3">Pickup Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
                {manifest.passengers.map((p, idx) => (
                  <tr key={idx} className="bg-white dark:bg-[#101822]">
                    <td className="py-2 px-3 font-mono font-semibold">{idx + 1}</td>
                    <td className="py-2 px-3 font-bold text-[#172033] dark:text-white">{p.greeting} {p.guestName}</td>
                    <td className="py-2 px-3 font-mono">{p.pax}</td>
                    <td className="py-2 px-3 font-mono text-[#667085] dark:text-[#A7B1C0]">{p.passportStatus}</td>
                    <td className="py-2 px-3 text-[#667085] dark:text-[#A7B1C0]">{p.dropOff}</td>
                    <td className="py-2 px-3 text-[#667085] dark:text-[#A7B1C0]">{p.pickupLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
