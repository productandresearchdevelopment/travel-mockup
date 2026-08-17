"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  UserCheck,
  Compass,
  Briefcase,
  Building2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";

const coreResources = [
  {
    title: "Vehicles",
    count: 24,
    href: "/vehicles",
    icon: Truck,
    description: "Transport fleet units including Toyota Hiace, Innova, and Isuzu Elf.",
    statusSummary: "20 Available • 3 On Trip • 1 Maintenance",
  },
  {
    title: "Drivers",
    count: 18,
    href: "/drivers",
    icon: UserCheck,
    description: "Licensed operational drivers with active commercial permits.",
    statusSummary: "15 Available • 2 Assigned • 1 Standby",
  },
  {
    title: "Guides",
    count: 12,
    href: "/guides",
    icon: Compass,
    description: "Certified tour guides specialized in East Java & Bali corridors.",
    statusSummary: "9 Available • 2 On Trip • 1 Inactive",
  },
  {
    title: "Tour Managers",
    count: 8,
    href: "/tour-managers",
    icon: Briefcase,
    description: "Operations managers overseeing field logistics and execution.",
    statusSummary: "6 Available • 2 On Trip",
  },
  {
    title: "Hotels",
    count: 32,
    href: "/hotels",
    icon: Building2,
    description: "Contracted hotel & resort accommodations in operating zones.",
    statusSummary: "32 Active Partner Contracts",
  },
  {
    title: "Destinations",
    count: 46,
    href: "/destinations",
    icon: MapPin,
    description: "Tour destinations, operational zones, and transit waypoints.",
    statusSummary: "46 Operational Locations",
  },
];

export default function OverviewPage() {
  return (
    <AppShell>
      {/* Page Header */}
      <PageHeader
        title="Operational Resource Management"
        description="Manage the core resources used for operational planning and deployment."
        statusBadge={<Badge variant="info">Phase 1 Foundation</Badge>}
      />

      {/* Core Resources Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            6 Core Resources
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Foundation of Operational Planning
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreResources.map((res) => {
            const Icon = res.icon;
            return (
              <Link
                key={res.title}
                href={res.href}
                className="group p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                        {res.count}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">units</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    {res.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Status</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {res.statusSummary}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Conceptual Architectural Flow Card */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              System Architecture & Operational Pipeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How master resources support upcoming operational workflows
            </p>
          </div>
        </div>

        {/* Conceptual Pipeline Steps */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-2">
          {[
            { step: "01", label: "Resources", active: true, badge: "Current Phase" },
            { step: "02", label: "Availability / State", active: false, badge: "Upcoming" },
            { step: "03", label: "Dispatcher", active: false, badge: "Upcoming" },
            { step: "04", label: "Assignment", active: false, badge: "Upcoming" },
            { step: "05", label: "Deployment", active: false, badge: "Upcoming" },
            { step: "06", label: "Execution", active: false, badge: "Upcoming" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-center transition-all ${
                item.active
                  ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 opacity-70"
              }`}
            >
              <span className="text-[10px] font-mono font-bold block opacity-60">STEP {item.step}</span>
              <span className="text-xs font-bold block mt-0.5">{item.label}</span>
              <span
                className={`inline-block mt-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
