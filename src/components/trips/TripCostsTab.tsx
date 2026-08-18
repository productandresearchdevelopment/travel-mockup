"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Truck,
  Ticket,
} from "lucide-react";

interface TripCostsTabProps {
  tripId?: string;
  paxCount?: number;
}

export default function TripCostsTab({ tripId = "TRP-2026-00421", paxCount = 12 }: TripCostsTabProps) {
  const isSimpleTrip = tripId.toUpperCase().includes("00418");

  if (isSimpleTrip) {
    return (
      <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <Card className="p-5 space-y-1 bg-white dark:bg-[#101726]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">TOTAL BILLING REVENUE</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white block">Rp 3.200.000</strong>
            <span className="text-emerald-600 text-[11px] font-bold">2 Guests Day Tour</span>
          </Card>

          <Card className="p-5 space-y-1 bg-white dark:bg-[#101726]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">OPERATIONAL EXPENSES</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white block">Rp 1.650.000</strong>
            <span className="text-slate-500 text-[11px]">Fuel, Driver, Toll & Entrance</span>
          </Card>

          <Card className="p-5 space-y-1 bg-emerald-50/20 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">NET TRIP MARGIN</span>
            <strong className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">Rp 1.550.000</strong>
            <span className="text-emerald-600 font-bold text-[11px]">48.4% Margin</span>
          </Card>
        </div>
      </div>
    );
  }

  // Complex Trip Costs Breakdown
  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <Card className="p-5 space-y-1 bg-white dark:bg-[#101726]">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">TOTAL BILLING REVENUE</span>
          <strong className="text-2xl font-extrabold text-slate-900 dark:text-white block">Rp 10.420.000</strong>
          <span className="text-blue-600 font-bold text-[11px]">+Rp 3.000.000 from 4 Malang Joiners</span>
        </Card>

        <Card className="p-5 space-y-1 bg-white dark:bg-[#101726]">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">TOTAL OPERATIONAL COSTS</span>
          <strong className="text-2xl font-extrabold text-slate-900 dark:text-white block">Rp 5.850.000</strong>
          <span className="text-slate-500 text-[11px]">Includes Vehicle Swap & Ticket Drop-off</span>
        </Card>

        <Card className="p-5 space-y-1 bg-emerald-50/20 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">NET OPERATIONAL PROFIT</span>
          <strong className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">Rp 4.570.000</strong>
          <span className="text-emerald-600 font-bold text-[11px]">43.8% Profit Margin</span>
        </Card>
      </div>

      {/* FINANCIAL IMPACT OF OPERATIONAL EVENTS (REQUIREMENT 25) */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Financial Impact of Operational Changes
            </h3>
          </div>
          <Badge variant="blue">Real-Time Financial Flow</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* ADDITIONAL GUESTS REVENUE & COST */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> +4 Additional Guests
              </span>
              <Badge variant="blue">Malang Joiners</Badge>
            </div>
            <div className="space-y-1 pt-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Additional Revenue:</span>
                <strong className="text-emerald-600 font-extrabold">+Rp 3.000.000</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Additional Operational Cost:</span>
                <strong className="text-rose-600 font-extrabold">+Rp 1.800.000</strong>
              </div>
            </div>
          </div>

          {/* VEHICLE CHANGE ADDITIONAL COST */}
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Vehicle Change Surcharge
              </span>
              <Badge variant="violet">Probolinggo Handover</Badge>
            </div>
            <div className="space-y-1 pt-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Additional Handover Cost:</span>
                <strong className="text-rose-600 font-extrabold">+Rp 200.000</strong>
              </div>
              <p className="text-slate-400 text-[10px]">Regional vehicle swap fee</p>
            </div>
          </div>

          {/* TICKET DROP-OFF COST */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-indigo-600" /> Ticket Drop-off Cost
              </span>
              <Badge variant="violet">Banyuwangi Train</Badge>
            </div>
            <div className="space-y-1 pt-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">KAI Train Ticket Cost:</span>
                <strong className="text-rose-600 font-extrabold">+Rp 850.000</strong>
              </div>
              <p className="text-slate-400 text-[10px]">2 Guests train drop-off</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
