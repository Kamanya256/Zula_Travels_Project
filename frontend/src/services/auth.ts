import { api } from "./api";


// =====================================
// TYPES
// =====================================

export interface RegisterPayload {

  first_name: string;

  last_name: string;

  email: string;

  phone?: string;

  password: string;

  user_type:
  | "customer"
  | "vendor"
  | "admin";

}


export interface AuthUser {

  id: number;

  first_name: string;

  last_name: string;

  email: string;

  phone?: string;

  user_type?: string;

  roles: string[];

  email_verified: number;

  status?: string;

}

export interface LoginResponse {

  success: boolean;

  message: string;

  token: string;

  user: AuthUser;

}

// =====================================
// LOGIN
// =====================================

export const loginUser = async (

  email: string,

  password: string

): Promise<LoginResponse> => {

  const { data } =
    await api.post<LoginResponse>(
      "/auth/login",
      {
        email,
        password,
      }
    );

  return data;

};

// =====================================
// REGISTER
// =====================================

export const registerUser = async (

  payload: RegisterPayload

) => {


  const { data } =
    await api.post(

      "/auth/register",

      payload

    );


  return data;

};

// =====================================
// SAVE TOKEN
// =====================================

export const setToken = (

  token: string

) => {


  if (
    typeof window === "undefined"
  ) {

    return;

  }

  localStorage.setItem(

    "token",

    token

  );

};


// =====================================
// SAVE USER
// =====================================

export const setUser = (

  user: AuthUser

) => {


  if (
    typeof window === "undefined"
  ) {

    return;

  }

  localStorage.setItem(

    "user",

    JSON.stringify(user)

  );

};


// =====================================
// GET TOKEN
// =====================================

export const getToken = () => {


  if (
    typeof window === "undefined"
  ) {

    return null;

  }

  return localStorage.getItem(

    "token"

  );


};

// =====================================
// GET USER
// =====================================

export const getUser = (): AuthUser | null => {


  if (
    typeof window === "undefined"
  ) {

    return null;

  }

  const user =
    localStorage.getItem(
      "user"
    );



  if (!user) {

    return null;

  }



  return JSON.parse(user);


};

// =====================================
// LOGOUT
// =====================================

export const logoutUser = () => {


  if (
    typeof window === "undefined"
  ) {

    return;

  }

  localStorage.removeItem(

    "token"

  );

  localStorage.removeItem(

    "user"

  );


};


// =====================================
// AUTH STATUS
// =====================================

export const isAuthenticated = () => {


  return Boolean(

    getToken()

  );


};