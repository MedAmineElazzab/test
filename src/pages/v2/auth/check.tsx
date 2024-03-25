import { Me } from "@/_v1/services/user";
import { api } from "@/api";
import { User } from "@/api/user";
import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { BACKEND_ROUTES, ROUTES } from "@/enum";
import store from "@/store";
import { updateUser } from "@/store/user";
import { Loader } from "@mantine/core";
import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Check() {
  const { push } = useRouter();
  const { data: session, update } = useSession();
  const handleAuthCheck = async () => {
    const isGoogle = (session as any)?.access_token?.provider === "google";
    const isLinkedIn = (session as any)?.access_token?.provider === "linkedin";
    if (isGoogle || isLinkedIn) {
      const token = (session as any)?.access_token?.id_token;
      try {
        const { data} = await api.post<{
          accessToken: string;
          refreshToken: string;
          user: {
            email: string;
            firstName: string;
            id: number;
            isVerified: boolean;
            lastName: string;
          };
        }>(
          isGoogle ? BACKEND_ROUTES.GOOGLE_AUTH : BACKEND_ROUTES.LINKEDIN_AUTH,
          {
            token,
          }
        );
        setCookie(TOKEN, data.accessToken);
        setCookie(REFRESH_TOKEN, data.refreshToken);
        const { data: user } = await Me();
        store.dispatch(updateUser(user as User & void));
        push(ROUTES.INDEX);
      } catch (error: any) {
        if (error?.response?.status === 403) {
          update({
            createUser: true,
          });
          push(ROUTES.REGISTER);
        } else {
          push(ROUTES.AUTH);
        }
      }
    }
    //@ts-ignore
    else if (session?.access_token?.provider === "credentials") {
      setCookie(TOKEN, session?.user?.image?.split("|")[0]);
      setCookie(REFRESH_TOKEN, session?.user?.image?.split("|")[1]);
      try {
        const { data } = await Me();
        store.dispatch(updateUser(data as any));
        push(ROUTES.INDEX);
      } catch (error: any) {}
    }
  };
  useEffect(() => {
    setTimeout(() => {
      handleAuthCheck();
    }, 1000);
  }, [session]);

  return (
    <div className="flex h-full w-full justify-center flex-col items-center gap-2">
      <Loader color="#0049e0" />
      <span className="font-semibold text-sm">
        Nous vérifions vos données
        {session ? <b> {session?.user?.email}</b> : "........"}, veuillez
        patienter...
      </span>
    </div>
  );
}
