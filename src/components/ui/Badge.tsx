import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "violet" | "amber" | "glass" | "outline";
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
    "inline-flex items-center gap-1.5 font-medium rounded-full tracking-wide uppercase transition-all duration-300";

  const variants = {
    emerald:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    violet:
      "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    amber:
      "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    glass:
      "bg-slate-800/80 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow-sm",
    outline:
      "border border-slate-700 text-slate-300",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-0.5",
    md: "text-xs px-3.5 py-1",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
