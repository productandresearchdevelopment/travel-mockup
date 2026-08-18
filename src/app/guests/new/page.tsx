"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Save, UserCheck, Phone, FileText, Globe, Heart } from "lucide-react";

export default function CreateGuestPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "Rossella",
    lastName: "Cescon",
    gender: "Female" as "Male" | "Female" | "Other",
    dateOfBirth: "1988-03-12",
    nationality: "Italy",
    countryOfResidence: "Italy",
    phone: "+39 340 189 3053",
    email: "rossella.cescon@example.it",
    whatsapp: "+39 340 189 3053",
    passportNumber: "8932145",
    passportIssuingCountry: "Italy",
    passportExpiryDate: "2029-09-18",
    emergencyName: "Luca Cescon",
    emergencyRelationship: "Brother",
    emergencyPhone: "+39 340 998 7711",
    preferredLanguage: "Italian / English",
    dietaryRequirement: "Vegetarian",
    specialRequirement: "Window seat preferred on KAI train segments",
    notes: "Frequent international traveler across Southeast Asia.",
    masterStatus: "Active",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/guests");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Register New Guest Master"
        description="Create a new international guest profile, record passport data, emergency contacts, & travel preferences."
        breadcrumbItems={[
          { label: "Guests", href: "/guests" },
          { label: "Register New Guest" },
        ]}
      />

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Section 1: Guest Identity */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Guest Identity & Personal Information
              </h2>
              <p className="text-xs text-slate-500">Legal name, gender, nationality, and birth details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="First Name" required hint="e.g. Rossella">
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Last Name" required hint="e.g. Cescon">
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Gender" required>
              <Select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                options={[
                  { value: "Female", label: "Female" },
                  { value: "Male", label: "Male" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </FormField>

            <FormField label="Date of Birth" required>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Nationality" required>
              <input
                type="text"
                required
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Country of Residence" required>
              <input
                type="text"
                required
                value={formData.countryOfResidence}
                onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 2: Contact & Emergency Details */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Contact Information & Emergency Details
              </h2>
              <p className="text-xs text-slate-500">Phone numbers, email address, and emergency contact person</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Phone Number" required hint="e.g. +39 340 189 3053">
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

            <FormField label="WhatsApp Number">
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>

            <FormField label="Emergency Contact Name" required>
              <input
                type="text"
                required
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Relationship">
              <input
                type="text"
                value={formData.emergencyRelationship}
                onChange={(e) => setFormData({ ...formData, emergencyRelationship: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Emergency Phone" required>
              <input
                type="text"
                required
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 3: Passport & Identification */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Passport & Travel Document Credentials
              </h2>
              <p className="text-xs text-slate-500">Official passport identification used for KAI train & hotel check-ins</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Passport Number" required>
              <input
                type="text"
                required
                value={formData.passportNumber}
                onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold"
              />
            </FormField>

            <FormField label="Issuing Country" required>
              <input
                type="text"
                required
                value={formData.passportIssuingCountry}
                onChange={(e) => setFormData({ ...formData, passportIssuingCountry: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Passport Expiry Date" required>
              <input
                type="date"
                required
                value={formData.passportExpiryDate}
                onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 4: Travel Profile & Preferences */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Travel Profile & Special Preferences
              </h2>
              <p className="text-xs text-slate-500">Dietary requirements, seat preferences, and operational notes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Preferred Language">
              <input
                type="text"
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Dietary Requirements">
              <input
                type="text"
                value={formData.dietaryRequirement}
                onChange={(e) => setFormData({ ...formData, dietaryRequirement: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Special Requirements & Medical/Seat Notes">
                <input
                  type="text"
                  value={formData.specialRequirement}
                  onChange={(e) => setFormData({ ...formData, specialRequirement: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 5: Master Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                5. Master Record Status
              </h2>
              <p className="text-xs text-slate-500">Set guest master record status (Active guests are selectable for booking manifests)</p>
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
            onClick={() => router.push("/guests")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Guest Master Profile
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
