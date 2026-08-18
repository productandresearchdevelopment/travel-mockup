"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { MetricCard } from "@/components/ui/MetricCard";
import { mockPayrollData } from "@/data/mockPayrollData";
import { PayrollRecord } from "@/types/payroll";
import { Download, Wallet, Users, Clock, CheckCircle2, DollarSign } from "lucide-react";

export default function PayrollPage() {
  const [payrollRecords] = useState<PayrollRecord[]>(mockPayrollData);
  const [selectedPeriod, setSelectedPeriod] = useState("August 2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const summary = useMemo(() => {
    return {
      currentPeriod: selectedPeriod,
      totalWorkers: 48,
      workersWorked: 36,
      estimatedPayroll: 12850000,
      pendingReview: 3250000,
      approved: 9600000,
    };
  }, [selectedPeriod]);

  const filteredRecords = useMemo(() => {
    return payrollRecords.filter((r) => {
      const matchSearch =
        r.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.workerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.payrollCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = roleFilter === "All" || r.role === roleFilter;
      const matchStatus = statusFilter === "All" || r.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [payrollRecords, searchQuery, roleFilter, statusFilter]);

  return (
    <AppShell>
      <PageHeader
        title="Field Worker Payroll & Compensation"
        description="Daily worker rates, overtime payouts, trip allowances, deductions & payroll review"
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Payroll" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/financials">
              <Button variant="outline" size="sm">
                Open Financials
              </Button>
            </Link>
            <Button size="sm">
              <Download className="w-4 h-4 mr-1" /> Export Payroll Slip
            </Button>
          </div>
        }
      />

      {/* TOP KPI METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="ESTIMATED PAYROLL"
          value={`Rp ${summary.estimatedPayroll.toLocaleString("id-ID")}`}
          subtitle={`Period: ${selectedPeriod}`}
          icon={<Wallet className="w-3.5 h-3.5" />}
          variant="indigo"
        />
        <MetricCard
          title="ACTIVE WORKERS WORKED"
          value={`${summary.workersWorked} / ${summary.totalWorkers}`}
          subtitle="Drivers & Staff On Duty"
          icon={<Users className="w-3.5 h-3.5" />}
          variant="blue"
          badge="Active"
        />
        <MetricCard
          title="PENDING PAYROLL REVIEW"
          value={`Rp ${summary.pendingReview.toLocaleString("id-ID")}`}
          subtitle="Awaiting Supervisor Sign-off"
          icon={<Clock className="w-3.5 h-3.5" />}
          variant="amber"
          badge="Pending"
        />
        <MetricCard
          title="APPROVED DISBURSEMENT"
          value={`Rp ${summary.approved.toLocaleString("id-ID")}`}
          subtitle="Ready For Payment"
          icon={<CheckCircle2 className="w-3.5 h-3.5" />}
          variant="emerald"
          badge="● Approved"
        />
      </div>

      {/* DAILY WORKER PAYROLL SUMMARY */}
      <Card className="p-5 space-y-3 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/20 font-mono text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-indigo-200 dark:border-indigo-900/60">
          <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-xs">
            DAILY WORKER PAYROLL SUMMARY (PERIOD: 16 – 31 AUG 2026)
          </span>
          <Badge variant="violet">✓ 12 Daily Workers Eligible</Badge>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#162034] text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Worker</th>
                <th className="py-2.5 px-3">Days</th>
                <th className="py-2.5 px-3">Trips</th>
                <th className="py-2.5 px-3">Base Pay</th>
                <th className="py-2.5 px-3">Overtime</th>
                <th className="py-2.5 px-3">Allowance</th>
                <th className="py-2.5 px-3">Net Pay</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                      alt="Agus Santoso"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <Link href="/drivers/drv-001" className="hover:text-blue-600">
                      Agus Santoso (Daily Worker)
                    </Link>
                  </div>
                </td>
                <td className="py-2.5 px-3">12 Days</td>
                <td className="py-2.5 px-3">10 Trips</td>
                <td className="py-2.5 px-3">Rp 3,000,000</td>
                <td className="py-2.5 px-3 text-purple-600 font-bold">Rp 450,000</td>
                <td className="py-2.5 px-3 text-emerald-600">Rp 300,000</td>
                <td className="py-2.5 px-3 font-extrabold text-blue-600 dark:text-blue-400 text-sm">Rp 3,750,000</td>
                <td className="py-2.5 px-3"><Badge variant="amber">Pending Review</Badge></td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80"
                      alt="Budi Pratama"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <Link href="/drivers/drv-002" className="hover:text-blue-600">
                      Budi Pratama (Daily Worker)
                    </Link>
                  </div>
                </td>
                <td className="py-2.5 px-3">10 Days</td>
                <td className="py-2.5 px-3">8 Trips</td>
                <td className="py-2.5 px-3">Rp 2,500,000</td>
                <td className="py-2.5 px-3 text-purple-600 font-bold">Rp 300,000</td>
                <td className="py-2.5 px-3 text-emerald-600">Rp 250,000</td>
                <td className="py-2.5 px-3 font-extrabold text-blue-600 dark:text-blue-400 text-sm">Rp 3,050,000</td>
                <td className="py-2.5 px-3"><Badge variant="emerald">Approved</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* UNIFIED PAYROLL MASTER DATA TABLE */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search worker, payroll code..."
        filters={[
          {
            key: "role",
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { value: "All", label: "All Roles" },
              { value: "Driver", label: "Drivers" },
              { value: "Guide", label: "Guides" },
              { value: "Tour Manager", label: "Tour Managers" },
            ],
          },
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "All", label: "All Statuses" },
              { value: "Pending Review", label: "Pending Review" },
              { value: "Approved", label: "Approved" },
              { value: "Paid", label: "Paid" },
            ],
          },
        ]}
        columns={[
          {
            key: "code",
            header: "Payroll Code & Worker",
            render: (r: PayrollRecord) => (
              <div className="flex items-center gap-2.5 max-w-[190px]">
                {r.avatarUrl ? (
                  <img
                    src={r.avatarUrl}
                    alt={r.workerName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {r.workerName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span
                    title={r.workerName}
                    className="font-extrabold text-slate-800 dark:text-slate-200 block text-xs truncate"
                  >
                    {r.workerName}
                  </span>
                  <span
                    title={`${r.payrollCode} · ${r.role}`}
                    className="text-[10px] text-slate-500 font-mono block truncate"
                  >
                    {r.payrollCode} · <span className="font-semibold">{r.role}</span>
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "rate",
            header: "Rate & Days",
            render: (r: PayrollRecord) => (
              <div className="space-y-0.5 font-mono text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  {r.workingDaysCount} Days Worked
                </span>
                <span className="text-slate-400 text-[10px] block">
                  Rate: Rp {r.dailyRateRupiah.toLocaleString("id-ID")}/day
                </span>
              </div>
            ),
          },
          {
            key: "basePay",
            header: "Base Pay",
            render: (r: PayrollRecord) => (
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
                Rp {r.basePayRupiah.toLocaleString("id-ID")}
              </span>
            ),
          },
          {
            key: "overtime",
            header: "Adjustment & Deduction",
            render: (r: PayrollRecord) => (
              <div className="space-y-0.5 font-mono text-xs">
                <span className="text-purple-600 font-bold block">
                  +Rp {r.adjustmentRupiah.toLocaleString("id-ID")}
                </span>
                <span className="text-rose-600 block">
                  -Rp {r.deductionRupiah.toLocaleString("id-ID")}
                </span>
              </div>
            ),
          },
          {
            key: "netPay",
            header: "Net Pay Amount",
            render: (r: PayrollRecord) => (
              <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-sm block">
                Rp {r.totalPayRupiah.toLocaleString("id-ID")}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (r: PayrollRecord) => (
              <Badge variant={r.status === "Approved" || r.status === "Paid" ? "emerald" : "amber"}>
                {r.status}
              </Badge>
            ),
          },
        ]}
        data={filteredRecords}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
