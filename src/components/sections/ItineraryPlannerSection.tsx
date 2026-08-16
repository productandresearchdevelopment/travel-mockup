"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Coffee, Utensils, Compass, Sun, Moon } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function ItineraryPlannerSection() {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const itineraryDays = [
    {
      day: 1,
      title: "Arrival & Coastal Sunset Aperitivo",
      location: "Positano, Amalfi Coast",
      items: [
        {
          time: "02:00 PM",
          icon: <Compass className="w-4 h-4 text-emerald-400" />,
          title: "Helicopter Transfer & Check-In",
          desc: "Private chopper landing from Naples Int'l Airport to Le Sirenuse Cliffside Suite.",
        },
        {
          time: "06:30 PM",
          icon: <Sun className="w-4 h-4 text-amber-400" />,
          title: "Private Riva Yacht Sunset Cruise",
          desc: "Champagne, fresh local figs, and coastal cave exploration.",
        },
        {
          time: "08:45 PM",
          icon: <Utensils className="w-4 h-4 text-cyan-400" />,
          title: "Michelin Tasting Menu at La Sponda",
          desc: "400-candlelit dining room reserved under WanderLuxe VIP table code.",
        },
      ],
    },
    {
      day: 2,
      title: "Capri Island & Blue Grotto Speakeasy",
      location: "Capri & Anacapri",
      items: [
        {
          time: "09:30 AM",
          icon: <Coffee className="w-4 h-4 text-emerald-400" />,
          title: "Al Fresco Terrace Lemon Breakfast",
          desc: "Freshly roasted Italian espresso and handmade lemon ricotta pastries.",
        },
        {
          time: "11:00 AM",
          icon: <Compass className="w-4 h-4 text-teal-400" />,
          title: "Private Blue Grotto Access",
          desc: "Exclusive pre-opening entry prior to public crowd arrival.",
        },
        {
          time: "09:00 PM",
          icon: <Moon className="w-4 h-4 text-purple-400" />,
          title: "Anacapri Cliffside Lounge & Cocktails",
          desc: "Sommelier wine flight & artisanal wood-fired Neapolitan pizza.",
        },
      ],
    },
    {
      day: 3,
      title: "Ravello Gardens & Classical Concert",
      location: "Ravello Mountain Peak",
      items: [
        {
          time: "10:30 AM",
          icon: <Compass className="w-4 h-4 text-emerald-400" />,
          title: "Villa Cimbrone Infinity Terrace Walk",
          desc: "Panoramic photography session with personal WanderLuxe photographer.",
        },
        {
          time: "01:00 PM",
          icon: <Utensils className="w-4 h-4 text-amber-400" />,
          title: "Cliffside Lemon Grove Organic Lunch",
          desc: "Farm-to-table lunch & limoncello masterclass with 4th-gen estate family.",
        },
        {
          time: "07:30 PM",
          icon: <Moon className="w-4 h-4 text-cyan-400" />,
          title: "Ravello Festival Open-Air Symphony",
          desc: "Front-row amphitheater seats suspended over the Tyrrhenian sea.",
        },
      ],
    },
  ];

  const currentDayData = itineraryDays.find((d) => d.day === selectedDay) || itineraryDays[0];

  return (
    <Section id="planner" ambientGlow="emerald">
      <div className="flex flex-col items-center space-y-12 text-center">
        <Heading
          as="h2"
          align="center"
          badge="Interactive Preview"
          subtitle="Experience how our 2026 AI engine builds seamless day-by-day itineraries tailored to your unique vacation rhythm."
        >
          Automated 7-Day Precision Itinerary Demo
        </Heading>

        {/* Interactive Planner Card Container */}
        <div className="w-full max-w-4xl mx-auto text-left">
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Amalfi Coast Luxury Escape</h3>
                    <Badge variant="emerald" className="text-[9px]">AI GENERATED</Badge>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" /> Positano, Ravello & Capri, Italy
                  </p>
                </div>
              </div>

              {/* Day Switcher Buttons */}
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-full border border-slate-800">
                {itineraryDays.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDay(d.day)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedDay === d.day
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Day {d.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Day Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="pt-8 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400">Day {currentDayData.day}:</span> {currentDayData.title}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">{currentDayData.location}</span>
                </div>

                {/* Timeline items */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
                  {currentDayData.items.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 group">
                      <div className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-slate-950 border border-slate-700 group-hover:border-emerald-400 flex items-center justify-center transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 w-full hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <span className="text-sm font-bold text-white">{item.title}</span>
                          </div>
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed pl-6">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </Section>
  );
}
