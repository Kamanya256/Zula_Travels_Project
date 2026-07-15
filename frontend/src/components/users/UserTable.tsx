"use client";

import Link from "next/link";
import { User } from "@/types/user";


interface Props {

  users: User[];

  onDelete: (id: number) => void;

}



export default function UserTable({

  users,

  onDelete,

}: Props) {



  if (!users || users.length === 0) {

    return (

      <div className="
      bg-white
      rounded-lg
      shadow
      p-8
      text-center
      ">

        No users found.

      </div>

    );

  }





  return (

    <div className="
    bg-white
    rounded-lg
    shadow
    overflow-x-auto
    ">


      <table className="min-w-full">


        <thead className="bg-slate-100">


          <tr>


            <th className="px-4 py-3 text-left">
              ID
            </th>


            <th className="px-4 py-3 text-left">
              Name
            </th>


            <th className="px-4 py-3 text-left">
              Email
            </th>


            <th className="px-4 py-3 text-left">
              Phone
            </th>


            <th className="px-4 py-3 text-left">
              Status
            </th>


            <th className="px-4 py-3 text-left">
              Role
            </th>


            <th className="px-4 py-3 text-center">
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


          {
            users.map((user) => (


              <tr
                key={user.id}
                className="
              border-t
              hover:bg-slate-50
              "
              >



                <td className="px-4 py-3">

                  {user.id}

                </td>




                <td className="px-4 py-3">

                  {user.first_name} {user.last_name}

                </td>





                <td className="px-4 py-3">

                  {user.email}

                </td>





                <td className="px-4 py-3">

                  {user.phone || "-"}

                </td>





                <td className="px-4 py-3">

                  {user.status}

                </td>





                <td className="px-4 py-3">

                  {
                    user.roles?.join(", ") || "-"
                  }

                </td>





                <td className="px-4 py-3">


                  <div className="
                flex
                gap-2
                justify-center
                ">


                    {/* VIEW */}

                    <Link

                      href={`/admin/users/view/${user.id}`}

                      className="
                    px-3
                    py-1
                    rounded
                    bg-blue-600
                    text-white
                    "

                    >

                      View

                    </Link>






                    {/* EDIT */}

                    <Link

                      href={`/admin/users/edit/${user.id}`}

                      className="
                    px-3
                    py-1
                    rounded
                    bg-green-600
                    text-white
                    "

                    >

                      Edit

                    </Link>






                    {/* DELETE */}

                    <button

                      onClick={() =>
                        onDelete(user.id)
                      }

                      className="
                    px-3
                    py-1
                    rounded
                    bg-red-600
                    text-white
                    "

                    >

                      Delete

                    </button>



                  </div>


                </td>




              </tr>


            ))
          }



        </tbody>


      </table>


    </div>

  );


}