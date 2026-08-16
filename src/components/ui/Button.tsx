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
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.99]";

    const variants = {
      primary:
        "bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white font-semibold shadow-xs border border-transparent",
      secondary:
        "bg-[#F9FAFB] dark:bg-[#131D28] text-[#172033] dark:text-[#F8FAFC] border border-[#E4E7EC] dark:border-[#202B38] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]",
      outline:
        "border border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-[#F8FAFC] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]",
      ghost:
        "text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]",
      glow:
        "bg-[#2563EB] dark:bg-[#4F8CFF] text-white font-semibold shadow-sm hover:brightness-105 border border-transparent",
      danger:
        "bg-[#DC2626] dark:bg-[#F97066] text-white hover:bg-[#B91C1C] dark:hover:bg-[#E55347] font-semibold shadow-xs",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-xs px-4 py-2 gap-2 font-semibold",
      lg: "text-sm px-5 py-2.5 gap-2 font-semibold",
      icon: "h-8 w-8 p-0 rounded-lg",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
