import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  gridFlare?: boolean;
  ambientGlow?: "emerald" | "purple" | "cyan" | "none";
}

export function Section({
  id,
  className,
  containerSize = "lg",
  gridFlare = false,
  ambientGlow = "none",
  children,
  ...props
}: SectionProps) {
  const glows = {
    emerald: "before:bg-emerald-500/10",
    purple: "before:bg-purple-500/10",
    cyan: "before:bg-cyan-500/10",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28 lg:py-32 overflow-hidden",
        ambientGlow !== "none" &&
          `before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[600px] before:h-[600px] before:rounded-full before:blur-[140px] before:pointer-events-none ${glows[ambientGlow]}`,
        className
      )}
      {...props}
    >
      {gridFlare && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      )}
      <Container size={containerSize} className="relative z-10">
        {children}
      </Container>
    </section>
  );
}
