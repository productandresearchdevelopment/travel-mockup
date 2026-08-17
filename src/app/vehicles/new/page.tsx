"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Save, Truck, DollarSign, FileText, UserCheck, ShieldCheck } from "lucide-react";

export default function CreateVehiclePage() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: "Toyota Hiace Premio",
    licensePlate: "B 8899 KKL",
    vehicleType: "Hiace",
    brand: "Toyota",
    model: "Hiace Premio 2.8",
    year: "2024",
    color: "White",
    passengerCapacity: "12",
    luggageCapacity: "10",
    vendorName: "PT ABC Transport",
    vendorContact: "Hendra Wijaya",
    vendorPhone: "0812-3456-7890",
    rentalType: "Daily",
    rateAmount: "1100000",
    rateUnit: "Per Day",
    effectiveFrom: "2026-08-01",
    effectiveUntil: "2026-12-31",
    docName: "STNK / BPKB",
    docNumber: "STNK-B8899KKL-2024",
    docExpiry: "2027-08-15",
    docStatus: "Valid",
    status: "Available",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/vehicles");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Add New Vehicle"
        description="Register a new transport fleet vehicle and define vendor rate data."
        breadcrumbItems={[
          { label: "Vehicles", href: "/vehicles" },
          { label: "Add Vehicle" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/vehicles")}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Cancel
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Section 1: Basic Vehicle Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Vehicle Information
              </h2>
              <p className="text-xs text-slate-500">Core physical vehicle identification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Vehicle Name" required hint="e.g. Toyota Hiace Premio">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="License Plate" required hint="e.g. B 1234 XYZ">
              <input
                type="text"
                required
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold"
              />
            </FormField>

            <FormField label="Vehicle Type" required>
              <Select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                options={[
                  { value: "Hiace", label: "Hiace (Microbus)" },
                  { value: "Innova", label: "Innova (MPV)" },
                  { value: "Elf", label: "Elf (Minibus)" },
                  { value: "Sprinter", label: "Sprinter (Luxury Van)" },
                  { value: "Alphard", label: "Alphard (Luxury MPV)" },
                  { value: "Bus", label: "Big Bus / Medium Bus" },
                ]}
              />
            </FormField>

            <FormField label="Brand">
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Model">
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-2">
              <FormField label="Year">
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>

              <FormField label="Color">
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 2: Capacity */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Capacity Limits
              </h2>
              <p className="text-xs text-slate-500">Passenger and luggage capacity bounds</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Passenger Capacity (Pax)" required>
              <input
                type="number"
                required
                value={formData.passengerCapacity}
                onChange={(e) => setFormData({ ...formData, passengerCapacity: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Luggage Capacity (Bags)">
              <input
                type="number"
                value={formData.luggageCapacity}
                onChange={(e) => setFormData({ ...formData, luggageCapacity: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 3: Vendor Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Vendor Ownership
              </h2>
              <p className="text-xs text-slate-500">External provider or fleet partner entity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Vendor Partner" required>
              <Select
                value={formData.vendorName}
                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                options={[
                  { value: "PT ABC Transport", label: "PT ABC Transport" },
                  { value: "CV Nusantara Transport", label: "CV Nusantara Transport" },
                  { value: "PT Sumber Armada", label: "PT Sumber Armada" },
                ]}
              />
            </FormField>

            <FormField label="Vendor Contact Person">
              <input
                type="text"
                value={formData.vendorContact}
                onChange={(e) => setFormData({ ...formData, vendorContact: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Vendor Phone">
              <input
                type="text"
                value={formData.vendorPhone}
                onChange={(e) => setFormData({ ...formData, vendorPhone: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 4: Rental & Rate */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Rental & Rate (Cost Control Data)
              </h2>
              <p className="text-xs text-slate-500">Contract rate used for automated dispatch costing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Rental Type" required>
              <Select
                value={formData.rentalType}
                onChange={(e) => setFormData({ ...formData, rentalType: e.target.value })}
                options={[
                  { value: "Daily", label: "Daily Rental" },
                  { value: "Per Trip", label: "Per Trip Contract" },
                  { value: "Hourly", label: "Hourly Charter" },
                ]}
              />
            </FormField>

            <FormField label="Contract Rate Amount (Rp)" required>
              <input
                type="number"
                required
                value={formData.rateAmount}
                onChange={(e) => setFormData({ ...formData, rateAmount: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400"
              />
            </FormField>

            <FormField label="Rate Unit">
              <Select
                value={formData.rateUnit}
                onChange={(e) => setFormData({ ...formData, rateUnit: e.target.value })}
                options={[
                  { value: "Per Day", label: "Per Day" },
                  { value: "Per Trip", label: "Per Trip" },
                  { value: "Per Hour", label: "Per Hour" },
                ]}
              />
            </FormField>

            <FormField label="Effective From">
              <input
                type="date"
                value={formData.effectiveFrom}
                onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Effective Until">
              <input
                type="date"
                value={formData.effectiveUntil}
                onChange={(e) => setFormData({ ...formData, effectiveUntil: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 5: Vehicle Documents */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                5. Vehicle Documents
              </h2>
              <p className="text-xs text-slate-500">Legal registration and operational permits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Document Name">
              <input
                type="text"
                value={formData.docName}
                onChange={(e) => setFormData({ ...formData, docName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Document Number">
              <input
                type="text"
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>

            <FormField label="Expiry Date">
              <input
                type="date"
                value={formData.docExpiry}
                onChange={(e) => setFormData({ ...formData, docExpiry: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 6: Initial Master Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                6. Master Initial Status
              </h2>
              <p className="text-xs text-slate-500">Set initial master state (Operational states Assigned/On Trip are controlled by Dispatcher)</p>
            </div>
            <div className="w-44">
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  { value: "Available", label: "Available" },
                  { value: "Maintenance", label: "Maintenance" },
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
            onClick={() => router.push("/vehicles")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Vehicle Master
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
