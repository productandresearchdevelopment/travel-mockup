"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Booking,
  Tour,
  Vehicle,
  Crew,
} from "@/types/travelOps";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { BookingGroupingView } from "@/components/ops/views/BookingGroupingView";
import { BookingDetailDrawer } from "@/components/ops/modals/BookingDetailDrawer";
import { GroupTourModal } from "@/components/ops/modals/GroupTourModal";

export default function BookingsManagementPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [crews] = useState<Crew[]>(initialCrews);

  const [selectedBookingDetail, setSelectedBookingDetail] = useState<Booking | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedGroupBookingIds, setSelectedGroupBookingIds] = useState<string[]>([]);

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
    <AppLayout>
      <BookingGroupingView
        bookings={bookings}
        onSelectBookingDetail={handleSelectBookingDetail}
        onGroupBookings={(ids) => handleOpenGroupModal(ids)}
      />

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
    </AppLayout>
  );
}
