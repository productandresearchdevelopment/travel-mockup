import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  glass = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-800/80 overflow-hidden transition-all duration-300",
        glass ? "bg-slate-900/60 backdrop-blur-xl" : "bg-slate-900",
        hoverEffect &&
          "hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1",
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
    <div className={cn("p-6 sm:p-8 flex flex-col space-y-1.5", className)} {...props}>
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
      className={cn("text-xl sm:text-2xl font-bold tracking-tight text-white", className)}
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
    <p className={cn("text-sm text-slate-400 leading-relaxed", className)} {...props}>
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
    <div className={cn("px-6 sm:px-8 pb-6 sm:pb-8 pt-0", className)} {...props}>
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
        "px-6 sm:px-8 py-4 sm:py-6 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
