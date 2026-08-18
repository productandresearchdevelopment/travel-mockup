"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Save, UserCheck, Phone, MapPin, DollarSign, Briefcase } from "lucide-react";
import { WorkerRole, EmploymentType, VehicleOwnership } from "@/types/workforce";

export default function CreateWorkerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Surya Pratama",
    role: "Driver" as WorkerRole,
    employmentType: "Daily Worker" as EmploymentType,
    phone: "+62 812-7788-9900",
    email: "surya.pratama@example.com",
    region: "East Java",
    city: "Surabaya",
    address: "Jl. Pemuda No. 45, Genteng",
    dailyRateRupiah: "350000",
    vehicleOwnership: "No Vehicle" as VehicleOwnership,
    masterStatus: "Active",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/workforce");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Register New Worker Master"
        description="Register a new operational workforce member, classify role & employment type, and set daily rate compensation."
        breadcrumbItems={[
          { label: "Workforce", href: "/workforce" },
          { label: "Register New Worker" },
        ]}
      />

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Section 1: Worker Identity & Classification */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Worker Identity & Role Classification
              </h2>
              <p className="text-xs text-slate-500">Legal full name, operational role, and employment type</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Full Name" required hint="e.g. Agus Santoso">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Operational Role" required>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as WorkerRole })}
                options={[
                  { value: "Driver", label: "Driver" },
                  { value: "Tour Guide", label: "Tour Guide" },
                  { value: "Tour Manager", label: "Tour Manager" },
                  { value: "Logistics Crew", label: "Logistics Crew" },
                  { value: "General Support", label: "General Support" },
                ]}
              />
            </FormField>

            <FormField label="Employment Type" required>
              <Select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as EmploymentType })}
                options={[
                  { value: "Daily Worker", label: "Daily Worker" },
                  { value: "Contract", label: "Contract Basis" },
                  { value: "Full-Time Staff", label: "Full-Time Staff" },
                  { value: "Freelance", label: "Freelance" },
                ]}
              />
            </FormField>
          </div>
        </Card>

        {/* Section 2: Contact Information & Regional Base */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Contact & Geographic Base
              </h2>
              <p className="text-xs text-slate-500">Phone number, operational email, and home base region</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Phone Number" required hint="e.g. +62 812-3456-7890">
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

            <FormField label="Operating Region" required>
              <input
                type="text"
                required
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Base City" required>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
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

        {/* Section 3: Daily Rate & Vehicle Ownership */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Daily Rate Compensation & Vehicle Ownership
              </h2>
              <p className="text-xs text-slate-500">Configured daily rate for automated payroll calculation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Daily Rate (Rp / Day)" required>
              <input
                type="number"
                required
                value={formData.dailyRateRupiah}
                onChange={(e) => setFormData({ ...formData, dailyRateRupiah: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400"
              />
            </FormField>

            <FormField label="Vehicle Ownership">
              <Select
                value={formData.vehicleOwnership}
                onChange={(e) => setFormData({ ...formData, vehicleOwnership: e.target.value as VehicleOwnership })}
                options={[
                  { value: "No Vehicle", label: "No Vehicle (Public/Passenger)" },
                  { value: "Driver Owned", label: "Driver Owned Vehicle" },
                  { value: "Company Fleet", label: "Company Fleet Assigned" },
                  { value: "Vendor Rented", label: "Vendor Rented Vehicle" },
                ]}
              />
            </FormField>
          </div>
        </Card>

        {/* Section 4: Master Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Master Record Status
              </h2>
              <p className="text-xs text-slate-500">Set worker master status (Active workers become available for Dispatcher assignment)</p>
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

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/workforce")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Worker Master Profile
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
