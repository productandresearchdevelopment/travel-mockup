import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  badge?: string | number;
}

export interface TabsProps {
  items?: TabItem[];
  tabs?: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ items, tabs, activeTab, onChange, className }: TabsProps) {
  const tabList = items || tabs || [];

  return (
    <div className={cn("flex items-center space-x-1 border-b border-slate-200 dark:border-slate-800 text-xs font-medium overflow-x-auto scrollbar-none", className)}>
      {tabList.map((tab) => {
        const isActive = tab.id === activeTab;
        const displayBadge = tab.count !== undefined ? tab.count : tab.badge;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 py-2.5 px-3 border-b-2 font-medium whitespace-nowrap transition-colors cursor-pointer",
              isActive
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <span>{tab.label}</span>
            {displayBadge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                )}
              >
                {displayBadge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
