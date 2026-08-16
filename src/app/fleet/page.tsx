"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  OperationalRole,
  Vehicle,
  VehicleLog,
  Maintenance,
  VehicleChecklist,
  VehicleRepairAssignment,
  Tour,
  Crew,
} from "@/types/travelOps";
import {
  initialVehicles,
  initialVehicleLogs,
  initialMaintenance,
  initialChecklists,
  initialRepairs,
  initialTours,
  initialCrews,
  initialNotifications,
  initialBookings,
  initialExpenses,
} from "@/data/mockData";

import { RoleSelector } from "@/components/ops/RoleSelector";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { FleetManagementView } from "@/components/ops/views/FleetManagementView";

import { VehicleChecklistModal } from "@/components/ops/modals/VehicleChecklistModal";
import { MaintenanceModal } from "@/components/ops/modals/MaintenanceModal";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";

export default function FleetControlPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<OperationalRole>("Vehicle / Fleet Management");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [logs] = useState<VehicleLog[]>(initialVehicleLogs);
  const [maintenance, setMaintenance] = useState<Maintenance[]>(initialMaintenance);
  const [checklists, setChecklists] = useState<VehicleChecklist[]>(initialChecklists);
  const [repairs] = useState<VehicleRepairAssignment[]>(initialRepairs);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string | undefined>(undefined);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <RoleSelector currentRole={currentRole} onSelectRole={setCurrentRole} />

      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        <SidebarNav
          activeTab="fleet_management"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else router.push("/dashboard");
          }}
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: initialTours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: maintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
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
        </main>
      </div>

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

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        notifications={notifications}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      />
    </div>
  );
}
