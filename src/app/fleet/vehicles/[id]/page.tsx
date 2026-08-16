"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Vehicle, VehicleChecklist, Maintenance } from "@/types/travelOps";
import {
  initialVehicles,
  initialVehicleLogs,
  initialMaintenance,
  initialChecklists,
  initialRepairs,
  initialTours,
  initialCrews,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { VehicleDetailFullView } from "@/components/ops/views/VehicleDetailFullView";
import { VehicleChecklistModal } from "@/components/ops/modals/VehicleChecklistModal";
import { MaintenanceModal } from "@/components/ops/modals/MaintenanceModal";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [logs] = useState(initialVehicleLogs);
  const [maintenance, setMaintenance] = useState<Maintenance[]>(initialMaintenance);
  const [checklists, setChecklists] = useState<VehicleChecklist[]>(initialChecklists);
  const [repairs] = useState(initialRepairs);
  const [tours] = useState(initialTours);
  const [crews] = useState(initialCrews);

  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  const vehicle = vehicles.find((v) => v.id.toLowerCase() === resolvedParams.id.toLowerCase()) || vehicles[0];

  const handleSubmitChecklist = (data: any) => {
    const newChecklist: VehicleChecklist = {
      id: `CHK-${Date.now()}`,
      ...data,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setChecklists([newChecklist, ...checklists]);
  };

  const handleSubmitMaintenance = (data: any) => {
    const newM: Maintenance = {
      id: `MT-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: "Scheduled",
    };
    setMaintenance([newM, ...maintenance]);
  };

  return (
    <AppLayout>
      <VehicleDetailFullView
        vehicle={vehicle}
        logs={logs}
        maintenance={maintenance}
        checklists={checklists}
        repairs={repairs}
        tours={tours}
        crews={crews}
        onBack={() => router.push("/fleet")}
        onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
        onOpenMaintenanceModal={() => setIsMaintenanceModalOpen(true)}
      />

      <VehicleChecklistModal
        isOpen={isChecklistModalOpen}
        vehicle={vehicle}
        vehicles={vehicles}
        onClose={() => setIsChecklistModalOpen(false)}
        onSubmitChecklist={handleSubmitChecklist}
      />

      <MaintenanceModal
        isOpen={isMaintenanceModalOpen}
        preselectedVehicleId={vehicle.id}
        vehicles={vehicles}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSubmitMaintenance={handleSubmitMaintenance}
      />
    </AppLayout>
  );
}
