import React from "react";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  variant?: "default" | "pill";
  icon?: React.ReactNode;
  containerClassName?: string;
}

export function Select({
  options,
  value,
  onChange,
  className,
  containerClassName,
  placeholder,
  variant = "default",
  icon,
  ...props
}: SelectProps) {
  return (
    <div className={cn("relative w-full min-w-[130px]", containerClassName)}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          {icon}
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        className={cn(
          "w-full h-9 bg-white dark:bg-[#101726] text-slate-900 dark:text-slate-100 text-xs font-semibold border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#624AE8] focus:border-transparent transition-all shadow-xs appearance-none pr-8 cursor-pointer",
          icon ? "pl-9" : "pl-3.5",
          variant === "pill" ? "rounded-full bg-slate-50/50 dark:bg-slate-900/60" : "rounded-xl",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
