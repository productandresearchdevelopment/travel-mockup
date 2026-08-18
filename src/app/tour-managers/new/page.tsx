"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Save, Briefcase, MapPin, Award, UserCheck } from "lucide-react";

const availableAdditionalRegions = ["Bali", "Central Java", "Jakarta", "Overland Dispatch", "Yogyakarta"];

export default function CreateTourManagerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Bagus Setiawan",
    phone: "0812-4455-6677",
    email: "bagus.setiawan@example.com",
    city: "Surabaya",
    region: "East Java",
    address: "Jl. Pemuda No. 42, Genteng",
    experienceYears: "7",
    specialization: "Corporate Tour",
    notes: "Pengalaman mengkoordinasikan tur korporat B2B & insentif.",
    primaryRegion: "East Java",
    masterStatus: "Active",
  });

  const [selectedAdditionalRegions, setSelectedAdditionalRegions] = useState<string[]>(["Bali", "Central Java"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAdditionalRegion = (reg: string) => {
    if (selectedAdditionalRegions.includes(reg)) {
      setSelectedAdditionalRegions(selectedAdditionalRegions.filter((r) => r !== reg));
    } else {
      setSelectedAdditionalRegions([...selectedAdditionalRegions, reg]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/tour-managers");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Add New Tour Manager"
        description="Register a new operational tour manager and set operational region coverage."
        breadcrumbItems={[
          { label: "Tour Managers", href: "/tour-managers" },
          { label: "Add Tour Manager" },
        ]}
      />

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Section 1: Personal Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Personal Information
              </h2>
              <p className="text-xs text-slate-500">Tour Manager identity and contact details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Full Name" required hint="e.g. Sinta Wijaya">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Phone Number" required hint="e.g. 0812-3456-7890">
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>

            <FormField label="Email Address">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-2">
              <FormField label="City Base" required>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>

              <FormField label="Home Region" required>
                <input
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Address">
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

        {/* Section 2: TM Profile */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Tour Manager Profile & Specialization
              </h2>
              <p className="text-xs text-slate-500">Operational experience & tour coordination category</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Years of Experience" required>
              <input
                type="number"
                required
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Operational Specialization" required>
              <Select
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value as any })}
                options={[
                  { value: "Group Tour", label: "Group Tour" },
                  { value: "Corporate Tour", label: "Corporate Tour" },
                  { value: "Family Tour", label: "Family Tour" },
                  { value: "Adventure Tour", label: "Adventure Tour" },
                  { value: "International Tour", label: "International Tour" },
                ]}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Operational Notes">
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 3: Operational Region Coverage */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Operational Region Coverage
              </h2>
              <p className="text-xs text-slate-500">Primary operational zone and additional familiar regions</p>
            </div>
          </div>

          <div className="space-y-4">
            <FormField label="Primary Region Zone" required>
              <input
                type="text"
                required
                value={formData.primaryRegion}
                onChange={(e) => setFormData({ ...formData, primaryRegion: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Select Additional Operational Regions:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableAdditionalRegions.map((reg) => {
                  const isSelected = selectedAdditionalRegions.includes(reg);
                  return (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => toggleAdditionalRegion(reg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                          : "bg-slate-50 dark:bg-[#162034] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                      }`}
                    >
                      {reg} {isSelected && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* Section 4: Master Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Master Resource Status
              </h2>
              <p className="text-xs text-slate-500">Set master record status (Active Tour Managers become available for Dispatcher assignment)</p>
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
            onClick={() => router.push("/tour-managers")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Tour Manager Master
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
