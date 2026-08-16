"use client";

import React from "react";
import { OperationalRole } from "@/types/travelOps";

interface RoleSelectorProps {
  currentRole: OperationalRole;
  onSelectRole: (role: OperationalRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = () => {
  // Role selection is locked to the logged-in demo user session.
  // No role switcher UI is displayed in the enterprise SaaS application shell.
  return null;
};
