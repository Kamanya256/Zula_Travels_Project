"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { User, UserStatus } from "@/types/user";

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  status: UserStatus;
  user_type: "customer" | "vendor" | "admin";
}

interface Props {
  initialData?: Partial<User>;
  buttonText: string;
  onSubmit: (data: UserFormData) => Promise<void>;
}

export default function UserForm({
  initialData,
  buttonText,
  onSubmit,
}: Props) {

  const isEdit = initialData?.id !== undefined;

  const [form, setForm] = useState<UserFormData>({
    first_name: initialData?.first_name ?? "",
    last_name: initialData?.last_name ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    password: "",
    status: initialData?.status ?? "active",
    user_type: initialData?.user_type ?? "customer",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    setForm((prev: UserFormData) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!isEdit && !form.password) {
      alert("Password is required.");
      return;
    }

    await onSubmit(form);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>
        <label className="block mb-1 font-medium">
          First Name
        </label>

        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Last Name
        </label>

        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Phone
        </label>

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />
      </div>

      {!isEdit && (

        <div>
          <label className="block mb-1 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password ?? ""}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />
        </div>

      )}

      <div>
        <label className="block mb-1 font-medium">
          User Type
        </label>

        <select
          name="user_type"
          value={form.user_type}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {buttonText}
      </button>

    </form>

  );

}