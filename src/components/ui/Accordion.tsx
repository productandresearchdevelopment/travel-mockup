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
    <div className={cn("flex flex-col space-y-4 w-full", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              "border rounded-3xl overflow-hidden transition-all duration-300",
              isExpanded
                ? "bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-6 sm:p-7 text-left font-semibold text-white focus:outline-none"
              aria-expanded={isExpanded}
            >
              <span className="text-base sm:text-lg pr-4">{item.title}</span>
              <div
                className={cn(
                  "p-2 rounded-full transition-transform duration-300 shrink-0",
                  isExpanded
                    ? "bg-emerald-500/20 text-emerald-400 rotate-180"
                    : "bg-slate-800 text-slate-400"
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
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 text-sm sm:text-base text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4 mt-1">
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
