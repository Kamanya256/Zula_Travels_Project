"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardStats } from "@/services/admin";
import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";

type DashboardStats = {
  customers: number;
  vendors: number;
  bookings: number;
  revenue: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await getDashboardStats();

        // IMPORTANT: backend returns { success, data }
        setStats(res.data);

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-green-600 font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold">
        Unable to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-red-700">
          Dashboard Overview
        </h1>

        <p className="text-gray-600">
          Welcome back 👋
        </p>
      </div>

      {/* Stats */}
      <DashboardOverview stats={stats} />

    </div>
  );
}