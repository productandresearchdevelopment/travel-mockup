"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
} from "lucide-react";

interface TripGuestsTabProps {
  tripId?: string;
}

export default function TripGuestsTab({ tripId = "TRP-2026-00421" }: TripGuestsTabProps) {
  const isSimpleTrip = tripId.toUpperCase().includes("00418");

  // Simple Trip Dataset with real avatar photos
  const simpleGuests = [
    { id: "gst-s1", name: "James Anderson", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80", nationality: "United Kingdom", passport: "•••• 4892", package: "Borobudur & Prambanan Private Day Tour", status: "Complete" },
    { id: "gst-s2", name: "Sophie Anderson", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80", nationality: "United Kingdom", passport: "•••• 4893", package: "Borobudur & Prambanan Private Day Tour", status: "Complete" },
  ];

  // Complex Trip Datasets with real avatar photos
  const initialGuests = [
    { id: "cg-01", name: "Michael Carter", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80", nationality: "United Kingdom", passport: "•••• 9182", package: "East Java Explorer", status: "Active" },
    { id: "cg-02", name: "Emily Carter", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", nationality: "United Kingdom", passport: "•••• 9183", package: "East Java Explorer", status: "Active" },
    { id: "cg-03", name: "Daniel Wilson", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", nationality: "Australia", passport: "•••• 7721", package: "East Java Explorer", status: "Active" },
    { id: "cg-04", name: "Olivia Wilson", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80", nationality: "Australia", passport: "•••• 7722", package: "East Java Explorer", status: "Active" },
    { id: "cg-05", name: "Lucas Martin", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80", nationality: "France", passport: "•••• 3341", package: "East Java Explorer", status: "Active" },
    { id: "cg-06", name: "Emma Martin", avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80", nationality: "France", passport: "•••• 3342", package: "East Java Explorer", status: "Active" },
    { id: "cg-07", name: "Thomas Brown", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80", nationality: "United States", passport: "•••• 1092", package: "East Java Explorer", status: "Ticket Drop-off (Banyuwangi)", isTicketDropoff: true },
    { id: "cg-08", name: "Sophia Brown", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80", nationality: "United States", passport: "•••• 1093", package: "East Java Explorer", status: "Ticket Drop-off (Banyuwangi)", isTicketDropoff: true },
  ];

  const additionalGuests = [
    { id: "cg-09", name: "Alessandro Rossi", avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80", nationality: "Italy", passport: "•••• 5541", package: "East Java Explorer — Additional Joining Package", status: "Added Mid-Trip", additionPoint: "Malang", additionDate: "27 Aug 2026" },
    { id: "cg-10", name: "Giulia Rossi", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80", nationality: "Italy", passport: "•••• 5542", package: "East Java Explorer — Additional Joining Package", status: "Added Mid-Trip", additionPoint: "Malang", additionDate: "27 Aug 2026" },
    { id: "cg-11", name: "Marco Bianchi", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80", nationality: "Italy", passport: "•••• 8811", package: "East Java Explorer — Additional Joining Package", status: "Added Mid-Trip", additionPoint: "Malang", additionDate: "27 Aug 2026" },
    { id: "cg-12", name: "Elena Bianchi", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80", nationality: "Italy", passport: "•••• 8812", package: "East Java Explorer — Additional Joining Package", status: "Added Mid-Trip", additionPoint: "Malang", additionDate: "27 Aug 2026" },
  ];

  if (isSimpleTrip) {
    return (
      <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                GUEST MANIFEST (2 Guests)
              </h3>
            </div>
            <Badge variant="emerald">✓ Manifest Complete</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {simpleGuests.map((g, idx) => (
              <div key={g.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] flex items-start gap-3.5">
                <img
                  src={g.avatarUrl}
                  alt={g.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                />
                <div className="space-y-1 grow">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 dark:text-slate-100 text-sm font-bold">{idx + 1}. {g.name}</strong>
                    <Badge variant="emerald">✓ Complete</Badge>
                  </div>
                  <p className="text-slate-500 text-[11px]">{g.nationality} · Passport: {g.passport}</p>
                  <p className="text-blue-600 font-bold text-[11px]">Package: {g.package}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* COMPLEX TRIP MANIFEST SUMMARY BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-2xs">
          <span className="text-[10px] text-slate-500 block font-bold uppercase">INITIAL GUESTS</span>
          <strong className="text-xl font-extrabold text-slate-900 dark:text-white block">8 Guests</strong>
          <span className="text-[10px] text-slate-500 block">Yogyakarta Departure</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-blue-200/90 dark:border-blue-900/60 space-y-1 shadow-2xs">
          <span className="text-[10px] text-blue-600 block font-bold uppercase">ADDITIONAL GUESTS</span>
          <strong className="text-xl font-extrabold text-blue-600 block">+4 Guests</strong>
          <span className="text-[10px] text-blue-500 block">Joined at Malang (27 Aug)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-emerald-200/90 dark:border-emerald-900/60 space-y-1 shadow-2xs">
          <span className="text-[10px] text-emerald-600 block font-bold uppercase">CURRENT MANIFEST</span>
          <strong className="text-xl font-extrabold text-emerald-600 block">12 Guests Total</strong>
          <span className="text-[10px] text-emerald-500 block">100% Active</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#101726] border border-purple-200/90 dark:border-purple-900/60 space-y-1 shadow-2xs">
          <span className="text-[10px] text-purple-600 block font-bold uppercase">TICKET DROP-OFF</span>
          <strong className="text-xl font-extrabold text-purple-600 block">2 Guests</strong>
          <span className="text-[10px] text-purple-500 block">Banyuwangi Train Station</span>
        </div>
      </div>

      {/* GUEST DISTRIBUTION SUMMARY CARD */}
      <Card className="p-4 bg-blue-50/20 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 font-mono text-xs space-y-2">
        <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase text-xs block">
          GUEST DISTRIBUTION BREAKDOWN ACROSS SEGMENTS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
          <div><span className="text-slate-500 block">Segment 1 (Yk → Probolinggo):</span><strong className="text-slate-900 dark:text-white">8 Guests</strong></div>
          <div><span className="text-slate-500 block">Segment 2 (Probolinggo → Bali):</span><strong className="text-slate-900 dark:text-white">12 Guests</strong></div>
          <div><span className="text-slate-500 block">Banyuwangi Ticket Drop-off:</span><strong className="text-purple-600 font-bold">2 Guests (Thomas & Sophia)</strong></div>
          <div><span className="text-slate-500 block">Final Bali Vehicle Drop-off:</span><strong className="text-emerald-600 font-bold">10 Guests</strong></div>
        </div>
      </Card>

      {/* INITIAL GUESTS SECTION WITH REAL AVATAR PHOTOS */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="blue">INITIAL GUESTS (8 PAX)</Badge>
            <span className="text-slate-500">Package: East Java Explorer</span>
          </div>
          <span className="text-slate-400 text-[11px]">Yogyakarta Pickup</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 font-mono text-xs">
          {initialGuests.map((g, idx) => (
            <div key={g.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] flex items-center gap-3">
              <img
                src={g.avatarUrl}
                alt={g.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
              />
              <div className="space-y-0.5 min-w-0">
                <strong className="text-slate-900 dark:text-white block font-bold truncate">{idx + 1}. {g.name}</strong>
                <span className="text-slate-500 text-[10px] block">{g.nationality} · {g.passport}</span>
                {g.isTicketDropoff ? (
                  <Badge variant="violet" className="text-[9px]">🎫 Ticket Drop-off</Badge>
                ) : (
                  <Badge variant="emerald" className="text-[9px]">✓ Vehicle to Bali</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ADDITIONAL GUESTS SECTION WITH REAL AVATAR PHOTOS */}
      <Card className="p-5 space-y-4 border-blue-200 dark:border-blue-900/60 bg-blue-50/10 dark:bg-blue-950/10">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="blue">+4 GUESTS ADDED MID-TRIP</Badge>
            <span className="text-blue-600 font-bold">Package: East Java Explorer — Additional Joining Package</span>
          </div>
          <span className="text-blue-600 font-bold text-[11px]">Joined at Malang on 27 Aug 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 font-mono text-xs">
          {additionalGuests.map((g, idx) => (
            <div key={g.id} className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-[#101726] flex items-center gap-3">
              <img
                src={g.avatarUrl}
                alt={g.name}
                className="w-10 h-10 rounded-full object-cover border border-blue-200 dark:border-blue-800 shadow-2xs shrink-0"
              />
              <div className="space-y-0.5 min-w-0">
                <strong className="text-slate-900 dark:text-white block font-bold truncate">{idx + 9}. {g.name}</strong>
                <span className="text-slate-500 text-[10px] block">{g.nationality} · {g.passport}</span>
                <span className="text-blue-600 text-[10px] font-bold block">Joined at Malang Stn</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
