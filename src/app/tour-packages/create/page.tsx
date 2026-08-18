"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  Package,
  Plus,
  Trash2,
  ArrowLeft,
  DollarSign,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface RequirementRow {
  id: string;
  destinationName: string;
  requirementType: "Ticket" | "Equipment" | "Health Certificate" | "Permit" | "Guide";
  requirementName: string;
  costRupiah: number;
  isMandatory: boolean;
}

export default function CreateTourPackagePage() {
  const router = useRouter();

  // Basic Information State
  const [packageName, setPackageName] = useState("");
  const [packageCode, setPackageCode] = useState("");
  const [packageType, setPackageType] = useState<"Day Tour" | "Multi Destination" | "Overland">("Multi Destination");
  const [duration, setDuration] = useState("2D1N");
  const [status, setStatus] = useState<"Active" | "Draft">("Active");
  const [description, setDescription] = useState("");

  // Destinations Sequence State
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(["Mount Bromo", "Ijen Crater"]);

  // Operational Requirements Rows State
  const [requirements, setRequirements] = useState<RequirementRow[]>([
    {
      id: "req-1",
      destinationName: "Mount Bromo",
      requirementType: "Ticket",
      requirementName: "Bromo Ticket",
      costRupiah: 150000,
      isMandatory: true,
    },
    {
      id: "req-2",
      destinationName: "Ijen Crater",
      requirementType: "Ticket",
      requirementName: "Ijen Ticket",
      costRupiah: 150000,
      isMandatory: true,
    },
  ]);

  // Auto-calculated Operational Cost Sum
  const totalCalculatedCost = useMemo(() => {
    return requirements.reduce((acc, curr) => acc + (Number(curr.costRupiah) || 0), 0);
  }, [requirements]);

  // Add Requirement Row
  const handleAddRequirement = () => {
    const newReq: RequirementRow = {
      id: `req-${Date.now()}`,
      destinationName: selectedDestinations[0] || "Mount Bromo",
      requirementType: "Ticket",
      requirementName: "Entrance Ticket",
      costRupiah: 150000,
      isMandatory: true,
    };
    setRequirements([...requirements, newReq]);
  };

  // Remove Requirement Row
  const handleRemoveRequirement = (id: string) => {
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  // Save Tour Package
  const handleSavePackage = () => {
    if (!packageName || !packageCode) return;
    router.push("/tour-packages");
  };

  return (
    <AppShell>
      <PageHeader
        title="Create Tour Package Master"
        description="Define package structure, destinations sequence, operational requirement costs, and duration."
        breadcrumbItems={[
          { label: "Resources", href: "/vehicles" },
          { label: "Tour Package", href: "/tour-packages" },
          { label: "Create Package" },
        ]}
      />

      <div className="w-full space-y-6">

      {/* FORM SECTION 1: BASIC INFORMATION */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Basic Package Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <FormField label="Package Name *">
            <Input
              placeholder="e.g. Bromo Ijen"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </FormField>

          <FormField label="Package Code *">
            <Input
              placeholder="e.g. TP-BI-002"
              value={packageCode}
              onChange={(e) => setPackageCode(e.target.value)}
            />
          </FormField>

          <FormField label="Package Type">
            <Select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value as any)}
              options={[
                { value: "Day Tour", label: "Day Tour" },
                { value: "Multi Destination", label: "Multi Destination" },
                { value: "Overland", label: "Overland" },
              ]}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <FormField label="Duration">
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              options={[
                { value: "1 Day", label: "1 Day" },
                { value: "2D1N", label: "2D1N" },
                { value: "3D2N", label: "3D2N" },
                { value: "4D3N", label: "4D3N" },
                { value: "5D4N", label: "5D4N" },
              ]}
            />
          </FormField>

          <FormField label="Status">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Draft", label: "Draft" },
              ]}
            />
          </FormField>
        </div>

        <FormField label="Package Description">
          <Textarea
            placeholder="Describe the tour package experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
      </Card>

      {/* FORM SECTION 2: DESTINATIONS SEQUENCE */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Destinations Sequence
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
          {selectedDestinations.map((dest, idx) => (
            <React.Fragment key={idx}>
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                📍 {idx + 1}. {dest}
              </span>
              {idx < selectedDestinations.length - 1 && (
                <span className="text-slate-400 font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* FORM SECTION 3: OPERATIONAL REQUIREMENTS & AUTO-CALCULATED COST */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Operational Requirements & Ticket Costs
            </h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddRequirement}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Requirement Row
          </Button>
        </div>

        <div className="space-y-3">
          {requirements.map((req, idx) => (
            <div
              key={req.id}
              className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162034] items-center text-xs"
            >
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">DESTINATION</span>
                <input
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 font-bold text-slate-900 dark:text-slate-100"
                  value={req.destinationName}
                  onChange={(e) => {
                    const updated = [...requirements];
                    updated[idx].destinationName = e.target.value;
                    setRequirements(updated);
                  }}
                />
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-mono block">REQUIREMENT TYPE</span>
                <Select
                  value={req.requirementType}
                  onChange={(e) => {
                    const updated = [...requirements];
                    updated[idx].requirementType = e.target.value as any;
                    setRequirements(updated);
                  }}
                  options={[
                    { value: "Ticket", label: "Ticket" },
                    { value: "Equipment", label: "Equipment" },
                    { value: "Health Certificate", label: "Health Certificate" },
                    { value: "Permit", label: "Permit" },
                  ]}
                />
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-mono block">NAME</span>
                <input
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 font-bold text-slate-900 dark:text-slate-100"
                  value={req.requirementName}
                  onChange={(e) => {
                    const updated = [...requirements];
                    updated[idx].requirementName = e.target.value;
                    setRequirements(updated);
                  }}
                />
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-mono block">COST (RP)</span>
                <input
                  type="number"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 font-mono font-bold text-emerald-600"
                  value={req.costRupiah}
                  onChange={(e) => {
                    const updated = [...requirements];
                    updated[idx].costRupiah = Number(e.target.value) || 0;
                    setRequirements(updated);
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-4 sm:pt-0">
                <Badge variant={req.isMandatory ? "emerald" : "slate"}>
                  {req.isMandatory ? "Mandatory" : "Optional"}
                </Badge>
                <button
                  onClick={() => handleRemoveRequirement(req.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AUTO-CALCULATED COST SUMMARY BOX */}
        <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center justify-between border border-slate-800">
          <span className="font-bold text-slate-300">
            AUTOMATICALLY CALCULATED OPERATIONAL REQUIREMENT COST
          </span>
          <span className="text-lg font-extrabold text-emerald-400">
            Rp {totalCalculatedCost.toLocaleString("id-ID")}
          </span>
        </div>
      </Card>

      {/* SAVE ACTION */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={() => router.push("/tour-packages")}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSavePackage} className="px-6 font-bold">
          Save Tour Package Master
        </Button>
      </div>
      </div>
    </AppShell>
  );
}
