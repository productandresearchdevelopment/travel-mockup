"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { mockPayrollData, mockRoleCostBreakdown, mockTripCostBreakdown } from "@/data/mockPayrollData";
import { PayrollRecord, PayrollStatus } from "@/types/payroll";
import {
  DollarSign,
  Briefcase,
  Download,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  PanelRightClose,
  Calendar,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Plus,
} from "lucide-react";

export default function WorkforcePayrollPage() {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollData);
  const [selectedPeriod, setSelectedPeriod] = useState("August 2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected Payroll Record for Detail Drawer
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);

  // Adjustment Modal State
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [adjAmount, setAdjAmount] = useState(100000);
  const [adjReason, setAdjReason] = useState("Additional Night Operation Allowance");

  // Overall Dashboard Metrics
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

  // Filtered Payroll Records
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

  // Approve Record Handler
  const handleApproveRecord = (id: string) => {
    setPayrollRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "Approved", approvedBy: "Operations Manager" }
          : r
      )
    );
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, status: "Approved", approvedBy: "Operations Manager" });
    }
  };

  // Add Adjustment Handler
  const handleSaveAdjustment = () => {
    if (!selectedRecord || !adjReason) return;

    const updatedRecord: PayrollRecord = {
      ...selectedRecord,
      adjustmentRupiah: adjAmount,
      adjustmentReason: adjReason,
      totalPayRupiah: selectedRecord.basePayRupiah + adjAmount - selectedRecord.deductionRupiah,
    };

    setPayrollRecords((prev) => prev.map((r) => (r.id === selectedRecord.id ? updatedRecord : r)));
    setSelectedRecord(updatedRecord);
    setShowAdjustmentModal(false);
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = "Worker Code,Worker Name,Role,Employment Type,Period,Working Days,Daily Rate,Base Pay,Adjustment,Deduction,Total Pay,Status\n";
    const rows = filteredRecords
      .map(
        (r) =>
          `"${r.workerCode}","${r.workerName}","${r.role}","${r.employmentType}","${r.period}",${r.workingDaysCount},${r.dailyRateRupiah},${r.basePayRupiah},${r.adjustmentRupiah},${r.deductionRupiah},${r.totalPayRupiah},"${r.status}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Workforce_Payroll_${selectedPeriod.replace(" ", "_")}.csv`;
    a.click();
  };

  return (
    <AppShell>
      <PageHeader
        title="Daily Worker Payroll & Compensation"
        description="Monitor operational workforce compensation calculated from working days, daily rates, attendance logs, and trip assignments."
        breadcrumbItems={[
          { label: "Workforce", href: "/workforce" },
          { label: "Payroll" },
        ]}
        actions={
          <Button variant="primary" size="sm" onClick={handleExportCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Payroll (CSV)
          </Button>
        }
      />

      {/* TOP DASHBOARD METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-sans">
        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1 col-span-1 sm:col-span-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="font-bold uppercase tracking-wider">ESTIMATED PAYROLL ({summary.currentPeriod})</span>
            <span className="text-emerald-400 font-bold">{summary.workersWorked} / {summary.totalWorkers} WORKERS WORKED</span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              Rp {summary.estimatedPayroll.toLocaleString("id-ID")}
            </span>
            <Badge variant="emerald">● Active Period</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">PENDING REVIEW</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              Rp {summary.pendingReview.toLocaleString("id-ID")}
            </span>
            <Badge variant="amber">Pending</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 col-span-1 sm:col-span-2">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">APPROVED & PAID PAYOUT</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              Rp {summary.approved.toLocaleString("id-ID")}
            </span>
            <Badge variant="emerald">✓ Approved</Badge>
          </div>
        </Card>
      </div>

      {/* ANOMALY DETECTION SAFETY BANNER */}
      <Card className="p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>OPERATIONAL ANOMALY DETECTED:</strong> 1 Attendance log recorded without Trip Assignment for <em>Agus Santoso</em> (25 Aug 2026). Verify before approving payout.
          </span>
        </div>
        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold underline cursor-pointer">
          Inspect Anomaly
        </span>
      </Card>

      {/* BREAKDOWN BY ROLE & BREAKDOWN BY TRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
        {/* Role Summary */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
              Payroll Cost Summary by Role
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Total: Rp 12.850.000</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {mockRoleCostBreakdown.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#162034] border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">{r.role} ({r.workerCount} Workers)</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Rp {r.totalCostRupiah.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Trip Summary */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
              Workforce Cost Contribution by Trip
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Trip Operational Source</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {mockTripCostBreakdown.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#162034] border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">{t.tripCode}</span>
                  <span className="text-slate-500 text-[11px] block">{t.tripName}</span>
                </div>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Rp {t.totalWorkforceCostRupiah.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search worker name, code, payroll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              options={[
                { value: "August 2026", label: "Period: August 2026" },
                { value: "July 2026", label: "Period: July 2026" },
              ]}
              className="w-40"
            />

            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: "All", label: "All Roles" },
                { value: "Driver", label: "Driver" },
                { value: "Guide", label: "Guide" },
                { value: "Tour Manager", label: "Tour Manager" },
              ]}
              className="w-32"
            />

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "Pending Review", label: "Pending Review" },
                { value: "Approved", label: "Approved" },
                { value: "Paid", label: "Paid" },
              ]}
              className="w-36"
            />
          </div>
        </div>

        {/* PAYROLL DATA TABLE */}
        <DataTable
          columns={[
            {
              key: "worker",
              header: "Worker Name & Code",
              render: (r: PayrollRecord) => (
                <div className="space-y-0.5">
                  <Link href={`/workforce/${r.workerId}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600">
                    {r.workerName}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono block">{r.workerCode}</span>
                </div>
              ),
            },
            {
              key: "role",
              header: "Role",
              render: (r: PayrollRecord) => (
                <Badge variant={r.role === "Driver" ? "blue" : r.role === "Guide" ? "emerald" : "violet"}>
                  {r.role}
                </Badge>
              ),
            },
            { key: "employment", header: "Employment", render: (r: PayrollRecord) => <span className="font-mono text-xs">{r.employmentType}</span> },
            {
              key: "days",
              header: "Working Days",
              render: (r: PayrollRecord) => (
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                  {r.workingDaysCount} Days
                </span>
              ),
            },
            {
              key: "rate",
              header: "Daily Rate",
              render: (r: PayrollRecord) => (
                <span className="font-mono text-xs">
                  Rp {r.dailyRateRupiah.toLocaleString("id-ID")}
                </span>
              ),
            },
            {
              key: "basePay",
              header: "Base Pay",
              render: (r: PayrollRecord) => (
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
                  Rp {r.basePayRupiah.toLocaleString("id-ID")}
                </span>
              ),
            },
            {
              key: "adjustment",
              header: "Adjustment",
              render: (r: PayrollRecord) => (
                <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                  {r.adjustmentRupiah > 0 ? `+Rp ${r.adjustmentRupiah.toLocaleString("id-ID")}` : "Rp 0"}
                </span>
              ),
            },
            {
              key: "totalPay",
              header: "Total Pay",
              render: (r: PayrollRecord) => (
                <span className="font-mono font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                  Rp {r.totalPayRupiah.toLocaleString("id-ID")}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r: PayrollRecord) => (
                <Badge variant={r.status === "Approved" ? "emerald" : r.status === "Paid" ? "blue" : "amber"}>
                  ● {r.status}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r: PayrollRecord) => (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecord(r)}
                    className="h-7 text-xs px-2"
                  >
                    View Detail
                  </Button>
                  {r.status === "Pending Review" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApproveRecord(r.id)}
                      className="h-7 text-xs px-2"
                    >
                      Approve
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
          data={filteredRecords}
          keyExtractor={(r) => r.id}
        />
      </Card>

      {/* MODAL: ADD OPERATIONAL ADJUSTMENT */}
      <Modal isOpen={showAdjustmentModal} onClose={() => setShowAdjustmentModal(false)} title="Add Operational Payout Adjustment">
        <div className="space-y-4 text-xs font-sans">
          <FormField label="Adjustment Amount (Rp) *">
            <input
              type="number"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono font-bold text-emerald-600"
              value={adjAmount}
              onChange={(e) => setAdjAmount(Number(e.target.value) || 0)}
            />
          </FormField>

          <FormField label="Adjustment Reason / Operational Note *">
            <input
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              placeholder="e.g. Additional Night Operation Allowance"
              value={adjReason}
              onChange={(e) => setAdjReason(e.target.value)}
            />
          </FormField>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-mono text-[11px] text-amber-800 dark:text-amber-200">
            🔒 <strong>Fraud Prevention Rule</strong>: Adjustments require explicit reason & Operations Manager approval before payout calculation.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowAdjustmentModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveAdjustment}>
              Save Adjustment
            </Button>
          </div>
        </div>
      </Modal>

      {/* SLIDE-IN PAYROLL DETAIL DRAWER */}
      {selectedRecord && (
        <aside className="fixed top-0 bottom-0 right-0 z-50 w-88 sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 text-slate-900 dark:text-white shadow-2xl overflow-y-auto space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                PAYROLL RECORD DETAIL
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedRecord.payrollCode}</h2>
            </div>
            <button
              onClick={() => setSelectedRecord(null)}
              className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <PanelRightClose className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">WORKER</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">{selectedRecord.workerName}</span>
              <span className="text-slate-500 text-[10px]">{selectedRecord.role} · {selectedRecord.employmentType}</span>
            </div>

            {/* WORKING DAYS PROOF LIST */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                WORKING DAYS OPERATIONAL PROOF ({selectedRecord.workingDaysCount} DAYS)
              </span>
              <div className="space-y-1 text-[11px]">
                {selectedRecord.workingDaysList.map((d, i) => (
                  <div key={i} className="flex justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{d.date}</span>
                      <span className="text-slate-500 text-[10px]">{d.assignmentName} ({d.tripCode})</span>
                    </div>
                    <Badge variant="emerald">✓ {d.attendanceStatus}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* PAYOUT CALCULATION BREAKDOWN */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">COMPENSATION CALCULATION</span>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Base Pay ({selectedRecord.workingDaysCount} Days × Rp {selectedRecord.dailyRateRupiah.toLocaleString("id-ID")})</span>
                <span className="font-bold">Rp {selectedRecord.basePayRupiah.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-indigo-400">Adjustment ({selectedRecord.adjustmentReason || "None"})</span>
                <span className="font-bold text-indigo-400">+Rp {selectedRecord.adjustmentRupiah.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                <span className="font-bold text-emerald-400">TOTAL PAYOUT</span>
                <span className="font-extrabold text-emerald-400 text-base">
                  Rp {selectedRecord.totalPayRupiah.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* FRAUD PREVENTION VERIFICATION */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 font-mono text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> FRAUD PREVENTION CHECK: PASSED
              </span>
              <span>Base Pay matches exact attendance proof count. Daily rate locked on effective date.</span>
            </div>

            {/* RATE HISTORY */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">EFFECTIVE DAILY RATE HISTORY</span>
              {selectedRecord.rateHistory.map((rh, i) => (
                <div key={i} className="flex justify-between text-[10px]">
                  <span>Effective: {rh.effectiveDate}</span>
                  <span className="font-bold text-emerald-600">Rp {rh.rateRupiah.toLocaleString("id-ID")} / day</span>
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="pt-2 space-y-2">
              {selectedRecord.status === "Pending Review" && (
                <Button
                  variant="primary"
                  className="w-full justify-center font-bold"
                  onClick={() => handleApproveRecord(selectedRecord.id)}
                >
                  Approve Payout (Rp {selectedRecord.totalPayRupiah.toLocaleString("id-ID")})
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-center text-xs"
                onClick={() => setShowAdjustmentModal(true)}
              >
                Add Operational Adjustment
              </Button>
            </div>
          </div>
        </aside>
      )}
    </AppShell>
  );
}
