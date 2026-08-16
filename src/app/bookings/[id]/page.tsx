"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { OperationalRole } from "@/types/travelOps";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
  initialNotifications,
  initialMaintenance,
  initialExpenses,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { BookingDetailFullView } from "@/components/ops/views/BookingDetailFullView";
import { GroupTourModal } from "@/components/ops/modals/GroupTourModal";

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [currentRole, setCurrentRole] = useState<OperationalRole>("Operation Manager (OM)");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookings] = useState(initialBookings);
  const [tours, setTours] = useState(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);
  const [notifications] = useState(initialNotifications);

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const booking = bookings.find((b) => b.id.toLowerCase() === resolvedParams.id.toLowerCase()) || bookings[0];

  const handleGroupTourSubmit = (data: {
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
    const newTour = {
      id: newTourId,
      bookingIds: data.bookingIds,
      tourName: data.tourName,
      date: data.date,
      origin: data.origin,
      destination: data.destination,
      dropOff: data.dropOff,
      pax: booking.pax,
      status: "Planning" as const,
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      guideId: data.guideId,
      checkpoints: [
        { location: `Dep. ${data.origin} Hub`, scheduledTime: "06:00", status: "Pending" as const },
        { location: `Arr. ${data.dropOff}`, scheduledTime: "18:00", status: "Pending" as const },
      ],
    };
    setTours([newTour, ...tours]);
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
          activeTab="booking_grouping"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else router.push("/dashboard");
          }}
          counts={{
            pendingBookings: bookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
          <BookingDetailFullView
            booking={booking}
            tours={tours}
            vehicles={vehicles}
            crews={crews}
            onBack={() => router.push("/bookings")}
            onAssignToTour={() => setIsGroupModalOpen(true)}
          />
        </main>
      </div>

      <GroupTourModal
        isOpen={isGroupModalOpen}
        selectedBookingIds={[booking.id]}
        bookings={bookings}
        vehicles={vehicles}
        crews={crews}
        onClose={() => setIsGroupModalOpen(false)}
        onSubmitGroupTour={handleGroupTourSubmit}
      />
    </div>
  );
}
