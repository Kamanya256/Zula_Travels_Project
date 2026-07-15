"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-slate-100">



        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0">
          <Sidebar />
        </aside>

        {/* Main Section */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 min-w-0">
            {children}
          </main>

        </div>

      </div>
    </AuthGuard>
  );
}