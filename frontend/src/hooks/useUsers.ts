"use client";

import { useEffect, useState } from "react";

import { getUsers } from "@/services/users";

import { User } from "@/types/user";

export function useUsers() {

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadUsers = async () => {

    try {

      setLoading(true);

      const data = await getUsers();

      setUsers(data);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Failed to load users.");

      setUsers([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    // Defer loading to avoid calling setState synchronously within the effect
    const t = setTimeout(() => {
      void loadUsers();
    }, 0);

    return () => clearTimeout(t);

  }, []);

  return {

    users,

    loading,

    error,

    refresh: loadUsers,

  };

}