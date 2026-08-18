"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/SearchInput";
import { mockTrackingVehicles } from "@/data/mockTrackingData";
import { VehicleTelemetry } from "@/types/tracking";
import { Radio } from "lucide-react";

// Dynamically import Leaflet Map Component (no SSR)
const MapTracking = dynamic(() => import("@/components/tracking/MapTracking"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[580px] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-800 dark:text-white text-xs font-mono">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <span>Loading GPS Live Telemetry Map...</span>
      </div>
    </div>
  ),
});

export default function LiveTrackingPage() {
  const [vehicles] = useState<VehicleTelemetry[]>(mockTrackingVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>("track-001");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      return (
        v.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.deploymentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [vehicles, searchQuery]);

  return (
    <AppShell>
      <PageHeader
        title="Live Vehicle GPS Telemetry & Tracking"
        description="Real-time overland fleet positioning, speed telemetry, geofence alerts & trip progress"
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Live Tracking" },
        ]}
      />

      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          {/* VEHICLE LIST PANEL */}
          <Card className="lg:col-span-1 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" /> LIVE FLEET ({filteredVehicles.length})
              </span>
              <Badge variant="emerald">Live GPS</Badge>
            </div>

            <SearchInput
              placeholder="Search plate, driver, trip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredVehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    selectedVehicleId === v.id
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#101726]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100">{v.vehiclePlate}</span>
                    <Badge variant={v.status === "Moving" ? "emerald" : v.status === "Idle" ? "amber" : "slate"}>
                      {v.status}
                    </Badge>
                  </div>
                  <span className="text-slate-500 text-[11px] block">{v.vehicleName} · {v.driverName}</span>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-blue-600 truncate max-w-[120px]">{v.deploymentName}</span>
                    <span>{v.speedKmH} km/h</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* MAP CANVAS */}
          <Card className="lg:col-span-3 p-2 relative h-[580px] overflow-hidden">
            <MapTracking
              vehicles={filteredVehicles}
              selectedVehicleId={selectedVehicleId}
              onSelectVehicle={(v) => setSelectedVehicleId(v.id)}
            />
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
