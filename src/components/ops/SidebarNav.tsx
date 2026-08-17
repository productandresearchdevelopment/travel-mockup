"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
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
  ChevronLeft,
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

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number | string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, active, badge, isCollapsed }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group">
      <Link
        href={href}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-150 ${
          active
            ? "bg-[#EEF4FF] dark:bg-[#16263F] text-[#2563EB] dark:text-[#6AA1FF] font-bold border border-blue-200/60 dark:border-blue-900/40 shadow-xs"
            : "text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] hover:text-[#172033] dark:hover:text-white"
        } ${isCollapsed ? "justify-center px-0" : ""}`}
      >
        <div className="shrink-0 flex items-center justify-center w-5 h-5">{icon}</div>
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap">
            <span className="truncate">{label}</span>
            {badge !== undefined && badge !== null && (
              <span className="font-mono text-[10px] font-bold bg-[#FFFAEB] dark:bg-[rgba(253,176,34,0.12)] text-[#B54708] dark:text-[#FEC84B] px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-900/40">
                {badge}
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Tooltip when Sidebar is Collapsed */}
      {isCollapsed && showTooltip && (
        <div className="fixed left-[80px] z-50 px-2.5 py-1.5 text-xs font-semibold text-white dark:text-[#F8FAFC] bg-[#172033] dark:bg-[#172230] border border-slate-700 dark:border-[#202B38] rounded-md shadow-xl whitespace-nowrap pointer-events-none transition-opacity duration-150 animate-in fade-in zoom-in-95">
          {label}
          {badge !== undefined && badge !== null && (
            <span className="ml-2 font-mono text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const SidebarNav: React.FC<SidebarNavProps> = ({ counts }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isCollapsed, toggleSidebar, isMobileOpen, setIsMobileOpen } = useSidebar();
  const role: UserRole = user?.role || "operation_manager";

  const [opsOpen, setOpsOpen] = useState(true);
  const [dispatchOpen, setDispatchOpen] = useState(true);
  const [fleetOpen, setFleetOpen] = useState(true);
  const [crewOpen, setCrewOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [teamOpen, setTeamOpen] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(true);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-30 h-screen bg-[#FFFFFF] dark:bg-[#0B111A] border-r border-[#E4E7EC] dark:border-[#202B38] flex flex-col select-none text-xs font-sans transition-all duration-200 ease-in-out shadow-xs ${
          isCollapsed ? "w-[72px]" : "w-[260px]"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & Workspace Title */}
        <div className="h-[64px] px-3.5 border-b border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between shrink-0 bg-[#FFFFFF] dark:bg-[#0B111A]">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image
              src="/images/logo-qifess.png"
              alt="QIFESS Travel"
              width={140}
              height={36}
              priority
              className="h-8 w-auto object-contain shrink-0"
            />
          </div>

          {/* Sidebar Collapse Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg border border-[#E4E7EC] dark:border-[#202B38] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2.5 space-y-1.5 scrollbar-none">
          {/* ================================================== */}
          {/* 1. OPERATION MANAGER NAVIGATION */}
          {/* ================================================== */}
          {role === "operation_manager" && (
            <>
              <NavItem
                href="/dashboard/operation-manager"
                icon={<LayoutDashboard className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />}
                label="Overview"
                active={pathname === "/dashboard/operation-manager" || pathname === "/dashboard" || pathname === "/"}
                isCollapsed={isCollapsed}
              />

              {/* Operations Dropdown / Sublinks */}
              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setOpsOpen(!opsOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Operations</span>
                      </div>
                      {opsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {opsOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/operations" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Today's Operation
                        </Link>
                        <Link href="/operations" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Tour Monitoring
                        </Link>
                        <Link href="/operations?status=Departed" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Departure
                        </Link>
                        <Link href="/operations?status=Arrived" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Arrival
                        </Link>
                        <Link href="/operations?status=Handover" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Handover
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/operations"
                    icon={<Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    label="Operations"
                    active={pathname.startsWith("/operations")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <NavItem
                href="/bookings"
                icon={<ShoppingBag className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />}
                label="Booking Overview"
                active={pathname.startsWith("/bookings")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/dispatch"
                icon={<Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                label="Deployment Overview"
                active={pathname.startsWith("/dispatch")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/fleet"
                icon={<Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                label="Fleet Overview"
                active={pathname.startsWith("/fleet")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/crew"
                icon={<Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Crew Overview"
                active={pathname.startsWith("/crew")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/finance"
                icon={<DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                label="Operational Finance"
                active={pathname.startsWith("/finance")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/reports"
                icon={<BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Reports"
                active={pathname.startsWith("/reports")}
                isCollapsed={isCollapsed}
              />
            </>
          )}

          {/* ================================================== */}
          {/* 2. BUSINESS MANAGER NAVIGATION */}
          {/* ================================================== */}
          {role === "business_manager" && (
            <>
              <NavItem
                href="/dashboard/business-manager"
                icon={<LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                label="Dashboard"
                active={pathname === "/dashboard/business-manager"}
                isCollapsed={isCollapsed}
              />

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setOpsOpen(!opsOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Operations Control</span>
                      </div>
                      {opsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {opsOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/operations?status=Departed" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Departure Control
                        </Link>
                        <Link href="/operations?status=Arrived" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Arrival Control
                        </Link>
                        <Link href="/operations" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Tour Monitoring
                        </Link>
                        <Link href="/operations?status=Handover" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Handover
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/operations"
                    icon={<Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    label="Operations Control"
                    active={pathname.startsWith("/operations")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setTeamOpen(!teamOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Regional Team</span>
                      </div>
                      {teamOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {teamOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/dispatch" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Dispatcher
                        </Link>
                        <Link href="/fleet" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Fleet
                        </Link>
                        <Link href="/crew" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          SDM / Crew
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/dispatch"
                    icon={<Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    label="Regional Team"
                    active={pathname.startsWith("/dispatch") || pathname.startsWith("/fleet") || pathname.startsWith("/crew")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setFinanceOpen(!financeOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Finance Approvals</span>
                      </div>
                      {financeOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {financeOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/finance/bop" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          BOP Approvals
                        </Link>
                        <Link href="/finance/reimbursement" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Reimbursements
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/finance"
                    icon={<DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    label="Finance Approvals"
                    active={pathname.startsWith("/finance")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <NavItem
                href="/reports"
                icon={<BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Regional Reports"
                active={pathname.startsWith("/reports")}
                isCollapsed={isCollapsed}
              />
            </>
          )}

          {/* ================================================== */}
          {/* 3. DISPATCHER NAVIGATION */}
          {/* ================================================== */}
          {role === "dispatcher" && (
            <>
              <NavItem
                href="/dashboard/dispatcher"
                icon={<LayoutDashboard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                label="Dashboard"
                active={pathname === "/dashboard/dispatcher"}
                isCollapsed={isCollapsed}
              />

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setBookingOpen(!bookingOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Booking Ingestion</span>
                      </div>
                      {bookingOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {bookingOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/bookings" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] flex items-center justify-between">
                          <span>Booking Inbox</span>
                          {counts.pendingBookings > 0 && (
                            <span className="font-mono text-[9px] font-bold bg-[#FFFAEB] dark:bg-[rgba(253,176,34,0.12)] text-[#B54708] dark:text-[#FEC84B] px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-900/40">
                              {counts.pendingBookings}
                            </span>
                          )}
                        </Link>
                        <Link href="/bookings" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Booking Grouping
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/bookings"
                    icon={<ShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    label="Booking Ingestion"
                    badge={counts.pendingBookings}
                    active={pathname.startsWith("/bookings")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setDispatchOpen(!dispatchOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span>Dispatch Workspace</span>
                      </div>
                      {dispatchOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {dispatchOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/dispatch" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Dispatch Board
                        </Link>
                        <Link href="/dispatch/deployment" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Deployment
                        </Link>
                        <Link href="/dispatch" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Passenger Manifest
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/dispatch"
                    icon={<Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                    label="Dispatch Workspace"
                    active={pathname.startsWith("/dispatch")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setOpsOpen(!opsOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Operations Tracking</span>
                      </div>
                      {opsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {opsOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/operations" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Today's Deployment
                        </Link>
                        <Link href="/operations" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Tour Status
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/operations"
                    icon={<Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    label="Operations Tracking"
                    active={pathname.startsWith("/operations")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>
            </>
          )}

          {/* ================================================== */}
          {/* 4. FLEET MANAGEMENT NAVIGATION */}
          {/* ================================================== */}
          {role === "fleet" && (
            <>
              <NavItem
                href="/dashboard/fleet"
                icon={<LayoutDashboard className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                label="Dashboard"
                active={pathname === "/dashboard/fleet"}
                isCollapsed={isCollapsed}
              />

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setFleetOpen(!fleetOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Fleet Controls</span>
                      </div>
                      {fleetOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {fleetOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/fleet" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Fleet Overview
                        </Link>
                        <Link href="/fleet/vehicles" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Vehicles List
                        </Link>
                        <Link href="/fleet" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Vehicle Assignment
                        </Link>
                        <Link href="/fleet" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Checklist
                        </Link>
                        <Link href="/fleet/logbook" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Fuel & Logbook
                        </Link>
                        <Link href="/fleet/maintenance" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Maintenance
                        </Link>
                        <Link href="/fleet" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Repair Tickets
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/fleet"
                    icon={<Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                    label="Fleet Controls"
                    active={pathname.startsWith("/fleet")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <NavItem
                href="/reports"
                icon={<BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Fleet Reports"
                active={pathname.startsWith("/reports")}
                isCollapsed={isCollapsed}
              />
            </>
          )}

          {/* ================================================== */}
          {/* 5. SDM / CREW MANAGEMENT NAVIGATION */}
          {/* ================================================== */}
          {role === "sdm" && (
            <>
              <NavItem
                href="/dashboard/sdm"
                icon={<LayoutDashboard className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Dashboard"
                active={pathname === "/dashboard/sdm"}
                isCollapsed={isCollapsed}
              />

              <div className="space-y-0.5">
                {!isCollapsed ? (
                  <>
                    <button
                      onClick={() => setCrewOpen(!crewOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Crew Management</span>
                      </div>
                      {crewOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#667085]" />}
                    </button>
                    {crewOpen && (
                      <div className="pl-6 space-y-0.5 border-l border-[#E4E7EC] dark:border-[#202B38] ml-4 py-1">
                        <Link href="/crew/drivers" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Drivers Roster
                        </Link>
                        <Link href="/crew/guides" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Local Guides
                        </Link>
                        <Link href="/crew/tour-managers" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Tour Managers
                        </Link>
                        <Link href="/crew#availability" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Availability
                        </Link>
                        <Link href="/crew" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Assignment
                        </Link>
                        <Link href="/crew#attendance" className="block px-2.5 py-1.5 rounded text-[#667085] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]">
                          Attendance
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <NavItem
                    href="/crew"
                    icon={<Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                    label="Crew Management"
                    active={pathname.startsWith("/crew")}
                    isCollapsed={isCollapsed}
                  />
                )}
              </div>

              <NavItem
                href="/crew"
                icon={<Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                label="Field Reports"
                active={false}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/reports"
                icon={<BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Crew Reports"
                active={pathname.startsWith("/reports")}
                isCollapsed={isCollapsed}
              />
            </>
          )}

          {/* ================================================== */}
          {/* 6. FINANCE & ADMIN NAVIGATION */}
          {/* ================================================== */}
          {role === "admin" && (
            <>
              <NavItem
                href="/dashboard/finance"
                icon={<LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                label="Finance Dashboard"
                active={pathname === "/dashboard/finance"}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/finance/bop"
                icon={<DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                label="BOP Approvals"
                active={pathname.startsWith("/finance/bop")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/finance/reimbursement"
                icon={<DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                label="Reimbursements"
                active={pathname.startsWith("/finance/reimbursement")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/finance/expenses"
                icon={<DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Expense Tracking"
                active={pathname.startsWith("/finance/expenses")}
                isCollapsed={isCollapsed}
              />

              <NavItem
                href="/reports"
                icon={<BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                label="Financial Reports"
                active={pathname.startsWith("/reports")}
                isCollapsed={isCollapsed}
              />
            </>
          )}
        </nav>

        {/* Bottom User / Region Footer */}
        <div className="p-3 border-t border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#0B111A] text-[11px] shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-[#667085] dark:text-[#A7B1C0]">
              <div className="flex items-center gap-2 truncate">
                <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 text-[#2563EB] dark:text-[#4F8CFF] font-bold font-mono text-[10px] flex items-center justify-center border border-[#2563EB]/20 shrink-0">
                  {user?.avatar || "OM"}
                </div>
                <span className="truncate font-semibold text-[#172033] dark:text-[#F8FAFC]">{user?.name}</span>
              </div>
              <span className="font-mono text-[9px] font-semibold bg-[#EEF0F3] dark:bg-[#172230] px-1.5 py-0.5 rounded text-[#667085] dark:text-[#A7B1C0] border border-[#E4E7EC] dark:border-[#202B38] shrink-0">
                {user?.region || "East Java"}
              </span>
            </div>
          ) : (
            <div className="flex justify-center" title={`${user?.name} (${user?.region})`}>
              <div className="w-7 h-7 rounded-md bg-[#2563EB]/10 text-[#2563EB] dark:text-[#4F8CFF] font-bold font-mono text-xs flex items-center justify-center border border-[#2563EB]/20">
                {user?.avatar || "OM"}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
