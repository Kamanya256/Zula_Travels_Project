"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueItem = {
  label: string;
  revenue: number;
};

type Props = {
  data: RevenueItem[];
  title?: string;
};

export default function RevenueChart({
  data,
  title = "Revenue Trend",
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">

      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />
            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#C1121F"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}