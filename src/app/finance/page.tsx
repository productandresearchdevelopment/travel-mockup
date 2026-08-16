"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  OperationalRole,
  TourBopRecord,
  FinanceExpense,
  Tour,
} from "@/types/travelOps";
import {
  initialBopRecords,
  initialExpenses,
  initialTours,
  initialNotifications,
  initialBookings,
  initialMaintenance,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { FinanceBopView } from "@/components/ops/views/FinanceBopView";
import { TourCostDetailModal } from "@/components/ops/modals/TourCostDetailModal";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function FinanceControlPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("Business Manager (BM)");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [bopRecords] = useState<TourBopRecord[]>(initialBopRecords);
  const [expenses] = useState<FinanceExpense[]>(initialExpenses);
  const [tours] = useState<Tour[]>(initialTours);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [selectedTourCostId, setSelectedTourCostId] = useState<string | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const handleSelectTourCostDetail = (tourId: string) => {
    setSelectedTourCostId(tourId);
    setIsCostModalOpen(true);
  };

  const selectedTourCost = tours.find((t) => t.id === selectedTourCostId) || tours[0] || null;

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
          activeTab="finance_bop"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else if (tab === "fleet_management") router.push("/fleet");
            else if (tab === "crew_sdm") router.push("/crew");
            else if (tab === "dispatch_execution") router.push("/operations");
            else router.push("/dashboard");
          }}
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: expenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <FinanceBopView
            bopRecords={bopRecords}
            expenses={expenses}
            tours={tours}
            onSelectTourCostDetail={handleSelectTourCostDetail}
          />
        </main>
      </div>

      <TourCostDetailModal
        isOpen={isCostModalOpen}
        tour={selectedTourCost}
        expenses={expenses}
        onClose={() => setIsCostModalOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        notifications={notifications}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      />
    </div>
  );
}
