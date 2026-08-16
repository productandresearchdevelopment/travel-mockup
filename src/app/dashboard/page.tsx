"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, getRoleDashboardPath } = useAuth();

  useEffect(() => {
    if (user) {
      const targetPath = getRoleDashboardPath(user.role);
      router.push(targetPath);
    } else {
      router.push("/login");
    }
  }, [user, getRoleDashboardPath, router]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans text-xs font-mono">
      <div className="space-y-2 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto"></div>
        <div>Redirecting to Role Workspace...</div>
      </div>
    </div>
  );
}
