"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Truck,
  UserCheck,
  Compass,
  Briefcase,
  Hotel,
  MapPin,
  Settings,
} from "lucide-react";

export interface SidebarNavProps {
  counts?: any;
}

export function SidebarNav({ counts }: SidebarNavProps) {
  const pathname = usePathname();

  const isMainActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] flex flex-col h-screen shrink-0 sticky top-0">
      {/* Brand Header with QIFESS Logo */}
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
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
        {/* Overview */}
        <div>
          <Link
            href="/"
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
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/dispatch")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Dispatcher</span>
          </Link>
        </div>

        {/* Resources */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Resources
          </span>
          <Link
            href="/vehicles"
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
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMainActive("/destinations")
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#162034] hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Destinations</span>
          </Link>
        </div>

        {/* System Settings */}
        <div>
          <Link
            href="/settings"
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

    </aside>
  );
}
