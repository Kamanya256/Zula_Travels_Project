"use client";

import { useMemo, useState } from "react";
import RevenueChart from "@/components/admin/charts/RevenueChart";
import BookingChart from "@/components/admin/charts/BookingChart";

type Stats = {
  customers: number;
  vendors: number;
  bookings: number;
  revenue: number;
};

type Props = {
  stats: Stats | null;
};

type Period = "weekly" | "monthly" | "yearly";

export default function DashboardOverview({ stats }: Props) {
  const [period, setPeriod] = useState<Period>("monthly");

  // ALWAYS call hooks at top level (FIXED ISSUE)
  const revenueData = useMemo(() => {
    return {
      weekly: [
        { label: "Mon", revenue: 50 },
        { label: "Tue", revenue: 80 },
        { label: "Wed", revenue: 40 },
        { label: "Thu", revenue: 90 },
        { label: "Fri", revenue: 120 },
      ],
      monthly: [
        { label: "Week 1", revenue: 300 },
        { label: "Week 2", revenue: 500 },
        { label: "Week 3", revenue: 450 },
        { label: "Week 4", revenue: 600 },
      ],
      yearly: [
        { label: "2022", revenue: 5000 },
        { label: "2023", revenue: 8000 },
        { label: "2024", revenue: 12000 },
      ],
    };
  }, []);

  const bookingData = useMemo(() => {
    return {
      weekly: [
        { label: "Mon", bookings: 2 },
        { label: "Tue", bookings: 5 },
        { label: "Wed", bookings: 3 },
        { label: "Thu", bookings: 6 },
        { label: "Fri", bookings: 4 },
      ],
      monthly: [
        { label: "Week 1", bookings: 10 },
        { label: "Week 2", bookings: 18 },
        { label: "Week 3", bookings: 25 },
        { label: "Week 4", bookings: 30 },
      ],
      yearly: [
        { label: "2022", bookings: 200 },
        { label: "2023", bookings: 350 },
        { label: "2024", bookings: 500 },
      ],
    };
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-6">

      {/* PERIOD SWITCHER */}
      <div className="flex gap-3 flex-wrap">
        {(["weekly", "monthly", "yearly"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${period === p
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Customers" value={stats.customers} />
        <StatCard title="Vendors" value={stats.vendors} />
        <StatCard title="Bookings" value={stats.bookings} />
        <StatCard title="Revenue" value={`$${stats.revenue}`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">

        <RevenueChart data={revenueData[period]} />

        <BookingChart
          data={bookingData[period].map((d) => ({ month: d.label, bookings: d.bookings }))}
        />

      </div>

    </div>
  );
}

/* ---------------- CARD ---------------- */
function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm uppercase">{title}</p>
      <h3 className="text-2xl font-bold text-green-600 mt-2">{value}</h3>
    </div>
  );
}