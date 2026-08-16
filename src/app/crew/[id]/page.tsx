"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { OperationalRole } from "@/types/travelOps";
import {
  initialCrews,
  initialTours,
  initialAttendances,
  initialFieldReports,
  initialNotifications,
  initialBookings,
  initialMaintenance,
  initialExpenses,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { CrewDetailFullView } from "@/components/ops/views/CrewDetailFullView";

export default function CrewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [currentRole, setCurrentRole] = useState<OperationalRole>("SDM / Crew Management");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [crews] = useState(initialCrews);
  const [tours] = useState(initialTours);
  const [attendances] = useState(initialAttendances);
  const [fieldReports] = useState(initialFieldReports);
  const [notifications] = useState(initialNotifications);

  const crew = crews.find((c) => c.id.toLowerCase() === resolvedParams.id.toLowerCase()) || crews[0];

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
          activeTab="crew_sdm"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else router.push("/crew");
          }}
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <CrewDetailFullView
            crew={crew}
            tours={tours}
            attendances={attendances}
            fieldReports={fieldReports}
            onBack={() => router.push("/crew")}
          />
        </main>
      </div>
    </div>
  );
}
