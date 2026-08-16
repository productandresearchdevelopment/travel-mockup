"use client";

import React, { useState } from "react";
import { initialReportSummary } from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { ReportsAnalyticsView } from "@/components/ops/views/ReportsAnalyticsView";

export default function ReportsLandingPage() {
  const [report] = useState(initialReportSummary);

  return (
    <AppLayout>
      <ReportsAnalyticsView report={report} />
    </AppLayout>
  );
}
