import { api } from "./api";


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



export async function getDashboard():

    Promise<DashboardResponse> {

    const { data } = await api.get(
        "/dashboard"
    );


    return data;

}