"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/travelOps";
import {
  LayoutDashboard,
  Compass,
  ShoppingBag,
  Send,
  Truck,
  Users,
  DollarSign,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export type NavTab = 
  | 'control_room'
  | 'booking_grouping'
  | 'dispatch_execution'
  | 'assignment_manifest'
  | 'manifest_assignment'
  | 'fleet_management'
  | 'crew_sdm'
  | 'finance_bop'
  | 'reports_analytics';

interface SidebarNavProps {
  activeTab?: string;
  onSelectTab?: (tab: NavTab) => void;
  counts: {
    pendingBookings: number;
    activeTours: number;
    maintenanceDue: number;
    pendingBop: number;
  };
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ counts }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const role: UserRole = user?.role || "operation_manager";

  const [opsOpen, setOpsOpen] = useState(true);
  const [dispatchOpen, setDispatchOpen] = useState(true);
  const [fleetOpen, setFleetOpen] = useState(true);
  const [crewOpen, setCrewOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [teamOpen, setTeamOpen] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(true);

  return (
    <aside className="w-64 dark:bg-slate-900 bg-white border-r dark:border-slate-800 border-slate-200 flex flex-col h-full select-none text-xs font-sans transition-colors">
      {/* Role Context Title */}
      <div className="p-3 border-b dark:border-slate-800 border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest block">
            Workspace Nav
          </span>
          <span className="font-bold text-xs text-cyan-600 dark:text-cyan-400 block mt-0.5">
            {user?.roleLabel || "Operation Manager"}
          </span>
        </div>
        <span className="font-mono text-[9px] dark:bg-slate-950 bg-slate-100 px-2 py-0.5 rounded border dark:border-slate-800 border-slate-200 text-slate-500">
          {user?.region || "East Java"}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {/* ================================================== */}
        {/* 1. OPERATION MANAGER NAVIGATION */}
        {/* ================================================== */}
        {role === "operation_manager" && (
          <>
            <Link
              href="/dashboard/operation-manager"
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all ${
                pathname === "/dashboard/operation-manager" || pathname === "/dashboard" || pathname === "/"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold"
                  : "dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                <span>Overview</span>
              </div>
            </Link>

            <div className="space-y-0.5">
              <button
                onClick={() => setOpsOpen(!opsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span>Operations</span>
                </div>
                {opsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {opsOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/operations" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850">
                    Today's Operation
                  </Link>
                  <Link href="/operations" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850">
                    Tour Monitoring
                  </Link>
                  <Link href="/operations?status=Departed" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850">
                    Departure
                  </Link>
                  <Link href="/operations?status=Arrived" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850">
                    Arrival
                  </Link>
                  <Link href="/operations?status=Handover" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850">
                    Handover
                  </Link>
                </div>
              )}
            </div>

            <Link href="/bookings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <ShoppingBag className="w-4 h-4 text-blue-500" />
              <span>Booking Overview</span>
            </Link>

            <Link href="/dispatch" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <Send className="w-4 h-4 text-cyan-500" />
              <span>Deployment Overview</span>
            </Link>

            <Link href="/fleet" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Fleet Overview</span>
            </Link>

            <Link href="/crew" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Crew Overview</span>
            </Link>

            <Link href="/finance" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span>Operational Finance</span>
            </Link>

            <Link href="/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Reports</span>
            </Link>
          </>
        )}

        {/* ================================================== */}
        {/* 2. BUSINESS MANAGER NAVIGATION */}
        {/* ================================================== */}
        {role === "business_manager" && (
          <>
            <Link
              href="/dashboard/business-manager"
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all ${
                pathname === "/dashboard/business-manager"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold"
                  : "dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                <span>Dashboard</span>
              </div>
            </Link>

            <div className="space-y-0.5">
              <button
                onClick={() => setOpsOpen(!opsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span>Operations Control</span>
                </div>
                {opsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {opsOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/operations?status=Departed" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Departure Control
                  </Link>
                  <Link href="/operations?status=Arrived" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Arrival Control
                  </Link>
                  <Link href="/operations" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Tour Monitoring
                  </Link>
                  <Link href="/operations?status=Handover" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Handover
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-0.5">
              <button
                onClick={() => setTeamOpen(!teamOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Regional Team</span>
                </div>
                {teamOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {teamOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/dispatch" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Dispatcher
                  </Link>
                  <Link href="/fleet" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Fleet
                  </Link>
                  <Link href="/crew" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    SDM / Crew
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-0.5">
              <button
                onClick={() => setFinanceOpen(!financeOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span>Finance Approvals</span>
                </div>
                {financeOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {financeOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/finance/bop" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    BOP Approvals
                  </Link>
                  <Link href="/finance/reimbursement" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Reimbursements
                  </Link>
                </div>
              )}
            </div>

            <Link href="/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Regional Reports</span>
            </Link>
          </>
        )}

        {/* ================================================== */}
        {/* 3. DISPATCHER NAVIGATION */}
        {/* ================================================== */}
        {role === "dispatcher" && (
          <>
            <Link
              href="/dashboard/dispatcher"
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all ${
                pathname === "/dashboard/dispatcher"
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-bold"
                  : "dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-cyan-500" />
                <span>Dashboard</span>
              </div>
            </Link>

            <div className="space-y-0.5">
              <button
                onClick={() => setBookingOpen(!bookingOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-blue-500" />
                  <span>Booking Ingestion</span>
                </div>
                {bookingOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {bookingOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/bookings" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850 flex items-center justify-between">
                    <span>Booking Inbox</span>
                    {counts.pendingBookings > 0 && (
                      <span className="font-mono text-[9px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1.5 py-0.2 rounded">
                        {counts.pendingBookings}
                      </span>
                    )}
                  </Link>
                  <Link href="/bookings" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Booking Grouping
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-0.5">
              <button
                onClick={() => setDispatchOpen(!dispatchOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-cyan-500" />
                  <span>Dispatch Workspace</span>
                </div>
                {dispatchOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {dispatchOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/dispatch" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Dispatch Board
                  </Link>
                  <Link href="/dispatch/deployment" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Deployment
                  </Link>
                  <Link href="/dispatch" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Passenger Manifest
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-0.5">
              <button
                onClick={() => setOpsOpen(!opsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span>Operations Tracking</span>
                </div>
                {opsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {opsOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/operations" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Today's Deployment
                  </Link>
                  <Link href="/operations" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Tour Status
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* ================================================== */}
        {/* 4. FLEET MANAGEMENT NAVIGATION */}
        {/* ================================================== */}
        {role === "fleet" && (
          <>
            <Link
              href="/dashboard/fleet"
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all ${
                pathname === "/dashboard/fleet"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold"
                  : "dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-amber-500" />
                <span>Dashboard</span>
              </div>
            </Link>

            <div className="space-y-0.5">
              <button
                onClick={() => setFleetOpen(!fleetOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>Fleet Controls</span>
                </div>
                {fleetOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {fleetOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/fleet" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Fleet Overview
                  </Link>
                  <Link href="/fleet/vehicles" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Vehicles List
                  </Link>
                  <Link href="/fleet" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Vehicle Assignment
                  </Link>
                  <Link href="/fleet" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Checklist
                  </Link>
                  <Link href="/fleet/logbook" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Fuel & Logbook
                  </Link>
                  <Link href="/fleet/maintenance" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Maintenance
                  </Link>
                  <Link href="/fleet" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Repair Tickets
                  </Link>
                </div>
              )}
            </div>

            <Link href="/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Fleet Utilization Reports</span>
            </Link>
          </>
        )}

        {/* ================================================== */}
        {/* 5. SDM / CREW MANAGEMENT NAVIGATION */}
        {/* ================================================== */}
        {role === "sdm" && (
          <>
            <Link
              href="/dashboard/sdm"
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all ${
                pathname === "/dashboard/sdm"
                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-bold"
                  : "dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-purple-500" />
                <span>Dashboard</span>
              </div>
            </Link>

            <div className="space-y-0.5">
              <button
                onClick={() => setCrewOpen(!crewOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>Crew Management</span>
                </div>
                {crewOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {crewOpen && (
                <div className="pl-6 space-y-0.5 border-l dark:border-slate-800 border-slate-200 ml-4 py-1">
                  <Link href="/crew/drivers" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Drivers Roster
                  </Link>
                  <Link href="/crew/guides" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Local Guides
                  </Link>
                  <Link href="/crew/tour-managers" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Tour Managers
                  </Link>
                  <Link href="/crew#availability" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Availability
                  </Link>
                  <Link href="/crew" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Assignment
                  </Link>
                  <Link href="/crew#attendance" className="block px-2.5 py-1.5 rounded dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-850">
                    Attendance
                  </Link>
                </div>
              )}
            </div>

            <Link href="/crew" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>Field Reports</span>
            </Link>

            <Link href="/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Crew Utilization Reports</span>
            </Link>
          </>
        )}
      </nav>

      {/* Footer User Info */}
      <div className="p-3 border-t dark:border-slate-800 border-slate-200 dark:bg-slate-950/80 bg-slate-50 text-[10px]">
        <div className="flex items-center justify-between dark:text-slate-400 text-slate-500">
          <span>Logged in as</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">{user?.name.split(" ")[0]}</span>
        </div>
      </div>
    </aside>
  );
};
