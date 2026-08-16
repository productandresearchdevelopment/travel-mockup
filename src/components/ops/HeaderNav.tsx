"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
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
  searchQuery,
  onSearchChange,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <header className="h-16 dark:bg-slate-900 bg-white border-b dark:border-slate-800 border-slate-200 px-5 flex items-center justify-between select-none z-30 font-sans transition-colors sticky top-0">
        {/* LEFT: BRAND & BREADCRUMB */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center shadow-sm font-bold">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-extrabold text-sm dark:text-white text-slate-900 tracking-tight leading-none group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                QIFESS <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-[10px] uppercase tracking-wider">Travel Ops</span>
              </div>
              <div className="text-[10px] dark:text-slate-400 text-slate-500 font-mono mt-0.5">Enterprise Control Hub</div>
            </div>
          </Link>
        </div>

        {/* CENTER: COMMAND SEARCH BAR (⌘K) */}
        <div className="flex-1 max-w-md mx-6">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-xl px-3.5 py-1.5 text-xs dark:text-slate-300 text-slate-600 hover:border-cyan-500 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <Search className="w-4 h-4" />
              <span className="font-medium text-slate-500 dark:text-slate-400">Search tours, bookings, vehicles, crew...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border px-1.5 py-0.5 rounded text-slate-400">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* RIGHT: USER CONTROLS & PROFILE (NO ROLE SWITCHER) */}
        <div className="flex items-center gap-3 text-xs">
          {/* Time Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-700 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>15:45 WIB</span>
          </div>

          {/* Light/Dark Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-[11px]">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-cyan-600" />
                <span className="hidden md:inline text-[11px]">Dark Mode</span>
              </>
            )}
          </button>

          {/* Notifications Drawer Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 transition-colors cursor-pointer"
            title="Operational Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* USER PROFILE DROPDOWN (STRICT NO ROLE SWITCHING) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-xs flex items-center justify-center border border-cyan-500/20">
                  {user.avatar}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold text-xs dark:text-slate-100 text-slate-800 leading-tight">{user.name}</div>
                  <div className="text-[10px] dark:text-slate-400 text-slate-500">{user.roleLabel} • {user.region}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl shadow-2xl p-2 space-y-1 z-50 animate-fade-in">
                  <div className="p-2 border-b dark:border-slate-800 border-slate-100">
                    <div className="font-bold text-xs dark:text-white text-slate-900">{user.name}</div>
                    <div className="text-[10px] dark:text-slate-400 text-slate-500">{user.email}</div>
                    <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
                      Workspace: {user.roleLabel} ({user.region})
                    </div>
                  </div>

                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-left cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-left cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Preferences</span>
                  </button>

                  <div className="pt-1 border-t dark:border-slate-800 border-slate-100">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 text-xs text-left font-bold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
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
