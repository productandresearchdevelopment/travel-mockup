"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { UserRole } from "@/types/travelOps";
import usersData from "@/data/users.json";
import {
  Compass,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, getRoleDashboardPath } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#080D14] text-[#172033] dark:text-[#F8FAFC] font-sans flex flex-col justify-between selection:bg-[#2563EB] selection:text-white transition-colors duration-200">
      {/* Top Header Branding & Theme Toggle */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] dark:bg-[#4F8CFF] text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-[#172033] dark:text-white flex items-center gap-1.5">
              QIFESS <span className="text-[#2563EB] dark:text-[#4F8CFF] font-semibold text-xs uppercase tracking-widest">Travel Ops</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] text-[#172033] dark:text-[#A7B1C0] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#2563EB]" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          <div className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>v2.6 Enterprise Sandbox</span>
          </div>
        </div>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-4 items-center">
        {/* LEFT COLUMN: Enterprise Operational Product Statement & Visual Stats */}
        <div className="lg:col-span-7 space-y-6 pr-0 lg:pr-8">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#4F8CFF] border border-blue-200 dark:border-blue-800/50 text-xs font-bold uppercase tracking-wider inline-block">
              Centralized Tour Operations System
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172033] dark:text-white tracking-tight leading-tight">
              Enterprise Control System for Java & Bali Tour Operations
            </h1>
            <p className="text-[#667085] dark:text-[#A7B1C0] text-sm leading-relaxed max-w-2xl">
              Consolidate OTA bookings (GetYourGuide, Direct Web), orchestrate 4x4 Bromo & Ijen departures, track fleet readiness, manage freelance guide rosters, and reconcile field BOP in real-time.
            </p>
          </div>

          {/* Operational Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] block">Daily Departures</span>
              <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">14 Tours</div>
              <span className="text-[10px] text-[#16A34A] dark:text-[#32D583] font-medium">Yogyakarta → Bali</span>
            </div>

            <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] block">Fleet Readiness</span>
              <div className="text-2xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">92.0%</div>
              <span className="text-[10px] text-[#16A34A] dark:text-[#32D583] font-medium">Hiace & 4x4 Jeeps</span>
            </div>

            <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-1 shadow-xs">
              <span className="text-xs text-[#667085] dark:text-[#A7B1C0] block">Handover Success</span>
              <div className="text-2xl font-extrabold text-[#2563EB] dark:text-[#4F8CFF] font-mono">98.4%</div>
              <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF] font-medium">Ketapang Port</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sophisticated Login Form */}
        <div className="lg:col-span-5 bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#172033] dark:text-white tracking-tight">Welcome back</h2>
            <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">Sign in to your QIFESS Travel Operations workspace</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 p-3 rounded-xl text-xs text-[#DC2626] dark:text-[#F97066]">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#98A2B3] dark:text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl pl-10 pr-3 py-2.5 text-[#172033] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] dark:focus:border-[#4F8CFF] font-medium transition-colors"
                  placeholder="e.g. andi@qifess-demo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#172033] dark:text-[#A7B1C0] font-semibold mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#98A2B3] dark:text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#E4E7EC] dark:border-[#202B38] rounded-xl pl-10 pr-10 py-2.5 text-[#172033] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] dark:focus:border-[#4F8CFF] font-medium transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#98A2B3] dark:text-[#667085] hover:text-[#172033] dark:hover:text-[#F8FAFC] absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#667085] dark:text-[#A7B1C0] hover:text-[#172033] dark:hover:text-[#F8FAFC]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <span className="text-[#98A2B3] dark:text-[#667085] text-[11px]">Demo Mode Active</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white font-bold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider mt-2"
            >
              <span>Sign In to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* DEMO ACCOUNTS CONVENIENCE SHORTCUTS */}
          <div className="space-y-2.5 pt-4 border-t border-[#E4E7EC] dark:border-[#202B38]">
            <span className="text-[11px] font-bold text-[#667085] dark:text-[#A7B1C0] uppercase tracking-wider block">
              1-Click Demo Accounts (Select Role)
            </span>

            <div className="grid grid-cols-1 gap-1.5">
              {usersData.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleShortcutClick(u.email, u.role as UserRole)}
                  className="flex items-center justify-between bg-[#F9FAFB] dark:bg-[#131D28] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634] p-2.5 rounded-xl border border-[#E4E7EC] dark:border-[#202B38] transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 text-[#2563EB] dark:text-[#4F8CFF] font-bold font-mono text-xs flex items-center justify-center border border-[#2563EB]/20">
                      {u.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#172033] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#4F8CFF] transition-colors">
                        {u.name}
                      </div>
                      <div className="text-[10px] text-[#667085] dark:text-[#A7B1C0]">{u.roleLabel} • {u.region}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#2563EB] dark:text-[#4F8CFF] opacity-0 group-hover:opacity-100 transition-opacity">
                    Login →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-[#667085] dark:text-[#667085] border-t border-[#E4E7EC] dark:border-[#202B38]">
        QIFESS Travel Operations System • Static Interactive Prototype Mode
      </footer>
    </div>
  );
}
