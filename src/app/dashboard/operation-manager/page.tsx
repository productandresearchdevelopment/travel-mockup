"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
  initialNotifications,
  initialMaintenance,
  initialExpenses,
} from "@/data/mockData";

import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { ControlRoomView } from "@/components/ops/views/ControlRoomView";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function OperationManagerDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [bookings] = useState(initialBookings);
  const [tours] = useState(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);
  const [expenses] = useState(initialExpenses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        <SidebarNav
          counts={{
            pendingBookings: bookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: expenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <ControlRoomView
            bookings={bookings}
            tours={tours}
            vehicles={vehicles}
            crews={crews}
            expenses={expenses}
            notifications={notifications}
            onNavigateTab={(tab) => router.push("/operations")}
            onSelectTour={(tourId) => router.push(`/operations/${tourId}`)}
            onOpenGroupModal={() => router.push("/bookings")}
            onOpenAssignModal={(tourId) => router.push("/dispatch")}
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
