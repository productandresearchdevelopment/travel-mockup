"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  actions?: React.ReactNode;
  statusBadge?: React.ReactNode;
  showBackButton?: boolean;
  backHref?: string;
  onBack?: () => void;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbItems,
  actions,
  statusBadge,
  showBackButton,
  backHref,
  onBack,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  // Show back button ONLY when:
  // 1) showBackButton is explicitly true
  // 2) backHref or onBack is explicitly provided
  // 3) showBackButton is not false AND breadcrumbItems has a parent module href (not just root "/")
  const isParentModuleHref = (href?: string) => Boolean(href && href !== "/" && href !== "/dashboard");

  const shouldShowBack =
    showBackButton === true ||
    Boolean(backHref) ||
    Boolean(onBack) ||
    (showBackButton !== false &&
      Boolean(
        breadcrumbItems &&
          breadcrumbItems.length > 1 &&
          breadcrumbItems.some((item, idx) => idx < breadcrumbItems.length - 1 && isParentModuleHref(item.href))
      ));

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else if (breadcrumbItems && breadcrumbItems.length > 0) {
      // Find parent module href (skip index of current page)
      const parentItem = [...breadcrumbItems].reverse().find((item, idx) => idx > 0 && isParentModuleHref(item.href));
      if (parentItem?.href) {
        router.push(parentItem.href);
      } else {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return (
    <div className={cn("mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 shrink-0 rounded-full border border-slate-200/90 dark:border-slate-800 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
              title="Go Back"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </h1>
              {statusBadge}
            </div>
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
