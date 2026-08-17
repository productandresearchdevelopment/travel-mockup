import React from "react";
import { cn } from "@/lib/utils";

export type OperationalStatus = "Available" | "Assigned" | "On Trip" | "Maintenance" | "Inactive" | string;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "success" | "warning" | "danger" | "info" | "violet" | "amber" | "blue" | "slate" | "outline" | "glass";
  status?: OperationalStatus;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  status,
  size = "md",
  icon,
  children,
  ...props
}: BadgeProps) {
  let effectiveVariant = variant || "slate";

  if (status) {
    switch (status.toLowerCase()) {
      case "available":
      case "active":
      case "ready":
        effectiveVariant = "emerald";
        break;
      case "assigned":
      case "scheduled":
        effectiveVariant = "blue";
        break;
      case "on trip":
      case "in progress":
      case "deployed":
        effectiveVariant = "violet";
        break;
      case "maintenance":
      case "standby":
      case "warning":
        effectiveVariant = "amber";
        break;
      case "inactive":
      case "disabled":
      case "offline":
      case "danger":
        effectiveVariant = "slate";
        break;
      default:
        effectiveVariant = "slate";
    }
  }

  const baseStyles =
    "inline-flex items-center gap-1.5 font-medium rounded-md tracking-tight transition-colors duration-150";

  const variants = {
    emerald:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60",
    amber:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60",
    danger:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60",
    info:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60",
    blue:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60",
    violet:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60",
    slate:
      "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    outline:
      "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-transparent",
    glass:
      "bg-slate-900/60 text-slate-200 border border-slate-700/60 backdrop-blur-md",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const statusDotColors = {
    emerald: "bg-emerald-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    amber: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-blue-500",
    blue: "bg-blue-500",
    violet: "bg-purple-500",
    slate: "bg-slate-400",
    outline: "bg-slate-400",
    glass: "bg-slate-300",
  };

  return (
    <span className={cn(baseStyles, variants[effectiveVariant], sizes[size], className)} {...props}>
      {status && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", statusDotColors[effectiveVariant])} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children || status}</span>
    </span>
  );
}
