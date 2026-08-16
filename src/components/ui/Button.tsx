"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:brightness-110 border border-emerald-400/30",
      secondary:
        "bg-slate-800/90 text-slate-100 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 shadow-md",
      outline:
        "border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400",
      ghost:
        "text-slate-300 hover:text-white hover:bg-slate-800/60",
      glow:
        "relative bg-slate-950 text-emerald-400 font-semibold border border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:border-emerald-400 hover:bg-slate-900",
      danger:
        "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-4 gap-2.5",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current mr-1" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
