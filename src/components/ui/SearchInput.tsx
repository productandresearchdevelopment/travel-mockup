import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  variant?: "default" | "pill";
  containerClassName?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search resources...",
  variant = "default",
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center min-w-[220px]", containerClassName)}>
      <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full h-9 pl-10 pr-8 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] focus:outline-none focus:ring-2 focus:ring-[#624AE8] focus:border-transparent transition-all shadow-xs",
          variant === "pill" ? "rounded-full bg-slate-50/50 dark:bg-slate-900/60" : "rounded-xl",
          className
        )}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
