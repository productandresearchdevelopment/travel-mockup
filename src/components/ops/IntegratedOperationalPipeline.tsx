"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Layers,
  Send,
  Compass,
  Anchor,
  BarChart3,
  CheckCircle2,
  XCircle,
  Truck,
  Users,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Clock,
  DollarSign,
  Activity,
  FileText,
} from "lucide-react";

export const IntegratedOperationalPipeline: React.FC = () => {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState<
    "booking" | "planning" | "dispatch" | "execution" | "handover" | "reporting"
  >("booking");

  // Step-Through Interactive State
  const [bookingStatus, setBookingStatus] = useState("Collected");
  const [vehicleAssigned, setVehicleAssigned] = useState(true);
  const [checklistPassed, setChecklistPassed] = useState(true);
  const [driverAssigned, setDriverAssigned] = useState(true);
  const [guideAssigned, setGuideAssigned] = useState(true);
  const [tmAssigned, setTmAssigned] = useState(true);
  const [deploymentStatus, setDeploymentStatus] = useState("Ready");
  const [tourProgress, setTourProgress] = useState(68);
  const [handoverStatus, setHandoverStatus] = useState("In Transit");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const isDeploymentClear =
    vehicleAssigned && checklistPassed && driverAssigned && guideAssigned && tmAssigned;

  return (
    <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] p-6 rounded-2xl space-y-6 shadow-xs font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="bg-[#16A34A] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#60A5FA] border border-blue-200 text-[11px] font-bold uppercase tracking-wider">
              Interactive Operational Pipeline
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">QIFESS End-to-End Control Flow</span>
          </div>
          <h2 className="text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">
            Integrated Operation Lifecycle Step-Through Prototype
          </h2>
          <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
            Click through the 6 operational stages below to experience the real-time cross-module data flow from reservation to financial reporting.
          </p>
        </div>
      </div>

      {/* VISUAL OPERATIONAL PIPELINE PROGRESS STEPPER */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
        {[
          { id: "booking", label: "1. BOOKING", sub: "Collector Ingestion", icon: ShoppingBag, color: "text-blue-600" },
          { id: "planning", label: "2. PLANNING", sub: "Dispatcher Grouping", icon: Layers, color: "text-purple-600" },
          { id: "dispatch", label: "3. DISPATCH", sub: "Resource Clearance", icon: Send, color: "text-cyan-600" },
          { id: "execution", label: "4. EXECUTION", sub: "Live Tour Control", icon: Compass, color: "text-emerald-600" },
          { id: "handover", label: "5. HANDOVER", sub: "Ferry Port Transfer", icon: Anchor, color: "text-amber-600" },
          { id: "reporting", label: "6. REPORTING", sub: "Cross-Module Audit", icon: BarChart3, color: "text-indigo-600" },
        ].map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStage === step.id;

          return (
            <div
              key={step.id}
              onClick={() => setActiveStage(step.id as any)}
              className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                isActive
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md ring-2 ring-blue-200 dark:ring-blue-900/50"
                  : "bg-[#F8FAFC] dark:bg-[#151E30] text-[#0F172A] dark:text-white border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#2563EB]"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : step.color}`} />
                <span className="font-extrabold text-[11px] truncate">{step.label}</span>
              </div>
              <span className={`text-[10px] block ${isActive ? "text-blue-100" : "text-[#475569] dark:text-[#94A3B8]"}`}>
                {step.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================================================== */}
      {/* STAGE CONTENT DISPLAY & INTERACTION */}
      {/* ================================================== */}

      {/* STAGE 1: BOOKING */}
      {activeStage === "booking" && (
        <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <span className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4.5 h-4.5 text-[#2563EB]" /> Stage 1: Collector Booking Ingestion
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
              Source: Ingested Reservations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Booking Ref:</span>
              <span className="font-mono font-bold text-[#2563EB] dark:text-[#60A5FA]">BK-260823-001</span>
              <span className="font-bold text-[#0F172A] dark:text-white block text-xs mt-1">Sarah Jenkins (4 Pax)</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Excursion Product:</span>
              <span className="font-bold text-[#0F172A] dark:text-white block text-xs">Bromo Sunrise VIP Excursion</span>
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] font-mono block">Date: 23 Aug 2026</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Pickup & Drop-off:</span>
              <span className="font-bold text-[#0F172A] dark:text-white block text-xs">Hotel Santika Premier Malang</span>
              <span className="text-[10px] text-[#2563EB] font-mono font-bold block">Pickup: 01:30 WIB</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setBookingStatus("Grouped");
                setActiveStage("planning");
                showToast("Booking BK-260823-001 grouped into Tour TR-260823-001!");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Group Reservation → Proceed to Planning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: PLANNING */}
      {activeStage === "planning" && (
        <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <span className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-purple-600" /> Stage 2: Operational Planning & Grouping
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-200">
              Dispatcher Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Group by Departure:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">23 Aug • Surabaya Hub (02:30 WIB)</span>
              <span className="text-[10px] text-[#2563EB] font-mono font-bold block">4 Bookings • 12 Pax Total</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Group by Destination:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">Mount Bromo & Sea of Sand</span>
              <span className="text-[10px] text-[#16A34A] font-semibold block">68% Overland Route</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Group by Drop-off:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">Hotel Santika & JW Marriott</span>
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Cluster 1 Route</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setActiveStage("dispatch");
                showToast("Planning locked. Matching Fleet & SDM resources...");
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Match Fleet & Crew → Proceed to Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: DISPATCH */}
      {activeStage === "dispatch" && (
        <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <span className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <Send className="w-4.5 h-4.5 text-cyan-600" /> Stage 3: Dispatch Clearance & Resource Matching
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                isDeploymentClear
                  ? "bg-[#F0FDF4] text-[#15803D] border-emerald-200"
                  : "bg-[#FEF2F2] text-[#B91C1C] border-rose-200"
              }`}
            >
              {isDeploymentClear ? "READY FOR DEPLOYMENT" : "NOT READY (Missing Resources)"}
            </span>
          </div>

          {/* Resource Checklist Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <div className="bg-white dark:bg-[#101726] p-2.5 rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Vehicle</span>
              <span className="font-bold text-[#16A34A] text-xs flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> N 7012 AA
              </span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-2.5 rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Checklist</span>
              <span className="font-bold text-[#16A34A] text-xs flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 9/9 Passed
              </span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-2.5 rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Driver</span>
              <span className="font-bold text-[#16A34A] text-xs flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Andi Pratama
              </span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-2.5 rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Local Guide</span>
              <span className="font-bold text-[#16A34A] text-xs flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Rizky R.
              </span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-2.5 rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Tour Manager</span>
              <span className="font-bold text-[#16A34A] text-xs flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hendra W.
              </span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-2.5 rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Manifest</span>
              <span className="font-bold text-[#16A34A] text-xs flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setDeploymentStatus("Dispatched");
                setActiveStage("execution");
                showToast("Excursion TR-260823-001 authorized & DISPATCHED!");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Authorize & Deploy Excursion → Proceed to Live Execution</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: TOUR EXECUTION */}
      {activeStage === "execution" && (
        <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <span className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-[#16A34A]" /> Stage 4: Live Tour Execution & Monitoring
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
              BM & Field Control
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Vehicle Movement & Fuel:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">N 7012 AA • 32 km/h</span>
              <span className="text-[10px] text-amber-600 font-mono font-bold block">Fuel Level: 92% • Odometer: 45,280 KM</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">SDM Attendance & Field Report:</span>
              <span className="font-bold text-[#16A34A] text-xs block">Check-In: 02:15 WIB (Present)</span>
              <span className="text-[10px] text-[#2563EB] font-bold block">Report #REP-001 Submitted (📷 3 Photos)</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Transit Checkpoint:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">Wonokitri Viewpoint Checkpoint</span>
              <span className="text-[10px] text-[#16A34A] font-mono font-bold block">Progress: 68% Completed</span>
            </div>
          </div>

          <div className="flex justify-end pt-2 gap-2">
            <button
              onClick={() => {
                setActiveStage("handover");
                showToast("Ketapang Ferry Handover initiated to BM Bali!");
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Anchor className="w-4 h-4" />
              <span>Initiate Ferry Handover → Proceed to Stage 5</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: HANDOVER */}
      {activeStage === "handover" && (
        <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <span className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <Anchor className="w-4.5 h-4.5 text-amber-500" /> Stage 5: Inter-Region Ferry Handover (Ketapang Port)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
              BM Java → BM Bali
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Inter-Region Route:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">East Java Corridor → Bali Corridor</span>
              <span className="text-[10px] text-purple-600 font-mono font-bold block">Ferry Station: Ketapang Port</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Responsible BMs:</span>
              <span className="font-bold text-[#0F172A] dark:text-white text-xs block">Budi Santoso (Java) → Wayan Gede (Bali)</span>
              <span className="text-[10px] text-[#16A34A] font-semibold block">Boarding Pass Verified</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-1">
              <span className="text-[#475569] dark:text-[#94A3B8] block text-[10px]">Transfer Status:</span>
              <span className="font-mono font-bold text-[#2563EB] text-xs block">In Transit (08:30 WIB Target)</span>
              <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] block">Bali Unit DK 8011 Waiting</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setHandoverStatus("Completed");
                setActiveStage("reporting");
                showToast("Handover confirmed! Tour data aggregated into Reporting.");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Handover & Complete Excursion → Proceed to Reporting</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 6: REPORTING */}
      {activeStage === "reporting" && (
        <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-3">
            <span className="font-bold text-sm text-[#0F172A] dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-indigo-600" /> Stage 6: Cross-Module Operational & Financial Audit
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
              Aggregated Operational Audit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white dark:bg-[#101726] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Bookings Audited</span>
              <span className="font-mono font-bold text-[#2563EB] text-sm">42 Reservations</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Deployments Cleared</span>
              <span className="font-mono font-bold text-[#16A34A] text-sm">12 Excursions</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">BOP Settled</span>
              <span className="font-mono font-bold text-[#16A34A] text-sm">Rp 35,000,000</span>
            </div>

            <div className="bg-white dark:bg-[#101726] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#475569] dark:text-[#94A3B8] text-[10px] block">Handover Audit</span>
              <span className="font-mono font-bold text-purple-600 text-sm">100% Confirmed</span>
            </div>
          </div>

          <div className="flex justify-end pt-2 gap-2">
            <button
              onClick={() => router.push("/reports")}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Open Executive Analytics & Reports Dashboard →</span>
            </button>
          </div>
        </div>
      )}

      {/* CROSS-MODULE RELATIONSHIP DIAGRAM */}
      <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] space-y-2 text-xs">
        <span className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px] block">
          Cross-Module Data Relationship Architecture
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono text-center">
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-2 rounded-lg border border-[#E2E8F0] text-[#2563EB]">
            BOOKING ➔ DISPATCHER
          </div>
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-2 rounded-lg border border-[#E2E8F0] text-purple-600">
            DISPATCHER ↔ FLEET & SDM
          </div>
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-2 rounded-lg border border-[#E2E8F0] text-cyan-600">
            FLEET & SDM ➔ EXECUTION
          </div>
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-2 rounded-lg border border-[#E2E8F0] text-[#16A34A]">
            EXECUTION ➔ BM & HANDOVER
          </div>
          <div className="bg-[#F8FAFC] dark:bg-[#151E30] p-2 rounded-lg border border-[#E2E8F0] text-amber-600">
            ALL DATA ➔ FINANCE & REPORTING
          </div>
        </div>
      </div>
    </div>
  );
};
