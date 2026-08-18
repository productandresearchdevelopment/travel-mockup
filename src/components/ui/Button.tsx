"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow" | "danger" | "pill";
  size?: "sm" | "md" | "lg" | "icon";
  rounded?: "default" | "pill" | "full";
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
      rounded = "default",
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
      "inline-flex items-center justify-center font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.99] whitespace-nowrap shrink-0";

    const borderRadius =
      rounded === "pill" || rounded === "full" || variant === "pill"
        ? "rounded-full"
        : "rounded-lg";

    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-xs border border-transparent font-semibold",
      secondary:
        "bg-slate-50 dark:bg-[#131D28] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800",
      outline:
        "border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-[#162034]",
      pill:
        "border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#101726] hover:bg-slate-50 dark:hover:bg-[#162034] shadow-xs",
      ghost:
        "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#162034]",
      glow:
        "bg-blue-600 text-white font-semibold shadow-sm hover:brightness-105 border border-transparent",
      danger:
        "bg-rose-600 dark:bg-rose-600 text-white hover:bg-rose-700 font-semibold shadow-xs",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-xs px-4 py-2 gap-2 h-9 font-semibold",
      lg: "text-sm px-5 py-2.5 gap-2 h-10 font-semibold",
      icon: "h-8 w-8 p-0 rounded-lg",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, borderRadius, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
