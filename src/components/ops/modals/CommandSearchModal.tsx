"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initialBookings, initialTours, initialVehicles, initialCrews } from "@/data/mockData";
import {
  Search,
  Compass,
  ShoppingBag,
  Send,
  Truck,
  Users,
  DollarSign,
  BarChart3,
  Command,
} from "lucide-react";

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredBookings = initialBookings.filter(
    (b) =>
      b.id.toLowerCase().includes(query.toLowerCase()) ||
      b.guestName.toLowerCase().includes(query.toLowerCase()) ||
      b.product.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTours = initialTours.filter(
    (t) =>
      t.id.toLowerCase().includes(query.toLowerCase()) ||
      t.tourName.toLowerCase().includes(query.toLowerCase()) ||
      t.destination.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVehicles = initialVehicles.filter(
    (v) =>
      v.plateNumber.toLowerCase().includes(query.toLowerCase()) ||
      v.model.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCrews = initialCrews.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs animate-in fade-in p-4 text-xs font-sans"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#172230] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl shadow-2xl overflow-hidden text-[#172033] dark:text-[#F8FAFC]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E4E7EC] dark:border-[#202B38] flex items-center gap-3 bg-[#F9FAFB] dark:bg-[#131D28]">
          <Search className="w-5 h-5 text-[#98A2B3] dark:text-[#667085]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, tour ref, guest name, vehicle plate, or crew..."
            className="w-full bg-transparent text-sm font-medium text-[#172033] dark:text-white placeholder-[#98A2B3] dark:placeholder-[#667085] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-[#667085] dark:text-[#A7B1C0] bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] px-2 py-0.5 rounded">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>

        {/* Search Results / Navigation Options */}
        <div className="p-4 max-h-[420px] overflow-y-auto space-y-4 scrollbar-none">
          {/* Quick Navigation Links */}
          {!query && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#667085] dark:text-[#A7B1C0] uppercase tracking-wider block">
                Quick Navigation Shortcuts
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] text-left cursor-pointer transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />
                  <span className="font-semibold text-xs text-[#172033] dark:text-white">Dashboard</span>
                </button>
                <button
                  onClick={() => handleNavigate("/bookings")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] text-left cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />
                  <span className="font-semibold text-xs text-[#172033] dark:text-white">Bookings</span>
                </button>
                <button
                  onClick={() => handleNavigate("/operations")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] text-left cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4 text-[#16A34A] dark:text-[#32D583]" />
                  <span className="font-semibold text-xs text-[#172033] dark:text-white">Operations</span>
                </button>
                <button
                  onClick={() => handleNavigate("/fleet")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] text-left cursor-pointer transition-colors"
                >
                  <Truck className="w-4 h-4 text-[#D97706] dark:text-[#FDB022]" />
                  <span className="font-semibold text-xs text-[#172033] dark:text-white">Fleet</span>
                </button>
                <button
                  onClick={() => handleNavigate("/crew")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] text-left cursor-pointer transition-colors"
                >
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-xs text-[#172033] dark:text-white">Crew SDM</span>
                </button>
                <button
                  onClick={() => handleNavigate("/finance")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] text-left cursor-pointer transition-colors"
                >
                  <DollarSign className="w-4 h-4 text-[#16A34A] dark:text-[#32D583]" />
                  <span className="font-semibold text-xs text-[#172033] dark:text-white">Finance</span>
                </button>
              </div>
            </div>
          )}

          {/* Search Query Results */}
          {query && (
            <>
              {filteredTours.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#667085] dark:text-[#A7B1C0] uppercase tracking-wider block">
                    Matching Tours ({filteredTours.length})
                  </span>
                  {filteredTours.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleNavigate(`/operations/${t.id}`)}
                      className="p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{t.id}</span>
                        <div className="font-bold text-xs text-[#172033] dark:text-white">{t.tourName}</div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#667085] dark:text-[#A7B1C0]">{t.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredBookings.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#667085] dark:text-[#A7B1C0] uppercase tracking-wider block">
                    Matching Bookings ({filteredBookings.length})
                  </span>
                  {filteredBookings.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleNavigate(`/bookings/${b.id}`)}
                      className="p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] border border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{b.id}</span>
                        <div className="font-bold text-xs text-[#172033] dark:text-white">{b.guestName} ({b.pax} Pax)</div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#667085] dark:text-[#A7B1C0]">{b.source}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
