"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TransportSegment, VehicleChangeEvent, DriverChangeEvent } from "@/types/transportSegment";
import {
  Truck,
  User,
  Clock,
  MapPin,
  RefreshCw,
  Compass,
} from "lucide-react";

interface TransportTabProps {
  tripId: string;
}

export default function TransportTab({ tripId }: TransportTabProps) {
  const isSimpleTrip = tripId.toUpperCase().includes("00418");

  // Simple Trip Dataset with real driver & vehicle photos
  const simpleTransportData = {
    vehicleName: "Toyota HiAce",
    vehiclePlate: "AB 1234 CD",
    vehicleImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80",
    driverName: "Agus Santoso",
    driverAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    driverPhone: "+62 812-3456-7890",
    vendorName: "Jogja Trans",
    route: "Yogyakarta → Borobudur → Prambanan → Yogyakarta",
    status: "Assigned",
    departureTime: "07:00 WIB",
    expectedReturnTime: "18:30 WIB",
    paxCount: 2,
    guestNames: "James Anderson, Sophie Anderson",
  };

  // Complex Trip Datasets
  const [vehicleChanges] = useState<VehicleChangeEvent[]>([
    {
      id: "vce-001",
      tripId: "TRP-2026-00421",
      timestamp: "27 Aug 2026 — 12:00 WIB",
      location: "Probolinggo",
      previousVehicleId: "v-001",
      previousVehiclePlate: "AB 4567 EF",
      newVehicleId: "v-002",
      newVehiclePlate: "L 8901 GH",
      previousDriverName: "Agus Santoso",
      newDriverName: "Budi Pratama",
      reason: "Regional vehicle handover for East Java → Bali operation.",
      operator: "Dispatcher HQ",
      notes: "Completed smoothly at Probolinggo vehicle depot.",
    },
  ]);

  const [driverChanges] = useState<DriverChangeEvent[]>([
    {
      id: "dce-001",
      tripId: "TRP-2026-00421",
      timestamp: "27 Aug 2026 — 12:05 WIB",
      location: "Probolinggo",
      previousDriverId: "drv-001",
      previousDriverName: "Agus Santoso",
      newDriverId: "drv-002",
      newDriverName: "Budi Pratama",
      reason: "Driver handover.",
      operator: "SDM HQ",
    },
  ]);

  // If Simple Trip, render single clean transport view
  if (isSimpleTrip) {
    return (
      <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
        <Card className="p-6 space-y-5 border-blue-200 dark:border-blue-900/60 bg-white dark:bg-[#101726]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                TRANSPORT ASSIGNMENT
              </h2>
            </div>
            <Badge variant="emerald">✓ {simpleTransportData.status}</Badge>
          </div>

          {/* CLEAN SINGLE VEHICLE DETAILS WITH REAL PHOTO AVATARS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={simpleTransportData.vehicleImage}
                  alt={simpleTransportData.vehicleName}
                  className="w-16 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                />
                <div className="grow">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">
                    {simpleTransportData.vehicleName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold text-xs inline-block mt-0.5">
                    {simpleTransportData.vehiclePlate}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
                <img
                  src={simpleTransportData.driverAvatar}
                  alt={simpleTransportData.driverName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">ASSIGNED DRIVER</span>
                  <strong className="text-slate-900 dark:text-white font-bold text-xs block">{simpleTransportData.driverName}</strong>
                  <span className="text-slate-500 text-[11px] block">{simpleTransportData.driverPhone} · {simpleTransportData.vendorName}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-xs block">
                ROUTE & SCHEDULE
              </span>

              <div className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
                <p className="font-bold text-blue-600 dark:text-blue-400">📍 Route: {simpleTransportData.route}</p>
                <p>• Departure: <strong className="text-slate-900 dark:text-slate-100">{simpleTransportData.departureTime}</strong></p>
                <p>• Expected Return: <strong className="text-slate-900 dark:text-slate-100">{simpleTransportData.expectedReturnTime}</strong></p>
              </div>

              <div className="pt-1 flex justify-end">
                <Link href="/dispatch/tracking">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                    <Compass className="w-3.5 h-3.5 mr-1" /> Live Tracking
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Complex Trip Multi-Segment View
  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* COMPLEX TRIP HEADER WITH DRIVER AVATARS & VEHICLE PHOTOS */}
      <Card className="p-5 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-blue-100 dark:border-blue-900/50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              TRANSPORT (2 Segments)
            </h2>
          </div>
          <Badge variant="blue">Multi-Segment Overland</Badge>
        </div>

        {/* 2 SEGMENT CARDS DISPLAY WITH REAL AVATAR PHOTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* SEGMENT 1 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] space-y-3">
            <div className="flex justify-between items-center">
              <Badge variant="emerald">SEGMENT 1 · Completed</Badge>
              <span className="text-[10px] text-slate-400">25 Aug 2026</span>
            </div>
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
              Yogyakarta → Malang → Probolinggo
            </h3>
            
            <div className="flex items-center gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80"
                alt="Toyota HiAce"
                className="w-14 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="space-y-0.5">
                <p className="text-slate-900 dark:text-slate-100 font-bold text-xs">Toyota HiAce (AB 4567 EF)</p>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                    alt="Agus Santoso"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Agus Santoso · Jogja Trans (8 Guests)</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEGMENT 2 */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-[#101726] space-y-3">
            <div className="flex justify-between items-center">
              <Badge variant="blue">SEGMENT 2 · In Progress</Badge>
              <span className="text-[10px] text-slate-400">27 Aug 2026</span>
            </div>
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
              Probolinggo → Bromo → Ijen → Bali
            </h3>

            <div className="flex items-center gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80"
                alt="Toyota HiAce #02"
                className="w-14 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="space-y-0.5">
                <p className="text-slate-900 dark:text-slate-100 font-bold text-xs">Toyota HiAce #02 (L 8901 GH) 🔄</p>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
                    alt="Budi Pratama"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Budi Pratama · East Java Transport (12 Guests)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* VEHICLE & DRIVER CHANGE AUDIT LOGS */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 font-mono">
          <RefreshCw className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Vehicle & Driver Handover Logs
          </h3>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {vehicleChanges.map((vc) => (
            <div key={vc.id} className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20 space-y-1">
              <div className="flex justify-between font-bold text-purple-700 dark:text-purple-300">
                <span>🔄 Vehicle Changed at {vc.location}</span>
                <span>{vc.timestamp}</span>
              </div>
              <p className="text-slate-900 dark:text-slate-100 font-extrabold text-xs">
                Original: Toyota HiAce ({vc.previousVehiclePlate}) → Changed To: Toyota HiAce ({vc.newVehiclePlate})
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Reason: {vc.reason}
              </p>
            </div>
          ))}

          {driverChanges.map((dc) => (
            <div key={dc.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>👤 Driver Changed at {dc.location}</span>
                <span>{dc.timestamp}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-bold text-xs">
                Original Driver: {dc.previousDriverName} → New Driver: {dc.newDriverName}
              </p>
              <p className="text-slate-500 text-[11px]">
                Reason: {dc.reason}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
