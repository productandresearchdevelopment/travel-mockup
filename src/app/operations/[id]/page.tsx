"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Tour } from "@/types/travelOps";
import {
  initialTours,
  initialBookings,
  initialVehicles,
  initialCrews,
  initialExpenses,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { TourDetailFullView } from "@/components/ops/views/TourDetailFullView";

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [bookings] = useState(initialBookings);
  const [vehicles] = useState(initialVehicles);
  const [crews] = useState(initialCrews);
  const [expenses] = useState(initialExpenses);

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
    <AppLayout>
      <TourDetailFullView
        tour={tour}
        bookings={bookings}
        vehicles={vehicles}
        crews={crews}
        expenses={expenses}
        onBack={() => router.push("/operations")}
        onConfirmHandover={handleConfirmHandover}
      />
    </AppLayout>
  );
}
