"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-8 min-w-0">

      {/* Search */}
      <div className="relative w-full max-w-md">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search anything..."
          className="
            w-full
            rounded-xl
            border
            pl-12
            pr-4
            py-3
            outline-none
            focus:border-red-600
          "
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell className="text-gray-600" size={24} />

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-600
              text-white
              text-xs
              rounded-full
              w-5
              h-5
              flex
              items-center
              justify-center
            "
          >
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-red-700"
          />

          <div>

            <p className="font-semibold">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}