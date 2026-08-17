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
import { mockAttendanceData } from "@/data/mockAttendanceData";
import { mockWorkforceData } from "@/data/mockWorkforceData";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { WorkerRole } from "@/types/workforce";
import {
  UserCheck,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  PanelRightClose,
  ExternalLink,
  Layers,
  CalendarCheck,
} from "lucide-react";

export default function WorkforceAttendancePage() {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("25 Aug 2026");

  // Selected Record for Drawer & Modal
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // New Attendance Form State
  const [newWorkerId, setNewWorkerId] = useState(mockWorkforceData[0].id);
  const [newDate, setNewDate] = useState("25 Aug 2026");
  const [newStatus, setNewStatus] = useState<AttendanceStatus>("Present");
  const [newCheckIn, setNewCheckIn] = useState("03:00");
  const [newCheckOut, setNewCheckOut] = useState("17:30");
  const [newAssignment, setNewAssignment] = useState("East Java Explorer");
  const [newTripCode, setNewTripCode] = useState("TRP-2026-00421");
  const [newNotes, setNewNotes] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Dashboard Metrics
  const summary = useMemo(() => {
    return {
      totalWorkforce: 48,
      present: 36,
      onAssignment: 7,
      absent: 2,
      leave: 1,
      notRecorded: 2,
    };
  }, []);

  // Filtered Attendance Logs
  const filteredLogs = useMemo(() => {
    return attendanceLogs.filter((log) => {
      const matchSearch =
        log.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.workerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.assignmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.tripCode && log.tripCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRole = roleFilter === "All" || log.role === roleFilter;
      const matchStatus = statusFilter === "All" || log.status === statusFilter;
      const matchDate = dateFilter === "All" || log.date === dateFilter;

      return matchSearch && matchRole && matchStatus && matchDate;
    });
  }, [attendanceLogs, searchQuery, roleFilter, statusFilter, dateFilter]);

  // Validation Helper
  const validateTimes = (inTime: string, outTime: string) => {
    if (!inTime || !outTime) return true;
    const [inH, inM] = inTime.split(":").map(Number);
    const [outH, outM] = outTime.split(":").map(Number);
    return outH * 60 + outM > inH * 60 + inM;
  };

  // Calculate Working Hours
  const calculateHours = (inTime?: string, outTime?: string) => {
    if (!inTime || !outTime) return "—";
    const [inH, inM] = inTime.split(":").map(Number);
    const [outH, outM] = outTime.split(":").map(Number);
    const diffMins = outH * 60 + outM - (inH * 60 + inM);
    if (diffMins <= 0) return "Invalid";
    const h = Math.floor(diffMins / 60);
    const m = diffMins % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m`;
  };

  // Save Attendance Record Handler
  const handleSaveAttendance = () => {
    setValidationError(null);

    if (!validateTimes(newCheckIn, newCheckOut)) {
      setValidationError("Check Out time must be later than Check In time.");
      return;
    }

    const worker = mockWorkforceData.find((w) => w.id === newWorkerId) || mockWorkforceData[0];

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      date: newDate,
      workerId: worker.id,
      workerName: worker.fullName,
      workerCode: worker.workerCode,
      role: worker.role,
      assignmentName: newAssignment || "General Operational Duty",
      tripCode: newTripCode || undefined,
      status: newStatus,
      checkInTime: newCheckIn,
      checkOutTime: newCheckOut,
      workingHours: calculateHours(newCheckIn, newCheckOut),
      source: "Manual Record",
      notes: newNotes,
      recordedBy: "Operations HQ",
      recordedAt: new Date().toISOString().slice(0, 16).replace("T", " ") + " WIB",
    };

    setAttendanceLogs([newRecord, ...attendanceLogs]);
    setShowRecordModal(false);
    setNewNotes("");
  };

  return (
    <AppShell>
      <PageHeader
        title="Workforce Attendance"
        description="Track operational worker check-ins, duty status, trip assignment derivations, and working hours."
        breadcrumbItems={[
          { label: "Workforce", href: "/workforce" },
          { label: "Attendance" },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowRecordModal(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Record Attendance
          </Button>
        }
      />

      {/* TOP ATTENDANCE DASHBOARD METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 font-sans">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOTAL WORKFORCE</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{summary.totalWorkforce}</span>
        </Card>

        <Card className="p-4 space-y-1 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">PRESENT</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.present}</span>
            <Badge variant="emerald">● Present</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20">
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase block">ON ASSIGNMENT</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{summary.onAssignment}</span>
            <Badge variant="blue">Assigned</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase block">ABSENT</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-rose-600 dark:text-rose-400">{summary.absent}</span>
            <Badge variant="danger">Absent</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">LEAVE</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-400">{summary.leave}</span>
            <Badge variant="slate">Leave</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">NOT RECORDED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-amber-500">{summary.notRecorded}</span>
            <Badge variant="amber">Pending</Badge>
          </div>
        </Card>
      </div>

      {/* MONTHLY SUMMARY BANNER */}
      <Card className="p-4 bg-slate-900 text-white border-slate-800 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CalendarCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-emerald-400 font-bold uppercase tracking-wider block">
              AUGUST 2026 MONTHLY ATTENDANCE SUMMARY
            </span>
            <span className="text-slate-300">
              Working Days: <strong>22 Days</strong> · Present Days: <strong>18 Days</strong> · Trip Assignment Days: <strong>15 Days</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald">18 Present</Badge>
          <Badge variant="danger">1 Absent</Badge>
          <Badge variant="slate">2 Leave</Badge>
        </div>
      </Card>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search worker name, code, trip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              options={[
                { value: "All", label: "All Dates" },
                { value: "25 Aug 2026", label: "25 Aug 2026" },
                { value: "26 Aug 2026", label: "26 Aug 2026" },
                { value: "27 Aug 2026", label: "27 Aug 2026" },
              ]}
              className="w-36"
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
                { value: "Present", label: "Present" },
                { value: "On Assignment", label: "On Assignment" },
                { value: "Absent", label: "Absent" },
                { value: "Leave", label: "Leave" },
                { value: "Off", label: "Off" },
              ]}
              className="w-36"
            />
          </div>
        </div>

        {/* ATTENDANCE DATA TABLE */}
        <DataTable
          columns={[
            { key: "date", header: "Date", render: (r: AttendanceRecord) => <span className="font-mono text-xs font-bold">{r.date}</span> },
            {
              key: "worker",
              header: "Worker",
              render: (r: AttendanceRecord) => (
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
              render: (r: AttendanceRecord) => (
                <Badge variant={r.role === "Driver" ? "blue" : r.role === "Guide" ? "emerald" : "violet"}>
                  {r.role}
                </Badge>
              ),
            },
            {
              key: "assignment",
              header: "Assignment & Trip",
              render: (r: AttendanceRecord) => (
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.assignmentName}</span>
                  {r.tripCode && (
                    <Link href="/dispatch/trips/trip-001" className="text-[10px] text-blue-600 font-bold hover:underline block">
                      {r.tripCode}
                    </Link>
                  )}
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r: AttendanceRecord) => (
                <Badge
                  variant={
                    r.status === "Present"
                      ? "emerald"
                      : r.status === "On Assignment"
                      ? "blue"
                      : r.status === "Absent"
                      ? "danger"
                      : "slate"
                  }
                >
                  ● {r.status}
                </Badge>
              ),
            },
            { key: "checkIn", header: "Check In", render: (r: AttendanceRecord) => <span className="font-mono text-xs">{r.checkInTime || "—"}</span> },
            { key: "checkOut", header: "Check Out", render: (r: AttendanceRecord) => <span className="font-mono text-xs">{r.checkOutTime || "—"}</span> },
            {
              key: "hours",
              header: "Working Hours",
              render: (r: AttendanceRecord) => (
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {r.workingHours || "—"}
                </span>
              ),
            },
            { key: "source", header: "Source", render: (r: AttendanceRecord) => <span className="font-mono text-[10px] text-slate-500">{r.source}</span> },
            {
              key: "actions",
              header: "Actions",
              render: (r: AttendanceRecord) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRecord(r)}
                  className="h-7 text-xs px-2"
                >
                  View Detail
                </Button>
              ),
            },
          ]}
          data={filteredLogs}
          keyExtractor={(r) => r.id}
        />
      </Card>

      {/* MODAL: RECORD ATTENDANCE */}
      <Modal isOpen={showRecordModal} onClose={() => setShowRecordModal(false)} title="Record Operational Attendance">
        <div className="space-y-4 text-xs font-sans">
          {validationError && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>{validationError}</span>
            </div>
          )}

          <FormField label="Select Worker *">
            <Select
              value={newWorkerId}
              onChange={(e) => setNewWorkerId(e.target.value)}
              options={mockWorkforceData.map((w) => ({
                value: w.id,
                label: `${w.fullName} (${w.role} - ${w.workerCode})`,
              }))}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date *">
              <Select
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                options={[
                  { value: "25 Aug 2026", label: "25 Aug 2026" },
                  { value: "26 Aug 2026", label: "26 Aug 2026" },
                  { value: "27 Aug 2026", label: "27 Aug 2026" },
                  { value: "28 Aug 2026", label: "28 Aug 2026" },
                ]}
              />
            </FormField>

            <FormField label="Attendance Status *">
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                options={[
                  { value: "Present", label: "Present" },
                  { value: "On Assignment", label: "On Assignment" },
                  { value: "Absent", label: "Absent" },
                  { value: "Leave", label: "Leave" },
                  { value: "Off", label: "Off" },
                ]}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Check In Time">
              <input
                type="time"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono"
                value={newCheckIn}
                onChange={(e) => setNewCheckIn(e.target.value)}
              />
            </FormField>

            <FormField label="Check Out Time">
              <input
                type="time"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono"
                value={newCheckOut}
                onChange={(e) => setNewCheckOut(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Assignment Name">
              <input
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
                placeholder="e.g. East Java Explorer"
                value={newAssignment}
                onChange={(e) => setNewAssignment(e.target.value)}
              />
            </FormField>

            <FormField label="Trip Code">
              <input
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono"
                placeholder="e.g. TRP-2026-00421"
                value={newTripCode}
                onChange={(e) => setNewTripCode(e.target.value)}
              />
            </FormField>
          </div>

          {/* CALCULATED WORKING HOURS PREVIEW */}
          <div className="p-3 rounded-lg bg-slate-900 text-white font-mono flex justify-between items-center text-xs">
            <span>CALCULATED WORKING HOURS:</span>
            <span className="text-base font-extrabold text-emerald-400">
              {calculateHours(newCheckIn, newCheckOut)}
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowRecordModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveAttendance}>
              Save Attendance Record
            </Button>
          </div>
        </div>
      </Modal>

      {/* SLIDE-IN DETAIL DRAWER */}
      {selectedRecord && (
        <aside className="fixed top-0 bottom-0 right-0 z-50 w-88 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 text-slate-900 dark:text-white shadow-2xl overflow-y-auto space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                ATTENDANCE LOG DETAIL
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedRecord.id}</h2>
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
              <span className="text-slate-500 text-[10px]">{selectedRecord.role} · {selectedRecord.workerCode}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">DATE</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{selectedRecord.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">CHECK IN</span>
                <span className="font-bold text-emerald-600">{selectedRecord.checkInTime || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">CHECK OUT</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{selectedRecord.checkOutTime || "—"}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold">TOTAL HOURS</span>
                <span className="font-extrabold text-emerald-600 text-sm">{selectedRecord.workingHours || "—"}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">TRIP & ASSIGNMENT</span>
              <span className="font-bold text-blue-400 text-sm block">{selectedRecord.assignmentName}</span>
              {selectedRecord.tripCode && (
                <span className="text-slate-300 text-[11px] block">Trip Code: {selectedRecord.tripCode}</span>
              )}
            </div>

            {selectedRecord.notes && (
              <div>
                <span className="text-[10px] text-slate-400 block">FIELD NOTES</span>
                <p className="text-slate-600 dark:text-slate-300">{selectedRecord.notes}</p>
              </div>
            )}
          </div>
        </aside>
      )}
    </AppShell>
  );
}
