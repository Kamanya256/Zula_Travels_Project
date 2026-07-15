"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import UserForm from "@/components/users/UserForm";

import {
  getUser,
  updateUser,
} from "@/services/users";

import {
  User,
  UpdateUserPayload,
} from "@/types/user";


export default function EditUserPage() {


  const router = useRouter();


  const params =
    useParams<{ id: string }>();


  const id =
    Number(params.id);



  const [user, setUser] =
    useState<User | null>(null);



  const [loading, setLoading] =
    useState(true);



  const [saving, setSaving] =
    useState(false);



  const [error, setError] =
    useState("");




  // ==============================
  // LOAD USER
  // ==============================

  useEffect(() => {


    async function loadUser() {

      try {


        const data =
          await getUser(id);


        setUser(data);



      } catch (error: unknown) {

        console.error("UPDATE USER:", error);

        const errResponse = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
        const errMsg =
          errResponse ||
          (error instanceof Error ? error.message : undefined) ||
          "Failed to update user";

        setError(errMsg);

      } finally {

        setLoading(false);


      }


    }



    if (id) {

      loadUser();

    }



  }, [id]);






  // ==============================
  // UPDATE USER
  // ==============================

  async function handleSubmit(
    formData: Partial<User>
  ) {


    try {


      setSaving(true);

      setError("");



      const payload:
        UpdateUserPayload = {


        first_name:
          formData.first_name ?? undefined,


        last_name:
          formData.last_name ?? undefined,


        email:
          formData.email ?? undefined,


        phone:
          formData.phone ?? undefined,


        status:
          formData.status ?? undefined,


        user_type:
          formData.user_type ?? undefined,


        profile_image:
          formData.profile_image ?? undefined,


      };



      await updateUser(
        id,
        payload
      );



      router.push(
        "/admin/users"
      );



    } catch (error: unknown) {


      console.error(
        "UPDATE USER:",
        error
      );


      const errResponse =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      const errMsg =
        errResponse ||
        (error instanceof Error ? error.message : undefined) ||
        "Failed to update user";

      setError(errMsg);



    } finally {


      setSaving(false);


    }


  }






  if (loading) {


    return (

      <div className="p-6">

        Loading user...

      </div>

    );


  }





  if (!user) {


    return (

      <div className="p-6 text-red-600">

        User not found

      </div>

    );


  }





  return (

    <div className="max-w-3xl">


      <div className="flex justify-between mb-6">


        <h1 className="text-3xl font-bold">

          Edit User

        </h1>


      </div>




      {
        error && (

          <div className="
          mb-4
          bg-red-100
          text-red-700
          border
          border-red-300
          rounded
          p-3
          ">

            {error}

          </div>

        )
      }





      <UserForm

        initialData={user}

        onSubmit={handleSubmit}

        buttonText={
          saving
            ? "Updating..."
            : "Update User"
        }

      />



    </div>


  );

}