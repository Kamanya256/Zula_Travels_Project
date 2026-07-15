interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {

  let color = "bg-gray-500";

  if (status === "active")
    color = "bg-green-600";

  if (status === "inactive")
    color = "bg-yellow-600";

  if (status === "deleted")
    color = "bg-red-600";

  if (status === "suspended")
    color = "bg-orange-600";

  return (

    <span
      className={`${color} text-white px-3 py-1 rounded-full text-sm`}
    >
      {status}
    </span>

  );

}