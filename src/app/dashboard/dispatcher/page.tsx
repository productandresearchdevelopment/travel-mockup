"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/ops/AppLayout";
import { DispatcherDeploymentDetailDrawer } from "@/components/ops/drawers/DispatcherDeploymentDetailDrawer";

// Static Data Files
import bookingsData from "@/data/bookings.json";
import departureGroupsData from "@/data/departure-groups.json";
import destinationGroupsData from "@/data/destination-groups.json";
import dropoffGroupsData from "@/data/dropoff-groups.json";
import tmManifestsData from "@/data/tm-manifests.json";
import guideManifestsData from "@/data/guide-manifests.json";
import hotelManifestsData from "@/data/hotel-manifests.json";
import deploymentsData from "@/data/deployments.json";

import {
  Send,
  Layers,
  ShoppingBag,
  Truck,
  Users,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  XCircle,
  Filter,
  Eye,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function DispatcherDashboardPage() {
  // Navigation Tabs inside Dispatcher Module
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "grouping" | "manifests" | "deployment"
  >("overview");

  // Manifest Sub-Tabs
  const [manifestSubTab, setManifestSubTab] = useState<"tm" | "guide" | "hotel">("tm");

  // Grouping Sub-Tabs
  const [groupingSubTab, setGroupingSubTab] = useState<"departure" | "destination" | "dropoff">("departure");

  // Filter States for Bookings
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("ALL");
  const [bookingDestinationFilter, setBookingDestinationFilter] = useState<string>("ALL");

  // Selected Deployment State for Drawer
  const [selectedDeployment, setSelectedDeployment] = useState<any | null>(null);
  const [deploymentsList, setDeploymentsList] = useState(deploymentsData);

  // Filtered Bookings
  const filteredBookings = bookingsData.filter((b) => {
    if (bookingStatusFilter !== "ALL" && b.status !== bookingStatusFilter) return false;
    if (bookingDestinationFilter !== "ALL" && !b.destination.includes(bookingDestinationFilter)) return false;
    return true;
  });

  const handleUpdateDeployment = (updated: any) => {
    setDeploymentsList((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  return (
    <AppLayout>
      <div className="space-y-8 font-sans">
        {/* ================================================== */}
        {/* PAGE HEADER */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40 text-[11px] font-bold uppercase tracking-wider">
                Dispatcher Control Command
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">/dashboard/dispatcher</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">
              Dispatch Overview & Excursion Deployment
            </h1>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
              Transform collected reservations into operationally ready deployments by matching Fleet & SDM resources.
            </p>
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#151E30] p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]">
            {[
              { id: "overview", label: "Dispatch Overview" },
              { id: "bookings", label: "Collector Booking" },
              { id: "grouping", label: "Grouping Engine" },
              { id: "manifests", label: "Manifests" },
              { id: "deployment", label: "Deployment Schedules" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* DISPATCH OVERVIEW KPI CARDS (6 CARDS) */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">New Bookings</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] dark:text-[#60A5FA] font-mono">14</div>
            <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold">Ingested Inbox</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Unassigned Bookings</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B45309] dark:text-[#FBBF24] font-mono">2</div>
            <span className="text-[10px] text-[#B45309] dark:text-[#FBBF24] font-semibold">Needs Tour Matching</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Today's Departures</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white font-mono">12</div>
            <span className="text-[10px] text-[#16A34A] font-semibold">On Schedule</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Pending Deployment</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">5</div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">In Preparation</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Ready for Dispatch</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#16A34A] dark:text-[#4ADE80] font-mono">8</div>
            <span className="text-[10px] text-[#16A34A] dark:text-[#4ADE80] font-semibold">Resources Matched</span>
          </div>

          <div className="bg-white dark:bg-[#101726] border border-rose-200 dark:border-rose-900/50 p-4 rounded-xl space-y-1.5 shadow-xs">
            <span className="text-[#475569] dark:text-[#94A3B8] block font-medium">Resource Issues</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B91C1C] dark:text-[#F87171] font-mono">1</div>
            <span className="text-[10px] text-[#B91C1C] dark:text-[#F87171] font-semibold">Missing TM / Driver</span>
          </div>
        </div>

        {/* ================================================== */}
        {/* RESOURCE DEPENDENCY VISUALIZATION BAR */}
        {/* ================================================== */}
        <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-3 shadow-xs text-xs">
          <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[11px] block">
            Operational Dispatch Dependency Pipeline
          </span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            <div className="bg-[#EFF6FF] dark:bg-[#172A4A] p-3 rounded-xl border border-blue-200 dark:border-blue-900/40 text-[#2563EB] dark:text-[#60A5FA]">
              <span className="font-bold block text-xs">1. Collector Booking</span>
              <span className="text-[10px] font-mono block">Ingest Reservations</span>
            </div>

            <div className="bg-[#FFFBEB] dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-900/40 text-[#B45309] dark:text-[#FBBF24]">
              <span className="font-bold block text-xs">2. Fleet Matching</span>
              <span className="text-[10px] font-mono block">Vehicle Allocation Required</span>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-xl border border-purple-200 dark:border-purple-900/40 text-purple-600 dark:text-purple-400">
              <span className="font-bold block text-xs">3. SDM Crew Matching</span>
              <span className="text-[10px] font-mono block">Driver + Guide + TM Required</span>
            </div>

            <div className="bg-[#F0FDF4] dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/40 text-[#15803D] dark:text-[#4ADE80]">
              <span className="font-bold block text-xs">4. Deployment Clearance</span>
              <span className="text-[10px] font-mono block">Ready for Dispatch</span>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* TAB 1: COLLECTOR BOOKING MANAGEMENT */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "bookings") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Collector Booking Ingestion & Roster
              </h2>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] px-3 py-1 rounded-lg text-xs"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Collected">Collected</option>
                  <option value="Grouped">Grouped</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Deployed">Deployed</option>
                </select>

                <select
                  value={bookingDestinationFilter}
                  onChange={(e) => setBookingDestinationFilter(e.target.value)}
                  className="bg-[#F8FAFC] dark:bg-[#151E30] border border-[#CBD5E1] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] px-3 py-1 rounded-lg text-xs"
                >
                  <option value="ALL">All Destinations</option>
                  <option value="Bromo">Mount Bromo</option>
                  <option value="Ijen">Ijen Crater</option>
                  <option value="Bali">Bali Corridor</option>
                  <option value="Tumpak Sewu">Tumpak Sewu</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Booking ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Excursion Tour</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Pax</th>
                    <th className="py-2.5 px-3">Destination</th>
                    <th className="py-2.5 px-3">Hotel Drop-off</th>
                    <th className="py-2.5 px-3">Pickup Location</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="saas-table-row">
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{b.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{b.greeting} {b.customer}</td>
                      <td className="py-3 px-3 font-medium text-[#0F172A] dark:text-white max-w-[180px] truncate">{b.tour}</td>
                      <td className="py-3 px-3 font-mono text-[#0F172A] dark:text-white">{b.date}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{b.pax} Pax</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{b.destination}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{b.hotel}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{b.pickup}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            b.status === "Deployed"
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : b.status === "Assigned" || b.status === "Grouped"
                              ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                              : "bg-[#FFFBEB] text-[#B45309] border-amber-200"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 2: GROUPING ENGINE (DEPARTURE, DESTINATION, DROPOFF) */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "grouping") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Operational Grouping Engine
              </h2>

              <div className="flex items-center gap-1.5 bg-[#F8FAFC] dark:bg-[#151E30] p-1 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]">
                {[
                  { id: "departure", label: "Group by Departure" },
                  { id: "destination", label: "Group by Destination" },
                  { id: "dropoff", label: "Group by Drop-off" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setGroupingSubTab(st.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      groupingSubTab === st.id
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* GROUP BY DEPARTURE INTERFACE */}
            {groupingSubTab === "departure" && (
              <div className="space-y-4">
                {departureGroupsData.map((depGroup, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] dark:bg-[#151E30] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2 font-bold">
                      <span className="text-xs text-[#0F172A] dark:text-white">{depGroup.date} — {depGroup.hub}</span>
                      <span className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA]">{depGroup.tours.length} Excursion Groups</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {depGroup.tours.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-3.5 rounded-xl space-y-2">
                          <div className="flex justify-between items-center font-mono">
                            <span className="font-bold text-[#2563EB] dark:text-[#60A5FA]">{t.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
                              {t.readiness}
                            </span>
                          </div>
                          <div className="font-bold text-xs text-[#0F172A] dark:text-white">{t.name}</div>
                          <div className="text-[11px] text-[#475569] dark:text-[#94A3B8] space-y-0.5">
                            <div>Bookings: <span className="font-bold text-[#0F172A] dark:text-white">{t.bookingCount} Bookings ({t.pax} Pax)</span></div>
                            <div>Vehicle: <span className="font-mono text-[#0F172A] dark:text-white">{t.assignedVehicle}</span></div>
                            <div>Crew: <span className="text-[#0F172A] dark:text-white">{t.assignedCrew}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GROUP BY DESTINATION INTERFACE */}
            {groupingSubTab === "destination" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinationGroupsData.map((destGroup, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] dark:bg-[#151E30] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-3">
                    <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider block border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2">
                      {destGroup.region}
                    </span>

                    <div className="space-y-2">
                      {destGroup.destinations.map((d, dIdx) => (
                        <div key={dIdx} className="bg-white dark:bg-[#101726] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
                          <span className="font-bold text-xs text-[#0F172A] dark:text-white">{d.name}</span>
                          <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#60A5FA]">
                            {d.paxCount} Passengers ({d.bookingCount} Bookings)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GROUP BY DROPOFF INTERFACE */}
            {groupingSubTab === "dropoff" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dropoffGroupsData.map((dropGroup, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] dark:bg-[#151E30] border border-[#E2E8F0] dark:border-[#1E293B] p-4 rounded-xl space-y-3">
                    <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider block border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2">
                      {dropGroup.area}
                    </span>

                    <div className="space-y-2">
                      {dropGroup.hotels.map((h, hIdx) => (
                        <div key={hIdx} className="bg-white dark:bg-[#101726] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
                          <span className="font-bold text-xs text-[#0F172A] dark:text-white">{h.name}</span>
                          <span className="font-mono text-xs font-bold text-[#16A34A] dark:text-[#4ADE80]">
                            {h.paxCount} Pax
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 3: MANIFESTS (TM, LOCAL GUIDE, HOTEL) */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "manifests") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Operational Manifest Generator
              </h2>

              <div className="flex items-center gap-1.5 bg-[#F8FAFC] dark:bg-[#151E30] p-1 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]">
                {[
                  { id: "tm", label: "Manifest by TM" },
                  { id: "guide", label: "Manifest by Local Guide" },
                  { id: "hotel", label: "Manifest by Hotel" },
                ].map((mst) => (
                  <button
                    key={mst.id}
                    onClick={() => setManifestSubTab(mst.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      manifestSubTab === mst.id
                        ? "bg-cyan-600 text-white shadow-xs"
                        : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
                    }`}
                  >
                    {mst.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TM MANIFEST */}
            {manifestSubTab === "tm" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-3">Manifest ID</th>
                      <th className="py-2.5 px-3">Tour Manager</th>
                      <th className="py-2.5 px-3">Tour Ref</th>
                      <th className="py-2.5 px-3">Passenger Group</th>
                      <th className="py-2.5 px-3">Pickup Location</th>
                      <th className="py-2.5 px-3">Destination</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                    {tmManifestsData.map((tm) => (
                      <tr key={tm.id} className="saas-table-row">
                        <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{tm.id}</td>
                        <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{tm.tourManager}</td>
                        <td className="py-3 px-3 font-semibold text-[#0F172A] dark:text-white">{tm.tour}</td>
                        <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{tm.passenger}</td>
                        <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{tm.pickup}</td>
                        <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{tm.destination}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
                            {tm.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* GUIDE MANIFEST */}
            {manifestSubTab === "guide" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-3">Manifest ID</th>
                      <th className="py-2.5 px-3">Local Guide</th>
                      <th className="py-2.5 px-3">Tour Ref</th>
                      <th className="py-2.5 px-3">Passenger Group</th>
                      <th className="py-2.5 px-3">Destination</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                    {guideManifestsData.map((gd) => (
                      <tr key={gd.id} className="saas-table-row">
                        <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{gd.id}</td>
                        <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{gd.guide}</td>
                        <td className="py-3 px-3 font-semibold text-[#0F172A] dark:text-white">{gd.tour}</td>
                        <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{gd.passengerGroup}</td>
                        <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{gd.destination}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                            {gd.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* HOTEL MANIFEST */}
            {manifestSubTab === "hotel" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-3">Manifest ID</th>
                      <th className="py-2.5 px-3">Hotel Name</th>
                      <th className="py-2.5 px-3">Tour Ref</th>
                      <th className="py-2.5 px-3">Primary Guest</th>
                      <th className="py-2.5 px-3">Pax</th>
                      <th className="py-2.5 px-3">Check-In Schedule</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                    {hotelManifestsData.map((ht) => (
                      <tr key={ht.id} className="saas-table-row">
                        <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{ht.id}</td>
                        <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white">{ht.hotel}</td>
                        <td className="py-3 px-3 font-semibold text-[#0F172A] dark:text-white">{ht.tour}</td>
                        <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8]">{ht.guest}</td>
                        <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{ht.pax} Pax</td>
                        <td className="py-3 px-3 font-mono text-[#0F172A] dark:text-white">{ht.checkIn}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
                            {ht.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 4: DEPLOYMENT SCHEDULES (MOST IMPORTANT DISPATCHER FUNCTION) */}
        {/* ================================================== */}
        {(activeTab === "overview" || activeTab === "deployment") && (
          <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
              <div>
                <h2 className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> Deployment Schedule & Resource Matching Board
                </h2>
                <p className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                  Combines Tour + Date + Departure + Destination + Drop-off + Vehicle + Driver + Guide + TM
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Deployment ID</th>
                    <th className="py-2.5 px-3">Excursion Tour</th>
                    <th className="py-2.5 px-3">Departure Schedule</th>
                    <th className="py-2.5 px-3">Destination / Drop-off</th>
                    <th className="py-2.5 px-3">Vehicle</th>
                    <th className="py-2.5 px-3">Driver</th>
                    <th className="py-2.5 px-3">Guide</th>
                    <th className="py-2.5 px-3">TM</th>
                    <th className="py-2.5 px-3">Readiness Clearance</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                  {deploymentsList.map((dpl) => (
                    <tr
                      key={dpl.id}
                      onClick={() => setSelectedDeployment(dpl)}
                      className="saas-table-row cursor-pointer"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">{dpl.id}</td>
                      <td className="py-3 px-3 font-bold text-[#0F172A] dark:text-white max-w-[160px] truncate">{dpl.tourName}</td>
                      <td className="py-3 px-3 font-mono text-[#0F172A] dark:text-white">{dpl.departure}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#94A3B8] max-w-[160px] truncate">{dpl.destination} ({dpl.pax} Pax)</td>
                      
                      {/* Vehicle Status */}
                      <td className="py-3 px-3 font-mono text-[11px]">
                        {dpl.resources.vehicle.assigned ? (
                          <span className="text-[#16A34A] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {dpl.resources.vehicle.name}
                          </span>
                        ) : (
                          <span className="text-[#B91C1C] font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </td>

                      {/* Driver Status */}
                      <td className="py-3 px-3 text-[11px]">
                        {dpl.resources.driver.assigned ? (
                          <span className="text-[#16A34A] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {dpl.resources.driver.name}
                          </span>
                        ) : (
                          <span className="text-[#B91C1C] font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </td>

                      {/* Guide Status */}
                      <td className="py-3 px-3 text-[11px]">
                        {dpl.resources.guide.assigned ? (
                          <span className="text-[#16A34A] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {dpl.resources.guide.name}
                          </span>
                        ) : (
                          <span className="text-[#B91C1C] font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </td>

                      {/* TM Status */}
                      <td className="py-3 px-3 text-[11px]">
                        {dpl.resources.tourManager.assigned ? (
                          <span className="text-[#16A34A] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {dpl.resources.tourManager.name}
                          </span>
                        ) : (
                          <span className="text-[#B91C1C] font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </td>

                      {/* Readiness Label */}
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                            dpl.isReady
                              ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                              : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                          }`}
                        >
                          {dpl.isReady ? "Ready for Deployment" : "Incomplete"}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDeployment(dpl);
                          }}
                          className="px-2.5 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* DEPLOYMENT DETAIL DRAWER */}
      <DispatcherDeploymentDetailDrawer
        deployment={selectedDeployment}
        onClose={() => setSelectedDeployment(null)}
        onUpdateDeployment={handleUpdateDeployment}
      />
    </AppLayout>
  );
}
