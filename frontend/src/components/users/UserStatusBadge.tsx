interface Props {

  status: string;

}

export default function UserStatusBadge({

  status,

}: Props) {

  let color =
    "bg-gray-100 text-gray-700";

  if (status === "active") {

    color =
      "bg-green-100 text-green-700";

  }

  if (status === "inactive") {

    color =
      "bg-yellow-100 text-yellow-700";

  }

  if (status === "blocked") {

    color =
      "bg-red-100 text-red-700";

  }

  return (

    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}
    >

      {status}

    </span>

  );

}