"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedState = localStorage.getItem("qifess-sidebar-state");
    if (savedState === "collapsed") {
      setIsCollapsedState(true);
    } else if (savedState === "expanded") {
      setIsCollapsedState(false);
    } else {
      // Default behavior based on screen size: tablet defaults to collapsed
      if (typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsCollapsedState(true);
      }
    }
  }, []);

  const setCollapsed = (collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    localStorage.setItem("qifess-sidebar-state", collapsed ? "collapsed" : "expanded");
  };

  const toggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        setCollapsed,
        isMobileOpen,
        setIsMobileOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
