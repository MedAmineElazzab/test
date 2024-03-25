import api from "@/_v1/api/api";
import Button from "@/_v1/components/Buttons/Button";

import { Input } from "@/_v1/components/Inputs/index";
import { ForgetPasswordResolver } from "@/_v1/components/Resolvers/ForgetPassword";
import { ArrowLeftIcon, EmailIcon } from "../../_v1/icons";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Forgetpassword() {
  const { back } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setIsSuccess] = useState<boolean>(false);
  const { getInputProps, onSubmit, setFieldError, errors, values } = useForm<{
    email: string;
  }>({
    initialValues: {
      email: "",
    },
    validate: yupResolver(ForgetPasswordResolver),
  });
  const handleSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const { data: reponse } = await api.post("/auth/forgot-password", {
        email: data?.email,
      });
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setFieldError("email", "Email not found !");
      setIsLoading(false);
    }
  };
  return (
    <div className="relative h-full flex justify-center items-center py-[30px] tall:items-start w-phone:overflow-auto tall:overflow-auto w-phone:items-center ">
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
        {errors?.email === "Email exits !" ? (
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="8" width="86" height="86" rx="43" fill="#FEE4E2" />
            <rect
              x="8"
              y="8"
              width="86"
              height="86"
              rx="43"
              stroke="#FEF3F2"
              strokeWidth="14.3333"
            />
            <path
              d="M53.007 51L64.9037 39.1033C65.477 38.53 65.477 37.67 64.9037 37.0967C64.3303 36.5233 63.4703 36.5233 62.897 37.0967L51.0003 48.9933L39.1037 37.0967C38.5303 36.5233 37.6703 36.5233 37.097 37.0967C36.5237 37.67 36.5237 38.53 37.097 39.1033L48.9937 51L37.097 62.8967C36.5237 63.47 36.5237 64.33 37.097 64.9033C37.6703 65.4767 38.5303 65.4767 39.1037 64.9033L51.0003 53.0067L62.897 64.9033C63.4703 65.4767 64.3303 65.4767 64.9037 64.9033C65.477 64.33 65.477 63.47 64.9037 62.8967L53.007 51Z"
              fill="#D92D20"
            />
          </svg>
        ) : success ? (
          <svg
            width="98"
            height="98"
            viewBox="0 0 98 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" y="7" width="84" height="84" rx="42" fill="#D1FADF" />
            <path
              d="M66.5 47.39V49C66.4979 52.7737 65.2759 56.4457 63.0163 59.4682C60.7568 62.4907 57.5807 64.7018 53.9619 65.7718C50.343 66.8418 46.4752 66.7133 42.9353 65.4055C39.3954 64.0977 36.3731 61.6807 34.3192 58.5149C32.2652 55.3491 31.2896 51.6041 31.5379 47.8386C31.7862 44.073 33.2451 40.4886 35.697 37.6199C38.1489 34.7512 41.4624 32.7519 45.1433 31.9203C48.8243 31.0886 52.6755 31.4691 56.1225 33.005M66.5 35L49 52.5175L43.75 47.2675"
              stroke="#039855"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="7"
              y="7"
              width="84"
              height="84"
              rx="42"
              stroke="#ECFDF3"
              strokeWidth="14"
            />
          </svg>
        ) : (
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
        )}

        {!success ? (
          <>
            <div className="flex flex-col gap-2 mt-2">
              <h1 className="title w-phone:mt-[20px] text-[30px]  w1300:text-[28px] w1100:text-[24px] font-semibold text-center   ">
                Forgot password?
              </h1>
              <p className="w1300:text-[15px] w1100:text-[14px] text-center  ">
                No worries, we’ll send you reset instructions.
              </p>
            </div>
            <div className="w-[400px] w1300:max-w-full w-phone:w-full  ">
              <form
                onSubmit={onSubmit(handleSubmit)}
                className="mt-[40px] w1300:mt-[20px] flex flex-col gap-3 "
              >
                <Input
                  label="Email"
                  withAsterisk
                  icon={<EmailIcon className="text-[#333] w-[22px] h-[22px]" />}
                  placeholder="ex. email@domain.com"
                  className="w-full"
                  {...getInputProps("email")}
                />

                <Button
                  // onClick={()=> signIn()}

                  // onClick={handleSubmit}
                  loading={isLoading}
                  type="submit"
                  className="bg-primary-normal hover:bg-primary-normal/70 text-white "
                >
                  Reset password{" "}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 mt-2">
              <h1 className="title w-phone:mt-[20px] text-[30px]  w1300:text-[28px] w1100:text-[24px] font-semibold text-center   ">
                Email sent with success{" "}
              </h1>
              <p className="w1300:text-[15px] w1100:text-[14px] text-center  ">
                check <b>{values?.email}</b> to change your password
              </p>
            </div>

            <Button
              onClick={() => back()}
              className="bg-primary-normal mt-6 w-[90%] !h-[40px] hover:bg-primary-normal/70 text-white"
            >
              Go back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
