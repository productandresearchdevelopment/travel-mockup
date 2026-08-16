"use client";

import React, { useState } from "react";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { HeaderNav } from "@/components/ops/HeaderNav";
import { SidebarNav } from "@/components/ops/SidebarNav";
import { NotificationDrawer } from "@/components/ops/modals/NotificationDrawer";
import {
  initialBookings,
  initialTours,
  initialMaintenance,
  initialExpenses,
  initialNotifications,
} from "@/data/mockData";

interface AppLayoutContentProps {
  children: React.ReactNode;
}

const AppLayoutContent: React.FC<AppLayoutContentProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const counts = {
    pendingBookings: initialBookings.filter((b) => b.status === "Pending Review").length,
    activeTours: initialTours.filter((t) => ["Departed", "On Trip", "Handover"].includes(t.status)).length,
    maintenanceDue: initialMaintenance.filter((m) => m.status === "Due").length,
    pendingBop: initialExpenses.filter((e) => e.status === "Submitted").length,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F8FAFC] font-sans selection:bg-[#2563EB] selection:text-white transition-colors duration-200">
      {/* FIXED NAVBAR */}
      <HeaderNav
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* FIXED SIDEBAR */}
      <SidebarNav counts={counts} />

      {/* SCROLLABLE MAIN CONTENT WITH GENEROUS TOP CLEARANCE */}
      <main
        className={`pt-[78px] pb-12 min-h-screen transition-all duration-200 ease-in-out px-4 sm:px-6 lg:px-8 space-y-6 ${
          isCollapsed ? "ml-0 md:ml-[72px]" : "ml-0 md:ml-[260px]"
        }`}
      >
        {children}
      </main>

      {/* NOTIFICATION DRAWER */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        notifications={notifications}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      />
    </div>
  );
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
};
