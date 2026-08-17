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
        breadcrumbItems={[{ label: "Resources", href: "/vehicles" }, { label: "Guests" }]}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddGuestModal(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Guest
          </Button>
        }
      />

      {/* TOP SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOTAL GUEST MASTER</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{summary.total}</span>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">Travelers</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1 border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20">
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase block">ACTIVE ON TOUR TODAY</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{summary.active}</span>
            <Badge variant="emerald">● Active</Badge>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">INTERNATIONAL COUNTRIES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">{summary.nationalities}</span>
            <span className="text-[10px] text-slate-400 font-mono">Nationalities</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">COMPLETED TOURS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.completedTours}</span>
            <Badge variant="emerald">✓ History</Badge>
          </div>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search guest name, passport, phone, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
              options={[
                { value: "All", label: "All Nationalities" },
                { value: "Italy", label: "Italy" },
                { value: "United Kingdom", label: "United Kingdom" },
                { value: "Thailand", label: "Thailand" },
                { value: "United States", label: "United States" },
                { value: "Australia", label: "Australia" },
                { value: "Germany", label: "Germany" },
              ]}
              className="w-40"
            />

            <Select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              options={[
                { value: "All", label: "All Genders" },
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
              ]}
              className="w-32"
            />

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "Active", label: "Active" },
                { value: "Completed", label: "Completed" },
              ]}
              className="w-32"
            />
          </div>
        </div>

        {/* GUESTS DATA TABLE */}
        <DataTable
          columns={[
            {
              key: "guest",
              header: "Guest Name",
              render: (r: GuestMaster) => (
                <div className="space-y-0.5">
                  <Link href={`/guests/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {r.fullName}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono block">{r.code}</span>
                </div>
              ),
            },
            {
              key: "nationality",
              header: "Nationality & Residence",
              render: (r: GuestMaster) => (
                <div className="text-xs font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">🇮🇹 {r.nationality}</span>
                  <span className="text-[10px] text-slate-400 block">Resides in {r.countryOfResidence}</span>
                </div>
              ),
            },
            { key: "gender", header: "Gender", render: (r: GuestMaster) => <span>{r.gender}</span> },
            {
              key: "passport",
              header: "Passport Number",
              render: (r: GuestMaster) => (
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{r.passportNumber}</span>
              ),
            },
            {
              key: "contact",
              header: "Contact Details",
              render: (r: GuestMaster) => (
                <div className="text-xs space-y-0.5 font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{r.phone}</span>
                  <span className="text-[10px] text-slate-400 block">{r.email}</span>
                </div>
              ),
            },
            {
              key: "trips",
              header: "Trips History",
              render: (r: GuestMaster) => (
                <span className="font-mono font-bold text-blue-600">{r.totalTripsCount} Trips</span>
              ),
            },
            {
              key: "lastTrip",
              header: "Last Travel Date",
              render: (r: GuestMaster) => (
                <span className="font-mono text-xs">{r.lastTripDate}</span>
              ),
            },
            {
              key: "status",
              header: "Status",
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
                <Link href={`/guests/${r.id}`}>
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                    View Profile
                  </Button>
                </Link>
              ),
            },
          ]}
          data={filteredGuests}
          keyExtractor={(r) => r.id}
        />
      </Card>

      {/* ADD GUEST MODAL */}
      <Modal isOpen={showAddGuestModal} onClose={() => setShowAddGuestModal(false)} title="Create Guest / Traveler Profile">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First Name *">
              <Input
                placeholder="e.g. Rossella"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormField>

            <FormField label="Last Name *">
              <Input
                placeholder="e.g. Cescon"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Gender">
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                options={[
                  { value: "Female", label: "Female" },
                  { value: "Male", label: "Male" },
                ]}
              />
            </FormField>

            <FormField label="Date of Birth">
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </FormField>

            <FormField label="Nationality">
              <Input value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Phone Number / WhatsApp">
              <Input placeholder="+39 340 189 3053" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormField>

            <FormField label="Email Address">
              <Input type="email" placeholder="rossella@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Passport Number">
              <Input placeholder="e.g. EC 8932 110" value={passportNum} onChange={(e) => setPassportNum(e.target.value)} />
            </FormField>

            <FormField label="Passport Expiry Date">
              <Input type="date" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Emergency Contact Name">
              <Input placeholder="e.g. Luca Cescon" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
            </FormField>

            <FormField label="Emergency Contact Phone">
              <Input placeholder="+39 340 998 7711" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
            </FormField>
          </div>

          <FormField label="Dietary Requirements">
            <Input placeholder="e.g. Vegetarian, Gluten-Free, Halal..." value={dietary} onChange={(e) => setDietary(e.target.value)} />
          </FormField>

          <FormField label="Special Travel Notes">
            <Textarea placeholder="Special preferences or notes..." value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} />
          </FormField>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddGuestModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveGuest}>
              Save Guest Profile
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
