"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, ShieldCheck, Plane, Utensils, Zap, Smartphone } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { fadeIn, staggerContainer } from "@/utils/animation";

export function FeaturesSection() {
  const features = [
    {
      id: "feat-1",
      icon: <Bot className="w-6 h-6 text-emerald-400" />,
      title: "2026 AI Itinerary Engine",
      description:
        "Generates minute-by-minute custom vacation schedules aligned with weather patterns, crowd intensity, and your exact aesthetic tastes.",
      badge: "PROPRIETARY",
    },
    {
      id: "feat-2",
      icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
      title: "Guaranteed 5-Star Perks",
      description:
        "Automatic room upgrades upon check-in, $500 annual resort folio credits, and complimentary breakfast at 500+ partner luxury estates.",
      badge: "VIP ACCESS",
    },
    {
      id: "feat-3",
      icon: <Plane className="w-6 h-6 text-cyan-400" />,
      title: "Private Jet Seat Sharing",
      description:
        "Access empty-leg flight alerts and seat sharing options across premier charter jets with up to 70% savings.",
      badge: "EMPTY LEG",
    },
    {
      id: "feat-4",
      icon: <Utensils className="w-6 h-6 text-purple-400" />,
      title: "Michelin & Secret Tables",
      description:
        "Priority reservations at fully booked 3-star Michelin venues and private chef table dining experiences worldwide.",
      badge: "EXCLUSIVE",
    },
    {
      id: "feat-5",
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Instant Booking & Refunds",
      description:
        "One-click flight, villa, and yacht charter reservations with zero cancellation fees up to 48 hours prior to arrival.",
      badge: "FLEXIBLE",
    },
    {
      id: "feat-6",
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      title: "Offline VIP Wallet & Pass",
      description:
        "Digital encrypted membership card with instant hotel check-in barcode, lounge entry pass, and offline concierge access.",
      badge: "ENCRYPTED",
    },
  ];

  return (
    <Section id="features" ambientGlow="purple">
      <div className="flex flex-col items-center space-y-16 text-center">
        {/* Header */}
        <Heading
          as="h2"
          align="center"
          badge="Technological Superiority"
          subtitle="Combining advanced generative AI algorithms with elite human lifestyle managers to redefine luxury global travel."
        >
          Engineered for Effortless High-End Travel
        </Heading>

        {/* Feature Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left"
        >
          {features.map((feat) => (
            <motion.div key={feat.id} variants={fadeIn("up", 0.1)}>
              <Card className="h-full bg-slate-900/40 border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/80">
                <CardHeader className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-md">
                      {feat.icon}
                    </div>
                    {feat.badge && (
                      <Badge variant="glass" className="text-[10px]">
                        {feat.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold">{feat.title}</CardTitle>
                  <CardDescription className="text-slate-400 leading-relaxed text-sm">
                    {feat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
