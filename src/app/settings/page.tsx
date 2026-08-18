"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sliders, Shield, Database, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Settings"
        description="System configuration, resource metadata definitions, and platform preferences."
        showBackButton={false}
        breadcrumbItems={[{ label: "Settings" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Operational Preferences</h3>
              <p className="text-xs text-slate-500">Resource state default rules</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-600 dark:text-slate-400 space-y-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center py-1">
              <span>Auto-set Vehicle Maintenance Warning</span>
              <Badge variant="emerald">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Default Driver Assignment Lock</span>
              <Badge variant="emerald">Active</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Master Data Configuration</h3>
              <p className="text-xs text-slate-500">System code formats & tags</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-600 dark:text-slate-400 space-y-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center py-1">
              <span>Vehicle Code Prefix</span>
              <span className="font-mono font-bold">V-XXX</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Driver Code Prefix</span>
              <span className="font-mono font-bold">DRV-XX</span>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
