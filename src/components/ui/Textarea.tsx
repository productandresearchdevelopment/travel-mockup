import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-semibold text-[#172033] dark:text-[#A7B1C0]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-[#F8FAFC] placeholder:text-[#98A2B3] dark:placeholder:text-[#667085] rounded-xl p-3 text-xs font-medium transition-colors duration-150 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#4F8CFF] disabled:opacity-50 disabled:cursor-not-allowed resize-y min-h-[100px]",
            error && "border-[#DC2626] dark:border-[#F97066] focus:border-[#DC2626]",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-[#DC2626] dark:text-[#F97066] font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-[#667085] dark:text-[#A7B1C0]">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
