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
            className="text-xs font-semibold uppercase tracking-wider text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-slate-900/90 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-2xl py-3 text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon ? "pl-11" : "pl-4",
              rightIcon ? "pr-11" : "pr-4",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 pointer-events-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-slate-400">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
