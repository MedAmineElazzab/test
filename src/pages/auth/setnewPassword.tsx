import api from "@/_v1/api/api";
import Button from "@/_v1/components/Buttons/Button";
import { Input } from "@/_v1/components/Inputs/index";
import { ResetPasswordResolver } from "@/_v1/components/Resolvers/setNewPassword";
import { ArrowLeftIcon } from "../../_v1/icons";
import { CheckIcon, Loader } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface SetnewPasswordType {
  password: string;
  confirmPassword: string;
}
interface SetnewPasswordProps {
   
}
export default function SetnewPassword({ token }: { token: string }) {
  const { back, push, query } = useRouter();
  const [hidden, setIsHidden] = useState(true);
  const { getInputProps, onSubmit } = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: yupResolver(ResetPasswordResolver),
  });
  const handleSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const { data: response } = await api.post("/auth/reset-password", {
        password: data?.password,
        token,
      });
      notifications.show({
        id: "load-data",
        color: "green",
        title: (
          <span className="font-bold">Password changed successfully!! </span>
        ),
        message: <span>your password is changed, login with it now!</span>,
        icon: <CheckIcon className="w-[25px] text-white" />,
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
      push("/auth");
    } catch (error) {
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
      console.log(error);
    }
  };

  const handleCheckvalidityOfToken = async () => {
    try {
      const { data: response } = await api.post(
        "/auth/verify-reset-password-token",
        {
          token,
        }
      );
      console.log(response);
      setIsHidden(false);
    } catch (error) {
      console.log(error);
      push("/auth");
    }
  };
  useEffect(() => {
    if (token) {
      handleCheckvalidityOfToken();
    }
  }, []);
  return token && hidden ? (
    <div className="flex flex-col items-center justify-center h-full  gap-2">
      <Loader color="#0049e0" />
      <span className="font-[600]">
        we&apos;re checking your data, please wait....
      </span>
    </div>
  ) : (
    <div className="relative h-full  flex justify-center items-center py-[30px] tall:items-start w-phone:overflow-auto tall:overflow-auto w-phone:items-center ">
      <div
        onClick={() => back()}
        className="back hover:underline cursor-pointer  absolute top-0 left-0 m-[40px] text-primary-normal flex justify-center items-center gap-2"
      >
        <ArrowLeftIcon className="w-[14px] h-[14px] text-primary-normal" />
        <span className="">Back</span>
      </div>
      <div className="relative flex justify-center items-center flex-col w1300:px-[15px] tall:px-[20px] tall:w-fit w1100:bg-white w1100:rounded-[4px] w1100:py-[30px]  w1100:w-fit w-phone:w-[calc(100%-30px)]  ">
        <div className="logo-section w-[200px] invisible  w1100:visible w1100:mb-[20px] ">
          <img src="/assets/logo.svg" alt="" />
        </div>
        <svg
          className="w-phone:mt-[10px]"
          width="101"
          height="101"
          viewBox="0 0 101 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="8"
            width="85"
            height="85"
            rx="42.5"
            fill="#0049E0"
            fillOpacity="0.21"
          />
          <path
            d="M59.3542 45.1874C59.3541 44.281 59.0084 43.3747 58.3168 42.6832C57.6253 41.9916 56.7189 41.6458 55.8125 41.6458M55.8125 55.8125C61.6805 55.8125 66.4375 51.0555 66.4375 45.1875C66.4375 39.3195 61.6805 34.5625 55.8125 34.5625C49.9445 34.5625 45.1875 39.3195 45.1875 45.1875C45.1875 45.6721 45.2199 46.1492 45.2828 46.6166C45.3861 47.3854 45.4378 47.7698 45.403 48.013C45.3668 48.2664 45.3207 48.4029 45.1958 48.6263C45.0759 48.8407 44.8647 49.052 44.4422 49.4745L35.3924 58.5243C35.0861 58.8306 34.933 58.9837 34.8234 59.1624C34.7264 59.3209 34.6548 59.4936 34.6114 59.6743C34.5625 59.8781 34.5625 60.0946 34.5625 60.5278V63.6042C34.5625 64.5959 34.5625 65.0918 34.7555 65.4706C34.9253 65.8038 35.1962 66.0747 35.5294 66.2445C35.9082 66.4375 36.4041 66.4375 37.3958 66.4375H41.6458V62.8958H45.1875V59.3542H48.7292L51.5255 56.5578C51.948 56.1353 52.1593 55.9241 52.3737 55.8042C52.5971 55.6793 52.7336 55.6332 52.987 55.597C53.2302 55.5622 53.6146 55.6139 54.3834 55.7172C54.8508 55.7801 55.3279 55.8125 55.8125 55.8125Z"
            stroke="#0049E0"
            strokeWidth="3.03571"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="8"
            y="8"
            width="85"
            height="85"
            rx="42.5"
            stroke="#0049E0"
            strokeOpacity="0.03"
            strokeWidth="15.1786"
          />
        </svg>
        <h1 className="title text-[33px]  w1300:text-[28px] w1100:text-[24px] font-semibold text-center   ">
          Set new password{" "}
        </h1>
        <p className="w1300:text-[15px] w1100:text-[14px] text-center  ">
          Your new password must be different to previously used passwords.{" "}
        </p>
        <div className="w-[400px] w1300:max-w-full w-phone:w-full  ">
          <form
            onSubmit={onSubmit(handleSubmit)}
            className="mt-[40px] w1300:mt-[20px] flex flex-col gap-3 "
          >
            <Input
              type="password"
              label={"Password"}
              withAsterisk
              placeholder="Enter password"
              // onChange={(event) => setValue(event.currentTarget.value)}
              {...getInputProps("password")}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              withAsterisk
              placeholder="Confirm password"
              {...getInputProps("confirmPassword")}
            />
            <Button
              // onClick={()=> signIn()}
              type="submit"
              className="bg-primary-normal hover:bg-primary-normal/70 text-white "
            >
              Reset password{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  if (query?.token) {
    return {
      props: {
        token: query?.token,
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
