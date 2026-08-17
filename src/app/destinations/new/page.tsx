"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Save, MapPin, Compass, Clock, DollarSign, ShieldAlert, FileText } from "lucide-react";

export default function CreateDestinationPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "Kintamani Mount Batur",
    type: "Nature",
    description: "Kawasan vulkanik Batur dengan panorama danau & sunrise trekking.",
    city: "Bangli",
    region: "Bali",
    address: "Kintamani, Kabupaten Bangli",
    lat: "-8.2415",
    lng: "115.3789",
    operatingHoursText: "03:00 – 17:00",
    startingTicketFee: "50000",
    guideRequirement: "Required",
    guideRequirementReason: "Local guide mandatory for volcano summit trekking.",
    vehicleRestriction: "Standard Vehicle",
    bookingRequired: false,
    recommendedArrivalTime: "04:00",
    rules: "Wajib menggunakan guide lokal saat pendakian. Sedia jaket hangat.",
    operationalNotes: "Tiba jam 04:00 untuk titik kumpul pendakian sunrise.",
    masterStatus: "Active",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/destinations");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Add New Destination"
        description="Register a new destination and configure operational requirements, hours, & fees."
        breadcrumbItems={[
          { label: "Destinations", href: "/destinations" },
          { label: "Add Destination" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/destinations")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Cancel
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Section 1: Destination Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Destination Identity & Type
              </h2>
              <p className="text-xs text-slate-500">Destination name and operational category</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Destination Name" required hint="e.g. Mount Bromo">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Destination Category / Type" required>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                options={[
                  { value: "Nature", label: "Nature & Volcano" },
                  { value: "Culture", label: "Culture & Heritage" },
                  { value: "Historical", label: "Historical Site" },
                  { value: "Adventure", label: "Adventure & Outdoor" },
                  { value: "Beach", label: "Beach & Marine" },
                  { value: "Religious", label: "Religious & Sacred Temple" },
                  { value: "Entertainment", label: "Entertainment & Theme Park" },
                ]}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Operational Description">
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 2: Location Details */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Location & Geographic Reference
              </h2>
              <p className="text-xs text-slate-500">City, region, and map coordinates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="City / Area" required>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Region / Province" required>
              <Select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                options={[
                  { value: "East Java", label: "East Java" },
                  { value: "Bali", label: "Bali" },
                ]}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Full Address">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 3: Operating Hours & Fees */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Operating Hours & Ticket Rates
              </h2>
              <p className="text-xs text-slate-500">Daily open hours window and entrance fee</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Operating Hours Window" required hint="e.g. 03:00 – 17:00">
              <input
                type="text"
                required
                value={formData.operatingHoursText}
                onChange={(e) => setFormData({ ...formData, operatingHoursText: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>

            <FormField label="Starting Ticket Fee (Rp)" required>
              <input
                type="number"
                required
                value={formData.startingTicketFee}
                onChange={(e) => setFormData({ ...formData, startingTicketFee: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 4: Operational Requirements */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Operational Requirements & Restrictions
              </h2>
              <p className="text-xs text-slate-500">Guide requirement, vehicle restrictions, & arrival guidance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Guide Requirement" required>
              <Select
                value={formData.guideRequirement}
                onChange={(e) => setFormData({ ...formData, guideRequirement: e.target.value as any })}
                options={[
                  { value: "Required", label: "Required (Mandatory)" },
                  { value: "Recommended", label: "Recommended" },
                  { value: "Not Required", label: "Not Required" },
                ]}
              />
            </FormField>

            <FormField label="Vehicle Restrictions">
              <input
                type="text"
                value={formData.vehicleRestriction}
                onChange={(e) => setFormData({ ...formData, vehicleRestriction: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Recommended Arrival Time">
              <input
                type="text"
                value={formData.recommendedArrivalTime}
                onChange={(e) => setFormData({ ...formData, recommendedArrivalTime: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 5: Master Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                5. Master Resource Status
              </h2>
              <p className="text-xs text-slate-500">Set master record status (Active destinations become available for Dispatcher tour planning)</p>
            </div>
            <div className="w-40">
              <Select
                value={formData.masterStatus}
                onChange={(e) => setFormData({ ...formData, masterStatus: e.target.value })}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/destinations")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Destination Master
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
