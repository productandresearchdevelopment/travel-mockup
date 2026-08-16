"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { pricingTiers } from "@/config/pricing";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { formatCurrency } from "@/utils/formatters";
import { fadeIn, staggerContainer } from "@/utils/animation";

export interface PricingSectionProps {
  onSelectTier?: (tierId: string) => void;
}

export function PricingSection({ onSelectTier }: PricingSectionProps) {
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  return (
    <Section id="pricing" ambientGlow="emerald">
      <div className="flex flex-col items-center space-y-12 text-center">
        {/* Header */}
        <Heading
          as="h2"
          align="center"
          badge="VIP Membership Tiers"
          subtitle="Select your preferred annual Travel Pass. Unlock instant suite upgrades, lounge access, and dedicated AI concierge support."
        >
          Exclusive Luxury Travel Passes
        </Heading>

        {/* Monthly / Annual Toggle Switch */}
        <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-full border border-slate-800 backdrop-blur-xl">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              !annualBilling
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              annualBilling
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Annual Pass</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-950/30 font-extrabold uppercase">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left"
        >
          {pricingTiers.map((tier) => {
            const price = annualBilling ? tier.priceAnnually : tier.priceMonthly;

            return (
              <motion.div key={tier.id} variants={fadeIn("up", 0.1)}>
                <Card
                  className={`h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    tier.popular
                      ? "bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/15"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-l from-emerald-500 to-teal-500 text-slate-950 text-[10px] font-black uppercase px-6 py-1.5 rounded-bl-2xl tracking-widest shadow-md">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div>
                    <CardHeader className="p-8 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={tier.popular ? "emerald" : "glass"}>
                          {tier.name}
                        </Badge>
                      </div>

                      <div className="pt-2 flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white">
                          {formatCurrency(price)}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">/ month</span>
                      </div>

                      <CardDescription className="text-xs text-slate-400 leading-relaxed">
                        {tier.tagline}
                      </CardDescription>
                    </CardHeader>

                    {/* Features List */}
                    <CardContent className="p-8 pt-0 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                        Pass Privileges Included:
                      </div>
                      {tier.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </CardContent>
                  </div>

                  {/* Card CTA */}
                  <CardFooter className="p-8 bg-slate-950/40 border-t border-slate-800/80">
                    <Button
                      variant={tier.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => {
                        if (onSelectTier) onSelectTier(tier.id);
                      }}
                    >
                      {tier.ctaText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
