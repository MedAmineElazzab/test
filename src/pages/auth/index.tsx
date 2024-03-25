import Button from "@/_v1/components/Buttons/Button";
import { Input } from "@/_v1/components/Inputs/index";
import { EmailIcon, GoogleIcon, PasswordIcon } from "../../_v1/icons";
import { LoginFormValidation } from "@/_v1/validation/LoginFormValidation";
import { Box, Divider, Transition } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface loginProps {
  email: string;
  password: string;
}
export default function Index() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { getInputProps, onSubmit, errors } = useForm<loginProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(LoginFormValidation),
  });
  const handleSubmit = async (data: loginProps) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.ok) {
      setError("");
      setSuccess("User authenticated");
      push("/auth/check");
    } else {
      setError(response?.error as string);
    }
  };
  const handleGoogleAuthClick = async () => {
    signIn("google", { redirect: true, callbackUrl: "/auth/check" });
  };
  const handleLinkedInAuthClick = async () => {
    signIn("linkedin", { redirect: true, callbackUrl: "/auth/check" })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  const { query } = useRouter();
  const [opened, setIsopened] = useState(false);
  useEffect(() => {
    if (query?.error === "OAuthSignin") {
      setError("Server error AuthSignin ");
    }
    setTimeout(() => {
      setIsopened(true);
    }, 1000);
  }, [opened]);
  return (
    <div className="h-full flex justify-center items-center py-[30px] tall:items-start  tall:overflow-auto">
      <div className="flex justify-center items-center flex-col w1300:px-[15px] tall:px-[20px] tall:w-fit  w1100:bg-white w1100:rounded-[4px] w1100:py-[30px]  w1100:w-fit w-phone:w-[calc(100%-30px)] ">
        <Link href="#">
          <div className="logo-section w-[200px] invisible  w1100:visible w1100:mb-[20px] ">
            <img src="/assets/logo.svg" alt="" />
          </div>{" "}
        </Link>
        <h1 className="title text-[33px] mb-2 font-SourceSans  w1300:text-[28px] w1100:text-[24px] font-semibold text-center   ">
          Log in
        </h1>
        <p className="w1300:text-[15px] text-[#414143] font-[400] w1100:text-[14px] text-center  ">
          Empower your experience, sign up for a free account today{" "}
        </p>
        <div className="w-[400px] w1300:max-w-full w-phone:w-full  ">
          <form
            onSubmit={onSubmit(handleSubmit)}
            className="mt-[60px] w1300:mt-[20px] flex flex-col gap-[34px] "
          >
            {error && (
              <Transition
                mounted={opened}
                transition="fade"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <div
                    style={styles}
                    className="bg-red-200 w-full font-bold p-3 rounded-sm text-sm text-red-600 text-center"
                  >
                    {error}
                  </div>
                )}
              </Transition>
            )}

            {success && (
              <Transition
                mounted={opened}
                transition="fade"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <div
                    style={styles}
                    className="bg-green-200 w-full font-bold p-3 rounded-sm text-sm text-green-600 text-center"
                  >
                    {success}
                  </div>
                )}
              </Transition>
            )}
            <Input
              label="Email"
              withAsterisk
              icon={<EmailIcon className="text-[#333] mx-[0px]  w-[20px] " />}
              placeholder="ex: email@domain.com"
              className="w-full  "
              error={errors?.email}
              {...getInputProps("email")}
            />
            <div className="flex flex-col gap-1">
              <Input
                type="password"
                label="Password"
                withAsterisk
                icon={
                  <PasswordIcon className="text-[#333] w-[20px] h-[20px]" />
                }
                placeholder="ex. @61573780_ÀE"
                className="w-full"
                {...getInputProps("password")}
                error={errors?.password}
              />
              <Link
                href={"/auth/forgetPassword"}
                className="text-primary-normal text-[14px] font-semibold hover:underline "
              >
                Forgot your password?
              </Link>
            </div>
            <Button
              // onClick={()=> signIn()}
              type="submit"
              className="bg-primary-normal hover:bg-primary-normal/70 text-white "
            >
              Log in
            </Button>
          </form>
          <Divider
            my="xs"
            label="Or"
            className="w-full"
            labelPosition="center"
          />
          <Box className="text-[14px]">
            By clicking Continue, you agree to LinkedIn’s{" "}
            <b className="text-primary-normal hover:underline cursor-pointer">
              User Agreement, Privacy Policy, and Cookie Policy.
            </b>
          </Box>

          <div className="w-full mt-[30px] flex flex-col gap-2">
            <Button
              onClick={() => push("/auth/register")}
              className="!bg-transparent !text-primary-normal w-full hover:!bg-primary-normal/10 border border-primary-normal  "
            >
              New to Meducate ? Join us
            </Button>
            <Button
              onClick={handleLinkedInAuthClick}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1198_10299)">
                    <path
                      d="M0 5H3.578V16H0V5ZM13.324 5.129C13.286 5.117 13.25 5.104 13.21 5.093C13.162 5.08213 13.1136 5.07279 13.065 5.065C12.8537 5.0218 12.6386 5.00003 12.423 5C10.337 5 9.014 6.517 8.578 7.103V5H5V16H8.578V10C8.578 10 11.282 6.234 12.423 9V16H16V8.577C15.9985 7.78714 15.735 7.02009 15.2507 6.39611C14.7664 5.77212 14.0888 5.32646 13.324 5.129Z"
                      fill="white"
                    />
                    <path
                      d="M1.75 3.5C2.7165 3.5 3.5 2.7165 3.5 1.75C3.5 0.783502 2.7165 0 1.75 0C0.783502 0 0 0.783502 0 1.75C0 2.7165 0.783502 3.5 1.75 3.5Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1198_10299">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              className="!bg-[#0A66C2] w-full hover:bg-[#0A66C2]/70 text-white "
            >
              Continue with LinkedIn
            </Button>
            <Button
              onClick={handleGoogleAuthClick}
              leftIcon={<GoogleIcon className="w-[22px] h-[22px]" />}
              className=" border bg-white w-full hover:bg-white border-gray-200  text-primary-normal "
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
