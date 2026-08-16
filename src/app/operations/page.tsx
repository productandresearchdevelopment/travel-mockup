"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tour, Vehicle, Crew } from "@/types/travelOps";
import {
  initialTours,
  initialVehicles,
  initialCrews,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { TourMonitoringView } from "@/components/ops/views/TourMonitoringView";

export default function TourOperationsPage() {
  const router = useRouter();

  const [tours] = useState<Tour[]>(initialTours);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [crews] = useState<Crew[]>(initialCrews);

  return (
    <AppLayout>
      <TourMonitoringView
        tours={tours}
        vehicles={vehicles}
        crews={crews}
        onSelectTourDetail={(tourId) => router.push(`/operations/${tourId}`)}
      />
    </AppLayout>
  );
}
