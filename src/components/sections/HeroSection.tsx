"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Search } from "lucide-react";
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
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden font-sans">
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
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#172033] dark:text-white leading-[1.1]"
          >
            AI-Curated Vacations & <br />
            <span className="text-[#2563EB] dark:text-[#4F8CFF]">
              Private Sanctuary Retreats
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="text-base sm:text-xl text-[#667085] dark:text-[#A7B1C0] max-w-2xl mx-auto leading-relaxed"
          >
            Unlock bespoke itineraries, guaranteed 5-star suite upgrades, private jet seat-sharing, and 24/7 VIP AI concierge assistance across the world’s most coveted destinations.
          </motion.p>

          {/* Interactive Search Widget Bar */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="show"
            className="p-3 bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] rounded-3xl shadow-lg max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Input 1: Destination */}
              <div className="sm:col-span-6 flex items-center gap-3 px-4 py-2 bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl">
                <MapPin className="w-5 h-5 text-[#2563EB] dark:text-[#4F8CFF] shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-[#667085] dark:text-[#A7B1C0]">
                    Destination
                  </span>
                  <input
                    type="text"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#172033] dark:text-white focus:outline-none"
                    placeholder="Search country or city..."
                  />
                </div>
              </div>

              {/* Input 2: Guests */}
              <div className="sm:col-span-3 flex items-center gap-3 px-4 py-2 bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] rounded-2xl">
                <div className="text-left w-full">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-[#667085] dark:text-[#A7B1C0]">
                    Guests
                  </span>
                  <input
                    type="text"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#172033] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="sm:col-span-3">
                <Button
                  variant="primary"
                  className="w-full py-3.5 text-xs font-bold"
                  leftIcon={<Search className="w-4 h-4" />}
                  onClick={() => {
                    if (onOpenBooking) onOpenBooking();
                  }}
                >
                  Explore AI
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
