"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OperationalRole } from "@/types/travelOps";
import {
  initialReportSummary,
  initialNotifications,
  initialBookings,
  initialTours,
  initialMaintenance,
  initialExpenses,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { ReportsAnalyticsView } from "@/components/ops/views/ReportsAnalyticsView";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function ReportsLandingPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("Business Manager (BM)");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [report] = useState(initialReportSummary);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <RoleSelector currentRole={currentRole} onSelectRole={setCurrentRole} />

      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        <SidebarNav
          activeTab="reports_analytics"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else if (tab === "fleet_management") router.push("/fleet");
            else if (tab === "crew_sdm") router.push("/crew");
            else if (tab === "dispatch_execution") router.push("/operations");
            else if (tab === "finance_bop") router.push("/finance");
            else router.push("/dashboard");
          }}
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: initialTours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <ReportsAnalyticsView report={report} />
        </main>
      </div>

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        notifications={notifications}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      />
    </div>
  );
}
