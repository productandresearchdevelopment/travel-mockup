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
      icon: <Bot className="w-6 h-6 text-[#2563EB] dark:text-[#4F8CFF]" />,
      title: "2026 AI Itinerary Engine",
      description:
        "Generates minute-by-minute custom vacation schedules aligned with weather patterns, crowd intensity, and your exact aesthetic tastes.",
      badge: "PROPRIETARY",
    },
    {
      id: "feat-2",
      icon: <ShieldCheck className="w-6 h-6 text-[#16A34A] dark:text-[#32D583]" />,
      title: "Guaranteed 5-Star Perks",
      description:
        "Automatic room upgrades upon check-in, $500 annual resort folio credits, and complimentary breakfast at 500+ partner luxury estates.",
      badge: "VIP ACCESS",
    },
    {
      id: "feat-3",
      icon: <Plane className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: "Private Jet Seat Sharing",
      description:
        "Access empty-leg flight alerts and seat sharing options across premier charter jets with up to 70% savings.",
      badge: "EMPTY LEG",
    },
    {
      id: "feat-4",
      icon: <Utensils className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: "Michelin & Secret Tables",
      description:
        "Priority reservations at fully booked 3-star Michelin venues and private chef table dining experiences worldwide.",
      badge: "EXCLUSIVE",
    },
    {
      id: "feat-5",
      icon: <Zap className="w-6 h-6 text-[#D97706] dark:text-[#FDB022]" />,
      title: "Instant Booking & Refunds",
      description:
        "One-click flight, villa, and yacht charter reservations with zero cancellation fees up to 48 hours prior to arrival.",
      badge: "FLEXIBLE",
    },
    {
      id: "feat-6",
      icon: <Smartphone className="w-6 h-6 text-[#2563EB] dark:text-[#4F8CFF]" />,
      title: "Offline VIP Wallet & Pass",
      description:
        "Digital encrypted membership card with instant hotel check-in barcode, lounge entry pass, and offline concierge access.",
      badge: "ENCRYPTED",
    },
  ];

  return (
    <Section id="features">
      <div className="flex flex-col items-center space-y-12 text-center font-sans">
        <Heading
          as="h2"
          align="center"
          badge="AI Travel Capabilities"
          subtitle="Engineered for ultra-high-net-worth travelers demanding precision, privacy, and flawless luxury execution."
        >
          Why Operations Managers Choose QIFESS Travel
        </Heading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left"
        >
          {features.map((feat) => (
            <motion.div key={feat.id} variants={fadeIn("up", 0.1)}>
              <Card className="h-full bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] hover:border-[#2563EB]/40 dark:hover:border-[#4F8CFF]/40 transition-all p-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38]">
                      {feat.icon}
                    </div>
                    <Badge variant="blue" className="text-[9px]">
                      {feat.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{feat.title}</CardTitle>
                  <CardDescription className="mt-2 leading-relaxed">
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
