"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { OperationalRole, Vehicle, VehicleChecklist, Maintenance } from "@/types/travelOps";
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
import { VehicleDetailFullView } from "@/components/ops/views/VehicleDetailFullView";
import { VehicleChecklistModal } from "@/components/ops/modals/VehicleChecklistModal";
import { MaintenanceModal } from "@/components/ops/modals/MaintenanceModal";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [currentRole, setCurrentRole] = useState<OperationalRole>("Vehicle / Fleet Management");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [logs] = useState(initialVehicleLogs);
  const [maintenance, setMaintenance] = useState<Maintenance[]>(initialMaintenance);
  const [checklists, setChecklists] = useState<VehicleChecklist[]>(initialChecklists);
  const [repairs] = useState(initialRepairs);
  const [tours] = useState(initialTours);
  const [crews] = useState(initialCrews);
  const [notifications] = useState(initialNotifications);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <RoleSelector currentRole={currentRole} onSelectRole={setCurrentRole} />

      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => {}}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        <SidebarNav
          activeTab="fleet_management"
          onSelectTab={(tab) => {
            if (tab === "control_room") router.push("/dashboard");
            else if (tab === "booking_grouping") router.push("/bookings");
            else router.push("/fleet");
          }}
          counts={{
            pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
            activeTours: tours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
            maintenanceDue: maintenance.filter((m) => m.status === "Due").length,
            pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
          }}
        />

        <main className="flex-1 p-5 overflow-y-auto max-w-full space-y-6">
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
        </main>
      </div>

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
    </div>
  );
}
