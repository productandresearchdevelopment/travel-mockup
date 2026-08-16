"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { BookingDetailFullView } from "@/components/ops/views/BookingDetailFullView";
import { GroupTourModal } from "@/components/ops/modals/GroupTourModal";

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [bookings] = useState(initialBookings);
  const [tours, setTours] = useState(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);

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
    <AppLayout>
      <BookingDetailFullView
        booking={booking}
        tours={tours}
        vehicles={vehicles}
        crews={crews}
        onBack={() => router.push("/bookings")}
        onAssignToTour={() => setIsGroupModalOpen(true)}
      />

      <GroupTourModal
        isOpen={isGroupModalOpen}
        selectedBookingIds={[booking.id]}
        bookings={bookings}
        vehicles={vehicles}
        crews={crews}
        onClose={() => setIsGroupModalOpen(false)}
        onSubmitGroupTour={handleGroupTourSubmit}
      />
    </AppLayout>
  );
}
