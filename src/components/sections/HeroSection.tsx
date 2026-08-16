"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Search, Shield, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { fadeIn, scaleUp } from "@/utils/animation";

export interface HeroSectionProps {
  onOpenBooking?: (destinationId?: string) => void;
}

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const [destinationInput, setDestinationInput] = useState("Amalfi Coast, Italy");
  const [guests, setGuests] = useState("2 Guests");

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#0f172a_0%,#020617_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/15 to-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top Pill Badge */}
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            className="flex justify-center"
          >
            <Badge
              variant="emerald"
              icon={<Sparkles className="w-3.5 h-3.5" />}
              className="py-1.5 px-4 text-xs font-semibold tracking-widest"
            >
              NEXT-GEN LUXURY TRAVEL 2026
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            AI-Curated Vacations & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Private Sanctuary Retreats
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Unlock bespoke itineraries, guaranteed 5-star suite upgrades, private jet seat-sharing, and 24/7 VIP AI concierge assistance across the world’s most coveted destinations.
          </motion.p>

          {/* Interactive Search Widget Bar */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="show"
            className="p-3 bg-slate-900/80 border border-slate-800/90 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-slate-950/80 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Destination Input */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-950/60 rounded-2xl border border-slate-800/60 focus-within:border-emerald-500/50 transition-colors">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Destination</span>
                  <input
                    type="text"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    placeholder="Where to next?"
                    className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none truncate"
                  />
                </div>
              </div>

              {/* Guests Select */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-950/60 rounded-2xl border border-slate-800/60 focus-within:border-emerald-500/50 transition-colors">
                <Users className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Travelers</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
                  >
                    <option value="1 Guest" className="bg-slate-900 text-white">1 Solo Traveler</option>
                    <option value="2 Guests" className="bg-slate-900 text-white">2 Adult Couple</option>
                    <option value="4 Guests" className="bg-slate-900 text-white">4 Family & Friends</option>
                    <option value="6+ Guests" className="bg-slate-900 text-white">6+ Villa Party</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="lg"
                className="h-full py-3.5 sm:py-0 w-full"
                leftIcon={<Search className="w-4 h-4" />}
                onClick={() => {
                  if (onOpenBooking) onOpenBooking("dest-1");
                }}
              >
                Search Retreats
              </Button>
            </div>
          </motion.div>

          {/* Social Proof & Metrics */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/60 max-w-3xl mx-auto text-left"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-xl sm:text-2xl">
                <span>500+</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Bespoke Resorts</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-white font-bold text-xl sm:text-2xl">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.98 / 5</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">10,000+ Traveler Reviews</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-xl sm:text-2xl">
                <span>24/7</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">AI Concierge Response</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-white font-bold text-xl sm:text-2xl">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100%</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Verified Lowest Price</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
