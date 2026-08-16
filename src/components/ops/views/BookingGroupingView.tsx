"use client";

import React, { useState } from "react";
import { Booking } from "@/types/travelOps";
import {
  Layers,
  Search,
  CheckSquare,
  Square,
  Eye,
  MapPin,
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
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#4F8CFF] border border-blue-200 dark:border-blue-800/50 text-[11px] font-bold uppercase tracking-wider">
              Booking Management Inbox
            </span>
            <span className="text-xs text-[#667085] dark:text-[#A7B1C0] font-mono">/bookings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#172033] dark:text-white tracking-tight mt-1">
            Reservations & OTA Booking Grouping
          </h1>
          <p className="text-xs text-[#667085] dark:text-[#A7B1C0]">
            Batch single/double traveler reservations into consolidated 14-pax Hiace overland & 4x4 Jeep excursion tours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={selectedIds.length === 0}
            onClick={() => onGroupBookings(selectedIds)}
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#4F8CFF] dark:hover:bg-[#6AA1FF] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Create Grouped Excursion Tour ({selectedIds.length})</span>
          </button>
        </div>
      </div>

      {/* SUMMARY KPI METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl shadow-xs space-y-1">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Total Bookings</span>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-white font-mono">{totalBookingsCount}</div>
          <span className="text-[10px] text-[#2563EB] dark:text-[#4F8CFF]">OTA & Direct Web</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl shadow-xs space-y-1">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Today's Ingested</span>
          <div className="text-2xl font-extrabold text-[#16A34A] dark:text-[#32D583] font-mono">{todayBookingsCount}</div>
          <span className="text-[10px] text-[#16A34A] dark:text-[#32D583]">Auto-synced</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl shadow-xs space-y-1">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Pending Review</span>
          <div className="text-2xl font-extrabold text-[#D97706] dark:text-[#FDB022] font-mono">{pendingDispatchCount}</div>
          <span className="text-[10px] text-[#D97706] dark:text-[#FDB022]">Needs Grouping</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl shadow-xs space-y-1">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Paid in Full</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{paidCount}</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Verified Payment</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl shadow-xs space-y-1">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Deposit / Partial</span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{partiallyPaidCount}</div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400">Balance Due On-Site</span>
        </div>

        <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-xl shadow-xs space-y-1">
          <span className="text-[#667085] dark:text-[#A7B1C0] block font-medium">Unassigned Pax</span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{unassignedCount}</div>
          <span className="text-[10px] text-rose-600 dark:text-rose-400">Requires Dispatch</span>
        </div>
      </div>

      {/* FILTER CONTROLS & SEARCH */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-4 rounded-2xl space-y-3 shadow-xs text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#98A2B3] dark:text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Booking ID, Guest Name, Product, or Contact..."
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-xl pl-9 pr-3 py-2 text-[#172033] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] dark:focus:border-[#4F8CFF] font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] text-[#172033] dark:text-[#F8FAFC] px-3 py-1.5 rounded-xl font-medium"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="text-[10px] text-[#DC2626] font-bold hover:underline"
              >
                Clear Date
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px]">
          <div>
            <label className="block text-[#667085] dark:text-[#A7B1C0] font-semibold mb-1">Source / Channel</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-lg p-1.5 text-[#172033] dark:text-[#F8FAFC]"
            >
              <option value="ALL">All Sources</option>
              <option value="GetYourGuide">GetYourGuide</option>
              <option value="Viator">Viator</option>
              <option value="Klook">Klook</option>
              <option value="Direct Web">Direct Web</option>
              <option value="WhatsApp Agent">WhatsApp Agent</option>
            </select>
          </div>

          <div>
            <label className="block text-[#667085] dark:text-[#A7B1C0] font-semibold mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-lg p-1.5 text-[#172033] dark:text-[#F8FAFC]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Grouped">Grouped</option>
              <option value="Ready for Dispatch">Ready for Dispatch</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-[#667085] dark:text-[#A7B1C0] font-semibold mb-1">Origin City</label>
            <select
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-lg p-1.5 text-[#172033] dark:text-[#F8FAFC]"
            >
              <option value="ALL">All Origins</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Malang">Malang</option>
              <option value="Banyuwangi">Banyuwangi</option>
              <option value="Bali">Bali</option>
            </select>
          </div>

          <div>
            <label className="block text-[#667085] dark:text-[#A7B1C0] font-semibold mb-1">Product Package</label>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-lg p-1.5 text-[#172033] dark:text-[#F8FAFC]"
            >
              <option value="ALL">All Products</option>
              <option value="Bromo">Mount Bromo Sunrise</option>
              <option value="Ijen">Ijen Blue Flame</option>
              <option value="Overland">Yogyakarta to Bali Overland</option>
            </select>
          </div>

          <div>
            <label className="block text-[#667085] dark:text-[#A7B1C0] font-semibold mb-1">Tour Type</label>
            <select
              value={tourTypeFilter}
              onChange={(e) => setTourTypeFilter(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-lg p-1.5 text-[#172033] dark:text-[#F8FAFC]"
            >
              <option value="ALL">All Types</option>
              <option value="Open Group">Open Group</option>
              <option value="Private Excursion">Private Excursion</option>
            </select>
          </div>

          <div>
            <label className="block text-[#667085] dark:text-[#A7B1C0] font-semibold mb-1">Payment Status</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#131D28] border border-[#D0D5DD] dark:border-[#344054] rounded-lg p-1.5 text-[#172033] dark:text-[#F8FAFC]"
            >
              <option value="ALL">All Payments</option>
              <option value="Paid">Paid in Full</option>
              <option value="Partial">Deposit / Partial</option>
              <option value="Unpaid">Unpaid / On-Site</option>
            </select>
          </div>
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bg-white dark:bg-[#101822] border border-[#E4E7EC] dark:border-[#202B38] p-5 rounded-2xl space-y-4 shadow-xs text-xs">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#202B38] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSelectAll}
              className="p-1 rounded text-[#2563EB] dark:text-[#4F8CFF] hover:bg-[#F3F4F6] dark:hover:bg-[#1A2634]"
            >
              {selectedIds.length === filteredBookings.length && filteredBookings.length > 0 ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
            <span className="font-bold text-[#172033] dark:text-white">
              Showing {filteredBookings.length} Reservations ({selectedIds.length} Selected)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] dark:border-[#202B38] bg-[#F9FAFB] dark:bg-[#131D28] text-[#667085] dark:text-[#A7B1C0] text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3 w-8"></th>
                <th className="py-2.5 px-3">Booking Ref</th>
                <th className="py-2.5 px-3">Lead Guest</th>
                <th className="py-2.5 px-3">Pax</th>
                <th className="py-2.5 px-3">Product Package</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Pickup Location</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F3] dark:divide-[#202B38]">
              {filteredBookings.map((b) => {
                const isSelected = selectedIds.includes(b.id);
                return (
                  <tr
                    key={b.id}
                    onClick={() => toggleSelectRow(b.id)}
                    className={`saas-table-row cursor-pointer ${
                      isSelected ? "bg-[#EEF4FF] dark:bg-[#16263F]" : ""
                    }`}
                  >
                    <td className="py-3 px-3">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#2563EB] dark:text-[#4F8CFF]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#98A2B3]" />
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#2563EB] dark:text-[#4F8CFF]">{b.id}</td>
                    <td className="py-3 px-3 font-bold text-[#172033] dark:text-white">
                      {b.greeting} {b.guestName}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-[#172033] dark:text-[#F8FAFC]">{b.pax} Pax</td>
                    <td className="py-3 px-3 max-w-[180px] truncate text-[#172033] dark:text-[#F8FAFC]">{b.product}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF]">
                        {b.source}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#667085] dark:text-[#A7B1C0]">{b.tourDate}</td>
                    <td className="py-3 px-3 text-[#667085] dark:text-[#A7B1C0] max-w-[140px] truncate">{b.pickupLocation}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          b.paymentStatus === "Paid"
                            ? "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                            : "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          b.status === "Grouped"
                            ? "bg-[#EFF8FF] text-[#175CD3] dark:bg-[rgba(83,177,253,0.12)] dark:text-[#84CAFF] border-blue-200/60 dark:border-blue-800/40"
                            : b.status === "Pending Review"
                            ? "bg-[#FFFAEB] text-[#B54708] dark:bg-[rgba(253,176,34,0.12)] dark:text-[#FEC84B] border-amber-200/60 dark:border-amber-800/40"
                            : "bg-[#ECFDF3] text-[#15803D] dark:bg-[rgba(50,213,131,0.12)] dark:text-[#6CE9A6] border-emerald-200/60 dark:border-emerald-800/40"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBookingDetail(b);
                        }}
                        className="p-1 rounded text-[#2563EB] dark:text-[#4F8CFF] hover:bg-[#EEF4FF] dark:hover:bg-[#16263F] font-semibold text-[11px] cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
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
