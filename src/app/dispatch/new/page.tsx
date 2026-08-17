"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockDestinationsData } from "@/data/mockDestinations";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockDriversData } from "@/data/mockDrivers";
import { mockGuidesData } from "@/data/mockGuides";
import { mockTourManagersData } from "@/data/mockTourManagers";
import { mockHotelsData } from "@/data/mockHotels";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Truck,
  UserCheck,
  Briefcase,
  Hotel,
  Clock,
  DollarSign,
  ShieldCheck,
  Save,
  Check,
} from "lucide-react";

export default function CreateDeploymentPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [deploymentName, setDeploymentName] = useState("Bromo Sunrise Tour");
  const [date, setDate] = useState("2026-08-21");
  const [destinationId, setDestinationId] = useState(mockDestinationsData[0].id);
  const [paxCount, setPaxCount] = useState(12);
  const [bookingReference, setBookingReference] = useState("BK-2026-8801");
  const [notes, setNotes] = useState("Rombongan keluarga besar. Tiba di Cemorolawang sebelum jam 04:00.");

  const [vehicleId, setVehicleId] = useState(mockVehiclesData[0].id);
  const [driverId, setDriverId] = useState(mockDriversData[0].id);
  const [guideId, setGuideId] = useState(mockGuidesData[0].id);
  const [tourManagerId, setTourManagerId] = useState(mockTourManagersData[0].id);
  const [hotelId, setHotelId] = useState(mockHotelsData[0].id);

  const [departureTime, setDepartureTime] = useState("03:00");
  const [estimatedEndTime, setEstimatedEndTime] = useState("17:00");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected master references
  const selectedDest = mockDestinationsData.find((d) => d.id === destinationId) || mockDestinationsData[0];
  const selectedVeh = mockVehiclesData.find((v) => v.id === vehicleId) || mockVehiclesData[0];
  const selectedDrv = mockDriversData.find((d) => d.id === driverId) || mockDriversData[0];
  const selectedGde = mockGuidesData.find((g) => g.id === guideId);
  const selectedTM = mockTourManagersData.find((t) => t.id === tourManagerId) || mockTourManagersData[0];
  const selectedHtl = mockHotelsData.find((h) => h.id === hotelId);

  // Real-time validations
  const isPaxCapacityValid = paxCount <= selectedVeh.passengerCapacity;
  const isVehicleCompatible = selectedDest.vehicleRestriction.includes("4WD")
    ? selectedVeh.vehicleType.toLowerCase().includes("4wd") || selectedVeh.vehicleType.toLowerCase().includes("jeep") || selectedVeh.name.toLowerCase().includes("hiace")
    : true;
  const isGuideValid = selectedDest.guideRequirement === "Required" ? !!selectedGde : true;
  const isDriverAvailable = selectedDrv.operationalStatus === "Available";
  const isTMAvailable = selectedTM.operationalStatus === "Available";

  const isWithinHours = true;
  const hasNoOverlapConflicts = isDriverAvailable && isTMAvailable && isPaxCapacityValid;

  const estimatedVehicleCost = (selectedVeh.rate?.rateAmount || 850000) * 2;

  const handleSave = (finalStatus: "Draft" | "Ready") => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dispatch");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Create Operational Deployment"
        description="Assign master vehicles, drivers, guides, tour managers, and hotels for a tour deployment."
        breadcrumbItems={[
          { label: "Dispatcher", href: "/dispatch" },
          { label: "Create Deployment" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dispatch")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Cancel
          </Button>
        }
      />

      {/* Step Indicator Header */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
        <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
          {[
            { step: 1, label: "1. Trip Info" },
            { step: 2, label: "2. Resources" },
            { step: 3, label: "3. Schedule" },
            { step: 4, label: "4. Review" },
            { step: 5, label: "5. Confirm" },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`py-2 rounded-lg transition-all cursor-pointer border ${
                currentStep === s.step
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : currentStep > s.step
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                  : "bg-slate-50 dark:bg-[#162034] text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* STEP 1: TRIP INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Compass className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Step 1: Trip & Destination Selection
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Deployment Name" required hint="e.g. Bromo Sunrise Tour">
                  <input
                    type="text"
                    required
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                  />
                </FormField>

                <FormField label="Deployment Date" required>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
                  />
                </FormField>

                <FormField label="Destination (Selected from Destination Master)" required>
                  <Select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    options={mockDestinationsData.map((d) => ({
                      value: d.id,
                      label: `${d.name} (${d.city}, ${d.region})`,
                    }))}
                  />
                </FormField>

                <FormField label="Passenger Count (Pax)" required>
                  <input
                    type="number"
                    required
                    value={paxCount}
                    onChange={(e) => setPaxCount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
                  />
                </FormField>
              </div>
            </Card>

            {/* Read-Only Destination Context Panel */}
            <Card className="p-6 space-y-3 bg-gradient-to-r from-teal-50/60 to-white dark:from-[#101726] dark:to-[#162034] border-teal-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-teal-200/60 dark:border-slate-800">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                  DESTINATION MASTER CONTEXT PANEL (READ-ONLY SOURCE DATA)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Master Ref: {selectedDest.code}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Region & City</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{selectedDest.city}, {selectedDest.region}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Operating Hours</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedDest.operatingHoursText}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Guide Requirement</span>
                  <Badge variant={selectedDest.guideRequirement === "Required" ? "danger" : "slate"}>
                    {selectedDest.guideRequirement}
                  </Badge>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Vehicle Requirement</span>
                  <span className="font-bold text-teal-700 dark:text-teal-300">{selectedDest.vehicleRestriction}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 2: RESOURCE ASSIGNMENT */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Truck className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Step 2: Assign Resources from Master Collections
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                {/* Vehicle Selection & Validation */}
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50">
                  <FormField label="Assign Vehicle (From Vehicle Master)" required>
                    <Select
                      value={vehicleId}
                      onChange={(e) => setVehicleId(e.target.value)}
                      options={mockVehiclesData.map((v) => ({
                        value: v.id,
                        label: `${v.name} (${v.licensePlate}) - Cap: ${v.passengerCapacity} Pax - ${v.status}`,
                      }))}
                    />
                  </FormField>

                  <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                    <span className="text-[11px] text-slate-500">
                      Plate: <strong className="font-mono">{selectedVeh.licensePlate}</strong> | Capacity: <strong>{selectedVeh.passengerCapacity} Pax</strong>
                    </span>

                    {/* Pax Validation Check */}
                    {isPaxCapacityValid ? (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ✓ Capacity Sufficient ({paxCount} Pax ≤ {selectedVeh.passengerCapacity} Cap)
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> ⚠ Vehicle Capacity Insufficient ({paxCount} Pax &gt; {selectedVeh.passengerCapacity} Cap)
                      </span>
                    )}
                  </div>
                </div>

                {/* Driver Selection & Validation */}
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50">
                  <FormField label="Assign Driver (From Driver Master)" required>
                    <Select
                      value={driverId}
                      onChange={(e) => setDriverId(e.target.value)}
                      options={mockDriversData.map((d) => ({
                        value: d.id,
                        label: `${d.fullName} (${d.license.licenseType}) - Status: ${d.operationalStatus}`,
                      }))}
                    />
                  </FormField>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500">Driver Status: <Badge status={selectedDrv.operationalStatus} /></span>
                    {isDriverAvailable ? (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ✓ Driver Available
                      </span>
                    ) : (
                      <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> ⚠ Driver Status Warning ({selectedDrv.operationalStatus})
                      </span>
                    )}
                  </div>
                </div>

                {/* Guide Selection & Enforcement Validation */}
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50">
                  <FormField label={`Assign Guide ${selectedDest.guideRequirement === "Required" ? "*" : ""}`}>
                    <Select
                      value={guideId}
                      onChange={(e) => setGuideId(e.target.value)}
                      options={[
                        { value: "", label: "No Guide Assigned (Not Required)" },
                        ...mockGuidesData.map((g) => ({
                          value: g.id,
                          label: `${g.fullName} (${g.languages.join(", ")}) - Status: ${g.operationalStatus}`,
                        })),
                      ]}
                    />
                  </FormField>

                  {selectedDest.guideRequirement === "Required" && (
                    <div className="pt-1">
                      {isGuideValid ? (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ✓ Guide Requirement Satisfied ({selectedGde?.fullName})
                        </span>
                      ) : (
                        <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> ⚠ Guide Assignment Mandatory for {selectedDest.name}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Tour Manager Selection */}
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50">
                  <FormField label="Assign Tour Manager (From TM Master)" required>
                    <Select
                      value={tourManagerId}
                      onChange={(e) => setTourManagerId(e.target.value)}
                      options={mockTourManagersData.map((t) => ({
                        value: t.id,
                        label: `${t.fullName} (${t.specialization}) - Status: ${t.operationalStatus}`,
                      }))}
                    />
                  </FormField>
                </div>

                {/* Hotel Selection */}
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034]/50">
                  <FormField label="Assign Hotel Accommodation (Optional)">
                    <Select
                      value={hotelId}
                      onChange={(e) => setHotelId(e.target.value)}
                      options={mockHotelsData.map((h) => ({
                        value: h.id,
                        label: `${h.name} (${h.city}) - Available: ${h.totalAvailableRooms} Rooms`,
                      }))}
                    />
                  </FormField>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 3: SCHEDULE & CONFLICT VALIDATION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Step 3: Schedule & Conflict Check
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Departure Time" required>
                  <input
                    type="time"
                    required
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold"
                  />
                </FormField>

                <FormField label="Estimated End Time" required>
                  <input
                    type="time"
                    required
                    value={estimatedEndTime}
                    onChange={(e) => setEstimatedEndTime(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold"
                  />
                </FormField>
              </div>
            </Card>

            {/* Resource Checkbox Summary List */}
            <Card className="p-6 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider block pb-2 border-b border-slate-100 dark:border-slate-800">
                AUTOMATED DISPATCH RESOURCE VERIFICATION CHECKLIST
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#162034]">
                  <span>Destination Operating Hours Check ({selectedDest.operatingHoursText})</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Valid</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#162034]">
                  <span>Vehicle Capacity Check ({paxCount} Pax vs {selectedVeh.passengerCapacity} Cap)</span>
                  <span className={`font-bold flex items-center gap-1 ${isPaxCapacityValid ? "text-emerald-600" : "text-rose-600"}`}>
                    {isPaxCapacityValid ? <><Check className="w-3.5 h-3.5" /> Valid</> : "⚠ Insufficient Capacity"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#162034]">
                  <span>Driver Availability Check ({selectedDrv.fullName})</span>
                  <span className={`font-bold flex items-center gap-1 ${isDriverAvailable ? "text-emerald-600" : "text-amber-600"}`}>
                    {isDriverAvailable ? <><Check className="w-3.5 h-3.5" /> Available</> : "⚠ Status Alert"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#162034]">
                  <span>Guide Requirement Check ({selectedDest.guideRequirement})</span>
                  <span className={`font-bold flex items-center gap-1 ${isGuideValid ? "text-emerald-600" : "text-rose-600"}`}>
                    {isGuideValid ? <><Check className="w-3.5 h-3.5" /> Satisfied</> : "⚠ Mandatory Guide Missing"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 4: REVIEW & COST PREVIEW */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Step 4: Complete Deployment Review
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Deployment Name</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{deploymentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date & Time</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{date} ({departureTime} - {estimatedEndTime})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Destination</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedDest.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Passenger Count</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{paxCount} Pax</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Vehicle</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedVeh.licensePlate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Driver</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{selectedDrv.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Guide</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{selectedGde?.fullName || "None"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tour Manager</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{selectedTM.fullName}</span>
                </div>
              </div>
            </Card>

            {/* Estimated Vehicle Cost Preview Card */}
            <Card className="p-6 space-y-3 bg-gradient-to-r from-emerald-50/60 to-white dark:from-[#101726] dark:to-[#162034] border-emerald-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Estimated Vehicle Rental Cost (Master Rate Reference):
                </span>
                <span className="text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  Rp {estimatedVehicleCost.toLocaleString("id-ID")}
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 5: CONFIRMATION & SAVE */}
        {currentStep === 5 && (
          <Card className="p-6 space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Deployment Ready for Dispatch
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                All 6 required master resources verified with zero blocking conflicts.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => handleSave("Draft")}
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save as Draft
              </Button>

              <Button
                variant="primary"
                onClick={() => handleSave("Ready")}
                isLoading={isSubmitting}
                leftIcon={<Check className="w-4 h-4" />}
              >
                Mark as Ready
              </Button>
            </div>
          </Card>
        )}

        {/* Navigation Step Buttons */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            <Button
              variant="primary"
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
