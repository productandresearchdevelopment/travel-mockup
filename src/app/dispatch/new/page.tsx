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
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { mockGuestsData } from "@/data/mockGuestsData";
import { mockVehiclesData } from "@/data/mockVehicles";
import { mockDriversData } from "@/data/mockDrivers";
import { mockGuidesData } from "@/data/mockGuides";
import { mockTourManagersData } from "@/data/mockTourManagers";
import { mockHotelsData } from "@/data/mockHotels";
import { mockDestinationsData } from "@/data/mockDestinations";
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
  Ticket,
  Clock,
  Edit3,
} from "lucide-react";

interface PickupDropoffGroupConfig {
  groupId: string;
  groupName: string;
  guestNames: string;
  pax: number;
  // Pickup fields
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  pickupNotes: string;
  // Drop-off fields
  dropoffMethod: "Vehicle" | "Ticket";
  dropoffDestination: string;
  dropoffDate: string;
  dropoffTime: string;
  dropoffNotes: string;
  // Ticket specific fields
  ticketTransportType: "Train" | "Bus" | "Flight" | "Ferry";
  ticketOrigin: string;
  ticketDestination: string;
  ticketDepartureDate: string;
  ticketDepartureTime: string;
}

export default function CreateDeploymentPage() {
  const router = useRouter();

  // Step 1: Booking Selection State
  const [selectedBookingCode, setSelectedBookingCode] = useState("BKG-2026-00821");

  // Step 4: Pickup & Drop-off Config State (Auto-bound from Step 3 manifest)
  const [step4Configs, setStep4Configs] = useState<PickupDropoffGroupConfig[]>([
    {
      groupId: "grp-a",
      groupName: "GROUP A — Main Group (8 Guests)",
      guestNames: "Rossella Cescon (+7 Guests)",
      pax: 8,
      pickupLocation: "Hotel Santika Yogyakarta",
      pickupDate: "2026-08-25",
      pickupTime: "08:00",
      pickupNotes: "Guests waiting at hotel lobby with luggage.",
      dropoffMethod: "Vehicle",
      dropoffDestination: "Bali (Ubud / Denpasar Hotel)",
      dropoffDate: "2026-08-29",
      dropoffTime: "18:30",
      dropoffNotes: "Drop-off at Ubud hotel.",
      ticketTransportType: "Train",
      ticketOrigin: "Yogyakarta",
      ticketDestination: "Bali",
      ticketDepartureDate: "2026-08-29",
      ticketDepartureTime: "18:30",
    },
    {
      groupId: "grp-b",
      groupName: "GROUP B — Malang Joiners (4 Guests)",
      guestNames: "Anna Schmidt (+3 Guests)",
      pax: 4,
      pickupLocation: "Hotel Santika Malang",
      pickupDate: "2026-08-27",
      pickupTime: "10:30",
      pickupNotes: "Joined mid-trip in Malang.",
      dropoffMethod: "Ticket",
      dropoffDestination: "Banyuwangi (Ketapang Station)",
      dropoffDate: "2026-08-28",
      dropoffTime: "19:30",
      dropoffNotes: "Ticket drop-off segment via Kereta Api Indonesia.",
      ticketTransportType: "Train",
      ticketOrigin: "Probolinggo",
      ticketDestination: "Banyuwangi",
      ticketDepartureDate: "2026-08-28",
      ticketDepartureTime: "19:30",
    },
  ]);

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
        paxCount: 12,
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

  // Step 4 Compact Summary Calculations
  const step4Summary = useMemo(() => {
    const totalGuests = step4Configs.reduce((acc, c) => acc + c.pax, 0);
    const pickupGuests = step4Configs.reduce((acc, c) => acc + (c.pickupLocation ? c.pax : 0), 0);
    const vehicleDropoffGuests = step4Configs.filter((c) => c.dropoffMethod === "Vehicle").reduce((acc, c) => acc + c.pax, 0);
    const ticketDropoffGuests = step4Configs.filter((c) => c.dropoffMethod === "Ticket").reduce((acc, c) => acc + c.pax, 0);

    return { totalGuests, pickupGuests, vehicleDropoffGuests, ticketDropoffGuests };
  }, [step4Configs]);

  // Step 4 Inline Validation Check
  const isStep4Valid = useMemo(() => {
    return step4Configs.every((c) => {
      const hasPickup = !!c.pickupLocation && !!c.pickupDate && !!c.pickupTime;
      const hasDropoff = !!c.dropoffDestination && !!c.dropoffDate && !!c.dropoffTime && !!c.dropoffMethod;
      const hasTicketValid = c.dropoffMethod === "Vehicle" || (!!c.ticketTransportType && !!c.ticketOrigin && !!c.ticketDestination && !!c.ticketDepartureDate && !!c.ticketDepartureTime);
      return hasPickup && hasDropoff && hasTicketValid;
    });
  }, [step4Configs]);

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

  // Update Step 4 Group Config field helper
  const updateGroupConfig = (index: number, field: keyof PickupDropoffGroupConfig, value: any) => {
    const updated = [...step4Configs];
    updated[index] = { ...updated[index], [field]: value };
    setStep4Configs(updated);
  };

  // Readiness Checklist Evaluation
  const readinessCheck = useMemo(() => {
    const bookingConfirmed = activeBooking.tripStatus === "Confirmed";
    const manifestComplete = activeBooking.guestManifest.length > 0;
    const step4Complete = isStep4Valid;
    const journeyDefined = activeBooking.journey.destinations.length > 0;
    const vehicleAssigned = !!selectedVehicleId;
    const driverAssigned = !!selectedDriverId && !driverConflict;
    const guideAssigned = !!selectedGuideId;
    const tmAssigned = !!selectedTMId;

    const isAllReady =
      bookingConfirmed &&
      manifestComplete &&
      step4Complete &&
      journeyDefined &&
      vehicleAssigned &&
      driverAssigned &&
      guideAssigned &&
      tmAssigned;

    return {
      bookingConfirmed,
      manifestComplete,
      step4Complete,
      journeyDefined,
      vehicleAssigned,
      driverAssigned,
      guideAssigned,
      tmAssigned,
      isAllReady,
    };
  }, [activeBooking, isStep4Valid, selectedVehicleId, selectedDriverId, driverConflict, selectedGuideId, selectedTMId]);

  return (
    <AppShell>
      <PageHeader
        title="Create Operational Deployment"
        description="Convert an existing Tour Booking into an operational deployment with assigned resources, pickup/drop-off requirements, and conflict validation."
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
                { value: "BKG-2026-00821", label: "BKG-2026-00821 · East Java Explorer (25 Aug 2026 - 12 Guests)" },
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
          <div><span className="text-slate-400 block">PAX Count</span><strong className="text-emerald-600">{activeBooking.paxCount} Guests (12 Pax Total)</strong></div>
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
                STEP 3: GUEST MANIFEST ({activeBooking.guestManifest.length} Manifest Profiles)
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

      {/* NEW STEP 4: PICKUP & DROP-OFF PLANNING */}
      <Card id="step-4-pickup-dropoff" className="p-6 space-y-5 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/10 dark:bg-indigo-950/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                STEP 4: PICKUP & DROP-OFF PLANNING
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Auto-bound to Step 3 Manifest Guests. Configure guest-specific pickup points & drop-off methods.
              </span>
            </div>
          </div>
          <Badge variant={isStep4Valid ? "emerald" : "amber"}>
            {isStep4Valid ? "✓ Step 4 Configured" : "⚠️ Complete Required Fields"}
          </Badge>
        </div>

        {/* STEP 4 COMPACT SUMMARY BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">TOTAL GUESTS</span>
            <strong className="text-xl font-extrabold text-white">{step4Summary.totalGuests} Pax</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">PICKUP PLANNED</span>
            <strong className="text-xl font-extrabold text-emerald-400">{step4Summary.pickupGuests} Guests</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1 border-blue-900/80 bg-blue-950/20">
            <span className="text-[10px] text-blue-400 block font-bold">VEHICLE DROP-OFF</span>
            <strong className="text-xl font-extrabold text-blue-400">{step4Summary.vehicleDropoffGuests} Guests</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1 border-purple-900/80 bg-purple-950/20">
            <span className="text-[10px] text-purple-400 block font-bold">TICKET DROP-OFF</span>
            <strong className="text-xl font-extrabold text-purple-400">{step4Summary.ticketDropoffGuests} Guests</strong>
          </div>
        </div>

        {/* GUEST-SPECIFIC PICKUP & DROP-OFF CONFIG CARDS */}
        <div className="space-y-6 pt-2">
          {step4Configs.map((config, idx) => (
            <div
              key={config.groupId}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] space-y-4 shadow-xs"
            >
              {/* GROUP HEADER */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant={idx === 0 ? "violet" : "blue"}>
                    {config.groupName}
                  </Badge>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                    {config.guestNames} ({config.pax} Pax)
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">Auto-bound from Step 3</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PICKUP CONFIGURATION */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3 font-mono text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs block flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> PICKUP CONFIGURATION
                  </span>

                  <FormField label="Pickup Location (Hotel / Destination Master) *">
                    <Select
                      value={config.pickupLocation}
                      onChange={(e) => updateGroupConfig(idx, "pickupLocation", e.target.value)}
                      options={[
                        { value: "Hotel Santika Yogyakarta", label: "Hotel Santika Yogyakarta (Hotel Master)" },
                        { value: "Hotel Santika Malang", label: "Hotel Santika Malang (Hotel Master)" },
                        { value: "Yogyakarta Tugu Station", label: "Yogyakarta Tugu Station (Transit Master)" },
                        { value: "Probolinggo Hotel", label: "Probolinggo Hotel (Hotel Master)" },
                      ]}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Pickup Date *">
                      <Input
                        type="date"
                        value={config.pickupDate}
                        onChange={(e) => updateGroupConfig(idx, "pickupDate", e.target.value)}
                      />
                    </FormField>

                    <FormField label="Pickup Time *">
                      <Input
                        type="time"
                        value={config.pickupTime}
                        onChange={(e) => updateGroupConfig(idx, "pickupTime", e.target.value)}
                      />
                    </FormField>
                  </div>

                  <FormField label="Pickup Notes">
                    <Textarea
                      placeholder="Pickup instructions for driver..."
                      value={config.pickupNotes}
                      onChange={(e) => updateGroupConfig(idx, "pickupNotes", e.target.value)}
                    />
                  </FormField>
                </div>

                {/* DROP-OFF CONFIGURATION */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-600 dark:text-amber-400 text-xs block flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> DROP-OFF CONFIGURATION
                    </span>
                    <Badge variant={config.dropoffMethod === "Vehicle" ? "blue" : "violet"}>
                      {config.dropoffMethod === "Vehicle" ? "🚌 Vehicle" : "🎫 Ticket"}
                    </Badge>
                  </div>

                  <FormField label="Drop-off Method *">
                    <div className="flex items-center gap-4 font-bold text-xs pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`method-${idx}`}
                          value="Vehicle"
                          checked={config.dropoffMethod === "Vehicle"}
                          onChange={() => updateGroupConfig(idx, "dropoffMethod", "Vehicle")}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span>Company Vehicle</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`method-${idx}`}
                          value="Ticket"
                          checked={config.dropoffMethod === "Ticket"}
                          onChange={() => updateGroupConfig(idx, "dropoffMethod", "Ticket")}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>Purchased Ticket (Train / Bus / Flight / Ferry)</span>
                      </label>
                    </div>
                  </FormField>

                  {config.dropoffMethod === "Vehicle" ? (
                    <>
                      <FormField label="Drop-off Destination *">
                        <Input
                          value={config.dropoffDestination}
                          onChange={(e) => updateGroupConfig(idx, "dropoffDestination", e.target.value)}
                          placeholder="e.g. Bali (Ubud / Denpasar Hotel)"
                        />
                      </FormField>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Drop-off Date *">
                          <Input
                            type="date"
                            value={config.dropoffDate}
                            onChange={(e) => updateGroupConfig(idx, "dropoffDate", e.target.value)}
                          />
                        </FormField>

                        <FormField label="Drop-off Time *">
                          <Input
                            type="time"
                            value={config.dropoffTime}
                            onChange={(e) => updateGroupConfig(idx, "dropoffTime", e.target.value)}
                          />
                        </FormField>
                      </div>

                      <span className="text-[11px] text-slate-400 italic block font-mono">
                        Note: Vehicle and Driver assignment will be handled in Step 6 (Resource Assignment).
                      </span>
                    </>
                  ) : (
                    <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 space-y-3 font-mono">
                      <span className="font-bold text-purple-700 dark:text-purple-300 block text-xs flex items-center gap-1">
                        <Ticket className="w-3.5 h-3.5" /> TICKET SPECIFICATIONS
                      </span>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Transport Type *">
                          <Select
                            value={config.ticketTransportType}
                            onChange={(e) => updateGroupConfig(idx, "ticketTransportType", e.target.value)}
                            options={[
                              { value: "Train", label: "Train (KAI Rail)" },
                              { value: "Bus", label: "Bus (DAMRI / Overland)" },
                              { value: "Ferry", label: "Ferry Crossing (Ferizy)" },
                              { value: "Flight", label: "Airline Flight" },
                            ]}
                          />
                        </FormField>

                        <FormField label="Origin *">
                          <Input
                            value={config.ticketOrigin}
                            onChange={(e) => updateGroupConfig(idx, "ticketOrigin", e.target.value)}
                            placeholder="e.g. Probolinggo"
                          />
                        </FormField>
                      </div>

                      <FormField label="Destination *">
                        <Input
                          value={config.ticketDestination}
                          onChange={(e) => updateGroupConfig(idx, "ticketDestination", e.target.value)}
                          placeholder="e.g. Banyuwangi"
                        />
                      </FormField>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Departure Date *">
                          <Input
                            type="date"
                            value={config.ticketDepartureDate}
                            onChange={(e) => updateGroupConfig(idx, "ticketDepartureDate", e.target.value)}
                          />
                        </FormField>

                        <FormField label="Departure Time *">
                          <Input
                            type="time"
                            value={config.ticketDepartureTime}
                            onChange={(e) => updateGroupConfig(idx, "ticketDepartureTime", e.target.value)}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  <FormField label="Drop-off Notes">
                    <Textarea
                      placeholder="Drop-off instructions or passenger notes..."
                      value={config.dropoffNotes}
                      onChange={(e) => updateGroupConfig(idx, "dropoffNotes", e.target.value)}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* STEP 5: OVERLAND JOURNEY ROUTE & HOTELS */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
            5
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              STEP 5: OVERLAND JOURNEY & HOTEL ALLOCATIONS
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

      {/* STEP 6: RESOURCE ASSIGNMENT & CONFLICT DETECTION */}
      <Card className="p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              6
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                STEP 6: ASSIGN OPERATIONAL RESOURCES
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
                <span className="text-slate-500 block">Vendor: {selectedVehicle.vendorName} · Capacity: {selectedVehicle.passengerCapacity} Pax (12/15 OK)</span>
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

      {/* STEP 7: DEPLOYMENT READINESS PANEL & FINAL REVIEW */}
      <Card className="p-6 space-y-5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border-slate-800 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
              STEP 7: DEPLOYMENT READINESS & FINAL REVIEW
            </h2>
          </div>
          <Badge variant={readinessCheck.isAllReady ? "emerald" : "danger"}>
            {readinessCheck.isAllReady ? "READY FOR DEPLOYMENT" : "NOT READY — MISSING RESOURCE"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">BOOKING</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ Confirmed</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">MANIFEST</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ 12 Guests</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">PICKUP/DROPOFF</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">✓ Step 4 Ready</span>
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

        {/* FINAL REVIEW — PICKUP & DROP-OFF SUMMARY */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="font-bold text-indigo-400 flex items-center gap-1.5 uppercase text-xs">
              <MapPin className="w-4 h-4" /> PLANNED PICKUP & DROP-OFF SUMMARY
            </span>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("step-4-pickup-dropoff");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 underline"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Step 4
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PICKUP REVIEW */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">PICKUP CONFIGURATION</span>
              {step4Configs.map((cfg, i) => (
                <div key={i} className="p-2.5 rounded bg-slate-900/80 border border-slate-700 space-y-0.5">
                  <span className="font-bold text-emerald-400 block">{cfg.groupName} ({cfg.pax} Guests)</span>
                  <span className="text-slate-300 text-[11px] block">• Location: {cfg.pickupLocation}</span>
                  <span className="text-slate-400 text-[10px] block">• Time: {cfg.pickupDate} @ {cfg.pickupTime} WIB</span>
                </div>
              ))}
            </div>

            {/* DROP-OFF REVIEW */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">DROP-OFF CONFIGURATION</span>
              {step4Configs.map((cfg, i) => (
                <div key={i} className="p-2.5 rounded bg-slate-900/80 border border-slate-700 space-y-0.5">
                  <span className="font-bold text-amber-400 block">{cfg.groupName} ({cfg.pax} Guests)</span>
                  <span className="text-slate-300 text-[11px] block">• Method: {cfg.dropoffMethod} ({cfg.dropoffMethod === "Ticket" ? cfg.ticketTransportType : "Company Vehicle"})</span>
                  <span className="text-slate-300 text-[11px] block">• Destination: {cfg.dropoffDestination}</span>
                  <span className="text-slate-400 text-[10px] block">• Schedule: {cfg.dropoffDate} @ {cfg.dropoffTime} WIB</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL REVIEW — TRANSPORT SEGMENTS & VEHICLE CHANGE SUMMARY (REQUIREMENT 25) */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="font-bold text-blue-400 flex items-center gap-1.5 uppercase text-xs">
              <Truck className="w-4 h-4" /> PLANNED TRANSPORT SEGMENTS & VEHICLE CHANGES
            </span>
            <Badge variant="violet">3 Segments Planned</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-700 space-y-1">
              <span className="font-bold text-blue-400 block">SEGMENT 1: Yogyakarta → Probolinggo</span>
              <span className="text-slate-300 block">• Vehicle: HiAce #01 (B 1234 XYZ)</span>
              <span className="text-slate-300 block">• Driver: Agus Santoso (8 Pax)</span>
              <span className="text-slate-400 text-[10px] block">• Time: 08:00 → 15:00 WIB</span>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-indigo-700 space-y-1">
              <span className="font-bold text-indigo-400 block">SEGMENT 2: Probolinggo → Bali</span>
              <span className="text-slate-300 block">• Vehicle: HiAce #02 (B 5678 ABC) 🔄</span>
              <span className="text-slate-300 block">• Driver: Budi Pratama (10 Pax)</span>
              <span className="text-slate-400 text-[10px] block">• Swap at Probolinggo (15:30 WIB)</span>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-purple-700 space-y-1">
              <span className="font-bold text-purple-400 block">SEGMENT 3: Probolinggo → Banyuwangi</span>
              <span className="text-slate-300 block">• Transport: KAI Train Ticket 🎫</span>
              <span className="text-slate-300 block">• Assigned: 2 Guests (Rail Drop-off)</span>
              <span className="text-slate-400 text-[10px] block">• Departure: 19:30 WIB</span>
            </div>
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
