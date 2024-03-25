import { api } from "@/api";
import { Button, CheckCircle, Logo, MailIcon } from "@/components";
import { Divider, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Validate({ token }: { token: boolean }) {
  const { query, push } = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCheckValidation = async () => {
    setIsLoading(false);
    try {
      const { data } = await api.post("/auth/verify-email", {
        token: query?.token,
      });
      setIsLoading(true);
      push("/v2");
    } catch (error: any) {
      setIsLoading(false);
      notifications.show({
        id: "load-data",
        color: "red",
        title: <span className="font-bold">{error?.message}</span>,
        message: "",
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
    }
  };
  const handleSendVerification = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/resend-verification-email");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      notifications.show({
        id: "load-data",
        color: "red",
        title: <span className="font-bold">{error?.message}</span>,
        message: "",
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
      console.log(error);
    }
  };
  useEffect(() => {
    if (query?.token) {
      handleCheckValidation();
    }
  }, [query?.token]);
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="header-section p-8 w-full">
        <Link className="relative flex w-fit" href="/v2/auth">
          <Logo />
        </Link>
      </div>
      {token ? (
        <div className="flex h-full w-full justify-center flex-col items-center gap-2">
          <Loader color="#0049e0" />
          <span className="font-semibold text-sm">
            we&apos;re checking your data as{" "}
            {session ? <b> {session?.user?.email}</b> : "........"}, please wait....
          </span>
        </div>
      ) : (
        <div className="validation-message w-full flex flex-col justify-center items-center">
          <div className="flex flex-col w-[430px] min-h-[500px]">
            <div className="flex flex-col gap-3 ">
              <h1 className="text-3xl font-medium">
                Confirmez votre adresse <br /> e-mail.
              </h1>
              <p className="text-base text-gray-500">
                Nous avons envoyé un e-mail de confirmation à :
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium">{session?.user?.email}</span>
                <CheckCircle className="text-[#12B76A]" />
              </div>
              <p className="text-base text-gray-500">
                Vérifiez votre courrier électronique et cliquez sur le lien de
                confirmation pour continuer.
              </p>
              <Divider className="h-8 w-full" opacity={0} />
              <div className="flex gap-1 items-center justify-between">
                <span className="text-sm text-gray-500 ">
                  Vous n&apos;avez pas reçu d&apos;e-mail ?
                </span>
                <Button
                  className="font-semibold"
                  size="sm"
                  color="primary"
                  variant="subtle"
                  onClick={handleSendVerification}
                  loading={isLoading}
                >
                  Cliquez pour renvoyer.
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer-section p-8 flex text-gray-500 items-center justify-between">
        <span className="text-sm">© Meducate {new Date().getFullYear()} </span>
        <Link
          href="mailto:help@meducate.com"
          className="flex items-center gap-2 hover:underline"
        >
          <MailIcon className="h-4 w-4 text-current" />
          <span className="text-sm">help@meducate.com</span>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  if (req?.cookies?.token || query?.token) {
    return {
      props: {
        token: query?.token ? true : false,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/v2",
      },
    };
  }
};
