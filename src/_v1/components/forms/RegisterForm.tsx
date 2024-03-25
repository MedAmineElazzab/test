import {
  PasswordRequirement,
  getStrength,
  requirements,
} from "@/_v1/common/PasswordHandler";
import { EmailIcon, GenderIcon, UserIcon } from "@/_v1/icons";
import CheckIcon from "@/_v1/icons/sources/CheckIcon";
import InfosIcon from "@/_v1/icons/sources/InfosIcon";
import { Register } from "@/_v1/services/user";
import { Checkbox, PinInput, Text, Tooltip } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconQuestionMark, IconX } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Input, InputPhone, Select } from "../Inputs";
import { RegisterFormResolver } from "../Resolvers";
import { RegisterFormtype } from "../Resolvers/@types";

export default function RegisterForm() {
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const strength = getStrength(value);
  // const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const { query, push } = useRouter();
  useEffect(() => {
    if (
      query?.finishRegistration == "true" &&
      status != "loading" &&
      status != "unauthenticated"
    ) {
      notifications.show({
        id: "load-data",
        color: "yellow",
        title: (
          <span className="font-bold">
            Make sure to finish your registration before closing this tab
          </span>
        ),

        message: (
          <span>
            if you didn&apos;t finish the step , your registration won&apos; be
            completed
          </span>
        ),
        icon: <IconQuestionMark className="w-[25px] text-white" />,
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
    }
  }, []);
  const UpdatePhoneValue = (code: string, phone: string) => {
    if (code && phone) {
      setFieldValue("phoneNumber", code + phone);
    } else {
      setFieldValue("phoneNumber", "");
    }
  };
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status != "loading" && status != "unauthenticated") {
      setFieldValue("email", session?.user?.email as string);
      setFieldValue("firstName", session?.user?.name?.split(" ")[0] as string);
      setFieldValue("lastName", session?.user?.name?.split(" ")[1] as string);
      setIsDisabled(true);
    }
  }, []);
  const {
    onSubmit,
    getInputProps,
    setFieldValue,
    errors,
    values,
    setFieldError,
  } = useForm<RegisterFormtype>({
    validate: yupResolver(RegisterFormResolver),
    initialValues: {
      email: "",
      firstName: "",
      gender: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      activationCode: "",
      // profession: "",
    },
  });

  // console.log((session as any)?.access_token?.id_token);
  const handleSubmit = async (data: RegisterFormtype) => {
    setIsLoading(true);
    const { error, email, accessToken } = await Register({
      ...data,
      googleTokenId:
        (session as any)?.access_token?.provider == "google"
          ? (session as any)?.access_token?.id_token
          : undefined,
      linkedinTokenId:
        (session as any)?.access_token?.provider == "linkedin"
          ? (session as any)?.access_token?.id_token
          : undefined,
    });
    if (error) {
      if (error?.response?.status === 403) {
        setIsLoading(false);
        return setFieldError("email", "Email already exists");
      }
      if (error?.response?.status === 400) {
        if (error?.response?.data?.meta?.target[0] === "phone_number") {
          notifications.show({
            id: "load-data",
            color: "red",
            title: (
              <span className="font-bold">Phone Number already exists !</span>
            ),

            message: (
              <span>
                <b className="text-red-600 underline">{values.phoneNumber}</b>{" "}
                the phone number provided already exists!
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
          setFieldError("phoneNumber", "Phone Number already exists !!!");
        } else {
          notifications.show({
            id: "load-data",
            color: "red",
            title: <span className="font-bold">Access Code is incorrect!</span>,

            message: (
              <span>
                <b className="text-red-600 underline">
                  {values.activationCode}
                </b>{" "}
                the code u provided does not exists or expired
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
          setFieldError("activationCode", true);
        }

        setIsLoading(false);
      }
    } else {
      notifications.show({
        id: "load-data",
        color: "green",
        title: (
          <span className="font-bold">The operation was successful! </span>
        ),
        message: (
          <span>
            <b>{email}</b> is registered with success
          </span>
        ),
        icon: <IconPlus className="w-[25px] text-white" />,
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
      setIsLoading(true);
      if (accessToken) {
        //isGoogle
        setCookie("token", accessToken);
        push("/auth/register/complete");
      } else {
        //to validate redirect to validate
        push("/auth/validate");
      }
    }
  };
  const handleChange = (event: any) => {
    setValue(event.currentTarget.value);
    if (strength === 100) {
      setFieldValue("password", event.currentTarget.value);
    } else {
      setFieldValue("password", "");
    }
  };

  const CheckIcon2 = () => (
    <CheckIcon className="text-[#333] w-[22px] h-[22px]" />
  );

  return (
    <form
      onSubmit={onSubmit(handleSubmit)}
      className="mt-[60px] w1300:mt-[20px] flex flex-col gap-5 "
    >
      <div className="w-full flex flex-col">
        <Select
          withAsterisk
          placeholder="Choose your title"
          icon={<UserIcon className="text-[#333] w-[22px] h-[22px]" />}
          label={"Title"}
          data={[
            {
              value: "Professor of dermatologie",
              label: "Professor of dermatologie",
            },
            {
              value: "Professor of sociology",
              label: "Professor of sociology",
            },
            {
              value: "Professor of cardiology",
              label: "Professor of cardiology",
            },
          ]}
          // {...getInputProps("gender")}
        />
      </div>
      <div className="grid grid-cols-2  w-phone:grid-cols-1 gap-2">
        <Input
          name="firstName"
          label="Firstname"
          withAsterisk
          icon={<UserIcon className="text-[#333] w-[22px] h-[22px]" />}
          placeholder="Enter your firstname."
          {...getInputProps("firstName")}
        />
        <Input
          label="Lastname"
          withAsterisk
          icon={<UserIcon className="text-[#333] w-[22px] h-[22px]" />}
          placeholder="Enter your lastname."
          {...getInputProps("lastName")}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-phone:grid-cols-1">
        <Select
          withAsterisk
          placeholder="Choose your gender"
          icon={<GenderIcon className="text-[#333] w-[22px] h-[22px]" />}
          label={"Gender"}
          data={[
            {
              value: "MALE",
              label: "Male",
            },
            { value: "FEMALE", label: "Female" },
          ]}
          {...getInputProps("gender")}
        />
        <div>
          <div>
            <label
              htmlFor="code"
              className={"text-[14px] font-[500]".concat(
                " ",
                errors?.activationCode ? "text-[#fa5252]" : ""
              )}
            >
              Access code
            </label>
            <span className="text-[#fa5252]"> *</span>
          </div>
          <PinInput
            placeholder="-"
            length={6}
            id="code"
            type={/^[A-Z-0-9]+/}
            {...getInputProps("activationCode")}
            className="mt-[5px]"
            sx={{
              ["input[data-invalid='true']"]: {
                background: "#ffe0e0",
              },
            }}
            styles={{
              input: {
                padding: "22px 0",
                width: "100%",
              },
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Input
          label="Email"
          disabled={isDisabled}
          withAsterisk
          icon={<EmailIcon className="text-[#333] w-[22px] h-[22px]" />}
          placeholder="ex. email@domain.com"
          className="w-full"
          {...getInputProps("email")}
        />
      </div>

      <div className="w-full">
        <div className="flex items-center gap-2 mb-[3px]">
          <label
            htmlFor="code"
            className={"text-[14px] font-[500]".concat(
              " ",
              errors?.phoneNumber ? "text-[#fa5252]" : ""
            )}
          >
            Phone number
          </label>
          <span className="text-[#fa5252]"> *</span>
          <Tooltip
            label={
              "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée "
            }
            withArrow
            position="top"
          >
            <span className="text-[12px] cursor-default flex items-center gap-[3px] text-[#0049E0] font-[400] ">
              Why <InfosIcon />{" "}
            </span>
          </Tooltip>
        </div>

        <InputPhone
          error={errors?.phoneNumber as any}
          onChange={UpdatePhoneValue}
        />
      </div>
      <div className="w-full flex flex-col">
        <div>
          <Input
            type="password"
            label={"Password"}
            withAsterisk
            placeholder="Enter password"
            value={value}
            onChange={handleChange}
            onKeyDown={handleChange}
            onKeyUp={handleChange}
            error={errors?.password}
          />

          <div className="grid grid-cols-2  w-phone:grid-cols-1 mt-2">
            {checks}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div>
          <Input
            type="password"
            label={"Confirm password"}
            withAsterisk
            placeholder="Enter password"
            value={value}
            onChange={handleChange}
            onKeyDown={handleChange}
            onKeyUp={handleChange}
            error={errors?.password}
          />
        </div>
      </div>

      <Checkbox
        label="Please exclude me from any future emails regarding Meducate and related Intuit product and feature updates."
        // radius="xl"
        className="mt-1"
        styles={{
          label: { fontWeight: "lighter" },
          input: { borderColor: "#333", marginTop: "4px" },
        }}
        sx={{
          ["input:checked"]: {
            backgroundColor: "#0049e0",
            borderColor: "#0049e0",
          },
          svg: {
            marginTop: "9px",
          },
        }}
      />
      <Text className="font-light text-[14px] mt-3">
        By registering for an account, you are consenting to our{" "}
        <u className="text-primary-normal cursor-pointer">Terms of Service</u>{" "}
        and confirming that you have reviewed and accepted the{" "}
        <u className="text-primary-normal cursor-pointer">
          Global Privacy Statement.
        </u>
      </Text>
      <Button
        loading={isLoading}
        type="submit"
        className="bg-primary-normal mt-[10px] w-full hover:bg-primary-normal/70 text-white "
      >
        Get started
      </Button>
      <Text className="text-center text-[14px]">
        Already have an account?{" "}
        <Link className="text-primary-normal" href={"/auth"}>
          <u>Login</u>
        </Link>{" "}
      </Text>
    </form>
  );
}
