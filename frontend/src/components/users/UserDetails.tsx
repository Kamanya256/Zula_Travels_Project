import { User } from "@/types/user";

interface Props {
  user: User;
}

export default function UserDetails({
  user,
}: Props) {
  return (

    <div className="bg-white rounded-lg shadow p-8">

      <h1 className="text-3xl font-bold mb-6">
        User Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <strong>Name</strong>

          <p>
            {user.first_name} {user.last_name}
          </p>

        </div>

        <div>

          <strong>Email</strong>

          <p>{user.email}</p>

        </div>

        <div>

          <strong>Phone</strong>

          <p>{user.phone}</p>

        </div>

        <div>

          <strong>Status</strong>

          <p>{user.status}</p>

        </div>

        <div>

          <strong>Role</strong>

          <p>{user.roles?.join(", ")}</p>

        </div>

      </div>

    </div>

  );
}