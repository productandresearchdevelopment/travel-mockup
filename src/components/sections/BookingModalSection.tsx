"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { destinationsData } from "@/config/destinations";
import { pricingTiers } from "@/config/pricing";
import { formatCurrency } from "@/utils/formatters";

export interface BookingModalSectionProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestinationId?: string;
}

export function BookingModalSection({
  isOpen,
  onClose,
  selectedDestinationId,
}: BookingModalSectionProps) {
  const selectedDest =
    destinationsData.find((d) => d.id === selectedDestinationId) || destinationsData[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelers: "2",
    startDate: "2026-09-15",
    endDate: "2026-09-22",
    membershipTier: "first-class",
    specialRequests: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? "Reservation Requested!" : `Reserve ${selectedDest.title}`}
      description={
        isSuccess
          ? "Your QIFESS Travel Operations Concierge will contact you within 15 minutes."
          : `Customize your travel dates and unlock guaranteed VIP perks at ${selectedDest.country}.`
      }
      maxWidth="xl"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-white">Booking Confirmation Pending</h4>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              We’ve reserved your provisional dates at <strong className="text-white">{selectedDest.title}</strong> ({formData.startDate} to {formData.endDate}).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Destination:</span>
              <span className="font-semibold text-white">{selectedDest.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rate / Night:</span>
              <span className="font-semibold text-emerald-400">{formatCurrency(selectedDest.pricePerNight)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Travelers:</span>
              <span className="font-semibold text-white">{formData.travelers} Guests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Selected Perks:</span>
              <span className="font-semibold text-emerald-400">Free Upgrade + $500 Folio Credit</span>
            </div>
          </div>

          <Button variant="primary" size="lg" onClick={handleReset} className="w-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Destination Preview Strip */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <Image
                src={selectedDest.image}
                alt={selectedDest.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {selectedDest.country}
              </span>
              <h5 className="text-base font-bold text-white truncate">{selectedDest.title}</h5>
              <span className="text-xs text-slate-400 font-medium">
                From {formatCurrency(selectedDest.pricePerNight)} / night
              </span>
            </div>
          </div>

          {/* User Contact Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Victoria Sterling"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="victoria@apex.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Check-In"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              label="Check-Out"
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Travelers
              </label>
              <select
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="1">1 Solo Traveler</option>
                <option value="2">2 Couple</option>
                <option value="4">4 Guests</option>
                <option value="6+">6+ Full Villa</option>
              </select>
            </div>
          </div>

          {/* Membership Tier */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Apply Travel Pass Tier
            </label>
            <select
              value={formData.membershipTier}
              onChange={(e) => setFormData({ ...formData, membershipTier: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500"
            >
              {pricingTiers.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name} (${tier.priceAnnually}/mo) — Includes {tier.features[2]}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <Textarea
            label="Special Requests / Dietary preferences"
            placeholder="e.g. Private yacht charter on day 2, organic vegan breakfast..."
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          />

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Confirm VIP Reservation Request
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero cancellation fee. Guaranteed lowest VIP member rate.</span>
          </div>
        </form>
      )}
    </Modal>
  );
}
