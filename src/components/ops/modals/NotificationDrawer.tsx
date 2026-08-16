"use client";

import React from "react";
import { OperationalNotification } from "@/types/travelOps";
import { X, Bell, AlertTriangle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in text-xs">
      <div className="w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-5 space-y-5 flex flex-col justify-between shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">Live Operational Dispatch Alerts</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{notifications.filter((n) => !n.read).length} Unread Notifications</span>
            <button
              onClick={onMarkAllAsRead}
              className="text-blue-400 hover:underline font-semibold"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg border space-y-1 ${
                  notif.type === "urgent"
                    ? "bg-red-500/10 border-red-500/30 text-red-200"
                    : notif.type === "warning"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                    : "bg-slate-950 border-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5">
                    {notif.type === "urgent" && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                    {notif.type === "warning" && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                    {notif.type === "info" && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    {notif.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg font-semibold"
          >
            Close Alerts Panel
          </button>
        </div>
      </div>
    </div>
  );
};
