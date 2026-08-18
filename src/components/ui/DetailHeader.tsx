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
        "relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-950 dark:via-[#132247] dark:to-indigo-950 border border-blue-500/40 dark:border-blue-800/80 text-white p-5 sm:p-6 shadow-md space-y-4 transition-all duration-200 group",
        className
      )}
    >
      {/* EXPENSIVE SAAS PATTERN & AMBIENT RADIAL LIGHT GLOWS */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-sky-400/25 blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-sky-400/35"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            {code && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-2xs">
                {code}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-xs">
              {title}
            </h1>
            {status && (
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{status}</span>
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm font-sans font-medium text-blue-100/90 drop-shadow-2xs">
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Metrics Row */}
      {metrics && metrics.length > 0 && (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3.5 border-t border-white/15 dark:border-white/10 font-sans">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-0.5">
              <p className="text-[10px] font-bold text-blue-200/90 uppercase tracking-wider">
                {m.label}
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-white drop-shadow-xs">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
