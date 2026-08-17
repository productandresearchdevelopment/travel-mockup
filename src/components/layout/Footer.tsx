import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#080D14] border-t border-[#E4E7EC] dark:border-[#202B38] pt-16 pb-12 text-[#667085] dark:text-[#A7B1C0] relative overflow-hidden font-sans">
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-[#E4E7EC] dark:border-[#202B38]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/logo-qifess.png"
                alt="QIFESS Travel Logo"
                width={160}
                height={42}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-[#667085] dark:text-[#A7B1C0] max-w-sm leading-relaxed">
              Enterprise Operations & Travel Control Management System. Integrated Bromo, Ijen, Tumpak Sewu, and Bali Overland excursions.
            </p>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-white">Corridors</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#destinations" className="hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors">
                  Mount Bromo & Sea of Sand
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors">
                  Ijen Crater Blue Fire
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors">
                  Bali Island Overland 5D4N
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 - Control Workspaces */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-white">Control Workspaces</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors">
                  Business Manager Control Tower
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors">
                  Dispatcher Clearance Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 - Trust & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-white">Guarantees</h4>
            <div className="space-y-2 text-xs text-[#667085] dark:text-[#A7B1C0]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] dark:text-[#32D583] shrink-0 mt-0.5" />
                <span>100% On-Time Departure SLA</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF] shrink-0 mt-0.5" />
                <span>Enterprise Travel Operations System</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#98A2B3] dark:text-[#667085] gap-4">
          <p>© {new Date().getFullYear()} QIFESS Travel Technologies Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
