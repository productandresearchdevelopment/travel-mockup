"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockNotificationsData } from "@/data/mockNotificationsData";
import { OperationalNotification } from "@/types/notification";
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Clock,
  ExternalLink,
  Check,
  Filter,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const router = useRouter();

  const [notifications, setNotifications] = useState<OperationalNotification[]>(mockNotificationsData);
  const [filterTab, setFilterTab] = useState<"all" | "unread">("unread");
  const [selectedNotification, setSelectedNotification] = useState<OperationalNotification | null>(null);
  const [showFullCenterModal, setShowFullCenterModal] = useState(false);
  const [centerCategoryFilter, setCenterCategoryFilter] = useState<string>("All");

  // Unread Count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Filtered List
  const displayedNotifications = useMemo(() => {
    if (filterTab === "unread") {
      return notifications.filter((n) => !n.read);
    }
    return notifications;
  }, [notifications, filterTab]);

  // Mark single as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Right Drawer (Width 400px) */}
      <aside className="fixed top-0 bottom-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-[#101726] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col font-sans">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white">
                    {unreadCount}
                  </span>
                )}
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">Centralized Operational Alerts</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Sub-Tabs */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#162034] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterTab("unread")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                filterTab === "unread"
                  ? "bg-white dark:bg-[#101726] text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Unread ({unreadCount})
            </button>

            <button
              onClick={() => setFilterTab("all")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                filterTab === "all"
                  ? "bg-white dark:bg-[#101726] text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({notifications.length})
            </button>
          </div>

          <button
            onClick={() => setShowFullCenterModal(true)}
            className="text-[10px] font-mono text-slate-500 hover:text-blue-600 flex items-center gap-1 font-semibold"
          >
            <span>Notification Center</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {displayedNotifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <CheckCheck className="w-8 h-8 mx-auto text-emerald-500 opacity-60" />
              <p className="font-bold text-slate-700 dark:text-slate-300">You're all caught up!</p>
              <p className="text-[11px]">No new unread operational notifications.</p>
            </div>
          ) : (
            displayedNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  handleMarkAsRead(n.id);
                  setSelectedNotification(n);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  !n.read
                    ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-xs"
                    : "bg-white dark:bg-[#101726] border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-[#162034]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">
                      {n.severity === "Critical" ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                      ) : n.severity === "Warning" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      ) : n.severity === "Success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-500" />
                      )}
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{n.title}</h3>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{n.relativeTime}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{n.description}</p>

                <div className="pt-1 flex items-center justify-between text-[10px] border-t border-slate-100 dark:border-slate-800/60 font-mono">
                  <Badge variant={n.severity === "Critical" ? "danger" : n.severity === "Warning" ? "amber" : "slate"}>
                    {n.category}
                  </Badge>

                  {n.actions.length > 0 && (
                    <Link
                      href={n.actions[0].href}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(n.id);
                        onClose();
                      }}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>{n.actions[0].label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162034] text-center">
          <button
            onClick={() => {
              setShowFullCenterModal(true);
            }}
            className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            View Full Operational Notification Center
          </button>
        </div>

      </aside>

      {/* FULL NOTIFICATION CENTER MODAL */}
      <Modal
        isOpen={showFullCenterModal}
        onClose={() => setShowFullCenterModal(false)}
        title="Centralized Operational Notification Center"
      >
        <div className="space-y-4 text-xs">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap border-b border-slate-200 dark:border-slate-800 pb-2">
            {["All", "Vehicle", "Trip", "Maintenance", "Document", "Assignment"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCenterCategoryFilter(cat)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                  centerCategoryFilter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto font-mono">
            {notifications
              .filter((n) => centerCategoryFilter === "All" || n.category === centerCategoryFilter)
              .map((n) => (
                <div key={n.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{n.title} ({n.relatedCode})</span>
                    <span className="text-[10px] text-slate-400">{n.relativeTime}</span>
                  </div>
                  <p className="font-sans text-slate-700 dark:text-slate-300">{n.description}</p>
                  <div className="pt-1 flex items-center justify-between">
                    <Badge variant={n.severity === "Critical" ? "danger" : "amber"}>{n.severity}</Badge>
                    <Link
                      href={n.actions[0].href}
                      onClick={() => {
                        setShowFullCenterModal(false);
                        onClose();
                      }}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      {n.actions[0].label} →
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="outline" onClick={() => setShowFullCenterModal(false)}>
              Close Center
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
