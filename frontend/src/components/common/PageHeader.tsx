"use client";

import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  addLabel?: string;
  addLink?: string;
  extraButton?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  addLabel,
  addLink,
  extraButton,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

      <div>

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 mt-1">
            {subtitle}
          </p>
        )}

      </div>

      <div className="flex gap-3">

        {extraButton}

        {addLink && (
          <Link
            href={addLink}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            {addLabel}
          </Link>
        )}

      </div>

    </div>
  );
}