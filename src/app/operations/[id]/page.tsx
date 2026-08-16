"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { OperationalRole, Tour } from "@/types/travelOps";
import {
  initialTours,
  initialBookings,
  initialVehicles,
  initialCrews,
  initialExpenses,
  initialNotifications,
  initialMaintenance,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { TourDetailFullView } from "@/components/ops/views/TourDetailFullView";

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [currentRole, setCurrentRole] = useState<OperationalRole>("Operation Manager (OM)");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [bookings] = useState(initialBookings);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);
  const [expenses] = useState(initialExpenses);
  const [notifications] = useState(initialNotifications);

  const tour = tours.find((t) => t.id.toLowerCase() === resolvedParams.id.toLowerCase()) || tours[0];

  const handleConfirmHandover = (tourId: string) => {
    setTours((prev) =>
      prev.map((t) =>
        t.id === tourId
          ? {
              ...t,
              status: "On Trip",
              handoverDetails: t.handoverDetails ? { ...t.handoverDetails, status: "Confirmed" } : undefined,
            }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <RoleSelector currentRole={currentRole} onSelectRole={setCurrentRole} />

      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => {}}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        <SidebarNav
          activeTab="dispatch_execution"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else router.push("/operations");
          }}
          counts={{
            pendingBookings: bookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <TourDetailFullView
            tour={tour}
            bookings={bookings}
            vehicles={vehicles}
            crews={crews}
            expenses={expenses}
            onBack={() => router.push("/operations")}
            onConfirmHandover={handleConfirmHandover}
          />
        </main>
      </div>
    </div>
  );
}
