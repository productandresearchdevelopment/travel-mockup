"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  OperationalRole,
  Crew,
  Tour,
  CrewAttendance,
  CrewFieldReport,
} from "@/types/travelOps";
import {
  initialCrews,
  initialTours,
  initialAttendances,
  initialFieldReports,
  initialNotifications,
  initialBookings,
  initialMaintenance,
  initialExpenses,
  initialVehicles,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { CrewManagementView } from "@/components/ops/views/CrewManagementView";
import { AssignCrewVehicleModal } from "@/components/ops/modals/AssignCrewVehicleModal";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function CrewControlPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("SDM / Crew Management");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [crews] = useState<Crew[]>(initialCrews);
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [attendances] = useState<CrewAttendance[]>(initialAttendances);
  const [fieldReports] = useState<CrewFieldReport[]>(initialFieldReports);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAssignTourId, setSelectedAssignTourId] = useState<string | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const handleOpenAssignModal = (tourId: string) => {
    setSelectedAssignTourId(tourId);
    setIsAssignModalOpen(true);
  };

  const handleSubmitAssignment = (
    tourId: string,
    data: {
      vehicleId?: string;
      driverId?: string;
      tourManagerId?: string;
      guideId?: string;
      assistGuideId?: string;
    }
  ) => {
    setTours((prev) =>
      prev.map((t) =>
        t.id === tourId
          ? {
              ...t,
              vehicleId: data.vehicleId,
              driverId: data.driverId,
              tourManagerId: data.tourManagerId,
              guideId: data.guideId,
              assistGuideId: data.assistGuideId,
              status: "Ready",
            }
          : t
      )
    );
  };

  const selectedAssignTour = tours.find((t) => t.id === selectedAssignTourId) || null;

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
          activeTab="crew_sdm"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else if (tab === "fleet_management") router.push("/fleet");
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
          <CrewManagementView
            crews={crews}
            tours={tours}
            attendances={attendances}
            fieldReports={fieldReports}
            onSelectCrewDetail={(crewId) => router.push(`/crew/${crewId}`)}
            onOpenAssignModal={handleOpenAssignModal}
          />
        </main>
      </div>

      <AssignCrewVehicleModal
        isOpen={isAssignModalOpen}
        tour={selectedAssignTour}
        vehicles={vehicles}
        crews={crews}
        onClose={() => setIsAssignModalOpen(false)}
        onSubmitAssignment={handleSubmitAssignment}
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
