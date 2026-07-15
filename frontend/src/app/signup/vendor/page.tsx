"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";

export default function VendorSignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await registerUser({
        ...form,
        user_type: "vendor",
      });

      alert("Vendor account created successfully");

      router.push("/login");
    } catch (error: unknown) {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      alert(
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "Signup failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
          Vendor Signup
        </h1>

        <div className="space-y-4">

          <input
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded"
          >
            {loading ? "Creating..." : "Create Vendor Account"}
          </button>

        </div>

      </div>

    </div>
  );
}