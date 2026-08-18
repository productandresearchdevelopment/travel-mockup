"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  History,
  Clock,
  MapPin,
  Truck,
  Ticket,
  AlertTriangle,
  Compass,
  ArrowRight,
  Users,
  RefreshCw,
} from "lucide-react";

interface TripActivityTimelineProps {
  tripId: string;
}

export default function TripActivityTimeline({ tripId }: TripActivityTimelineProps) {
  const isSimpleTrip = tripId.toUpperCase().includes("00418");

  const simpleTimeline = [
    { time: "07:00 WIB", title: "Pickup Completed", description: "Picked up James Anderson & Sophie Anderson at The Phoenix Hotel Yogyakarta.", category: "Pickup", badge: "emerald" },
    { time: "08:00 WIB", title: "Trip Started", description: "HiAce AB 1234 CD departed from Yogyakarta toward Borobudur Temple.", category: "Trip", badge: "blue" },
    { time: "10:00 WIB", title: "Arrived Borobudur Temple", description: "Group arrived at Borobudur Temple main entrance.", category: "Checkpoint", badge: "emerald" },
    { time: "13:30 WIB", title: "Departed Borobudur", description: "Group departed Borobudur toward Prambanan Temple.", category: "Checkpoint", badge: "blue" },
    { time: "15:00 WIB", title: "Arrived Prambanan Temple", description: "Group exploring Prambanan Temple complex.", category: "Checkpoint", badge: "emerald" },
    { time: "18:30 WIB", title: "Expected Drop-off", description: "Return drop-off scheduled at The Phoenix Hotel Yogyakarta.", category: "Drop-off", badge: "amber" },
  ];

  const complexTimeline = [
    { date: "25 Aug 2026", time: "06:30 WIB", title: "Initial Pickup Completed", description: "Picked up 8 Initial Guests (Michael Carter +7) at The Phoenix Hotel Yogyakarta.", category: "Pickup", badge: "emerald" },
    { date: "25 Aug 2026", time: "07:00 WIB", title: "Segment 1 Trip Started", description: "Segment 1 started: Yogyakarta → Malang → Probolinggo via HiAce AB 4567 EF (Driver: Agus Santoso).", category: "Transport", badge: "blue" },
    { date: "27 Aug 2026", time: "11:30 WIB", title: "4 Additional Guests Added at Malang", description: "Alessandro Rossi (+3 Guests) joined the trip at Malang Station. Total PAX updated from 8 to 12.", category: "Guest", badge: "violet" },
    { date: "27 Aug 2026", time: "12:00 WIB", title: "Vehicle Changed at Probolinggo", description: "Vehicle swapped from HiAce AB 4567 EF to HiAce #02 (L 8901 GH) for East Java → Bali operation.", category: "Vehicle", badge: "purple" },
    { date: "27 Aug 2026", time: "12:05 WIB", title: "Driver Changed at Probolinggo", description: "Driver handover from Agus Santoso to Budi Pratama.", category: "Driver", badge: "violet" },
    { date: "28 Aug 2026", time: "16:00 WIB", title: "Banyuwangi Ticket Drop-off Prepared", description: "KAI Train tickets booked for Thomas Brown & Sophia Brown (Banyuwangi → Denpasar/Bali).", category: "Ticket", badge: "violet" },
    { date: "29 Aug 2026", time: "17:00 WIB", title: "Final Bali Drop-off Scheduled", description: "10 Guests vehicle drop-off scheduled at Seminyak, Bali.", category: "Drop-off", badge: "amber" },
  ];

  if (isSimpleTrip) {
    return (
      <div className="space-y-4 font-sans text-slate-800 dark:text-slate-200">
        <Card className="p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <History className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              SIMPLE TRIP ACTIVITY TIMELINE (BOROBUDUR & PRAMBANAN DAY TOUR)
            </h3>
          </div>

          <div className="space-y-3 border-l-2 border-slate-200 dark:border-slate-800 pl-4">
            {simpleTimeline.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] space-y-1 shadow-2xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.time}</span>
                    <span className="text-slate-400">•</span>
                    <strong className="text-slate-900 dark:text-white">{item.title}</strong>
                  </div>
                  <Badge variant={(item.badge as any) || "blue"}>{item.category}</Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-sans text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-200">
      <Card className="p-6 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              COMPLEX OVERLAND TRIP ACTIVITY TIMELINE
            </h3>
          </div>
          <Badge variant="blue">7 Event Logs</Badge>
        </div>

        <div className="space-y-3 border-l-2 border-slate-200 dark:border-slate-800 pl-4">
          {complexTimeline.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] space-y-1 shadow-2xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">{item.date}</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.time}</span>
                  <span className="text-slate-400">•</span>
                  <strong className="text-slate-900 dark:text-white">{item.title}</strong>
                </div>
                <Badge variant={(item.badge as any) || "blue"}>{item.category}</Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-sans text-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
