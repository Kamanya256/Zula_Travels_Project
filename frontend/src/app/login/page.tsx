"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/context/AuthContext";



export default function LoginPage() {


  const router = useRouter();


  const { login } = useAuth();



  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");



  const [showPassword, setShowPassword] =
    useState(false);



  const [rememberMe, setRememberMe] =
    useState(true);



  const [loading, setLoading] =
    useState(false);



  const [error, setError] =
    useState("");





  const handleLogin = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();


    try {


      setLoading(true);

      setError("");



      const user = await login(
        email.trim(),
        password
      );



      console.log(
        "Authenticated User:",
        user
      );



      const role =
        user.roles?.[0];



      if (role === "admin") {


        router.replace(
          "/admin/dashboard"
        );


        return;

      }



      if (role === "vendor") {


        router.replace(
          "/admin/vendors/dashboard"
        );


        return;

      }




      if (role === "customer") {


        router.replace(
          "/"
        );


        return;

      }



      // fallback

      router.replace(
        "/"
      );



    } catch (error) {


      console.error(
        "LOGIN ERROR:",
        error
      );



      if (error instanceof Error) {


        setError(
          error.message
        );


      } else {


        setError(
          "Login failed"
        );


      }



    } finally {


      setLoading(false);


    }


  };





  return (

    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
      px-4
      "
    >


      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-xl
        shadow-lg
        p-8
        "
      >



        <h1
          className="
          text-3xl
          font-bold
          text-center
          text-red-700
          "
        >

          Zula Travels

        </h1>



        <p
          className="
          text-center
          text-gray-500
          mt-2
          "
        >

          Login to continue your journey

        </p>





        {error && (

          <div
            className="
            mt-5
            bg-red-100
            text-red-700
            p-3
            rounded-lg
            "
          >

            {error}

          </div>

        )}






        <form
          onSubmit={handleLogin}
          className="
          mt-6
          space-y-5
          "
        >




          <input

            type="email"

            required

            placeholder="Email address"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }


            className="
            w-full
            border
            rounded-lg
            p-3
            "

          />





          <div
            className="
            relative
            "
          >


            <input

              type={
                showPassword
                  ? "text"
                  : "password"
              }


              required


              placeholder="Password"


              value={password}


              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }


              className="
              w-full
              border
              rounded-lg
              p-3
              pr-12
              "

            />



            <button

              type="button"


              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }


              className="
              absolute
              right-3
              top-3
              "

            >

              {
                showPassword
                  ?
                  <EyeOff size={18} />
                  :
                  <Eye size={18} />
              }


            </button>


          </div>






          <div
            className="
            flex
            justify-between
            text-sm
            "
          >


            <label
              className="
              flex
              gap-2
              "
            >

              <input

                type="checkbox"

                checked={rememberMe}

                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }

              />


              Remember me


            </label>




            <button

              type="button"

              className="
              text-red-600
              "

              onClick={() =>
                router.push(
                  "/forgot-password"
                )
              }

            >

              Forgot password?

            </button>


          </div>







          <button

            type="submit"

            disabled={loading}


            className="
            w-full
            bg-green-600
            hover:bg-green-700
            disabled:bg-gray-400
            text-white
            rounded-lg
            p-3
            font-semibold
            "

          >

            {
              loading
                ?
                "Logging in..."
                :
                "Login"
            }


          </button>



        </form>





        <div
          className="
          text-center
          mt-6
          text-sm
          "
        >

          Don&apos;t have an account?


          <button

            className="
            ml-2
            text-red-700
            font-semibold
            "

            onClick={() =>
              router.push(
                "/signup"
              )
            }

          >

            Register

          </button>


        </div>





      </div>


    </main>

  );

}