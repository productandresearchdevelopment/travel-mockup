import React from "react";
import { Badge, OperationalStatus } from "./Badge";
import { cn } from "@/lib/utils";

export interface DetailMetric {
  label: string;
  value: string | number;
}

export interface DetailHeaderProps {
  title: string;
  subtitle?: string;
  code?: string;
  status?: OperationalStatus | string;
  metrics?: DetailMetric[];
  actions?: React.ReactNode;
  className?: string;
}

export function DetailHeader({
  title,
  subtitle,
  code,
  status = "In Progress",
  metrics,
  actions,
  className,
}: DetailHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-blue-200/90 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20 p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-200",
        className
      )}
    >
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            {code && (
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                {code}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            {status && (
              <Badge variant={status === "In Progress" ? "blue" : status === "Completed" ? "emerald" : "amber"}>
                {status}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm font-sans font-medium text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Metrics Row */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3.5 border-t border-blue-100 dark:border-slate-800/80 font-sans">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {m.label}
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
