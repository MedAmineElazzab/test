import axios from "axios";
import { deleteCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const isServer = () => {
  return typeof window === "undefined";
};

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = isServer() ? context?.req?.cookies?.token : cookies["token"];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!isServer() && error?.response?.status != 401) {
      // showErrorNotification(error);
    }
    // if (error?.response?.status === 401) {
    //   console.log(error);
    //   deleteCookie("token");
    //   if (!isServer() && typeof window !== "undefined") {
    //     window.location.href = "/v2/auth";
    //   }
    // }

    return Promise.reject(error);
  }
);

export default api;
