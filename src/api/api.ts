import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { BACKEND_ROUTES, ROUTES } from "@/enum";
import axios from "axios";
import {
  deleteCookie as deleteCookieClient,
  setCookie as setCookieClient,
} from "cookies-next";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
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
  async (req) => {
    const Cookies = parseCookies();
    const Access_token = isServer() ? context?.req?.cookies?.token : Cookies[TOKEN]
    const Rf = isServer()
      ? context?.req?.cookies?.refreshToken
      : Cookies[REFRESH_TOKEN];

    if (Access_token) {
      req.headers.Authorization = `Bearer ${Access_token}`;
      let DecodedToken = undefined;

      try {
        DecodedToken = jwtDecode(Access_token);
      } catch (error) {}
      if (!DecodedToken) {
        if (isServer()) {
          destroyCookie(context!, REFRESH_TOKEN);
          destroyCookie(context!, TOKEN);
        } else {
          deleteCookieClient(TOKEN);
          deleteCookieClient(REFRESH_TOKEN);
        }
        window.location.href = ROUTES.AUTH;
      } else {
        const isExpired =
          dayjs.unix(DecodedToken?.exp as number).diff(dayjs()) < 1;
        if (!isExpired) {
          return req;
        }
      }
    }
    if (Rf) {
      const AccessToken = await RefreshToken(Rf);
      req.headers.Authorization = `Bearer ${AccessToken}`;
      if (isServer()) {
        setCookie(context!, TOKEN, AccessToken as string, {
          path: ROUTES.INDEX,
        });
      } else {
        setCookieClient(TOKEN, AccessToken);
      }
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const RefreshToken = async (refreshToken: string) => {
  try {
    const {
      data: { accessToken },
    } = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>(baseURL + BACKEND_ROUTES.REFRESH_TOKEN, { refreshToken });
    return accessToken;
  } catch (error) {
    if (isServer()) {
      destroyCookie(context!, REFRESH_TOKEN);
      destroyCookie(context!, TOKEN);
    } else {
      deleteCookieClient(TOKEN);
      deleteCookieClient(REFRESH_TOKEN);
    }
    window.location.href = ROUTES.AUTH;
  }
};

export default api;
