"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      router.replace("/login");
      return;

    }

    Promise.resolve().then(() => setLoading(false));

  }, [router]);

  if (loading) {

    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  }

  return children;

}