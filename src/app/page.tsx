"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ItineraryPlannerSection } from "@/components/sections/ItineraryPlannerSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { BookingModalSection } from "@/components/sections/BookingModalSection";

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>("dest-1");

  const handleOpenBooking = (destId?: string) => {
    if (destId) {
      setSelectedDestinationId(destId);
    }
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenBooking("dest-1")} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection onOpenBooking={handleOpenBooking} />
        <DestinationsSection onOpenBooking={handleOpenBooking} />
        <FeaturesSection />
        <ItineraryPlannerSection />
        <TestimonialsSection />
        <PricingSection onSelectTier={() => handleOpenBooking("dest-1")} />
        <FAQSection />
        <NewsletterSection />
      </main>

      {/* Footer Shell */}
      <Footer />

      {/* Interactive Reservation Modal */}
      <BookingModalSection
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        selectedDestinationId={selectedDestinationId}
      />
    </div>
  );
}
