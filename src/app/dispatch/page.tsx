"use client";

import React, { useState } from "react";
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
import { DispatchDeploymentView } from "@/components/ops/views/DispatchDeploymentView";
import { GroupTourModal } from "@/components/ops/modals/GroupTourModal";
import { AssignCrewVehicleModal } from "@/components/ops/modals/AssignCrewVehicleModal";

export default function DispatchControlCenterPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [crews] = useState<Crew[]>(initialCrews);

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedGroupBookingIds, setSelectedGroupBookingIds] = useState<string[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAssignTourId, setSelectedAssignTourId] = useState<string | null>(null);

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
    <AppLayout>
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
    </AppLayout>
  );
}
