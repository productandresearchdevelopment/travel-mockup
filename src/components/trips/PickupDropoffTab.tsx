"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Clock,
  Truck,
  Ticket,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface PickupDropoffTabProps {
  tripId?: string;
}

export default function PickupDropoffTab({ tripId = "TRP-2026-00421" }: PickupDropoffTabProps) {
  const isSimpleTrip = tripId.toUpperCase().includes("00418");

  if (isSimpleTrip) {
    return (
      <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
        {/* SIMPLE TRIP PICKUP & DROP-OFF PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* PICKUP CARD */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1.5 uppercase">
                <MapPin className="w-4 h-4" /> PICKUP DETAILS
              </span>
              <Badge variant="emerald">✓ Completed</Badge>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">LOCATION</span>
                <strong className="text-sm font-extrabold text-slate-900 dark:text-white block">The Phoenix Hotel Yogyakarta</strong>
              </div>

              <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-xs">
                <span>Pickup Time: <strong className="text-slate-900 dark:text-white">07:00 WIB</strong></span>
                <span>Type: <strong className="text-blue-600 font-bold">Vehicle</strong></span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">PICKED UP GUESTS</span>
                <p className="text-slate-700 dark:text-slate-300 font-bold">James Anderson, Sophie Anderson (2 Guests)</p>
              </div>
            </div>
          </Card>

          {/* DROP-OFF CARD */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-extrabold text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1.5 uppercase">
                <Truck className="w-4 h-4" /> DROP-OFF DETAILS
              </span>
              <Badge variant="amber">Pending</Badge>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">LOCATION</span>
                <strong className="text-sm font-extrabold text-slate-900 dark:text-white block">The Phoenix Hotel Yogyakarta</strong>
              </div>

              <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-xs">
                <span>Expected Time: <strong className="text-slate-900 dark:text-white">18:30 WIB</strong></span>
                <span>Type: <strong className="text-blue-600 font-bold">Vehicle</strong></span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">DROP-OFF GUESTS</span>
                <p className="text-slate-700 dark:text-slate-300 font-bold">James Anderson, Sophie Anderson (2 Guests)</p>
                <span className="text-[10px] text-slate-400 italic block pt-1">Note: No ticket drop-off required for single day tour.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Complex Trip Pickup & Drop-off View
  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* PICKUP EVENTS SECTION */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1.5 uppercase">
            <MapPin className="w-4 h-4" /> PICKUP EVENTS (2 LOCATIONS)
          </span>
          <Badge variant="emerald">✓ All Pickups Completed</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* INITIAL PICKUP */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="emerald">✓ Initial Pickup</Badge>
              <span className="text-[10px] text-slate-400">25 Aug 2026 @ 06:30 WIB</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">The Phoenix Hotel Yogyakarta</strong>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Assigned Guests: <strong className="text-slate-900 dark:text-white">Initial 8 Guests (Michael Carter +7)</strong>
            </p>
            <p className="text-blue-600 font-bold text-[11px]">Vehicle: HiAce AB 4567 EF (Driver: Agus Santoso)</p>
          </div>

          {/* ADDITIONAL GUEST PICKUP */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="blue">✓ Additional Guest Pickup</Badge>
              <span className="text-[10px] text-slate-400">27 Aug 2026 @ 11:30 WIB</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">Malang Station</strong>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Assigned Guests: <strong className="text-blue-600">4 Additional Guests (Alessandro Rossi +3)</strong>
            </p>
            <p className="text-blue-600 font-bold text-[11px]">Mid-trip join location before Bromo/Ijen segment</p>
          </div>
        </div>
      </Card>

      {/* DROP-OFF EVENTS SECTION (VEHICLE vs TICKET DROP-OFF) */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
          <span className="font-extrabold text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1.5 uppercase">
            <Truck className="w-4 h-4" /> DROP-OFF EVENTS (VEHICLE & TICKET DROP-OFF)
          </span>
          <Badge variant="blue">2 Drop-off Cases Configured</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* MAIN VEHICLE DROP-OFF */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="blue">🚌 Vehicle Drop-off</Badge>
              <span className="text-[10px] text-slate-400">29 Aug 2026 @ 17:00 WIB</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">Seminyak, Bali</strong>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Assigned Guests: <strong className="text-slate-900 dark:text-white">10 Guests (Final Destination)</strong>
            </p>
            <p className="text-blue-600 font-bold text-[11px]">Vehicle: HiAce #02 (L 8901 GH) · Status: Scheduled</p>
          </div>

          {/* TICKET DROP-OFF CASE (BANYUWANGI TRAIN) */}
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20 space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="violet">🎫 Ticket Drop-off</Badge>
              <span className="text-[10px] text-purple-600 font-bold">Booked (Cost: Rp850,000)</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">Banyuwangi Station</strong>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Assigned Guests: <strong className="text-purple-600 font-bold">Thomas Brown & Sophia Brown (2 Guests)</strong>
            </p>
            <p className="text-purple-600 text-[11px] font-bold">
              Transport: KAI Train (Banyuwangi → Denpasar / Bali Connection)
            </p>
            <p className="text-slate-500 text-[10px] italic">
              Reason: Guests continue independently to next destination via train.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
