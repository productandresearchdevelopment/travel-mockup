"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Vehicle,
  VehicleLog,
  Maintenance,
  VehicleChecklist,
  VehicleRepairAssignment,
} from "@/types/travelOps";
import {
  initialVehicles,
  initialVehicleLogs,
  initialMaintenance,
  initialChecklists,
  initialRepairs,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { FleetManagementView } from "@/components/ops/views/FleetManagementView";
import { VehicleChecklistModal } from "@/components/ops/modals/VehicleChecklistModal";
import { MaintenanceModal } from "@/components/ops/modals/MaintenanceModal";

export default function FleetControlPage() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [logs] = useState<VehicleLog[]>(initialVehicleLogs);
  const [maintenance, setMaintenance] = useState<Maintenance[]>(initialMaintenance);
  const [checklists, setChecklists] = useState<VehicleChecklist[]>(initialChecklists);
  const [repairs] = useState<VehicleRepairAssignment[]>(initialRepairs);

  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string | undefined>(undefined);

  const handleOpenChecklistModal = (vehicleId?: string) => {
    setPreselectedVehicleId(vehicleId);
    setIsChecklistModalOpen(true);
  };

  const handleOpenMaintenanceModal = (vehicleId?: string) => {
    setPreselectedVehicleId(vehicleId);
    setIsMaintenanceModalOpen(true);
  };

  const handleSubmitChecklist = (data: any) => {
    const newChecklist: VehicleChecklist = {
      id: `CHK-${Date.now()}`,
      ...data,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setChecklists([newChecklist, ...checklists]);

    setVehicles((prev) =>
      prev.map((v) =>
        v.id === data.vehicleId
          ? {
              ...v,
              lastChecklist: newChecklist.timestamp,
              maintenanceStatus: data.overallResult === "Passed" ? "Good" : "Needs Inspection",
            }
          : v
      )
    );
  };

  const handleSubmitMaintenance = (data: any) => {
    const newM: Maintenance = {
      id: `MT-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: "Scheduled",
    };
    setMaintenance([newM, ...maintenance]);
  };

  const selectedVehicleForChecklist = vehicles.find((v) => v.id === preselectedVehicleId) || null;

  return (
    <AppLayout>
      <FleetManagementView
        vehicles={vehicles}
        logs={logs}
        maintenance={maintenance}
        checklists={checklists}
        repairs={repairs}
        onOpenChecklistModal={handleOpenChecklistModal}
        onOpenMaintenanceModal={handleOpenMaintenanceModal}
        onSelectVehicleDetail={(vehicleId) => router.push(`/fleet/vehicles/${vehicleId}`)}
      />

      <VehicleChecklistModal
        isOpen={isChecklistModalOpen}
        vehicle={selectedVehicleForChecklist}
        vehicles={vehicles}
        onClose={() => setIsChecklistModalOpen(false)}
        onSubmitChecklist={handleSubmitChecklist}
      />

      <MaintenanceModal
        isOpen={isMaintenanceModalOpen}
        preselectedVehicleId={preselectedVehicleId}
        vehicles={vehicles}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSubmitMaintenance={handleSubmitMaintenance}
      />
    </AppLayout>
  );
}
