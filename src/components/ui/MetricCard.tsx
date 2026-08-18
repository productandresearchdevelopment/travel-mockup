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
  variant = "blue",
  badge,
  trend,
  footer,
  className,
  onClick,
}: MetricCardProps) {
  const iconVariantStyles: Record<MetricVariant, { bg: string; text: string; border: string }> = {
    violet: {
      bg: "bg-blue-50/80 dark:bg-blue-950/50",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/40",
    },
    emerald: {
      bg: "bg-emerald-50/80 dark:bg-emerald-950/50",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/40",
    },
    blue: {
      bg: "bg-blue-50/80 dark:bg-blue-950/50",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/40",
    },
    amber: {
      bg: "bg-amber-50/80 dark:bg-amber-950/50",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/40",
    },
    rose: {
      bg: "bg-rose-50/80 dark:bg-rose-950/50",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-900/40",
    },
    cyan: {
      bg: "bg-cyan-50/80 dark:bg-cyan-950/50",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-100 dark:border-cyan-900/40",
    },
    pink: {
      bg: "bg-pink-50/80 dark:bg-pink-950/50",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-pink-100 dark:border-pink-900/40",
    },
    slate: {
      bg: "bg-slate-100/80 dark:bg-slate-800",
      text: "text-slate-600 dark:text-slate-400",
      border: "border-slate-200/80 dark:border-slate-700",
    },
  };

  const style = iconVariantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/90 p-4.5 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200 ease-out",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Top Title & Icon Row */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <span className="text-xs font-semibold font-sans text-slate-500 dark:text-slate-400 tracking-tight truncate">
          {title}
        </span>

        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 transition-all duration-200",
              style.bg,
              style.text,
              style.border
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main Metric Value & Subtitle / Badge Row */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
            {value}
          </span>
          {subtitle && (
            <span className="text-xs font-medium font-sans text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </div>

        {/* Badge or Trend Right Indicator */}
        {badge && (
          <div className="shrink-0">
            {typeof badge === "string" ? (
              <Badge
                variant={
                  variant === "emerald"
                    ? "emerald"
                    : variant === "rose"
                    ? "danger"
                    : "blue"
                }
              >
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
              "flex items-center gap-1 text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full shrink-0",
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
      {footer && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
}
