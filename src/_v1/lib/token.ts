import { NextPageContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";

const COOKIE_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export default class JWTToken {
  static store(token: string): void {
    setCookie(null, "token", token, { maxAge: COOKIE_AGE, path: "/" });
  }

  static getToken(ctx: NextPageContext | null = null): string {
    const cookies = parseCookies(ctx as any);
    const token = cookies["token"] ? `Bearer ${cookies["token"]}` : "";
    // console.log(token)
    return token;
  }

  static removeToken(): void {
    destroyCookie(null, "token", { path: "/" });
  }
}
