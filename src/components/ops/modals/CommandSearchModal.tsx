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
  X,
  ChevronRight,
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
      v.brand.toLowerCase().includes(query.toLowerCase()) ||
      v.model.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCrews = initialCrews.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase()) ||
      c.homeBase.toLowerCase().includes(query.toLowerCase())
  );

  const pages = [
    { label: "Operation Control Center", path: "/dashboard", icon: Compass },
    { label: "Booking Inbox", path: "/bookings", icon: ShoppingBag },
    { label: "Dispatch & Deployment Board", path: "/dispatch", icon: Send },
    { label: "Fleet & Vehicles List", path: "/fleet", icon: Truck },
    { label: "Crew & SDM Roster", path: "/crew", icon: Users },
    { label: "Operational Finance & BOP", path: "/finance", icon: DollarSign },
    { label: "Reports & Analytics", path: "/reports", icon: BarChart3 },
  ].filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-slate-950/60 backdrop-blur-sm p-4 font-sans select-none animate-fade-in">
      <div className="w-full max-w-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-3.5 border-b dark:border-slate-800 border-slate-200 flex items-center gap-3">
          <Search className="w-4 h-4 dark:text-slate-400 text-slate-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours, bookings, vehicles, crew, or jump to page... (esc to exit)"
            className="w-full bg-transparent text-xs dark:text-slate-100 text-slate-900 focus:outline-none font-medium"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 border px-1.5 py-0.5 rounded dark:text-slate-400 text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
          {/* Quick Pages */}
          {pages.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest px-2 block">
                Workspaces & Pages
              </span>
              {pages.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(p.path)}
                    className="w-full flex items-center justify-between p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100 dark:text-slate-200 text-slate-800 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-500" />
                      <span className="font-semibold">{p.label}</span>
                    </div>
                    <span className="font-mono text-[10px] dark:text-slate-400 text-slate-500">{p.path}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bookings */}
          {filteredBookings.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest px-2 block">
                Bookings
              </span>
              {filteredBookings.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleSelect(`/bookings/${b.id}`)}
                  className="w-full flex items-center justify-between p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100 dark:text-slate-200 text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{b.id}</span>
                    <span>{b.guestName} ({b.product})</span>
                  </div>
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">{b.source}</span>
                </button>
              ))}
            </div>
          )}

          {/* Tours */}
          {filteredTours.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest px-2 block">
                Excursion Tours
              </span>
              {filteredTours.slice(0, 3).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(`/operations/${t.id}`)}
                  className="w-full flex items-center justify-between p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100 dark:text-slate-200 text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{t.id}</span>
                    <span>{t.tourName}</span>
                  </div>
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">{t.status}</span>
                </button>
              ))}
            </div>
          )}

          {/* Vehicles */}
          {filteredVehicles.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest px-2 block">
                Fleet Vehicles
              </span>
              {filteredVehicles.slice(0, 3).map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleSelect(`/fleet/vehicles/${v.id}`)}
                  className="w-full flex items-center justify-between p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100 dark:text-slate-200 text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-300">{v.plateNumber}</span>
                    <span>{v.brand} {v.model}</span>
                  </div>
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">{v.status}</span>
                </button>
              ))}
            </div>
          )}

          {/* Crew */}
          {filteredCrews.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest px-2 block">
                Crew & Roster
              </span>
              {filteredCrews.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/crew/${c.id}`)}
                  className="w-full flex items-center justify-between p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100 dark:text-slate-200 text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{c.name}</span>
                    <span>({c.role})</span>
                  </div>
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">{c.status}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2 border-t dark:border-slate-800 border-slate-200 dark:bg-slate-950/60 bg-slate-50 text-[10px] flex items-center justify-between dark:text-slate-400 text-slate-500">
          <span>QIFESS Command Search</span>
          <span className="flex items-center gap-1 font-mono">
            <Command className="w-3 h-3 text-cyan-500" /> K to toggle
          </span>
        </div>
      </div>
    </div>
  );
};
