"use client";

import React from "react";
import { OperationalNotification } from "@/types/travelOps";
import { X, Bell, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  notifications: OperationalNotification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/35 dark:bg-black/65 backdrop-blur-xs animate-in fade-in text-xs">
      <div className="w-full max-w-sm bg-white dark:bg-[#172230] border-l border-[#E4E7EC] dark:border-[#202B38] h-full overflow-y-auto p-5 space-y-5 flex flex-col justify-between shadow-2xl text-[#172033] dark:text-[#F8FAFC]">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />
              <h3 className="font-bold text-sm text-[#172033] dark:text-white">Operational Alerts</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#667085] dark:text-[#A7B1C0]">
            <span>{notifications.filter((n) => !n.read).length} Unread Alerts</span>
            <button
              onClick={onMarkAllAsRead}
              className="text-[#2563EB] dark:text-[#4F8CFF] hover:underline font-semibold cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-2.5">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl border space-y-1 transition-colors ${
                  notif.type === "urgent"
                    ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                    : notif.type === "warning"
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200"
                    : "bg-[#F9FAFB] dark:bg-[#131D28] border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    {notif.type === "urgent" ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] dark:text-[#F97066]" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#4F8CFF]" />
                    )}
                    <span>{notif.title}</span>
                  </span>
                  <span className="text-[10px] text-[#98A2B3] dark:text-[#667085] font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#667085] dark:text-[#A7B1C0]">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
