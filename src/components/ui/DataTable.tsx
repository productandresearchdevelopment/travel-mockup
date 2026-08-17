"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { Select } from "./Select";
import { Button } from "./Button";
import {
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
} from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface FilterConfig {
  key: string;
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;

  // Filter Bar Props
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  onExport?: () => void;
  exportLabel?: string;

  // Selection & Actions Props
  selectable?: boolean;
  selectedIds?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectRow?: (id: string, checked: boolean) => void;
  onRowAction?: (row: T) => void;

  // Pagination Props
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = "No records found",
  onRowClick,
  className,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  onExport,
  exportLabel = "Export",
  selectable = false,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
  onRowAction,
  currentPage = 1,
  totalPages = 1,
  totalItems = data.length,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const [jumpPage, setJumpPage] = useState<string>(String(currentPage));

  const allSelected =
    data.length > 0 && selectedIds.length === data.length;

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems || data.length);

  return (
    <div className={cn("w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-xs p-4 sm:p-5 space-y-4", className)}>
      {/* TOP INTEGRATED FILTER BAR (Matching Reference UI) */}
      {(onSearchChange || filters.length > 0 || onExport || onPageSizeChange) && (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-1">
          {/* Left: Pill Search Input */}
          {onSearchChange && (
            <div className="w-full lg:w-72">
              <SearchInput
                variant="pill"
                placeholder={searchPlaceholder}
                value={searchQuery || ""}
                onChange={onSearchChange}
              />
            </div>
          )}

          {/* Right: Pill Filters, Rows Selector, Export Button */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {filters.map((f) => (
              <div key={f.key} className="w-36 sm:w-40">
                <Select
                  variant="pill"
                  icon={f.icon || <SlidersHorizontal className="w-3 h-3 text-slate-400" />}
                  options={f.options}
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                />
              </div>
            ))}

            {onPageSizeChange && (
              <div className="w-36">
                <Select
                  variant="pill"
                  options={[
                    { value: "5", label: "Display 5 Rows" },
                    { value: "10", label: "Display 10 Rows" },
                    { value: "25", label: "Display 25 Rows" },
                    { value: "50", label: "Display 50 Rows" },
                  ]}
                  value={String(pageSize)}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                />
              </div>
            )}

            {onExport && (
              <Button
                variant="pill"
                onClick={onExport}
                leftIcon={<Download className="w-3.5 h-3.5 text-slate-500" />}
              >
                {exportLabel}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* TABLE GRID */}
      <div className="w-full overflow-x-auto border-t border-slate-100 dark:border-slate-800/80">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
              {selectable && (
                <th className="py-3.5 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-[#624AE8] focus:ring-[#624AE8] cursor-pointer"
                    checked={allSelected}
                    onChange={(e) => onSelectAll?.(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} className={cn("py-3.5 px-4 whitespace-nowrap", col.headerClassName)}>
                  {col.header}
                </th>
              ))}
              {onRowAction && <th className="py-3.5 px-3 w-10 text-right uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  {selectable && <td className="py-3.5 px-3" />}
                  {columns.map((col) => (
                    <td key={col.key} className="py-3.5 px-4">
                      <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-24" />
                    </td>
                  ))}
                  {onRowAction && <td className="py-3.5 px-3" />}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (onRowAction ? 1 : 0)}
                  className="py-10 text-center text-slate-400 font-mono text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowKey = keyExtractor(row, index);
                const isSelected = selectedIds.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "transition-colors duration-150 border-b border-slate-100 dark:border-slate-800/40",
                      isSelected
                        ? "bg-[#F3F0FF]/60 dark:bg-purple-950/40"
                        : "hover:bg-[#F8F7FE] dark:hover:bg-[#162034]",
                      onRowClick && "cursor-pointer"
                    )}
                  >
                    {selectable && (
                      <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-[#624AE8] focus:ring-[#624AE8] cursor-pointer"
                          checked={isSelected}
                          onChange={(e) => onSelectRow?.(rowKey, e.target.checked)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={cn("py-3.5 px-4 whitespace-nowrap align-middle", col.className)}>
                        {col.render ? col.render(row, index) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                      </td>
                    ))}
                    {onRowAction && (
                      <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onRowAction(row)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* INTEGRATED PAGINATION FOOTER (Matching Reference UI) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-500 border-t border-slate-100 dark:border-slate-800">
        {/* Left: Result Count Summary */}
        <div>
          Showing <strong className="text-slate-900 dark:text-white">{startIndex}-{endIndex}</strong> of{" "}
          <strong className="text-slate-900 dark:text-white">{totalItems || data.length}</strong> results
        </div>

        {/* Center: Pagination Controls */}
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Active Page Pill Button */}
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#624AE8] text-white font-bold text-xs shadow-xs">
            {currentPage}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(totalPages)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Quick Page Jump Input */}
        <div className="flex items-center gap-2">
          <span>Go to page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const pageNum = Math.max(1, Math.min(Number(jumpPage) || 1, totalPages));
                onPageChange?.(pageNum);
              }
            }}
            className="w-10 h-7 text-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] font-bold text-slate-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
