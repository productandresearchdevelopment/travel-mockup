"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  initialCrews,
  initialTours,
  initialAttendances,
  initialFieldReports,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { CrewDetailFullView } from "@/components/ops/views/CrewDetailFullView";

export default function CrewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [crews] = useState(initialCrews);
  const [tours] = useState(initialTours);
  const [attendances] = useState(initialAttendances);
  const [fieldReports] = useState(initialFieldReports);

  const crew = crews.find((c) => c.id.toLowerCase() === resolvedParams.id.toLowerCase()) || crews[0];

  return (
    <AppLayout>
      <CrewDetailFullView
        crew={crew}
        tours={tours}
        attendances={attendances}
        fieldReports={fieldReports}
        onBack={() => router.push("/crew")}
      />
    </AppLayout>
  );
}
