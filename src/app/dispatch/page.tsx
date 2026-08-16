"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  OperationalRole,
  Booking,
  Tour,
  Vehicle,
  Crew,
  Manifest,
  VehicleLog,
  Maintenance,
  FinanceExpense,
  TourStatus,
} from "@/types/travelOps";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
  initialManifests,
  initialVehicleLogs,
  initialMaintenance,
  initialExpenses,
  initialNotifications,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { DispatchDeploymentView } from "@/components/ops/views/DispatchDeploymentView";
import { GroupTourModal } from "@/components/ops/modals/GroupTourModal";
import { AssignCrewVehicleModal } from "@/components/ops/modals/AssignCrewVehicleModal";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function DispatchControlCenterPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("Dispatcher");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [crews, setCrews] = useState<Crew[]>(initialCrews);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedGroupBookingIds, setSelectedGroupBookingIds] = useState<string[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAssignTourId, setSelectedAssignTourId] = useState<string | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const pendingBookingsCount = bookings.filter((b) => b.status === "Pending Review").length;
  const activeToursCount = tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length;

  const handleOpenGroupModal = (bookingIds: string[]) => {
    setSelectedGroupBookingIds(bookingIds);
    setIsGroupModalOpen(true);
  };

  const handleOpenAssignModal = (tourId: string) => {
    setSelectedAssignTourId(tourId);
    setIsAssignModalOpen(true);
  };

  const handleSubmitGroupTour = (data: {
    tourName: string;
    date: string;
    origin: string;
    destination: string;
    dropOff: string;
    bookingIds: string[];
    vehicleId?: string;
    driverId?: string;
    guideId?: string;
  }) => {
    const newTourId = `TR-260815-${Math.floor(100 + Math.random() * 900)}`;
    const groupedPax = bookings
      .filter((b) => data.bookingIds.includes(b.id))
      .reduce((sum, b) => sum + b.pax, 0);

    const newTour: Tour = {
      id: newTourId,
      bookingIds: data.bookingIds,
      tourName: data.tourName,
      date: data.date,
      origin: data.origin,
      destination: data.destination,
      dropOff: data.dropOff,
      pax: groupedPax,
      status: "Planning",
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      guideId: data.guideId,
      checkpoints: [
        { location: `Dep. ${data.origin} Hub`, scheduledTime: "06:00", status: "Pending" },
        { location: `Arr. ${data.dropOff}`, scheduledTime: "18:00", status: "Pending" },
      ],
    };

    setTours([newTour, ...tours]);
    setBookings((prev) =>
      prev.map((b) =>
        data.bookingIds.includes(b.id)
          ? { ...b, status: "Grouped", groupedTourId: newTourId }
          : b
      )
    );
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

    if (data.vehicleId) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === data.vehicleId ? { ...v, status: "Assigned" } : v))
      );
    }
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
          activeTab="dispatch_execution"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else router.push("/dashboard");
          }}
          counts={{
            pendingBookings: pendingBookingsCount,
            activeTours: activeToursCount,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <DispatchDeploymentView
            bookings={bookings}
            tours={tours}
            vehicles={vehicles}
            crews={crews}
            onOpenAssignModal={handleOpenAssignModal}
            onOpenGroupModal={handleOpenGroupModal}
            onUpdateTourStatus={(tourId, status) =>
              setTours((prev) => prev.map((t) => (t.id === tourId ? { ...t, status } : t)))
            }
          />
        </main>
      </div>

      <GroupTourModal
        isOpen={isGroupModalOpen}
        selectedBookingIds={selectedGroupBookingIds}
        bookings={bookings}
        vehicles={vehicles}
        crews={crews}
        onClose={() => setIsGroupModalOpen(false)}
        onSubmitGroupTour={handleSubmitGroupTour}
      />

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
