import React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activeCount?: number;
  label?: string;
}

export function FilterButton({
  activeCount = 0,
  label = "Filter",
  className,
  ...props
}: FilterButtonProps) {
  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn("gap-2 font-medium text-xs", activeCount > 0 && "border-blue-600/40 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30", className)}
      leftIcon={<Filter className="w-3.5 h-3.5" />}
      {...props}
    >
      <span>{label}</span>
      {activeCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
          {activeCount}
        </span>
      )}
    </Button>
  );
}
