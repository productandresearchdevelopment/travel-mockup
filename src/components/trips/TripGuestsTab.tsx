"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  mockGuestGroupsData,
  mockGuestAssignmentsData,
  mockGuestActivityLogs,
} from "@/data/mockGuestAssignmentsData";
import {
  GuestGroup,
  GuestTripAssignment,
  GuestActivityLog,
} from "@/types/guestAssignment";
import { GuestDetailDrawer } from "./GuestDetailDrawer";
import { AddGuestModal } from "./AddGuestModal";
import { AssignTransportModal } from "./AssignTransportModal";
import {
  Users,
  UserPlus,
  Plus,
  Tag,
  MapPin,
  Calendar,
  Clock,
  Package,
  Truck,
  ShieldCheck,
  AlertTriangle,
  History,
  Eye,
  Layers,
  ChevronRight,
} from "lucide-react";

interface TripGuestsTabProps {
  tripId?: string;
}

export default function TripGuestsTab({ tripId = "trip-001" }: TripGuestsTabProps) {
  // Main State
  const [groups, setGroups] = useState<GuestGroup[]>(mockGuestGroupsData);
  const [assignments, setAssignments] = useState<GuestTripAssignment[]>(mockGuestAssignmentsData);
  const [activityLogs, setActivityLogs] = useState<GuestActivityLog[]>(mockGuestActivityLogs);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawer State
  const [selectedAssignment, setSelectedAssignment] = useState<GuestTripAssignment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [isAssignTransportModalOpen, setIsAssignTransportModalOpen] = useState(false);
  const [transportTargetAssignment, setTransportTargetAssignment] = useState<GuestTripAssignment | null>(null);

  // Group creation state
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupJoin, setNewGroupJoin] = useState("Probolinggo");
  const [newGroupLeave, setNewGroupLeave] = useState("Bali");

  // Summary Metrics (Requirement 12)
  const summaryMetrics = useMemo(() => {
    const totalGuests = assignments.reduce((acc, a) => acc + a.pax, 0);
    const originalGuests = assignments.filter((a) => !a.addedMidTrip).reduce((acc, a) => acc + a.pax, 0);
    const addedMidTrip = assignments.filter((a) => a.addedMidTrip).reduce((acc, a) => acc + a.pax, 0);
    const active = assignments.filter((a) => a.status === "Active" || a.status === "Added During Trip").reduce((acc, a) => acc + a.pax, 0);
    const completed = assignments.filter((a) => a.status === "Completed").reduce((acc, a) => acc + a.pax, 0);

    return { totalGuests, originalGuests, addedMidTrip, active, completed };
  }, [assignments]);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const q = searchQuery.toLowerCase();
      return (
        a.guestName.toLowerCase().includes(q) ||
        a.nationality.toLowerCase().includes(q) ||
        a.passportNumber.toLowerCase().includes(q) ||
        a.joinLocation.toLowerCase().includes(q) ||
        a.leaveLocation.toLowerCase().includes(q) ||
        a.packageName.toLowerCase().includes(q) ||
        a.groupName.toLowerCase().includes(q)
      );
    });
  }, [assignments, searchQuery]);

  // Handle Add Guest
  const handleAddGuest = (newAssignment: GuestTripAssignment) => {
    setAssignments([newAssignment, ...assignments]);

    // Log Activity
    const newLog: GuestActivityLog = {
      id: `gal-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16) + " WIB",
      action: "Guest Added",
      details: `${newAssignment.pax} Guests (${newAssignment.guestName}) assigned to ${newAssignment.groupName} at ${newAssignment.joinLocation}. Package: ${newAssignment.packageName}.`,
      operator: "Dispatcher (Current User)",
    };

    setActivityLogs([newLog, ...activityLogs]);
  };

  // Handle Save Transport
  const handleSaveTransport = (updatedAssignment: GuestTripAssignment) => {
    setAssignments(
      assignments.map((a) => (a.id === updatedAssignment.id ? updatedAssignment : a))
    );

    const newLog: GuestActivityLog = {
      id: `gal-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16) + " WIB",
      action: "Transport Changed",
      details: `Transport segment updated for ${updatedAssignment.guestName} (${updatedAssignment.groupName}).`,
      operator: "Dispatcher (Current User)",
    };

    setActivityLogs([newLog, ...activityLogs]);
  };

  // Handle Create Group
  const handleCreateGroup = () => {
    if (!newGroupName) return;
    const newGrp: GuestGroup = {
      id: `grp-${Date.now()}`,
      name: newGroupName,
      joinLocation: newGroupJoin,
      leaveLocation: newGroupLeave,
      packageId: "tp-004",
      packageName: "Bromo – Bali",
      badgeVariant: "emerald",
    };
    setGroups([...groups, newGrp]);
    setNewGroupName("");
    setShowGroupModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="emerald">● Active</Badge>;
      case "Added During Trip":
        return <Badge variant="blue">● Added Mid-Trip</Badge>;
      case "Scheduled":
        return <Badge variant="violet">○ Scheduled</Badge>;
      case "Completed":
        return <Badge variant="emerald">✓ Completed</Badge>;
      case "Cancelled":
        return <Badge variant="danger">✕ Cancelled</Badge>;
      case "No-show":
        return <Badge variant="amber">⚠️ No-show</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* REQUIREMENT 12: COMPACT GUEST SUMMARY BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOTAL GUESTS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{summaryMetrics.totalGuests}</span>
            <span className="text-xs font-mono text-indigo-400 font-bold">12 Pax Total</span>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">ORIGINAL GUESTS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-400">{summaryMetrics.originalGuests}</span>
            <span className="text-[10px] text-slate-400 font-mono">Yogyakarta Departure</span>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1 border-blue-900/80 bg-blue-950/20">
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">ADDED DURING TRIP</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-400">+{summaryMetrics.addedMidTrip}</span>
            <Badge variant="blue">● Malang Joiners</Badge>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">ACTIVE ON TRIP</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400">{summaryMetrics.active}</span>
            <Badge variant="emerald">● 100% Active</Badge>
          </div>
        </Card>

        <Card className="p-3.5 bg-slate-900 border border-slate-800 text-white space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">COMPLETED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-400">{summaryMetrics.completed}</span>
            <span className="text-[10px] text-slate-500 font-mono">0 Drop-off Completed</span>
          </div>
        </Card>
      </div>

      {/* CONTROLS & ADD GUEST BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" /> Dynamic Guest Assignments ({summaryMetrics.totalGuests} Pax)
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-48 sm:w-60">
              <SearchInput
                placeholder="Search guest, nationality, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGroupModal(true)}
              leftIcon={<Layers className="w-3.5 h-3.5 text-indigo-600" />}
            >
              + Create Guest Group
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddGuestModalOpen(true)}
              leftIcon={<UserPlus className="w-3.5 h-3.5" />}
            >
              + Add Guest
            </Button>
          </div>
        </div>

        {/* REQUIREMENT 5: GUEST GROUPING & VISUAL DISTINCTION */}
        <div className="space-y-6 pt-2">
          {groups.map((group) => {
            const groupAssignments = filteredAssignments.filter(
              (a) => a.groupId === group.id || a.groupName.includes(group.name.split(" ")[0])
            );

            const groupPaxTotal = groupAssignments.reduce((acc, a) => acc + a.pax, 0);

            return (
              <div
                key={group.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-xs overflow-hidden"
              >
                {/* COMPACT GROUP HEADER */}
                <div className="p-4 bg-slate-50/90 dark:bg-[#162034] border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <Badge variant={group.badgeVariant || "violet"}>
                      {group.name}
                    </Badge>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                      {groupPaxTotal} Pax Assigned
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" /> Package: {group.packageName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <MapPin className="w-3 h-3" /> Join: {group.joinLocation}
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <MapPin className="w-3 h-3" /> Leave: {group.leaveLocation}
                    </span>
                  </div>
                </div>

                {/* GUEST TABLE FOR THIS GROUP */}
                <DataTable
                  columns={[
                    {
                      key: "guest",
                      header: "Guest Name & Nationality",
                      render: (r: GuestTripAssignment) => (
                        <div className="space-y-0.5 font-sans">
                          <button
                            onClick={() => {
                              setSelectedAssignment(r);
                              setIsDrawerOpen(true);
                            }}
                            className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 text-left"
                          >
                            <span>{r.guestName}</span>
                          </button>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {r.nationality} · Passport: {r.passportNumber} · {r.phone}
                          </span>
                        </div>
                      ),
                    },
                    {
                      key: "pax",
                      header: "Pax Count",
                      render: (r: GuestTripAssignment) => (
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60">
                          {r.pax} Pax
                        </span>
                      ),
                    },
                    {
                      key: "joinLeave",
                      header: "Join & Leave Information",
                      render: (r: GuestTripAssignment) => (
                        <div className="font-mono text-xs space-y-0.5">
                          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <MapPin className="w-3 h-3" /> Join: {r.joinLocation} ({r.joinDate})
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                            <MapPin className="w-3 h-3 text-amber-500" /> Leave: {r.leaveLocation} ({r.leaveDate})
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: "package",
                      header: "Tour Package (Master)",
                      render: (r: GuestTripAssignment) => (
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 block">
                          {r.packageName}
                        </span>
                      ),
                    },
                    {
                      key: "transport",
                      header: "Transport Segment",
                      render: (r: GuestTripAssignment) => (
                        <div className="font-mono text-xs space-y-1">
                          {r.transportAssignments.length > 0 ? (
                            r.transportAssignments.map((ts, idx) => (
                              <div key={idx} className="flex items-center justify-between gap-1 text-[11px]">
                                <span className="text-slate-700 dark:text-slate-300 font-bold">{ts.vehicleOrTicket}</span>
                                <Badge variant={ts.assignedPax <= ts.vehicleCapacity ? "emerald" : "danger"} className="text-[9px] px-1 py-0">
                                  {ts.assignedPax <= ts.vehicleCapacity ? `✓ ${ts.assignedPax}/${ts.vehicleCapacity}` : `⚠️ ${ts.assignedPax}/${ts.vehicleCapacity}`}
                                </Badge>
                              </div>
                            ))
                          ) : (
                            <span className="text-slate-400 text-[10px] italic">Unassigned</span>
                          )}
                        </div>
                      ),
                    },
                    {
                      key: "status",
                      header: "Status & Visual Tag",
                      render: (r: GuestTripAssignment) => (
                        <div className="space-y-1 font-mono">
                          {getStatusBadge(r.status)}
                          {r.addedMidTrip && (
                            <div className="text-[9px] font-bold text-blue-600 dark:text-blue-400 block bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-1 rounded">
                              + Added in {r.addedLocation || "Malang"} on {r.addedDate || "27 Aug 2026"}
                            </div>
                          )}
                        </div>
                      ),
                    },
                    {
                      key: "actions",
                      header: "Actions",
                      render: (r: GuestTripAssignment) => (
                        <div className="flex items-center gap-1.5 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[11px] px-2 text-indigo-600 font-mono"
                            onClick={() => {
                              setTransportTargetAssignment(r);
                              setIsAssignTransportModalOpen(true);
                            }}
                          >
                            <Truck className="w-3 h-3 mr-1" /> Segment
                          </Button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAssignment(r);
                              setIsDrawerOpen(true);
                            }}
                            className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-500 hover:text-indigo-600 flex items-center justify-center transition-all"
                            title="View Detail"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ),
                    },
                  ]}
                  data={groupAssignments}
                  keyExtractor={(r) => r.id}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* REQUIREMENT 13: GUEST ACTIVITY & AUDIT LOG */}
      <Card className="p-6 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" /> Guest Activity & Dynamic Audit Log
          </h3>
          <span className="text-[10px] text-slate-400">All guest modifications logged for operational transparency</span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {log.action}
                </span>
                <span className="text-[10px] text-slate-400">{log.timestamp}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-sans text-xs">{log.details}</p>
              <span className="text-[10px] text-slate-400 block">Operator: {log.operator}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* GUEST DETAIL DRAWER */}
      <GuestDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        assignment={selectedAssignment}
      />

      {/* ADD GUEST MODAL */}
      <AddGuestModal
        isOpen={isAddGuestModalOpen}
        onClose={() => setIsAddGuestModalOpen(false)}
        groups={groups}
        onAddGuest={handleAddGuest}
      />

      {/* ASSIGN TRANSPORT MODAL */}
      <AssignTransportModal
        isOpen={isAssignTransportModalOpen}
        onClose={() => setIsAssignTransportModalOpen(false)}
        assignment={transportTargetAssignment}
        onSaveTransport={handleSaveTransport}
      />
    </div>
  );
}
