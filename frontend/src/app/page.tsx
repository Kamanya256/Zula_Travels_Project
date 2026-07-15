// src/app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-red-700">
          Zula Travels
        </h1>

        <p className="mt-4 text-gray-600 text-xl">
          Tourism, Travel, Hotels, Tours, Flights and Experiences.
        </p>

        <div className="mt-10 flex gap-4">

          <Link
            href="/login"
            className="bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Admin Login
          </Link>

        </div>

      </div>
    </main>
  );
}