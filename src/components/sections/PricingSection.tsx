"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { pricingTiers } from "@/config/pricing";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { formatCurrency } from "@/utils/formatters";
import { fadeIn, staggerContainer } from "@/utils/animation";

export interface PricingSectionProps {
  onSelectTier?: (tierId: string) => void;
}

export function PricingSection({ onSelectTier }: PricingSectionProps) {
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  return (
    <Section id="pricing">
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
        <div className="flex items-center gap-2 bg-[#F9FAFB] dark:bg-[#101822] p-1.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38]">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !annualBilling
                ? "bg-white dark:bg-[#1A2634] text-[#172033] dark:text-white shadow-xs"
                : "text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              annualBilling
                ? "bg-[#2563EB] dark:bg-[#4F8CFF] text-white shadow-xs"
                : "text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white"
            }`}
          >
            <span>Annual Pass</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-extrabold uppercase">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left font-sans"
        >
          {pricingTiers.map((tier) => {
            const price = annualBilling ? tier.priceAnnually : tier.priceMonthly;

            return (
              <motion.div key={tier.id} variants={fadeIn("up", 0.1)}>
                <Card
                  className={`h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    tier.popular
                      ? "bg-white dark:bg-[#101822] border-2 border-[#2563EB] dark:border-[#4F8CFF] shadow-lg"
                      : "bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38]"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-[#2563EB] dark:bg-[#4F8CFF] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <CardHeader>
                    <CardDescription>{tier.tagline}</CardDescription>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-3xl font-extrabold text-[#172033] dark:text-white font-mono">
                        {formatCurrency(price)}
                      </span>
                      <span className="text-xs text-[#667085] dark:text-[#A7B1C0]">
                        /{annualBilling ? "yr" : "mo"}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-1">
                    <div className="text-xs font-bold text-[#172033] dark:text-white uppercase tracking-wider border-b border-[#E4E7EC] dark:border-[#202B38] pb-2">
                      Included Privileges:
                    </div>
                    <ul className="space-y-2 text-xs">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#667085] dark:text-[#A7B1C0]">
                          <Check className="w-4 h-4 text-[#16A34A] dark:text-[#32D583] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant={tier.popular ? "primary" : "outline"}
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
