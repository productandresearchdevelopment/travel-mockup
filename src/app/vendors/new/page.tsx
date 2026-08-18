"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Save, Building, Phone, MapPin, Truck, ShieldCheck } from "lucide-react";

export default function CreateVendorPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "PT Nusantara Transport Utama",
    legalName: "PT Nusantara Transport Utama Indonesia",
    contactPerson: "Budi Santoso",
    phone: "0812-3456-7890",
    email: "budi.santoso@nusantaratransport.example.com",
    region: "East Java" as "East Java" | "Banyuwangi" | "Bali",
    city: "Malang",
    address: "Jl. Letjen Sutoyo No. 88, Lowokwaru, Malang",
    taxId: "01.234.567.8-012.000",
    serviceCategory: "Fleet Transport & Charter",
    vehiclesCount: "12",
    masterStatus: "Active",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/vendors");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Register New Vendor Partner"
        description="Register a new external fleet or service vendor, record contact representatives, & manage partnership status."
        breadcrumbItems={[
          { label: "Vendors", href: "/vendors" },
          { label: "Register New Vendor" },
        ]}
      />

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Section 1: Vendor Identity */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Vendor Identity & Enterprise Credentials
              </h2>
              <p className="text-xs text-slate-500">Commercial trade name, legal corporate entity, and Tax ID</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Vendor Trade Name" required hint="e.g. PT ABC Transport">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Legal Enterprise Name" required hint="Official company legal name">
              <input
                type="text"
                required
                value={formData.legalName}
                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Tax Identification (NPWP)">
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>

            <FormField label="Service Category" required>
              <Select
                value={formData.serviceCategory}
                onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                options={[
                  { value: "Fleet Transport & Charter", label: "Fleet Transport & Charter" },
                  { value: "Microbus & Minibus Rental", label: "Microbus & Minibus Rental" },
                  { value: "VIP Luxury Transport", label: "VIP Luxury Transport" },
                  { value: "Ferry & Marine Charter", label: "Ferry & Marine Charter" },
                ]}
              />
            </FormField>
          </div>
        </Card>

        {/* Section 2: Location & Address Details */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Location & Geographic Base
              </h2>
              <p className="text-xs text-slate-500">Operating region zone, head office city, and full address</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Operating Region" required>
              <Select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value as any })}
                options={[
                  { value: "East Java", label: "East Java (Malang/Surabaya)" },
                  { value: "Banyuwangi", label: "Banyuwangi & Ijen Corridor" },
                  { value: "Bali", label: "Bali Island" },
                ]}
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
              <FormField label="Full Head Office Address" required>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 3: Contact Representatives */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Operational Representative & Contacts
              </h2>
              <p className="text-xs text-slate-500">Contact person name, phone numbers, and operational email</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Primary Contact Person" required hint="e.g. Budi Hartono">
              <input
                type="text"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Direct Phone Number" required hint="e.g. 0812-3456-7890">
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>

            <FormField label="Operational Email Address" required>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 4: Fleet Supply Capability */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Fleet Capacity & Master Status
              </h2>
              <p className="text-xs text-slate-500">Number of fleet units supplied & active partnership status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Fleet Units Supplied Count">
              <input
                type="number"
                value={formData.vehiclesCount}
                onChange={(e) => setFormData({ ...formData, vehiclesCount: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Partnership Master Status" required>
              <Select
                value={formData.masterStatus}
                onChange={(e) => setFormData({ ...formData, masterStatus: e.target.value })}
                options={[
                  { value: "Active", label: "Active Partner" },
                  { value: "Inactive", label: "Inactive / Suspended" },
                ]}
              />
            </FormField>
          </div>
        </Card>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/vendors")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Vendor Partner Master
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
