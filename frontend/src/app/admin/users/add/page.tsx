"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm, { UserFormData } from "@/components/users/UserForm";
import { createUser } from "@/services/users";

export default function AddUserPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (data: UserFormData) => {
    try {
      setSaving(true);
      setError("");

      await createUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        password: data.password || "",
        user_type: data.user_type,
      });

      router.push("/admin/users");
      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      const response = (err as Record<string, unknown>)?.response as Record<string, unknown> | undefined;
      const dataResponse = response?.data as Record<string, unknown> | undefined;
      const message = dataResponse?.message as string | undefined;

      setError(message || "Failed to create user.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Add New User</h1>

      {error && (
        <div className="mb-4 rounded bg-red-100 border border-red-300 text-red-700 p-3">
          {error}
        </div>
      )}

      <UserForm
        onSubmit={submit}
        buttonText={saving ? "Creating..." : "Create User"}
      />
    </div>
  );
}