"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Save, Compass, Globe, MapPin, Award, FileText } from "lucide-react";

const availableLanguages = ["Indonesian", "English", "Mandarin", "Japanese", "German", "Dutch"];
const availableDestinations = ["Bromo", "Ijen", "Tumpak Sewu", "Baluran", "Malang", "Batu"];

export default function CreateGuidePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Rendra Kurnia",
    phone: "0812-9988-1122",
    email: "rendra.kurnia@example.com",
    city: "Malang",
    region: "East Java",
    address: "Jl. Retawu No. 18, Klojen",
    experienceYears: "6",
    guideType: "Tour Guide",
    specialization: "Nature & Volcano Expeditions",
    notes: "Pengalaman memandu wisatawan Eropa & Asia Timur.",
    docNumber: "HPI-EJ-0688",
    docExpiry: "2028-04-10",
    docStatus: "Valid",
    masterStatus: "Active",
  });

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["Indonesian", "English"]);
  const [selectedDestinations, setSelectedDestinations] = useState<
    { name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }[]
  >([
    { name: "Bromo", level: "Expert" },
    { name: "Ijen", level: "Advanced" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const toggleDestination = (destName: string) => {
    const exists = selectedDestinations.some((d) => d.name === destName);
    if (exists) {
      setSelectedDestinations(selectedDestinations.filter((d) => d.name !== destName));
    } else {
      setSelectedDestinations([...selectedDestinations, { name: destName, level: "Intermediate" }]);
    }
  };

  const updateDestLevel = (destName: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
    setSelectedDestinations(
      selectedDestinations.map((d) => (d.name === destName ? { ...d, level } : d))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/guides");
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Add New Guide"
        description="Register a new tour guide and configure language & destination capabilities."
        breadcrumbItems={[
          { label: "Guides", href: "/guides" },
          { label: "Add Guide" },
        ]}
      />

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Section 1: Personal Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Personal Information
              </h2>
              <p className="text-xs text-slate-500">Guide identity and contact details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Full Name" required hint="e.g. Rian Kurniawan">
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

              <FormField label="Operating Region" required>
                <input
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Section 2: Guide Profile */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Guide Profile & Specialization
              </h2>
              <p className="text-xs text-slate-500">Guide classification and field experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Years of Experience">
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
              />
            </FormField>

            <FormField label="Guide Type">
              <Select
                value={formData.guideType}
                onChange={(e) => setFormData({ ...formData, guideType: e.target.value })}
                options={[
                  { value: "Local Guide", label: "Local Guide" },
                  { value: "Tour Guide", label: "Tour Guide" },
                  { value: "Specialist Guide", label: "Specialist Guide" },
                  { value: "Freelance Guide", label: "Freelance Guide" },
                ]}
              />
            </FormField>

            <FormField label="Specialization">
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>
          </div>
        </Card>

        {/* Section 3: Language Capabilities */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Language Capabilities
              </h2>
              <p className="text-xs text-slate-500">Select supported tour languages for Dispatcher matching</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {availableLanguages.map((lang) => {
              const isSelected = selectedLanguages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 dark:bg-[#162034] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  {lang} {isSelected && "✓"}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Section 4: Destination Experience & Level */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                4. Destination Experience & Expertise Level
              </h2>
              <p className="text-xs text-slate-500">Select destinations and assign guide expertise rating</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {availableDestinations.map((dest) => {
                const isSelected = selectedDestinations.some((d) => d.name === dest);
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => toggleDestination(dest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                        : "bg-slate-50 dark:bg-[#162034] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    {dest} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>

            {/* Level Selectors for selected destinations */}
            {selectedDestinations.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Set Expertise Level per Destination:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedDestinations.map((d) => (
                    <div key={d.name} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#162034]/50">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{d.name}</span>
                      <div className="w-36">
                        <Select
                          value={d.level}
                          onChange={(e) => updateDestLevel(d.name, e.target.value as any)}
                          options={[
                            { value: "Beginner", label: "Beginner" },
                            { value: "Intermediate", label: "Intermediate" },
                            { value: "Advanced", label: "Advanced" },
                            { value: "Expert", label: "Expert" },
                          ]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Section 5: Certification & Master Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                5. Certification & Master Status
              </h2>
              <p className="text-xs text-slate-500">HPI Tour Guide License and master record status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="HPI License Number">
              <input
                type="text"
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold"
              />
            </FormField>

            <FormField label="License Expiry Date">
              <input
                type="date"
                value={formData.docExpiry}
                onChange={(e) => setFormData({ ...formData, docExpiry: e.target.value })}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </FormField>

            <FormField label="Master Status">
              <Select
                value={formData.masterStatus}
                onChange={(e) => setFormData({ ...formData, masterStatus: e.target.value })}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </FormField>
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/guides")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Guide Master
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
