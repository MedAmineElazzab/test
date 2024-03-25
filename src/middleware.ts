import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ProfileCompletion, SignupStep } from "./enum";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
export async function middleware(request: NextRequest) {
  const authRoutes = [
    "/v2/auth",
    "/v2/auth/register",
    "/v2/auth/forgetPassword",
    "/v2/auth/setnewPassword",
  ];
  const rt = ["/v2/auth/complete", "/v2/auth/start"];
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const url = request.nextUrl.clone();
  if (pathname === "/") {
    url.pathname = "/v2";
    return NextResponse.redirect(url);
  }
  if (pathname.includes("/v2")) {
    if (!token) {
      if (pathname === "/v2/auth/check" && sessionToken) {
        url.pathname = pathname;
      } else if (authRoutes.includes(pathname)) {
        return NextResponse.next();
      } else if (pathname === "/v2/auth/complete") {
        url.pathname = "/v2/auth";
      } else {
        url.pathname = "/v2/auth";
      }
    } else if (token) {
      try {
        const data = await fetchCurrentUser(token);
        if (pathname === "/v2/auth/check") {
          url.pathname = "/v2/";
        } else {
          if (
            data?.profileCompletion === ProfileCompletion.FINISHED ||
            data?.profileCompletion === ProfileCompletion.CAN_BROWSE ||
            data?.signupStep === SignupStep.DONE
          ) {
            if (authRoutes.includes(pathname)) {
              url.pathname = "/v2/";
            } else if (rt.includes(pathname)) {
              url.pathname = "/v2/";
            } else {
              url.pathname = pathname;
            }
          } else if (
            data?.profileCompletion === ProfileCompletion.NOT_VERIFIED
          ) {
            url.pathname = "/v2/auth/validate";
          } else if (data?.signupStep === SignupStep.INIT) {
            url.pathname = "/v2/auth/start";
          } else if (data?.profileCompletion === ProfileCompletion.VERIFIED) {
            url.pathname = "/v2/auth/complete";
          }
        }
      } catch (error) {
        url.pathname = "/v2/auth";
      }
    }
    return pathname != url.pathname
      ? NextResponse.redirect(url)
      : NextResponse.next();
  }

  return pathname != url.pathname
    ? NextResponse.redirect(url)
    : NextResponse.next();
}

const fetchCurrentUser = async (token: string) => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data: {
      profileCompletion: ProfileCompletion;
      signupStep: SignupStep;
      professionId: number | null;
    } = await response.json();

    return {
      profileCompletion: data?.profileCompletion,
      signupStep: data?.signupStep,
      professionId: data.professionId,
    };
  } catch (error) {
    console.log("ERROR CAUGHT ON FETCH USER DATA ON MIDDLEWARE.TSX");
  }
};

export const config = {
  matcher: "/((?!api|admin|static|.*\\..*|_next).*)",
};
