"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import UserTable from "@/components/users/UserTable";
import DeleteDialog from "@/components/users/DeleteDialog";

import {
  getUsers,
  deleteUser,
} from "@/services/users";

import { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  async function loadUsers() {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);

    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const load = async () => {
      await loadUsers();
    };
    load();
  }, []);

  const filteredUsers = useMemo(() => {

    return users.filter((u) => {

      const keyword = search.toLowerCase();

      return (
        u.first_name?.toLowerCase().includes(keyword) ||
        u.last_name?.toLowerCase().includes(keyword) ||
        u.email?.toLowerCase().includes(keyword) ||
        u.phone?.toLowerCase().includes(keyword)
      );

    });

  }, [users, search]);

  async function handleDelete() {

    if (!deleteId) return;

    try {

      await deleteUser(deleteId);

      await loadUsers();

    } catch (error) {

      console.error(error);

    }

    setDeleteId(null);

  }

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="text-gray-500">
            Manage all system users
          </p>

        </div>

        <Link
          href="/admin/users/add"
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          + Add User
        </Link>

      </div>

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search name, email or phone..."
        className="border rounded-lg p-3 w-full"
      />

      {loading ? (

        <div className="bg-white rounded-lg p-8 shadow">
          Loading users...
        </div>

      ) : (

        <UserTable
          users={filteredUsers}
          onDelete={(id) =>
            setDeleteId(id)
          }
        />

      )}

      <DeleteDialog
        open={deleteId !== null}
        onClose={() =>
          setDeleteId(null)
        }
        onConfirm={handleDelete}
      />

    </div>

  );
}