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
import { mockWorkforceData } from "@/data/mockWorkforceData";
import { WorkerMaster } from "@/types/workforce";
import {
  UserCheck,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Layers,
} from "lucide-react";

export default function WorkerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "wrk-001";

  const initialWorker = useMemo(() => {
    return mockWorkforceData.find((w) => w.id === id) || mockWorkforceData[0];
  }, [id]);

  const [worker] = useState<WorkerMaster>(initialWorker);
  const [activeTab, setActiveTab] = useState("overview");

  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "assignments", label: `Assignments (${worker.assignments.length})` },
    { id: "attendance", label: `Attendance (${worker.attendanceLogs.length})` },
    { id: "compensation", label: "Compensation" },
    { id: "history", label: `History (${worker.history.length})` },
  ];

  return (
    <AppShell>
      <PageHeader
        title={`${worker.fullName} (${worker.workerCode})`}
        description={`Workforce Profile · Role: ${worker.role} · Employment: ${worker.employmentType}`}
        breadcrumbItems={[
          { label: "Workforce", href: "/workforce" },
          { label: worker.workerCode },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/workforce")}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back to Workforce
            </Button>
            <Button variant="primary" size="sm">
              Edit Worker Profile
            </Button>
          </div>
        }
      />

      {/* Detail Header Banner */}
      <DetailHeader
        title={worker.fullName}
        code={worker.workerCode}
        subtitle={`${worker.role} · ${worker.employmentType} · Region: ${worker.region} · Phone: ${worker.phone}`}
        status={worker.status as any}
        metrics={[
          { label: "Role", value: worker.role },
          { label: "Employment Type", value: worker.employmentType },
          { label: "Daily Rate", value: `Rp ${worker.dailyRateRupiah.toLocaleString("id-ID")} / day` },
          { label: "Vehicle Ownership", value: worker.vehicleOwnership },
        ]}
        actions={
          <Badge variant={worker.availability === "Available" ? "emerald" : worker.availability === "On Trip" ? "violet" : "blue"}>
            ● {worker.availability}
          </Badge>
        }
      />

      {/* TABS */}
      <Tabs items={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Worker Information & Rate Structure
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div><span className="text-slate-400 block">Full Name</span><strong className="text-slate-900 dark:text-slate-100">{worker.fullName}</strong></div>
              <div><span className="text-slate-400 block">Role</span><strong className="text-blue-600">{worker.role}</strong></div>
              <div><span className="text-slate-400 block">Employment Type</span><strong className="text-slate-900 dark:text-slate-100">{worker.employmentType}</strong></div>
              <div><span className="text-slate-400 block">Daily Rate</span><strong className="text-emerald-600 font-bold">Rp {worker.dailyRateRupiah.toLocaleString("id-ID")} / day</strong></div>
              <div><span className="text-slate-400 block">Phone Number</span><strong className="text-slate-900 dark:text-slate-100">{worker.phone}</strong></div>
              <div><span className="text-slate-400 block">Operating Region</span><strong className="text-slate-900 dark:text-slate-100">{worker.region}</strong></div>
              <div><span className="text-slate-400 block">Vehicle Ownership</span><strong className="text-amber-600">{worker.vehicleOwnership}</strong></div>
              <div><span className="text-slate-400 block">Joined Date</span><strong className="text-slate-700 dark:text-slate-300">{worker.joinedDate}</strong></div>
            </div>

            {/* PERSON ≠ VEHICLE HIGHLIGHT CARD */}
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2 border border-slate-800">
              <span className="font-bold text-blue-400 block uppercase tracking-wider">
                PERSON ≠ VEHICLE OPERATIONAL RULE
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Worker <strong>{worker.fullName}</strong> has <em>Vehicle Ownership: {worker.vehicleOwnership}</em>. When Dispatcher creates tour deployments, {worker.fullName} can be paired dynamically with rented vendor vehicles (e.g. Toyota Hiace B 1234 XYZ from PT ABC Transport).
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: SCHEDULE */}
      {activeTab === "schedule" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Worker Calendar Schedule & Availability (21 Aug - 28 Aug 2026)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-slate-400 text-[10px]">21 AUG 2026</span>
              <span className="font-bold text-emerald-600 block">● Available</span>
              <span className="text-slate-500 text-[11px]">Ready for dispatch</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-slate-400 text-[10px]">22 AUG 2026</span>
              <span className="font-bold text-emerald-600 block">● Available</span>
              <span className="text-slate-500 text-[11px]">Ready for dispatch</span>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/40 space-y-1">
              <span className="text-slate-400 text-[10px]">25 AUG 2026</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 block">● Assigned to Trip</span>
              <span className="text-slate-900 dark:text-white font-bold text-[11px]">East Java Explorer (03:00-18:00)</span>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/40 space-y-1">
              <span className="text-slate-400 text-[10px]">26 AUG 2026</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 block">● Assigned to Trip</span>
              <span className="text-slate-900 dark:text-white font-bold text-[11px]">East Java Explorer (06:00-18:00)</span>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: ASSIGNMENTS */}
      {activeTab === "assignments" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Trip Assignment History
          </h3>
          <DataTable
            columns={[
              { key: "code", header: "Trip Code", render: (r: any) => <Link href={`/dispatch/trips/${r.tripId}`} className="font-mono font-bold text-blue-600">{r.tripCode}</Link> },
              { key: "name", header: "Trip Name", render: (r: any) => <span className="font-bold">{r.tripName}</span> },
              { key: "date", header: "Date", render: (r: any) => <span className="font-mono">{r.date}</span> },
              { key: "role", header: "Assigned Role", render: (r: any) => <Badge variant="blue">{r.role}</Badge> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant="emerald">{r.status}</Badge> },
            ]}
            data={worker.assignments}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 4: ATTENDANCE */}
      {activeTab === "attendance" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Attendance Logs & Check-Ins
          </h3>
          <DataTable
            columns={[
              { key: "date", header: "Date", render: (r: any) => <span className="font-bold">{r.date}</span> },
              { key: "in", header: "Check In", render: (r: any) => <span>{r.checkInTime}</span> },
              { key: "out", header: "Check Out", render: (r: any) => <span>{r.checkOutTime || "—"}</span> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant="emerald">{r.status}</Badge> },
              { key: "ref", header: "Trip Reference", render: (r: any) => <span className="text-blue-600 font-bold">{r.tripReference || "—"}</span> },
            ]}
            data={worker.attendanceLogs}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 5: COMPENSATION */}
      {activeTab === "compensation" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Daily Worker Compensation Calculation
          </h3>

          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              ESTIMATED COMPENSATION FORMULA (DAYS WORKED × DAILY RATE)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-emerald-400">
                3 Days Worked × Rp {worker.dailyRateRupiah.toLocaleString("id-ID")} = Rp {(3 * worker.dailyRateRupiah).toLocaleString("id-ID")}
              </span>
              <Badge variant="emerald">● Approved Payout</Badge>
            </div>
          </div>

          <DataTable
            columns={[
              { key: "period", header: "Period", render: (r: any) => <span className="font-bold">{r.period}</span> },
              { key: "days", header: "Days Worked", render: (r: any) => <span>{r.daysWorked} Days</span> },
              { key: "rate", header: "Daily Rate", render: (r: any) => <span>Rp {r.dailyRateRupiah.toLocaleString("id-ID")} / day</span> },
              { key: "total", header: "Total Payout", render: (r: any) => <span className="font-bold text-emerald-600">Rp {r.totalCalculatedRupiah.toLocaleString("id-ID")}</span> },
              { key: "status", header: "Status", render: (r: any) => <Badge variant={r.status === "Paid" ? "emerald" : "blue"}>{r.status}</Badge> },
            ]}
            data={worker.compensationHistory}
            keyExtractor={(r) => r.id}
          />
        </Card>
      )}

      {/* TAB 6: HISTORY */}
      {activeTab === "history" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Worker Profile Log History
          </h3>
          <div className="space-y-2 text-slate-500">
            {worker.history.map((h) => (
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
