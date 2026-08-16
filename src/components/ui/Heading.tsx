import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  gradient?: boolean;
  align?: "left" | "center" | "right";
  subtitle?: string;
  badge?: string;
}

export function Heading({
  as: Component = "h2",
  gradient = true,
  align = "left",
  subtitle,
  badge,
  className,
  children,
  ...props
}: HeadingProps) {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const sizes = {
    h1: "text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]",
    h2: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight",
    h3: "text-2xl sm:text-3xl font-semibold tracking-tight",
    h4: "text-xl sm:text-2xl font-semibold",
  };

  return (
    <div className={cn("flex flex-col space-y-3 max-w-3xl", alignments[align])}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          {badge}
        </span>
      )}
      <Component
        className={cn(
          sizes[Component],
          gradient
            ? "bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            : "text-white",
          className
        )}
        {...props}
      >
        {children}
      </Component>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
