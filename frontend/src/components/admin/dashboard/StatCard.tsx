type StatCardProps = {
  title: string;
  value: string | number;
  color?: "green" | "red" | "blue";
  icon?: React.ReactNode;
};

export default function StatCard({
  title,
  value,
  color = "green",
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between hover:shadow-lg transition">

      <div>

        <p className="text-gray-500 text-sm uppercase tracking-wide">
          {title}
        </p>

        <h2
          className={`text-3xl font-bold mt-2 ${color === "green"
              ? "text-green-600"
              : color === "red"
                ? "text-red-600"
                : "text-blue-600"
            }`}
        >
          {value}
        </h2>

      </div>

      <div className="text-gray-400 text-3xl">
        {icon}
      </div>

    </div>
  );
}