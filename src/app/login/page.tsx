"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/travelOps";
import usersData from "@/data/users.json";
import {
  Compass,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Truck,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, getRoleDashboardPath } = useAuth();

  const [email, setEmail] = useState("andi@qifess-demo.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const loggedUser = login(email, password);
    if (loggedUser) {
      const redirectPath = getRoleDashboardPath(loggedUser.role);
      router.push(redirectPath);
    } else {
      setErrorMsg("Invalid demo credentials. Please click a demo account below.");
    }
  };

  const handleShortcutClick = (userEmail: string, role: UserRole) => {
    setEmail(userEmail);
    setPassword("demo123");
    const loggedUser = login(userEmail, "demo123");
    if (loggedUser) {
      const redirectPath = getRoleDashboardPath(loggedUser.role);
      router.push(redirectPath);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header Branding */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              QIFESS <span className="text-cyan-400 font-normal text-xs uppercase tracking-widest">Travel Ops</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>v2.6 Enterprise Sandbox</span>
        </div>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-4 items-center">
        {/* LEFT COLUMN: Enterprise Operational Product Statement & Visual Stats */}
        <div className="lg:col-span-7 space-y-6 pr-0 lg:pr-8">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider inline-block">
              Centralized Tour Operations System
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise Control System for Java & Bali Tour Operations
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Consolidate OTA bookings (GetYourGuide, Direct Web), orchestrate 4x4 Bromo & Ijen departures, track fleet readiness, manage freelance guide rosters, and reconcile field BOP in real-time.
            </p>
          </div>

          {/* Operational Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
              <span className="text-xs text-slate-400 block">Daily Departures</span>
              <div className="text-2xl font-extrabold text-white font-mono">14 Tours</div>
              <span className="text-[10px] text-emerald-400 font-medium">Yogyakarta → Bali</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
              <span className="text-xs text-slate-400 block">Fleet Readiness</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">92.0%</div>
              <span className="text-[10px] text-emerald-400 font-medium">Hiace & 4x4 Jeeps</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
              <span className="text-xs text-slate-400 block">Handover Success</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono">98.4%</div>
              <span className="text-[10px] text-cyan-400 font-medium">Ketapang Port</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sophisticated Login Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Welcome back</h2>
            <p className="text-xs text-slate-400">Sign in to your QIFESS Travel Operations workspace</p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-xs text-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 font-medium transition-colors"
                  placeholder="e.g. andi@qifess-demo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 font-medium transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <span className="text-slate-500 text-[11px]">Demo Mode Active</span>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider mt-2"
            >
              <span>Sign In to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* DEMO ACCOUNTS CONVENIENCE SHORTCUTS */}
          <div className="space-y-2.5 pt-4 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              1-Click Demo Accounts (Select Role)
            </span>

            <div className="grid grid-cols-1 gap-1.5">
              {usersData.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleShortcutClick(u.email, u.role as UserRole)}
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-850 p-2.5 rounded-xl border border-slate-800/80 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold font-mono text-xs flex items-center justify-center border border-cyan-500/20">
                      {u.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-200 group-hover:text-cyan-400 transition-colors">
                        {u.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{u.roleLabel} • {u.region}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Login →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 border-t border-slate-900">
        QIFESS Travel Operations System • Static Interactive Prototype Mode
      </footer>
    </div>
  );
}
