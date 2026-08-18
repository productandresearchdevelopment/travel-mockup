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
  | "indigo"
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
  const variantStyles: Record<MetricVariant, { cardBg: string; border: string; titleText: string; iconBg: string; iconText: string; iconBorder: string }> = {
    indigo: {
      cardBg: "bg-gradient-to-b from-indigo-50/70 via-indigo-50/20 to-white dark:from-indigo-950/40 dark:via-indigo-950/10 dark:to-[#101726]",
      border: "border-indigo-200/80 dark:border-indigo-900/60",
      titleText: "text-indigo-700 dark:text-indigo-300",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/60",
      iconText: "text-indigo-600 dark:text-indigo-300",
      iconBorder: "border-indigo-200 dark:border-indigo-800/40",
    },
    violet: {
      cardBg: "bg-gradient-to-b from-purple-50/70 via-purple-50/20 to-white dark:from-purple-950/40 dark:via-purple-950/10 dark:to-[#101726]",
      border: "border-purple-200/80 dark:border-purple-900/60",
      titleText: "text-purple-700 dark:text-purple-300",
      iconBg: "bg-purple-100 dark:bg-purple-900/60",
      iconText: "text-purple-600 dark:text-purple-300",
      iconBorder: "border-purple-200 dark:border-purple-800/40",
    },
    blue: {
      cardBg: "bg-gradient-to-b from-blue-50/80 via-blue-50/20 to-white dark:from-blue-950/50 dark:via-blue-950/10 dark:to-[#101726]",
      border: "border-blue-200/90 dark:border-blue-900/60",
      titleText: "text-blue-700 dark:text-blue-300",
      iconBg: "bg-blue-100 dark:bg-blue-900/60",
      iconText: "text-blue-600 dark:text-blue-300",
      iconBorder: "border-blue-200 dark:border-blue-800/40",
    },
    emerald: {
      cardBg: "bg-gradient-to-b from-emerald-50/80 via-emerald-50/20 to-white dark:from-emerald-950/50 dark:via-emerald-950/10 dark:to-[#101726]",
      border: "border-emerald-200/90 dark:border-emerald-900/60",
      titleText: "text-emerald-700 dark:text-emerald-300",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/60",
      iconText: "text-emerald-600 dark:text-emerald-300",
      iconBorder: "border-emerald-200 dark:border-emerald-800/40",
    },
    amber: {
      cardBg: "bg-gradient-to-b from-amber-50/80 via-amber-50/20 to-white dark:from-amber-950/50 dark:via-amber-950/10 dark:to-[#101726]",
      border: "border-amber-200/90 dark:border-amber-900/60",
      titleText: "text-amber-700 dark:text-amber-300",
      iconBg: "bg-amber-100 dark:bg-amber-900/60",
      iconText: "text-amber-600 dark:text-amber-300",
      iconBorder: "border-amber-200 dark:border-amber-800/40",
    },
    rose: {
      cardBg: "bg-gradient-to-b from-rose-50/80 via-rose-50/20 to-white dark:from-rose-950/50 dark:via-rose-950/10 dark:to-[#101726]",
      border: "border-rose-200/90 dark:border-rose-900/60",
      titleText: "text-rose-700 dark:text-rose-300",
      iconBg: "bg-rose-100 dark:bg-rose-900/60",
      iconText: "text-rose-600 dark:text-rose-300",
      iconBorder: "border-rose-200 dark:border-rose-800/40",
    },
    cyan: {
      cardBg: "bg-gradient-to-b from-cyan-50/80 via-cyan-50/20 to-white dark:from-cyan-950/50 dark:via-cyan-950/10 dark:to-[#101726]",
      border: "border-cyan-200/90 dark:border-cyan-900/60",
      titleText: "text-cyan-700 dark:text-cyan-300",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/60",
      iconText: "text-cyan-600 dark:text-cyan-300",
      iconBorder: "border-cyan-200 dark:border-cyan-800/40",
    },
    pink: {
      cardBg: "bg-gradient-to-b from-pink-50/80 via-pink-50/20 to-white dark:from-pink-950/50 dark:via-pink-950/10 dark:to-[#101726]",
      border: "border-pink-200/90 dark:border-pink-900/60",
      titleText: "text-pink-700 dark:text-pink-300",
      iconBg: "bg-pink-100 dark:bg-pink-900/60",
      iconText: "text-pink-600 dark:text-pink-300",
      iconBorder: "border-pink-200 dark:border-pink-800/40",
    },
    slate: {
      cardBg: "bg-gradient-to-b from-slate-50/80 via-slate-50/20 to-white dark:from-slate-900/50 dark:via-slate-900/10 dark:to-[#101726]",
      border: "border-slate-200/90 dark:border-slate-800",
      titleText: "text-slate-700 dark:text-slate-300",
      iconBg: "bg-slate-100 dark:bg-slate-800",
      iconText: "text-slate-600 dark:text-slate-300",
      iconBorder: "border-slate-200 dark:border-slate-700",
    },
  };

  const style = variantStyles[variant] || variantStyles.blue;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ease-out border",
        style.cardBg,
        style.border,
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Top Title & Icon Row (Matching Overview Styling) */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className={cn("text-[10px] font-mono font-extrabold uppercase tracking-wider truncate", style.titleText)}>
          {title}
        </span>

        {icon && (
          <div
            className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200",
              style.iconBg,
              style.iconText,
              style.iconBorder
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main Metric Value & Subtitle / Badge Row */}
      <div className="flex items-baseline justify-between gap-2 pt-0.5">
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
