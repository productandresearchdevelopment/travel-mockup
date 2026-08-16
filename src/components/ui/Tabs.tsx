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
        "inline-flex items-center gap-1.5 p-1.5 bg-[#F9FAFB] dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl max-w-full overflow-x-auto scrollbar-none",
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
              "relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap focus:outline-none cursor-pointer",
              isActive
                ? "bg-[#2563EB] dark:bg-[#4F8CFF] text-white shadow-xs"
                : "text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-extrabold uppercase",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF]"
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
