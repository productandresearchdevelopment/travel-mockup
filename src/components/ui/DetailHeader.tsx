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
  status?: OperationalStatus;
  metrics?: DetailMetric[];
  actions?: React.ReactNode;
  className?: string;
}

export function DetailHeader({
  title,
  subtitle,
  code,
  status,
  metrics,
  actions,
  className,
}: DetailHeaderProps) {
  return (
    <div className={cn("p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-xs space-y-4", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            {code && (
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {code}
              </span>
            )}
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
            {status && <Badge status={status} />}
          </div>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>

      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {metrics.map((m, idx) => (
            <div key={idx}>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">{m.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
