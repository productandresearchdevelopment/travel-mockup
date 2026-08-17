"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "./Badge";

export type MetricVariant =
  | "violet"
  | "emerald"
  | "blue"
  | "amber"
  | "rose"
  | "cyan"
  | "pink"
  | "slate";

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: MetricVariant;
  badge?: React.ReactNode | { text: string; variant?: string };
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  variant = "violet",
  badge,
  trend,
  footer,
  className,
  onClick,
}: MetricCardProps) {
  const iconVariantStyles: Record<MetricVariant, { bg: string; text: string; border: string }> = {
    violet: {
      bg: "bg-[#F3F0FF] dark:bg-purple-950/60",
      text: "text-[#624AE8] dark:text-purple-400",
      border: "border-purple-200/60 dark:border-purple-900/40",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200/60 dark:border-emerald-900/40",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/60",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200/60 dark:border-blue-900/40",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/60",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200/60 dark:border-amber-900/40",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-950/60",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-200/60 dark:border-rose-900/40",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-950/60",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-200/60 dark:border-cyan-900/40",
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-950/60",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-pink-200/60 dark:border-pink-900/40",
    },
    slate: {
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-700 dark:text-slate-300",
      border: "border-slate-200 dark:border-slate-700",
    },
  };

  const style = iconVariantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#101726] p-4.5 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Subtle Ambient Background Accent Glow */}
      <div
        className={cn(
          "absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none",
          style.bg
        )}
      />

      <div className="flex items-center justify-between gap-3 mb-3">
        {/* Title */}
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
          {title}
        </span>

        {/* Icon Badge Container */}
        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105",
              style.bg,
              style.text,
              style.border
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main Metric Value & Badge / Trend */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            {value}
          </span>
          {subtitle && (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </div>

        {/* Badge or Trend Right Indicator */}
        {badge && (
          <div className="shrink-0">
            {typeof badge === "string" ? (
              <Badge variant={variant === "violet" ? "violet" : variant === "emerald" ? "emerald" : variant === "blue" ? "blue" : variant === "amber" ? "amber" : variant === "rose" ? "danger" : "slate"}>
                {badge}
              </Badge>
            ) : typeof badge === "object" && "text" in (badge as Record<string, unknown>) ? (
              <Badge variant={((badge as Record<string, unknown>).variant as any) || "emerald"}>
                {(badge as Record<string, unknown>).text as string}
              </Badge>
            ) : (
              (badge as React.ReactNode)
            )}
          </div>
        )}

        {!badge && trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0",
              trend.isPositive !== false
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                : "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
            )}
          >
            {trend.isPositive !== false ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {/* Optional Custom Footer */}
      {footer && <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs">{footer}</div>}
    </div>
  );
}
