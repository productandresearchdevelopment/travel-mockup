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
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { mockGuestsData } from "@/data/mockGuestsData";
import TripCostsTab from "@/components/trips/TripCostsTab";
import TripGuestsTab from "@/components/trips/TripGuestsTab";
import PickupDropoffTab from "@/components/trips/PickupDropoffTab";
import TransportTab from "@/components/trips/TransportTab";
import OperationalMonitoringTab from "@/components/trips/OperationalMonitoringTab";
import TripActivityTimeline from "@/components/trips/TripActivityTimeline";
import {
  Compass,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Users,
  Truck,
  UserCheck,
  Briefcase,
  Hotel,
  Train,
  Plus,
  ShieldCheck,
  ArrowLeft,
  Lock,
  MessageSquare,
  Activity,
  FileCheck,
} from "lucide-react";

interface OperationalIssueItem {
  id: string;
  type: "Vehicle" | "Driver" | "Guide" | "Guest" | "Hotel" | "Schedule" | "Other";
  title: string;
  description: string;
  reportedBy: string;
  role: string;
  timestamp: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Investigating" | "Resolved" | "Cancelled";
  relatedResource: string;
}

interface OperationalNoteItem {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  message: string;
}

export default function TripOperationsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "trip-001";

  const [activeTab, setActiveTab] = useState("overview");

  // Operational State & Modals
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Issues dataset
  const [issues, setIssues] = useState<OperationalIssueItem[]>([
    {
      id: "iss-001",
      type: "Vehicle",
      title: "Rear Air Conditioner Airflow Reduced",
      description: "Air conditioner output in row 3 reduced. Driver inspected filter; temporary fix applied.",
      reportedBy: "Agus Santoso",
      role: "Driver",
      timestamp: "2026-08-25 10:12 WIB",
      priority: "Medium",
      status: "Open",
      relatedResource: "Toyota Hiace (B 1234 XYZ)",
    },
    {
      id: "iss-002",
      type: "Guest",
      title: "Guest Pickup Slight Traffic Delay",
      description: "Heavy traffic near Prambanan delayed pickup by 15 mins. Schedule adjusted.",
      reportedBy: "Sinta Wijaya",
      role: "Tour Manager",
      timestamp: "2026-08-25 08:15 WIB",
      priority: "Low",
      status: "Resolved",
      relatedResource: "Rossella Cescon (+3 Pax)",
    },
  ]);

  // Operational Notes timeline
  const [notes, setNotes] = useState<OperationalNoteItem[]>([
    {
      id: "note-001",
      timestamp: "2026-08-25 10:42 WIB",
      author: "Sinta Wijaya",
      role: "Tour Manager",
      message: "Arrived at Mount Bromo viewpoint. All 4 guests present and in good spirits.",
    },
    {
      id: "note-002",
      timestamp: "2026-08-25 08:15 WIB",
      author: "Agus Santoso",
      role: "Driver",
      message: "Refueled Toyota Hiace at Pertamina Rest Area KM 429 (Rp 450.000). Receipt attached.",
    },
    {
      id: "note-003",
      timestamp: "2026-08-25 07:02 WIB",
      author: "Rian Kurniawan",
      role: "Guide",
      message: "Guided tour at Borobudur Temple completed cleanly with local historian.",
    },
  ]);

  // Issue Form State
  const [issueType, setIssueType] = useState<OperationalIssueItem["type"]>("Vehicle");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [issuePriority, setIssuePriority] = useState<OperationalIssueItem["priority"]>("Medium");
  const [newNoteText, setNewNoteText] = useState("");

  // Milestone Progress Calculation (3/6 milestones completed = 65%)
  const milestoneProgress = 65;

  // Add Issue
  const handleSaveIssue = () => {
    if (!issueTitle) return;
    const newIssue: OperationalIssueItem = {
      id: `iss-${Date.now()}`,
      type: issueType,
      title: issueTitle,
      description: issueDesc,
      reportedBy: "Sinta Wijaya",
      role: "Tour Manager",
      timestamp: "2026-08-25 11:30 WIB",
      priority: issuePriority,
      status: "Open",
      relatedResource: "Toyota Hiace B 1234 XYZ",
    };
    setIssues([newIssue, ...issues]);
    setShowIssueModal(false);
    setIssueTitle("");
    setIssueDesc("");
  };

  // Add Note
  const handleSaveNote = () => {
    if (!newNoteText) return;
    const newNote: OperationalNoteItem = {
      id: `note-${Date.now()}`,
      timestamp: "2026-08-25 11:32 WIB",
      author: "Operations Staff",
      role: "Operations HQ",
      message: newNoteText,
    };
    setNotes([newNote, ...notes]);
    setShowNoteModal(false);
    setNewNoteText("");
  };

  return (
    <AppShell>
      <PageHeader
        title="East Java Explorer — Trip TRP-2026-00421"
        description="Live Trip Operations & Field Execution Control Center for Booking BKG-2026-00821."
        breadcrumbItems={[
          { label: "Operations", href: "/dispatch" },
          { label: "Trip Operations", href: "/dispatch/trips" },
          { label: "TRP-2026-00421" },
        ]}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/dispatch/tracking">
              <Button variant="outline" size="sm" leftIcon={<Compass className="w-3.5 h-3.5 text-blue-600" />}>
                View Live Telemetry Map
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNoteModal(true)}
              leftIcon={<MessageSquare className="w-3.5 h-3.5 text-indigo-600" />}
            >
              Add Operational Note
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIssueModal(true)}
              leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
            >
              Report Issue
            </Button>
          </div>
        }
      />

      {/* TOP COMMAND DASHBOARD / MILESTONE PROGRESS BANNER */}
      <Card className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border-slate-800 text-white space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
              LIVE TRIP OPERATIONS COMMAND
            </span>
            <h1 className="text-lg font-extrabold text-white">
              East Java Explorer (BP, BROMO, IJEN) — TRP-2026-00421
            </h1>
          </div>
          <Badge variant="blue">● In Progress</Badge>
        </div>

        {/* MILESTONE PROGRESS BAR */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between font-bold">
            <span className="text-slate-300">OVERLAND JOURNEY PROGRESS</span>
            <span className="text-emerald-400">{milestoneProgress}% COMPLETED (3 of 6 Milestones)</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${milestoneProgress}%` }} />
          </div>
        </div>

        {/* TOP METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs pt-1">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">CURRENT LOCATION</span>
            <strong className="text-emerald-400 font-bold text-sm block">📍 Mount Bromo</strong>
            <span className="text-[9px] text-slate-400 block">Last updated 10:42 WIB (● Moving)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">NEXT DESTINATION</span>
            <strong className="text-white font-bold text-sm block">Ijen Crater</strong>
            <span className="text-[9px] text-slate-400 block">ETA: 28 Aug 03:00 WIB</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">GUESTS MANIFEST</span>
            <strong className="text-slate-200 font-bold text-sm block">12 Guests</strong>
            <span className="text-[9px] text-emerald-400 block">● 8 Orig + 4 Added Mid-Trip</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">ASSIGNED VEHICLE</span>
            <strong className="text-slate-200 font-bold text-sm block">Hiace B 1234 XYZ</strong>
            <span className="text-[9px] text-slate-400 block">Vendor: PT ABC Transport</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block">FIELD ISSUES</span>
            <strong className="text-amber-400 font-bold text-sm block">{issues.filter((i) => i.status === "Open").length} Open Issue</strong>
            <span className="text-[9px] text-amber-400 block">Medium Priority</span>
          </div>
        </div>
      </Card>

      {/* VENDOR RENTAL RATE LOCK BANNER */}
      <Card className="p-3.5 bg-slate-900 border border-blue-900/60 font-mono text-xs text-slate-300 flex items-center justify-between">
        <span className="font-bold text-blue-400 flex items-center gap-1.5">
          🔒 VENDOR RENTAL RATE LOCKED (PT ABC Transport — CTR-ABC-2026-001)
        </span>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Agreed Rate: <strong className="text-white">Rp 850.000 / day 🔒</strong></span>
          <span>Estimated Rental (2 Days): <strong className="text-slate-200">Rp 1.700.000</strong></span>
        </div>
      </Card>

          {/* TABS */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "overview", label: "Overview & Resources" },
          { id: "guests", label: "Guests (12 Pax)" },
          { id: "transport", label: "Transport (3 Segments)" },
          { id: "pickup_dropoff", label: "Pickup & Drop-off" },
          { id: "issues", label: "Issues & Monitoring (6)" },
          { id: "timeline", label: "Operational Timeline" },
          { id: "destinations", label: "Destination Progress (3/6)" },
          { id: "costs", label: "Costs" },
          { id: "notes", label: `Operational Notes (${notes.length})` },
          { id: "audit", label: "Audit Trail" },
        ]}
      />

      {/* TAB GUESTS: DYNAMIC GUEST MANAGEMENT */}
      {activeTab === "guests" && (
        <TripGuestsTab tripId={id} />
      )}

      {/* TAB TRANSPORT: MULTI-SEGMENT & VEHICLE/DRIVER CHANGE */}
      {activeTab === "transport" && (
        <TransportTab tripId={id} />
      )}

      {/* TAB PICKUP & DROP-OFF: OPERATIONAL PICKUP & DROP-OFF MANAGEMENT */}
      {activeTab === "pickup_dropoff" && (
        <PickupDropoffTab tripId={id} />
      )}

      {/* TAB ISSUES & MONITORING: EXCEPTION MANAGEMENT & HEALTH BOARD */}
      {activeTab === "issues" && (
        <OperationalMonitoringTab tripId={id} />
      )}

      {/* TAB 1: OVERVIEW & RESOURCES */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* BOOKING REFERENCE & GUEST MANIFEST CARD */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Booking Reference & Guest Manifest
              </h3>
              <Link href="/guests/gst-001" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                View Guest Master Profile →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div><span>Booking Code:</span> <strong className="text-slate-900 dark:text-slate-100 block">BKG-2026-00821</strong></div>
              <div><span>Product Package:</span> <strong className="text-blue-600 block">BP, BROMO, IJEN</strong></div>
              <div><span>Tour Category:</span> <strong className="text-slate-900 dark:text-slate-100 block">BP Private - Budget Sharing</strong></div>
              <div><span>Total Billing:</span> <strong className="text-slate-900 dark:text-slate-100 block">Rp 7.420.000 (Partially Paid)</strong></div>
            </div>

            {/* GUEST MANIFEST OPERATIONAL STATUSES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <div className="flex justify-between">
                  <Link href="/guests/gst-001" className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600">1. Rossella Cescon (Italy)</Link>
                  <Badge variant="emerald">● On Trip</Badge>
                </div>
                <span className="text-slate-500 text-[11px] block">Passport: •••• 8932 · Vegetarian · Phone: +39 340 189 3053</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">2. Marco Cescon (Italy)</span>
                  <Badge variant="emerald">● On Trip</Badge>
                </div>
                <span className="text-slate-500 text-[11px] block">Passport: •••• 2231 · Phone: +39 340 998 7711</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">3. Sarah Wilson (UK)</span>
                  <Badge variant="emerald">● On Trip</Badge>
                </div>
                <span className="text-slate-500 text-[11px] block">Passport: •••• 8832 · Gluten-Free · Phone: +44 7700 900077</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">4. James Wilson (UK)</span>
                  <Badge variant="emerald">● On Trip</Badge>
                </div>
                <span className="text-slate-500 text-[11px] block">Passport: •••• 1128 · Phone: +44 7700 900088</span>
              </div>
            </div>
          </Card>

          {/* ASSIGNED FIELD RESOURCES */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Assigned Field Operations Resources
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
              <Link href="/vehicles/v-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">VEHICLE</span>
                <span className="font-bold text-blue-600 block text-sm">Toyota Hiace (B 1234 XYZ)</span>
                <span className="text-slate-500 block">Vendor: PT ABC Transport</span>
                <span className="text-emerald-600 font-bold block">● Active on Road</span>
              </Link>

              <Link href="/drivers/drv-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">DRIVER</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Agus Santoso</span>
                <span className="text-slate-500 block">Phone: +62 812-3456-7890</span>
                <span className="text-emerald-600 font-bold block">● On Duty</span>
              </Link>

              <Link href="/guides/g-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">TOUR GUIDE</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Rian Kurniawan</span>
                <span className="text-slate-500 block">Phone: +62 813-9876-5432</span>
                <span className="text-emerald-600 font-bold block">● Active Guided</span>
              </Link>

              <Link href="/tour-managers/tm-001" className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all space-y-1 bg-slate-50/50 dark:bg-[#162034]">
                <span className="text-[10px] text-slate-400 block font-bold">TOUR MANAGER</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Sinta Wijaya</span>
                <span className="text-slate-500 block">Field Ops Manager</span>
                <span className="text-emerald-600 font-bold block">● Active On Site</span>
              </Link>
            </div>
          </Card>

          {/* LATEST ACTIVITY BANNER CARD (REQUIREMENT 26) */}
          <Card className="p-5 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/20 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-indigo-200 dark:border-indigo-900/60">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 uppercase">
                <Clock className="w-4 h-4" /> LATEST ACTIVITY LOGGED
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-[11px] font-bold text-indigo-600 border-indigo-300 hover:bg-indigo-100 dark:border-indigo-800 dark:hover:bg-indigo-900/40"
                onClick={() => setActiveTab("timeline")}
              >
                View Full Timeline →
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm block">
                  Vehicle Changed: HiAce #01 (B 1234 XYZ) → HiAce Premio #02 (B 5678 ABC)
                </span>
                <span className="text-slate-500 text-[11px] block">
                  25 Aug 2026 @ 15:30 WIB · Logged by Deni — Dispatcher · Location: Probolinggo
                </span>
              </div>
              <Badge variant="violet">🔄 Vehicle Changed</Badge>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: OPERATIONAL TIMELINE */}
      {activeTab === "timeline" && (
        <TripActivityTimeline tripId={id} />
      )}

      {/* TAB 3: DESTINATION PROGRESS */}
      {activeTab === "destinations" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Overland Destination Progress Checklist
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-emerald-800 bg-emerald-950/20 text-emerald-300 space-y-1">
              <span className="font-bold block">1. 📍 Yogyakarta City — ✓ Completed</span>
              <span className="text-[11px] text-slate-400 block">Pickup & city orientation complete.</span>
            </div>

            <div className="p-3 rounded-xl border border-emerald-800 bg-emerald-950/20 text-emerald-300 space-y-1">
              <span className="font-bold block">2. 📍 Borobudur Temple — ✓ Completed</span>
              <span className="text-[11px] text-slate-400 block">Guided tour completed cleanly.</span>
            </div>

            <div className="p-3 rounded-xl border border-emerald-800 bg-emerald-950/20 text-emerald-300 space-y-1">
              <span className="font-bold block">3. 📍 Prambanan Temple — ✓ Completed</span>
              <span className="text-[11px] text-slate-400 block">Temple complex visit finished.</span>
            </div>

            <div className="p-3 rounded-xl border border-blue-800 bg-blue-950/30 text-blue-300 space-y-1">
              <span className="font-bold block">4. 📍 Mount Bromo — ● Current Location</span>
              <span className="text-[11px] text-slate-400 block">Sunrise jeep transfer in progress.</span>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 space-y-1">
              <span className="font-bold block">5. 📍 Ijen Crater — ○ Upcoming</span>
              <span className="text-[11px] text-slate-500 block">Scheduled for 28 Aug 03:00 WIB.</span>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 space-y-1">
              <span className="font-bold block">6. 📍 Bali Drop-off — ○ Upcoming</span>
              <span className="text-[11px] text-slate-500 block">Scheduled for 28 Aug 18:00 WIB.</span>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 4: COSTS */}
      {activeTab === "costs" && (
        <TripCostsTab tripId={id} paxCount={4} />
      )}

      {/* TAB 5: OPERATIONAL NOTES & LOG */}
      {activeTab === "notes" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Field Operational Notes Timeline
            </h3>
            <Button variant="primary" size="sm" onClick={() => setShowNoteModal(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Add Note
            </Button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {notes.map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{n.author} ({n.role})</span>
                  <span className="text-slate-400 text-[10px]">{n.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-sans text-xs">{n.message}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: ISSUES & CHECKLIST */}
      {activeTab === "issues" && (
        <div className="space-y-6">
          {/* OPERATIONAL ISSUES CARD */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" /> Operational Issue Management
              </h3>
              <Button variant="outline" size="sm" onClick={() => setShowIssueModal(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Report New Issue
              </Button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {issues.map((iss) => (
                <div key={iss.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{iss.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={iss.priority === "High" ? "danger" : "amber"}>{iss.priority} Priority</Badge>
                      <Badge variant={iss.status === "Open" ? "amber" : "emerald"}>{iss.status}</Badge>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-xs">{iss.description}</p>
                  <span className="text-[10px] text-slate-400 block">Reported by {iss.reportedBy} ({iss.role}) · {iss.timestamp} · Target: {iss.relatedResource}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* TRIP OPERATIONAL PRE-CHECKLIST */}
          <Card className="p-6 space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Pre-Trip & Execution Checklist
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-800 text-emerald-300 font-bold">✓ Guest Manifest Verified</div>
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-800 text-emerald-300 font-bold">✓ Vehicle Inspected</div>
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-800 text-emerald-300 font-bold">✓ Driver Confirmed</div>
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-800 text-emerald-300 font-bold">✓ Guide Briefed</div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 6: AUDIT TRAIL */}
      {activeTab === "audit" && (
        <Card className="p-6 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Trip Operations Execution Log
          </h3>
          <div className="space-y-2 text-slate-500">
            <div className="p-2 border-b border-slate-800">2026-08-25 10:42 WIB — Milestone 4 (Mount Bromo) reached by Driver Agus Santoso.</div>
            <div className="p-2 border-b border-slate-800">2026-08-25 07:02 WIB — Milestone 2 (Borobudur) completed by Guide Rian Kurniawan.</div>
            <div className="p-2 border-b border-slate-800">2026-08-25 03:00 WIB — Trip Dispatched from Yogyakarta Tugu Station by TM Sinta Wijaya.</div>
          </div>
        </Card>
      )}

      {/* REPORT ISSUE MODAL */}
      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)} title="Report Operational Field Issue">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Issue Category *">
              <Select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
                options={[
                  { value: "Vehicle", label: "Vehicle Issue" },
                  { value: "Driver", label: "Driver Issue" },
                  { value: "Guide", label: "Guide Issue" },
                  { value: "Guest", label: "Guest Request / Issue" },
                  { value: "Hotel", label: "Hotel Issue" },
                  { value: "Schedule", label: "Schedule Delay" },
                ]}
              />
            </FormField>

            <FormField label="Priority Level *">
              <Select
                value={issuePriority}
                onChange={(e) => setIssuePriority(e.target.value as any)}
                options={[
                  { value: "Low", label: "Low Priority" },
                  { value: "Medium", label: "Medium Priority" },
                  { value: "High", label: "High Priority" },
                  { value: "Critical", label: "Critical Priority" },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Issue Summary / Title *">
            <Input
              placeholder="e.g. Rear AC airflow reduced"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </FormField>

          <FormField label="Detailed Description">
            <Textarea
              placeholder="Describe what happened in the field..."
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
            />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowIssueModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveIssue}>
              Report Field Issue
            </Button>
          </div>
        </div>
      </Modal>

      {/* ADD NOTE MODAL */}
      <Modal isOpen={showNoteModal} onClose={() => setShowNoteModal(false)} title="Add Field Operational Note">
        <div className="space-y-4 text-xs">
          <FormField label="Operational Note Message *">
            <Textarea
              placeholder="Type field updates, guest feedback, or trip milestones..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
            />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNoteModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveNote}>
              Add Note
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
