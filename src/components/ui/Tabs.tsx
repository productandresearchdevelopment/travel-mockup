"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-full backdrop-blur-xl max-w-full overflow-x-auto scrollbar-none",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap focus:outline-none",
              isActive
                ? "text-slate-950"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-md shadow-emerald-500/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold",
                    isActive
                      ? "bg-slate-950/20 text-slate-950"
                      : "bg-emerald-500/20 text-emerald-400"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
