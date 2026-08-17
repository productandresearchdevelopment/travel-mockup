"use client";

import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopHeader } from "./TopHeader";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F8FAFC]">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-20 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* App Navigation Sidebar */}
      <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Top Header Bar */}
      <TopHeader onMobileMenuClick={() => setMobileOpen(true)} />

      {/* Main Content Area */}
      <main className="md:pl-60 pt-16 min-h-screen transition-all duration-200">
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
