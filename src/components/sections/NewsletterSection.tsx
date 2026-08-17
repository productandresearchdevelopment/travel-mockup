"use client";

import React, { useState } from "react";
import { Sparkles, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <Section id="newsletter" ambientGlow="purple">
      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800 p-8 sm:p-14 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <Heading
            as="h2"
            align="center"
            subtitle="Subscribe to receive weekly private jet empty-leg flight alerts, flash resort rate drops, and secret 2026 destination drops."
          >
            Unlock Exclusive VIP Private Flight Alerts
          </Heading>

          {submitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center gap-3 text-emerald-400 font-semibold animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <span>You&apos;re on the list! Watch your inbox for priority flight drop alerts.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <Input
                type="email"
                placeholder="Enter your executive email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
                className="bg-slate-950 border-slate-800 focus:border-emerald-500 text-sm h-12"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="shrink-0 h-12 px-8"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Join VIP List
              </Button>
            </form>
          )}

          <p className="text-xs text-slate-500">
            Zero spam. Unsubscribe with 1-click anytime. Encrypted strictly for QIFESS Travel operators.
          </p>
        </div>
      </Card>
    </Section>
  );
}
