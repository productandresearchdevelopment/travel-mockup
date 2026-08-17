import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required,
  error,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500">{hint}</p>
      )}
      {error && <p className="text-[11px] font-medium text-rose-500">{error}</p>}
    </div>
  );
}
