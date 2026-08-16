"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
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
  initialVehicles,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { CrewManagementView } from "@/components/ops/views/CrewManagementView";
import { AssignCrewVehicleModal } from "@/components/ops/modals/AssignCrewVehicleModal";

export default function CrewControlPage() {
  const router = useRouter();

  const [crews] = useState<Crew[]>(initialCrews);
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [vehicles] = useState(initialVehicles);
  const [attendances] = useState<CrewAttendance[]>(initialAttendances);
  const [fieldReports] = useState<CrewFieldReport[]>(initialFieldReports);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAssignTourId, setSelectedAssignTourId] = useState<string | null>(null);

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
    <AppLayout>
      <CrewManagementView
        crews={crews}
        tours={tours}
        attendances={attendances}
        fieldReports={fieldReports}
        onSelectCrewDetail={(crewId) => router.push(`/crew/${crewId}`)}
        onOpenAssignModal={handleOpenAssignModal}
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
