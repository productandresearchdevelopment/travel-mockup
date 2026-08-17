"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { mockGuestsData } from "@/data/mockGuestsData";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockDriversData } from "@/data/mockDrivers";
import { mockGuidesData } from "@/data/mockGuides";
import { mockTourManagersData } from "@/data/mockTourManagers";
import {
  CalendarCheck,
  Users,
  MapPin,
  Truck,
  UserCheck,
  Compass,
  Briefcase,
  Hotel,
  Train,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Lock,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function CreateDeploymentPage() {
  const router = useRouter();

  // Step 1: Booking Selection State
  const [selectedBookingCode, setSelectedBookingCode] = useState("BKG-2026-00821");

  // Resource Assignment States
  const [selectedVehicleId, setSelectedVehicleId] = useState("v-001");
  const [selectedDriverId, setSelectedDriverId] = useState("drv-001");
  const [selectedGuideId, setSelectedGuideId] = useState("g-001");
  const [selectedTMId, setSelectedTMId] = useState("tm-001");

  // Conflict state simulation
  const [driverConflict, setDriverConflict] = useState(false);

  // Selected Booking Details derived from mock dataset
  const activeBooking = useMemo(() => {
    return (
      mockGuestsData[0].currentBooking || {
        id: "bkg-001",
        bookingCode: "BKG-2026-00821",
        product: "BP, BROMO, IJEN",
        tourType: "BP Private - Budget Sharing",
        platform: "Direct Offline",
        travelDate: "2026-08-25",
        paxCount: 4,
        guestManifest: [
          { guestId: "gst-001", fullName: "Rossella Cescon", nationality: "Italy", gender: "Female", passportNumber: "•••• 8932" },
          { guestId: "gst-001b", fullName: "Marco Cescon", nationality: "Italy", gender: "Male", passportNumber: "•••• 2231" },
          { guestId: "gst-003", fullName: "Sarah Wilson", nationality: "United Kingdom", gender: "Female", passportNumber: "•••• 8832" },
          { guestId: "gst-003b", fullName: "James Wilson", nationality: "United Kingdom", gender: "Male", passportNumber: "•••• 1128" },
        ],
        journey: {
          origin: "Yogyakarta",
          pickup: "Yogyakarta Tugu Station / Hotel",
          destinations: ["Yogyakarta", "Borobudur", "Prambanan", "Bromo", "Ijen", "Bali"],
          dropOff: "Bali (Ubud / Denpasar Hotel)",
          travelType: "Overland",
          duration: "3D2N Overland Journey",
        },
        hotels: [
          { id: "htl-alloc-001", hotelId: "htl-001", hotelName: "Hotel Santika Premier Malang", date: "2026-08-26", roomNumber: "Room 101", roomType: "Deluxe Twin", guestsAssigned: ["Rossella Cescon"], status: "Confirmed" },
          { id: "htl-alloc-002", hotelId: "htl-002", hotelName: "Banyuwangi Resort & Spa", date: "2026-08-27", roomNumber: "Room 204", roomType: "Standard Queen", guestsAssigned: ["Rossella Cescon"], status: "Confirmed" },
        ],
        transports: [
          { id: "trp-001", type: "KAI", bookingDate: "2026-08-26", segment: "Yogyakarta (YK) → Malang (ML) Expres Train", referenceNumber: "KAI-98421", status: "Confirmed" },
          { id: "trp-002", type: "Ferizy", bookingDate: "2026-08-28", segment: "Ketapang Port (Banyuwangi) → Gilimanuk Port (Bali)", referenceNumber: "FER-77219", status: "Confirmed" },
        ],
        totalBillingRupiah: 7420000,
        paymentStatus: "Partially Paid" as const,
        paymentLink: "https://pay.qifess.com/bkg-00821",
        operationalNotes: "PRIVATE TOUR BOROBUDUR & PRAMBANAN & PRIVATE CAR, 3D2N SHARED BUDGET BROMO IJEN with Bali drop off.",
        tripStatus: "Confirmed" as const,
      }
    );
  }, []);

  // Selected Vehicle
  const selectedVehicle = useMemo(() => {
    return mockVehiclesData.find((v) => v.id === selectedVehicleId) || mockVehiclesData[0];
  }, [selectedVehicleId]);

  // Selected Driver
  const selectedDriver = useMemo(() => {
    return mockDriversData.find((d) => d.id === selectedDriverId) || mockDriversData[0];
  }, [selectedDriverId]);

  // Handle Driver Change & Conflict Check
  const handleDriverChange = (driverId: string) => {
    setSelectedDriverId(driverId);
    if (driverId === "drv-002") {
      setDriverConflict(true);
    } else {
      setDriverConflict(false);
    }
  };

  // Readiness Checklist Evaluation
  const readinessCheck = useMemo(() => {
    const bookingConfirmed = activeBooking.tripStatus === "Confirmed";
    const manifestComplete = activeBooking.guestManifest.length > 0;
    const journeyDefined = activeBooking.journey.destinations.length > 0;
    const vehicleAssigned = !!selectedVehicleId;
    const driverAssigned = !!selectedDriverId && !driverConflict;
    const guideAssigned = !!selectedGuideId;
    const tmAssigned = !!selectedTMId;
    const hotelArranged = activeBooking.hotels.length > 0;
    const transportArranged = activeBooking.transports.length > 0;

    const isAllReady =
      bookingConfirmed &&
      manifestComplete &&
      journeyDefined &&
      vehicleAssigned &&
      driverAssigned &&
      guideAssigned &&
      tmAssigned &&
      hotelArranged &&
      transportArranged;

    return {
      bookingConfirmed,
      manifestComplete,
      journeyDefined,
      vehicleAssigned,
      driverAssigned,
      guideAssigned,
      tmAssigned,
      hotelArranged,
      transportArranged,
      isAllReady,
    };
  }, [activeBooking, selectedVehicleId, selectedDriverId, driverConflict, selectedGuideId, selectedTMId]);

  return (
    <AppShell>
      <PageHeader
        title="Create Operational Deployment"
        description="Convert an existing Tour Booking into an operational deployment with assigned resources and conflict validation."
        breadcrumbItems={[
          { label: "Operations", href: "/dispatch" },
          { label: "Dispatcher", href: "/dispatch" },
          { label: "New Deployment" },
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

      {/* STEP 1: SELECT BOOKING / TOUR */}
      <Card className="p-6 space-y-4 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              STEP 1: SELECT TOUR BOOKING
            </h2>
            <p className="text-xs text-slate-500">
              Select an existing confirmed tour booking from the reservations database
            </p>
          </div>
        </div>

        <div className="w-full sm:w-96">
          <FormField label="Confirmed Tour Booking *">
            <Select
              value={selectedBookingCode}
              onChange={(e) => setSelectedBookingCode(e.target.value)}
              options={[
                { value: "BKG-2026-00821", label: "BKG-2026-00821 · East Java Explorer (25 Aug 2026 - 4 Guests)" },
                { value: "BKG-2026-00835", label: "BKG-2026-00835 · Banyuwangi Ijen Trip (27 Aug 2026 - 2 Guests)" },
                { value: "BKG-2026-00888", label: "BKG-2026-00888 · Bali South Coast Tour (21 Aug 2026 - 6 Guests)" },
              ]}
            />
          </FormField>
        </div>
      </Card>

      {/* STEP 2: BOOKING SUMMARY (READ-ONLY) */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                STEP 2: BOOKING SUMMARY (READ-ONLY)
              </h2>
              <span className="text-xs text-slate-400 font-mono">Auto-populated from reservation record</span>
            </div>
          </div>
          <Badge variant="emerald">✓ {activeBooking.paymentStatus}</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div><span className="text-slate-400 block">Booking Code</span><strong className="text-slate-900 dark:text-slate-100">{activeBooking.bookingCode}</strong></div>
          <div><span className="text-slate-400 block">Tour Product</span><strong className="text-blue-600">{activeBooking.product}</strong></div>
          <div><span className="text-slate-400 block">Tour Type</span><strong className="text-slate-900 dark:text-slate-100">{activeBooking.tourType}</strong></div>
          <div><span className="text-slate-400 block">Travel Date</span><strong className="text-slate-900 dark:text-slate-100">{activeBooking.travelDate}</strong></div>
          <div><span className="text-slate-400 block">PAX Count</span><strong className="text-emerald-600">{activeBooking.paxCount} Guests</strong></div>
          <div><span className="text-slate-400 block">Acquisition Platform</span><strong className="text-slate-900 dark:text-slate-100">{activeBooking.platform}</strong></div>
          <div><span className="text-slate-400 block">Total Billing</span><strong className="text-slate-900 dark:text-slate-100">Rp {activeBooking.totalBillingRupiah.toLocaleString("id-ID")}</strong></div>
          <div><span className="text-slate-400 block">Payment Link</span><a href={activeBooking.paymentLink} target="_blank" className="text-blue-600 hover:underline">Available ↗</a></div>
        </div>
      </Card>

      {/* STEP 3: GUEST MANIFEST */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                STEP 3: GUEST MANIFEST ({activeBooking.guestManifest.length} Guests)
              </h2>
              <span className="text-xs text-slate-400 font-mono">Linked to Guest Master Profiles</span>
            </div>
          </div>
          <Link href="/guests" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
            View Guests Master →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          {activeBooking.guestManifest.map((gm, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] flex items-center justify-between">
              <div>
                <Link href={`/guests/${gm.guestId}`} className="font-bold text-slate-900 dark:text-slate-100 text-sm hover:text-blue-600">
                  {idx + 1}. {gm.fullName}
                </Link>
                <span className="text-slate-500 text-[11px] block">{gm.nationality} · Passport: {gm.passportNumber}</span>
              </div>
              <Link href={`/guests/${gm.guestId}`}>
                <Button variant="outline" size="sm" className="h-6 text-[10px] px-1.5">
                  Profile <ExternalLink className="w-2.5 h-2.5 ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>

      {/* STEP 4: OVERLAND JOURNEY ROUTE & HOTELS */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              STEP 4: OVERLAND JOURNEY & HOTEL ALLOCATIONS
            </h2>
            <span className="text-xs text-slate-400 font-mono">Route: {activeBooking.journey.origin} → {activeBooking.journey.dropOff}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
          {activeBooking.journey.destinations.map((d, i) => (
            <React.Fragment key={i}>
              <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 font-bold text-blue-600 dark:text-blue-400">
                📍 {d}
              </span>
              {i < activeBooking.journey.destinations.length - 1 && <span className="text-slate-400 font-bold">→</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-2">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-indigo-600" /> Hotel Allocations ({activeBooking.hotels.length})
            </span>
            {activeBooking.hotels.map((h) => (
              <span key={h.id} className="text-slate-600 dark:text-slate-400 block text-[11px]">
                • {h.hotelName} ({h.date}) — {h.roomNumber}
              </span>
            ))}
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Train className="w-4 h-4 text-teal-600" /> Transport Bookings ({activeBooking.transports.length})
            </span>
            {activeBooking.transports.map((t) => (
              <span key={t.id} className="text-slate-600 dark:text-slate-400 block text-[11px]">
                • {t.type}: {t.segment} ({t.status})
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* STEP 5: RESOURCE ASSIGNMENT & CONFLICT DETECTION */}
      <Card className="p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                STEP 5: ASSIGN OPERATIONAL RESOURCES
              </h2>
              <span className="text-xs text-slate-400 font-mono">Assign Vehicle, Driver, Guide, and Tour Manager with Conflict Detection</span>
            </div>
          </div>
          <Badge variant="blue">Real-Time Availability Validation</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VEHICLE SELECTION */}
          <div className="space-y-3">
            <FormField label="Assigned Vehicle (Plate & Locked Rate) *">
              <Select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                options={mockVehiclesData.map((v) => ({
                  value: v.id,
                  label: `${v.name} (${v.licensePlate}) — ${v.vendorName} — Rp ${v.dailyRentalRate.toLocaleString("id-ID")}/day 🔒`,
                }))}
              />
            </FormField>

            {selectedVehicle && (
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{selectedVehicle.name} ({selectedVehicle.licensePlate})</span>
                  <Badge variant="emerald">● Available</Badge>
                </div>
                <span className="text-slate-500 block">Vendor: {selectedVehicle.vendorName} · Capacity: {selectedVehicle.passengerCapacity} Pax (4/15 OK)</span>
                <span className="text-blue-600 font-bold block">Locked Rental Rate: Rp {selectedVehicle.dailyRentalRate.toLocaleString("id-ID")} / day 🔒</span>
              </div>
            )}
          </div>

          {/* DRIVER SELECTION & CONFLICT WARNING */}
          <div className="space-y-3">
            <FormField label="Assigned Driver *">
              <Select
                value={selectedDriverId}
                onChange={(e) => handleDriverChange(e.target.value)}
                options={[
                  { value: "drv-001", label: "Agus Santoso (Surabaya) — ● Available" },
                  { value: "drv-002", label: "Budi Hartono (Malang) — 🔴 CONFLICT (Double Booked)" },
                  { value: "drv-003", label: "Dewa Putra (Bali) — ● Available" },
                ]}
              />
            </FormField>

            {driverConflict ? (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-mono text-xs space-y-1">
                <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> RESOURCE CONFLICT DETECTED
                </span>
                <p className="text-rose-700 dark:text-rose-300 font-sans text-[11px]">
                  Driver Budi Hartono is already assigned to <strong>Bromo Sunrise Tour #003</strong> on 25 Aug (03:00-18:00 WIB). Normal deployment confirmation is disabled.
                </p>
              </div>
            ) : (
              selectedDriver && (
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{selectedDriver.fullName}</span>
                    <Badge variant="emerald">● Available</Badge>
                  </div>
                  <span className="text-slate-500 block">Region: {selectedDriver.region} · SIM B1 Commercial Valid</span>
                </div>
              )
            )}
          </div>

          {/* GUIDE SELECTION */}
          <div className="space-y-3">
            <FormField label="Assigned Tour Guide *">
              <Select
                value={selectedGuideId}
                onChange={(e) => setSelectedGuideId(e.target.value)}
                options={mockGuidesData.map((g) => ({
                  value: g.id,
                  label: `${g.fullName} (${g.region}) — English / Italian Specialist — ● Available`,
                }))}
              />
            </FormField>
          </div>

          {/* TOUR MANAGER SELECTION */}
          <div className="space-y-3">
            <FormField label="Assigned Tour Manager *">
              <Select
                value={selectedTMId}
                onChange={(e) => setSelectedTMId(e.target.value)}
                options={mockTourManagersData.map((tm) => ({
                  value: tm.id,
                  label: `${tm.fullName} (${tm.region}) — Field Execution Manager — ● Available`,
                }))}
              />
            </FormField>
          </div>
        </div>
      </Card>

      {/* STEP 6: DEPLOYMENT READINESS PANEL & SAVE DEPLOYMENT */}
      <Card className="p-6 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border-slate-800 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
              STEP 6: DEPLOYMENT READINESS CHECKLIST
            </h2>
          </div>
          <Badge variant={readinessCheck.isAllReady ? "emerald" : "danger"}>
            {readinessCheck.isAllReady ? "READY FOR DEPLOYMENT" : "NOT READY — MISSING RESOURCE"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">BOOKING</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ Confirmed</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">MANIFEST</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ 4 Guests</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">VEHICLE</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ Hiace B 1234</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">DRIVER</span>
            <span className={readinessCheck.driverAssigned ? "font-bold text-emerald-400" : "font-bold text-rose-400"}>
              {readinessCheck.driverAssigned ? "✓ Agus Santoso" : "✕ Conflict"}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">CREW</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ Guide & TM</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-white" onClick={() => router.push("/dispatch")}>
            Save Draft
          </Button>
          <Button
            variant="primary"
            disabled={!readinessCheck.isAllReady}
            onClick={() => router.push("/dispatch/dep-001")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6"
          >
            Create Operational Deployment
          </Button>
        </div>
      </Card>
    </AppShell>
  );
}
