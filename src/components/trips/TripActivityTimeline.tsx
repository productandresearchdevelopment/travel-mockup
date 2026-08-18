"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  mockTripActivityTimelineData,
  mockActivitySummaryCountsData,
} from "@/data/mockTripActivityTimelineData";
import { TripActivityRecord, ActivityCategory } from "@/types/tripActivityTimeline";
import { ActivityDetailDrawer } from "./ActivityDetailDrawer";
import {
  History,
  Search,
  Filter,
  Clock,
  MapPin,
  User,
  Truck,
  Ticket,
  AlertTriangle,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";

interface TripActivityTimelineProps {
  tripId: string;
}

export default function TripActivityTimeline({ tripId }: TripActivityTimelineProps) {
  const [activities, setActivities] = useState<TripActivityRecord[]>(mockTripActivityTimelineData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("All Time");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedActivity, setSelectedActivity] = useState<TripActivityRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const counts = mockActivitySummaryCountsData;

  // Filtered & Searched activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        act.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        act.title.toLowerCase().includes(query) ||
        act.description.toLowerCase().includes(query) ||
        act.actorName.toLowerCase().includes(query) ||
        (act.location && act.location.toLowerCase().includes(query)) ||
        (act.previousValue && act.previousValue.toLowerCase().includes(query)) ||
        (act.newValue && act.newValue.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activities, selectedCategory, searchQuery]);

  // Group activities by Date
  const groupedActivities = useMemo(() => {
    const groups: { [date: string]: TripActivityRecord[] } = {};
    filteredActivities.forEach((act) => {
      if (!groups[act.date]) groups[act.date] = [];
      groups[act.date].push(act);
    });
    return groups;
  }, [filteredActivities]);

  const handleOpenDrawer = (act: TripActivityRecord) => {
    setSelectedActivity(act);
    setIsDrawerOpen(true);
  };

  const getCategoryBadge = (cat: ActivityCategory) => {
    switch (cat) {
      case "Vehicle":
        return <Badge variant="blue">🚌 Vehicle</Badge>;
      case "Driver":
        return <Badge variant="violet">👤 Driver</Badge>;
      case "Pickup":
        return <Badge variant="emerald">📍 Pickup</Badge>;
      case "Drop-off":
        return <Badge variant="amber">🏁 Drop-off</Badge>;
      case "Transport":
        return <Badge variant="cyan">🚚 Transport</Badge>;
      case "Ticket":
        return <Badge variant="violet">🎫 Ticket</Badge>;
      case "Exception":
        return <Badge variant="danger">⚠️ Exception</Badge>;
      case "Guest":
        return <Badge variant="info">👥 Guest</Badge>;
      default:
        return <Badge variant="slate">{cat}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-200">
      {/* TOP COMPACT ACTIVITY COUNT SUMMARY BAR (REQUIREMENT 23) */}
      <Card className="p-5 bg-slate-900 text-white space-y-3 font-mono text-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                CHRONOLOGICAL TRIP ACTIVITY HISTORY
              </h2>
              <span className="text-xs text-slate-400">Single source of truth for journey accountability</span>
            </div>
          </div>
          <Badge variant="violet" className="text-sm px-3 py-1 font-extrabold">
            {counts.totalActivities} Total Activities
          </Badge>
        </div>

        {/* SUMMARY PILLS */}
        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
            {counts.operationalCount} Operational
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-blue-300 font-bold border border-slate-700">
            {counts.guestCount} Guest
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700">
            {counts.transportCount} Transport
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-indigo-300 font-bold border border-slate-700">
            {counts.vehicleCount} Vehicle
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-violet-300 font-bold border border-slate-700">
            {counts.driverCount} Driver
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 font-bold border border-slate-700">
            {counts.scheduleCount} Schedule
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-rose-300 font-bold border border-slate-700">
            {counts.exceptionCount} Exception
          </span>
        </div>
      </Card>

      {/* SEARCH AND FILTER BAR (REQUIREMENTS 18 & 19) */}
      <div className="space-y-3 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* SEARCH INPUT */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle plate (HiAce B 1234), driver, guest, activity name, or user..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* PERIOD FILTER */}
          <div className="flex items-center gap-1.5 justify-end">
            {["All Time", "Today", "Yesterday", "Last 7 Days"].map((per) => (
              <button
                key={per}
                onClick={() => setSelectedPeriod(per)}
                className={`px-2.5 py-1.5 rounded-lg border transition-all text-[11px] font-bold ${
                  selectedPeriod === per
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] text-slate-500"
                }`}
              >
                {per}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
          {["All", "Trip", "Guest", "Pickup", "Drop-off", "Transport", "Vehicle", "Driver", "Ticket", "Schedule", "Exception"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all font-bold text-xs ${
                selectedCategory === cat
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CHRONOLOGICAL TIMELINE FEED */}
      <div className="space-y-6">
        {Object.keys(groupedActivities).length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-slate-400 font-mono text-xs">
            No activity records found matching query &quot;{searchQuery}&quot;.
          </div>
        ) : (
          Object.keys(groupedActivities).map((date) => (
            <div key={date} className="space-y-3 font-mono">
              {/* DATE HEADER SEPARATOR */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 font-extrabold text-indigo-600 dark:text-indigo-400 text-xs">
                  📅 {date}
                </span>
                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              </div>

              {/* ACTIVITIES FOR THIS DATE */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                {groupedActivities[date].map((act) => (
                  <div
                    key={act.id}
                    onClick={() => handleOpenDrawer(act)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer space-y-2 relative shadow-xs"
                  >
                    {/* TOP HEADER */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                          {act.time}
                        </span>
                        <span className="text-slate-400">•</span>
                        {getCategoryBadge(act.category)}
                        <span className="text-slate-400">•</span>
                        <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                          {act.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Badge variant={act.actorType === "SYSTEM" ? "amber" : "violet"} className="text-[10px]">
                          {act.actorType === "SYSTEM" ? "🤖 SYSTEM" : `👤 ${act.actorName}`}
                        </Badge>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-slate-600 dark:text-slate-300 font-sans text-xs">
                      {act.description}
                    </p>

                    {/* BEFORE VS AFTER BOX (REQUIREMENT 7) */}
                    {(act.previousValue || act.newValue) && (
                      <div className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 font-mono text-[11px] space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-500">BEFORE:</span>
                          <span className="text-slate-700 dark:text-slate-300">{act.previousValue || "—"}</span>
                          <ArrowRight className="w-3 h-3 text-indigo-500" />
                          <span className="font-bold text-slate-500">AFTER:</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{act.newValue}</span>
                        </div>
                        {act.reason && <span className="text-slate-400 text-[10px] block">Reason: {act.reason}</span>}
                      </div>
                    )}

                    {/* PLANNED VS ACTUAL (REQUIREMENT 15) */}
                    {act.plannedValue && (
                      <div className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 font-mono text-[11px] flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 font-bold">
                          Planned: {act.plannedValue} — Actual: {act.actualValue || "—"}
                        </span>
                        {act.delayMinutes && act.delayMinutes > 0 && (
                          <Badge variant="amber" className="text-[10px]">
                            ⚠️ +{act.delayMinutes} min delay
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* LIVE TRACKING LINK IF APPLICABLE */}
                    {act.liveTrackingUrl && (
                      <div className="pt-1 flex justify-end">
                        <Link href={act.liveTrackingUrl} onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" className="h-6 text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold">
                            <Compass className="w-3 h-3 mr-1" /> View Live Tracking
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* DRAWER */}
      <ActivityDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activity={selectedActivity}
      />
    </div>
  );
}
