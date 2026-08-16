"use client";

import React from "react";
import { faqData } from "@/config/faq";
import { Heading } from "@/components/ui/Heading";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";

export function FAQSection() {
  const accordionItems = faqData.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <Section id="faq" ambientGlow="emerald">
      <div className="flex flex-col items-center space-y-12 text-center max-w-4xl mx-auto">
        <Heading
          as="h2"
          align="center"
          badge="Got Questions?"
          subtitle="Everything you need to know about WanderLuxe memberships, AI itinerary customization, and resort room perks."
        >
          Frequently Asked Questions
        </Heading>

        <Accordion items={accordionItems} defaultExpanded={["faq-1"]} className="text-left" />
      </div>
    </Section>
  );
}
