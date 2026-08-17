"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Navigation,
  PlaySquare,
  Truck,
  UserCheck,
  Compass,
  Briefcase,
  Hotel,
  MapPin,
  Building,
  Settings,
  X,
} from "lucide-react";

export const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Dispatcher", href: "/dispatch", icon: CalendarCheck },
  { label: "Live Tracking", href: "/dispatch/tracking", icon: Navigation },
  { label: "Trip Operations", href: "/dispatch/trips", icon: PlaySquare },
  { label: "Vehicles", href: "/vehicles", icon: Truck },
  { label: "Drivers", href: "/drivers", icon: UserCheck },
  { label: "Guides", href: "/guides", icon: Compass },
  { label: "Tour Managers", href: "/tour-managers", icon: Briefcase },
  { label: "Hotels", href: "/hotels", icon: Hotel },
  { label: "Destinations", href: "/destinations", icon: MapPin },
  { label: "Settings", href: "/settings", icon: Settings },
];

export interface AppSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppSidebar({ mobileOpen = false, setMobileOpen }: AppSidebarProps) {
  const pathname = usePathname();

  const isMainActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] flex flex-col h-screen shrink-0 transition-transform duration-200 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Sidebar Header with QIFESS Logo */}
      <div className="h-16 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-qifess.png"
            alt="QIFESS Travel"
            width={130}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
        {/* Overview */}
        <div>
          <Link
            href="/"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </Link>
        </div>

        {/* Operations */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Operations
          </span>
          <Link
            href="/dispatch"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/dispatch") && pathname !== "/dispatch/tracking" && !pathname.startsWith("/dispatch/trips")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Dispatcher</span>
          </Link>

          <Link
            href="/dispatch/tracking"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/dispatch/tracking")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Live Tracking</span>
          </Link>

          <Link
            href="/dispatch/trips"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/dispatch/trips")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <PlaySquare className="w-4 h-4" />
            <span>Trip Operations</span>
          </Link>
        </div>

        {/* Resources */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Resources
          </span>
          <Link
            href="/vehicles"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/vehicles")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Vehicles</span>
          </Link>

          <Link
            href="/drivers"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/drivers")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Drivers</span>
          </Link>

          <Link
            href="/guides"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/guides")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Guides</span>
          </Link>

          <Link
            href="/tour-managers"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/tour-managers")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Tour Managers</span>
          </Link>

          <Link
            href="/hotels"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/hotels")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Hotel className="w-4 h-4" />
            <span>Hotels</span>
          </Link>

          <Link
            href="/destinations"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/destinations")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Destinations</span>
          </Link>

          <Link
            href="/vendors"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/vendors")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Vendors</span>
          </Link>
        </div>

        {/* System Settings */}
        <div>
          <Link
            href="/settings"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/settings")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#162034] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              OP
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">Ops Dispatcher</p>
              <p className="text-[10px] text-slate-400">Head Dispatcher</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
