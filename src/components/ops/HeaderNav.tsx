"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import { OperationalNotification } from "@/types/travelOps";
import { CommandSearchModal } from "@/components/ops/modals/CommandSearchModal";
import {
  Compass,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Settings,
  ChevronDown,
  Clock,
  Command,
  Menu,
} from "lucide-react";

interface HeaderNavProps {
  notifications: OperationalNotification[];
  onOpenNotifications: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  notifications,
  onOpenNotifications,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleMobileMenu } = useSidebar();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-[64px] bg-white/90 dark:bg-[#0F1726]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B] px-4 md:px-6 flex items-center justify-between select-none z-20 font-sans transition-all duration-200 ease-in-out shadow-2xs ${
          isCollapsed ? "left-0 md:left-[72px]" : "left-0 md:left-[260px]"
        }`}
      >
        {/* LEFT: MOBILE TOGGLE & BREADCRUMB PILL */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Clean Breadcrumb Badge */}
          <div className="hidden md:flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#2563EB] dark:text-[#60A5FA] bg-[#EFF6FF] dark:bg-[#172A4A] px-2.5 py-1 rounded-lg border border-blue-200/60 dark:border-blue-900/40">
              QIFESS Workspace
            </span>
            <span className="text-xs text-[#94A3B8] dark:text-[#64748B]">/</span>
            <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              Enterprise Control Hub
            </span>
          </div>

          {/* Mobile Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] dark:bg-[#3B82F6] text-white flex items-center justify-center font-bold shadow-xs">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-sm text-[#0F172A] dark:text-white">QIFESS Ops</span>
          </Link>
        </div>

        {/* CENTER: COMMAND SEARCH BAR (⌘K) */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between bg-[#F8FAFC] dark:bg-[#101726] border border-[#CBD5E1] dark:border-[#334155] rounded-xl px-3.5 py-1.5 text-xs text-[#475569] dark:text-[#94A3B8] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#94A3B8] dark:text-[#64748B]" />
              <span className="font-medium text-[#475569] dark:text-[#94A3B8]">Search tours, bookings, vehicles, crew...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] bg-white dark:bg-[#1A263C] border border-[#E2E8F0] dark:border-[#1E293B] px-1.5 py-0.5 rounded text-[#94A3B8] dark:text-[#64748B]">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* RIGHT: USER CONTROLS & PROFILE */}
        <div className="flex items-center gap-2.5 text-xs">
          {/* Time Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F8FAFC] dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] text-[#0F172A] dark:text-[#94A3B8] font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>15:45 WIB</span>
          </div>

          {/* Light/Dark Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-[#F1F5F9] dark:hover:bg-[#162034] text-[#0F172A] dark:text-[#94A3B8] transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden xl:inline text-[11px]">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#2563EB]" />
                <span className="hidden xl:inline text-[11px]">Dark Mode</span>
              </>
            )}
          </button>

          {/* Notifications Drawer Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-[#F1F5F9] dark:hover:bg-[#162034] text-[#0F172A] dark:text-[#94A3B8] transition-colors cursor-pointer"
            title="Operational Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* USER PROFILE DROPDOWN */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-[#F8FAFC] dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] font-bold font-mono text-xs flex items-center justify-center border border-[#2563EB]/20">
                  {user.avatar}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold text-xs text-[#0F172A] dark:text-white leading-tight">{user.name}</div>
                  <div className="text-[10px] text-[#475569] dark:text-[#94A3B8]">{user.roleLabel} • {user.region}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#64748B]" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-2 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">{user.name}</div>
                    <div className="text-[10px] text-[#475569] dark:text-[#94A3B8]">{user.email}</div>
                    <div className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold mt-1">
                      Workspace: {user.roleLabel} ({user.region})
                    </div>
                  </div>

                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-[#0F172A] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#162034] text-xs text-left cursor-pointer font-medium"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-[#0F172A] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#162034] text-xs text-left cursor-pointer font-medium"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>Preferences</span>
                  </button>

                  <div className="pt-1 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs text-left font-bold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* COMMAND SEARCH MODAL */}
      <CommandSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};
