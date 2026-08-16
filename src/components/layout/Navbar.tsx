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
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-xl shadow-slate-950/50"
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Wander<span className="text-emerald-400">Luxe</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Travel AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            {mainNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-colors relative flex items-center gap-1.5"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="glow"
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
            className="md:hidden p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
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
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {mainNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800/60 text-slate-200 hover:text-emerald-400 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-slate-400">{item.description}</span>
                    )}
                  </div>
                  {item.badge ? (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-500" />
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
