import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  glass = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#E4E7EC] dark:border-[#202B38] bg-white dark:bg-[#101822] text-[#172033] dark:text-[#F8FAFC] shadow-xs transition-all duration-150 overflow-hidden",
        hoverEffect &&
          "hover:border-[#2563EB]/40 dark:hover:border-[#4F8CFF]/40 hover:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 sm:p-5 flex flex-col space-y-1", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base sm:text-lg font-bold tracking-tight text-[#172033] dark:text-white", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs sm:text-sm text-[#667085] dark:text-[#A7B1C0] leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4 sm:px-5 pb-4 sm:pb-5 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-4 sm:px-5 py-3 bg-[#F9FAFB] dark:bg-[#131D28] border-t border-[#E4E7EC] dark:border-[#202B38] flex items-center justify-between text-xs text-[#667085] dark:text-[#A7B1C0]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
