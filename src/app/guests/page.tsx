"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { MetricCard } from "@/components/ui/MetricCard";
import { mockGuestsData } from "@/data/mockGuestsData";
import { GuestMaster } from "@/types/guest";
import {
  Users,
  Plus,
  Search,
  Filter,
  Globe,
  FileText,
  Phone,
  Mail,
  Compass,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Calendar,
  UserCheck,
  Eye,
} from "lucide-react";

export default function GuestsListPage() {
  const [guests, setGuests] = useState<GuestMaster[]>(mockGuestsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Add Guest Modal state
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Female");
  const [dob, setDob] = useState("1990-05-15");
  const [nationality, setNationality] = useState("Italy");
  const [country, setCountry] = useState("Italy");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("2029-12-31");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [dietary, setDietary] = useState("None");
  const [specialNotes, setSpecialNotes] = useState("");

  // Summary Metrics
  const summary = useMemo(() => {
    return {
      total: 148,
      active: 24,
      nationalities: 18,
      completedTours: 124,
    };
  }, []);

  // Filtered Guests
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchSearch =
        g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.passportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchNationality = nationalityFilter === "All" || g.nationality === nationalityFilter;
      const matchGender = genderFilter === "All" || g.gender === genderFilter;
      const matchStatus = statusFilter === "All" || g.status === statusFilter;

      return matchSearch && matchNationality && matchGender && matchStatus;
    });
  }, [guests, searchQuery, nationalityFilter, genderFilter, statusFilter]);

  // Save Guest
  const handleSaveGuest = () => {
    if (!firstName || !lastName) return;

    const newGuest: GuestMaster = {
      id: `gst-${Date.now()}`,
      code: `GST-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender,
      dateOfBirth: dob,
      nationality,
      countryOfResidence: country,
      phone: phone || "+39 340 000 0000",
      email: email || "guest@example.com",
      whatsapp: phone,
      passportNumber: passportNum ? `•••• ${passportNum.slice(-4)}` : "•••• 9988",
      passportIssuingCountry: nationality,
      passportExpiryDate: passportExpiry,
      emergencyContact: {
        name: emergencyName || "Family Contact",
        relationship: "Family",
        phone: emergencyPhone || "+39 340 000 0000",
      },
      travelProfile: {
        preferredLanguage: `${nationality} / English`,
        dietaryRequirement: dietary,
        specialRequirement: specialNotes || "None",
      },
      totalTripsCount: 1,
      totalDestinationsVisited: 3,
      lastTripDate: "2026-08-25",
      status: "Active",
      travelHistory: [],
      documents: [],
    };

    setGuests([newGuest, ...guests]);
    setShowAddGuestModal(false);

    // Reset Form
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  };

  return (
    <AppShell>
      <PageHeader
        title="Guests & Traveler Management"
        description="Manage international traveler profiles, passports, travel preferences, and tour booking history."
        showBackButton={false}
        breadcrumbItems={[{ label: "Resources", href: "/vehicles" }, { label: "Guests" }]}
        actions={
          <Link href="/guests/new">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Guest
            </Button>
          </Link>
        }
      />

      {/* TOP SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard
          title="TOTAL GUEST MASTER"
          value={summary.total}
          subtitle="Travelers"
          icon={<Users className="w-4 h-4" />}
          variant="violet"
        />
        <MetricCard
          title="ACTIVE ON TOUR TODAY"
          value={summary.active}
          icon={<UserCheck className="w-4 h-4" />}
          variant="blue"
          badge="● Active"
        />
        <MetricCard
          title="INTERNATIONAL COUNTRIES"
          value={summary.nationalities}
          subtitle="Nationalities"
          icon={<Globe className="w-4 h-4" />}
          variant="cyan"
          badge="Global"
        />
        <MetricCard
          title="COMPLETED TOURS"
          value={summary.completedTours}
          icon={<Calendar className="w-4 h-4" />}
          variant="emerald"
          badge="✓ History"
        />
      </div>

      {/* UNIFIED MASTER DATA TABLE */}
      <DataTable
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Search guest name, passport, phone, email..."
        filters={[
          {
            key: "nationality",
            value: nationalityFilter,
            onChange: setNationalityFilter,
            options: [
              { value: "All", label: "All Nationalities" },
              { value: "Italy", label: "Italy" },
              { value: "United Kingdom", label: "United Kingdom" },
              { value: "Thailand", label: "Thailand" },
              { value: "United States", label: "United States" },
              { value: "Australia", label: "Australia" },
              { value: "Germany", label: "Germany" },
            ],
          },
          {
            key: "gender",
            value: genderFilter,
            onChange: setGenderFilter,
            options: [
              { value: "All", label: "All Genders" },
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
            ],
          },
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "All", label: "All Statuses" },
              { value: "Active", label: "Active" },
              { value: "Completed", label: "Completed" },
            ],
          },
        ]}
        onExport={() => {
          const headers = "Guest Code,Full Name,Nationality,Passport Number,Gender,Phone,Email,Status\n";
          const rows = filteredGuests
            .map((r) => `"${r.code}","${r.fullName}","${r.nationality}","${r.passportNumber}","${r.gender}","${r.phone}","${r.email}","${r.status}"`)
            .join("\n");
          const blob = new Blob([headers + rows], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Guests_Master_Export.csv";
          a.click();
        }}
        exportLabel="Export Guests"
        columns={[
          {
            key: "name",
            header: "Guest Name & Code",
            render: (r: GuestMaster) => (
              <div className="flex items-center gap-3">
                {r.avatarUrl ? (
                  <img
                    src={r.avatarUrl}
                    alt={r.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                    {r.fullName.charAt(0)}
                  </div>
                )}
                <div className="space-y-0.5">
                  <Link href={`/guests/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {r.fullName}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono block">{r.code}</span>
                </div>
              </div>
            ),
          },
          {
            key: "nationality",
            header: "Nationality & Country",
            render: (r: GuestMaster) => (
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                🌐 {r.nationality}
              </span>
            ),
          },
          {
            key: "passport",
            header: "Passport Number",
            render: (r: GuestMaster) => (
              <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                {r.passportNumber}
              </span>
            ),
          },
          { key: "gender", header: "Gender", render: (r: GuestMaster) => <span className="font-mono text-xs">{r.gender}</span> },
          { key: "phone", header: "Phone / WhatsApp", render: (r: GuestMaster) => <span className="font-mono text-xs">{r.phone}</span> },
          {
            key: "status",
            header: "Tour Status",
            render: (r: GuestMaster) => (
              <Badge variant={r.status === "Active" ? "emerald" : "slate"}>
                ● {r.status}
              </Badge>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: (r: GuestMaster) => (
              <div className="flex justify-end">
                <Link href={`/guests/${r.id}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-center transition-all duration-200 group"
                    title="View Detail"
                  >
                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </button>
                </Link>
              </div>
            ),
          },
        ]}
        data={filteredGuests}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
