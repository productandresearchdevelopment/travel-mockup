import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Award, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-20 pb-12 text-slate-400 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Wander<span className="text-emerald-400">Luxe</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premiere 2026 AI-driven luxury travel platform. Curating high-altitude chalets, private island sanctuaries, and Michelin experiences across 80+ countries.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#destinations" className="hover:text-emerald-400 transition-colors">
                  Private Island Retreats
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-emerald-400 transition-colors">
                  Alpine Ski Chalets
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-emerald-400 transition-colors">
                  Historic European Villas
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-emerald-400 transition-colors">
                  AI Travel Itinerary Agent
                </Link>
              </li>
              <li>
                <Link href="#planner" className="hover:text-emerald-400 transition-colors">
                  Day-by-Day Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 - Membership */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Memberships</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Voyager Pass
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-emerald-400 transition-colors">
                  First Class Pass
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Black Card Jetsetter
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-emerald-400 transition-colors">
                  Perks & Room Upgrades
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-emerald-400 transition-colors">
                  Disruption Protection
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 - Trust & Security */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Guarantees</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% Price Lock & Lowest VIP Rate Assurance</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Award-winning 2026 AI Travel Innovation</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Carbon Neutral Flight Compensation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WanderLuxe Travel Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
