import React from "react";
import { cn } from "@/lib/utils";

export type OperationalStatus = "Available" | "Assigned" | "On Trip" | "Maintenance" | "Inactive" | string;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "emerald"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "violet"
    | "amber"
    | "blue"
    | "slate"
    | "orange"
    | "cyan"
    | "pink"
    | "outline"
    | "glass";
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
      case "approved":
      case "paid":
        effectiveVariant = "emerald";
        break;
      case "assigned":
      case "scheduled":
      case "driver":
      case "workforce":
        effectiveVariant = "violet";
        break;
      case "on trip":
      case "in progress":
      case "deployed":
      case "vehicle":
        effectiveVariant = "blue";
        break;
      case "maintenance":
      case "tour manager":
      case "tm":
        effectiveVariant = "orange";
        break;
      case "pending":
      case "warning":
      case "standby":
        effectiveVariant = "amber";
        break;
      case "hotel":
        effectiveVariant = "cyan";
        break;
      case "destination":
        effectiveVariant = "pink";
        break;
      case "inactive":
      case "disabled":
      case "offline":
      case "danger":
      case "absent":
      case "cancelled":
        effectiveVariant = "danger";
        break;
      default:
        effectiveVariant = "slate";
    }
  }

  const baseStyles =
    "inline-flex items-center gap-1.5 font-semibold rounded-full tracking-wide transition-colors duration-150";

  const variants = {
    emerald:
      "bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60",
    success:
      "bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60",
    warning:
      "bg-[#FFFBEB] text-[#F59E0B] dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60",
    amber:
      "bg-[#FFFBEB] text-[#F59E0B] dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60",
    danger:
      "bg-[#FEF2F2] text-[#EF4444] dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60",
    info:
      "bg-[#EFF6FF] text-[#3B82F6] dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60",
    blue:
      "bg-[#EFF6FF] text-[#3B82F6] dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60",
    violet:
      "bg-[#F3F0FF] text-[#624AE8] dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60",
    orange:
      "bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/40 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60",
    cyan:
      "bg-[#ECFEFF] text-[#06B6D4] dark:bg-cyan-950/40 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60",
    pink:
      "bg-[#FDF2F8] text-[#EC4899] dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200/80 dark:border-pink-800/60",
    slate:
      "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    outline:
      "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-transparent",
    glass:
      "bg-slate-900/60 text-slate-200 border border-slate-700/60 backdrop-blur-md",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 font-mono font-bold",
    md: "text-xs px-2.5 py-1 font-mono font-bold",
  };

  const statusDotColors = {
    emerald: "bg-[#10B981]",
    success: "bg-[#10B981]",
    warning: "bg-[#F59E0B]",
    amber: "bg-[#F59E0B]",
    danger: "bg-[#EF4444]",
    info: "bg-[#3B82F6]",
    blue: "bg-[#3B82F6]",
    violet: "bg-[#624AE8]",
    orange: "bg-[#F97316]",
    cyan: "bg-[#06B6D4]",
    pink: "bg-[#EC4899]",
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
