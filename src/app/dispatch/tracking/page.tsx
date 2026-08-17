"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { mockTrackingVehicles, mockTrackingAlerts } from "@/data/mockTrackingData";
import { VehicleTelemetry } from "@/types/tracking";
import {
  Navigation,
  Search,
  Filter,
  Maximize2,
  Minimize2,
  Compass,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  Radio,
  X,
  Layers,
  PanelRightClose,
  PanelRightOpen,
  Sun,
  Moon,
} from "lucide-react";

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

export default function VehicleLiveTrackingPage() {
  const [vehicles] = useState<VehicleTelemetry[]>(mockTrackingVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>("track-001");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [followVehicle, setFollowVehicle] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);

  // Map Tile Theme state (defaults to light or dark based on app theme)
  const [isDarkMap, setIsDarkMap] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDarkMap(document.documentElement.classList.contains("dark"));
    }
  }, []);

  // Selected Vehicle Object
  const selectedVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  // Filtered Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        v.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.destinationName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || v.status === statusFilter;
      const matchRegion = regionFilter === "All" || v.region === regionFilter;

      return matchSearch && matchStatus && matchRegion;
    });
  }, [vehicles, searchQuery, statusFilter, regionFilter]);

  // Counts
  const counts = useMemo(() => {
    return {
      total: 24,
      moving: 16,
      stopped: 5,
      idle: 2,
      offline: 1,
    };
  }, []);

  return (
    <AppShell>
      {!isFullScreen && (
        <>
          <PageHeader
            title="Vehicle Live Tracking"
            description="Real-time GPS fleet monitoring and route tracking across East Java and Bali."
            breadcrumbItems={[
              { label: "Operations", href: "/dispatch" },
              { label: "Live Tracking" },
            ]}
            actions={
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDarkMap(!isDarkMap)}
                  leftIcon={isDarkMap ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-blue-600" />}
                >
                  {isDarkMap ? "Light Map Tiles" : "Dark Map Tiles"}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsFullScreen(true)}
                  leftIcon={<Maximize2 className="w-3.5 h-3.5" />}
                >
                  Full Screen Map
                </Button>
              </div>
            }
          />

          {/* TOP CONTROLS & FILTER BAR (Cleanly positioned above the map) */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4">
            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Box */}
              <div className="w-full sm:w-64">
                <SearchInput
                  placeholder="Search plate, driver, destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="w-full sm:w-40">
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={[
                    { value: "All", label: "All Statuses" },
                    { value: "Moving", label: "Moving" },
                    { value: "Stopped", label: "Stopped" },
                    { value: "Idle", label: "Idle" },
                    { value: "Offline", label: "Offline" },
                  ]}
                />
              </div>

              {/* Region Filter */}
              <div className="w-full sm:w-40">
                <Select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  options={[
                    { value: "All", label: "All Regions" },
                    { value: "East Java", label: "East Java" },
                    { value: "Banyuwangi", label: "Banyuwangi" },
                    { value: "Bali", label: "Bali" },
                  ]}
                />
              </div>
            </div>

            {/* Live Metrics Counter Badges */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-900/40">
                LIVE: {counts.total} ACTIVE
              </span>
              <span className="px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-900/40">
                Moving: {counts.moving}
              </span>
              <span className="px-2 py-1 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold border border-sky-200 dark:border-sky-900/40">
                Stopped: {counts.stopped}
              </span>
              <span className="px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-semibold border border-amber-200 dark:border-amber-900/40">
                Idle: {counts.idle}
              </span>
            </div>
          </div>
        </>
      )}

      {/* MAP MONITORING CONTAINER */}
      <div
        className={`relative transition-all duration-300 ${
          isFullScreen
            ? "fixed inset-0 z-50 w-screen h-screen bg-slate-900"
            : "w-full h-[580px] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 overflow-hidden"
        }`}
      >
        {/* LEAFLET MAP VIEWPORT */}
        <MapTracking
          vehicles={filteredVehicles}
          selectedVehicleId={selectedVehicleId}
          onSelectVehicle={(v) => {
            setSelectedVehicleId(v.id);
            setShowPanel(true);
          }}
          isDarkTheme={isDarkMap}
          followVehicle={followVehicle}
          isFullScreen={isFullScreen}
        />

        {/* FULLSCREEN MODE TOP HEADER */}
        {isFullScreen && (
          <div className="absolute top-4 left-4 right-4 z-[1001] flex items-center justify-between pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono text-xs flex items-center gap-3 pointer-events-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold">FULLSCREEN GPS MONITORING CENTER</span>
              <span className="text-emerald-400">({counts.total} Vehicles Active)</span>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xl pointer-events-auto transition-all"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit Fullscreen</span>
            </button>
          </div>
        )}

        {/* BOTTOM-LEFT ACTION OVERLAY CONTROLS */}
        <div className="absolute bottom-4 left-4 z-[1001] flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedVehicleId(null);
            }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xl transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Fit All Vehicles</span>
          </button>

          <button
            onClick={() => setFollowVehicle(!followVehicle)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xl transition-all ${
              followVehicle
                ? "bg-blue-600 border border-blue-400 text-white"
                : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Follow {followVehicle ? "● ON" : ""}</span>
          </button>

          <button
            onClick={() => setShowLegend(!showLegend)}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xl transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Legend</span>
          </button>

          <button
            onClick={() => setShowAlertsModal(true)}
            className="bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-xl transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>2 Alerts</span>
          </button>
        </div>

        {/* MAP LEGEND OVERLAY CARD */}
        {showLegend && (
          <div className="absolute bottom-16 left-4 z-[1002] bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-2xl text-xs text-slate-900 dark:text-white w-52 space-y-2">
            <p className="font-bold text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              MAP MARKER LEGEND
            </p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Moving Vehicle (Active GPS)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Stopped Vehicle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Idle Engine Vehicle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                <span>Offline / Muted Marker</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-500">📍</span>
                <span>Target Tour Destination</span>
              </div>
            </div>
          </div>
        )}

        {/* PANEL TOGGLE BUTTON WHEN DRAWER IS CLOSED */}
        {selectedVehicle && !showPanel && (
          <button
            onClick={() => setShowPanel(true)}
            className="absolute top-4 right-4 z-[1001] bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white p-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <PanelRightOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Show Telemetry</span>
          </button>
        )}

        {/* SLIDE-IN VEHICLE DETAIL TELEMETRY DRAWER */}
        {selectedVehicle && showPanel && (
          <aside className="absolute top-4 bottom-4 right-4 z-[1001] w-80 sm:w-88 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/90 rounded-2xl p-4 text-slate-900 dark:text-white shadow-2xl overflow-y-auto flex flex-col space-y-4 font-sans">
            
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  TELEMETRY DRAWER
                </span>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedVehicle.vehicleName}</h2>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{selectedVehicle.vehiclePlate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={selectedVehicle.status === "Moving" ? "emerald" : selectedVehicle.status === "Stopped" ? "blue" : "slate"}>
                  ● {selectedVehicle.status}
                </Badge>
                <button
                  onClick={() => setShowPanel(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <PanelRightClose className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Speed & Heading Stats */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 font-mono text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">SPEED</span>
                <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">{selectedVehicle.speedKmH} km/h</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">HEADING</span>
                <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400">{selectedVehicle.headingDegrees}° NE</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">UPDATED</span>
                <span className="font-extrabold text-[10px] text-slate-700 dark:text-slate-300">{selectedVehicle.lastUpdate}</span>
              </div>
            </div>

            {/* Target Destination & ETA Card */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-slate-100 dark:from-blue-950/60 dark:to-slate-800/80 border border-blue-200 dark:border-blue-800/60 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-blue-600 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" /> DESTINATION
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">ETA: {selectedVehicle.eta}</span>
              </div>
              <p className="font-bold text-xs text-slate-900 dark:text-white">{selectedVehicle.destinationName}</p>

              {/* Trip Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  <span>Progress ({selectedVehicle.distanceTraveledKm} / {selectedVehicle.totalDistanceKm} km)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.round((selectedVehicle.distanceTraveledKm / selectedVehicle.totalDistanceKm) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-300 dark:border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500"
                    style={{
                      width: `${(selectedVehicle.distanceTraveledKm / selectedVehicle.totalDistanceKm) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Master References Links */}
            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-400 block">DRIVER</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{selectedVehicle.driverName}</span>
                </div>
                <Link href={`/drivers/${selectedVehicle.driverId}`}>
                  <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5 text-blue-600 dark:text-blue-400 border-slate-300 dark:border-slate-600 gap-1">
                    Master <ExternalLink className="w-2.5 h-2.5" />
                  </Button>
                </Link>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-400 block">DEPLOYMENT</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{selectedVehicle.deploymentName}</span>
                </div>
                <Link href={`/dispatch/${selectedVehicle.deploymentId}`}>
                  <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5 text-blue-600 dark:text-blue-400 border-slate-300 dark:border-slate-600 gap-1">
                    Detail <ExternalLink className="w-2.5 h-2.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Today's Tracking History Log */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[9px]">
                  TODAY'S LOG
                </span>
                <button
                  onClick={() => setShowFullHistoryModal(true)}
                  className="text-[9px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Full History
                </button>
              </div>

              <div className="space-y-1 text-[10px] font-mono">
                {selectedVehicle.history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">{h.timestamp}</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[100px]">{h.location}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{h.speedKmH} km/h</span>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        )}

      </div>

      {/* MODAL 1: ALERTS MODAL */}
      <Modal
        isOpen={showAlertsModal}
        onClose={() => setShowAlertsModal(false)}
        title="Live Tracking Safety Alerts"
      >
        <div className="space-y-3 text-xs">
          {mockTrackingAlerts.map((alt) => (
            <div
              key={alt.id}
              className="p-3 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/40 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> {alt.type} ({alt.vehiclePlate})
                </span>
                <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400">{alt.timestamp}</span>
              </div>
              <p className="text-amber-800 dark:text-amber-200">{alt.message}</p>
            </div>
          ))}

          <div className="pt-2 flex justify-end">
            <Button variant="outline" onClick={() => setShowAlertsModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: FULL TRACKING HISTORY MODAL */}
      <Modal
        isOpen={showFullHistoryModal}
        onClose={() => setShowFullHistoryModal(false)}
        title={`Full Telemetry History - ${selectedVehicle.vehiclePlate}`}
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            Complete GPS tracking log entries for vehicle <strong>{selectedVehicle.vehicleName}</strong> on {selectedVehicle.lastUpdate}:
          </p>

          <div className="space-y-2 font-mono">
            {selectedVehicle.history.map((h, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">{h.timestamp}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{h.location}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{h.speedKmH} km/h</span>
                <Badge variant={h.status === "Moving" ? "emerald" : "blue"}>{h.status}</Badge>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="outline" onClick={() => setShowFullHistoryModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

    </AppShell>
  );
}
