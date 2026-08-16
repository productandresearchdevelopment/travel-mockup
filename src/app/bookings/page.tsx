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
import { SidebarNav, NavTab } from "@/components/ops/SidebarNav";
import { BookingGroupingView } from "@/components/ops/views/BookingGroupingView";

import { BookingDetailDrawer } from "@/components/ops/modals/BookingDetailDrawer";
import { GroupTourModal } from "@/components/ops/modals/GroupTourModal";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function BookingsManagementPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("Operation Manager (OM)");
  const [activeTab, setActiveTab] = useState<NavTab>("booking_grouping");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [crews] = useState<Crew[]>(initialCrews);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [selectedBookingDetail, setSelectedBookingDetail] = useState<Booking | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedGroupBookingIds, setSelectedGroupBookingIds] = useState<string[]>([]);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const pendingBookingsCount = bookings.filter((b) => b.status === "Pending Review").length;
  const activeToursCount = tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length;
  const maintenanceDueCount = initialMaintenance.filter((m) => m.status === "Due").length;
  const pendingBopCount = initialExpenses.filter((e) => e.status === "Submitted").length;

  const handleSelectBookingDetail = (booking: Booking) => {
    router.push(`/bookings/${booking.id}`);
  };

  const handleOpenGroupModal = (bookingIds?: string[]) => {
    if (bookingIds && bookingIds.length > 0) {
      setSelectedGroupBookingIds(bookingIds);
    } else {
      const pendingIds = bookings.filter((b) => b.status === "Pending Review").map((b) => b.id);
      setSelectedGroupBookingIds(pendingIds.slice(0, 3));
    }
    setIsGroupModalOpen(true);
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
        { location: "Sukapura Bromo Jeep Point", scheduledTime: "14:00", status: "Pending" },
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
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else setActiveTab(tab);
          }}
          counts={{
            pendingBookings: pendingBookingsCount,
            activeTours: activeToursCount,
            maintenanceDue: maintenanceDueCount,
            pendingBop: pendingBopCount,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <BookingGroupingView
            bookings={bookings}
            onSelectBookingDetail={handleSelectBookingDetail}
            onGroupBookings={(ids) => handleOpenGroupModal(ids)}
          />
        </main>
      </div>

      <BookingDetailDrawer
        booking={selectedBookingDetail}
        onClose={() => setSelectedBookingDetail(null)}
        onGroupBooking={(bookingId) => handleOpenGroupModal([bookingId])}
      />

      <GroupTourModal
        isOpen={isGroupModalOpen}
        selectedBookingIds={selectedGroupBookingIds}
        bookings={bookings}
        vehicles={vehicles}
        crews={crews}
        onClose={() => setIsGroupModalOpen(false)}
        onSubmitGroupTour={handleSubmitGroupTour}
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
