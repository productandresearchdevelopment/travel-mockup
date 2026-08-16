"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OperationalRole, Tour, Vehicle, Crew } from "@/types/travelOps";
import {
  initialTours,
  initialVehicles,
  initialCrews,
  initialNotifications,
  initialBookings,
  initialMaintenance,
  initialExpenses,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { TourMonitoringView } from "@/components/ops/views/TourMonitoringView";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function TourOperationsPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("Operation Manager (OM)");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [tours] = useState<Tour[]>(initialTours);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [crews] = useState<Crew[]>(initialCrews);
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
          activeTab="dispatch_execution"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else if (tab === "fleet_management") router.push("/fleet");
            else if (tab === "crew_sdm") router.push("/crew");
            else router.push("/dashboard");
          }}
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <TourMonitoringView
            tours={tours}
            vehicles={vehicles}
            crews={crews}
            onSelectTourDetail={(tourId) => router.push(`/operations/${tourId}`)}
          />
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
