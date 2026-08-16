"use client";

import React, { useState } from "react";
import { OperationalReportSummary } from "@/types/travelOps";
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  FileText,
  Compass,
  ShoppingBag,
  Truck,
  Users,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  X,
} from "lucide-react";

interface ReportsAnalyticsViewProps {
  report: OperationalReportSummary;
}

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({ report }) => {
  const [activeCategory, setActiveCategory] = useState<"operational" | "booking" | "fleet" | "crew" | "financial">("operational");
  const [selectedReportDetail, setSelectedReportDetail] = useState<string | null>(null);
  const [exportToast, setExportToast] = useState<string | null>(null);

  // Filters state
  const [dateRange, setDateRange] = useState("August 2026");
  const [regionFilter, setRegionFilter] = useState("ALL");
  const [originFilter, setOriginFilter] = useState("ALL");
  const [destinationFilter, setDestinationFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");

  const handleSimulateExport = (type: "CSV" | "PDF") => {
    setExportToast(`Exporting ${activeCategory.toUpperCase()} Report as ${type}... (File Generated)`);
    setTimeout(() => setExportToast(null), 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <FileSpreadsheet className="w-4 h-4" />
          <span>{exportToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold uppercase tracking-wider">
              Executive Reporting Center
            </span>
            <span className="text-xs text-slate-400 font-mono">/reports</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            QIFESS Travel Operations Analytics & Reporting
          </h1>
          <p className="text-xs text-slate-400">
            Categorized operational performance reporting covering tour execution, OTA channel volume, fleet utilization, crew availability, and field BOP financial reconciliations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => handleSimulateExport("CSV")}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleSimulateExport("PDF")}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-lg font-bold shadow transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* MASTER FILTERS BAR */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md text-xs">
        <span className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-purple-400" /> Master Analytics Filters
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-3">
          <div>
            <label className="text-slate-400 block text-[10px] mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none font-medium"
            >
              <option value="August 2026">August 2026 (Current)</option>
              <option value="July 2026">July 2026</option>
              <option value="Q3 2026">Q3 2026 YTD</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block text-[10px] mb-1">Corridor Region</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none font-medium"
            >
              <option value="ALL">All Regions (Java & Bali)</option>
              <option value="East Java">East Java Corridor</option>
              <option value="Bali">Bali Drop-Off Corridor</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block text-[10px] mb-1">Origin City</label>
            <select
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none font-medium"
            >
              <option value="ALL">All Origins</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Malang">Malang</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Banyuwangi">Banyuwangi</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block text-[10px] mb-1">Destination Excursion</label>
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none font-medium"
            >
              <option value="ALL">All Destinations</option>
              <option value="Bromo">Bromo Sunrise</option>
              <option value="Ijen">Ijen Blue Flame</option>
              <option value="Waterfall">Tumpak Sewu Waterfall</option>
              <option value="Bali">Bali Drop-off</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block text-[10px] mb-1">Booking Source Channel</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none font-medium"
            >
              <option value="ALL">All Channels</option>
              <option value="GetYourGuide">GetYourGuide (OTA)</option>
              <option value="Direct Online">Direct Online</option>
              <option value="Direct Offline">Direct Offline</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5 REPORT CATEGORIES LANDING CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setActiveCategory("operational")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeCategory === "operational"
              ? "bg-emerald-950/60 border-emerald-500/60 ring-1 ring-emerald-500/30"
              : "bg-slate-900 border-slate-800 hover:border-slate-700"
          }`}
        >
          <Compass className="w-5 h-5 text-emerald-400 mb-2" />
          <div className="font-bold text-white text-sm">Operational</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Tours, Checkpoints, Handovers</div>
        </button>

        <button
          onClick={() => setActiveCategory("booking")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeCategory === "booking"
              ? "bg-blue-950/60 border-blue-500/60 ring-1 ring-blue-500/30"
              : "bg-slate-900 border-slate-800 hover:border-slate-700"
          }`}
        >
          <ShoppingBag className="w-5 h-5 text-blue-400 mb-2" />
          <div className="font-bold text-white text-sm">Booking</div>
          <div className="text-[10px] text-slate-400 mt-0.5">OTA Volumes, Products, Pax</div>
        </button>

        <button
          onClick={() => setActiveCategory("fleet")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeCategory === "fleet"
              ? "bg-amber-950/60 border-amber-500/60 ring-1 ring-amber-500/30"
              : "bg-slate-900 border-slate-800 hover:border-slate-700"
          }`}
        >
          <Truck className="w-5 h-5 text-amber-400 mb-2" />
          <div className="font-bold text-white text-sm">Fleet</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Utilization, KM, Maintenance</div>
        </button>

        <button
          onClick={() => setActiveCategory("crew")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeCategory === "crew"
              ? "bg-purple-950/60 border-purple-500/60 ring-1 ring-purple-500/30"
              : "bg-slate-900 border-slate-800 hover:border-slate-700"
          }`}
        >
          <Users className="w-5 h-5 text-purple-400 mb-2" />
          <div className="font-bold text-white text-sm">Crew</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Drivers, Guides, TMs, Attendance</div>
        </button>

        <button
          onClick={() => setActiveCategory("financial")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeCategory === "financial"
              ? "bg-cyan-950/60 border-cyan-500/60 ring-1 ring-cyan-500/30"
              : "bg-slate-900 border-slate-800 hover:border-slate-700"
          }`}
        >
          <DollarSign className="w-5 h-5 text-cyan-400 mb-2" />
          <div className="font-bold text-white text-sm">Financial</div>
          <div className="text-[10px] text-slate-400 mt-0.5">BOP, Expenses, Category Costs</div>
        </button>
      </div>

      {/* CATEGORY 1: OPERATIONAL REPORT */}
      {activeCategory === "operational" && (
        <div className="space-y-5 animate-fade-in font-sans text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Total Tours</span>
              <div className="text-2xl font-extrabold text-white font-mono">{report.totalTours}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Completed Tours</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{report.departuresCompleted}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Cancelled Tours</span>
              <div className="text-2xl font-extrabold text-slate-400 font-mono">1</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Operational Issues</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">3</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Departure Rate</span>
              <div className="text-2xl font-extrabold text-blue-400 font-mono">{report.onTimeDepartureRate}%</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Arrival Rate</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono">97.8%</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-slate-400">Handover Success</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">{report.handoverSuccessRate}%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 shadow-lg">
              <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Tours by Destination</h3>
              <div className="space-y-2">
                {report.topDestinations.map((dest, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{dest.name}</span>
                      <span className="font-mono text-emerald-400 font-bold">{dest.count} Tours</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${(dest.count / report.totalTours) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 shadow-lg">
              <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Tour Status Distribution</h3>
              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] font-sans block">On Trip / Active</span>
                  <span className="text-emerald-400 text-lg font-bold">14 Tours</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] font-sans block">Ready to Depart</span>
                  <span className="text-purple-400 text-lg font-bold">8 Tours</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] font-sans block">Planning Stage</span>
                  <span className="text-blue-400 text-lg font-bold">12 Tours</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] font-sans block">Completed</span>
                  <span className="text-slate-300 text-lg font-bold">28 Tours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 2: BOOKING REPORT */}
      {activeCategory === "booking" && (
        <div className="space-y-5 animate-fade-in font-sans text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Total Bookings</span>
              <div className="text-3xl font-extrabold text-white font-mono">{report.totalBookings}</div>
              <span className="text-[10px] text-slate-400">All reservation records</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Total Passenger Volume</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{report.totalPax} Pax</div>
              <span className="text-[10px] text-emerald-400">August 2026 total</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">GetYourGuide (OTA) Volume</span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono">{report.platformBreakdown.getYourGuide} Bks</div>
              <span className="text-[10px] text-amber-400">Primary OTA partner</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Direct Channel Share</span>
              <div className="text-3xl font-extrabold text-blue-400 font-mono">
                {report.platformBreakdown.directOnline + report.platformBreakdown.directOffline} Bks
              </div>
              <span className="text-[10px] text-blue-400">Web & Direct Agent</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 shadow-lg">
            <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Booking Volume by Platform Channel</h3>
            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold text-sm block font-sans">GetYourGuide</span>
                <span className="text-2xl font-extrabold text-white">{report.platformBreakdown.getYourGuide}</span>
                <span className="text-[10px] text-slate-400 block font-sans mt-1">45.9% Channel Share</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-blue-400 font-bold text-sm block font-sans">Direct Online</span>
                <span className="text-2xl font-extrabold text-white">{report.platformBreakdown.directOnline}</span>
                <span className="text-[10px] text-slate-400 block font-sans mt-1">28.4% Channel Share</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-purple-400 font-bold text-sm block font-sans">Direct Offline</span>
                <span className="text-2xl font-extrabold text-white">{report.platformBreakdown.directOffline}</span>
                <span className="text-[10px] text-slate-400 block font-sans mt-1">25.7% Channel Share</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 3: FLEET REPORT */}
      {activeCategory === "fleet" && (
        <div className="space-y-5 animate-fade-in font-sans text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Fleet Utilization Rate</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{report.vehicleUtilizationRate}%</div>
              <span className="text-[10px] text-emerald-400">Target: 80.0%+</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Total Trips Completed</span>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">142 Trips</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Total Distance Traveled</span>
              <div className="text-3xl font-extrabold text-blue-400 font-mono">34,250 KM</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Vehicle Availability Rate</span>
              <div className="text-3xl font-extrabold text-purple-400 font-mono">92.0%</div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 4: CREW REPORT */}
      {activeCategory === "crew" && (
        <div className="space-y-5 animate-fade-in font-sans text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Crew Utilization Rate</span>
              <div className="text-3xl font-extrabold text-purple-400 font-mono">{report.crewUtilizationRate}%</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Driver Utilization</span>
              <div className="text-3xl font-extrabold text-blue-400 font-mono">88.5%</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Guide Utilization</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">91.2%</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Attendance Compliance</span>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">99.4%</div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 5: FINANCIAL REPORT */}
      {activeCategory === "financial" && (
        <div className="space-y-5 animate-fade-in font-sans text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Billing Revenue</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                Rp {report.totalBillingRevenue.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Total BOP Expenses</span>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                Rp {report.totalBopExpenses.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Net Operating Margin</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono">{report.netOperatingMargin}%</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 block">Reconciliation Rate</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">98.5%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
