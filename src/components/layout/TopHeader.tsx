"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { navItems } from "./AppSidebar";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";

export interface TopHeaderProps {
  onMobileMenuClick: () => void;
}

export function TopHeader({ onMobileMenuClick }: TopHeaderProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  // Find active nav label based on route
  const currentNav = navItems.find(
    (item) => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  const pageTitle = currentNav ? currentNav.label : pathname === "/settings" ? "Settings" : "Overview";

  return (
    <>
      <header className="h-16 fixed top-0 right-0 left-0 md:left-60 z-20 bg-white/90 dark:bg-[#0F1726]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 md:px-6 flex items-center justify-between transition-all duration-200">
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger button */}
          <button
            onClick={onMobileMenuClick}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Current page header title & breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Operational Hub
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Global Search Bar */}
          <div className="relative hidden lg:flex items-center w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-9 pr-7 py-1.5 bg-slate-50 dark:bg-[#162034] border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <kbd className="absolute right-2 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              /
            </kbd>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setShowNotificationDrawer(true)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#162034] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span className="absolute top-1 right-1 px-1 py-0.2 rounded-full text-[9px] font-mono font-bold bg-rose-600 text-white ring-2 ring-white dark:ring-[#0F1726]">
              4
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#162034] transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          {/* User Profile Avatar Menu */}
          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-blue-600/20 group-hover:ring-blue-600/40 transition-all">
              OP
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Ops Admin
              </span>
              <span className="text-[10px] text-slate-400 leading-tight font-medium">
                Resource Operations
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in Notification Drawer */}
      <NotificationDrawer
        isOpen={showNotificationDrawer}
        onClose={() => setShowNotificationDrawer(false)}
      />
    </>
  );
}
