// Import the correct hook name
import { Register as RegisterUser, User } from "@/api/user";
import { Logo, RegisterForm, RegisterFormType } from "@/components";
import { Wording } from "@/lib";
import store from "@/store";
import { updateUser } from "@/store/user";
import { notifications } from "@mantine/notifications";
import { setCookie } from "cookies-next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction } from "react";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession() as { data: any };
  const handleSubmit = async (
    data: RegisterFormType,
    setIsloading: (value: SetStateAction<boolean>) => void
  ) => {
    setIsloading(true);
    const phoneNumber =
      data.phoneNumber && `${data.phoneNumber.code}${data.phoneNumber.number}`;
    const googleTokenId =
      session?.access_token?.provider === "google"
        ? session?.access_token?.id_token
        : undefined;
    const linkedinTokenId =
      session?.access_token?.provider === "linkedin"
        ? session?.access_token?.id_token
        : undefined;

    const { error, accessToken, user } = await RegisterUser({
      ...data,
      phoneNumber,
      googleTokenId,
      linkedinTokenId,
    });
    if (error) {
      console.error(error);
      notifications.show({
        id: "notif-error-auth",
        color: "red",

        title: (
          <span className="font-bold">
            {Wording?.[
              (error?.response?.data?.message ||
                error?.response?.data?.code) as keyof typeof Wording
            ] || error?.response?.message}
          </span>
        ),
        message: "",
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
      setIsloading(false);
    } else if (user) {
      store.dispatch(updateUser(user as User & void));
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        setIsloading(false);
        setCookie("token", accessToken);
      } else {
        setIsloading(false);
      }
      router.push("/v2");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="header-section p-8 w-full">
        <Link className="relative flex w-fit" href="/v2/auth">
          <Logo />
        </Link>
      </div>
      <div className="form-section w-full flex flex-col text-xs px-8 py-24 items-center">
        <RegisterForm
          onSubmit={(data, setIsLoading) => handleSubmit(data, setIsLoading)}
        />
      </div>
    </div>
  );
}
