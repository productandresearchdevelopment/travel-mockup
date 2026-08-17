"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DetailHeader } from "@/components/ui/DetailHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
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
  Clock,
  PlaySquare,
} from "lucide-react";

export default function DeploymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "dep-001";
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppShell>
      <PageHeader
        title="East Java Explorer — Deployment DEP-2026-00421"
        description="Operational deployment control workspace for Booking BKG-2026-00821."
        breadcrumbItems={[
          { label: "Operations", href: "/dispatch" },
          { label: "Dispatcher", href: "/dispatch" },
          { label: "DEP-2026-00421" },
        ]}
        actions={
          <Link href="/dispatch/trips/trip-001">
            <Button variant="primary" size="sm" leftIcon={<PlaySquare className="w-3.5 h-3.5" />}>
              Handoff to Trip Operations
            </Button>
          </Link>
        }
      />

      {/* DEPLOYMENT HEADER BANNER */}
      <DetailHeader
        title="East Java Explorer (BP, BROMO, IJEN)"
        code="DEP-2026-00421"
        subtitle="Booking BKG-2026-00821 · Travel Date: 25 Aug – 28 Aug 2026 · 4 Guests Assigned"
        status="Confirmed"
        metrics={[
          { label: "Tour Booking", value: "BKG-2026-00821" },
          { label: "Assigned Guests", value: "4 Travelers (2 Pax Italy, 2 Pax UK)" },
          { label: "Journey Type", value: "Overland 3D2N" },
          { label: "Deployment Readiness", value: "READY FOR DEPLOYMENT" },
        ]}
        actions={
          <Badge variant="emerald">
            ✓ READY FOR DEPLOYMENT
          </Badge>
        }
      />

      {/* TABS */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "overview", label: "Deployment Overview" },
          { id: "guests", label: "Guest Manifest (4)" },
          { id: "resources", label: "Assigned Resources" },
          { id: "timeline", label: "Operational Timeline" },
        ]}
      />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* READINESS CHECK PASSED BANNER */}
          <Card className="p-4 bg-emerald-950/40 border-emerald-800/60 flex items-center justify-between font-mono text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>
                All 9 operational readiness checks passed cleanly. Zero resource conflicts detected.
              </span>
            </div>
            <Badge variant="emerald">Validated 100%</Badge>
          </Card>

          {/* BOOKING & GUEST MANIFEST LINKED CARD */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Booking & Guest Manifest
              </h3>
              <Link href="/guests/gst-001" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                View Primary Guest Profile (Rossella Cescon) →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div><span>Booking Code:</span> <strong className="text-slate-900 dark:text-slate-100 block">BKG-2026-00821</strong></div>
              <div><span>Product Package:</span> <strong className="text-blue-600 block">BP, BROMO, IJEN</strong></div>
              <div><span>Tour Category:</span> <strong className="text-slate-900 dark:text-slate-100 block">BP Private - Budget Sharing</strong></div>
              <div><span>Total Billing:</span> <strong className="text-slate-900 dark:text-slate-100 block">Rp 7.420.000 (Partially Paid)</strong></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">1. Rossella Cescon (Italy)</span>
                <span className="text-slate-500 block">Passport: •••• 8932 · Vegetarian · Phone: +39 340 189 3053</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">2. Marco Cescon (Italy)</span>
                <span className="text-slate-500 block">Passport: •••• 2231 · Phone: +39 340 998 7711</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">3. Sarah Wilson (UK)</span>
                <span className="text-slate-500 block">Passport: •••• 8832 · Gluten-Free · Phone: +44 7700 900077</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">4. James Wilson (UK)</span>
                <span className="text-slate-500 block">Passport: •••• 1128 · Phone: +44 7700 900088</span>
              </div>
            </div>
          </Card>

          {/* ASSIGNED RESOURCES GRID */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Assigned Operational Resources
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
              <Link href="/vehicles/v-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">VEHICLE MASTER</span>
                <span className="font-bold text-blue-600 block text-sm">Toyota Hiace (B 1234 XYZ)</span>
                <span className="text-slate-500 block">Vendor: PT ABC Transport</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold block">Rate: Rp 850.000 / day 🔒</span>
              </Link>

              <Link href="/drivers/drv-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">ASSIGNED DRIVER</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Agus Santoso</span>
                <span className="text-slate-500 block">Region: Surabaya / Malang</span>
                <span className="text-emerald-600 font-bold block">● Available & Verified</span>
              </Link>

              <Link href="/guides/g-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">TOUR GUIDE</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Rian Kurniawan</span>
                <span className="text-slate-500 block">Lang: English / Indonesian</span>
                <span className="text-slate-700 dark:text-slate-300 block">Expertise: Bromo & Ijen</span>
              </Link>

              <Link href="/tour-managers/tm-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">TOUR MANAGER</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Sinta Wijaya</span>
                <span className="text-slate-500 block">Field Ops Supervision</span>
                <span className="text-emerald-600 font-bold block">● Ready</span>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: GUEST MANIFEST */}
      {activeTab === "guests" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Full Guest Manifest Details
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Rossella Cescon (Primary Booker)</span>
              <p className="text-slate-500 font-sans">Italy · Passport •••• 8932 · Vegetarian · Prefers Italian/English</p>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: ASSIGNED RESOURCES */}
      {activeTab === "resources" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Resource Allocation Matrix
          </h3>
          <div className="font-mono text-xs space-y-2">
            <div>Vehicle: <strong>Toyota Hiace Commuter (B 1234 XYZ)</strong></div>
            <div>Driver: <strong>Agus Santoso (+62 812-3456-7890)</strong></div>
          </div>
        </Card>
      )}

      {/* TAB 4: OPERATIONAL TIMELINE */}
      {activeTab === "timeline" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Operational Execution Timeline (25 Aug – 28 Aug 2026)
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-blue-600 block">Day 1 — 25 Aug 2026: Yogyakarta Departure</span>
              <span className="text-slate-500 block">03:00 WIB Pickup Yogyakarta → 07:00 Borobudur Tour → 11:00 Prambanan → Transfer to Malang</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-blue-600 block">Day 2 — 27 Aug 2026: Mount Bromo Sunrise Tour</span>
              <span className="text-slate-500 block">03:00 WIB Bromo Sunrise Jeep → Penanjakan Viewpoint → Sea of Sand → Hotel Santika Malang</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-blue-600 block">Day 3 — 28 Aug 2026: Ijen Blue Flame & Bali Drop-off</span>
              <span className="text-slate-500 block">01:00 WIB Ijen Crater Hike → Ketapang Port Ferizy Ferry → Gilimanuk Port → 18:00 WIB Bali Hotel Drop-off</span>
            </div>
          </div>
        </Card>
      )}
    </AppShell>
  );
}
