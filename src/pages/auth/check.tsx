import api from "@/_v1/api/api";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import { Me } from "@/_v1/services/user";
import store from "../../_v1/store";
import { updateUser } from "@/_v1/store/user";
import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
const CheckingLottie = require("@public/assets/animations/Checking.json");
export default function Check() {
  const { push } = useRouter();
  const { data: session, status, update } = useSession();
  const handleAuthCheck = async () => {
    const isGoogle = (session as any)?.access_token?.provider === "google";
    const isLinkedIn = (session as any)?.access_token?.provider === "linkedin";
    if (isGoogle || isLinkedIn) {
      const token = (session as any)?.access_token?.id_token;
      try {
        const { data, status: st } = await api.post<{
          accessToken: string;
          user: {
            email: string;
            firstName: string;
            id: number;
            isVerified: boolean;
            lastName: string;
          };
        }>(isGoogle ? "/auth/google/token" : "/auth/linkedin/token", {
          token,
        });
        store.dispatch(updateUser(data?.user as any));
        setCookie("token", data.accessToken);
        push("/?auth=b");
      } catch (error: any) {
        console.log(error);
        if (error?.response?.status === 403) {
          update({
            createUser: true,
          });
          push("/auth/register?finishRegistration=true");
        }
      }
    }
    //@ts-ignore
    else if (session?.access_token?.provider === "credentials") {
      setCookie("token", session?.user?.image);
      await update({
        image: "",
      });
      try {
        const { data } = await Me(); 
        store.dispatch(updateUser(data as any));
        push("/?auth=b");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      handleAuthCheck();
    }, 1000);
  }, [session]);

  return (
    <div className="h-full flex justify-center items-center py-[30px] tall:items-start w-phone:items-center w-phone:overflow-auto tall:overflow-auto ">
      <div className="flex justify-center items-center flex-col w1300:px-[15px] tall:px-[20px] tall:w-fit w1100:bg-white w1100:rounded-[4px] w1100:py-[30px]  w1100:w-fit w-phone:w-[calc(100%-30px)] ">
        <div className="w-[600px] w-phone:w-full mb-[100px] h-[400px] pointer-events-none flex items-center flex-col">
          <LottieAnimation loop animationData={CheckingLottie} />
          <span className="text-primary-normal text-center">
            Please wait!! We&apos;re checking your credentials...{" "}
            {session ? <b> {session?.user?.email}</b> : "........"}
          </span>
        </div>
      </div>
    </div>
  );
}
