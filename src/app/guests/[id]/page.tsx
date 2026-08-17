"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { mockGuestsData } from "@/data/mockGuestsData";
import { GuestMaster } from "@/types/guest";
import {
  Users,
  UserCheck,
  Globe,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Compass,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Train,
  Ship,
  Hotel,
  Clock,
} from "lucide-react";

export default function GuestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "gst-001";

  const initialGuest = useMemo(() => {
    return mockGuestsData.find((g) => g.id === id) || mockGuestsData[0];
  }, [id]);

  const [guest] = useState<GuestMaster>(initialGuest);
  const [activeTab, setActiveTab] = useState("overview");

  const tabsList = [
    { id: "overview", label: "Overview Profile" },
    { id: "current_trip", label: guest.currentBooking ? `Current Booking (${guest.currentBooking.bookingCode})` : "Current Booking" },
    { id: "travel_history", label: `Travel History (${guest.totalTripsCount})` },
    { id: "documents", label: `Documents (${guest.documents.length})` },
    { id: "bookings", label: "Linked Tour Bookings" },
  ];

  return (
    <AppShell>
      <PageHeader
        title={guest.fullName}
        description={`Traveler Code: ${guest.code} · ${guest.nationality} Passport`}
        breadcrumbItems={[
          { label: "Resources", href: "/vehicles" },
          { label: "Guests", href: "/guests" },
          { label: guest.code },
        ]}
        actions={
          guest.currentBooking ? (
            <Link href={`/dispatch/${guest.currentBooking.assignedDeploymentId || "tr-001"}`}>
              <Button variant="primary" size="sm" leftIcon={<Compass className="w-3.5 h-3.5" />}>
                View Active Tour
              </Button>
            </Link>
          ) : undefined
        }
      />

      {/* Guest Detail Banner Header */}
      <DetailHeader
        title={guest.fullName}
        code={guest.code}
        subtitle={`Nationality: ${guest.nationality} · Passport: ${guest.passportNumber} (Expires: ${guest.passportExpiryDate})`}
        status={guest.status as any}
        metrics={[
          { label: "Nationality", value: guest.nationality },
          { label: "Total Trips", value: `${guest.totalTripsCount} Tours` },
          { label: "Destinations Visited", value: `${guest.totalDestinationsVisited} Locations` },
          { label: "Last Travel Date", value: guest.lastTripDate },
        ]}
        actions={
          <Badge variant={guest.status === "Active" ? "emerald" : "slate"}>
            ● {guest.status} Traveler
          </Badge>
        }
      />

      {/* TABS */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Full Name</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{guest.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Gender</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{guest.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date of Birth</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{guest.dateOfBirth}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Nationality</span>
                <span className="font-bold text-blue-600">🇮🇹 {guest.nationality}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Country of Residence</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{guest.countryOfResidence}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Phone className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Contact & Passport Information
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Phone</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{guest.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{guest.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Passport Number</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{guest.passportNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Passport Expiry</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{guest.passportExpiryDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Emergency Contact</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{guest.emergencyContact.name} ({guest.emergencyContact.relationship})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Emergency Phone</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{guest.emergencyContact.phone}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: CURRENT TRIP & BOOKING */}
      {activeTab === "current_trip" && (
        <div className="space-y-6">
          {guest.currentBooking ? (
            <>
              {/* BOOKING HEADER BANNER */}
              <Card className="p-5 bg-gradient-to-r from-blue-950/30 via-slate-900 to-slate-900 border-blue-800/40 text-white space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                      ACTIVE BOOKING & JOURNEY MANIFEST
                    </span>
                    <h2 className="text-sm font-extrabold text-white">
                      {guest.currentBooking.product} ({guest.currentBooking.bookingCode})
                    </h2>
                  </div>
                  <Badge variant="emerald">● {guest.currentBooking.tripStatus}</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">TRAVEL DATE</span>
                    <span className="font-bold text-white">{guest.currentBooking.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PAX COUNT</span>
                    <span className="font-bold text-emerald-400">{guest.currentBooking.paxCount} Guests</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TOUR TYPE</span>
                    <span className="font-bold text-slate-200">{guest.currentBooking.tourType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">BILLING & PAYMENT</span>
                    <span className="font-bold text-amber-400">Rp {guest.currentBooking.totalBillingRupiah.toLocaleString("id-ID")} ({guest.currentBooking.paymentStatus})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PLATFORM</span>
                    <span className="font-bold text-slate-200">{guest.currentBooking.platform}</span>
                  </div>
                </div>
              </Card>

              {/* GUEST MANIFEST */}
              <Card className="p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Guest Manifest ({guest.currentBooking.guestManifest.length} Travelers)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {guest.currentBooking.guestManifest.map((gm, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">{i + 1}. {gm.fullName}</span>
                      <span className="text-slate-500 block">🇮🇹 {gm.nationality} · {gm.gender} · Passport: {gm.passportNumber}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* OVERLAND JOURNEY ROUTE */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" /> Journey Route & Destinations
                  </h3>
                  <Badge variant="blue">{guest.currentBooking.journey.travelType}</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div><span>Origin:</span> <strong className="text-slate-900 dark:text-slate-100 block">{guest.currentBooking.journey.origin}</strong></div>
                  <div><span>Pickup Point:</span> <strong className="text-slate-900 dark:text-slate-100 block">{guest.currentBooking.journey.pickup}</strong></div>
                  <div><span>Drop-Off Point:</span> <strong className="text-slate-900 dark:text-slate-100 block">{guest.currentBooking.journey.dropOff}</strong></div>
                  <div><span>Duration:</span> <strong className="text-slate-900 dark:text-slate-100 block">{guest.currentBooking.journey.duration}</strong></div>
                </div>

                <div className="pt-2 flex items-center gap-1.5 flex-wrap font-mono text-xs">
                  {guest.currentBooking.journey.destinations.map((d, i) => (
                    <React.Fragment key={i}>
                      <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 font-bold text-blue-600 dark:text-blue-400">
                        📍 {d}
                      </span>
                      {i < guest.currentBooking!.journey.destinations.length - 1 && (
                        <span className="text-slate-400 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Card>

              {/* HOTEL ALLOCATIONS & TRANSPORT BOOKINGS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Hotel className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Hotel Allocations
                    </h3>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    {guest.currentBooking.hotels.map((h) => (
                      <div key={h.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{h.hotelName}</span>
                          <Badge variant="emerald">{h.status}</Badge>
                        </div>
                        <span className="text-slate-500 text-[11px] block">{h.date} · {h.roomNumber} ({h.roomType})</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Train className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Transport Bookings (KAI / Ferizy)
                    </h3>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    {guest.currentBooking.transports.map((t) => (
                      <div key={t.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{t.type} — {t.segment}</span>
                          <Badge variant="emerald">{t.status}</Badge>
                        </div>
                        <span className="text-slate-500 text-[11px] block">Booking Ref: {t.referenceNumber} · Date: {t.bookingDate}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* OPERATIONAL NOTES */}
              <Card className="p-6 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Operational Notes
                </h3>
                <p className="text-xs font-mono bg-slate-50 dark:bg-[#162034] p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                  {guest.currentBooking.operationalNotes}
                </p>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center text-xs text-slate-500 italic">
              No active tour booking currently assigned.
            </Card>
          )}
        </div>
      )}

      {/* TAB 3: TRAVEL HISTORY */}
      {activeTab === "travel_history" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Guest Historical Tour Execution History
          </h3>
          <DataTable
            columns={[
              { key: "code", header: "Booking Code", render: (r: any) => <span className="font-mono font-bold text-blue-600">{r.bookingCode}</span> },
              { key: "date", header: "Travel Date", render: (r: any) => <span className="font-mono">{r.travelDate}</span> },
              { key: "product", header: "Product", render: (r: any) => <span className="font-bold">{r.product}</span> },
              { key: "route", header: "Journey Route", render: (r: any) => <span className="font-mono text-xs">{r.route}</span> },
              { key: "pax", header: "PAX", render: (r: any) => <span className="font-mono">{r.paxCount} Pax</span> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant={r.status === "Completed" ? "emerald" : "blue"}>{r.status}</Badge> },
            ]}
            data={guest.travelHistory}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 4: DOCUMENTS */}
      {activeTab === "documents" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Guest Travel Documents & Passport Records
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {guest.documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                  <Badge variant="emerald">{doc.status}</Badge>
                </div>
                <p className="text-slate-500 font-sans text-xs">Passport Number: {doc.documentNumber}</p>
                <span className="text-[10px] text-slate-400 block">Valid Until: {doc.validUntil}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: BOOKINGS */}
      {activeTab === "bookings" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            All Linked Tour Bookings
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {guest.currentBooking && (
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{guest.currentBooking.product} ({guest.currentBooking.bookingCode})</span>
                  <Badge variant="emerald">● {guest.currentBooking.tripStatus}</Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-sans">{guest.currentBooking.journey.duration} · {guest.currentBooking.paxCount} Guests</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </AppShell>
  );
}
