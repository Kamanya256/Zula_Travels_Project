"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function CustomerSignupPage() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (

    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4 py-10">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-red-700">
            Customer Registration
          </h1>

          <p className="text-gray-500 mt-2">
            Create your travel account and start booking with Zula Travels.
          </p>

        </div>

        <form className="space-y-6">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="First Name"
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-lg p-3 w-full"
            />

          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="border rounded-lg p-3 w-full"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border rounded-lg p-3 w-full pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="border rounded-lg p-3 w-full pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-4"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

          {/* Password Strength */}

          <div>

            <div className="w-full bg-gray-200 rounded-full h-2">

              <div className="bg-green-600 h-2 rounded-full w-0"></div>

            </div>

            <p className="text-sm text-gray-500 mt-2">

              Password strength

            </p>

          </div>

          <label className="flex items-center gap-3">

            <input type="checkbox" />

            <span className="text-gray-600">

              I agree to the Terms & Conditions

            </span>

          </label>

          <button
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl transition"
          >
            Create Customer Account
          </button>

        </form>

      </div>

    </div>

  );

}