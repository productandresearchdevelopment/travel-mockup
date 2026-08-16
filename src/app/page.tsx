"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootPage() {
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
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#080D14] text-[#172033] dark:text-white flex items-center justify-center font-sans text-xs font-mono">
      <div className="space-y-2 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] dark:border-[#4F8CFF] border-t-transparent animate-spin mx-auto"></div>
        <div>Loading QIFESS Travel Operations Workspace...</div>
      </div>
    </div>
  );
}
