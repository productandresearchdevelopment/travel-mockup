"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("flex flex-col space-y-3 w-full font-sans", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              "border rounded-2xl overflow-hidden transition-all duration-200",
              isExpanded
                ? "bg-white dark:bg-[#101822] border-[#2563EB] dark:border-[#4F8CFF] shadow-xs"
                : "bg-white dark:bg-[#101822] border-[#E4E7EC] dark:border-[#202B38]"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-[#172033] dark:text-white focus:outline-none cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span className="text-sm sm:text-base pr-4">{item.title}</span>
              <div
                className={cn(
                  "p-1.5 rounded-lg transition-transform duration-200 shrink-0",
                  isExpanded
                    ? "bg-[#EFF8FF] text-[#2563EB] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#4F8CFF] rotate-180"
                    : "bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0]"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-[#667085] dark:text-[#A7B1C0] leading-relaxed border-t border-[#E4E7EC] dark:border-[#202B38] pt-3">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
