"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DailyCostMatrixRow } from "@/types/tripProfitability";
import { mockDailyCostMatrixData } from "@/data/mockTripProfitabilityData";
import { Calendar, DollarSign } from "lucide-react";

interface DailyCostMatrixTableProps {
  rows?: DailyCostMatrixRow[];
}

export function DailyCostMatrixTable({
  rows = mockDailyCostMatrixData,
}: DailyCostMatrixTableProps) {
  const totalHotel = rows.reduce((acc, r) => acc + r.hotelCost, 0);
  const totalTrain = rows.reduce((acc, r) => acc + r.trainCost, 0);
  const totalFerry = rows.reduce((acc, r) => acc + r.ferryCost, 0);
  const totalTour = rows.reduce((acc, r) => acc + r.tourCost, 0);
  const totalVehicle = rows.reduce((acc, r) => acc + r.vehicleCost, 0);
  const totalDriver = rows.reduce((acc, r) => acc + r.driverCost, 0);
  const grandTotal = rows.reduce((acc, r) => acc + r.dailyTotal, 0);

  return (
    <Card className="p-5 space-y-3 font-mono text-xs border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            DAILY OPERATIONAL COST MATRIX (DATA HARIAN AKOMODASI)
          </h3>
        </div>
        <Badge variant="violet">Grand Total: Rp {grandTotal.toLocaleString("id-ID")}</Badge>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-[#162034] text-slate-400 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Hotel</th>
              <th className="py-2.5 px-3">Train</th>
              <th className="py-2.5 px-3">Ferry</th>
              <th className="py-2.5 px-3">Tour</th>
              <th className="py-2.5 px-3">Vehicle</th>
              <th className="py-2.5 px-3">Driver</th>
              <th className="py-2.5 px-3 text-right">Daily Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
            {rows.map((r) => (
              <tr key={r.date} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">{r.date}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Rp {r.hotelCost.toLocaleString("id-ID")}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Rp {r.trainCost.toLocaleString("id-ID")}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Rp {r.ferryCost.toLocaleString("id-ID")}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Rp {r.tourCost.toLocaleString("id-ID")}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Rp {r.vehicleCost.toLocaleString("id-ID")}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Rp {r.driverCost.toLocaleString("id-ID")}</td>
                <td className="py-2.5 px-3 font-extrabold text-indigo-600 text-right">
                  Rp {r.dailyTotal.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 dark:bg-[#162034] font-extrabold text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 text-xs">
            <tr>
              <td className="py-2.5 px-3">TOTAL:</td>
              <td className="py-2.5 px-3">Rp {totalHotel.toLocaleString("id-ID")}</td>
              <td className="py-2.5 px-3">Rp {totalTrain.toLocaleString("id-ID")}</td>
              <td className="py-2.5 px-3">Rp {totalFerry.toLocaleString("id-ID")}</td>
              <td className="py-2.5 px-3">Rp {totalTour.toLocaleString("id-ID")}</td>
              <td className="py-2.5 px-3">Rp {totalVehicle.toLocaleString("id-ID")}</td>
              <td className="py-2.5 px-3">Rp {totalDriver.toLocaleString("id-ID")}</td>
              <td className="py-2.5 px-3 font-black text-indigo-600 text-right">
                Rp {grandTotal.toLocaleString("id-ID")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
