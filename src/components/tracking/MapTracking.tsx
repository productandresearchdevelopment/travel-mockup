"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleTelemetry } from "@/types/tracking";

interface MapTrackingProps {
  vehicles: VehicleTelemetry[];
  selectedVehicleId: string | null;
  onSelectVehicle: (vehicle: VehicleTelemetry) => void;
  isDarkTheme?: boolean;
  followVehicle?: boolean;
  isFullScreen?: boolean;
}

export default function MapTracking({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  isDarkTheme = true,
  followVehicle = false,
  isFullScreen = false,
}: MapTrackingProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const polylinesRef = useRef<L.Polyline[]>([]);

  const tileUrl = isDarkTheme
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initial view focused tightly on East Java & Bali region
    const map = L.map(mapContainerRef.current, {
      center: [-8.1, 114.0],
      zoom: 9,
      minZoom: 7,
      maxZoom: 16,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const tileLayer = L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    mapRef.current = map;
    tileLayerRef.current = tileLayer;

    // Trigger size calculation
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Theme Change
  useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.setUrl(tileUrl);
    }
  }, [tileUrl]);

  // Handle Fullscreen or Container Resize
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 200);
    }
  }, [isFullScreen]);

  // Render Vehicle Markers & Route Lines
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers & polylines
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};
    polylinesRef.current.forEach((p) => p.remove());
    polylinesRef.current = [];

    vehicles.forEach((v) => {
      const isSelected = v.id === selectedVehicleId;

      // Status Colors
      const statusBg =
        v.status === "Moving"
          ? "#10B981"
          : v.status === "Stopped"
          ? "#3B82F6"
          : v.status === "Idle"
          ? "#F59E0B"
          : "#64748B";

      // Custom Vehicle Marker HTML
      const markerHtml = `
        <div class="relative group flex items-center justify-center cursor-pointer">
          ${
            isSelected
              ? `<div class="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping"></div>`
              : ""
          }
          <div class="w-9 h-9 rounded-full bg-white dark:bg-[#101726] border-2 shadow-lg flex items-center justify-center transition-transform hover:scale-110" style="border-color: ${statusBg};">
            <div style="transform: rotate(${v.headingDegrees}deg);" class="transition-transform duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                <path d="M14 9h4l3 3v5c0 .6-.4 1-1 1h-2" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
            </div>
          </div>
          <div class="absolute -bottom-5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-900 text-white shadow whitespace-nowrap border border-slate-700">
            ${v.vehiclePlate}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: "custom-vehicle-marker",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([v.lat, v.lng], { icon: customIcon }).addTo(map);

      marker.on("click", () => {
        onSelectVehicle(v);
      });

      // Bind Compact Popup
      marker.bindPopup(`
        <div class="p-1 font-sans text-xs">
          <p class="font-bold text-slate-900 mb-0.5">${v.vehicleName} (${v.vehiclePlate})</p>
          <p class="text-slate-600 mb-1">Driver: ${v.driverName} | ${v.speedKmH} km/h</p>
          <p class="text-blue-600 font-semibold mb-1">Dest: ${v.destinationName}</p>
        </div>
      `);

      markersRef.current[v.id] = marker;

      // Draw Destination Pin Marker
      const destHtml = `
        <div class="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] shadow-md border border-white whitespace-nowrap">
          <span>📍 ${v.destinationName}</span>
        </div>
      `;
      const destIcon = L.divIcon({
        html: destHtml,
        className: "custom-dest-marker",
        iconSize: [120, 22],
        iconAnchor: [10, 11],
      });
      L.marker([v.destinationLat, v.destinationLng], { icon: destIcon }).addTo(map);

      // Draw Route Polyline if Selected
      if (isSelected && v.routePoints.length > 0) {
        const routePolyline = L.polyline(v.routePoints, {
          color: "#2563EB",
          weight: 4,
          opacity: 0.85,
          dashArray: "6, 8",
        }).addTo(map);

        polylinesRef.current.push(routePolyline);

        if (followVehicle) {
          map.panTo([v.lat, v.lng], { animate: true });
        }
      }
    });
  }, [vehicles, selectedVehicleId, followVehicle]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
