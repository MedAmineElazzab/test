import { Divider } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { Input } from "../../Input";
import { Button } from "../../button";
import { Checkbox } from "../../checkbox";
import { GoogleIcon, LinkedInIcon } from "../../icons";
import { LoginFormResolver } from "../../resolvers";

interface AuthFormProps {
  onSubmit: (
    email: string,
    password: string,
    remember : boolean,
    setIsLoading: (value: SetStateAction<boolean>) => void
  ) => void;
}
export function AuthForm({ onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    getInputProps,
    onSubmit: onsubmit,
    errors,
    values,
  } = useForm<{ email: string; password: string; remember: boolean }>({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: yupResolver(LoginFormResolver),
  });
  return (
    <div className="flex flex-col w-[410px] ">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-3xl font-medium	">Se connecter</h1>
        <p className="text-sm text-gray-500 self-stretch ">
          Content de vous voir! Veuillez entrer vos <br /> coordonnées.
        </p>
      </div>
      <Divider className="h-8 w-full" opacity={0} />
      <form
        onSubmit={onsubmit((val) => {
          setIsLoading(true);
          onSubmit(val.email, val.password,  val.remember,setIsLoading);
        })}
      >
        <div className="flex flex-col gap-4 text-gray-700">
          <Input
            placeholder="email@adresse.com"
            label={"Votre adresse e-mail *"}
            error={errors?.email}
            {...getInputProps("email")}
          />
          <Input
            type="password"
            label={"Votre mot de passe *"}
            placeholder="●●●●●●●●"
            className="w-full"
            error={errors?.password}
            {...getInputProps("password")}
          />
        </div>
        <Divider className="h-8 w-full" opacity={0} />
        <div className="flex items-center justify-between">
          <Checkbox
            label={"Rappelez-vous pendant 30 jours"}
            color="secondary"
            {...getInputProps("remember")}
          />
          <Link
            href="/v2/auth/forgetPassword"
            className="text-primary-normal  text-sm font-semibold hover:underline"
          >
            Mot de passe oublié
          </Link>
        </div>
        <Divider className="h-8 w-full" opacity={0} />
        <Button
          loading={isLoading}
          variant="filled"
          fullWidth
          size="md"
          color="primary"
          type="submit"
        >
          Se connecter
        </Button>
        <Divider className="h-4 w-full" opacity={0} />
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            size="md"
            fullWidth
            variant="outline"
            color="secondary"
            onClick={() => {
              signIn("linkedin", {
                redirect: true,
                callbackUrl: "/v2/auth/check",
              });
            }}
          >
            <LinkedInIcon />
          </Button>
          <Button
            type="button"
            size="md"
            fullWidth
            variant="outline"
            color="secondary"
            onClick={() => {
              signIn("google", {
                redirect: true,
                callbackUrl: "/v2/auth/check",
              });
            }}
          >
            <GoogleIcon />
          </Button>
        </div>
        <Divider className="h-4 w-full" opacity={0} />
        <div className="flex gap-1">
          <span className="text-sm text-gray-500 ">
            Vous n&apos;avez pas de compte ?
          </span>
          <Link
            href="/v2/auth/register"
            className="text-primary-normal  text-sm font-semibold hover:underline"
          >
            S&apos;inscrire
          </Link>
        </div>
      </form>
    </div>
  );
}
