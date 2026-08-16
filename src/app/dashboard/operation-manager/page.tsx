"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  initialBookings,
  initialTours,
  initialVehicles,
  initialCrews,
  initialNotifications,
  initialExpenses,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { ControlRoomView } from "@/components/ops/views/ControlRoomView";

export default function OperationManagerDashboardPage() {
  const router = useRouter();

  const [bookings] = useState(initialBookings);
  const [tours] = useState(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);
  const [expenses] = useState(initialExpenses);
  const [notifications] = useState(initialNotifications);

  return (
    <AppLayout>
      <ControlRoomView
        bookings={bookings}
        tours={tours}
        vehicles={vehicles}
        crews={crews}
        expenses={expenses}
        notifications={notifications}
        onNavigateTab={(tab) => router.push("/operations")}
        onSelectTour={(tourId) => router.push(`/operations/${tourId}`)}
        onOpenGroupModal={() => router.push("/bookings")}
        onOpenAssignModal={(tourId) => router.push("/dispatch")}
      />
    </AppLayout>
  );
}
