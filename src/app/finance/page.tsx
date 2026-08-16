"use client";

import React, { useState } from "react";
import {
  TourBopRecord,
  FinanceExpense,
  Tour,
} from "@/types/travelOps";
import {
  initialBopRecords,
  initialExpenses,
  initialTours,
} from "@/data/mockData";

import { AppLayout } from "@/components/ops/AppLayout";
import { FinanceBopView } from "@/components/ops/views/FinanceBopView";
import { TourCostDetailModal } from "@/components/ops/modals/TourCostDetailModal";

export default function FinanceControlPage() {
  const [bopRecords] = useState<TourBopRecord[]>(initialBopRecords);
  const [expenses] = useState<FinanceExpense[]>(initialExpenses);
  const [tours] = useState<Tour[]>(initialTours);

  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [selectedTourCostId, setSelectedTourCostId] = useState<string | null>(null);

  const handleSelectTourCostDetail = (tourId: string) => {
    setSelectedTourCostId(tourId);
    setIsCostModalOpen(true);
  };

  const selectedTourCost = tours.find((t) => t.id === selectedTourCostId) || tours[0] || null;

  return (
    <AppLayout>
      <FinanceBopView
        bopRecords={bopRecords}
        expenses={expenses}
        tours={tours}
        onSelectTourCostDetail={handleSelectTourCostDetail}
      />

      <TourCostDetailModal
        isOpen={isCostModalOpen}
        tour={selectedTourCost}
        expenses={expenses}
        onClose={() => setIsCostModalOpen(false)}
      />
    </AppLayout>
  );
}
