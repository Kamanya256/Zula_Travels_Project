"use client";


import { useEffect, useState, ReactNode } from "react";

import {
  useParams,
  useRouter
} from "next/navigation";


import {
  getUser
} from "@/services/users";


import {
  User
} from "@/types/user";




export default function ViewUserPage() {


  const router =
    useRouter();



  const params =
    useParams<{ id: string }>();

  const id =
    Number(params.id);


  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);



  const [error, setError] =
    useState("");

  useEffect(() => {


    async function loadUser() {


      try {


        const data =
          await getUser(id);


        setUser(data);



      } catch (error) {


        console.error(
          "VIEW USER:",
          error
        );


        setError(
          "Unable to load user"
        );


      } finally {


        setLoading(false);


      }


    }



    if (id) {

      loadUser();

    }



  }, [id]);








  if (loading) {


    return (

      <div className="p-6">

        Loading user...

      </div>

    );


  }





  if (error || !user) {


    return (

      <div className="p-6 text-red-600">

        {error || "User not found"}

      </div>

    );


  }






  return (

    <div className="max-w-3xl space-y-6">



      <div className="flex justify-between">


        <h1 className="text-3xl font-bold">

          User Details

        </h1>



        <button

          onClick={() =>
            router.push(
              `/admin/users/edit/${user.id}`
            )
          }

          className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded
          "

        >

          Edit User

        </button>


      </div>





      <div className="
      bg-white
      shadow
      rounded-lg
      p-6
      space-y-4
      ">



        <Info
          label="ID"
          value={user.id}
        />


        <Info
          label="Name"
          value={`${user.first_name} ${user.last_name}`}
        />


        <Info
          label="Email"
          value={user.email}
        />


        <Info
          label="Phone"
          value={user.phone}
        />


        <Info
          label="User Type"
          value={user.user_type}
        />


        <Info
          label="Status"
          value={user.status}
        />


        <Info
          label="Roles"
          value={
            user.roles?.join(", ")
          }
        />


        <Info
          label="Created"
          value={user.created_at}
        />


        <Info
          label="Last Login"
          value={
            user.last_login || "Never"
          }
        />



      </div>



    </div>

  );

}






function Info({

  label,
  value

}: {

  label: string;
  value: ReactNode;

}) {


  return (

    <div className="
flex
justify-between
border-b
pb-2
">


      <span className="font-semibold">

        {label}

      </span>


      <span>

        {value || "-"}

      </span>


    </div>


  );


}