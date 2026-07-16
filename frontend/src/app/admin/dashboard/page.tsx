"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getDashboardStats
} from "@/services/admin";

import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";


interface DashboardStats {

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


interface RecentUser {

  id: number;

  first_name: string;

  last_name: string;

  email: string;

  phone: string;

  status: string;

  user_type: string;

  created_at: string;

}


interface DashboardResponse {

  success: boolean;

  stats: DashboardStats;

  recentUsers: RecentUser[];

}



export default function AdminDashboard() {


  const router = useRouter();


  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {


    async function loadDashboard() {


      try {


        const token =
          localStorage.getItem("token");


        if (!token) {

          router.push("/login");

          return;

        }



        const response =
          await getDashboardStats();



        setDashboard(response);



      }
      catch (error) {


        console.error(
          "Dashboard error:",
          error
        );


      }
      finally {


        setLoading(false);


      }


    }



    loadDashboard();


  }, [router]);





  if (loading) {

    return (

      <div className="p-6">

        Loading dashboard...

      </div>

    );

  }





  if (!dashboard) {


    return (

      <div className="p-6 text-red-600">

        Failed loading dashboard

      </div>

    );


  }





  return (

    <div className="space-y-8">


      <div>


        <h1 className="text-3xl font-bold text-red-700">

          Dashboard Overview

        </h1>


        <p className="text-gray-600">

          Welcome back administrator

        </p>


      </div>




      <DashboardOverview

        stats={dashboard.stats}

      />





      <div className="bg-white shadow rounded-lg p-6">


        <h2 className="text-xl font-bold mb-4">

          Recent Users

        </h2>



        <div className="space-y-3">


          {dashboard.recentUsers.map(user => (


            <div

              key={user.id}

              className="border-b pb-3"

            >


              <p className="font-semibold">

                {user.first_name} {user.last_name}

              </p>


              <p className="text-sm text-gray-500">

                {user.email} | {user.user_type}

              </p>


            </div>


          ))}


        </div>


      </div>



    </div>

  );


}