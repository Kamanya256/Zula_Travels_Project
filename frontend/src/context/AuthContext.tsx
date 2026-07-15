"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


import {
  loginUser,
  logoutUser,
  getToken,
  getUser,
  setToken,
  setUser,
  AuthUser,
} from "@/services/auth";



interface AuthContextType {

  user: AuthUser | null;

  token: string | null;

  loading: boolean;


  login(
    email: string,
    password: string
  ): Promise<AuthUser>;


  logout(): void;

}



const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );





export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [user, setUserState] =
    useState<AuthUser | null>(
      () => getUser()
    );



  const [token, setTokenState] =
    useState<string | null>(
      () => getToken()
    );



  const [loading, setLoading] =
    useState(false);





  // ===============================
  // LOGIN
  // ===============================

  const login = async (
    email: string,
    password: string
  ): Promise<AuthUser> => {


    setLoading(true);


    try {


      const response =
        await loginUser(
          email,
          password
        );



      // save token
      setToken(
        response.token
      );


      // save user
      setUser(
        response.user
      );



      // update state
      setTokenState(
        response.token
      );


      setUserState(
        response.user
      );



      return response.user;



    }
    finally {

      setLoading(false);

    }

  };






  // ===============================
  // LOGOUT
  // ===============================

  const logout = () => {


    logoutUser();


    setTokenState(null);


    setUserState(null);


  };







  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        loading,

        login,

        logout

      }}

    >


      {children}


    </AuthContext.Provider>


  );



}







export function useAuth() {


  const context =
    useContext(AuthContext);



  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;


}