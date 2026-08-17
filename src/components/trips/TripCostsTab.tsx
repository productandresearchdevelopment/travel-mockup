"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { mockTripCostsData } from "@/data/mockTripCostsData";
import { TripOperationalCostItem, CostCategory, CostSource, CostStatus } from "@/types/tripCost";
import {
  DollarSign,
  Plus,
  Lock,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ExternalLink,
  Layers,
  PanelRightClose,
  TrendingUp,
  FileText,
  Building,
  Truck,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface TripCostsTabProps {
  tripId: string;
  paxCount?: number;
}

export default function TripCostsTab({ tripId, paxCount = 4 }: TripCostsTabProps) {
  const [costItems, setCostItems] = useState<TripOperationalCostItem[]>(mockTripCostsData);
  const [expandedDates, setExpandedDates] = useState<{ [date: string]: boolean }>({
    "25 Aug 2026": true,
    "26 Aug 2026": false,
    "27 Aug 2026": false,
    "28 Aug 2026": false,
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  // Modals & Drawers
  const [selectedCost, setSelectedCost] = useState<TripOperationalCostItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Cost Form State
  const [newDate, setNewDate] = useState("25 Aug 2026");
  const [newCategory, setNewCategory] = useState<CostCategory>("Other Operational");
  const [newDescription, setNewDescription] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [newUnit, setNewUnit] = useState<"Day" | "Pax" | "Room" | "Trip" | "Ticket">("Trip");
  const [newUnitCost, setNewUnitCost] = useState(200000);
  const [newSource, setNewSource] = useState<CostSource>("Manual");
  const [newNotes, setNewNotes] = useState("");

  // Toggle date row expansion
  const toggleDate = (date: string) => {
    setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  // Filtered Cost Items
  const filteredItems = useMemo(() => {
    return costItems.filter((item) => {
      const matchSearch =
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = categoryFilter === "All" || item.category === categoryFilter;
      const matchSource = sourceFilter === "All" || item.source === sourceFilter;

      return matchSearch && matchCategory && matchSource;
    });
  }, [costItems, searchQuery, categoryFilter, sourceFilter]);

  // Dynamic Grouping by Date
  const groupedByDate = useMemo(() => {
    const map: { [date: string]: TripOperationalCostItem[] } = {};

    filteredItems.forEach((item) => {
      if (!map[item.date]) map[item.date] = [];
      map[item.date].push(item);
    });

    const dates = Object.keys(map);
    return dates.map((date) => {
      const items = map[date];

      const accommodation = items
        .filter((i) => i.category === "Accommodation")
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const vehicleRental = items
        .filter((i) => i.category === "Vehicle Rental")
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const train = items
        .filter((i) => i.category === "Transportation" && i.description.toLowerCase().includes("train"))
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const ferry = items
        .filter((i) => i.category === "Transportation" && i.description.toLowerCase().includes("ferry"))
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const tourActivity = items
        .filter((i) => i.category === "Tour / Activity")
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const ticketEntrance = items
        .filter((i) => i.category === "Ticket / Entrance")
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const otherOperational = items
        .filter(
          (i) =>
            i.category === "Other Operational" ||
            i.category === "Fuel" ||
            i.category === "Guide" ||
            i.category === "TM"
        )
        .reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

      const dailyTotal = accommodation + vehicleRental + train + ferry + tourActivity + ticketEntrance + otherOperational;

      return {
        date,
        accommodation,
        vehicleRental,
        train,
        ferry,
        tourActivity,
        ticketEntrance,
        otherOperational,
        dailyTotal,
        items,
      };
    });
  }, [filteredItems]);

  // Overall Trip Cost Summary
  const summary = useMemo(() => {
    const totalEstimated = costItems.reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);
    const accommodation = costItems.filter((i) => i.category === "Accommodation").reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);
    const transportation = costItems.filter((i) => i.category === "Transportation" || i.category === "Vehicle Rental").reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);
    const tourActivity = costItems.filter((i) => i.category === "Tour / Activity" || i.category === "Ticket / Entrance").reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);
    const otherOperational = costItems.filter((i) => i.category === "Other Operational" || i.category === "Fuel" || i.category === "Guide" || i.category === "TM").reduce((acc, curr) => acc + curr.totalEstimatedCostRupiah, 0);

    const costPerGuest = paxCount > 0 ? Math.round(totalEstimated / paxCount) : totalEstimated;

    return {
      totalEstimated,
      costPerGuest,
      accommodation,
      transportation,
      tourActivity,
      otherOperational,
    };
  }, [costItems, paxCount]);

  // Add Cost Handler
  const handleAddCost = () => {
    if (!newDescription) return;

    const newItem: TripOperationalCostItem = {
      id: `cst-${Date.now()}`,
      tripId,
      date: newDate,
      category: newCategory,
      description: newDescription,
      quantity: newQuantity,
      unit: newUnit,
      unitCostRupiah: newUnitCost,
      totalEstimatedCostRupiah: newQuantity * newUnitCost,
      status: "Estimated",
      source: newSource,
      notes: newNotes,
      createdAt: "2026-08-18",
    };

    setCostItems([...costItems, newItem]);
    setShowAddModal(false);
    setNewDescription("");
  };

  return (
    <div className="space-y-6">
      {/* TOP COST SUMMARY DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-sans">
        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1 col-span-1 sm:col-span-2">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
            TOTAL ESTIMATED OPERATIONAL COST
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              Rp {summary.totalEstimated.toLocaleString("id-ID")}
            </span>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">COST PER GUEST</span>
              <span className="font-mono text-xs font-bold text-amber-400">
                Rp {summary.costPerGuest.toLocaleString("id-ID")} <span className="text-[10px] text-slate-400">({paxCount} PAX)</span>
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">ACCOMMODATION</span>
          <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
            Rp {summary.accommodation.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Hotels & Lodging</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TRANSPORTATION</span>
          <span className="text-lg font-extrabold font-mono text-blue-600 dark:text-blue-400 block">
            Rp {summary.transportation.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Vehicle Rental, Train, Ferry</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">TOUR & TICKETS</span>
          <span className="text-lg font-extrabold font-mono text-purple-600 dark:text-purple-400 block">
            Rp {summary.tourActivity.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Activities & Entrance</span>
        </Card>
      </div>

      {/* DAILY OPERATIONAL COST TREND MINI CHART */}
      <Card className="p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Daily Operational Cost Trend (Rp)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Calculated from {groupedByDate.length} Trip Days</span>
        </div>

        {/* Minimal Bar Chart */}
        <div className="h-16 flex items-end gap-3 pt-2 px-2 border-b border-slate-100 dark:border-slate-800">
          {groupedByDate.map((g) => {
            const max = Math.max(...groupedByDate.map((d) => d.dailyTotal)) || 1;
            const heightPercent = Math.max(15, Math.round((g.dailyTotal / max) * 100));

            return (
              <div key={g.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[9px] font-mono text-slate-500 truncate max-w-full">{g.date.split(" ")[0]} {g.date.split(" ")[1]}</span>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] font-mono rounded px-2 py-1 z-20 whitespace-nowrap shadow-xl">
                  {g.date}: Rp {g.dailyTotal.toLocaleString("id-ID")}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* FILTERS & ACTION BAR */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search description, category, date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: "All", label: "All Categories" },
                { value: "Accommodation", label: "Accommodation" },
                { value: "Vehicle Rental", label: "Vehicle Rental" },
                { value: "Transportation", label: "Transportation" },
                { value: "Tour / Activity", label: "Tour / Activity" },
                { value: "Ticket / Entrance", label: "Ticket / Entrance" },
                { value: "Other Operational", label: "Other Operational" },
              ]}
              className="w-40"
            />

            <Select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              options={[
                { value: "All", label: "All Master Sources" },
                { value: "Hotel Master", label: "Hotel Master" },
                { value: "Vehicle Rental Contract", label: "Vehicle Contract" },
                { value: "Tour Package", label: "Tour Package" },
                { value: "Destination", label: "Destination" },
                { value: "Transportation Booking", label: "Transport Booking" },
                { value: "Manual", label: "Manual" },
              ]}
              className="w-40"
            />

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Cost
            </Button>
          </div>
        </div>

        {/* EXPANDABLE DAILY OPERATIONAL COST TABLE */}
        <div className="space-y-3 font-sans text-xs">
          {groupedByDate.map((g) => {
            const isExpanded = expandedDates[g.date];

            return (
              <div
                key={g.date}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm"
              >
                {/* Daily Summary Row Header */}
                <div
                  onClick={() => toggleDate(g.date)}
                  className="p-3.5 bg-slate-50 dark:bg-[#162034] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold font-mono text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      📅 {g.date}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800">
                      {g.items.length} Cost Items
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      <span>Hotel: <strong>Rp {g.accommodation.toLocaleString("id-ID")}</strong></span>
                      <span>Rental: <strong>Rp {g.vehicleRental.toLocaleString("id-ID")}</strong></span>
                      <span>Tour: <strong>Rp {g.tourActivity.toLocaleString("id-ID")}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Daily Total:</span>
                      <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                        Rp {g.dailyTotal.toLocaleString("id-ID")}
                      </span>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Item Breakdown List */}
                {isExpanded && (
                  <div className="p-3 space-y-2 bg-white dark:bg-slate-900">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-400 uppercase">
                          <th className="py-2 px-2">Category</th>
                          <th className="py-2 px-2">Description</th>
                          <th className="py-2 px-2">Source</th>
                          <th className="py-2 px-2">Qty</th>
                          <th className="py-2 px-2 text-right">Unit Rate</th>
                          <th className="py-2 px-2 text-right">Total Estimated</th>
                          <th className="py-2 px-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                        {g.items.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedCost(item)}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                          >
                            <td className="py-2.5 px-2">
                              <Badge
                                variant={
                                  item.category === "Accommodation"
                                    ? "slate"
                                    : item.category === "Vehicle Rental"
                                    ? "blue"
                                    : item.category === "Transportation"
                                    ? "violet"
                                    : "emerald"
                                }
                              >
                                {item.category}
                              </Badge>
                            </td>

                            <td className="py-2.5 px-2 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                              {item.description}
                              {item.isVendorRateLocked && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 text-[9px] font-bold">
                                  <Lock className="w-2.5 h-2.5" /> 🔒 Locked
                                </span>
                              )}
                            </td>

                            <td className="py-2.5 px-2 text-slate-500 font-mono text-[10px]">
                              {item.source}
                            </td>

                            <td className="py-2.5 px-2">
                              {item.quantity} {item.unit}
                            </td>

                            <td className="py-2.5 px-2 text-right font-mono text-slate-600 dark:text-slate-300">
                              Rp {item.unitCostRupiah.toLocaleString("id-ID")}
                            </td>

                            <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900 dark:text-white">
                              Rp {item.totalEstimatedCostRupiah.toLocaleString("id-ID")}
                            </td>

                            <td className="py-2.5 px-2 text-center">
                              <Badge variant={item.status === "Confirmed" ? "emerald" : "amber"}>
                                ● {item.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* MODAL: ADD OPERATIONAL COST */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Daily Operational Cost">
        <div className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Date</label>
              <Select
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                options={[
                  { value: "25 Aug 2026", label: "25 Aug 2026 (Day 1)" },
                  { value: "26 Aug 2026", label: "26 Aug 2026 (Day 2)" },
                  { value: "27 Aug 2026", label: "27 Aug 2026 (Day 3)" },
                  { value: "28 Aug 2026", label: "28 Aug 2026 (Day 4)" },
                ]}
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cost Category</label>
              <Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                options={[
                  { value: "Accommodation", label: "Accommodation" },
                  { value: "Vehicle Rental", label: "Vehicle Rental" },
                  { value: "Transportation", label: "Transportation" },
                  { value: "Tour / Activity", label: "Tour / Activity" },
                  { value: "Ticket / Entrance", label: "Ticket / Entrance" },
                  { value: "Other Operational", label: "Other Operational" },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description *</label>
            <input
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              placeholder="e.g. Parking & Local Operational Fee"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Quantity</label>
              <input
                type="number"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono"
                value={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value) || 1)}
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Unit</label>
              <Select
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value as any)}
                options={[
                  { value: "Trip", label: "Trip" },
                  { value: "Day", label: "Day" },
                  { value: "Pax", label: "Pax" },
                  { value: "Room", label: "Room" },
                  { value: "Ticket", label: "Ticket" },
                ]}
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Unit Cost (Rp)</label>
              <input
                type="number"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono font-bold text-emerald-600"
                value={newUnitCost}
                onChange={(e) => setNewUnitCost(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Master Source</label>
              <Select
                value={newSource}
                onChange={(e) => setNewSource(e.target.value as any)}
                options={[
                  { value: "Manual", label: "Manual Entry" },
                  { value: "Hotel Master", label: "Hotel Master" },
                  { value: "Vehicle Rental Contract", label: "Vehicle Rental Contract" },
                  { value: "Tour Package", label: "Tour Package" },
                  { value: "Destination", label: "Destination Master" },
                ]}
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Notes</label>
              <input
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                placeholder="Optional notes..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </div>
          </div>

          {/* TOTAL AUTOMATIC CALCULATION */}
          <div className="p-3 rounded-lg bg-slate-900 text-white font-mono flex justify-between items-center text-xs">
            <span>AUTOMATIC TOTAL ESTIMATED COST:</span>
            <span className="text-base font-extrabold text-emerald-400">
              Rp {(newQuantity * newUnitCost).toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCost}>
              Add Operational Cost
            </Button>
          </div>
        </div>
      </Modal>

      {/* SLIDE-IN COST ITEM DETAIL DRAWER */}
      {selectedCost && (
        <aside className="fixed top-0 bottom-0 right-0 z-50 w-88 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 text-slate-900 dark:text-white shadow-2xl overflow-y-auto space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                OPERATIONAL COST DETAIL
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedCost.id}</h2>
            </div>
            <button
              onClick={() => setSelectedCost(null)}
              className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <PanelRightClose className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">DESCRIPTION</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedCost.description}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 block">CATEGORY</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{selectedCost.category}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">DATE</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{selectedCost.date}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">QUANTITY</span>
                <span className="font-bold">{selectedCost.quantity} {selectedCost.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">UNIT RATE</span>
                <span className="font-bold">Rp {selectedCost.unitCostRupiah.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold">TOTAL ESTIMATED</span>
                <span className="font-extrabold text-emerald-400 text-sm">
                  Rp {selectedCost.totalEstimatedCostRupiah.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 block">MASTER SOURCE</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 block">{selectedCost.source}</span>
              {selectedCost.sourceReferenceId && (
                <span className="text-[10px] text-slate-500 font-bold block">
                  Reference: {selectedCost.sourceReferenceId}
                </span>
              )}
              {selectedCost.isVendorRateLocked && (
                <div className="pt-1">
                  <Badge variant="emerald">🔒 Agreed Locked Vendor Rate</Badge>
                </div>
              )}
            </div>

            {selectedCost.notes && (
              <div>
                <span className="text-[10px] text-slate-400 block">OPERATIONAL NOTES</span>
                <p className="text-slate-600 dark:text-slate-300">{selectedCost.notes}</p>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
