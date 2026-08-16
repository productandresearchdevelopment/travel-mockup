"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { testimonialsData } from "@/config/faq";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { fadeIn, staggerContainer } from "@/utils/animation";

export function TestimonialsSection() {
  return (
    <Section id="testimonials" ambientGlow="purple">
      <div className="flex flex-col items-center space-y-16 text-center">
        <Heading
          as="h2"
          align="center"
          badge="Verified Reviews"
          subtitle="Discover how discerning founders, executives, and luxury travelers experience the world with WanderLuxe."
        >
          Trusted by Global High-Net-Worth Travelers
        </Heading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left"
        >
          {testimonialsData.map((test) => (
            <motion.div key={test.id} variants={fadeIn("up", 0.1)}>
              <Card className="h-full bg-slate-900/60 border-slate-800/80 hover:border-emerald-500/40 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/40 shrink-0">
                    <Image
                      src={test.avatar}
                      alt={test.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <h4 className="text-sm font-bold text-white truncate">{test.name}</h4>
                    <span className="text-xs text-slate-400 truncate">{test.role}</span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {test.destination}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
