"use client";

import Link from "next/link";

interface Props {
  id: number;
  basePath: string;
  onDelete: (id: number) => void;
}

export default function ActionButtons({
  id,
  basePath,
  onDelete,
}: Props) {

  return (

    <div className="flex gap-2">

      <Link
        href={`${basePath}/${id}`}
        className="px-3 py-1 rounded bg-blue-600 text-white"
      >
        View
      </Link>

      <Link
        href={`${basePath}/edit/${id}`}
        className="px-3 py-1 rounded bg-green-600 text-white"
      >
        Edit
      </Link>

      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 rounded bg-red-600 text-white"
      >
        Trash
      </button>

    </div>

  );

}