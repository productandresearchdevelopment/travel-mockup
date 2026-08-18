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
import { mockAttendanceData } from "@/data/mockAttendanceData";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";

export default function AttendancePage() {
  const [attendanceLogs] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAttendance = useMemo(() => {
    return attendanceLogs.filter((log) => {
      const matchSearch =
        log.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.workerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.tripCode && log.tripCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRole = roleFilter === "All" || log.role === roleFilter;
      const matchStatus = statusFilter === "All" || log.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [attendanceLogs, searchQuery, roleFilter, statusFilter]);

  const summary = useMemo(() => {
    return {
      totalScheduled: attendanceLogs.length,
      presentCount: attendanceLogs.filter((a) => a.status === "Present" || a.status === "On Assignment").length,
      absentCount: attendanceLogs.filter((a) => a.status === "Absent").length,
      leaveCount: attendanceLogs.filter((a) => a.status === "Leave").length,
    };
  }, [attendanceLogs]);

  return (
    <AppShell>
      <PageHeader
        title="Field Workforce Attendance & Roster"
        description="Daily operational check-in/out logging, duty shifts & attendance verification"
        breadcrumbItems={[
          { label: "Overview", href: "/" },
          { label: "Attendance" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/payroll">
              <Button variant="outline" size="sm">
                Open Payroll
              </Button>
            </Link>
          </div>
        }
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            TOTAL SCHEDULED
          </span>
          <strong className="text-2xl font-extrabold text-blue-400 block">{summary.totalScheduled}</strong>
          <span className="text-slate-400 text-[10px]">On Active Shift</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            PRESENT & ON DUTY
          </span>
          <strong className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">{summary.presentCount}</strong>
          <span className="text-slate-500 text-[10px]">Checked In</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            ON LEAVE
          </span>
          <strong className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 block">{summary.leaveCount}</strong>
          <span className="text-slate-500 text-[10px]">Scheduled Leave</span>
        </Card>

        <Card className="p-4 space-y-1 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider block">
            ABSENT
          </span>
          <strong className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 block">{summary.absentCount}</strong>
          <span className="text-rose-600 text-[10px] font-bold">Unexcused</span>
        </Card>
      </div>

      {/* DATA TABLE CARD */}
      <Card className="p-6 space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Daily Attendance Roster Log
            </h3>
            <Badge variant="violet">25 Aug 2026</Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-64">
              <SearchInput
                placeholder="Search worker name, code, trip..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: "All", label: "All Roles" },
                { value: "Driver", label: "Drivers" },
                { value: "Guide", label: "Guides" },
                { value: "Tour Manager", label: "Tour Managers" },
              ]}
            />
          </div>
        </div>

        <DataTable
          columns={[
            {
              key: "worker",
              header: "Worker & Code",
              render: (r: AttendanceRecord) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 block">{r.workerName}</span>
                  <span className="text-slate-400 text-[10px] block">{r.workerCode} ({r.role})</span>
                </div>
              ),
            },
            {
              key: "shift",
              header: "Assignment & Trip",
              render: (r: AttendanceRecord) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.assignmentName}</span>
                  <span className="text-slate-400 text-[10px] block">Trip: {r.tripCode || "Standby"}</span>
                </div>
              ),
            },
            {
              key: "checkIn",
              header: "Check In",
              render: (r: AttendanceRecord) => (
                <span className="font-mono font-bold text-emerald-600 text-xs">{r.checkInTime || "—"}</span>
              ),
            },
            {
              key: "checkOut",
              header: "Check Out",
              render: (r: AttendanceRecord) => (
                <span className="font-mono font-bold text-amber-600 text-xs">{r.checkOutTime || "—"}</span>
              ),
            },
            {
              key: "hours",
              header: "Working Hours",
              render: (r: AttendanceRecord) => (
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
                  {r.workingHours || "—"}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r: AttendanceRecord) => (
                <Badge variant={r.status === "Present" || r.status === "On Assignment" ? "emerald" : r.status === "Leave" ? "amber" : "danger"}>
                  {r.status}
                </Badge>
              ),
            },
          ]}
          data={filteredAttendance}
          keyExtractor={(r) => r.id}
        />
      </Card>
    </AppShell>
  );
}
