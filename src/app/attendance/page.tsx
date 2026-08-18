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
import { mockAttendanceData } from "@/data/mockAttendanceData";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { Users, UserCheck, Calendar, UserX, Clock, ArrowRight } from "lucide-react";

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
        (log.tripCode &&
          log.tripCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRole = roleFilter === "All" || log.role === roleFilter;
      const matchStatus = statusFilter === "All" || log.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [attendanceLogs, searchQuery, roleFilter, statusFilter]);

  const summary = useMemo(() => {
    return {
      totalScheduled: attendanceLogs.length,
      presentCount: attendanceLogs.filter(
        (a) => a.status === "Present" || a.status === "On Assignment",
      ).length,
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="TOTAL SCHEDULED"
          value={summary.totalScheduled}
          subtitle="On Active Shift"
          icon={<Users className="w-3.5 h-3.5" />}
          variant="indigo"
        />
        <MetricCard
          title="PRESENT & ON DUTY"
          value={summary.presentCount}
          subtitle="Checked In Today"
          icon={<UserCheck className="w-3.5 h-3.5" />}
          variant="emerald"
          badge="● On Duty"
        />
        <MetricCard
          title="ON LEAVE / OFF"
          value={summary.leaveCount}
          subtitle="Scheduled Leave"
          icon={<Calendar className="w-3.5 h-3.5" />}
          variant="amber"
          badge="Off Shift"
        />
        <MetricCard
          title="ABSENT / UNEXCUSED"
          value={summary.absentCount}
          subtitle="Requires Review"
          icon={<UserX className="w-3.5 h-3.5" />}
          variant="rose"
          badge="Unexcused"
        />
      </div>

      {/* UNIFIED DATA TABLE */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search worker name, code, trip..."
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
              { value: "Present", label: "Present" },
              { value: "On Assignment", label: "On Assignment" },
              { value: "Leave", label: "Leave" },
              { value: "Off", label: "Off" },
            ],
          },
        ]}
        columns={[
          {
            key: "worker",
            header: "Worker & Code",
            render: (r: AttendanceRecord) => (
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
                    title={`${r.workerCode} · ${r.role}`}
                    className="text-[10px] text-slate-500 font-mono block truncate"
                  >
                    {r.workerCode} · <span className="font-semibold">{r.role}</span>
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "shift",
            header: "Assignment & Trip",
            render: (r: AttendanceRecord) => (
              <div className="space-y-0.5 font-mono text-xs max-w-[210px]">
                <span
                  title={r.assignmentName}
                  className="font-bold text-slate-800 dark:text-slate-200 block truncate"
                >
                  {r.assignmentName}
                </span>
                <span
                  title={`Trip: ${r.tripCode || "Standby"}`}
                  className="text-slate-400 text-[10px] block truncate"
                >
                  Trip: {r.tripCode || "Standby"}
                </span>
              </div>
            ),
          },
          {
            key: "checkIn",
            header: "Check In",
            render: (r: AttendanceRecord) => (
              <span className="font-mono font-bold text-emerald-600 text-xs">
                {r.checkInTime || "—"}
              </span>
            ),
          },
          {
            key: "checkOut",
            header: "Check Out",
            render: (r: AttendanceRecord) => (
              <span className="font-mono font-bold text-amber-600 text-xs">
                {r.checkOutTime || "—"}
              </span>
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
              <Badge
                variant={
                  r.status === "Present" || r.status === "On Assignment"
                    ? "emerald"
                    : r.status === "Leave"
                      ? "amber"
                      : "danger"
                }
              >
                {r.status}
              </Badge>
            ),
          },
        ]}
        data={filteredAttendance}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
