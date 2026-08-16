"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatePresence, motion } from "framer-motion";

export interface NavbarProps {
  onOpenBooking?: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0B111A]/80 backdrop-blur-xl border-b border-[#E4E7EC] dark:border-[#202B38] py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <Container size="xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB] dark:bg-[#4F8CFF] text-white flex items-center justify-center shadow-xs font-bold group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#172033] dark:text-white flex items-center gap-1">
                Wander<span className="text-[#2563EB] dark:text-[#4F8CFF]">Luxe</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#667085] dark:text-[#A7B1C0] font-semibold -mt-1">
                Travel AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#F9FAFB] dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38]">
            {mainNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="px-4 py-2 text-xs font-semibold text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white hover:bg-white dark:hover:bg-[#1A2634] rounded-full transition-colors relative flex items-center gap-1.5"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] font-bold border border-blue-200/60 dark:border-blue-800/40">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={onOpenBooking}
            >
              Plan Trip
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-[#F9FAFB] dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-[#0B111A]/95 backdrop-blur-2xl border-b border-[#E4E7EC] dark:border-[#202B38] px-4 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {mainNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#F9FAFB] dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-white hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-[#667085] dark:text-[#A7B1C0]">{item.description}</span>
                    )}
                  </div>
                  {item.badge ? (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] font-bold">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#98A2B3] dark:text-[#667085]" />
                  )}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  variant="primary"
                  className="w-full"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenBooking) onOpenBooking();
                  }}
                >
                  Start Booking Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
