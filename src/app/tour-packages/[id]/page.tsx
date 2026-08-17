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
import { mockTourPackagesData } from "@/data/mockTourPackagesData";
import { TourPackageMaster } from "@/types/tourPackage";
import {
  Package,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Copy,
  ArrowLeft,
  CheckCircle2,
  Users,
  Clock,
  Layers,
} from "lucide-react";

export default function TourPackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "tp-004";

  const initialPkg = useMemo(() => {
    return mockTourPackagesData.find((p) => p.id === id) || mockTourPackagesData[3];
  }, [id]);

  const [pkg] = useState<TourPackageMaster>(initialPkg);
  const [activeTab, setActiveTab] = useState("overview");

  const tabsList = [
    { id: "overview", label: "Overview & Costs" },
    { id: "destinations", label: `Destinations (${pkg.destinations.length})` },
    { id: "requirements", label: "Operational Requirements" },
    { id: "bookings", label: `Bookings Using Package (${pkg.usedInBookingsCount})` },
    { id: "history", label: `Package History (${pkg.history.length})` },
  ];

  return (
    <AppShell>
      <PageHeader
        title={`${pkg.name} (${pkg.code})`}
        description={`Commercial Tour Product · Category: ${pkg.type} · Duration: ${pkg.duration}`}
        breadcrumbItems={[
          { label: "Resources", href: "/vehicles" },
          { label: "Tour Package", href: "/tour-packages" },
          { label: pkg.code },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/tour-packages")}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back to Catalog
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/tour-packages/create")}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Duplicate Package
            </Button>
            <Button variant="primary" size="sm">
              Edit Package
            </Button>
          </div>
        }
      />

      {/* Package Header Banner */}
      <DetailHeader
        title={pkg.name}
        code={pkg.code}
        subtitle={`${pkg.type} · ${pkg.duration} Overland Package · Total Requirements Cost: Rp ${pkg.totalOperationalCostRupiah.toLocaleString("id-ID")}`}
        status={pkg.status as any}
        metrics={[
          { label: "Package Code", value: pkg.code },
          { label: "Type", value: pkg.type },
          { label: "Duration", value: pkg.duration },
          { label: "Total Requirement Cost", value: `Rp ${pkg.totalOperationalCostRupiah.toLocaleString("id-ID")}` },
        ]}
        actions={
          <Badge variant={pkg.status === "Active" ? "emerald" : "slate"}>
            ● {pkg.status} Product
          </Badge>
        }
      />

      {/* TABS */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW & COSTS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Package Description & Metadata
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
              {pkg.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-2">
              <div><span className="text-slate-400 block">Category Type</span><strong className="text-blue-600">{pkg.type}</strong></div>
              <div><span className="text-slate-400 block">Duration</span><strong className="text-slate-900 dark:text-slate-100">{pkg.duration}</strong></div>
              <div><span className="text-slate-400 block">Bookings Total</span><strong className="text-emerald-600">{pkg.usedInBookingsCount} Bookings</strong></div>
              <div><span className="text-slate-400 block">Last Updated</span><strong className="text-slate-700 dark:text-slate-300">{pkg.updatedAt}</strong></div>
            </div>
          </Card>

          {/* COST BREAKDOWN CARD */}
          <Card className="p-6 space-y-4 bg-slate-900 text-white border-slate-800 font-mono">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Operational Requirements Cost Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">ENTRANCE TICKETS</span>
                <span className="font-bold text-emerald-400 text-sm">Rp {pkg.costBreakdown.ticketsRupiah.toLocaleString("id-ID")}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">EQUIPMENT RENTAL</span>
                <span className="font-bold text-slate-200 text-sm">Rp {pkg.costBreakdown.equipmentRupiah.toLocaleString("id-ID")}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">HEALTH CERTIFICATES</span>
                <span className="font-bold text-slate-200 text-sm">Rp {pkg.costBreakdown.healthCertificateRupiah.toLocaleString("id-ID")}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">TOTAL COST</span>
                <span className="font-bold text-amber-400 text-sm">Rp {pkg.totalOperationalCostRupiah.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: DESTINATIONS */}
      {activeTab === "destinations" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Default Package Destination Sequence
          </h3>

          <div className="space-y-3">
            {pkg.destinations.map((d, i) => (
              <div key={d.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </span>
                  <div>
                    <Link href={`/destinations/${d.destinationId}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600">
                      📍 {d.destinationName}
                    </Link>
                    <span className="text-slate-500 text-[11px] block">{d.region} · Requirement: {d.requirementName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 block">Rp {d.costRupiah.toLocaleString("id-ID")}</span>
                  <Badge variant={d.isMandatory ? "emerald" : "slate"}>{d.isMandatory ? "Mandatory" : "Optional"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: REQUIREMENTS */}
      {activeTab === "requirements" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Detailed Operational Requirements Matrix
          </h3>
          <DataTable
            columns={[
              { key: "name", header: "Requirement", render: (r: any) => <span className="font-bold">{r.requirementName}</span> },
              { key: "dest", header: "Destination", render: (r: any) => <span>📍 {r.destinationName}</span> },
              { key: "type", header: "Type", render: (r: any) => <Badge variant="blue">{r.requirementType}</Badge> },
              { key: "cost", header: "Cost (Rp)", render: (r: any) => <span className="font-mono font-bold text-emerald-600">Rp {r.costRupiah.toLocaleString("id-ID")}</span> },
              { key: "mand", header: "Mandatory", render: (r: any) => <Badge variant={r.isMandatory ? "emerald" : "slate"}>{r.isMandatory ? "Yes" : "No"}</Badge> },
            ]}
            data={pkg.destinations}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 4: BOOKINGS */}
      {activeTab === "bookings" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Bookings Using This Tour Package
          </h3>
          <DataTable
            columns={[
              { key: "code", header: "Booking Code", render: (r: any) => <span className="font-mono font-bold text-blue-600">{r.bookingCode}</span> },
              { key: "guest", header: "Guest Name", render: (r: any) => <span className="font-bold">{r.guestName} ({r.guestNationality})</span> },
              { key: "date", header: "Travel Date", render: (r: any) => <span className="font-mono">{r.travelDate}</span> },
              { key: "pax", header: "PAX", render: (r: any) => <span className="font-mono">{r.paxCount} Guests</span> },
              { key: "route", header: "Journey Route", render: (r: any) => <span className="font-mono text-xs">{r.origin} → {r.dropOff}</span> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant="emerald">{r.status}</Badge> },
            ]}
            data={pkg.linkedBookings}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 5: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Tour Package History & Edits Log
          </h3>
          <div className="space-y-2 text-slate-500">
            {pkg.history.map((h) => (
              <div key={h.id} className="p-2.5 border-b border-slate-200 dark:border-slate-800 flex justify-between">
                <span>{h.timestamp} — <strong>{h.action}</strong>: {h.details}</span>
                <span className="text-slate-400">User: {h.user}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AppShell>
  );
}
