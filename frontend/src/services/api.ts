import axios from "axios";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:5000/api";



export const api = axios.create({

  baseURL: API_URL,

  headers: {

    "Content-Type": "application/json",

  },

});



// =====================================
// REQUEST INTERCEPTOR
// Attach JWT token automatically
// =====================================

api.interceptors.request.use(

  (config) => {


    if (typeof window !== "undefined") {


      const token =
        localStorage.getItem("token");


      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }

    }


    return config;


  },


  (error) => {

    return Promise.reject(error);

  }

);




// =====================================
// RESPONSE INTERCEPTOR
// Handle expired sessions
// =====================================

api.interceptors.response.use(

  (response) => {


    return response;


  },


  (error) => {


    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {


      localStorage.removeItem(
        "token"
      );


      localStorage.removeItem(
        "user"
      );


      window.location.href =
        "/login";

    }


    return Promise.reject(error);


  }

);