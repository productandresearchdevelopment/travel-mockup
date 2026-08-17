"use client";

import React, { useState } from "react";
import { X, CheckCircle2, XCircle, Send, Truck, User, ShieldCheck, MapPin, Calendar, Clock } from "lucide-react";

interface DispatcherDeploymentDetailDrawerProps {
  deployment: any | null;
  onClose: () => void;
  onUpdateDeployment?: (updated: any) => void;
}

export const DispatcherDeploymentDetailDrawer: React.FC<DispatcherDeploymentDetailDrawerProps> = ({
  deployment: initialDeployment,
  onClose,
  onUpdateDeployment,
}) => {
  if (!initialDeployment) return null;

  const [deployment, setDeployment] = useState(initialDeployment);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAssignResource = (resourceType: "vehicle" | "driver" | "guide" | "tourManager", name: string) => {
    const updatedResources = {
      ...deployment.resources,
      [resourceType]: { assigned: true, name },
    };

    const allAssigned =
      updatedResources.vehicle.assigned &&
      updatedResources.driver.assigned &&
      updatedResources.guide.assigned &&
      updatedResources.tourManager.assigned;

    const updated = {
      ...deployment,
      resources: updatedResources,
      isReady: allAssigned,
      status: allAssigned ? "Ready" : "Incomplete",
      readinessLabel: allAssigned ? "READY FOR DEPLOYMENT" : `NOT READY FOR DEPLOYMENT (Missing ${resourceType})`,
    };

    setDeployment(updated);
    if (onUpdateDeployment) onUpdateDeployment(updated);
    showToast(`Assigned ${name} to ${resourceType.toUpperCase()}`);
  };

  const handleMarkReady = () => {
    const updated = {
      ...deployment,
      status: "Ready",
      isReady: true,
      readinessLabel: "READY FOR DEPLOYMENT",
    };
    setDeployment(updated);
    if (onUpdateDeployment) onUpdateDeployment(updated);
    showToast(`Deployment ${deployment.id} marked as READY FOR DEPLOYMENT`);
  };

  const handleDeploy = () => {
    const updated = {
      ...deployment,
      status: "Dispatched",
      readinessLabel: "DISPATCHED & EN ROUTE",
    };
    setDeployment(updated);
    if (onUpdateDeployment) onUpdateDeployment(updated);
    showToast(`Excursion ${deployment.id} authorized & DISPATCHED!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-[#101726] border-l border-[#E2E8F0] dark:border-[#1E293B] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Toast */}
          {toastMsg && (
            <div className="bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] bg-[#EFF6FF] dark:bg-[#172A4A] px-2.5 py-0.5 rounded border border-blue-200/60">
                  {deployment.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                    deployment.isReady
                      ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                      : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
                  }`}
                >
                  {deployment.readinessLabel}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white mt-1">
                {deployment.tourName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Schedule & Route Information */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider">
                Departure Schedule
              </span>
              <div className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                <span>{deployment.departure}</span>
              </div>
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] font-mono block">Date: {deployment.date}</span>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider">
                Destination & Drop-off
              </span>
              <div className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#16A34A] dark:text-[#4ADE80]" />
                <span>{deployment.destination}</span>
              </div>
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Drop-off: {deployment.dropOff} ({deployment.pax} Pax)</span>
            </div>
          </div>

          {/* Resource Assignment Matrix (Vehicle, Driver, Guide, TM) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-2">
              <span className="font-bold text-xs text-[#0F172A] dark:text-white uppercase tracking-wider">
                Resource Allocation Matrix & Readiness
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* VEHICLE */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-500" /> Vehicle
                  </span>
                  {deployment.resources.vehicle.assigned ? (
                    <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                    </span>
                  ) : (
                    <span className="text-[#B91C1C] font-bold text-[11px] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>
                <div className="font-mono text-xs font-bold text-[#0F172A] dark:text-white">
                  {deployment.resources.vehicle.name}
                </div>
                {!deployment.resources.vehicle.assigned && (
                  <button
                    onClick={() => handleAssignResource("vehicle", "N 7012 AA (Hiace Premio)")}
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] py-1 rounded font-bold cursor-pointer"
                  >
                    Assign Vehicle (Hiace Premio)
                  </button>
                )}
              </div>

              {/* DRIVER */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-500" /> Lead Driver
                  </span>
                  {deployment.resources.driver.assigned ? (
                    <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                    </span>
                  ) : (
                    <span className="text-[#B91C1C] font-bold text-[11px] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-[#0F172A] dark:text-white">
                  {deployment.resources.driver.name}
                </div>
                {!deployment.resources.driver.assigned && (
                  <button
                    onClick={() => handleAssignResource("driver", "Andi Pratama")}
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] py-1 rounded font-bold cursor-pointer"
                  >
                    Assign Driver (Andi Pratama)
                  </button>
                )}
              </div>

              {/* LOCAL GUIDE */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-500" /> Local Guide
                  </span>
                  {deployment.resources.guide.assigned ? (
                    <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                    </span>
                  ) : (
                    <span className="text-[#B91C1C] font-bold text-[11px] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-[#0F172A] dark:text-white">
                  {deployment.resources.guide.name}
                </div>
                {!deployment.resources.guide.assigned && (
                  <button
                    onClick={() => handleAssignResource("guide", "Rizky Ramadhan")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[10px] py-1 rounded font-bold cursor-pointer"
                  >
                    Assign Guide (Rizky Ramadhan)
                  </button>
                )}
              </div>

              {/* TOUR MANAGER */}
              <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Tour Manager
                  </span>
                  {deployment.resources.tourManager.assigned ? (
                    <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                    </span>
                  ) : (
                    <span className="text-[#B91C1C] font-bold text-[11px] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-[#0F172A] dark:text-white">
                  {deployment.resources.tourManager.name}
                </div>
                {!deployment.resources.tourManager.assigned && (
                  <button
                    onClick={() => handleAssignResource("tourManager", "Hendra Wijaya")}
                    className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[10px] py-1 rounded font-bold cursor-pointer"
                  >
                    Assign TM (Hendra Wijaya)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#151E30] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#1E293B] font-bold text-xs cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {!deployment.isReady && (
              <button
                onClick={handleMarkReady}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Mark Ready
              </button>
            )}

            <button
              onClick={handleDeploy}
              disabled={deployment.status === "Dispatched"}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Authorize & Deploy Excursion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
