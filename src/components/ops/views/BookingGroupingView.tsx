"use client";

import React, { useState } from "react";
import { Booking, BookingPlatform, BookingStatus } from "@/types/travelOps";
import {
  Layers,
  Search,
  Filter,
  CheckSquare,
  Square,
  ChevronRight,
  UserCheck,
  CreditCard,
  Plus,
  Eye,
  Calendar,
  MapPin,
  ExternalLink,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

interface BookingGroupingViewProps {
  bookings: Booking[];
  onSelectBookingDetail: (booking: Booking) => void;
  onGroupBookings: (bookingIds: string[]) => void;
}

export const BookingGroupingView: React.FC<BookingGroupingViewProps> = ({
  bookings,
  onSelectBookingDetail,
  onGroupBookings,
}) => {
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [originFilter, setOriginFilter] = useState<string>("ALL");
  const [productFilter, setProductFilter] = useState<string>("ALL");
  const [tourTypeFilter, setTourTypeFilter] = useState<string>("ALL");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // TOP SUMMARY KPI COMPUTATIONS
  const totalBookingsCount = bookings.length;
  const todayBookingsCount = bookings.filter((b) => b.tourDate === "2026-08-14").length;
  const pendingDispatchCount = bookings.filter((b) => b.status === "Pending Review" || b.status === "Ready for Dispatch").length;
  const paidCount = bookings.filter((b) => b.paymentStatus === "Paid" || b.billingStatus === "Paid in Full").length;
  const partiallyPaidCount = bookings.filter((b) => b.paymentStatus === "Partial" || b.billingStatus === "Deposit Paid").length;
  const unassignedCount = bookings.filter((b) => !b.groupedTourId || b.status === "Pending Review").length;

  // Filter Logic
  const filteredBookings = bookings.filter((b) => {
    if (sourceFilter !== "ALL" && b.source !== sourceFilter) return false;
    if (statusFilter !== "ALL" && b.status !== statusFilter) return false;
    if (originFilter !== "ALL" && b.origin !== originFilter) return false;
    if (productFilter !== "ALL" && !b.product.toLowerCase().includes(productFilter.toLowerCase())) return false;
    if (tourTypeFilter !== "ALL" && b.tourType !== tourTypeFilter) return false;
    if (paymentFilter !== "ALL" && b.paymentStatus !== paymentFilter) return false;
    if (dateFilter && b.tourDate !== dateFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = b.id.toLowerCase().includes(q);
      const matchName = b.guestName.toLowerCase().includes(q);
      const matchProduct = b.product.toLowerCase().includes(q);
      const matchPhone = b.phone.includes(q);
      if (!matchId && !matchName && !matchProduct && !matchPhone) return false;
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map((b) => b.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider">
              Booking Management Inbox
            </span>
            <span className="text-xs text-slate-400 font-mono">/bookings</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Booking Inbox & Route Grouping
          </h1>
          <p className="text-xs text-slate-400">
            Ingest customer reservations from GetYourGuide, Direct Online, and Offline. Convert bookings into operational tour departures.
          </p>
        </div>

        {/* Batch Action Button */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl animate-pulse">
            <span className="text-xs font-bold text-emerald-400">
              {selectedIds.length} Bookings Selected
            </span>
            <button
              onClick={() => onGroupBookings(selectedIds)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-extrabold transition-all shadow cursor-pointer"
            >
              + Create / Assign to Operational Tour
            </button>
          </div>
        )}
      </div>

      {/* CONCEPT HIGHLIGHT BANNER: BOOKING VS OPERATIONAL TOUR */}
      <div className="bg-slate-900/90 border border-blue-500/30 p-4 rounded-xl text-xs space-y-2">
        <div className="flex items-center gap-2 text-blue-400 font-bold">
          <Compass className="w-4 h-4" />
          <span>Workflow Concept: Booking vs Operational Tour</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-white">Booking:</strong> Customer reservation received from GetYourGuide, Direct Online, or Offline channel.<br />
          <strong className="text-emerald-400">Operational Tour:</strong> The vehicle & crew deployment created by grouping one or more bookings onto a shared departure route.
        </p>
      </div>

      {/* TOP SUMMARY KPI CARDS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* KPI 1: Total Bookings */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Total Bookings</span>
          <div className="text-2xl font-extrabold text-white font-mono">{totalBookingsCount}</div>
          <span className="text-[10px] text-slate-400">All Platforms</span>
        </div>

        {/* KPI 2: Today */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Today's Departures</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{todayBookingsCount}</div>
          <span className="text-[10px] text-emerald-400 font-medium">Aug 14 Tour Date</span>
        </div>

        {/* KPI 3: Pending Dispatch */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Pending Dispatch</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{pendingDispatchCount}</div>
          <span className="text-[10px] text-amber-400 font-medium">Needs Grouping</span>
        </div>

        {/* KPI 4: Paid */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Paid in Full</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{paidCount}</div>
          <span className="text-[10px] text-cyan-400 font-medium">Settled Revenue</span>
        </div>

        {/* KPI 5: Partially Paid */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Partially Paid</span>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">{partiallyPaidCount}</div>
          <span className="text-[10px] text-purple-400 font-medium">Deposit Collected</span>
        </div>

        {/* KPI 6: Unassigned */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
          <span className="text-xs text-slate-400">Unassigned</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">{unassignedCount}</div>
          <span className="text-[10px] text-rose-400 font-medium">Requires Tour Match</span>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Guest, BK-ID, Product..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none"
            title="Filter by Tour Date"
          />

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Sources</option>
            <option value="GetYourGuide">GetYourGuide (GYG)</option>
            <option value="Direct Online">Direct Online</option>
            <option value="Direct Offline">Direct Offline</option>
          </select>

          {/* Origin Filter */}
          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Origins</option>
            <option value="Yogyakarta">Yogyakarta</option>
            <option value="Malang">Malang</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Banyuwangi">Banyuwangi</option>
          </select>

          {/* Product Filter */}
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Products</option>
            <option value="Bromo">Bromo Packages</option>
            <option value="Ijen">Ijen Expedition</option>
            <option value="Bali">Bali Drop Off</option>
            <option value="Waterfall">Tumpak Sewu Waterfall</option>
          </select>

          {/* Tour Type Filter */}
          <select
            value={tourTypeFilter}
            onChange={(e) => setTourTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Tour Types</option>
            <option value="Standard - Sharing">Standard - Sharing</option>
            <option value="Private VIP">Private VIP</option>
            <option value="Luxury Overland">Luxury Overland</option>
            <option value="Custom Private">Custom Private</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
          </select>

          {/* Operational Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Grouped">Grouped</option>
            <option value="Ready for Dispatch">Ready for Dispatch</option>
            <option value="In Transit">In Transit</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="text-slate-400 font-mono text-[11px]">
          Showing <span className="text-white font-bold">{filteredBookings.length}</span> of {bookings.length} Bookings
        </div>
      </div>

      {/* BOOKING MANAGEMENT TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-white cursor-pointer">
                    {selectedIds.length === filteredBookings.length && filteredBookings.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Source</th>
                <th className="p-3">Guest</th>
                <th className="p-3">Pax</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Product</th>
                <th className="p-3">Drop-off</th>
                <th className="p-3">Pickup</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Operational Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredBookings.map((b) => {
                const isSelected = selectedIds.includes(b.id);
                return (
                  <tr
                    key={b.id}
                    className={`ops-table-row transition-colors cursor-pointer ${
                      isSelected ? "bg-blue-950/40" : "hover:bg-slate-850/60"
                    }`}
                    onClick={() => onSelectBookingDetail(b)}
                  >
                    {/* Checkbox */}
                    <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleSelectRow(b.id)} className="text-slate-400 hover:text-white cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Booking ID */}
                    <td className="p-3 font-mono font-bold text-white whitespace-nowrap">{b.id}</td>

                    {/* Date */}
                    <td className="p-3 font-mono text-slate-300 whitespace-nowrap">{b.tourDate}</td>

                    {/* Source */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-block ${
                          b.source === "GetYourGuide"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : b.source === "Direct Online"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                        }`}
                      >
                        {b.source}
                      </span>
                    </td>

                    {/* Guest */}
                    <td className="p-3 max-w-[150px]">
                      <div className="font-semibold text-slate-100 truncate">
                        {b.greeting} {b.guestName}
                      </div>
                      <div className="text-[10px] text-slate-400">{b.phone}</div>
                    </td>

                    {/* Pax */}
                    <td className="p-3 font-mono font-bold text-emerald-400">{b.pax} Pax</td>

                    {/* Origin */}
                    <td className="p-3 text-slate-300 font-medium whitespace-nowrap">{b.origin}</td>

                    {/* Product */}
                    <td className="p-3 max-w-[180px]">
                      <div className="font-medium text-slate-200 truncate" title={b.product}>
                        {b.product}
                      </div>
                      <div className="text-[10px] text-slate-400">{b.tourType}</div>
                    </td>

                    {/* Drop-off */}
                    <td className="p-3 text-slate-300 max-w-[120px] truncate">{b.dropOff}</td>

                    {/* Pickup */}
                    <td className="p-3 max-w-[150px]">
                      <div className="text-slate-300 truncate" title={b.pickupLocation}>{b.pickupLocation}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{b.pickupTime} WIB</div>
                    </td>

                    {/* Payment */}
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-mono font-semibold text-slate-200">
                        Rp {b.totalBilling.toLocaleString("id-ID")}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium">{b.billingStatus}</div>
                    </td>

                    {/* Operational Status */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          b.status === "Pending Review"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : b.status === "Grouped"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onGroupBookings([b.id])}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-2.5 py-1 rounded font-bold transition-colors cursor-pointer"
                        >
                          + Assign to Tour
                        </button>
                        <button
                          onClick={() => onSelectBookingDetail(b)}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Full Booking Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
