import { api } from "./api";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login again.");
  }

  const res = await api.get("/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getRevenueAnalytics = (period: string) =>
  api.get(`/analytics/revenue?period=${period}`);

export const getBookingAnalytics = (period: string) =>
  api.get(`/analytics/bookings?period=${period}`);