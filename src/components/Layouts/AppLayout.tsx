import AuthLayout from "@/_v1/Layouts/AuthLayout";
import { Me } from "@/_v1/services/user";
import { updateUser } from "@/_v1/store/user";
import {
  AuthLayoutV2,
  DashboardLayout,
  DashboardLayout as DashboardLayoutV2,
  StepsLayout,
} from "@/components";
import { CompleteProvider } from "@/contexts";
import store from "@/store";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export function AppLayout({ children }: { children: JSX.Element }) {
  const { route, pathname } = useRouter();
  const stepsLayoutRoutes = [
    "/v2/auth/forgetPassword",
    "/v2/auth/complete",
    "/v2/auth/setnewPassword",
    "/v2/auth/start",
    "/v2/auth/welcome",
  ];
  const { user } = useSelector((state: any) => state.user);
  const handleStateInit = async () => {
    if (getCookie("token")) {
      try {
        const { data } = await Me();
        store.dispatch(updateUser(data as any));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  useEffect(() => {
    handleStateInit();
  }, []);

  if (route.includes("/v2")) {
    if (route.includes("/auth")) {
      if (stepsLayoutRoutes.includes(pathname)) {
        return (
          <StepsLayout>
            <CompleteProvider user={user}>{children}</CompleteProvider>
          </StepsLayout>
        );
      } else {
        return <AuthLayoutV2>{children}</AuthLayoutV2>;
      }
    } else {
      return <DashboardLayoutV2>{children}</DashboardLayoutV2>;
    }
  } else {
    if (route.includes("/auth")) {
      return <AuthLayout>{children}</AuthLayout>;
    } else {
      return <DashboardLayout>{children}</DashboardLayout>;
    }
  }
}
