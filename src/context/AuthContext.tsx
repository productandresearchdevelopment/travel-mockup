"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types/travelOps";
import usersData from "@/data/users.json";

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => User | null;
  logout: () => void;
  users: User[];
  getRoleDashboardPath: (role: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const users = usersData as User[];

  const getRoleDashboardPath = (role: UserRole): string => {
    switch (role) {
      case "operation_manager":
        return "/dashboard/operation-manager";
      case "business_manager":
        return "/dashboard/business-manager";
      case "dispatcher":
        return "/dashboard/dispatcher";
      case "fleet":
        return "/dashboard/fleet";
      case "sdm":
        return "/dashboard/sdm";
      case "admin":
        return "/dashboard/finance";
      default:
        return "/dashboard/operation-manager";
    }
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem("qifess_demo_user");
    if (savedUserId) {
      const found = users.find((u) => u.id === savedUserId);
      if (found) setUser(found);
      else setUser(users[0]); // default to OM if invalid
    } else {
      // Default to OM user for prototype convenience if unauthenticated
      setUser(users[0]);
    }
    setIsLoaded(true);
  }, []);

  const login = (email: string, password?: string): User | null => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem("qifess_demo_user", found.id);
      return found;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("qifess_demo_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, users, getRoleDashboardPath }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
