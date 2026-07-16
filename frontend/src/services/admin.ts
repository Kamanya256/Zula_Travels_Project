import { api } from "./api";

// =====================================
// TYPES
// =====================================

export interface DashboardStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  pending_users: number;
  suspended_users: number;
  rejected_users: number;
  customers: number;
  vendors: number;
  admins: number;
}

export interface RecentUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  user_type: string;
  created_at: string;
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recentUsers: RecentUser[];
}

// =====================================
// DASHBOARD
// =====================================

export async function getDashboardStats(): Promise<DashboardResponse> {
  const { data } = await api.get("/dashboard");
  return data;
}

// =====================================
// PLACEHOLDERS
// These will be implemented later
// =====================================

export const getRevenueAnalytics = async (_period: string) => {
  throw new Error(`Revenue analytics not implemented yet. Period: ${_period}`);
};

export const getBookingAnalytics = async (_period: string) => {
  throw new Error(`Booking analytics not implemented yet. Period: ${_period}`);
};