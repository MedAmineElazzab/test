import { api } from "@/api";
import { Alert, Button, Input, Link, ResetPasswordResolver } from "@/components";
import { Loader } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type NewPasswordFormType = {
  password: string;
  confirmPassword: string;
};
interface NewPasswordFormProps {
  onSubmit: (
    data: NewPasswordFormType,
    setIsLoading: any,
    setIsSuccess: any
  ) => {};
  token: string | null;
}

export function NewPasswordForm(props: NewPasswordFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setIsSuccess] = useState<boolean>(false);
  const [hidden, setIsHidden] = useState<boolean>(true);

  const { push } = useRouter();
  const { getInputProps, onSubmit, errors } = useForm<NewPasswordFormType>({
    validate: yupResolver(ResetPasswordResolver),
    validateInputOnChange: true,
  });

  const handleCheckvalidityOfToken = async () => {
    try {
      await api.post("/auth/verify-reset-password-token", {
        token: props.token,
      });
      setIsHidden(false);
    } catch (error) {
      push("/v2/auth");
    }
  };

  useEffect(() => {
    if (props.token) {
      handleCheckvalidityOfToken();
    }
  }, []);
  if (hidden) {
    return (
      <div className="flex flex-col items-center justify-center h-full  gap-2">
        <Loader color="#0049e0" />
        <span className="font-[600]">
          Nous vérifions vos données, veuillez patienter...
        </span>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={onSubmit((data) =>
          props.onSubmit(data, setIsLoading, setIsSuccess)
        )}
        className="w-[410px] flex flex-col gap-8 "
      >
        <div className="w-100 flex flex-col gap-3 ">
          <h1 className="text-[#101828] text-[2.125rem] font-[500]">
            Réinitialiser le mot de passe.
          </h1>
          <p className="text-[#667085] text-base leading-6 ">
            Créez un nouveau mot de passe pour votre compte Meducate en
            remplissant le chant ci-dessous.
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 ">
          {success && (
            <Alert
              message={
                <p className="leading-5">
                  Votre mot de passe a été réinitialisé. &nbsp;
                  <Link className="text-[#0049E0] font-[600] " href="/v2/auth">
                    Cliquez ici
                  </Link>
                  &nbsp; pour revenir à la page de connexion
                </p>
              }
              type="success"
            />
          )}

          <div className="flex flex-col gap-1.5">
            <Input
              type="password"
              label={"Créez votre nouveau mot de passe *"}
              placeholder="●●●●●●●●"
              className="w-full"
              error={errors?.password}
              {...getInputProps("password")}
            />
          </div>

          <Input
            type="password"
            label={"Confirmez votre nouveau mot de passe *"}
            placeholder="●●●●●●●●"
            className="w-full"
            alt="red"
            error={errors?.password}
            {...getInputProps("confirmPassword")}
          />
        </div>
        <Button
          type="submit"
          variant="filled"
          fullWidth
          size="md"
          color="primary"
          loading={isLoading}
        >
          Réinitialiser
        </Button>
        <p className="text-sm text-[#667085] font-[400] leading-5">
          Attends, je me souviens de mon mot de passe.
          <Link
            className="text-[#0049E0] font-[600] cursor-pointer "
            href="/v2/auth"
          >
            Retour
          </Link>
        </p>
      </form>
    );
  }
}
