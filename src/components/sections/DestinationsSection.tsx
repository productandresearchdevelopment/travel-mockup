"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Sparkles, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { destinationsData } from "@/config/destinations";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { formatCurrency } from "@/utils/formatters";
import { fadeIn, staggerContainer } from "@/utils/animation";

export interface DestinationsSectionProps {
  onOpenBooking?: (destinationId: string) => void;
}

export function DestinationsSection({ onOpenBooking }: DestinationsSectionProps) {
  const [activeRegion, setActiveRegion] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Destinations", badge: "6" },
    { id: "europe", label: "Europe", badge: "3" },
    { id: "asia", label: "Asia & Pacific", badge: "1" },
    { id: "tropical", label: "Tropical Islands", badge: "1" },
    { id: "americas", label: "Americas", badge: "1" },
  ];

  const filteredDestinations = destinationsData.filter((dest) => {
    if (activeRegion === "all") return true;
    return dest.region === activeRegion;
  });

  return (
    <Section id="destinations" ambientGlow="emerald" gridFlare>
      <div className="flex flex-col items-center space-y-12 text-center">
        {/* Header */}
        <Heading
          as="h2"
          align="center"
          badge="Curated Sanctuaries"
          subtitle="Explore hand-picked 5-star villas, private island suites, and alpine retreats verified by our global luxury travel architects."
        >
          World-Class Destinations & Private Estates
        </Heading>

        {/* Region Tabs */}
        <Tabs tabs={filterTabs} activeTab={activeRegion} onChange={setActiveRegion} />

        {/* Destination Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left"
        >
          {filteredDestinations.map((dest) => (
            <motion.div key={dest.id} variants={fadeIn("up", 0.1)}>
              <Card className="h-full flex flex-col group border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-emerald-500/50">
                {/* Image Header with Badges */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge variant="glass" className="backdrop-blur-md">
                      <MapPin className="w-3 h-3 text-emerald-400 mr-1" />
                      {dest.country}
                    </Badge>
                    {dest.featured && (
                      <Badge variant="emerald" icon={<Sparkles className="w-3 h-3" />}>
                        VIP FEATURED
                      </Badge>
                    )}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-white">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                    <span className="text-slate-400">({dest.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Header */}
                <CardHeader className="p-6 flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {dest.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>

                  {/* Highlights List */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center text-[11px] font-medium text-slate-300 bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/50"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1" />
                        {h}
                      </span>
                    ))}
                  </div>
                </CardHeader>

                {/* Card Footer with Price & Booking trigger */}
                <CardFooter className="p-6 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Starting From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-emerald-400">
                        {formatCurrency(dest.pricePerNight)}
                      </span>
                      <span className="text-xs text-slate-400">/ night</span>
                    </div>
                  </div>

                  <Button
                    variant="glow"
                    size="sm"
                    rightIcon={<ArrowUpRight className="w-4 h-4" />}
                    onClick={() => {
                      if (onOpenBooking) onOpenBooking(dest.id);
                    }}
                  >
                    Reserve
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
