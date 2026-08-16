"use client";

import React, { useState } from "react";
import { OperationalRole } from "@/types/travelOps";
import { Compass, ShieldCheck, Lock, User, ArrowRight, CheckCircle2, MapPin, Key, Sparkles } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: OperationalRole) => void;
}

const demoAccounts: {
  role: OperationalRole;
  email: string;
  badge: string;
  desc: string;
  iconColor: string;
}[] = [
  {
    role: "Operation Manager (OM)",
    email: "om@qifess.ops",
    badge: "OM Command",
    desc: "Full operational override & SLA monitoring",
    iconColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    role: "Business Manager (BM)",
    email: "bm@qifess.ops",
    badge: "BM Yield & P&L",
    desc: "Yield management & BOP budget sign-off",
    iconColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    role: "Dispatcher",
    email: "dispatcher@qifess.ops",
    badge: "Live Dispatch",
    desc: "Arrivals/departures & handover tracking",
    iconColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    role: "Vehicle / Fleet Management",
    email: "fleet@qifess.ops",
    badge: "Fleet Ops",
    desc: "Odometer, fuel & workshop scheduling",
    iconColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    role: "SDM / Crew Management",
    email: "sdm@qifess.ops",
    badge: "Crew Roster",
    desc: "Driver/Guide rosters & freelance daily staff",
    iconColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<OperationalRole>("Operation Manager (OM)");
  const [email, setEmail] = useState("om@qifess.ops");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectDemoAccount = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin(selectedRole);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Top Brand Bar */}
      <header className="p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              QIFESS <span className="text-emerald-400 font-extrabold text-sm uppercase">Travel Ops</span>
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              East Java & Bali Dispatch Control Terminal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>HQ Malang / Sub-Depot Banyuwangi</span>
        </div>
      </header>

      {/* Main Login Shell */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block">
                Secure Operational Login
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Sign In to QIFESS Control Center
              </h2>
              <p className="text-xs text-slate-400">
                Access real-time tour execution, vehicle fleet dispatch, crew rosters, and field BOP reimbursement management.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Operator Email Address</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@qifess.ops"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-slate-300">Terminal Password</label>
                  <span className="text-[10px] text-blue-400 cursor-pointer hover:underline">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Active Role Selection for Login */}
              <div className="space-y-1 pt-1">
                <label className="block font-semibold text-slate-300">Target Role Session</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as OperationalRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500"
                >
                  {demoAccounts.map((acc) => (
                    <option key={acc.role} value={acc.role}>
                      {acc.role} ({acc.badge})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
                  />
                  <span>Remember session on this station</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white py-3 rounded-xl font-bold text-xs shadow-xl shadow-blue-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Sign In to Operations System</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Demo Accounts Quick Select (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-6 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" /> Demo Role Access
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">1-Click Login</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Click any operational role below to prefill credentials and enter the system:
              </p>

              <div className="space-y-2">
                {demoAccounts.map((acc) => {
                  const isSelected = selectedRole === acc.role;
                  return (
                    <div
                      key={acc.role}
                      onClick={() => handleSelectDemoAccount(acc)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? "bg-slate-900 border-blue-500/60 shadow-lg ring-1 ring-blue-500/40"
                          : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{acc.role}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${acc.iconColor}`}>
                          {acc.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                        <span>{acc.email}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-850 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Encrypted TLS 1.3 Terminal</span>
              <span>v2026.08.16</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer System Status */}
      <footer className="p-4 border-t border-slate-900 text-center text-[11px] text-slate-500 z-10 flex items-center justify-center gap-4">
        <span>© 2026 QIFESS Travel Operations. All Rights Reserved.</span>
        <span>•</span>
        <span className="text-emerald-400 flex items-center gap-1 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Systems 100% Operational
        </span>
      </footer>
    </div>
  );
};
