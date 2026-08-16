import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "success" | "warning" | "danger" | "info" | "violet" | "amber" | "blue" | "rose" | "glass" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant = "emerald",
  size = "md",
  icon,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1 font-semibold rounded-md tracking-normal transition-colors duration-150";

  const variants = {
    emerald:
      "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border border-emerald-200/60 dark:border-emerald-800/40",
    success:
      "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border border-emerald-200/60 dark:border-emerald-800/40",
    warning:
      "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border border-amber-200/60 dark:border-amber-800/40",
    amber:
      "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border border-amber-200/60 dark:border-amber-800/40",
    danger:
      "bg-[#FEF3F2] text-[#B42318] dark:bg-[rgba(249,112,102,0.12)] dark:text-[#FDA29B] border border-rose-200/60 dark:border-rose-800/40",
    rose:
      "bg-[#FEF3F2] text-[#B42318] dark:bg-[rgba(249,112,102,0.12)] dark:text-[#FDA29B] border border-rose-200/60 dark:border-rose-800/40",
    info:
      "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border border-blue-200/60 dark:border-blue-800/40",
    blue:
      "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border border-blue-200/60 dark:border-blue-800/40",
    violet:
      "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50",
    glass:
      "bg-[#F9FAFB] dark:bg-[#131D28] text-[#172033] dark:text-[#F8FAFC] border border-[#E4E7EC] dark:border-[#202B38]",
    outline:
      "border border-[#E4E7EC] dark:border-[#202B38] text-[#667085] dark:text-[#A7B1C0]",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
