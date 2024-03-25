import api from "@/_v1/api/api";
import Button from "@/_v1/components/Buttons/Button";
import { GmailIcon, MailIcon, OutlookIcon } from "../../_v1/icons";
import { CheckIcon, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Validate({ token }: { token: boolean }) {
  const { query, push } = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckValidation = async () => {
    setIsLoading(false);
    try {
      const { data } = await api.post("/auth/verify-email", {
        token: query?.token,
      });
      setIsLoading(true);
      notifications.show({
        id: "load-data",
        color: "green",
        title: (
          <span className="font-bold">The operation was successful! </span>
        ),
        message: <span>Your email is now validated! login now</span>,
        icon: <CheckIcon className="w-[25px] text-white" />,
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
      push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      notifications.show({
        id: "load-data",
        color: "red",
        title: <span className="font-bold">something went wrong</span>,

        message: (
          <span>
            <b className="text-red-600 underline">Internal server error</b>{" "}
            please try again later....
          </span>
        ),
        icon: <IconX className="w-[25px] text-white" />,
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
      notifications.show({
        id: "load-data",
        color: "green",
        title: (
          <span className="font-bold">The operation was successful! </span>
        ),
        message: (
          <span>
            an validation email was sent into <b>{user?.email}</b> !
          </span>
        ),
        icon: <CheckIcon className="w-[25px] text-white" />,
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      notifications.show({
        id: "load-data",
        color: "red",
        title: <span className="font-bold">something went wrong</span>,

        message: (
          <span>
            <b className="text-red-600 underline">Internal server error</b>{" "}
            please try again later....
          </span>
        ),
        icon: <IconX className="w-[25px] text-white" />,
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
  useEffect(() => {
    if (query?.token) {
      handleCheckValidation();
    }
  }, [query?.token]);
  return (
    <div className="relative h-full flex justify-center items-center py-[30px]   tall:items-start w-phone:overflow-auto tall:overflow-auto w-phone:items-center ">
      {token ? (
        <div className="flex flex-col items-center gap-2">
          <Loader color="#0049e0" />
          <span className="font-[600]">
            we&apos;re checking your data, please wait....
          </span>
        </div>
        
      ) : (
        <div className="w-[700px] flex items-center h-full pt-[40px] w1100:bg-white w-phone:w-[90%] w-phone:px-[30px] tall:h-fit rounded-md   flex-col tall:px-[40px]">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-[24px] text-black font-[600]">
              Check your email{" "}
            </h1>
            <p className="text-slate-600">
              We’ve sent an email to <b className="text-primary-normal">{user?.email} </b>{" "}
              with a link to activate your account
            </p>
          </div>
          <div className="actions w-full flex items-center gap-5 mt-[30px] ">
            <Link
              className="flex items-center gap-5 text-primary-normal hover:underline"
              href="https://mail.google.com/"
              target="_blank"
            >
              <GmailIcon className="w-[40px]" />
              <span className="text-sm  font-bold underline">Open Gmail</span>
            </Link>
            <Link
              className="flex items-center gap-4 text-primary-normal  hover:underline"
              href="https://outlook.office365.com/mail/"
              target="_blank"
            >
              <OutlookIcon className="w-[40px]" />
              <span className="text-sm  font-bold underline">Open Outlook</span>
            </Link>
          </div>
          <img
            className="w-[550px] my-[40px] "
            src="/assets/static/EmailValidate.svg"
            alt=""
          />
          <div className="flex flex-col gap-4 w-full">
            <span className="text-[19px] font-[500] ">
              Didn’t get an email? Check your spam folder!
            </span>
            <Button
              loading={isLoading}
              onClick={handleSendVerification}
              className="w-fit  bg-primary-normal hover:bg-primary-normal/80 text-white cursor-pointer text-[15px] "
            >
              <MailIcon className="text-white w-[28px] h-[28px] mr-2 " />
              Resend validation email now{" "}
            </Button>
            <br />
          </div>
        </div>
      )}
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
        destination: "/",
      },
    };
  }
};
