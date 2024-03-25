import { getStrength, requirements } from "@/common";
import { TitleNameTranslate } from "@/enum";
import { useForm, yupResolver } from "@mantine/form";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Input,
  PasswordRequirement,
  PhoneNumberInput,
  PinInput,
  Progress,
  RegisterFormResolver,
  Select,
  Text,
} from "../..";

export interface RegisterFormType {
  titleId: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  confirmEmail: string;
  phoneNumber: {
    code: string | null;
    number: number | null;
  };
  password: string;
  passwordConfirmation: string;
  activationCode: string;
}

interface RegisterFormProps {
  onSubmit: (
    data: RegisterFormType,
    setIsLoading: (value: SetStateAction<boolean>) => void
  ) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const initialValues = {
    titleId: "",
    email: "",
    confirmEmail: "",
    firstName: "",
    gender: "",
    lastName: "",
    password: "",
    phoneNumber: {
      code: "",
      number: null,
    },
    activationCode: "",
    passwordConfirmation: "",
  };
  const {
    onSubmit: onSubmitForm,
    getInputProps,
    setFieldValue,
    errors,
    values,
  } = useForm<RegisterFormType>({
    validateInputOnChange: true,
    validate: yupResolver(RegisterFormResolver),
    initialValues,
  });

  const UpdatePhoneValue = (code: string | null, phone: number | null) => {
    setFieldValue("phoneNumber.code", code?.split(",")[0]);
    setFieldValue("phoneNumber.number", phone);
  };

  useEffect(() => {
    setStrength(getStrength(values.password));
  }, [values.password]);
  console.log(values);

  useEffect(() => {
    if (status !== "loading" && status !== "unauthenticated") {
      const provider = (session as any)?.access_token?.provider;
      if (provider === "google" || provider === "linkedin") {
        setFieldValue(
          "firstName",
          session?.user?.name?.split(" ")[0] as string
        );
        setFieldValue("lastName", session?.user?.name?.split(" ")[1] as string);
        setFieldValue("email", session?.user?.email as string);
        setFieldValue("confirmEmail", session?.user?.email as string);
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [session, status]);

  const color =
    strength === 100 ? "success" : strength > 50 ? "warning" : "danger";
  const state =
    strength === 100 ? "Fort" : strength > 50 ? "Modéré" : "Trop faible";
  return (
    <div className="relative flex flex-col gap-8 w-[410px]">
      <h1 className="text-3xl font-medium">
        Tirez le meilleur  de votre vie professionnelle.
      </h1>
      <form
        onSubmit={onSubmitForm((data) => {
          setIsLoading(true);
          onSubmit(data, setIsLoading);
        })}
        className="flex w-full text-gray-700 flex-col gap-5"
      >
        <Select
          label={"Titre *"}
          placeholder="Titre..."
          clearable
          searchable
          data={
            Object.entries(TitleNameTranslate)?.map(([value, label]) => ({
              value,
              label,
            })) || []
          }
          {...getInputProps("titleId")}
          size="sm"
          color="#484f59"
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label={"Nom *"}
            placeholder="Votre Nom..."
            {...getInputProps("lastName")}
            size="sm"
            color="#484f59"
          />
          <Input
            label={"Prénom *"}
            placeholder="Votre Prénom..."
            {...getInputProps("firstName")}
            size="sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 ">
          <Select
            label={"Genre *"}
            placeholder="choisir..."
            clearable
            data={[
              { value: "MALE", label: "Homme" },
              { value: "FEMALE", label: "Femme" },
            ]}
            {...getInputProps("gender")}
          />
          <PinInput
            label={"Code d’accès"}
            type={/^[A-Z-0-9]+/}
            placeholder="0"
            {...getInputProps("activationCode")}
          />
        </div>
        <Input
          label={"Votre adresse e-mail *"}
          placeholder="email@adresse.com"
          {...getInputProps("email")}
          autoComplete={"off"}
          autoFocus={false}
          disabled={isDisabled}
        />
        <Input
          label={"Confirmez votre adresse e-mail *"}
          placeholder="email@adresse.com"
          {...getInputProps("confirmEmail")}
          disabled={isDisabled}
          onPaste={(e) => {
            process.env.NODE_ENV === "production" && e.preventDefault();
          }}
        />
        <PhoneNumberInput
          error={
            errors?.["phoneNumber.code"] || errors?.["phoneNumber.number"] ? (
              <div className="flex flex-col gap-1">
                <div>{errors?.["phoneNumber.code"]}</div>
                <div>{errors?.["phoneNumber.number"]}</div>
              </div>
            ) : null
          }
          onChange={UpdatePhoneValue}
          label={"Votre numéro de téléphone *"}
        />
        <div className="flex flex-col gap-5">
          <Input
            label={"Créer un mot de passe sécurisé *"}
            placeholder="●●●●●●●●"
            type="password"
            {...getInputProps("password")}
          />
          {values.password && (
            <div className="flex items-center  justify-between gap-2 w-full">
              <div className="w-[calc(100%-80px)]">
                <Progress
                  color={color}
                  value={strength}
                  sx={{
                    [".mantine-Progress-root"]: {
                      marginBottom: "0px !important",
                    },
                  }}
                  size={5}
                  mb="xs"
                />
              </div>
              <span className="text-sm font-medium ">{state}</span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {values.password &&
              requirements.map((requirement, index) => (
                <PasswordRequirement
                  key={index}
                  label={requirement.label}
                  meets={requirement.re.test(values.password)}
                />
              ))}
          </div>
        </div>
        <Input
          label={"Confirmez votre mot de passe *"}
          placeholder="●●●●●●●●"
          type="password"
          {...getInputProps("passwordConfirmation")}
          onPaste={(e) => {
            process.env.NODE_ENV === "production" && e.preventDefault();
          }}
        />
        <Button
          loading={isLoading}
          color="primary"
          variant="filled"
          size="md"
          type="submit"
        >
          Créer un compte
        </Button>
        <Text className="text-gray-500" size={"sm"}>
          En cliquant sur le bouton ci-dessus, vous acceptez nos &nbsp;
          <Link href="#" className="text-primary-normal underline">
            Conditions d&apos;utilisation
          </Link>
          &nbsp; et de &nbsp;
          <Link href="#" className="text-primary-normal underline">
            Confidentialité.
          </Link>
        </Text>
        <Text className="text-gray-500" size={"sm"}>
          Vous avez déjà un compte?{" "}
          <Link
            href="/v2/auth"
            className="text-primary-normal hover:underline font-semibold "
          >
            Se connecter
          </Link>
        </Text>
      </form>
    </div>
  );
}
