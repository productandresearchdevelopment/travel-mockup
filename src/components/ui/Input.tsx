import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, leftIcon, rightIcon, helperText, id, ...props },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#172033] dark:text-[#A7B1C0]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-[#98A2B3] dark:text-[#667085]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-[#F8FAFC] placeholder:text-[#98A2B3] dark:placeholder:text-[#667085] rounded-xl py-2 text-xs font-medium transition-colors duration-150 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon ? "pr-10" : "pr-3.5",
              error && "border-[#DC2626] dark:border-[#F97066] focus:border-[#DC2626]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 pointer-events-none text-[#98A2B3] dark:text-[#667085]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-[#DC2626] dark:text-[#F97066] font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-[#667085] dark:text-[#A7B1C0]">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
