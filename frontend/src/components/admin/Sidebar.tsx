"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  Plane,
  Hotel,
  Car,
  Map,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Vendors", href: "/admin/vendors", icon: Building2 },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Flights", href: "/admin/flights", icon: Plane },
  { name: "Hotels", href: "/admin/hotels", icon: Hotel },
  { name: "Cars", href: "/admin/cars", icon: Car },
  { name: "Tours", href: "/admin/tours", icon: Map },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-72 h-screen bg-white border-r shadow-md flex flex-col overflow-hidden">

      {/* LOGO SECTION */}
      <div className="px-6 py-5 border-b">
        <h1 className="text-2xl font-bold text-red-700">
          Zula Travels
        </h1>
        <p className="text-green-700 text-sm">Admin Portal</p>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto py-4">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 transition-all rounded-md mx-2
                ${isActive
                  ? "bg-red-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}

      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-700 w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </aside>
  );
}